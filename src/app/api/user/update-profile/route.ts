import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, title, bio } = body;

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        title,
        bio,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}
