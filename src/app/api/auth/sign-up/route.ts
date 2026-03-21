import { ISignUpForm } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // ===== Parse Request Body =====
    const body: ISignUpForm = await req.json();
    const { name, email, password } = body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // ===== Check If Email Already Exists =====
    if (existingUser)
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );

    // ===== Hash Password & Create User =====
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully", userId: newUser.id },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
