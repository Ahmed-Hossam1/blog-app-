import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(request: Request) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Please sign in first" }, { status: 401 });
  }

  const body = await request.json();
  const { id, blogId } = body;

  try {
    await prisma.comment.update({
      where: { id },
      data: {
        comment: "Deleted Comment",
      },
    });

    await prisma.blog.update({
      where: { id: blogId },
      data: {
        commentsCount: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
