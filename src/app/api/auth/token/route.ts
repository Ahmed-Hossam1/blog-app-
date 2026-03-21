import { generateToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  // ===== Validate Email Presence =====
  if (!email)
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 },
    );

  try {
    // ===== Generate Verification Token =====
    const verificationToken = await generateToken(email);
    return NextResponse.json(verificationToken, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
