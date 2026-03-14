import {
  HiOutlineEye,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";

/* ── Stat Cards ── */
export const ANALYTICS_STATS = [
  {
    title: "Total Views",
    value: "38.5K",
    icon: HiOutlineEye,
    color: "#6366f1",
  },
  {
    title: "Unique Visitors",
    value: "24.7K",
    icon: HiOutlineUserGroup,
    color: "#8b5cf6",
  },
  {
    title: "Avg Time",
    value: "3m 12s",
    icon: HiOutlineClock,
    color: "#06b6d4",
  },
  {
    title: "Engagement",
    value: "43.6%",
    icon: HiOutlineChartBar,
    color: "#f59e0b",
  },
  {
    title: "Last 30 Days",
    value: "43.6%",
    icon: HiOutlineArrowTrendingUp,
    color: "#10b981",
  },
];

/* ── Views Over Time (Area / Line chart – last 30 days) ── */
export const VIEWS_OVER_TIME = [
  { day: "1", views: 8500 },
  { day: "3", views: 9200 },
  { day: "5", views: 10500 },
  { day: "7", views: 9800 },
  { day: "9", views: 11200 },
  { day: "11", views: 10800 },
  { day: "13", views: 12500 },
  { day: "15", views: 13200 },
  { day: "17", views: 14800 },
  { day: "19", views: 18500 },
  { day: "21", views: 22000 },
  { day: "22", views: 24500 },
  { day: "23", views: 26000 },
  { day: "24", views: 28000 },
  { day: "25", views: 25000 },
  { day: "27", views: 22000 },
  { day: "29", views: 24000 },
  { day: "30", views: 27500 },
];

/* ── Engagement Trend (Area chart – last 30 days) ── */
export const ENGAGEMENT_TREND = [
  { day: "1", engagement: 28 },
  { day: "5", engagement: 35 },
  { day: "10", engagement: 42 },
  { day: "15", engagement: 38 },
  { day: "17", engagement: 45 },
  { day: "18", engagement: 50 },
  { day: "20", engagement: 55 },
  { day: "25", engagement: 48 },
  { day: "30", engagement: 52 },
];

/* ── Traffic Sources (Horizontal bar chart) ── */
export const TRAFFIC_SOURCES = [
  { name: "Google", value: 40, color: "#6366f1" },
  { name: "Direct", value: 30, color: "#8b5cf6" },
  { name: "Reddit", value: 18, color: "#a78bfa" },
  { name: "Other", value: 12, color: "#c4b5fd" },
];

/* ── Traffic Sources Pie / Donut ── */
export const TRAFFIC_PIE = [
  { name: "Organic", value: 70, color: "#6366f1" },
  { name: "Paid", value: 30, color: "#e2e8f0" },
];

/* ── Top Categories Views (Horizontal bar) ── */
export const TOP_CATEGORIES = [
  { name: "React", value: 45, color: "#6366f1" },
  { name: "Next.js", value: 25, color: "#8b5cf6" },
  { name: "Prisma", value: 18, color: "#a78bfa" },
  { name: "Others", value: 12, color: "#c4b5fd" },
];

/* ── Comments Activity (Bar chart – 30 days) ── */
export const COMMENTS_ACTIVITY = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  comments: Math.floor(Math.random() * 45) + 5,
}));
