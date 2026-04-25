import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "auth:messages.unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await req.json();
    const { name, title, bio, image } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        image,
        title,
        bio,
      },
    });

    return NextResponse.json(
      { message: "settings:messages.profileSuccess", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "settings:messages.profileFailed" },
      { status: 500 },
    );
  }
}
