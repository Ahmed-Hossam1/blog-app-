import SectionWrapper from "@/components/SectionWrapper";
import Button from "@/components/ui/Button";
import RecursiveComment from "@/components/ui/RecursiveComment";
import { IBlog } from "@/types";
import Image from "next/image";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegComment, FaRegEye } from "react-icons/fa6";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  /*===== Fetch ===== */
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/blogs/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch");
  const data: IBlog = await res.json();

  

  return (
    <SectionWrapper>
      <div className="container mx-auto max-w-5xl ">
        {/* <MyModal>
          <textarea />
        </MyModal> */}
        <div
          id="card_details"
          className=" bg-gray-50 pb-5 rounded-xl dark:bg-surfaceDark"
        >
          {/* Card Head */}

          <div className="relative mb-10 overflow-hidden rounded-xl">
            {/* Cover Image */}
            <Image
              src={data.image}
              alt={`${data.slug}`}
              width={1200}
              height={600}
              className="h-105 w-full object-cover"
            />

            <span className="absolute bottom-5 right-4 rounded-md bg-white px-3 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
              {data.meta?.readTime}
            </span>
          </div>

          {/* Card Body */}
          <div>
            {/* Header */}
            <div className="mb-8 border-b px-8 pb-4  border-gray dark:border-gray-700">
              <span className="inline-block rounded-md bg-gray px-3 py-1 text-lg dark:bg-gray-700 dark:text-white">
                {data.category}
              </span>

              <h1 className="mt-4 text-3xl font-semibold leading-snug dark:text-white">
                {data.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center justify-between  text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 ">
                    <FaRegEye />
                    <span>{data.meta?.views}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegComment />
                    <span>{data.meta?.commentsCount}</span>
                  </span>
                </div>
                <div>
                  <span className="flex items-center gap-2">
                    <BsCalendar2Date />
                    <span>{data.meta?.publishDate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* body */}
            <article className="prose  px-8  max-w-none prose-h2:mt-10 prose-p:text-gray-600 dark:prose-invert">
              {/* details */}
              <div className="border-b border-gray-200 pb-6">
                <div className="mb-10">
                  {/* Subtitle */}
                  <h2 className="mb-5 text-2xl font-semibold text-baseInk dark:text-white">
                    {data.subtitle}
                  </h2>

                  {/* Content */}
                  {data.content?.map((content, index) => (
                    <div key={index} className="mb-5">
                      {/* Heading */}
                      {content.type === "heading" && (
                        <h3 className="mb-3 text-xl font-semibold text-navyGray dark:text-gray-200">
                          {content.text}
                        </h3>
                      )}

                      {/* Paragraph */}
                      {content.type === "paragraph" && (
                        <p className="mb-4 leading-8 text-gray-700 dark:text-gray-300">
                          {content.text}
                        </p>
                      )}

                      {/* List */}
                      {content.type === "list" && (
                        <ul className="mb-4 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                          {content.listItems?.map((item, i) => (
                            <li key={i} className="leading-7">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Container */}
              <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                {/* Comments Header */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Comments
                    <span className="ml-3 inline-flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold px-2.5 py-0.5 rounded-full">
                      {data.comments?.length || 0}
                    </span>
                  </h3>
                </div>
                {/* Comments Body */}
                <div className="space-y-8">
                  {data?.comments.map((comment) => (
                    <RecursiveComment
                      key={comment.id}
                      comment={comment}
                      level={0}
                    />
                  ))}
                </div>
              </div>

              {/* Leave Comment */}
              <div className="mt-12">
                <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                  Leave a Comment
                </h3>

                <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-6 md:p-8 border border-zinc-100 dark:border-zinc-800">
                  <form className="space-y-6">
                    <textarea
                      placeholder="Share your thoughts..."
                      rows={4}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3 px-4 rounded-xl dark:text-white dark:placeholder-zinc-500 shadow-sm"
                    />

                    <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                      Post Comment
                    </Button>
                  </form>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default page;
