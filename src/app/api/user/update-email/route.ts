import UpdateEmailTemplate from "@/components/emailTemplates/UpdateEmailTemplate";
import transporter from "@/lib/nodemailer";
import { generateToken } from "@/lib/token";
import { prisma } from "@/prisma/prisma";
import { render } from "@react-email/render";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "auth:messages.unauthorized" }, { status: 401 });
  }

  const userName = session.user.name;

  const body = await req.json();
  const { newEmail: pendingEmail } = body;

  try {
    if (!pendingEmail) {
      return NextResponse.json(
        { message: "common:messages.fields_missing" },
        { status: 400 },
      );
    }

    // check if new email taken by another user
    const user = await prisma.user.findUnique({
      where: { email: pendingEmail },
    });

    if (user) {
      return NextResponse.json(
        { message: "auth:messages.email_exists" },
        { status: 400 },
      );
    }

    // generate token with new email
    const verificationToken = await generateToken(pendingEmail);

    // make verification link with token generated
    const verificationLink = `${process.env.NEXT_PUBLIC_SITE_URL}/confirm-email-change?token=${verificationToken.token}`;

    // convert jsx to html
    const html = await render(
      UpdateEmailTemplate({
        name: userName || "User",
        newEmail: pendingEmail,
        verificationLink,
      }),
    );

    // send email
    await transporter.sendMail({
      from: `"Blogy" <${process.env.EMAIL_USER}>`,
      to: pendingEmail, // Send to newEmail
      subject: "Verify your new Email",
      html,
    });

    return NextResponse.json(
      { message: "auth:messages.verification_email_sent" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "settings:messages.email_update_failed" },
      {
        status: 500,
      },
    );
  }
}


