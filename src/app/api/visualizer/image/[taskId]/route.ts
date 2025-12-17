import { NextRequest, NextResponse } from "next/server";

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_BASE_URL = "https://api.freepik.com/v1/ai/text-to-image/seedream-v4-edit";

export async function GET(_: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  try {
    const statusResponse = await fetch(`${FREEPIK_BASE_URL}/${taskId}`, {
      headers: { "x-freepik-api-key": FREEPIK_API_KEY! },
      cache: "no-store",
    });

    const statusData = await statusResponse.json();
    const imageUrl = statusData.data?.generated?.[0];

    if (!imageUrl) return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });

    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="visualizacion-mural-${taskId}.jpg"`,
        "Cache-Control": "public, max-age=31536000",
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "Error descargando imagen" }, { status: 500 });
  }
}