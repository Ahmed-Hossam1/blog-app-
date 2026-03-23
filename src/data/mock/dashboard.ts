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

export const MOCK_STATS_CONFIG: StatItem<performanceItems>[] = [
  { key: "blogs", title: "Total blogs", icon: HiOutlineDocumentText, color: "#3b82f6" },
  { key: "views", title: "Total Views", icon: HiOutlineEye, color: "#8b5cf6" },
  { key: "likes", title: "Total Likes", icon: HiOutlineHeart, color: "#ec4899" },
  { key: "comments", title: "Total Comments", icon: HiOutlineChatBubbleLeft, color: "#f59e0b" },
];

export const MOCK_MY_BLOGS_STATS_CONFIG: StatItem<blogsState>[] = [
  { title: "Total My Blogs", icon: HiOutlineDocumentText, key: "blogs", color: "#3b82f6" },
  { title: "Published", icon: HiOutlineCheckCircle, key: "PUBLISHED", color: "#10b981" },
  { title: "Archived", icon: FaArchive, key: "ARCHIVED", color: "#f59e0b" },
  { title: "Drafts", icon: HiOutlineClock, key: "DRAFT", color: "#6366f1" },
];

export const MOCK_PERFORMANCE_DATA = [
  { name: "Jan", blogs: 10 },
  { name: "Feb", blogs: 5 },
  { name: "Mar", blogs: 30 },
  { name: "Apr", blogs: 60 },
  { name: "May", blogs: 20 },
  { name: "Jun", blogs: 0 },
];
