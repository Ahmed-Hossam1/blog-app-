"use client";
import StatusCard from "@/components/cards/StatusCard";
import Charts from "@/components/dashboard/Charts";
import RecentPostsTable from "@/components/dashboard/RecentPostsTable";
import TopPosts from "@/components/dashboard/TopPosts";
import SectionWrapper from "@/components/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { PERFORMANCE_DATA, STATS_DATA } from "@/data/mockData";

const OverView = () => {
  return (
    <SectionWrapper>
      <div className="mb-10">
        <DashboardHeadingTitle
          title="Welcome Back Admin"
          description="Monitor your blog is performance and manage your latest posts."
        />
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
