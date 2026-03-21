import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { verificationToken } = body;

    if (!verificationToken) {
        return NextResponse.json("bad request verification token not provided", { status: 400 });
    }
} 