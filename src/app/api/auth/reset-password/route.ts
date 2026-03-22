import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, newPassword } = body;

  try {
    // check if token is valid
    const resetToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!resetToken)
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });

    const hasExpired = new Date() > resetToken.expires;

    if (hasExpired)
      return NextResponse.json(
        { message: "Token has expired" },
        { status: 400 },
      );

      // bring user info from DB to check if password is the same
    const user = await prisma.user.findUnique({
      where: {
        email: resetToken.email,
      },
    });

    // check old password is not the same
    const isMatch = await bcrypt.compare(newPassword, user?.password as string);

    if (isMatch)
      return NextResponse.json(
        { message: "new Password cannot be the same as old password" },
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

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
