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
