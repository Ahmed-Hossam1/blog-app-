"use client";
import { IComment } from "@/types";
import Image from "next/image";
import { FaReply } from "react-icons/fa6";
import Button from "./Button";
import { formatDate } from "@/utils";

interface ICommentProps {
  handleCommentReply: (
    parentCommentId: string,
    ReplyToAuthorName: string,
  ) => void;
  comment: IComment;
  level?: number;
}

const RecursiveComment = ({
  comment,
  level = 0,
  handleCommentReply,
}: ICommentProps) => {
  const {
    id,
    authorName,
    image,
    comment: commentText,
    createdAt,
    replies,
  } = comment;

  return (
    <div
      className={`flex flex-col relative ${level > 0 ? "ml-4 md:ml-8" : ""}`}
    >
      {/* Enhanced Vertical Thread Line */}
      {level > 0 && (
        <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-indigo-300 to-indigo-100 dark:from-indigo-700 dark:to-indigo-900" />
      )}

      <div className="relative z-10">
        <div className="group rounded-2xl bg-white dark:bg-zinc-900 p-5 md:p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-all duration-300">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={image}
                alt={authorName}
                width={40}
                height={40}
                className="rounded-full object-cover h-10 w-10 flex-shrink-0 border-2 border-white dark:border-zinc-700 shadow-sm"
              />
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white leading-tight">
                  {authorName}
                </h4>
                <p className="text-[11px] font-medium text-zinc-400">
                  {formatDate(createdAt)}
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => handleCommentReply(id, authorName)}
              className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <FaReply size={14} />
              <span className="hidden sm:inline font-semibold">Reply</span>
            </Button>
          </div>

          {/* Comment Text */}
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-[15px]">
            {commentText}
          </p>
        </div>
      </div>

      {/* Recursive Replies */}
      {replies && replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {replies.map((reply) => (
            <RecursiveComment
              handleCommentReply={handleCommentReply}
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
