import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, title, content, category, image } = await req.json();

  let readTime;
  if (content?.trim()) {
    const words = content.trim().split(/\s+/).length;
    readTime = `${Math.ceil(words / 200)} min read`;
  }

  try {
    // UPDATE
    if (id) {
      const blog = await prisma.blog.findUnique({ where: { id } });

      if (!blog) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
      }

      if (blog.authorId !== session.user.id) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      if (blog.status !== "DRAFT") {
        return NextResponse.json(
          { message: "Only drafts can be updated" },
          { status: 400 },
        );
      }

      const updated = await prisma.blog.update({
        where: { id },
        data: {
          title: title ?? undefined,
          content: content ?? undefined,
          category: category ?? undefined,
          image: image ?? undefined,
          readTime,
        },
      });

      return NextResponse.json({ blogId: updated.id });
    }

    // CREATE
    const created = await prisma.blog.create({
      data: {
        title: title ?? undefined,
        content: content ?? undefined,
        category: category ?? undefined,
        image: image ?? undefined,
        readTime,
        status: "DRAFT",
        authorId: session.user.id,
      },
    });

    return NextResponse.json({ blogId: created.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
