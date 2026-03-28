import { prisma } from "../prisma/prisma";

/** Fetches name and image for a list of follower IDs */
export const getFollowersBasicInfo = async (ids: string[]) => {
  const author = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
  return author;
};

/** Checks whether followerId is following followingId */
export const isUserFollowing = async (
  followingId: string,
  followerId: string,
) => {
  if (!followerId) return false;

  const count = await prisma.follow.count({
    where: {
      followerId,
      followingId,
    },
  });
  return count > 0;
};
