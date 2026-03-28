import ContactEmailTemplate from "@/components/ContactEmailTemplate";
import transporter from "@/lib/nodemailer";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const html = await render(
      ContactEmailTemplate({
        name,
        email,
        message,
      }),
    );

    await transporter.sendMail({
      from: `"Blogy Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to me *site owner*
      replyTo: email, // Reply to the sender
      subject: `New Message from ${name}`,
      html,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
