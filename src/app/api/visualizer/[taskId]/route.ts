import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/db";
import { Visualization } from "@/models/Visualization";

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const FREEPIK_BASE_URL = "https://api.freepik.com/v1/ai/text-to-image/seedream-v4-5-edit";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(imageUrl: string, taskId: string): Promise<string | null> {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "mercedescostal/visualizations",
      public_id: taskId,
      overwrite: true,
    });
    return result.secure_url;
  } catch (error) {
    console.error("[Visualizer] Error subiendo a Cloudinary:", error);
    return null;
  }
}

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

    if (!response.ok) return NextResponse.json({ success: false, error: "Hubo un problema al verificar el estado de tu visualización." }, { status: response.status });

    if (!data?.data) {
      return NextResponse.json({ success: true, taskId, status: "IN_PROGRESS", imageUrl: null });
    }

    const status = data.data.status;
    const freepikImageUrl = data.data.generated?.[0] || null;
    const result = { success: true, taskId: data.data.task_id, status, imageUrl: freepikImageUrl };
    const res = NextResponse.json(result);

    if (status === "COMPLETED" || status === "FAILED") {
      res.cookies.set("mc_pending_task", "", { maxAge: 0 });

      // Actualizar DB y subir a Cloudinary en background
      (async () => {
        try {
          await connectDB();
          const updateData: Record<string, unknown> = {
            status,
            completedAt: new Date(),
          };

          if (status === "COMPLETED" && freepikImageUrl) {
            const cloudinaryUrl = await uploadToCloudinary(freepikImageUrl, taskId);
            if (cloudinaryUrl) {
              updateData.imageUrl = cloudinaryUrl;
              console.log("[Visualizer] Imagen subida a Cloudinary:", cloudinaryUrl);
            } else {
              updateData.imageUrl = freepikImageUrl;
            }
          }

          await Visualization.findOneAndUpdate({ taskId }, updateData);
          console.log("[Visualizer] DB actualizada para task:", taskId, "status:", status);
        } catch (dbError) {
          console.error("[Visualizer] Error actualizando DB/Cloudinary:", dbError);
        }
      })();
    }

    return res;
  } catch (error) {
    return NextResponse.json({ success: true, taskId: taskId, status: "IN_PROGRESS", imageUrl: null });
  }
}
