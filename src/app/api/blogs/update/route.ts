import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, title, category, image, status, content } = body;

  try {
    await prisma.blog.update({
      where: { id },
      data: {
        title,
        image,
        content,
        category,
        status,
      },
    });
    return NextResponse.json(
      { message: "Blog updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 },
    );
  }
}
