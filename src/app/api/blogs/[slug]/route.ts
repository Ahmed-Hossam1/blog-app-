import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import { buildCommentsTree } from "@/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
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

  const replies = buildCommentsTree(blog?.comments);

  return NextResponse.json({ ...blog, replies }, { status: 200 });
}
