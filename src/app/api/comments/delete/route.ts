import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(request: Request) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Please sign in first" },
      { status: 401 },
    );
  }

  const authorId = session.user.id;

  const body = await request.json();
  const { id: commentId, blogId } = body;

  if (!commentId ||  !blogId) {
    return NextResponse.json(
      { message: "Missing required fields id or blogId " },
      { status: 400 },
    );
  }

  try {
    // get comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    // check if it's exist
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }
    // check if authorId is the same as author who created the comment
    if (authorId !== comment.authorId) {
      return NextResponse.json(
        { message: "Unauthorized to delete this comment" },
        { status: 403 },
      );
    }

    await prisma.comment.update({
      where: { id: commentId },
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
