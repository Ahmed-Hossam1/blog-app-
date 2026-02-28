import StatusCard from "@/components/cards/StatusCard";
import Charts from "@/components/dashboard/overView/Charts";
import RecentBlogsTable from "@/components/dashboard/overView/RecentPostsTable";
import TopBlogs from "@/components/dashboard/overView/TopPosts";
import SectionWrapper from "@/components/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { PERFORMANCE_DATA, STATS_DATA } from "@/data/mockData";
import { getAuthorBlogs } from "@/services";
import { generateStatus } from "@/utils";
import { getServerSession } from "next-auth";
const OverView = async () => {
  const session = await getServerSession();
  const user = session?.user;

  const authorBlogs = (await getAuthorBlogs(user?.email as string)) ;

  const stats = generateStatus(authorBlogs, STATS_DATA);

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
        {stats.map((stat, index) => (
          <StatusCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
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
            description="blogs growth over the last few months"
          />
        </div>

        {/* Row 2 - Right: Top Posts */}
        <div className="lg:col-span-1">
          <TopBlogs data={authorBlogs} />
        </div>
      </div>

      {/* Row 3: Recent Posts Table */}
      <div className="mb-8">
        <RecentBlogsTable data={authorBlogs} />
      </div>
    </SectionWrapper>
  );
};

export default OverView;
