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
    // ===== Verify Ownership =====
    const commentRecord = await prisma.comment.findUnique({ where: { id } });
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    // Allow deletion if the user is the blog author OR if their name matches the comment's author.
    // (Since Comment schema lacks authorId, this is the safest heuristic available).
    const isBlogAuthor = blog?.authorId === session.user.id;
    const isCommentAuthor = commentRecord?.authorName === session.user.name;

    if (!isBlogAuthor && !isCommentAuthor) {
      return NextResponse.json({ message: "Unauthorized to delete this comment" }, { status: 403 });
    }

    // ===== Delete/Tombstone Comment =====
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
