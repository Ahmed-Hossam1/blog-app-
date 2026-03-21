import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, title, category, image, status, content } = body;

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
