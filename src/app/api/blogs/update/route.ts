import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { BlogStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const VALID_STATUSES = Object.values(BlogStatus);

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "auth:messages.unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, status } = body;

  if (!id) {
    return NextResponse.json(
      { message: "blog:messages.blog_id_required" },
      { status: 400 },
    );
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { message: "blog:messages.invalid_status" },
      { status: 400 },
    );
  }

  // Verify ownership
  const existingBlog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!existingBlog) {
    return NextResponse.json({ message: "blog:messages.blog_not_found" }, { status: 404 });
  }

  if (existingBlog.authorId !== session.user.id) {
    return NextResponse.json(
      { message: "blog:messages.unauthorized_update" },
      { status: 403 },
    );
  }


  // check if published blog has title, content, category, image
    if (
      status === "PUBLISHED" &&
      (!existingBlog.title ||
        !existingBlog.content ||
        !existingBlog.category ||
        !existingBlog.image)
    ) {
      return NextResponse.json(
        {
          message: "blog:messages.publish_validation_error",
        },
        { status: 400 },
      );
    }


  try {
    await prisma.blog.update({
      where: { id },
      data: {
        status,
      },
    });
    return NextResponse.json(
      { message: "blog:messages.blog_updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[PUT /api/blogs/update]", error);
    return NextResponse.json(
      { message: "blog:messages.blog_update_failed" },
      { status: 500 },
    );
  }
}
