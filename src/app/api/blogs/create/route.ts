import { IBlog } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  const body : IBlog = await req.json();

  try {
    await prisma.blog.create({
      data: {
        title: body.title,
        image: body.image,
        content: body.content,
        category: body.category,
        status: body.status,
        slug: body.title.split(" ").join("-"),
        readTime: "5",
        authorId: "69a201eda1e5202e4c311235",
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
