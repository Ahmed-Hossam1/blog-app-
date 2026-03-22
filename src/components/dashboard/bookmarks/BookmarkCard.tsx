import { IBaseBlog } from "@/types";
import Image from "next/image";
import { FaRegComment, FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import RemoveBookmarkButton from "./RemoveBookmarkButton";
import { formatDate, truncateText } from "@/lib/utils";

type BookmarkCardProps = Pick<
  IBaseBlog,
  | "id"
  | "title"
  | "image"
  | "category"
  | "views"
  | "readTime"
  | "createdAt"
  | "author"
  | "slug"
> & { comments?: { id: string }[] };

const BookmarkCard = ({
  id,
  title,
  image,
  category,
  views,
  readTime,
  createdAt,
  comments,
  author,
  slug,
}: BookmarkCardProps) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-surfaceDark shadow-sm transition hover:shadow-xl hover:-translate-y-1 duration-300 border border-transparent dark:border-gray-800">
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <RemoveBookmarkButton blogId={id} />
      </div>

      <Link href={`/blog/${slug}`} className="block h-full">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/default-image.png"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/40 backdrop-blur-md text-white px-3 py-1 text-xs font-medium capitalize">
            {readTime}
          </span>
          <div className="absolute left-4 -bottom-5">
            <Image
              src={author?.image || "/default-image.png"}
              alt={author?.name || "Author"}
              width={44}
              height={44}
              className="rounded-full border-2 border-white dark:border-surfaceDark bg-white dark:bg-surfaceDark"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pt-8 flex flex-col flex-1 bg-white dark:bg-surfaceDark">
          <div className="mb-2">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:text-primaryLight transition-colors">
              {category}
            </span>
          </div>
          <h3 className="mb-4 line-clamp-2 text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
            {truncateText(title)}
          </h3>

          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                <FaRegEye size={14} /> {views}
              </span>
              <span className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                <FaRegComment size={14} /> {comments?.length ?? 0}
              </span>
            </div>
            <span className="font-medium uppercase tracking-wider text-[11px]">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookmarkCard;
