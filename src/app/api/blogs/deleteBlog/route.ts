import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;

  try {
    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
