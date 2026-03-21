import { buildCommentsTree } from "@/lib";
import { prisma } from "../prisma/prisma";


/** Checks whether a user has bookmarked a specific blog */
export const isBlogBookmarked = async (userId: string, blogId: string) => {
  if (!userId) return false;

  const count = await prisma.bookMark.count({
    where: {
      userId,
      blogId,
    },
  });
  return count > 0;
};

// ===== Bookmark Services =====

/** Fetches all bookmarked blogs for a user, ordered by most recent */
export const getUserBookmarks = async (userId: string) => {
  if (!userId) return [];

  const bookmarks = await prisma.bookMark.findMany({
    where: { userId },
    include: {
      blog: {
        include: {
          comments: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookmarks.map((bookmark) => ({
    ...bookmark.blog,
    replies: buildCommentsTree(bookmark.blog.comments),
  }));
};
