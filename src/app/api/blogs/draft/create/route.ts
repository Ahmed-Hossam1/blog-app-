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

    //  At least one field should have content
    if (!title && !content && !category && !image) {
      return NextResponse.json(
        { message: "Please fill in at least one field" },
        { status: 400 },
      );
    }

    // ===== Safe Read Time =====
    let readTime: string | undefined;

    if (content?.trim()) {
      const WORDS_PER_MINUTE = 200;
      const wordCount = content.trim().split(/\s+/).length;
      readTime = `${Math.max(
        1,
        Math.ceil(wordCount / WORDS_PER_MINUTE),
      )} min read`;
    }

    // ===== Safe Slug =====
    let slug = `draft-${Date.now()}`;

    if (title?.trim()) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      slug = `${slug}-${Date.now()}`; // unique
    }

    const blog = await prisma.blog.create({
      data: {
        title: title ?? undefined,
        image: image ?? undefined,
        content: content ?? undefined,
        category: category ?? undefined,
        slug,
        readTime: readTime ?? undefined,
        status: "DRAFT",
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Draft created successfully",
        blogId: blog.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create draft" },
      { status: 500 },
    );
  }
}
