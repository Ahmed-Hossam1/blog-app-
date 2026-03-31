import { buildCommentsTree } from "@/lib/helpers";
import { prisma } from "../prisma/prisma";

export const getBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return blogs;
};

/** Fetches a single blog by its slug, including comments tree and likes */
export const getBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      comments: true,
      likes: true,
      author: {
        select: {
          id: true,
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

/** Fetches all blogs by a specific author with comments tree */
export const getAuthorBlogs = async (userId: string) => {
  if (!userId) return;
  const authorBlogs = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      blogs: {
        include: {
          comments: true,
          likes: true,
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

// get Draft blogs
export const getDraftBlogs = async (authorId: string) => {
  const blogs = await prisma.blog.findMany({
    where: { status: "DRAFT", authorId },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return blogs;
};
