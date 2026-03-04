import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  try {
    await prisma.comment.update({
      where: { id },
      data: {
        comment: "Deleted Comment",
      },
    });
    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
