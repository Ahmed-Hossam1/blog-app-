import EmailTemplate from "@/components/EmailTemplate";
import { generateToken } from "@/lib/token";
import resend from "@/resend/resend";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      //  ===== check if email is exist but not verified =====
      if (!existingUser.emailVerified) {
        // regenerate token + resend email
        const verificationToken = await generateToken(email);

        const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken.token}`;

        await resend.emails.send({
          from: "Blogy <onboarding@resend.dev>",
          to: email,
          subject: "Verify your email",
          react: EmailTemplate({ name: existingUser.name, verificationLink }),
        });

        // update token
        return NextResponse.json(
          { message: "Verification email resent check your email inbox" },
          { status: 200 },
        );
      }

      // if email is exist and already verified
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    // ===== Hash Password & Create User =====
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //  ===== generate token =====
    const verificationToken = await generateToken(email);

    // verification link that will be sent
    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken.token}`;

    //   ===== Send Verification Email  =====
    await resend.emails.send({
      from: "Blogy <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      react: EmailTemplate({ name, verificationLink }),
    });

    return NextResponse.json(
      { message: "Verification email sent  successfully check your email inbox" },
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
