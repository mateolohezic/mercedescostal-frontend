import { NextRequest, NextResponse } from "next/server";

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_BASE_URL = "https://api.freepik.com/v1/ai/text-to-image/seedream-v4-5-edit";

export async function GET(req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  const filename = req.nextUrl.searchParams.get("filename") || `visualizacion-mural-${taskId}`;

  if (!taskId || !/^[a-zA-Z0-9_-]+$/.test(taskId)) {
    return NextResponse.json({ error: "La imagen no está disponible." }, { status: 400 });
  }

  try {
    const statusResponse = await fetch(`${FREEPIK_BASE_URL}/${taskId}`, {
      headers: { "x-freepik-api-key": FREEPIK_API_KEY! },
      cache: "no-store",
    });

    if (!statusResponse.ok) {
      return NextResponse.json({ error: "La imagen no está disponible en este momento." }, { status: 502 });
    }

    const statusData = await statusResponse.json();
    const imageUrl = statusData.data?.generated?.[0];

    if (!imageUrl) return NextResponse.json({ error: "La imagen aún no está lista o ya no está disponible." }, { status: 404 });

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json({ error: "No pudimos descargar la imagen. Es posible que haya expirado." }, { status: 502 });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${filename.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ _-]/g, "")}.jpg"`,
        "Cache-Control": "public, max-age=31536000",
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "No pudimos descargar la imagen. Por favor, intentá de nuevo." }, { status: 500 });
  }
}
