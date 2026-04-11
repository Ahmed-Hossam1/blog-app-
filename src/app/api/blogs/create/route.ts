import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, image, content, category } = body;

  if (!title || !image || !content || !category) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  // ===== Calculate Read Time =====
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))} min read`;

  // ===== Generate URL-Safe Slug =====
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  try {
    await prisma.blog.create({
      data: {
        title,
        image: image as string,
        content,
        category,
        status: "PUBLISHED",
        slug,
        readTime,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(
      { message: "Blog created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Failed to create blog ${error}` },
      { status: 500 },
    );
  }
}
