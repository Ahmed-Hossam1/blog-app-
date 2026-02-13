import React from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from "react-icons/hi2";
import Button from "./ui/Button";

const RECENT_POSTS = [
    {
        id: 1,
        title: "Understanding React Server Components",
        category: "Development",
        status: "Published",
        date: "2024-03-12",
        views: 1240,
    },
    {
        id: 2,
        title: "A Guide to Modern CSS Layouts",
        category: "Design",
        status: "Draft",
        date: "2024-03-10",
        views: 0,
    },
    {
        id: 3,
        title: "Building Scalable APIs with NestJS",
        category: "Backend",
        status: "Published",
        date: "2024-03-08",
        views: 850,
    },
    {
        id: 4,
        title: "Getting Started with Prisma and Postgres",
        category: "Database",
        status: "Scheduled",
        date: "2024-03-15",
        views: 0,
    },
];

const RecentPostsTable = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Recent Posts</h3>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors">
                    Create New
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Views</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {RECENT_POSTS.map((post) => (
                            <tr key={post.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-1">{post.title}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                                        {post.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${post.status === 'Published'
                                            ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/30'
                                            : post.status === 'Draft'
                                                ? 'text-zinc-700 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800/50'
                                                : 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-950/30'
                                        }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{post.date}</td>
                                <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">{post.views.toLocaleString()}</td>
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
