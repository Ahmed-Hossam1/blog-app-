import { ISignUpForm } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: ISignUpForm = await req.json();
    const { name, email, password } = body;
    const existEmail = await prisma.user.findUnique({
      where: { email },
    });

    // check if email already exists
    if (existEmail)
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
