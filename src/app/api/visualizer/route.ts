import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import { connectDB } from "@/lib/db";
import { Visualization } from "@/models/Visualization";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Nano Banana Pro
const IMAGE_MODEL = "gemini-3-pro-image";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FREE_GENERATIONS = 3;
const MAX_BONUS_GENERATIONS = 3;
const MAX_DIMENSION = 2048;

// Logger de debug con prefijo. Activado siempre en dev; en prod podés silenciarlo
// poniendo VISUALIZER_DEBUG=false en el entorno.
const DEBUG = process.env.VISUALIZER_DEBUG !== "false";
function dlog(...args: unknown[]) {
  if (DEBUG) console.log("[Visualizer]", ...args);
}

async function getImageBuffer(url: string): Promise<Buffer> {
  dlog("⬇ descargando mural desde:", url);
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se pudo descargar la imagen");
  return Buffer.from(await response.arrayBuffer());
}

interface ProcessedImage {
  base64: string;
  width: number;
  height: number;
}

async function processImage(buffer: Buffer): Promise<ProcessedImage> {
  const metadata = await sharp(buffer).metadata();
  const width = metadata.width || 1024;
  const height = metadata.height || 1024;
  let processedBuffer = buffer;
  let finalWidth = width;
  let finalHeight = height;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const resized = sharp(buffer)
      .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
      .png({ quality: 100 });
    processedBuffer = await resized.toBuffer();
    const newMeta = await sharp(processedBuffer).metadata();
    finalWidth = newMeta.width || width;
    finalHeight = newMeta.height || height;
    dlog(`  ↳ redimensionada de ${width}x${height} a ${finalWidth}x${finalHeight}`);
  } else {
    processedBuffer = await sharp(buffer).png({ quality: 100 }).toBuffer();
  }

  return {
    base64: processedBuffer.toString("base64"),
    width: finalWidth,
    height: finalHeight,
  };
}

// Mapea el ratio de la foto al aspect ratio soportado más cercano de Gemini 3 Pro Image.
const GEMINI_ASPECT_RATIOS: Array<{ label: string; ratio: number }> = [
  { label: "21:9", ratio: 21 / 9 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "3:2", ratio: 3 / 2 },
  { label: "4:3", ratio: 4 / 3 },
  { label: "5:4", ratio: 5 / 4 },
  { label: "1:1", ratio: 1 },
  { label: "4:5", ratio: 4 / 5 },
  { label: "3:4", ratio: 3 / 4 },
  { label: "2:3", ratio: 2 / 3 },
];

function detectAspectRatio(width: number, height: number): string {
  const ratio = width / height;
  let closest = GEMINI_ASPECT_RATIOS[0];
  let minDiff = Infinity;
  for (const candidate of GEMINI_ASPECT_RATIOS) {
    const diff = Math.abs(candidate.ratio - ratio);
    if (diff < minDiff) {
      minDiff = diff;
      closest = candidate;
    }
  }
  return closest.label;
}

function buildInstruction(userDescription: string, isPattern: boolean): string {
  const where = userDescription?.trim()
    ? `The user indicates where to apply it: "${userDescription.trim()}".`
    : "Apply it to the main / largest visible wall in the room.";

  const designKind = isPattern
    ? "The second image is a REPEATING PATTERN: it must tile seamlessly at a consistent small scale (about a 30-40cm repeat) across the entire wall, like real wallpaper."
    : "The second image is a SINGLE MURAL: it is one continuous design that stretches to cover the entire wall, preserving its original composition and proportions.";

  return [
    "You are editing a real interior photograph to preview a wall covering.",
    "The FIRST image is the room photo. The SECOND image is the mural/wallpaper design to apply.",
    designKind,
    where,
    "The design must cover the ENTIRE target wall from floor to ceiling and edge to edge, like professionally installed wallpaper flush against the wall — not a framed poster or floating overlay.",
    "Match the wall's perspective and geometry so it looks naturally integrated, wrapping into corners where the wall meets another surface.",
    "Reproduce the design from the second image with ABSOLUTE FIDELITY: exact colors, shapes and composition. Do NOT reinterpret, recolor, simplify, add or remove any element.",
    "CRITICAL — preserve everything else PIXEL-PERFECT identical to the first image: furniture, plants, fixtures, objects on or in front of the wall, the floor, ceiling, other walls, and the camera framing must stay completely unchanged.",
    "CRITICAL — do NOT alter the lighting in any way. Keep the original exposure, color temperature, shadows and light gradients exactly as in the photo. Do NOT add light sources, glows, reflections, HDR, vignette or extra contrast. The wallpaper should simply inherit the room's existing light and shadows.",
    "The result must look like a real photograph of that same room, not a render.",
  ].join(" ");
}

// Rate limiter por IP en memoria (emergencia, anti cookie-delete)
const IP_HARD_LIMIT = 20; // máximo absoluto por IP por día
const ipGenerations = new Map<string, { count: number; resetAt: number }>();

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipGenerations.get(ip);

  if (!entry || now > entry.resetAt) {
    ipGenerations.set(ip, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= IP_HARD_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

async function uploadToCloudinary(dataUri: string, publicId: string): Promise<string | null> {
  try {
    dlog("⬆ subiendo resultado a Cloudinary, public_id:", publicId);
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "mercedescostal/visualizations",
      public_id: publicId,
      overwrite: true,
    });
    dlog("  ↳ Cloudinary OK:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("[Visualizer] ❌ Error subiendo a Cloudinary:", error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const reqStart = Date.now();
  try {
    // Rate limit por IP (anti cookie-delete)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";

    dlog(`▶ POST /api/visualizer recibido | ip=${ip} | NODE_ENV=${process.env.NODE_ENV}`);

    if (process.env.NODE_ENV === "production" && !checkIpRateLimit(ip)) {
      console.warn("[Visualizer] ⛔ IP hard limit alcanzado:", ip);
      return NextResponse.json({ success: false, error: "LIMIT_REACHED", message: "Has alcanzado el límite de visualizaciones" }, { status: 429 });
    }

    const cookieStore = await cookies();
    const generationCount = parseInt(cookieStore.get("mc_generations")?.value || "0", 10);
    const leadCaptured = cookieStore.get("mc_lead_captured")?.value === "true";

    const maxAllowed = leadCaptured ? MAX_FREE_GENERATIONS + MAX_BONUS_GENERATIONS : MAX_FREE_GENERATIONS;
    dlog(`cuota: usadas=${generationCount} | leadCaptured=${leadCaptured} | maxAllowed=${maxAllowed}`);

    if (generationCount >= MAX_FREE_GENERATIONS && !leadCaptured) {
      dlog("⛔ LEAD_REQUIRED (sin lead y agotó las gratis)");
      return NextResponse.json({ success: false, error: "LEAD_REQUIRED", message: "Dejá tus datos para continuar" }, { status: 403 });
    }

    if (generationCount >= maxAllowed) {
      dlog("⛔ LIMIT_REACHED");
      return NextResponse.json({ success: false, error: "LIMIT_REACHED", message: "Has alcanzado el límite de visualizaciones" }, { status: 429 });
    }

    const formData = await req.formData();
    const roomImage = formData.get("roomImage") as File | null;
    const muralImageUrl = formData.get("muralImageUrl") as string | null;
    const isPattern = formData.get("isPattern") === "true";
    const userDescription = ((formData.get("userDescription") as string) || "").slice(0, 500);
    const muralId = (formData.get("muralId") as string) || "";
    const muralTitle = (formData.get("muralTitle") as string) || "";
    const collectionId = (formData.get("collectionId") as string) || "";
    const collectionTitle = (formData.get("collectionTitle") as string) || "";
    const colorName = (formData.get("colorName") as string) || "";

    dlog("formData:", {
      roomImage: roomImage ? `${roomImage.name} (${(roomImage.size / 1024).toFixed(0)}KB, ${roomImage.type})` : null,
      muralImageUrl,
      isPattern,
      muralId,
      muralTitle,
      collectionId,
      collectionTitle,
      colorName,
      userDescription: userDescription || "(vacío)",
    });

    if (!roomImage || !muralImageUrl) {
      dlog("⛔ falta roomImage o muralImageUrl");
      return NextResponse.json({ success: false, error: "Necesitamos la foto de tu espacio y un mural seleccionado para generar la visualización." }, { status: 400 });
    }

    if (roomImage.size > MAX_FILE_SIZE) {
      dlog("⛔ imagen demasiado grande:", roomImage.size);
      return NextResponse.json({ success: false, error: "La imagen es demasiado grande. Por favor, subí una foto de hasta 5MB." }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(roomImage.type)) {
      dlog("⛔ formato no permitido:", roomImage.type);
      return NextResponse.json({ success: false, error: "El formato de imagen no es compatible. Usá una foto en JPG, PNG o WebP." }, { status: 400 });
    }

    try {
      const parsedUrl = new URL(muralImageUrl);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        dlog("⛔ protocolo de muralImageUrl inválido:", parsedUrl.protocol);
        return NextResponse.json({ success: false, error: "No pudimos cargar el mural seleccionado." }, { status: 400 });
      }
    } catch {
      dlog("⛔ muralImageUrl no es una URL válida");
      return NextResponse.json({ success: false, error: "No pudimos cargar el mural seleccionado." }, { status: 400 });
    }

    dlog("procesando imágenes con sharp...");
    const roomBuffer = Buffer.from(await roomImage.arrayBuffer());
    const roomProcessed = await processImage(roomBuffer);
    dlog(`  ↳ room: ${roomProcessed.width}x${roomProcessed.height} | base64=${(roomProcessed.base64.length / 1024).toFixed(0)}KB`);

    const muralBuffer = await getImageBuffer(muralImageUrl);
    const muralProcessed = await processImage(muralBuffer);
    dlog(`  ↳ mural: ${muralProcessed.width}x${muralProcessed.height} | base64=${(muralProcessed.base64.length / 1024).toFixed(0)}KB`);

    const aspectRatio = detectAspectRatio(roomProcessed.width, roomProcessed.height);
    const instruction = buildInstruction(userDescription, isPattern);
    dlog(`aspectRatio detectado: ${aspectRatio} | modelo: ${IMAGE_MODEL} | imageSize: 2K`);
    dlog("instrucción enviada al modelo:\n" + instruction);

    // Nano Banana Pro: edición sincrónica con 2 imágenes de referencia (foto + mural)
    dlog("⏳ llamando a Gemini...");
    const genStart = Date.now();
    const generated = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: [
        { text: instruction },
        { inlineData: { mimeType: "image/png", data: roomProcessed.base64 } },
        { inlineData: { mimeType: "image/png", data: muralProcessed.base64 } },
      ],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio,
          imageSize: "2K",
        },
      },
    }).catch((error: unknown) => {
      console.error("[Visualizer] ❌ Error de Gemini:", error);
      return null;
    });
    dlog(`Gemini respondió en ${Date.now() - genStart}ms`);

    if (!generated) {
      dlog("⛔ Gemini devolvió null (ver error arriba) → 502");
      return NextResponse.json({ success: false, error: "No pudimos generar la visualización en este momento. Por favor, intentá de nuevo en unos minutos." }, { status: 502 });
    }

    const parts = generated.candidates?.[0]?.content?.parts || [];
    const finishReason = generated.candidates?.[0]?.finishReason;
    dlog(`respuesta: candidates=${generated.candidates?.length || 0} | parts=${parts.length} | finishReason=${finishReason}`);

    // Si el modelo devuelve texto (típico en rechazos/safety), lo logueamos: clave para debug.
    const textParts = parts.map((p) => p.text).filter(Boolean);
    if (textParts.length) dlog("⚠ texto devuelto por el modelo:", textParts.join(" | "));

    const imagePart = parts.find((p) => p.inlineData?.data);
    const imageBase64 = imagePart?.inlineData?.data;
    const imageMime = imagePart?.inlineData?.mimeType || "image/png";
    dlog(`imagen en respuesta: ${imageBase64 ? "SÍ" : "NO"} | mime=${imageMime} | base64=${imageBase64 ? (imageBase64.length / 1024).toFixed(0) + "KB" : "N/A"}`);

    if (!imageBase64) {
      console.error("[Visualizer] ⛔ Gemini no devolvió imagen. finishReason:", finishReason, "| parts:", JSON.stringify(parts).slice(0, 500));
      return NextResponse.json({ success: false, error: "No pudimos generar la visualización. Probá con otra foto o una descripción más detallada del espacio." }, { status: 502 });
    }

    const visualizationId = randomUUID();
    dlog("visualizationId generado:", visualizationId);
    const dataUri = `data:${imageMime};base64,${imageBase64}`;
    const cloudinaryUrl = await uploadToCloudinary(dataUri, visualizationId);
    const imageUrl = cloudinaryUrl || dataUri;
    if (!cloudinaryUrl) dlog("⚠ Cloudinary falló, devuelvo data URI inline (no se persiste)");

    const newCount = generationCount + 1;
    const remaining = maxAllowed - newCount;

    // Guardar en DB (no bloquea la respuesta si falla)
    try {
      await connectDB();
      await Visualization.create({
        taskId: visualizationId,
        status: "COMPLETED",
        muralId,
        muralTitle,
        collectionId,
        collectionTitle,
        colorName,
        isPattern,
        userDescription,
        prompt: instruction,
        imageUrl: cloudinaryUrl,
        completedAt: new Date(),
        ip,
      });
      dlog("💾 guardado en DB (taskId =", visualizationId + ")");
    } catch (dbError) {
      console.error("[Visualizer] ❌ Error guardando en DB (no bloquea):", dbError);
    }

    const res = NextResponse.json({
      success: true,
      visualizationId,
      imageUrl,
      generationsRemaining: remaining,
    });

    res.cookies.set("mc_generations", newCount.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    dlog(`✓ OK en ${Date.now() - reqStart}ms | restantes=${remaining} | imageUrl=${imageUrl.slice(0, 80)}...`);
    return res;

  } catch (error) {
    console.error(`[Visualizer] ❌ Error inesperado (tras ${Date.now() - reqStart}ms):`, error);
    return NextResponse.json({ success: false, error: "Algo salió mal al generar la visualización. Por favor, intentá de nuevo." }, { status: 500 });
  }
}
