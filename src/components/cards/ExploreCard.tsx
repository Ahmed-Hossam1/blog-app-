import { IBaseBlog } from "@/types";
import { truncateText } from "@/utils";
import Image from "next/image";
import { FaRegComment, FaRegEye } from "react-icons/fa6";

type ExploreCardProps = Pick<
  IBaseBlog,
  "title" | "image" | "category" | "meta" | "author"
>;

const ExploreCard = ({ title, image, category, meta, author }: ExploreCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl  bg-white dark:bg-surfaceDark shadow-sm transition hover:shadow-md hover:scale-105 hover:transition duration-500">
      {/* Image */}
      <div className="relative h-48">
        <Image
          src={image || "/default-image.png"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-full backdrop-blur-3xl text-white px-4 py-2 text-xs font-semibold capitalize">
          {meta?.readTime}
        </span>
        <div className="absolute left-4 -bottom-4">
          <Image
            src={author?.image || "/default-image.png"}
            alt={author?.name || "Author"}
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div>
          <span className="inline-block rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
            {category}
          </span>
          <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug dark:text-white group-hover:text-blue-600 transition-colors">
            {truncateText(title)}
          </h3>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <FaRegEye className="text-gray-400" /> {meta?.views}
            </span>
            <span className="flex items-center gap-1.5">
              <FaRegComment className="text-gray-400" /> {meta?.commentsCount}
            </span>
          </div>
          <span className="font-medium text-gray-400 uppercase tracking-tighter">{meta?.publishDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
