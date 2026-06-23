import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Visualization } from "@/models/Visualization";

export async function POST(req: NextRequest) {
  try {
    const { taskId, feedback } = await req.json();
    console.log("[Visualizer:feedback] ▶ recibido:", { taskId, feedback });

    if (!taskId || !["up", "down"].includes(feedback)) {
      console.log("[Visualizer:feedback] ⛔ datos inválidos");
      return NextResponse.json({ success: false, error: "Datos inválidos" }, { status: 400 });
    }

    await connectDB();
    const updated = await Visualization.findOneAndUpdate({ taskId }, { feedback });
    console.log(`[Visualizer:feedback] ${updated ? "✓ guardado" : "⚠ no se encontró el registro"} para taskId=${taskId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Visualizer:feedback] ❌ error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
