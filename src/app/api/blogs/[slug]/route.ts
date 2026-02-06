import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: true,
      comments: true,
    },
  });

  return NextResponse.json(blog);
}
