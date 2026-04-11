import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();
  const { token } = body;

  // ===== Validate Token Presence =====
  if (!token) {
    return NextResponse.json(
      { message: "Token is required" },
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

    // ===== Find User By Session Id =====
    const existingUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    // ===== Update User Email (token.email holds the new email) =====
    await prisma.user.update({
      where: { id: userId },
      data: { email: verificationToken.email, emailVerified: true },
    });

    // ===== Delete Token After Use =====
    await prisma.verificationToken.delete({
      where: {
        email_token: {
          token: verificationToken.token,
          email: verificationToken.email,
        },
      },
    });

    return NextResponse.json(
      { message: "Email updated and verified successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("verify-email error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
