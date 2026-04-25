import { getAuthorBasicInfo } from "@/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "auth:messages.unauthorized" }, { status: 401 });
  }

  const id = session.user.id;
  try {
    const user = await getAuthorBasicInfo(id);
    if (!user)
      return NextResponse.json({ message: "auth:messages.user_not_found" }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET /api/author error:", error);
    return NextResponse.json(
      { message: "common:messages.something_went_wrong" },
      { status: 500 },
    );
  }
}
