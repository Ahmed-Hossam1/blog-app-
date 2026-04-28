import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  if (!id)
    return NextResponse.json(
      { message: "common:messages.fields_missing" },
      { status: 400 },
    );

  const isUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!isUser)
    return NextResponse.json(
      { message: "auth:messages.user_not_found" },
      { status: 404 },
    );

  try {
    // ===== Delete User & everything associated =====
    await prisma.comment.deleteMany({
      where: { authorId: id },
    });
    await prisma.blog.deleteMany({
      where: { authorId: id },
    });
    await prisma.bookMark.deleteMany({
      where: { userId: id },
    });
    await prisma.like.deleteMany({
      where: { userId: id },
    });
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "auth:messages.user_deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "common:messages.something_went_wrong" },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "common:messages.not_implemented" });
}
