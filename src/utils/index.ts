import { IBlog, IComment, StatItem } from "@/types";

export function truncateText(text: string) {
  return text.length > 40 ? text.slice(0, 40) + "..." : text;
}

export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * This function takes the flat array that back from prisma
 * and convert it to a tree structure because prisma return flat array like
 * [
 *   { id: 1, parentId: null },
 *   { id: 2, parentId: 1 },
 * ]
 *
 * and we need to convert it to a tree structure like
 * [
 *   { id: 1, parentId: null, replies: [
 *     { id: 2, parentId: 1, replies: [] },
 *   ] },
 *   { id: 2, parentId: 1, replies: [] },
 * ]
 * ]
 *
 * @param comments - The flat array that back from prisma
 * @return The tree structure of comments
 */
export function buildCommentsTree(comments: IComment[]) {
  const root: IComment[] = [];
  // add empty replies array in beginning to each comment
  comments.forEach((c) => (c.replies = []));

  comments.forEach((comment) => {
    if (comment.parentId === null) {
      root.push(comment);
    } else {
      const parent = comments.find((c) => c.id === comment.parentId);
      if (parent) {
        parent.replies!.push(comment);
      }
    }
  });

  return root;
}

/**
 * This function generates a status array from blogs and statsData.
 * It will return an array of objects where each object has the key, title, icon, color, value, and trend.
 * The value is calculated based on the key of the statistics object.
 * @param blogs - An array of blogs
 * @param statsData - An array of objects containing key, title, icon, and color
 * @returns An array of objects containing key, title, icon, color, value, and trend
 */
export function generateStatus(blogs: IBlog[], statsData: StatItem[]) {
  const statistics = {
    posts: blogs.length,
    views: blogs.reduce((acc, blog) => acc + (blog.meta?.views || 0), 0),
    comments: blogs.reduce((acc, blog) => acc + blog.comments.length, 0),
    likes: 0,
  };

  return statsData.map((item) => ({
    ...item,
    value: statistics[item.key],
  }));
}
