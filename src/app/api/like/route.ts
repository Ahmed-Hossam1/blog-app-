import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { blogId, userId , authorId } = body;

  try {
    if (!userId) {
      return NextResponse.json({ message: "please signin first" }, { status: 401 });
    }

    if(userId === authorId) {
      return NextResponse.json({ message: "You can't like your own blog" }, { status: 400 });
    }
    
    // check if like already exists
    const existLike = await prisma.like.findUnique({
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
          blogId,
          userId,
        },
      },
    });

    if (existLike) {
      await prisma.like.delete({
        where: {
          userId_blogId: {
            blogId,
            userId,
          },
        },
      });

      await prisma.blog.update({
        where: { id: blogId },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json(
        { message: "Like removed successfully" },
        { status: 201 },
      );
    }

    await prisma.like.create({
      data: {
        blogId,
        userId,
      },
    });

    await prisma.blog.update({
      where: { id: blogId },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      { message: "Like added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to add like" },
      { status: 500 },
    );
  }
}
