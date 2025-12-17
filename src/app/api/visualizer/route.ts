import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import sharp from "sharp";

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_BASE_URL = "https://api.freepik.com/v1/ai/text-to-image/seedream-v4-edit";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FREE_GENERATIONS = 3;
const MAX_BONUS_GENERATIONS = 3;
const MAX_DIMENSION = 2048;

async function getImageBuffer(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se pudo descargar la imagen");
  return Buffer.from(await response.arrayBuffer());
}

async function processImage(buffer: Buffer): Promise<string> {
  const metadata = await sharp(buffer).metadata();
  let processedBuffer = buffer;

  if (metadata.width && metadata.height) {
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      processedBuffer = await sharp(buffer)
        .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();
    }
  }

  return `data:image/jpeg;base64,${processedBuffer.toString("base64")}`;
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const generationCount = parseInt(cookieStore.get("mc_generations")?.value || "0", 10);
    const leadCaptured = cookieStore.get("mc_lead_captured")?.value === "true";

    const maxAllowed = leadCaptured ? MAX_FREE_GENERATIONS + MAX_BONUS_GENERATIONS : MAX_FREE_GENERATIONS;

    if (generationCount >= MAX_FREE_GENERATIONS && !leadCaptured) return NextResponse.json({ success: false, error: "LEAD_REQUIRED", message: "Dejá tus datos para continuar" }, { status: 403 });
    
    if (generationCount >= maxAllowed) return NextResponse.json({ success: false, error: "LIMIT_REACHED", message: "Has alcanzado el límite de visualizaciones" }, { status: 429 });

    const formData = await req.formData();
    const roomImage = formData.get("roomImage") as File | null;
    const muralImageUrl = formData.get("muralImageUrl") as string | null;
    const isPattern = formData.get("isPattern") === "true";

    if (!roomImage || !muralImageUrl) return NextResponse.json({ success: false, error: "Se requieren la imagen de la habitación y la URL del mural" }, { status: 400 });
    if (roomImage.size > MAX_FILE_SIZE) return NextResponse.json({ success: false, error: "La imagen no puede superar los 5MB" }, { status: 400 });

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(roomImage.type)) return NextResponse.json({ success: false, error: "Solo se permiten imágenes JPG, PNG o WebP" }, { status: 400 });

    const roomBuffer = Buffer.from(await roomImage.arrayBuffer());
    const roomImageBase64 = await processImage(roomBuffer);
    const muralBuffer = await getImageBuffer(muralImageUrl);
    const muralImageBase64 = await processImage(muralBuffer);

    const prompt = isPattern
      ? "Aplica el patrón repetitivo de la segunda imagen como papel tapiz en la pared principal de la habitación mostrada en la primera imagen. El patrón debe mantenerse EXACTAMENTE IGUAL, sin ninguna alteración, modificación ni distorsión en sus colores, formas o diseño. El patrón debe repetirse de forma continua y sin cortes en toda la superficie de la pared, manteniendo la escala y perspectiva correctas. Mantén todos los muebles, decoraciones, iluminación y estructura de la habitación exactamente como están."
      : "Aplica el mural de la segunda imagen en la pared principal de la habitación mostrada en la primera imagen. El mural debe mantenerse EXACTAMENTE IGUAL, sin ninguna alteración, modificación ni distorsión en sus colores, formas o diseño. El mural debe cubrir la pared como una imagen única a gran escala, con la perspectiva y proporciones correctas. Mantén todos los muebles, decoraciones, iluminación y estructura de la habitación exactamente como están.";

    const response = await fetch(FREEPIK_BASE_URL, {
      method: "POST",
      headers: {
        "x-freepik-api-key": FREEPIK_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        reference_images: [roomImageBase64, muralImageBase64],
        guidance_scale: 2.5,
      }),
    });

    const data = await response.json();

    if (!response.ok) return NextResponse.json({ success: false, error: data.message || "Error en Freepik API" }, { status: response.status });

    const newCount = generationCount + 1;
    const remaining = maxAllowed - newCount;

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

    return res;

  } catch (error) {
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 });
  }
}