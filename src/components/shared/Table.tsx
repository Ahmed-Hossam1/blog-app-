import Link from "next/link";
import { FiEdit2, FiEye } from "react-icons/fi";

import { formatDate } from "@/lib/utils";
import { IBlog } from "@/types";

interface TableProps {
  tableTitle?: string;
  tableHeader: string[];
  tableBody: IBlog[];
  needCheckbox?: boolean;
  selectedIds?: string[];
  onSelectAll?: () => void;
  onSelectRow?: (id: string) => void;
  showActions?: boolean;
  getViewHref?: (blog: IBlog) => string | null;
}

const Table = ({
  tableTitle,
  tableHeader,
  tableBody,
  needCheckbox = false,
  selectedIds = [],
  onSelectAll,
  onSelectRow,
  showActions = false,
  getViewHref,
}: TableProps) => {
  const isAllSelected =
    tableBody.length > 0 && selectedIds.length === tableBody.length;

  return (
    <>
      {tableTitle && (
        <div className="flex items-center justify-between border-b border-zinc-100 p-6 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            {tableTitle}
          </h3>
        </div>
      )}

      <table className="w-full text-center">
        <thead className="bg-zinc-50 text-xs font-semibold uppercase text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
          <tr>
            {needCheckbox && (
              <th className="w-10 px-6 py-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
            )}

            {tableHeader.map((header) => (
              <th key={header} className="px-6 py-4">
                {header}
              </th>
            ))}

            {showActions && <th className="px-6 py-4">Actions</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {tableBody.map((blog) => {
            const viewHref = getViewHref?.(blog);

            return (
              <tr
                key={blog.id}
                className={`group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30 ${
                  selectedIds.includes(blog.id)
                    ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                    : ""
                }`}
              >
                {needCheckbox && (
                  <td className="w-10 px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(blog.id)}
                      onChange={() => onSelectRow?.(blog.id)}
                      className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                )}

                <td className="px-6 py-4">
                  <div className="max-w-60 mx-auto">
                    <span className="line-clamp-1 text-sm font-medium text-zinc-900 dark:text-white">
                      {blog.title || "Untitled Blog"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {blog.category || "Uncategorized"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                      blog.status === "PUBLISHED"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : blog.status === "DRAFT"
                          ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {formatDate(blog.createdAt)}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {blog.views ?? 0}
                </td>

                {showActions && (
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {viewHref && (
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 transition-all duration-200 hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                        >
                          <FiEye size={14} />
                          View
                        </Link>
                      )}

                      <Link
                        href={`/dashboard/editor?id=${blog.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border  px-3 py-2 text-xs font-semibold  border-indigo-500 bg-indigo-500 dark:text-white  hover:bg-indigo-600  hover:shadow-sm"
                      >
                        <FiEdit2 size={14} />
                        {blog.status === "DRAFT" ? "Continue" : "Edit"}
                      </Link>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
