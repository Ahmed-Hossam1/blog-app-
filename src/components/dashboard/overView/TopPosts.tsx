import { prisma } from "@/prisma/prisma";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineChatBubbleLeft, HiOutlineEye } from "react-icons/hi2";

const TopBlogs = async ({
  session,
  title,
  emptyMessage,
}: {
  session: Session | null;
  title: string;
  emptyMessage: string;
}) => {
  const data = await prisma.blog.findMany({
    where: { authorId: session?.user?.id, status: "PUBLISHED" },
  });

  if (data.length === 0)
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 h-full flex items-center justify-center">
        <p className="text-zinc-400">{emptyMessage}</p>
      </div>
    );

  const TopBlogsList = [...data].sort((a, b) => b.views - a.views);
  const slicedData = TopBlogsList.slice(0, 4);
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="space-y-4">
        {slicedData.map((blog) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.id}
            className="group flex items-center gap-4 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-200 cursor-pointer"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
              <Image
                src={blog.image || "/default-image.png"}
                alt={blog.title || "image"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase">
                {blog.title}
              </h4>
              <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <HiOutlineEye size={14} /> {blog.views}
                </span>
                <span className="flex items-center gap-1">
                  <HiOutlineChatBubbleLeft size={14} /> {blog.commentsCount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBlogs;
