import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const authorId = session.user.id;
  const body = await req.json();
  const { id } = body;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id, authorId, status: "DRAFT" },
    });

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("GET /api/blogs/draft error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
