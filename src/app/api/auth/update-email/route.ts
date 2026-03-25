import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, email } = body;

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
      where: { id },
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
