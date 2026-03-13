import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { blogId, userId } = body;

  try {
    if (!userId) {
      return NextResponse.json(
        { message: "please signin first" },
        { status: 401 },
      );
    }

    const existLike = await prisma.bookMark.findUnique({
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

    if (existLike) {
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
        { message: "bookmark removed successfully" },
        { status: 200 },
      );
    }

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
      { message: "bookmark added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to add bookmark" },
      { status: 500 },
    );
  }
}
