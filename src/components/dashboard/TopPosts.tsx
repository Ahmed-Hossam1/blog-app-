import { MOCK_TOP_POSTS } from "@/data/mockData";
import Image from "next/image";
import {
  HiOutlineEye,
  HiOutlineChatBubbleLeft,
  HiOutlineArrowRight,
} from "react-icons/hi2";


const TopPosts = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          Top Posts
        </h3>
        <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
          View All <HiOutlineArrowRight />
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_TOP_POSTS.map((post) => (
          <div
            key={post.id}
            className="group flex items-center gap-4 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-200 cursor-pointer"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase">
                {post.title}
              </h4>
              <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <HiOutlineEye size={14} /> {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <HiOutlineChatBubbleLeft size={14} /> {post.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
