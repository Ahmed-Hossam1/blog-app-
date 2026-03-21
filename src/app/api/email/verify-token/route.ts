import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token } = body;

  // check if token is provided
  if (!token) {
    return NextResponse.json("bad request verification token not provided", {
      status: 400,
    });
  }

  try {
    // check if token exists
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      return NextResponse.json("token not found", { status: 404 });
    }

    // check if token has expired
    const hasExpired = new Date() > verificationToken.expires;
    if (hasExpired) {
      return NextResponse.json("token expired", { status: 400 });
    }

    // delete token
    await prisma.verificationToken.delete({
      where: {
        email_token: {
          token: verificationToken.token,
          email: verificationToken.email,
        },
      },
    });

    // update user email verified
    await prisma.user.update({
      where: {
        email: verificationToken.email,
      },
      data: {
        emailVerified: true,
      },
    });

    return NextResponse.json("token verified", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
