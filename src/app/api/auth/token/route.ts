import { generateToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email)
    return NextResponse.json("bad request email not provided", { status: 400 });

  try {
    const verificationToken = await generateToken(email);
    return NextResponse.json(verificationToken, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
