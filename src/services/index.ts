import { buildCommentsTree } from "@/utils";
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

export const getBlogById = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!blog) return;

  const replies = buildCommentsTree(blog.comments);
  return { ...blog, replies };
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

export const getAuthorBlogs = async (email: string) => {
  const authorBlogs = await prisma.user.findUnique({
    where: { email },

    select: {
      blogs: {
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

  if (!authorBlogs) return;
  const blogsWithReplies = authorBlogs.blogs.map((blog) => ({
    ...blog,
    replies: buildCommentsTree(blog.comments),
  }));

  return blogsWithReplies;
};
