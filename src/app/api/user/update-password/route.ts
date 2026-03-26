import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, oldPassword, newPassword } = body;

    if (!id || !oldPassword || !newPassword) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user || !user.password) {
      return NextResponse.json({ message: "User not found or using OAuth" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ message: "Failed to update password" }, { status: 500 });
  }
}
