import ResetPasswordTemplate from "@/components/ResetPasswordTemplate";
import transporter from "@/lib/nodemailer";
import { generateToken } from "@/lib/token";
import { prisma } from "@/prisma/prisma";
import { render } from "@react-email/render";
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

      return NextResponse.json(
        { message: "If this email exists, a reset link has been sent" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
