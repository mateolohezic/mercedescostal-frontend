import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import OpenAI from "openai";
import sharp from "sharp";
import { connectDB } from "@/lib/db";
import { Visualization } from "@/models/Visualization";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_API_URL = "https://api.freepik.com/v1/ai/text-to-image/seedream-v4-5-edit";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FREE_GENERATIONS = 3;
const MAX_BONUS_GENERATIONS = 3;
const MAX_DIMENSION = 2048;

async function getImageBuffer(url: string): Promise<Buffer> {
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
  } else {
    // Convert to PNG at max quality without resizing
    processedBuffer = await sharp(buffer).png({ quality: 100 }).toBuffer();
  }

  return {
    base64: processedBuffer.toString("base64"),
    width: finalWidth,
    height: finalHeight,
  };
}

function detectAspectRatio(width: number, height: number): string {
  const ratio = width / height;
  // Map to Freepik's supported aspect ratios
  if (ratio >= 2.2) return "cinematic_21_9";
  if (ratio >= 1.7) return "widescreen_16_9";
  if (ratio >= 1.4) return "standard_3_2";
  if (ratio >= 1.2) return "classic_4_3";
  if (ratio >= 0.9) return "square_1_1";
  if (ratio >= 0.7) return "traditional_3_4";
  if (ratio >= 0.6) return "portrait_2_3";
  return "social_story_9_16";
}

async function generateOptimizedPrompt(
  roomImageBase64: string,
  userDescription: string,
  isPattern: boolean
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 1500,
    messages: [
      {
        role: "system",
        content: `You are a senior prompt engineer specializing in AI image editing for interior design visualization. Your job is to write EXHAUSTIVE, HIGHLY DETAILED prompts that will be sent to Freepik's Seedream image editing model to apply a wallpaper/mural onto a wall in a room photo.

The model will receive TWO reference images:
- Reference image 1: The room photo (the one you are analyzing now)
- Reference image 2: The mural/wallpaper design (you do NOT see this — do NOT describe it)

YOUR PROMPT MUST INCLUDE ALL OF THE FOLLOWING SECTIONS:

1. **ROOM ANALYSIS** — Describe in detail what you see:
   - Type of room (bedroom, living room, bathroom, office, etc.)
   - Camera angle and perspective (straight-on, angled left/right, from above/below)
   - Lighting conditions (natural light from window, artificial warm/cool light, shadows direction, intensity)
   - Wall surface material and current color/texture of the TARGET wall
   - Exact boundaries of the target wall (what's to the left, right, top, bottom — doors, windows, corners, ceiling, floor)

2. **TARGET WALL SPECIFICATION** — Be surgically precise:
   - Which wall exactly (use spatial references: "the wall behind the bed", "the wall to the left of the window")
   - What objects are IN FRONT of the wall (furniture, fixtures) that must remain visible
   - What objects are ON the wall (shelves, frames, switches, outlets) — these should remain on top of the wallpaper
   - Do NOT guess or invent specific measurements (feet, meters, cm). Only describe relative size and proportions

3. **APPLICATION INSTRUCTIONS** — How the wallpaper must be applied:
   - The wallpaper must cover the ENTIRE wall surface from floor to ceiling, edge to edge
   - It must look like professionally installed wallpaper — flush against the wall, not floating
   - Perspective must match the camera angle and wall geometry exactly
   - Lighting and shadows from the room must naturally affect the wallpaper surface (shadows from furniture, light gradients from windows)
   - The wallpaper must wrap correctly into corners if the wall meets another surface
   - ALL objects in front of the wall (furniture, plants, fixtures) must remain EXACTLY as they are — unchanged, not covered
   - The rest of the room (floor, ceiling, other walls, furniture) must remain COMPLETELY UNCHANGED

4. **MURAL FIDELITY** — CRITICAL, emphasize this strongly in your prompt:
   - The design from reference image 2 must be reproduced with ABSOLUTE FIDELITY — no reinterpretation, no artistic liberty, no color shifts
   - Do NOT alter, modify, simplify, add to, or remove ANY element from the mural/pattern design
   - Colors must match EXACTLY — no saturation changes, no hue shifts, no warming/cooling
   - If it's a pattern, the repeat scale, spacing, and alignment must be consistent and uniform
   - If it's a mural, the composition and proportions must be preserved exactly as in the original
   - The design should look like a HIGH-RESOLUTION PRINT on the wall, not a digital overlay or projection

5. **LIGHTING AND PHOTOREALISM** — CRITICAL:
   - DO NOT add, modify, or enhance the lighting in any way. The lighting must remain IDENTICAL to the original photo
   - Do NOT add light sources, glows, spotlights, warm spots, reflections, or any illumination that does not exist in the original
   - Do NOT make the image brighter, warmer, cooler, or more dramatic than the original
   - The wallpaper surface should simply inherit the EXISTING light and shadow conditions visible in the photo — nothing more
   - Match the image grain, noise, color temperature, and exposure of the original photo EXACTLY
   - The final image must be photorealistic — it should look like a real photograph, not a render
   - No artificial glow, no unrealistic sharpness, no HDR look, no vignette, no added contrast

DO NOT describe the mural/wallpaper design itself — it is provided as a separate reference image.
Write the prompt in English.
Respond ONLY with the prompt. No explanations, no headers, no bullet points — just a flowing, detailed paragraph prompt.`,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${roomImageBase64}`, detail: "high" },
          },
          {
            type: "text",
            text: `TYPE: ${isPattern ? "REPEATING PATTERN — the design must tile seamlessly and repeat at a consistent small scale (approximately 30-40cm repeat) across the entire wall surface, like real wallpaper." : "SINGLE MURAL — the design is one continuous image that stretches to cover the entire wall, maintaining its original proportions and composition."}

USER'S INDICATION OF WHERE TO APPLY: "${userDescription || "On the main/largest visible wall in the room"}"

Write the complete, detailed prompt now:`,
          },
        ],
      },
    ],
  });

  const generatedPrompt = response.choices[0]?.message?.content;

  if (!generatedPrompt) {
    throw new Error("OpenAI no generó prompt");
  }

  return generatedPrompt;
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

export async function POST(req: NextRequest) {
  try {
    // Rate limit por IP (anti cookie-delete)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";

    if (process.env.NODE_ENV === "production" && !checkIpRateLimit(ip)) {
      console.warn("[Visualizer] IP hard limit alcanzado:", ip);
      return NextResponse.json({ success: false, error: "LIMIT_REACHED", message: "Has alcanzado el límite de visualizaciones" }, { status: 429 });
    }

    const cookieStore = await cookies();
    const generationCount = parseInt(cookieStore.get("mc_generations")?.value || "0", 10);
    const leadCaptured = cookieStore.get("mc_lead_captured")?.value === "true";

    const maxAllowed = leadCaptured ? MAX_FREE_GENERATIONS + MAX_BONUS_GENERATIONS : MAX_FREE_GENERATIONS;

    if (generationCount >= MAX_FREE_GENERATIONS && !leadCaptured) {
      return NextResponse.json({ success: false, error: "LEAD_REQUIRED", message: "Dejá tus datos para continuar" }, { status: 403 });
    }

    if (generationCount >= maxAllowed) {
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

    if (!roomImage || !muralImageUrl) {
      return NextResponse.json({ success: false, error: "Necesitamos la foto de tu espacio y un mural seleccionado para generar la visualización." }, { status: 400 });
    }

    if (roomImage.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "La imagen es demasiado grande. Por favor, subí una foto de hasta 5MB." }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(roomImage.type)) {
      return NextResponse.json({ success: false, error: "El formato de imagen no es compatible. Usá una foto en JPG, PNG o WebP." }, { status: 400 });
    }

    try {
      const parsedUrl = new URL(muralImageUrl);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return NextResponse.json({ success: false, error: "No pudimos cargar el mural seleccionado." }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ success: false, error: "No pudimos cargar el mural seleccionado." }, { status: 400 });
    }

    const roomBuffer = Buffer.from(await roomImage.arrayBuffer());
    const roomProcessed = await processImage(roomBuffer);

    const muralBuffer = await getImageBuffer(muralImageUrl);
    const muralProcessed = await processImage(muralBuffer);

    const aspectRatio = detectAspectRatio(roomProcessed.width, roomProcessed.height);

    let prompt: string;
    try {
      prompt = await generateOptimizedPrompt(roomProcessed.base64, userDescription, isPattern);
    } catch (error) {
      console.warn("[Visualizer] OpenAI falló, usando prompt estático:", error instanceof Error ? error.message : error);
      const locationHint = userDescription || "Apply to the main/largest wall in the room.";
      prompt = isPattern
        ? `Apply the repeating pattern from the second reference image as seamless wallpaper covering the ENTIRE main wall of the room shown in the first reference image. The pattern must tile continuously from floor to ceiling and edge to edge at a consistent small scale. Preserve the pattern's original colors, shapes, and design EXACTLY without any modification. Adjust perspective to match the wall's geometry. Keep all existing furniture, decorations, lighting, and architectural features completely unchanged. ${locationHint}`
        : `Apply the mural from the second reference image onto the main wall of the room shown in the first reference image. The mural must cover the ENTIRE wall surface from floor to ceiling, edge to edge, like professionally installed wallpaper. Maintain the mural's original colors, proportions, and design elements EXACTLY as they are. Adjust only the perspective to match the wall's geometry so it looks naturally integrated. Keep all existing furniture, decorations, lighting, and architectural features completely unchanged. ${locationHint}`;
    }

    // Envolver el prompt con instrucciones fijas para Freepik
    const finalPrompt = `STRICT RULE: Do NOT alter the lighting, exposure, color temperature, or shadows of the original photo in ANY way. The ONLY change allowed is applying the wallpaper/mural from reference image 2 onto the specified wall. Everything else — light, shadows, colors, objects, furniture — must remain PIXEL-PERFECT identical to reference image 1. Do NOT add light sources, glows, warm spots, or any illumination effect.\n\n${prompt}\n\nREMINDER: Preserve the EXACT lighting from the original photo. Zero modifications to light, exposure, or atmosphere.`;

    const response = await fetch(FREEPIK_API_URL, {
      method: "POST",
      headers: {
        "x-freepik-api-key": FREEPIK_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: finalPrompt,
        reference_images: [roomProcessed.base64, muralProcessed.base64],
        aspect_ratio: aspectRatio,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Visualizer] Freepik error:", data);
      return NextResponse.json({ success: false, error: "No pudimos generar la visualización en este momento. Por favor, intentá de nuevo en unos minutos." }, { status: 502 });
    }

    if (!data?.data?.task_id) {
      console.error("[Visualizer] Freepik response missing task_id:", data);
      return NextResponse.json({ success: false, error: "No pudimos iniciar la generación. Por favor, intentá de nuevo." }, { status: 502 });
    }

    const newCount = generationCount + 1;
    const remaining = maxAllowed - newCount;

    // Guardar en DB (no bloquea la respuesta si falla)
    try {
      await connectDB();
      await Visualization.create({
        taskId: data.data.task_id,
        status: data.data.status,
        muralId,
        muralTitle,
        collectionId,
        collectionTitle,
        colorName,
        isPattern,
        userDescription,
        prompt,
        ip,
      });
    } catch (dbError) {
      console.error("[Visualizer] Error guardando en DB (no bloquea):", dbError);
    }

    const res = NextResponse.json({
      success: true,
      taskId: data.data.task_id,
      status: data.data.status,
      generationsRemaining: remaining,
    });

    res.cookies.set("mc_generations", newCount.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.cookies.set("mc_pending_task", data.data.task_id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 5,
    });

    return res;

  } catch (error) {
    console.error("[Visualizer] Error:", error);
    return NextResponse.json({ success: false, error: "Algo salió mal al generar la visualización. Por favor, intentá de nuevo." }, { status: 500 });
  }
}
