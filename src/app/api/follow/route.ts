import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { followerId, followingId } = body;

  if (!followerId) {
    return NextResponse.json(
      { message: "Please sign in first" },
      { status: 401 },
    );
  }

  // ===== Prevent Self-Follow =====

  if (followerId === followingId) {
    return NextResponse.json(
      { message: "You can't follow yourself" },
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
        { message: "Unfollowed Author" },
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

    return NextResponse.json({ message: "Followed Author" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to follow" }, { status: 500 });
  }
}
