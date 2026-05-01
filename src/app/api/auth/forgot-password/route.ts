import ResetPasswordTemplate from "@/components/emailTemplates/ResetPasswordTemplate";
import transporter from "@/lib/nodemailer";
import { generateToken } from "@/lib/token";
import { prisma } from "@/prisma/prisma";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "common:messages.fields_missing" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });

    // IMPORTANT: Always return the same response whether the user exists or not.
    // This prevents user enumeration attacks (attacker can't tell if an email is registered).
    if (user) {
      // Generate & save reset token in DB
      const token = await generateToken(email);

      // change react component jsx to html because nodemailer can't handle jsx only html
      const html = await render(
        ResetPasswordTemplate({
          name: user.name,
          resetLink: `${process.env.NEXT_LOCAL_URL}/reset-password?token=${token.token}`,
        }),
      );

      await transporter.sendMail({
        from: `"Blogy" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Password",
        html,
      });
    }

    // Always return the same message
    return NextResponse.json(
      { message: "auth:messages.reset_link_sent" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[POST /api/auth/forgot-password]", error);
    return NextResponse.json(
      { message: "common:messages.something_went_wrong" },
      { status: 500 },
    );
  }
}

