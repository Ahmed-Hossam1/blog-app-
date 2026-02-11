import SectionWrapper from "@/components/SectionWrapper";
import Button from "@/components/ui/Button";
import { IBlog } from "@/types";
import Image from "next/image";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegComment, FaRegEye, FaReply } from "react-icons/fa6";

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
              <div className="mt-5 border-b pb-4  border-gray">
                {/* Comments Header */}
                <h3 className="mb-6 text-lg text-navyGray font-semibold dark:text-white">
                  Comments
                  <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs dark:bg-blue-900 dark:text-white">
                    {data.comments?.length}
                  </span>
                </h3>
                {/* Comments Body */}
                <div className="space-y-6">
                  {data.comments?.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-xl bg-blue-50 p-6 dark:bg-gray-800"
                    >
                      {/* Header */}
                      <div className="mb-3 flex items-center gap-3">
                        <Image
                          src={comment.image}
                          alt={comment.authorName}
                          width={40}
                          height={40}
                          className=" rounded-full object-cover"
                        />
                        <h4 className="font-semibold text-baseInk dark:text-white">
                          {comment.authorName}
                        </h4>
                      </div>

                      {/* Comment Text */}
                      <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300">
                        {comment.comment}
                      </p>

                      {/* Reply Button */}
                      <Button className="flex h-9 w-9 items-center justify-center  bg-primary text-white hover:bg-blue-700 transition">
                        <FaReply />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leave Comment */}
              <div className="mt-5">
                <h3 className="mb-3 text-lg text-navyGray font-semibold dark:text-white">
                  Leave a Comment on this post
                </h3>

                <div className="rounded-2xl bg-slate-50 p-8 dark:bg-gray-800">
                  <form className="space-y-4">
                    <textarea
                      placeholder="Write Your Comment"
                      rows={4}
                      className="capitalize w-full border border-gray focus:outline-none focus:border-primary transition py-2 px-4 rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700"
                    />

                    <Button className=" bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
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
