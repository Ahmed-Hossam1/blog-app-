import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "auth:messages.signin_required" },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { comment, blogId } = body;

  const authorName = session.user.name;
  const authorId = session.user.id;
  const image = session.user.image;

  try {
    if (!comment)
      return NextResponse.json(
        { message: "blog:messages.comment_required" },
        { status: 400 },
      );

    // check if blog exist
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) {
      return NextResponse.json({ message: "blog:messages.blog_not_found" }, { status: 404 });
    }

    await prisma.comment.create({
      data: {
        comment,
        blogId,
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
      { message: "blog:messages.comment_success" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { message: "blog:messages.comment_failed" },
      { status: 500 },
    );
  }
}
