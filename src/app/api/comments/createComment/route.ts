import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { authorName, image, comment, blogId } = body;

    if (!comment)
      return NextResponse.json(
        { message: "Comment is required" },
        { status: 400 },
      );
    await prisma.comment.create({
      data: {
        comment: comment,
        blogId: blogId,
        parentId: null,
        authorName: authorName || "Anonymous User",
        image: image || "/default-avatar.png",
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
