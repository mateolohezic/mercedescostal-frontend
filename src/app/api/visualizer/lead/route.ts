import { NextRequest, NextResponse } from "next/server";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSewIAF3Jxn2Hh7i3PEqtq56-j3epfrIgCfbtv_88uKHRgYX6g/formResponse";
const ENTRY_NOMBRE = "entry.1624532104";
const ENTRY_EMAIL = "entry.1847391216";

export async function POST(req: NextRequest) {
  try {
    const { nombre, email } = await req.json();
    if (!nombre || !email) return NextResponse.json({ success: false, error: "Nombre y email son requeridos" }, { status: 400 });

    const formData = new URLSearchParams();
    formData.append(ENTRY_NOMBRE, nombre);
    formData.append(ENTRY_EMAIL, email);

    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const res = NextResponse.json({ success: true });
    
    res.cookies.set("mc_lead_captured", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365,
    });

    res.cookies.set("mc_generations", "0", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;

  } catch (error) {
    return NextResponse.json({ success: false, error: "Error guardando datos" }, { status: 500 });
  }
}