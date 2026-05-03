import { buildCommentsTree } from "@/lib/helpers";
import { prisma } from "../prisma/prisma";

/** Checks whether a user has liked a specific blog */
export const isBlogLiked = async (userId: string, blogId: string) => {
  if (!userId) return false;

  const count = await prisma.like.count({
    where: {
      userId,
      blogId,
    },
  });
  return count > 0;
};

/** Fetches all liked blogs for a user, ordered by most recent */
export const getUserLikes = async (userId: string) => {
  if (!userId) return [];

  const likes = await prisma.like.findMany({
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

  return likes.map((like) => ({
    ...like.blog,
    replies: buildCommentsTree(like.blog.comments),
  }));
};
