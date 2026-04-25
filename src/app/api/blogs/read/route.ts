import { getBlogs } from "@/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
