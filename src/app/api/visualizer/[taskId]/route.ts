import { NextRequest, NextResponse } from "next/server";

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_BASE_URL = "https://api.freepik.com/v1/ai/text-to-image/seedream-v4-edit";

export async function GET(_: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  try {
    const url = `${FREEPIK_BASE_URL}/${taskId}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-freepik-api-key": FREEPIK_API_KEY!,
        },
        cache: "no-store",
    });

    if (response.status >= 500) return NextResponse.json({ success: true, taskId: taskId, status: "IN_PROGRESS", imageUrl: null });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) return NextResponse.json({ success: true, taskId: taskId, status: "IN_PROGRESS", imageUrl: null });

    const data = await response.json();

    if (!response.ok) return NextResponse.json({ success: false, error: data.message || "Error consultando tarea" }, { status: response.status });

    const result = { success: true, taskId: data.data.task_id, status: data.data.status, imageUrl: data.data.generated?.[0] || null };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: true, taskId: taskId, status: "IN_PROGRESS", imageUrl: null });
  }
}