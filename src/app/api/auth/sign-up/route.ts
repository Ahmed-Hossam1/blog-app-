import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import { Prisma } from "../../../../../generated/prisma/client";
import { ISignUpForm } from "@/types";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: ISignUpForm = await req.json();

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },

      select: {
        name: true,
        email: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
