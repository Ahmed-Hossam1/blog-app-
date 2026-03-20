import { FaArchive } from "react-icons/fa";
import {
  HiOutlineChatBubbleLeft,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineHeart,
} from "react-icons/hi2";

import { blogsState, performanceItems, StatItem } from "@/types";

export const STATS_DATA: StatItem<performanceItems>[] = [
  {
    key: "blogs",
    title: "Total blogs",
    icon: HiOutlineDocumentText,
    color: "#3b82f6",
  },
  {
    key: "views",
    title: "Total Views",
    icon: HiOutlineEye,
    color: "#8b5cf6",
  },
  {
    key: "likes",
    title: "Total Likes",
    icon: HiOutlineHeart,
    color: "#ec4899",
  },
  {
    key: "comments",
    title: "Total Comments",
    icon: HiOutlineChatBubbleLeft,
    color: "#f59e0b",
  },
];


export const MY_BLOGS_STATS : StatItem<blogsState>[] = [
  {
    title: "Total My Blogs",
    icon: HiOutlineDocumentText,
    key : "blogs",
    color: "#3b82f6",
  },
  {
    title: "Published",
    icon: HiOutlineCheckCircle,
    key : "PUBLISHED",
    color: "#10b981",
  },
  {
    title: "Archived",
    icon: FaArchive,
    key : "ARCHIVED",
    color: "#f59e0b",
  },
  {
    title: "Drafts",
    icon: HiOutlineClock,
    key : "DRAFT",
    color: "#6366f1",
  },
];


export const PERFORMANCE_DATA = [
  { name: "Jan", blogs: 10 },
  { name: "Feb", blogs: 5 },
  { name: "Mar", blogs: 30 },
  { name: "Apr", blogs: 60 },
  { name: "May", blogs: 20 },
  { name: "Jun", blogs: 0 },
];

export const MOCK_TOP_POSTS = [
  {
    id: 1,
    title: "10 Tips for Better Next.js Performance",
    views: "12,450",
    comments: 85,
    image:
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS 4.0 Features",
    views: "8,200",
    comments: 42,
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    title: "The Future of Web Development in 2026",
    views: "6,150",
    comments: 120,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop",
  },
];

export const tableHeaders = [
  "Title",
  "Category",
  "Status",
  "Date",
  "Views",
  "Actions",
];
export const RECENT_POSTS = [
  {
    id: 1,
    title: "Understanding React Server Components",
    category: "Development",
    status: "Published",
    date: "2024-03-12",
    views: 1240,
  },
  {
    id: 2,
    title: "A Guide to Modern CSS Layouts",
    category: "Design",
    status: "Draft",
    date: "2024-03-10",
    views: 0,
  },
  {
    id: 3,
    title: "Building Scalable APIs with NestJS",
    category: "Backend",
    status: "Published",
    date: "2024-03-08",
    views: 850,
  },
  {
    id: 4,
    title: "Getting Started with Prisma and Postgres",
    category: "Database",
    status: "Scheduled",
    date: "2024-03-15",
    views: 0,
  },
];

