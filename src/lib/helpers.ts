import { IBlog, IComment, StatItem, performanceItems } from "@/types";
import { BlogStatus } from "../../generated/prisma";

// ===== Comment Tree Builder =====

/**
 * Converts Prisma's flat comments array into a nested tree structure.
 *
 * Prisma returns:  [{ id: 1, parentId: null }, { id: 2, parentId: 1 }]
 * This returns:    [{ id: 1, replies: [{ id: 2, replies: [] }] }]
 */
export function buildCommentsTree(comments: IComment[]) {
  const root: IComment[] = [];
  comments.forEach((c) => (c.replies = []));

  comments.forEach((comment) => {
    if (comment.parentId === null) {
      root.push(comment);
    } else {
      const parent = comments.find((c) => c.id === comment.parentId);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(comment);
      }
    }
  });

  return root;
}

// ===== Blog Statistics Calculators =====

/**
 * Maps stat keys (e.g. "blogs", "views", "likes") to functions
 * that compute the corresponding value from a blogs array.
 */
type StatKeys = performanceItems | BlogStatus;

export const calculators: Record<StatKeys, (blogs: IBlog[]) => number> = {
  blogs: (blogs: IBlog[]) => blogs.length,
  views: (blogs: IBlog[]) =>
    blogs.reduce((acc, blog) => acc + (blog.views || 0), 0),
  comments: (blogs: IBlog[]) =>
    blogs.reduce((acc, blog) => acc + (blog.comments?.length || 0), 0),
  likes: (blogs: IBlog[]) =>
    blogs.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0),
  PUBLISHED: (blogs: IBlog[]) =>
    blogs.filter((blog) => blog.status === BlogStatus.PUBLISHED).length,
  ARCHIVED: (blogs: IBlog[]) =>
    blogs.filter((blog) => blog.status === BlogStatus.ARCHIVED).length,
  DRAFT: (blogs: IBlog[]) =>
    blogs.filter((blog) => blog.status === BlogStatus.DRAFT).length,
};

// ===== Stat Value Computation =====

/**
 * Computes stat values by matching each statsData item's `key`
 * to the corresponding calculator function.
 *
 * @returns The same statsData array with the `value` field populated.
 */
export function computeStatValues<K extends StatKeys>(
  blogs: IBlog[],
  statsData: StatItem<K>[],
  calculators: Record<StatKeys, (blogs: IBlog[]) => number>,
) {
  return statsData.map((item) => ({
    ...item,
    value: calculators[item.key]?.(blogs) ?? 0,
  }));
}
