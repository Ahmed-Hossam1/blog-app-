"use client";
import { useSession } from "next-auth/react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface BookMarkButtonProps {
  bookmarkNumber: number;
  blogId: string;
  authorId: string;
  isBookmarked: boolean;
}
const BookMarkButton = ({
  bookmarkNumber,
  blogId,
  authorId,
  isBookmarked,
}: BookMarkButtonProps) => {
  const session = useSession();
  const router = useRouter();
  const { t } = useTranslation("bookmarks");
  const userId = session.data?.user?.id;
  const [isLoading, setIsLoading] = useState(false);
  async function addToBookmark() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blogs/bookmark`, {
        method: "POST",
        body: JSON.stringify({
          blogId,
          userId,
          // authorId is the id of the user who created the blog
          // and being sent for to backend for security reasons
          authorId
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      router.refresh();
      setIsLoading(false);
      toast.success(t(data.message));
    } catch (error) {
      console.log(error);
      toast.error(t((error as Error).message));
      setIsLoading(false);
    }

  }

  return (
    <Button
      onClick={addToBookmark}
      disabled={isLoading}
      className={` flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-black hover:text-indigo-700 dark:hover:text-indigo-300 hover:scale-105 transition-all shadow-md border border-gray-200 dark:border-white/10 `}
    >
      {isBookmarked ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}{" "}
      {bookmarkNumber}
    </Button>
  );
};

export default BookMarkButton;
