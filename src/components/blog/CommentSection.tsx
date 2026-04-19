"use client";

import { useState, FormEvent } from "react";
import RecursiveComment from "./RecursiveComment";
import { useSession } from "next-auth/react";
import { IBlog, IComment } from "@/types";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import MyModal from "../ui/MyModal";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface IProps {
  blog: IBlog;
}

const CommentSection = ({ blog }: IProps) => {
  const { data, status } = useSession();
  const user = data?.user;
  const router = useRouter();
  const { t } = useTranslation("blog");

  /* ==== State ==== */
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [replyToAuthorName, setReplyToAuthorName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [reply, setReply] = useState({
    comment: "",
    parentCommentId: "",
    blogId: "",
  });

  /* ==== Handlers ==== */
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const postNewComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(`/api/comments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, blogId: blog.id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success(t("comments.success") || json.message);
      setIsLoading(false);
      setComment("");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message);
      setIsLoading(false);
    }
  };

  const handleReplyClick = (parentId: string, ReplyToAuthorName: string) => {
    openModal();
    setReply({
      ...reply,
      blogId: blog.id,
      parentCommentId: parentId,
    });
    setReplyToAuthorName(ReplyToAuthorName);
  };

  const postReply = async () => {
    if (status !== "authenticated") return toast.error(t("comments.signInToComment"));

    try {
      setIsLoading(true);
      const res = await fetch(`/api/comments/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reply),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success(t("comments.replySuccess"));
      setIsLoading(false);
      setReply({
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

  const handleDeleteComment = async (id: string, blogId: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/comments/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id, blogId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(t("comments.deleteSuccess") || data.message);
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      toast.error((error as Error).message);
      setIsLoading(false);
    }
  };

  /* ==== JSX ==== */
  return (
    <>
      <MyModal isOpen={isModalOpen} close={closeModal}>
        <div>{t("comments.reply")}: @{replyToAuthorName}</div>
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
          loadingText={t("comments.postingReply")}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          {t("comments.postReply")}
        </Button>
      </MyModal>

      <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {t("comments.title")}
          <span className="ml-3 inline-flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold px-2.5 py-0.5 rounded-full">
            {blog.commentsCount}
          </span>
        </h3>

        <div className="space-y-8 mt-8">
          {blog.replies?.map((comment: IComment) => (
            <RecursiveComment
              key={comment.id}
              comment={comment}
              level={0}
              userId={user?.id}
              handleCommentReply={handleReplyClick}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
          {t("comments.leaveComment")}
        </h3>

        <form className="space-y-6" onSubmit={postNewComment}>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder={t("comments.placeholder")}
            rows={4}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all py-3 px-4 rounded-xl dark:text-white dark:placeholder-zinc-500 shadow-sm"
          />
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            loadingText={t("comments.submitting")}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            {t("comments.submit")}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CommentSection;
