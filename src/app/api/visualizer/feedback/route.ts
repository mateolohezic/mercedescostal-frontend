import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Visualization } from "@/models/Visualization";

export async function POST(req: NextRequest) {
  try {
    const { taskId, feedback } = await req.json();

    if (!taskId || !["up", "down"].includes(feedback)) {
      return NextResponse.json({ success: false, error: "Datos inválidos" }, { status: 400 });
    }

    await connectDB();
    await Visualization.findOneAndUpdate({ taskId }, { feedback });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
