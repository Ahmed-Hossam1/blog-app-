import ResetPasswordTemplate from "@/components/ResetPasswordTemplate";
import { generateToken } from "@/lib/token";
import { prisma } from "@/prisma/prisma";
import resend from "@/resend/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // Check if user exist
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //  IMPORTANT: always return same response for security reasons
    if (user) {
      // Generate & save reset token in DB
      const token = await generateToken(email);

      // Send reset email
      await resend.emails.send({
        from: "Blogy <onboarding@resend.dev>",
        to: email,
        subject: "reset your password",
        react: ResetPasswordTemplate({
          name: user.name,
          resetLink: `http://localhost:3000/reset-password?token=${token.token}`,
        }),
      });
    }

    return NextResponse.json(
      { message: "If this email exists, a reset link has been sent" },
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
