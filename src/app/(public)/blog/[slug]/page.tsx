import CommentSection from "@/components/CommentSection";
import SectionWrapper from "@/components/SectionWrapper";
import { getBlogById } from "@/services";
import { formatDate } from "@/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegComment, FaRegEye } from "react-icons/fa6";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const session = await getServerSession();
  const user = session?.user;

  const blog = await getBlogById(slug);
  if (!blog) return notFound();

  return (
    <SectionWrapper>
      <div className="container mx-auto max-w-5xl px-4">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-surfaceDark">
          {/* ======= Image ======= */}
          <div className="relative h-105 w-full overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.slug}
              fill
              priority
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

            {/* Read Time */}
            <span className="absolute right-6 bottom-8 rounded-full bg-white/20 px-4 py-1 text-xs font-medium text-white backdrop-blur-md">
              {blog.readTime}
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

          {/* ======= USER INFO ======= */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-200 px-8 py-6 dark:border-gray-700">
            {/* Author */}
            <div className="flex items-center gap-4">
              <Image
                src={user?.image || "/default-image.png"}
                alt={user?.name || "Author"}
                width={45}
                height={45}
                className="rounded-full ring-2 ring-primary/30"
              />
              <div>
                <p className="text-sm font-medium dark:text-white">
                  {user?.name || "Anonymous"}
                </p>
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <BsCalendar2Date />
                  {formatDate(blog.createdAt)}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <FaRegEye className="text-base" />
                {blog.views}
              </span>

              <span className="flex items-center gap-2">
                <FaRegComment className="text-base" />
                {blog.comments?.length ?? 0}
              </span>
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
