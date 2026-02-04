import { getBlogById } from "@/services/blogService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: blogId } = await params;

  const blog = await getBlogById(blogId);

  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}
