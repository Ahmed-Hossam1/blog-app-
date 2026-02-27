import StatusCard from "@/components/cards/StatusCard";
import MyBlogsTable from "@/components/dashboard/my-blogs/MyBlogsTable";
import TabsCat from "@/components/dashboard/my-blogs/TabsCat";
import SectionWrapper from "@/components/SectionWrapper";
import DashboardHeadingTitle from "@/components/ui/HeadingTitle";
import MyInput from "@/components/ui/Input";
import { DashboardTabsData } from "@/data";
import { MY_BLOGS_STATS } from "@/data/mockData";
import { getAuthorBlogs } from "@/services";

const MyBlogs = async () => {
  const authorBlogs = (await getAuthorBlogs("ahmed@example.com")) || [];
  // const [activeCategory, setActiveCategory] = useState<string>("All");

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
        {MY_BLOGS_STATS.map((stat, index) => (
          <StatusCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 mb-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <TabsCat data={DashboardTabsData} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:max-w-md">
            <MyInput
              placeholder="Search your blogs..."
              className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500"
            />
          </div>

          {/* Actions */}
          {/* <div
            className={`flex items-center gap-3 w-full md:w-auto transition-all duration-300 
            ${selectedIds.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
          >
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mr-2">
              {selectedIds.length} selected
            </span>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Publish
            </Button>
            <Button className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Draft
            </Button>
            <Button className="border border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-4 py-2 rounded-lg text-sm transition-colors">
              Delete
            </Button>
          </div> */}
        </div>
      </div>

      {/* Blogs Table */}
      <div className="mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <MyBlogsTable data={authorBlogs} />
          </div>

          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
            {/* <Pagination
              currentPage={1}
              totalPages={4}
            /> */}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10"></div>
    </SectionWrapper>
  );
};

export default MyBlogs;
