import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password: newPassword } = body;
    // check if token is valid
    const resetToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!resetToken)
      return NextResponse.json({ message: "auth:messages.invalid_token" }, { status: 400 });

    const hasExpired = new Date() > resetToken.expires;

    if (hasExpired)
      return NextResponse.json(
        { message: "auth:messages.token_expired" },
        { status: 400 },
      );

    // bring user info from DB to check if password is the same
    const user = await prisma.user.findUnique({
      where: {
        email: resetToken.email,
      },
    });

    if (!user)
      return NextResponse.json({ message: "auth:messages.user_not_found" }, { status: 404 });

    // check old password is not the same
    const isMatch = await bcrypt.compare(newPassword, user?.password as string);

    if (isMatch)
      return NextResponse.json(
        { message: "settings:messages.password_same" },
        { status: 400 },
      );

    // create hash for new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // update password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: {
        password: hashedNewPassword,
      },
    });

    // delete token
    await prisma.verificationToken.delete({
      where: {
        email_token: {
          token,
          email: resetToken.email,
        },
      },
    });

    return NextResponse.json(
      { message: "auth:messages.password_reset_success" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "common:messages.something_went_wrong" },
      { status: 500 },
    );
  }
}
