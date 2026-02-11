import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Validate MongoDB ObjectId format (24 hex chars)
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 },
      );
    }

    const author = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        image: true,
        bio: true,
        title: true,
        blogs: true,
      },
    });

    if (!author) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(author);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
