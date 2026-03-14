import { IBlog, IComment, StatItem } from "@/types";
import { BlogStatus } from "../../generated/prisma/enums";

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

// This object stores functions used to calculate blog statistics.
// Each key represents the name of a statistic (like blogs, views, comments).
// The value of each key is a function.
// That function receives the blogs array and returns a number
// which represents the calculated value for that statistic.

export const calculators: Record<string, (blogs: IBlog[]) => number> = {
  blogs: (blogs: IBlog[]) => blogs.length,
  views: (blogs: IBlog[]) =>
    blogs.reduce((acc, blog) => acc + (blog.views || 0), 0),
  comments: (blogs: IBlog[]) =>
    blogs.reduce((acc, blog) => acc + blog.comments.length, 0),
  likes: (blogs: IBlog[]) => blogs.reduce((acc, blog) => acc + blog.likes, 0),
  PUBLISHED: (blogs: IBlog[]) =>
    blogs.filter((blog) => blog.status === BlogStatus.PUBLISHED).length,
  ARCHIVED: (blogs: IBlog[]) =>
    blogs.filter((blog) => blog.status === BlogStatus.ARCHIVED).length,
  DRAFT: (blogs: IBlog[]) =>
    blogs.filter((blog) => blog.status === BlogStatus.DRAFT).length,
};

/**
 * Generate statistics values based on the blogs data.
 *
 * The function loops through `statsData` and for each item it finds the
 * corresponding calculator function using `item.key`. Then it executes
 * that function to compute the value.
* @param blogs - Array of blog objects
 * @param statsData - Array describing which stats should be generated
 * @param calculators - Object that maps stat keys to calculation functions
 *
 * @returns The same statsData array but with the `value` field calculated
 */
export function generateStatus<K extends string>(
  blogs: IBlog[],
  statsData: StatItem<K>[],
  calculators: Record<string, (blogs: IBlog[]) => number>,
) {
  return statsData.map((item) => ({
    ...item,
    value: calculators[item.key](blogs),
  }));
}
