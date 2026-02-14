import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import Button from "./ui/Button";

type Post = {
  id: number;
  title: string;
  category: string;
  status: string;
  date: string;
  views: number;
};

interface TableProps {
  tableTitle?: string;
  tableHeader: string[];
  tableBody: Post[];
  needCheckbox?: boolean;
  selectedIds?: number[];
  onSelectAll?: () => void;
  onSelectRow?: (id: number) => void;
}

const Table = ({
  tableTitle,
  tableHeader,
  tableBody,
  needCheckbox = false,
  selectedIds = [],
  onSelectAll,
  onSelectRow,
}: TableProps) => {
  const isAllSelected =
    tableBody.length > 0 && selectedIds.length === tableBody.length;
  return (
    <>
      {tableTitle && (
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            {tableTitle}
          </h3>
        </div>
      )}
      <table className="w-full text-left">
        <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-xs uppercase font-semibold">
          <tr>
            {needCheckbox && (
              <th className="px-6 py-4 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </th>
            )}

            {tableHeader.map((header) => (
              <th key={header} className="px-6 py-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {tableBody.map((post) => (
            <tr
              key={post.id}
              className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group ${
                selectedIds.includes(post.id)
                  ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                  : ""
              }`}
            >
              {needCheckbox && (
                <td className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(post.id)}
                    onChange={() => onSelectRow?.(post.id)}
                    className="w-4 h-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                </td>
              )}

              <td className="px-6 py-4">
                <span className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-1">
                  {post.title}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                  {post.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                    post.status === "Published"
                      ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30"
                      : post.status === "Draft"
                        ? "text-zinc-700 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800/50"
                        : "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-950/30"
                  }`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {post.date}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                {post.views.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button className="p-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <HiOutlineEye size={18} />
                  </Button>
                  <Button className="p-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <HiOutlinePencil size={18} />
                  </Button>
                  <Button className="p-2 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                    <HiOutlineTrash size={18} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
