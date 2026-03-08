import { IBlog } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body: IBlog = await req.json();
  const { title, image, content, category, status } = body;
  try {
    await prisma.blog.create({
      data: {
        title,
        image,
        content,
        category,
        status,
        slug: title.split(" ").join("-"),
        readTime: "5",
        authorId: session.user.id,
      },
    });
    return NextResponse.json(
      { message: "Blog created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Failed to create blog ${error}` },
      { status: 500 },
    );
  }
}
