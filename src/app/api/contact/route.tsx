import ContactEmailTemplate from "@/components/emailTemplates/ContactEmailTemplate";
import transporter from "@/lib/nodemailer";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "common:messages.all_fields_required" },
        { status: 400 },
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration is missing");
      return NextResponse.json(
        { message: "common:messages.something_went_wrong" },
        { status: 500 },
      );
    }

      const html = await render(
        ContactEmailTemplate({
          name: name,
          email: email,
          message: message,
        })
      );
  

    await transporter.sendMail({
      from: `"Blogy Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to me *site owner*
      replyTo: email, // Reply to the sender
      subject: `New Message from ${name}`,
      html,
    });

    return NextResponse.json(
      { message: "contact:messages.message_sent" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[POST /api/contact] Error:", error);
    return NextResponse.json(
      { message: "common:messages.something_went_wrong" },
      { status: 500 },
    );
  }
}
