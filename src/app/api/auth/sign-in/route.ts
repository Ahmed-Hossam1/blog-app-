import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },

    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Email or Password are incorrect" }, { status: 404 });
  }

  return NextResponse.json(user);
}
