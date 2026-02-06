import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  const Blogs = await prisma.blog.findMany({
    include: {
      author: true,
    },
  });
  return NextResponse.json(Blogs);
}
