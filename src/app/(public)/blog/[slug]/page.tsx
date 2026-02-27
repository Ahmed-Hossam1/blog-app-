import CommentSection from "@/components/CommentSection";
import SectionWrapper from "@/components/SectionWrapper";
import { getBlogById } from "@/services";
import { formatDate } from "@/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegComment, FaRegEye } from "react-icons/fa6";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  /* ================== FETCH BLOG ================== */
  const blog = await getBlogById(slug);

  if (!blog) return notFound();
  return (
    <SectionWrapper>
      <div className="container mx-auto max-w-5xl">
        {/* Blog Card */}
        <div className="bg-gray-50 pb-5 rounded-xl dark:bg-surfaceDark">
          {/* Cover */}
          <div className="relative mb-10 overflow-hidden rounded-xl">
            <Image
              src={blog.image}
              alt={blog.slug}
              width={1200}
              height={600}
              className="h-105 w-full object-cover"
            />
            <span className="absolute bottom-5 right-4 rounded-md bg-white px-3 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
              {blog.readTime}
            </span>
          </div>

          {/* Header */}
          <div className="mb-8 border-b px-8 pb-4 border-gray dark:border-gray-700">
            <span className="inline-block rounded-md bg-gray px-3 py-1 text-lg dark:bg-gray-700 dark:text-white">
              {blog.category}
            </span>

            <h1 className="mt-4 text-3xl font-semibold leading-snug dark:text-white">
              {blog.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaRegEye /> <span>{blog.views}</span>
                </span>
                <span className="flex items-center gap-1">
                  <FaRegComment /> <span>{blog.comments?.length ?? 0}</span>
                </span>
              </div>
              <span className="flex items-center gap-2">
                <BsCalendar2Date /> <span>{formatDate(blog.createdAt)}</span>
              </span>
            </div>
          </div>

          {/* Content */}
          <article className="prose px-8 max-w-none prose-h2:mt-10 prose-p:text-gray-600 dark:prose-invert">
            <h2 className="mb-5 text-2xl font-semibold text-baseInk dark:text-white">
              Introduction
            </h2>

            <article className=" prose  dark:prose-invert max-w-none  ">
              <Markdown remarkPlugins={[remarkGfm]}>{blog.content}</Markdown>
            </article>

            {/* Comments Section */}
            <CommentSection blog={blog} />
          </article>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Page;
