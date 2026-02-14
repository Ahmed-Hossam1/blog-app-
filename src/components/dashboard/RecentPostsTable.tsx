import { RECENT_POSTS, tableHeaders } from "@/data/mockData";
import Table from "../Table";

const RecentPostsTable = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table
          tableTitle="Recent Posts"
          tableHeader={tableHeaders}
          tableBody={RECENT_POSTS}
        />
      </div>

      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 text-center">
        <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          View all posts
        </button>
      </div>
    </div>
  );
};

export default RecentPostsTable;
