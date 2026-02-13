import StatusCard from "@/components/cards/Status";
import Charts from "@/components/Charts";
import SectionWrapper from "@/components/SectionWrapper";
import TopPosts from "@/components/TopPosts";
import RecentPostsTable from "@/components/RecentPostsTable";
import {
  HiOutlineChatBubbleLeft,
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineHeart,
} from "react-icons/hi2";

const STATS_DATA = [
  {
    title: "Total Posts",
    value: "128",
    icon: HiOutlineDocumentText,
    trend: { value: 12, isUp: true },
    color: "#3b82f6", // Blue
  },
  {
    title: "Total Views",
    value: "45.2k",
    icon: HiOutlineEye,
    trend: { value: 8, isUp: true },
    color: "#8b5cf6", // Purple
  },
  {
    title: "Total Likes",
    value: "2,845",
    icon: HiOutlineHeart,
    trend: { value: 5, isUp: false },
    color: "#ec4899", // Pink
  },
  {
    title: "New Comments",
    value: "54",
    icon: HiOutlineChatBubbleLeft,
    trend: { value: 15, isUp: true },
    color: "#f59e0b", // Amber
  },
];

const PERFORMANCE_DATA = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 700 },
  { name: "Mar", users: 1200 },
  { name: "Apr", users: 900 },
  { name: "May", users: 1500 },
  { name: "Jun", users: 1800 },
];

const OverView = () => {
  return (
    <SectionWrapper>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Dashboard Overview
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          Monitor your blog is performance and manage your latest posts.
        </p>
      </div>

      {/* Row 1: Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS_DATA.map((stat, index) => (
          <StatusCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Row 2 - Left: Performance Chart */}
        <div className="lg:col-span-2">
          <Charts
            data={PERFORMANCE_DATA}
            title=" Performance Overview"
            description="User growth over the last few months"
          />
        </div>

        {/* Row 2 - Right: Top Posts */}
        <div className="lg:col-span-1">
          <TopPosts />
        </div>
      </div>

      {/* Row 3: Recent Posts Table */}
      <div className="mb-8">
        <RecentPostsTable />
      </div>
    </SectionWrapper>
  );
};

export default OverView;

/* 
OverviewPage
 ├─ QuickStats
 ├─ PerformanceChart
 ├─ TopPosts
 └─ RecentPostsTable

 */
