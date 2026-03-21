import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token } = body;

  // ===== Validate Token Presence =====
  if (!token) {
    return NextResponse.json(
      { message: "Verification token is required" },
      { status: 400 },
    );
  }

  try {
    // ===== Lookup Token In Database =====
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Verification token not found" },
        { status: 404 },
      );
    }

    // ===== Check Token Expiry =====
    const hasExpired = new Date() > verificationToken.expires;
    if (hasExpired) {
      return NextResponse.json(
        { message: "Verification token has expired" },
        { status: 400 },
      );
    }

    // ===== Delete Token & Verify User Email =====
    await prisma.verificationToken.delete({
      where: {
        email_token: {
          token: verificationToken.token,
          email: verificationToken.email,
        },
      },
    });

    await prisma.user.update({
      where: { email: verificationToken.email },
      data: { emailVerified: true },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
