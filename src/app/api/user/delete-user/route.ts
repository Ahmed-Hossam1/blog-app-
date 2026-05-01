import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  // ===== Authenticate Session =====
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "auth:messages.unauthorized" },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { id } = body;

  // Users can only delete their OWN account
  if (!id || id !== session.user.id) {
    return NextResponse.json(
      { message: "common:messages.unauthorized_delete" },
      { status: 403 },
    );
  }

  try {
    // ===== Delete User =====
    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: "auth:messages.user_deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[DELETE /api/user/delete-user]", error);
    return NextResponse.json(
      { message: "common:messages.something_went_wrong" },
      { status: 500 },
    );
  }
}
