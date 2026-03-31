import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDraftBlogs } from "@/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const id = session.user.id;

  try {
    const blogs = await getDraftBlogs(id);

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("GET /api/blogs/draft error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
