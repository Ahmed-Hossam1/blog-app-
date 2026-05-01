import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "auth:messages.signin_required" }, { status: 401 });
  }
  const userId = session.user.id;

  const body = await req.json();
  const { blogId, authorId } = body;

  try {

    // ===== Prevent Self-Like =====

    if (userId === authorId) {
      return NextResponse.json({ message: "blog:messages.like_self_error" }, { status: 400 });
    }

    // ===== Check If Like Exists =====
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
      // ===== Remove Like =====
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
        { message: "blog:messages.unliked_success" },
        { status: 200 },
      );
    }

    // ===== Add Like =====
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
      { message: "blog:messages.liked_success" },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/blogs/like]", error);
    return NextResponse.json(
      { message: "blog:messages.like_failed" },
      { status: 500 },
    );
  }
}
