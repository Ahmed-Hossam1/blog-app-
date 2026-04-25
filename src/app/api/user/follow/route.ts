import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "auth:messages.unauthorized" },
      { status: 401 },
    );
  }
  const followerId = session.user.id;

  const body = await req.json();
  const { followingId } = body;

  // ===== Prevent Self-Follow =====

  if (followerId === followingId) {
    return NextResponse.json(
      { message: "authors:messages.follow_self_error" },
      { status: 400 },
    );
  }

  try {
    // ===== Check If Follow Exists =====
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      // ===== Remove Follow =====
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });
      return NextResponse.json(
        { message: "authors:messages.unfollowed_success" },
        { status: 200 },
      );
    }

    // ===== Add Follow =====
    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json({ message: "authors:messages.followed_success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "authors:messages.follow_failed" }, { status: 500 });
  }
}
