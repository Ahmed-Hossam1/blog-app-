import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Please sign in first" }, { status: 401 });
  }

  const body = await req.json();
  const { id } = body;

  try {
    // ===== Verify Blog Ownership =====
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog || blog.authorId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized to delete this blog" }, { status: 403 });
    }

    // ===== Delete Blog =====
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
