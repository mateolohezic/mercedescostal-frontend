import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const MAX_FREE_GENERATIONS = 3;
const MAX_BONUS_GENERATIONS = 3;

export async function POST(_req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const bonusClaimed = cookieStore.get("mc_bonus_claimed")?.value === "true";
    if (bonusClaimed) {
      return NextResponse.json({ success: false, error: "Ya recibiste visualizaciones adicionales." }, { status: 400 });
    }

    const currentCount = parseInt(cookieStore.get("mc_generations")?.value || "0", 10);
    const newCount = Math.max(0, currentCount - 3);
    const maxAllowed = MAX_FREE_GENERATIONS + MAX_BONUS_GENERATIONS;

    const res = NextResponse.json({ success: true, generationsRemaining: maxAllowed - newCount });

    res.cookies.set("mc_generations", newCount.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.cookies.set("mc_bonus_claimed", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch {
    return NextResponse.json({ success: false, error: "No pudimos procesar tu solicitud. Por favor, intentá de nuevo." }, { status: 500 });
  }
}
