import SectionWrapper from "@/components/SectionWrapper";
import { blogsData } from "@/data";
import Image from "next/image";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegEye, FaRegComment } from "react-icons/fa6";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug)
  return (
    <SectionWrapper className="pt-40">
      <div className="container mx-auto max-w-5xl ">
        <div id="card_details" className=" bg-gray-50 pb-5 rounded-xl ">
          {/* Card Head */}
          <div className="relative mb-10 overflow-hidden rounded-xl">
            {/* Cover Image */}
            <Image
              src="/image1.jpg"
              alt="blog cover"
              width={1200}
              height={600}
              className="h-105 w-full object-cover"
            />
            <span className="absolute bottom-5 right-4 rounded-md bg-white px-3 py-1 text-xs font-medium">
              2 Min Read
            </span>
          </div>

          {/* Card Body */}
          <div>
            {/* Header */}
            <div className="mb-8 border-b px-8 pb-4  border-gray">
              <span className="inline-block rounded-md bg-gray px-3 py-1 text-lg">
                Technology
              </span>

              <h1 className="mt-4 text-3xl font-semibold leading-snug">
                Top Articles to Read on Technology
              </h1>

              <div className="mt-4 flex flex-wrap items-center justify-between  text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 ">
                    <FaRegEye />
                    <span>224</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegComment />
                    <span>12</span>
                  </span>
                </div>
                <div>
                  <span className="flex items-center gap-2">
                    <BsCalendar2Date />
                    <span>May 15, 2023</span>
                  </span>
                </div>
              </div>
            </div>

            {/* body */}
            <article className="prose  px-8  max-w-none prose-h2:mt-10 prose-p:text-gray-600">
              {/* details */}
              <div className="border-b border-gray-200 pb-6">
                {blogsData.map((blog) => (
                  <div key={blog.id} className="mb-10">
                    {/* Subtitle */}
                    <h2 className="mb-5 text-2xl font-semibold text-baseInk">
                      subtitle
                    </h2>

                    {/* Content */}
                    {blog.content?.map((content, index) => (
                      <div key={index} className="mb-5">
                        {/* Heading */}
                        {content.type === "heading" && (
                          <h3 className="mb-3 text-xl font-semibold text-baseInk">
                            content header
                          </h3>
                        )}

                        {/* Paragraph */}
                        {content.type === "paragraph" && (
                          <p className="mb-4 leading-8 text-gray-700">
                            content paragraph
                          </p>
                        )}

                        {/* List */}
                        {content.type === "list" && (
                          <ul className="mb-4 list-disc pl-6 space-y-2 text-gray-700">
                            {content.items?.map((item, i) => (
                              <li key={i} className="leading-7">
                                list items
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Comments Container */}
              <div className="mt-5 border-b pb-4  border-gray">
                {/* Comments Header */}
                <h3 className="mb-6 text-lg font-semibold">
                  Comments{" "}
                  <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs">
                    3
                  </span>
                </h3>
                {/* Comments Body */}
                <div className="space-y-6">
                  {blogsData.map((item) =>
                    item.comments?.map((comment) => (
                      <div
                        key={comment.id}
                        className="rounded-xl bg-blue-50 p-6"
                      >
                        {/* Header */}
                        <div className="mb-3 flex items-center gap-3">
                          <Image
                            src={`/${comment.avatar}`}
                            alt={comment.author}
                            width={40}
                            height={40}
                            className=" rounded-full object-cover"
                          />
                          <h4 className="font-semibold text-baseInk">
                            comment author
                          </h4>
                        </div>

                        {/* Comment Text */}
                        <p className="mb-4 leading-7 text-gray-700">comment</p>

                        {/* Reply Button */}
                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                          Icon
                        </button>
                      </div>
                    )),
                  )}
                </div>
              </div>

              {/* Leave Comment */}
              <div className="mt-5">
                <h3 className="mb-6 text-lg font-semibold">
                  Leave a Comment on this post
                </h3>

                <div className="rounded-2xl bg-slate-50 p-8">
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                    />
                    <textarea
                      placeholder="Your Comment"
                      rows={4}
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                    />
                    <button
                      type="button"
                      className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Post Comment
                    </button>
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
