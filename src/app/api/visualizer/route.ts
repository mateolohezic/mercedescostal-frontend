import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { callGeminiWithRetry, GeminiRateLimitError } from "@/lib/gemini-utils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FREE_GENERATIONS = 3;
const MAX_BONUS_GENERATIONS = 3;
const MAX_DIMENSION = 2048;
const MAX_RETRY_TIME = 60000; // 60 segundos

async function getImageBuffer(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se pudo descargar la imagen");
  return Buffer.from(await response.arrayBuffer());
}

async function processImage(buffer: Buffer): Promise<{ base64: string; mimeType: string }> {
  const metadata = await sharp(buffer).metadata();
  let processedBuffer = buffer;

  if (metadata.width && metadata.height) {
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      processedBuffer = await sharp(buffer)
        .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 100 })
        .toBuffer();
    }
  }

  return {
    base64: processedBuffer.toString("base64"),
    mimeType: "image/jpeg",
  };
}

async function generateOptimizedPrompt(
  roomImageBase64: string,
  mimeType: string,
  userDescription: string,
  isPattern: boolean
): Promise<string> {
  const systemPrompt = `Eres un experto en diseño de interiores y visualización de murales/papeles tapiz.

Tu tarea es crear un prompt ESPECÍFICO y DETALLADO para que un modelo de IA genere una imagen donde se aplique un mural o patrón en una pared de la habitación.

REGLAS IMPORTANTES para el prompt que generes:
- El mural/patrón debe CUBRIR COMPLETAMENTE la pared indicada, de piso a techo, de esquina a esquina
- NO debe verse como un cuadro o poster colgado, sino como papel tapiz que cubre toda la superficie
- Los colores y elementos del mural deben mantenerse EXACTAMENTE iguales, sin modificaciones
- Los muebles, decoraciones e iluminación de la habitación deben permanecer intactos
- Debe ajustarse la perspectiva del mural para que se vea natural en la pared
- NO describas el mural, ya que sera adjuntado. No expliques los elementos del mural ni nada relacionado con eso, solo habla del espacio.

Analiza la imagen de la habitación que te envío y la descripción del usuario para generar el prompt perfecto.

Responde ÚNICAMENTE con el prompt optimizado, sin explicaciones adicionales.`;

  const userMessage = `
Tipo de imagen a aplicar: ${isPattern ? "PATRÓN REPETITIVO (debe repetirse para cubrir toda la pared)" : "MURAL (imagen única que se estira para cubrir toda la pared)"}

Descripción del usuario sobre dónde aplicar el mural:
"${userDescription || "En la pared principal de la habitación"}"

Genera el prompt optimizado para aplicar el ${isPattern ? "patrón" : "mural"} en esta habitación:`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { text: systemPrompt },
      { inlineData: { mimeType, data: roomImageBase64 } },
      { text: userMessage },
    ],
  });

  const generatedPrompt = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!generatedPrompt) {
    return isPattern
      ? "Aplica el patrón repetitivo de la segunda imagen como papel tapiz que cubre COMPLETAMENTE toda la pared principal de la habitación, de piso a techo. El patrón debe mantenerse exactamente igual sin alteraciones. Mantén todos los muebles y decoraciones intactos."
      : "Aplica el mural de la segunda imagen como papel tapiz que cubre COMPLETAMENTE toda la pared principal de la habitación, de piso a techo. El mural debe estirarse para ocupar toda la pared, manteniendo sus colores y elementos exactamente iguales. Mantén todos los muebles y decoraciones intactos.";
  }

  return generatedPrompt;
}

export async function POST(req: NextRequest) {
  try {
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
    const userDescription = (formData.get("userDescription") as string) || "";

    if (!roomImage || !muralImageUrl) {
      return NextResponse.json({ success: false, error: "Se requieren la imagen de la habitación y la URL del mural" }, { status: 400 });
    }

    if (roomImage.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "La imagen no puede superar los 5MB" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(roomImage.type)) {
      return NextResponse.json({ success: false, error: "Solo se permiten imágenes JPG, PNG o WebP" }, { status: 400 });
    }

    // Procesar imágenes
    const roomBuffer = Buffer.from(await roomImage.arrayBuffer());
    const roomProcessed = await processImage(roomBuffer);
    const muralBuffer = await getImageBuffer(muralImageUrl);
    const muralProcessed = await processImage(muralBuffer);

    console.log("[Visualizer] Generando prompt optimizado...");

    // PASO 1: Generar prompt optimizado con retry
    const optimizedPrompt = await callGeminiWithRetry(
      () => generateOptimizedPrompt(roomProcessed.base64, roomProcessed.mimeType, userDescription, isPattern),
      MAX_RETRY_TIME
    );

    console.log("[Visualizer] Prompt optimizado:", optimizedPrompt.substring(0, 100) + "...");

    // PASO 2: Generar imagen con retry
    const response = await callGeminiWithRetry(
      () => ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [
          { text: optimizedPrompt },
          { inlineData: { mimeType: roomProcessed.mimeType, data: roomProcessed.base64 } },
          { inlineData: { mimeType: muralProcessed.mimeType, data: muralProcessed.base64 } },
        ],
      }),
      MAX_RETRY_TIME
    );

    // Extraer imagen del response
    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData);

    if (!imagePart?.inlineData?.data) {
      console.error("[Visualizer] No image in response");
      return NextResponse.json({ success: false, error: "No se generó imagen" }, { status: 500 });
    }

    const newCount = generationCount + 1;
    const remaining = maxAllowed - newCount;

    const res = NextResponse.json({
      success: true,
      imageBase64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType || "image/png",
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
    console.error("[Visualizer] Error:", error);

    // Error de rate limit después de agotar reintentos
    if (error instanceof GeminiRateLimitError) {
      return NextResponse.json(
        { success: false, error: "SERVICE_OVERLOADED", message: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 });
  }
}






















// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import sharp from "sharp";

// const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
// const FREEPIK_BASE_URL = "https://api.freepik.com/v1/ai/text-to-image/seedream-v4-edit";

// const MAX_FILE_SIZE = 5 * 1024 * 1024;
// const MAX_FREE_GENERATIONS = 3;
// const MAX_BONUS_GENERATIONS = 3;
// const MAX_DIMENSION = 2048;

// async function getImageBuffer(url: string): Promise<Buffer> {
//   const response = await fetch(url);
//   if (!response.ok) throw new Error("No se pudo descargar la imagen");
//   return Buffer.from(await response.arrayBuffer());
// }

// async function processImage(buffer: Buffer): Promise<string> {
//   const metadata = await sharp(buffer).metadata();
//   let processedBuffer = buffer;

//   if (metadata.width && metadata.height) {
//     if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
//       processedBuffer = await sharp(buffer)
//         .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
//         .jpeg({ quality: 85 })
//         .toBuffer();
//     }
//   }

//   return `data:image/jpeg;base64,${processedBuffer.toString("base64")}`;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const generationCount = parseInt(cookieStore.get("mc_generations")?.value || "0", 10);
//     const leadCaptured = cookieStore.get("mc_lead_captured")?.value === "true";

//     const maxAllowed = leadCaptured ? MAX_FREE_GENERATIONS + MAX_BONUS_GENERATIONS : MAX_FREE_GENERATIONS;

//     if (generationCount >= MAX_FREE_GENERATIONS && !leadCaptured) return NextResponse.json({ success: false, error: "LEAD_REQUIRED", message: "Dejá tus datos para continuar" }, { status: 403 });
    
//     if (generationCount >= maxAllowed) return NextResponse.json({ success: false, error: "LIMIT_REACHED", message: "Has alcanzado el límite de visualizaciones" }, { status: 429 });

//     const formData = await req.formData();
//     const roomImage = formData.get("roomImage") as File | null;
//     const muralImageUrl = formData.get("muralImageUrl") as string | null;
//     const isPattern = formData.get("isPattern") === "true";

//     if (!roomImage || !muralImageUrl) return NextResponse.json({ success: false, error: "Se requieren la imagen de la habitación y la URL del mural" }, { status: 400 });
//     if (roomImage.size > MAX_FILE_SIZE) return NextResponse.json({ success: false, error: "La imagen no puede superar los 5MB" }, { status: 400 });

//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
//     if (!allowedTypes.includes(roomImage.type)) return NextResponse.json({ success: false, error: "Solo se permiten imágenes JPG, PNG o WebP" }, { status: 400 });

//     const roomBuffer = Buffer.from(await roomImage.arrayBuffer());
//     const roomImageBase64 = await processImage(roomBuffer);
//     const muralBuffer = await getImageBuffer(muralImageUrl);
//     const muralImageBase64 = await processImage(muralBuffer);

//     const prompt = isPattern
//       ? "Aplica el patrón repetitivo de la segunda imagen como papel tapiz en la pared principal de la habitación mostrada en la primera imagen. El patrón debe mantenerse EXACTAMENTE IGUAL, sin ninguna alteración, modificación ni distorsión en sus colores, formas o diseño. El patrón debe repetirse de forma continua y sin cortes en toda la superficie de la pared, manteniendo una escala pequeña de aproximadamente 36cm y perspectiva correctas. Mantén todos los muebles, decoraciones, iluminación y estructura de la habitación exactamente como están."
//       : "Aplica el mural de la segunda imagen en la pared principal de la habitación mostrada en la primera imagen. IMPORTANTE: El mural debe ser una COPIA EXACTA de la imagen original, sin agregar ni quitar ningún elemento, sin modificar colores, sin distorsionar formas, sin inventar detalles nuevos. Solo ajusta la perspectiva para que se vea natural en la pared. Mantén todos los muebles, decoraciones, iluminación y estructura de la habitación exactamente como están.";

//     const response = await fetch(FREEPIK_BASE_URL, {
//       method: "POST",
//       headers: {
//         "x-freepik-api-key": FREEPIK_API_KEY!,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt,
//         reference_images: [roomImageBase64, muralImageBase64],
//         guidance_scale: 10,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) return NextResponse.json({ success: false, error: data.message || "Error en Freepik API" }, { status: response.status });

//     const newCount = generationCount + 1;
//     const remaining = maxAllowed - newCount;

//     const res = NextResponse.json({
//       success: true,
//       taskId: data.data.task_id,
//       status: data.data.status,
//       generationsRemaining: remaining,
//     });

//     res.cookies.set("mc_generations", newCount.toString(), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 60 * 60 * 24 * 30,
//     });

//     return res;

//   } catch (error) {
//     return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 });
//   }
// }