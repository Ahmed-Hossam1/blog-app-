import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  try {
    const { email } = await params;
    const userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        blogs: true,
      },
    });
    if (!userData) return NextResponse.json("User Not Found", { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
