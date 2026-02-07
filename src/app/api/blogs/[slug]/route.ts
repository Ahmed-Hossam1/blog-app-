import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!blog) return NextResponse.json("blog Not Found", { status: 404 });

  return NextResponse.json(blog);
}
