import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookMarkButton from "@/components/blog/BookMarkButton";
import CommentSection from "@/components/blog/CommentSection";
import FollowButton from "@/components/blog/FollowButton";
import LikeButton from "@/components/blog/LikeButton";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { formatDate } from "@/lib/utils";
import {
  getBlogBySlug,
  isBlogBookmarked,
  isBlogLiked,
  isUserFollowing,
} from "@/services";
import { getLocale } from "@/lib/i18n/server/get-locale";
import { getTranslations } from "@/lib/i18n/server/get-translations";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegComment, FaRegEye } from "react-icons/fa6";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const lang = await getLocale();
  const cT = await getTranslations("common");

  if (!blog) return notFound();

  const isFollowing = await isUserFollowing(blog.authorId, userId as string);
  const isLiked = await isBlogLiked(userId as string, blog.id);
  const isBookmarked = await isBlogBookmarked(userId as string, blog.id);

  return (
    <SectionWrapper>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-surfaceDark">
          {/* ======= Image ======= */}
          <div className="relative h-105 w-full overflow-hidden">
            <Image
              src={blog.image || "/default-image.png"}
              alt={blog.slug || "blog"}
              fill
              priority
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

            {/* Read Time */}
            <span className="absolute right-6 bottom-8 rounded-full bg-white/20 px-4 py-1 text-xs font-medium text-white backdrop-blur-md">
              {cT.table?.metadata?.min_read?.replace("{{count}}", blog.readTime) || `${blog.readTime} min read`}
            </span>

            {/* Title Over Image */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="mb-3 inline-block rounded-full bg-primary/80 px-4 py-1 text-xs font-medium backdrop-blur">
                {blog.category}
              </span>

              <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
                {blog.title}
              </h1>
            </div>
          </div>

          {/* ======= Author INFO ======= */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-200 px-8 py-6 dark:border-gray-700">
            {/* Author */}
            <div className="flex items-center gap-4">
              <Image
                src={blog?.author?.image || "/default-image.png"}
                alt={blog?.author?.name || "Author"}
                width={45}
                height={45}
                className="rounded-full ring-2 ring-primary/30"
              />
              <div>
                <Link
                  href={`/authors/${blog.authorId}`}
                  className="text-sm font-medium dark:text-white hover:text-primary-hover"
                >
                  {blog.author?.name || cT.table?.placeholders?.anonymous || "Anonymous"}
                </Link>

                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <BsCalendar2Date />
                  {formatDate(blog.createdAt, lang)}
                </p>
              </div>

              {userId !== blog.author.id && (
                <FollowButton
                  isFollowing={isFollowing}
                  followingId={blog.authorId}
                />
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <FaRegEye className="text-base" />
                {blog.views}
              </span>

              <span className="flex items-center gap-2">
                <FaRegComment className="text-base" />
                {blog.commentsCount}
              </span>

              {userId !== blog.authorId && (
                <>
                  <LikeButton
                    likes={blog.likesCount}
                    blogId={blog.id}
                    authorId={blog.authorId}
                    isLiked={isLiked}
                  />
                  <BookMarkButton
                    bookmarkNumber={blog.bookmarksCount}
                    blogId={blog.id}
                    authorId={blog.authorId}
                    isBookmarked={isBookmarked}
                  />
                </>
              )}
            </div>
          </div>

          {/* ======= CONTENT ======= */}
          <article className="prose prose-lg mx-auto max-w-none px-8 py-10  prose-headings:font-bold  prose-h2:mt-10  prose-p:text-gray-600  prose-img:rounded-xl  prose-img:shadow-md dark:prose-invert">
            <Markdown remarkPlugins={[remarkGfm]}>{blog.content}</Markdown>

            {/* ======= COMMENTS ======= */}
            <div className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-700">
              <CommentSection blog={blog} />
            </div>
          </article>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Page;
