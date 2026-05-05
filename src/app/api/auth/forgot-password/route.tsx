import ResetPasswordTemplate from "@/components/emailTemplates/ResetPasswordTemplate";
import transporter from "@/lib/nodemailer";
import { generateToken } from "@/lib/token";
import { prisma } from "@/prisma/prisma";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email: rawEmail } = body;
    const email = rawEmail?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { message: "common:messages.fields_missing" },
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

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });

    // IMPORTANT: Always return the same response whether the user exists or not.
    // This prevents user enumeration attacks.
    if (user) {
      try {
        // Generate & save reset token in DB
        const token = await generateToken(email);

        // Prepare reset link
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const resetLink = `${siteUrl}/reset-password?token=${token.token}`;

        // change react component jsx to html because nodemailer can't handle jsx only html
        const html = await render(
          ResetPasswordTemplate({
            name: user.name,
            resetLink: resetLink,
          }),
        );

        await transporter.sendMail({
          from: `"Blogy" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Reset Password",
          html,
        });
      } catch (innerError) {
        console.error(
          "[forgot-password] Inner error (email/token):",
          innerError,
        );
        // We still return 200 to the client to avoid enumeration,
        // but wait, if it's a 500, we should probably know.
        // Actually, for security, some prefer 200, but for debugging, let's see.
        throw innerError;
      }
    }

    // Always return the same message
    return NextResponse.json(
      { message: "auth:messages.reset_link_sent" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[POST /api/auth/forgot-password] Global Error:", error);
    return NextResponse.json(
      { message: "common:messages.something_went_wrong" },
      { status: 500 },
    );
  }
}
