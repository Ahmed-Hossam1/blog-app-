"use client";

import Image from "next/image";
import { FormEvent, use, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegComment, FaRegEye } from "react-icons/fa6";

import SectionWrapper from "@/components/SectionWrapper";
import PageLoader from "@/components/PageLoader";
import MyModal from "@/components/ui/MyModal";
import Button from "@/components/ui/Button";
import RecursiveComment from "@/components/ui/RecursiveComment";

/* ================== TYPES ================== */
import { IBlog } from "@/types";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = use(params).slug;

  /* ================== BLOG STATE ================== */
  const [data, setData] = useState<IBlog>();

  /* ================== MODAL STATE ================== */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  /* ================== COMMENT FORM ================== */
  const [comment, setComment] = useState({
    authorName: "",
    image: "",
    comment: "",
    blogId: "",
  });

  /* ================== REPLY FORM ================== */
  const [reply, setReply] = useState({
    authorName: "",
    comment: "",
    parentCommentId: "",
    blogId: "",
  });

  /* ================== FETCH BLOG ================== */
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`,
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!data) return <PageLoader />;

  /* ================== MODAL ================== */
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleReplyClick = (parentId: string, authorName: string) => {
    openModal();
    setReply({
      ...reply,
      blogId: data.id,
      parentCommentId: parentId,
      authorName,
    });
  };

  /* ================== CREATE COMMENT ================== */
  const postNewComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);

    const payload = {
      ...comment,
      authorName: data.author.name,
      image: data.author.image,
      blogId: data.id,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success(json.message);
      setComment({ authorName: "", image: "", comment: "", blogId: "" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  /* ================== CREATE REPLY ================== */
  const postReply = async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/commentReply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reply),
        },
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success("Reply posted successfully");
      closeModal();
      setReply({
        authorName: "",
        comment: "",
        parentCommentId: "",
        blogId: "",
      });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper>
      <div className="container mx-auto max-w-5xl">
        {/* Reply Modal */}
        <MyModal
          isOpen={isModalOpen}
          open={openModal}
          close={closeModal}
          title="leave a comment"
        >
          <div>@{reply.authorName}</div>
          <textarea
            rows={5}
            value={reply.comment}
            onChange={(e) => setReply({ ...reply, comment: e.target.value })}
            className="w-full rounded-lg border border-gray px-3 py-2 capitalize transition focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-transparent dark:text-white"
          />
          <Button
            type="button"
            onClick={postReply}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Post Reply
          </Button>
        </MyModal>

        {/* Blog Card */}
        <div className="bg-gray-50 pb-5 rounded-xl dark:bg-surfaceDark">
          {/* Cover */}
          <div className="relative mb-10 overflow-hidden rounded-xl">
            <Image
              src={data.image}
              alt={data.slug}
              width={1200}
              height={600}
              className="h-105 w-full object-cover"
            />
            <span className="absolute bottom-5 right-4 rounded-md bg-white px-3 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
              {data.meta?.readTime}
            </span>
          </div>

          {/* Header */}
          <div className="mb-8 border-b px-8 pb-4 border-gray dark:border-gray-700">
            <span className="inline-block rounded-md bg-gray px-3 py-1 text-lg dark:bg-gray-700 dark:text-white">
              {data.category}
            </span>

            <h1 className="mt-4 text-3xl font-semibold leading-snug dark:text-white">
              {data.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaRegEye /> <span>{data.meta?.views}</span>
                </span>
                <span className="flex items-center gap-1">
                  <FaRegComment /> <span>{data.meta?.commentsCount}</span>
                </span>
              </div>
              <span className="flex items-center gap-2">
                <BsCalendar2Date /> <span>{data.meta?.publishDate}</span>
              </span>
            </div>
          </div>

          {/* Content */}
          <article className="prose px-8 max-w-none prose-h2:mt-10 prose-p:text-gray-600 dark:prose-invert">
            <h2 className="mb-5 text-2xl font-semibold text-baseInk dark:text-white">
              {data.subtitle}
            </h2>

            {data.content?.map((content, index) => (
              <div key={index} className="mb-5">
                {content.type === "heading" && (
                  <h3 className="mb-3 text-xl font-semibold text-navyGray dark:text-gray-200">
                    {content.text}
                  </h3>
                )}
                {content.type === "paragraph" && (
                  <p className="mb-4 leading-8 text-gray-700 dark:text-gray-300">
                    {content.text}
                  </p>
                )}
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

            {/* Comments */}
            <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Comments
                <span className="ml-3 inline-flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold px-2.5 py-0.5 rounded-full">
                  {data.comments?.length || 0}
                </span>
              </h3>

              <div className="space-y-8 mt-8">
                {data.comments.map((comment) => (
                  <RecursiveComment
                    key={comment.id}
                    comment={comment}
                    level={0}
                    handleCommentReply={handleReplyClick}
                  />
                ))}
              </div>
            </div>

            {/* New Comment */}
            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Leave a Comment
              </h3>

              <form className="space-y-6" onSubmit={postNewComment}>
                <textarea
                  onChange={(e) =>
                    setComment({ ...comment, comment: e.target.value })
                  }
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3 px-4 rounded-xl dark:text-white dark:placeholder-zinc-500 shadow-sm"
                />
                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  Post Comment
                </Button>
              </form>
            </div>
          </article>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Page;
