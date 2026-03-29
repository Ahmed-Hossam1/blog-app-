import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, image, content, category } = body;

    if (!title && !content && !category && !image) {
      return NextResponse.json(
        { message: "Please fill in at least one field" },
        { status: 400 }
      );
    }

    // ===== Safe Read Time =====
    let readTime: string | undefined = undefined;

    if (content) {
      const WORDS_PER_MINUTE = 200;
      const wordCount = content.trim().split(/\s+/).length;
      readTime = `${Math.max(
        1,
        Math.ceil(wordCount / WORDS_PER_MINUTE)
      )} min read`;
    }

    // ===== Safe Slug =====
    let slug: string = `draft-${Date.now()}`;

    if (title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      // make slug unique with timestamp
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await prisma.blog.create({
      data: {
        title: title ?? null,
        image: image ?? null,
        content: content ?? null,
        category: category ?? null,
        slug,
        readTime: readTime ?? null,

        status: "DRAFT",
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Draft created successfully",
        blogId: blog.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create draft" },
      { status: 500 }
    );
  }
}