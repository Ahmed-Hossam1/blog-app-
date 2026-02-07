import { IBaseBlog } from "@/types";
import { truncateText } from "@/utils";
import Image from "next/image";
import { FaRegComment, FaRegEye } from "react-icons/fa6";

type ExploreCardProps = Pick<
  IBaseBlog,
  "title" | "image" | "category" | "meta" | "author"
>;
const ExploreCard = (ExploreCardProps: ExploreCardProps) => {
  const { title, image, category, meta, author } = ExploreCardProps;
  return (
    <div className="overflow-hidden rounded-2xl  bg-white shadow-sm transition hover:shadow-md hover:scale-105 hover:transition duration-500">
      {/* Image */}
      <div className="relative h-48">
        <Image
          src={image}
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
            src={`${author.image}`}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 text-left">
        <span className="my-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-navyGray">
          {category}
        </span>

        <h3 className="mt-2 line-clamp-2 text-base font-semibold">
          {truncateText(title)}
        </h3>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaRegEye /> {meta?.views}
            </span>
            <span className="flex items-center gap-1">
              <FaRegComment /> {meta?.commentsCount}
            </span>
          </div>
          <span>{meta?.publishDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
