import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Please sign in first" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { authorName, authorId, image, comment, blogId } = body;

    if (!comment)
      return NextResponse.json(
        { message: "Comment is required" },
        { status: 400 },
      );

    // check if blog exist
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    await prisma.comment.create({
      data: {
        comment: comment,
        blogId: blogId,
        authorId,
        parentId: null,
        authorName: authorName || "Anonymous User",
        image: image || "/default-avatar.png",
      },
    });

    await prisma.blog.update({
      where: { id: blogId },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      { message: "Comment created successfully" },
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
