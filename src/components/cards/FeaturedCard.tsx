import Image from "next/image";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegComment, FaRegEye } from "react-icons/fa6";

interface IProps {
  title: string;
  src: string;
  alt: string;
  avatarSrc: string | undefined;
  avatarAlt: string | undefined;
  category: string;
  views: number;
  comments: number;
  date: string;
  className?: string;
}
const FeaturedCard = ({
  title,
  src,
  alt,
  avatarSrc,
  avatarAlt,
  category,
  views,
  comments,
  date,
  className,
}: IProps) => {
  return (
    <div className={`max-w-5xl ${className}`}>
      <div className="relative overflow-hidden rounded-2xl shadow-lg group">
        {/* Image */}
        <Image
          src={`/${src}`}
          alt={alt}
          width={1200}
          height={600}
          className="h-105 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        {/* Category Badge */}
        <span className="absolute right-4 top-4 rounded-full backdrop-blur-3xl px-6 py-2 text-sm font-medium text-white">
          {category}
        </span>

        {/* Author Avatar */}
        <div className="absolute left-4 top-4">
          <Image
            src={`/${avatarSrc}`}
            alt={`${avatarAlt}`}
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
                <FaRegComment /> {comments}
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                {" "}
                <BsCalendar2Date /> {date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
