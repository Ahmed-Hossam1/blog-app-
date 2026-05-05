import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password: newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "common:messages.fields_missing" },
        { status: 400 }
      );
    }

    // check if token is valid
    const resetToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!resetToken) {
      return NextResponse.json({ message: "auth:messages.invalid_token" }, { status: 400 });
    }

    const hasExpired = new Date() > resetToken.expires;

    if (hasExpired) {
      return NextResponse.json(
        { message: "auth:messages.token_expired" },
        { status: 400 },
      );
    }

    // bring user info from DB
    const user = await prisma.user.findUnique({
      where: {
        email: resetToken.email.trim().toLowerCase(),
      },
    });

    if (!user) {
      return NextResponse.json({ message: "auth:messages.user_not_found" }, { status: 404 });
    }

    // check old password is not the same
    // We only check if user.password exists. If it's an OAuth user, they don't have a password yet.
    if (user.password) {
      const isMatch = await bcrypt.compare(newPassword, user.password);
      if (isMatch) {
        return NextResponse.json(
          { message: "settings:messages.password_same" },
          { status: 400 },
        );
      }
    }

    // create hash for new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // update password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: {
        password: hashedNewPassword,
      },
    });

    // delete token - using the unique token field for simplicity and reliability
    await prisma.verificationToken.delete({
      where: {
        token: token,
      },
    });


    return NextResponse.json(
      { message: "auth:messages.password_reset_success" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[POST /api/auth/reset-password] Error:", error);
    return NextResponse.json(
      { message: "common:messages.something_went_wrong" },
      { status: 500 },
    );
  }
}
