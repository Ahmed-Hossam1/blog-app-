/* This route is used to publish a blog
 * 1. Check if the user is authenticated
 * 2. Check if the blog exists
 * 3. Check if the blog is already published
 * 4. Update the blog
 * 5- if not exist -> create a new blog
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getLocale } from "@/lib/i18n";
import { calculateContentLength, generateUniqueSlug } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "auth:messages.unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, image, content, category } = body;

    if (!title || !content || !category || !image) {
      return NextResponse.json(
        { message: "blog:messages.publish_validation_error" },
        { status: 400 },
      );
    }

    // ==== Read Time =====
    const readTime = calculateContentLength(content);
    // ==== Local Language For Slug  ====
    const local = await getLocale();

    // if draft exists -> update
    if (id) {
      const existingBlog = await prisma.blog.findUnique({
        where: { id },
        select: { id: true, authorId: true, status: true },
      });

      if (!existingBlog) {
        return NextResponse.json(
          { message: "common:messages.not_found" },
          { status: 404 },
        );
      }

      if (existingBlog.authorId !== session.user.id) {
        return NextResponse.json({ message: "common:messages.forbidden" }, { status: 403 });
      }

      const slug = await generateUniqueSlug(title, existingBlog.id, local);

      const updatedBlog = await prisma.blog.update({
        where: { id },
        data: {
          title,
          slug,
          image,
          content,
          category,
          readTime,
          status: "PUBLISHED",
        },
      });

      return NextResponse.json(
        {
          message: "blog:messages.blog_updated",
          blogId: updatedBlog.id,
        },
        { status: 200 },
      );
    }

    // if no draft -> create new published blog
    const slug = await generateUniqueSlug(title, undefined, local);

    const createdBlog = await prisma.blog.create({
      data: {
        title,
        slug,
        image,
        content,
        category,
        readTime,
        status: "PUBLISHED",
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "blog:messages.blog_updated",
        blogId: createdBlog.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "blog:messages.blog_update_failed" },
      { status: 500 },
    );
  }
}
