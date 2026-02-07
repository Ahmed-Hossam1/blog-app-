import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  const authors = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
  return NextResponse.json(authors, { status: 200 });
}
