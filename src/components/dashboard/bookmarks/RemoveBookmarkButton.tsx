"use client";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface RemoveBookmarkButtonProps {
  blogId: string;
}

const RemoveBookmarkButton = ({ blogId }: RemoveBookmarkButtonProps) => {
  const session = useSession();
  const router = useRouter();
  const { t } = useTranslation("bookmarks");
  const id = session.data?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  async function removeBookmark() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blogs/bookmark`, {
        method: "POST",
        body: JSON.stringify({
          blogId,
          userId: id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      router.refresh();
      toast.success(t(data.message));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(t((error as Error).message));
      setIsLoading(false);
    }

  }

  return (
    <Button
      variant="outline"
      size="icon"
      rounded="full"
      onClick={removeBookmark}
      disabled={isLoading}
      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:scale-110 shadow-md backdrop-blur-sm"
    >
      <FaBookmark size={16} />
    </Button>
  );
};

export default RemoveBookmarkButton;
