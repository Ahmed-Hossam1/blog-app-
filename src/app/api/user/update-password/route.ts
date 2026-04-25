import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "auth:messages.unauthorized" }, { status: 401 });
  }
  const userId = session?.user.id
  
  try {
    const body = await req.json();
    const { oldPassword, newPassword } = body;

    // Validate required fields
    if ( !oldPassword || !newPassword) {
      return NextResponse.json({ message: "common:messages.fields_missing" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id : userId },
    });

    // Check if user exist
    if (!user || !user.password) {
      return NextResponse.json({ message: "auth:messages.user_oauth_error" }, { status: 404 });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "auth:messages.incorrect_password" }, { status: 400 });
    }

    // Check if new password is same as old password
    const isSameAsOldPassword  = await bcrypt.compare(newPassword, user.password);

    if(isSameAsOldPassword ) return NextResponse.json({ message: "settings:messages.password_same" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id : userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "settings:messages.password_updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ message: "settings:messages.password_update_failed" }, { status: 500 });
  }
}
