"use client";
import { IComment } from "@/types";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FaReply } from "react-icons/fa6";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import Button from "../ui/Button";
import { formatDate } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import MyModal from "../ui/MyModal";
import { useState } from "react";

interface ICommentProps {
  userId?: string;
  handleCommentReply: (
    parentCommentId: string,
    ReplyToAuthorName: string,
  ) => void;
  handleDeleteComment: (id: string, blogId: string) => Promise<void>;
  comment: IComment;
  level?: number;
}

const DELETED_MARKER = "Deleted Comment";

const RecursiveComment = ({
  userId,
  comment,
  level = 0,
  handleCommentReply,
  handleDeleteComment,
}: ICommentProps) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation("blog");
  const lang = i18n.language || "en";
  const {
    id,
    blogId,
    authorId,
    authorName,
    image,
    comment: commentText,
    createdAt,
    replies,
  } = comment;

  // Check if the comment content === "Deleted Comment" so the comment is deleted
  const isDeleted = commentText === DELETED_MARKER;

  const showDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const deleteComment = async (id: string, blogId: string) => {
    setIsLoading(true);
    try {
      await handleDeleteComment(id, blogId);
      closeDeleteModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };
  return (
    <div
      className={`flex flex-col relative ${level > 0 ? "ml-4 md:ml-8" : ""}`}
    >
      {/* Delete Modal  */}
      <MyModal
        title="Delete Comment"
        isOpen={deleteModal}
        close={closeDeleteModal}
      >
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-gray-500 dark:text-gray-400">
            are you sure you want to this delete comment
          </p>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={closeDeleteModal}
              disabled={isLoading}
              className="border border-transparent bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
            >
              cancel
            </Button>

            <Button
              type="button"
              onClick={() => deleteComment(id, blogId)}
              isLoading={isLoading}
              loadingText={t("table.delete_modal.deleting_text")}
              className="overflow-hidden bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-rose-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </MyModal>

      {/* Vertical Thread Line */}
      {level > 0 && (
        <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-0.5 rounded-full bg-linear-to-b from-indigo-300 to-indigo-100 dark:from-indigo-700 dark:to-indigo-900" />
      )}

      <div className="relative z-10">
        {isDeleted ? (
          /* ── Deleted Comment Tombstone ── */
          <div className="flex overflow-hidden relative items-center gap-3.5 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-5 py-4 transition-all duration-500 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/80">
            {/* Icon */}
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 shadow-inner border border-zinc-200/60 dark:border-zinc-700/60 transition-transform duration-300 hover:scale-105">
              <MdOutlineDoNotDisturbAlt size={18} />
            </span>

            {/* Text */}
            <div className="relative flex flex-col min-w-0">
              <p className="text-[14px] italic text-zinc-500 dark:text-zinc-400 font-medium leading-snug">
                {t("comments.deletedMessage")}
              </p>
              <span className="text-[11px] font-semibold text-zinc-400/80 dark:text-zinc-500 mt-0.5 tracking-wider uppercase">
                {formatDate(createdAt, lang)}
              </span>
            </div>
          </div>
        ) : (
          /* ──  Comment Card ── */
          <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/90 p-5 md:p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/80 backdrop-blur-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-4 flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={image || "/default-avatar.png"}
                      alt={authorName}
                      width={44}
                      height={44}
                      className="rounded-full object-cover h-11 w-11 shrink-0 border-2 border-white dark:border-zinc-800 shadow-sm ring-2 ring-transparent group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900/50 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-zinc-900 dark:text-white text-[15px] leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {authorName}
                    </h4>
                    <p className="text-[11px] font-medium text-zinc-400/90 mt-0.5 uppercase tracking-wider">
                      {formatDate(createdAt, lang)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    onClick={() => handleCommentReply(id, authorName)}
                    className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/30"
                  >
                    <FaReply size={13} />
                    <span className="hidden sm:inline">
                      {t("comments.reply")}
                    </span>
                  </Button>

                  {userId === authorId && (
                    <Button
                      onClick={() => showDeleteModal()}
                      className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/60 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 h-7.5 w-7.5 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100 dark:hover:border-red-500/30"
                    >
                      <FaTrash size={12} />
                    </Button>
                  )}
                </div>
              </div>

              {/* Comment Text */}
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300 text-[15px] sm:pl-14">
                {commentText}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recursive Replies */}
      {replies && replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {replies.map((reply) => (
            <RecursiveComment
              handleCommentReply={handleCommentReply}
              handleDeleteComment={handleDeleteComment}
              key={reply.id}
              comment={reply}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursiveComment;
