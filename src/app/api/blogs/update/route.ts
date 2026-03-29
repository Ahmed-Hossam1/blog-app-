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
  const { id, title, category, image, status, content } = body;

  if (!id) {
    return NextResponse.json(
      { message: "Blog ID is required" },
      { status: 400 },
    );
  }

  // Verify ownership
  const existingBlog = await prisma.blog.findUnique({
    where: { id },
    select: { authorId: true },
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

  // ===== Calculate Read Time (if content provided) =====
  let readTime;
  if (content) {
    const WORDS_PER_MINUTE = 200;
    const wordCount = content.split(/\s+/).length;
    readTime = `${Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))} min read`;
  }

  // ===== Generate URL-Safe Slug (if title provided) =====
  let slug;
  if (title) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  try {
    await prisma.blog.update({
      where: { id },
      data: {
        title: title && title,
        slug: slug && slug,
        category: category && category,
        image: image && image,
        status: status && status,
        content: content && content,
        ...(readTime && { readTime }),
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
