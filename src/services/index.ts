import { buildCommentsTree } from "@/lib";
import { prisma } from "../prisma/prisma";

// ===== Blog Services =====

export const getBlogs = async () => {
  const blogs = await prisma.blog.findMany({
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
  const blog = await prisma.blog.findUnique({
    where: { slug },
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

/** Fetches name and image for a list of follower IDs */
export const getFollowersBasicInfo = async (ids: string[]) => {
  const author = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: {
      name: true,
      image: true,
    },
  });
  return author;
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

// ===== Relationship Check Services =====

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
