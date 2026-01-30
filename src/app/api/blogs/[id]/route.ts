import { IBlog } from "@/interface";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: blogId } = await params;

  const res = await fetch("http://localhost:3000/api/blogs");
  const data: IBlog[] = await res.json();

  const blog = data.find((item) => item.id == blogId);
  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}
