import EmailTemplate from "@/components/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, verificationLink } = body;

  try {
    // ===== Send Verification Email =====
    await resend.emails.send({
      from: "Blogy <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      react: EmailTemplate({ name, verificationLink }),
    });

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send verification email" },
      { status: 500 },
    );
  }
}
