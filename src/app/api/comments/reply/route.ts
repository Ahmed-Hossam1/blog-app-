import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { authorName, image, comment, parentCommentId, blogId } = body;

    // ===== Validate Comment Content =====
    if (!comment) {
      return NextResponse.json(
        { message: "Comment is required" },
        { status: 400 },
      );
    }

    // ===== Create Reply Comment =====
    await prisma.comment.create({
      data: {
        comment,
        blogId,
        parentId: parentCommentId || null,
        authorName: authorName,
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
