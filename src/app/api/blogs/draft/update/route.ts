import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, content, category, image } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Draft id is required" },
        { status: 400 },
      );
    }

    // Verify the blog exists and belongs to the user
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    if (blog.authorId !== session.user.id) {
      return NextResponse.json(
        { message: "You can only delete your own blogs" },
        { status: 403 },
      );
    }

    // ===== Safe Read Time =====
    let readTime: string | undefined;
    if (content?.trim()) {
      const words = content.trim().split(/\s+/).length;
      readTime = `${Math.ceil(words / 200)} min read`;
    }

    const updated = await prisma.blog.update({
      where: {
        id,
        authorId: session.user.id,
      },
      data: {
        title: title ?? undefined,
        content: content ?? undefined,
        category: category ?? undefined,
        image: image ?? undefined,
        readTime,
        status: "DRAFT",
      },
    });

    return NextResponse.json(
      {
        message: "Draft updated successfully",
        blogId: updated.id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update draft" },
      { status: 500 },
    );
  }
}
