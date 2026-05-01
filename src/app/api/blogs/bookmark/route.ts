import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "auth:messages.signin_required" },
      { status: 401 },
    );
  }
  
  const userId = session.user.id;

  const body = await req.json();
  const { blogId, authorId } = body;

  try {

    if (userId === authorId) {
      return NextResponse.json(
        { message: "bookmarks:messages.bookmark_self_error" },
        { status: 400 },
      );
    }


    // ===== Check If Bookmark Exists =====
    const existingBookmark = await prisma.bookMark.findUnique({
      where: {
        // findUnique() and delete() only work with unique fields.
        //
        // In our schema we defined a compound(2 field) unique key:
        //
        // => @@unique([userId, blogId])
        //
        // Prisma converts this to a combined unique field called:
        //
        // userId_blogId
        //
        // So when querying we must use:
        //
        // where: {
        //   userId_blogId: {
        //     userId,
        //     blogId
        //   }
        // }
        userId_blogId: {
          userId,
          blogId,
        },
      },
    });

    if (existingBookmark) {
      // ===== Remove Bookmark =====
      await prisma.bookMark.delete({
        where: {
          userId_blogId: {
            userId,
            blogId,
          },
        },
      });

      await prisma.blog.update({
        where: { id: blogId },
        data: {
          bookmarksCount: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json(
        { message: "bookmarks:messages.bookmark_removed" },
        { status: 200 },
      );
    }

    // ===== Add Bookmark =====
    await prisma.bookMark.create({
      data: {
        blogId,
        userId,
      },
    });

    await prisma.blog.update({
      where: { id: blogId },
      data: {
        bookmarksCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      { message: "bookmarks:messages.bookmark_added" },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/blogs/bookmark]", error);
    return NextResponse.json(
      { message: "bookmarks:messages.bookmark_failed" },
      { status: 500 },
    );
  }
}
