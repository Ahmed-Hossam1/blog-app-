import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StatusCard from "@/components/cards/StatusCard";
import MyBlogsTable from "@/components/dashboard/my-blogs/MyBlogsTable";
import TabsCat from "@/components/dashboard/my-blogs/TabsCat";

import SectionWrapper from "@/components/SectionWrapper";
import Button from "@/components/ui/Button";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import MyInput from "@/components/ui/Input";
import { DashboardTabsData } from "@/data";
import { MY_BLOGS_STATS } from "@/data/mockData";
import { calculators, generateStatus } from "@/lib";
import { getAuthorBlogs } from "@/services";
import { getServerSession } from "next-auth";

const MyBlogs = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const authorBlogs = (await getAuthorBlogs(user?.id as string)) || [];

  const stats = generateStatus(authorBlogs, MY_BLOGS_STATS, calculators);

  return (
    <SectionWrapper>
      {/* Heading */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <DashboardHeadingTitle
            title="My Blogs"
            description="Manage your blog posts and categories."
          />
        </div>
      </div>

      {/* Row 1: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <StatusCard
            key={stat.key}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Blogs Table */}
      <MyBlogsTable authorBlogs={authorBlogs} />

      <div className="flex justify-center mt-10"></div>
    </SectionWrapper>
  );
};

export default MyBlogs;
