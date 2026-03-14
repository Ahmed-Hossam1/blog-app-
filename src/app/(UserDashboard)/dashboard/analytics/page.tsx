import StatusCard from "@/components/cards/StatusCard";
import CommentsActivityChart from "@/components/dashboard/analytics/CommentsActivityChart";
import TopCategoriesChart from "@/components/dashboard/analytics/TopCategoriesChart";
import TrafficPieChart from "@/components/dashboard/analytics/TrafficPieChart";
import TrafficSourcesChart from "@/components/dashboard/analytics/TrafficSourcesChart";
import ViewsOverTimeChart from "@/components/dashboard/analytics/ViewsOverTimeChart";
import SectionWrapper from "@/components/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";

import {
  ANALYTICS_STATS,
  COMMENTS_ACTIVITY,
  TOP_CATEGORIES,
  TRAFFIC_PIE,
  TRAFFIC_SOURCES,
  VIEWS_OVER_TIME
} from "@/data/analyticsData";

const AnalyticsPage = () => {
  return (
    <SectionWrapper>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <DashboardHeadingTitle
          title="Analytics"
          description="Data Insights for Ahmed's Blog"
        />

        {/* Time Range Selector */}
        <select
          id="analytics-time-range"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm cursor-pointer transition-all hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Row 1: Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {ANALYTICS_STATS.map((stat, index) => (
          <StatusCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Row 2: Views Over Time + Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ViewsOverTimeChart data={VIEWS_OVER_TIME} />
        </div>
        <div className="lg:col-span-1">
          <TrafficSourcesChart data={TRAFFIC_SOURCES} />
        </div>
      </div>

      {/* Row 3: Engagement Trend + Traffic Pie + Top Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <TrafficPieChart data={TRAFFIC_PIE} />
        <TopCategoriesChart data={TOP_CATEGORIES} />
      </div>

      {/* Row 4: Comments Activity */}
      <div className="mb-8">
        <CommentsActivityChart data={COMMENTS_ACTIVITY} />
      </div>
    </SectionWrapper>
  );
};

export default AnalyticsPage;
