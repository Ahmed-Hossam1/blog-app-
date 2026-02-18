"use client";

import { useState, FormEvent } from "react";
import RecursiveComment from "./ui/RecursiveComment";
import { useSession } from "next-auth/react";
import { IBlog, IComment } from "@/types";
import Button from "./ui/Button";
import { toast } from "react-toastify";
import MyModal from "./ui/MyModal";
import { useRouter } from "next/navigation";

interface IProps {
  blog: IBlog;
}

const CommentSection = ({ blog }: IProps) => {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();

  /* ==================  STATE ================== */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState({
    authorName: "",
    image: "",
    comment: "",
    blogId: "",
  });
  const [reply, setReply] = useState({
    authorName: "",
    image: "",
    comment: "",
    parentCommentId: "",
    blogId: "",
  });
  const [replyToAuthorName, setReplyToAuthorName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  /* ================== MODAL ================== */
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleReplyClick = (parentId: string, ReplyToAuthorName: string) => {
    openModal();
    setReply({
      ...reply,
      authorName: user?.name || "",
      image: user?.image || "",
      blogId: blog.id,
      parentCommentId: parentId,
    });

    setReplyToAuthorName(ReplyToAuthorName);
  };

  /* ================== CREATE COMMENT ================== */
  const postNewComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...comment,
      authorName: user?.name || "",
      image: user?.image || "",
      blogId: blog.id,
    };

    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/createComment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success(json.message);
      setIsLoading(false);
      setComment({ authorName: "", image: "", comment: "", blogId: "" });
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
      setIsLoading(false);
    }
  };

  /* ================== CREATE REPLY ================== */
  const postReply = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/replyComment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reply),
        },
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success("Reply posted successfully");
      setIsLoading(false);
      setReply({
        authorName: "",
        image: "",
        comment: "",
        parentCommentId: "",
        blogId: "",
      });
      closeModal();
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <MyModal
        isOpen={isModalOpen}
        open={openModal}
        close={closeModal}
        title="leave a comment"
      >
        <div>@ {replyToAuthorName}</div>
        <textarea
          rows={5}
          value={reply.comment}
          autoFocus
          onChange={(e) => setReply({ ...reply, comment: e.target.value })}
          className="w-full rounded-lg border border-gray px-3 py-2 capitalize transition focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-transparent dark:text-white"
        />
        <Button
          type="button"
          onClick={postReply}
          disabled={isLoading}
          isLoading={isLoading}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          Post Reply
        </Button>
      </MyModal>

      {/* Comments */}
      <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Comments
          <span className="ml-3 inline-flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold px-2.5 py-0.5 rounded-full">
            {blog.comments?.length || 0}
          </span>
        </h3>

        <div className="space-y-8 mt-8">
          {blog.replies?.map((comment: IComment) => (
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
            value={comment.comment}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3 px-4 rounded-xl dark:text-white dark:placeholder-zinc-500 shadow-sm"
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Post Comment
          </Button>
        </form>
      </div>
    </>
  );
};

export default CommentSection;
