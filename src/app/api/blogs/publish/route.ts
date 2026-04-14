import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, image, content, category } = body;

    if (!title || !image || !content || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ==== Read Time =====
    const WORDS_PER_MINUTE = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))} min read`;

    // ==== Slug ====
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // if draft exists -> update
    if (id) {
      const existingBlog = await prisma.blog.findUnique({
        where: { id },
        select: { id: true, authorId: true, status: true },
      });

      if (!existingBlog) {
        return NextResponse.json({ message: "Draft not found" }, { status: 404 });
      }

      if (existingBlog.authorId !== session.user.id) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      const updatedBlog = await prisma.blog.update({
        where: { id },
        data: {
          title,
          image,
          content,
          category,
          slug,
          readTime,
          status: "PUBLISHED",
        },
      });

      return NextResponse.json(
        {
          message: "Blog published successfully",
          blogId: updatedBlog.id,
        },
        { status: 200 }
      );
    }

    // if no draft -> create new published blog
    const createdBlog = await prisma.blog.create({
      data: {
        title,
        image,
        content,
        category,
        slug,
        readTime,
        status: "PUBLISHED",
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blogId: createdBlog.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to publish blog" },
      { status: 500 }
    );
  }
}