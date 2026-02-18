import { prisma } from "../../prisma/prisma";

export const getBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  return blogs;
};

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

export const getAuthorById = async (id: string) => {
  const author = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      image: true,
      bio: true,
      title: true,
      blogs: {
        include: {
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
