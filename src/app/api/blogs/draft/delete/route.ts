import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Verify the blog exists and belongs to the user
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { authorId: true},
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    if (blog.authorId !== session.user.id) {
      return NextResponse.json(
        { message: "You can only delete your own blogs" },
        { status: 403 }
      );
    }

    await prisma.blog.delete({ where: { id } });

    return NextResponse.json(
      { message: "Draft deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/blogs/draft/delete error:", error);
    return NextResponse.json(
      { message: "Failed to delete draft" },
      { status: 500 }
    );
  }
}
