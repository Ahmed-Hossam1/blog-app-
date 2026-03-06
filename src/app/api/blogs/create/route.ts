import { IBlog } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  const body: IBlog = await req.json();
  const { title, image, content, category, status } = body;
  try {
    await prisma.blog.create({
      data: {
        title,
        image,
        content,
        category,
        status,
        slug: title.split(" ").join("-"),
        readTime: "5",
        authorId: "69a73dde25691bfab560ff4b",
      },
    });
    return NextResponse.json(
      { message: "Blog created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Failed to create blog ${error}` },
      { status: 500 },
    );
  }
}
