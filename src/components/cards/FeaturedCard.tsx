"use client";
import { IBlog } from "@/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegComment, FaRegEye } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

interface FeaturedCardProps extends Omit<IBlog, "comments"> {
  className?: string;
  comments?: { id: string }[];
}
const FeaturedCard = ({
  title,
  image,
  category,
  views,
  createdAt,
  comments,
  author,
  className,
}: FeaturedCardProps) => {
  const { i18n } = useTranslation("common");
  const lang = i18n.language || "en";

  return (
    <div className={`max-w-5xl ${className}`}>
      <div className="relative overflow-hidden rounded-2xl shadow-lg group">
        {/* Image */}
        <Image
          src={image || "/default-image.png"}
          alt={title || "image"}
          width={1200}
          height={600}
          className="h-105 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute right-4 top-4 rounded-full backdrop-blur-xl px-6 py-2 text-sm font-medium text-white">
          {category}
        </span>

        {/* Author Avatar */}
        <div className="absolute left-4 top-4">
          <Image
            src={author?.image || "/default-image.png"}
            alt={author?.name || "Author"}
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        </div>

        {/* Content */}
        <div className="absolute w-full bottom-0 left-0 p-6 text-white">
          <h2 className="mb-4 max-w-xl text-2xl font-semibold leading-snug">
            {title}
          </h2>

          <div className="flex items-center justify-between  text-sm text-gray-300">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaRegEye /> {views}
              </span>
              <span className="flex items-center gap-1">
                <FaRegComment /> {comments?.length ?? 0}
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                {" "}
                <BsCalendar2Date /> {formatDate(createdAt, lang)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
