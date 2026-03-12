import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { followerId, followingId } = body;

  if (!followerId) {
    return NextResponse.json(
      { message: "please signin first" },
      { status: 401 },
    );
  }

  try {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
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
