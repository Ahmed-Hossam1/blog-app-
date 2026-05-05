import { buildCommentsTree } from "@/lib/helpers";
import { prisma } from "../prisma/prisma";

export const getBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
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


/** Fetches a single blog by its slug, including comments tree and like count */
export const getBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      comments: true,
      // Use _count for the total — avoids loading thousands of like records
      _count: { select: { likes: true } },
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
          _count: { select: { likes: true } },
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
    orderBy: { createdAt: "desc" },
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
// get Dashboard Data (Aggregation)
export const getDashboardData = async (authorId: string) => {
  if (!authorId) return;

  // 1. Get Aggregate stats
  const stats = await prisma.blog.aggregate({
    where: { authorId },
    _sum: {
      views: true,
      likesCount: true,
      commentsCount: true,
    },
    _count: {
      id: true,
    },
  });

  // 2. Get Performance data (blogs per month)
  const blogsDates = await prisma.blog.findMany({
    where: { authorId },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Group by month
  const performanceMap = blogsDates.reduce((acc, blog) => {
    const date = new Date(blog.createdAt);
    const month = monthNames[date.getMonth()];
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Last 6 months for the chart
  const currentMonth = new Date().getMonth();
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const index = (currentMonth - i + 12) % 12;
    last6Months.push({
      name: monthNames[index],
      blogs: performanceMap[monthNames[index]] || 0,
    });
  }

  return {
    blogs: stats._count.id,
    views: stats._sum.views || 0,
    likes: stats._sum.likesCount || 0,
    comments: stats._sum.commentsCount || 0,
    performanceData: last6Months,
  };
};
