import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StatusCard from "@/components/cards/StatusCard";
import Charts from "@/components/dashboard/overView/Charts";
import TopBlogs from "@/components/dashboard/overView/TopPosts";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Table from "@/components/shared/Table";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import { tableHeaders } from "@/constants";
import {
  MOCK_PERFORMANCE_DATA,
  MOCK_STATS_CONFIG,
} from "@/data/mock/dashboard";
import { calculators, computeStatValues } from "@/lib/helpers";
import { getAuthorBlogs } from "@/services";
import { getServerSession } from "next-auth";
import { getTranslations } from "@/lib/i18n";
import Link from "next/link";
const OverView = async () => {
  const t = await getTranslations("dashboard");
  const tCommon = await getTranslations("common");
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const authorBlogs = (await getAuthorBlogs(user?.id as string)) || [];

  const stats = computeStatValues(authorBlogs, MOCK_STATS_CONFIG, calculators);
  const slicedData = authorBlogs.slice(0, 7);

  return (
    <SectionWrapper>
      <div className="mb-10">
        <DashboardHeadingTitle
          title={t.heading.title}
          description={t.heading.description}
        />
      </div>

      {/* Row 1: Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatusCard
            key={index}
            title={t.stats[stat.key as string] || stat.title}
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
            data={MOCK_PERFORMANCE_DATA}
            title={t.performance.title}
            description={t.performance.description}
          />
        </div>

        {/* Row 2 - Right: Top Posts */}
        <div className="lg:col-span-1">
          <TopBlogs
            data={authorBlogs}
            title={t.top_blogs.title}
            emptyMessage={t.top_blogs.empty}
          />
        </div>
      </div>

      {/* Row 3: Recent Posts Table */}
      <div className="mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
              {slicedData.length > 0 ? (
                <Table
                  tableTitle={t.recent_blogs}
                  tableHeader={tableHeaders.map((header) => tCommon.table.table_headers[header.toLowerCase()])}
                  tableBody={slicedData}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                    📭
                  </div>
                  <h3 className="text-base font-semibold dark:text-white">
                    {t.empty_state.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {t.empty_state.description}
                  </p>
                  <Link
                    href={"/dashboard/create-blog"}
                    className="mt-4 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    {t.empty_state.button}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OverView;
