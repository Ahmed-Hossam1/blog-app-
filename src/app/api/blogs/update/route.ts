import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, status } = body;

  if (!id) {
    return NextResponse.json(
      { message: "Blog Id is required" },
      { status: 400 },
    );
  }

  // Verify ownership
  const existingBlog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!existingBlog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  if (existingBlog.authorId !== session.user.id) {
    return NextResponse.json(
      { message: "You can only update your own blogs" },
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
        message:
          "Published blog must have title and content and category and image",
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
      { message: "Blog updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 },
    );
  }
}
