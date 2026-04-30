import { getDraftBlogs, getUserBookmarks } from "@/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const [drafts, bookmarks] = await Promise.all([
      getDraftBlogs(userId),
      getUserBookmarks(userId),
    ]);

    // For "Last Read", we'll just take the most recent bookmark or a published blog for now as a fallback
    const lastRead = bookmarks.length > 1 ? bookmarks[1] : (drafts.length > 0 ? null : (bookmarks[0] || null));

    return NextResponse.json({
      draft: drafts[0] || null,
      lastRead: lastRead || bookmarks[0] || null,
      saved: bookmarks[0] || null,
    }, { status: 200 });
  } catch (error) {
    console.error("GET /api/user/continue-reading error:", error);
    return NextResponse.json(
      { message: "something_went_wrong" },
      { status: 500 },
    );
  }
}
