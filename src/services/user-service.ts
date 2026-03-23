import { prisma } from "../prisma/prisma";

// ===== User / Author Services =====

/** Fetches all authors with basic profile info */
export const getAuthors = async () => {
  const authors = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
      title: true,
    },
  });
  return authors;
};

/** Fetches a full author profile including blogs and followers */
export const getAuthorProfile = async (id: string) => {
  const author = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      title: true,
      followers: { select: { followerId: true } },
      blogs: {
        where: { status: "PUBLISHED" },
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
  });
  return author;
};

/** Fetches basic author info without blogs or followers */
export const getAuthorBasicInfo = async (id: string) => {
  const author = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      title: true,
    },
  });
  return author;
};
