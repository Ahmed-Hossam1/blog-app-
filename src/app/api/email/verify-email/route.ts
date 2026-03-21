import EmailTemplate from "@/components/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, verificationLink } = body;
  try {
    const response = await resend.emails.send({
      from: "Blogy <onboarding@resend.dev>",
      to: email,
      subject: "verify your email",
      react: EmailTemplate({ name, verificationLink }),
    });

    console.log("RESEND RESPONSE:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
