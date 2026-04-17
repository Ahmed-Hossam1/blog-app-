import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StatusCard from "@/components/cards/StatusCard";
import MyBlogsTable from "@/components/dashboard/my-blogs/MyBlogsTable";
import SectionWrapper from "@/components/shared/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { MOCK_MY_BLOGS_STATS_CONFIG } from "@/data/mock/dashboard";
import { calculators, computeStatValues } from "@/lib/helpers";
import { getAuthorBlogs } from "@/services";
import { getServerSession } from "next-auth";

const MyBlogs = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const authorBlogs = (await getAuthorBlogs(user?.id as string)) || [];

  const stats = computeStatValues(
    authorBlogs,
    MOCK_MY_BLOGS_STATS_CONFIG,
    calculators,
  );

  return (
    <SectionWrapper>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <DashboardHeadingTitle
          title="My Blogs"
          description="Manage, update, and organize your content."
        />

        <Link
          href="/dashboard/editor"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
        >
          + New Blog
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.slice(0, 4).map((stat) => (
          <StatusCard
            key={stat.key}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <MyBlogsTable authorBlogs={authorBlogs} />
    </SectionWrapper>
  );
};

export default MyBlogs;