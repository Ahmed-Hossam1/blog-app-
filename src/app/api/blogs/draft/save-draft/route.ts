import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getLocale } from "@/lib/i18n";
import { calculateContentLength, generateUniqueSlug } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, title, content, category, image } = await req.json();
  const readTime = calculateContentLength(content).toString();

  try {
    // UPDATE
    const local = await getLocale();

    if (id) {
      const blog = await prisma.blog.findUnique({ where: { id } });
      const slug = await generateUniqueSlug(title, id, local);

      if (!blog) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
      }

      if (blog.authorId !== session.user.id) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      const updated = await prisma.blog.update({
        where: { id },
        data: {
          title: title ?? undefined,
          slug: slug ?? undefined,
          content: content ?? undefined,
          category: category ?? undefined,
          image: image ?? undefined,
          readTime,
        },
      });

      return NextResponse.json({ blogId: updated.id });
    }
    const slug = await generateUniqueSlug(title, undefined, local);
    // CREATE
    const created = await prisma.blog.create({
      data: {
        title: title ?? undefined,
        slug: slug,
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
    console.error(`[${req.method}] ${req.nextUrl.pathname}`, error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
        route: req.nextUrl.pathname,
      },
      { status: 500 },
    );
  }
}
