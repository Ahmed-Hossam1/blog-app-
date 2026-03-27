import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const body = await req.json();
  const { email } = body;

  try {
    if (!email) {
      return NextResponse.json(
        { message: "missing required filed email " },
        { status: 400 },
      );
    }
    const isExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isExist)
      return NextResponse.json(
        { message: "email already exist" },
        { status: 400 },
      );

    await prisma.user.update({
      where: { id: userId },
      data: {
        email,
      },
    });
    return NextResponse.json(
      { message: "email updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("message: failed to update email", {
      status: 500,
    });
  }
}
