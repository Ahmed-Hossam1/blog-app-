import { tableHeaders } from "@/data/mockData";
import { IBlog } from "@/types";
import Table from "../Table";

interface RecentPostsTableProps {
  data: IBlog[];
}
const RecentPostsTable = ({ data }: RecentPostsTableProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <Table
          tableTitle="Recent Blogs"
          tableHeader={tableHeaders}
          tableBody={data}
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
