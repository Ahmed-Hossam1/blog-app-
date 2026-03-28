import {
  default as ConfirmEmailTemplate,
  default as EmailTemplate,
} from "@/components/ConfirmEmailTemplate";
import transporter from "@/lib/nodemailer";
import { generateToken } from "@/lib/token";
import { render } from "@react-email/render";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "missing required fields" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      //  ===== check if email is exist but not verified =====
      if (!existingUser.emailVerified) {
        // regenerate token + resend email
        const verificationToken = await generateToken(email);

        const verificationLink = `${process.env.NEXT_LOCAL_URL}/verify-email?token=${verificationToken.token}`;

        const html = await render(
          ConfirmEmailTemplate({ name: existingUser.name, verificationLink }),
        );

        await transporter.sendMail({
          from: `"Blogy" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Verify your email",
          html,
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
    const verificationLink = `${process.env.NEXT_LOCAL_URL}/verify-email?token=${verificationToken.token}`;

    //   ===== Send Verification Email  =====
    const html = await render(EmailTemplate({ name, verificationLink }));

    await transporter.sendMail({
      from: `"Blogy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      html,
    });

    return NextResponse.json(
      {
        message: "Verification email sent  successfully check your email inbox",
      },
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
