import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  //===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Please sign in first" },
      { status: 401 },
    );
  }
  const authorId = session.user.id;
  const authorName = session.user.name;
  const image = session.user.image;

  try {
    const body = await req.json();
    const { comment, parentCommentId, blogId } = body;

    // ===== Validate Comment Content =====
    if (!comment || !blogId) {
      return NextResponse.json(
        { message: "missing required fields comment or blogId" },
        { status: 400 },
      );
    }

    // ===== Create Reply Comment =====
    await prisma.comment.create({
      data: {
        blogId,
        authorId,
        comment,
        authorName: authorName || "Anonymous User",
        parentId: parentCommentId || null,
        image: image || "/default-avatar.png",
      },
    });

    // ===== Update Blog Comment Count =====
    await prisma.blog.update({
      where: { id: blogId },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      { message: "Reply added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 },
    );
  }
}
