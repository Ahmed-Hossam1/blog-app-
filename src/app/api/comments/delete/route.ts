import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(request: Request) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "auth:messages.signin_required" },
      { status: 401 },
    );
  }

  const authorId = session.user.id;

  try {
    const body = await request.json();
    const { id: commentId, blogId } = body;

    if (!commentId || !blogId) {
      return NextResponse.json(
        { message: "common:messages.fields_missing" },
        { status: 400 },
      );
    }

    // Get comment and verify it exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "common:messages.not_found" },
        { status: 404 },
      );
    }

    // Verify the requester is the comment author
    if (authorId !== comment.authorId) {
      return NextResponse.json(
        { message: "common:messages.unauthorized_delete" },
        { status: 403 },
      );
    }

    // ===== Hard Delete =====
    await prisma.comment.delete({
      where: { id: commentId },
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
      { message: "blog:messages.comment_deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[DELETE /api/comments/delete]", error);
    return NextResponse.json(
      { message: "blog:messages.comment_delete_failed" },
      { status: 500 },
    );
  }
}

