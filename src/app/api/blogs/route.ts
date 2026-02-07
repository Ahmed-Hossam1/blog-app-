import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  const Blogs = await prisma.blog.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  return NextResponse.json(Blogs);
}
