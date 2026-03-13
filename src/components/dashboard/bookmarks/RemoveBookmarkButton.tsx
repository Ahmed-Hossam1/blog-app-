"use client";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

interface RemoveBookmarkButtonProps {
  blogId: string;
}

const RemoveBookmarkButton = ({ blogId }: RemoveBookmarkButtonProps) => {
  const session = useSession();
  const router = useRouter();
  const id = session.data?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  async function removeBookmark() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/bookmark`, {
        method: "POST",
        body: JSON.stringify({
          blogId,
          userId: id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      router.refresh();
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={removeBookmark}
      disabled={isLoading}
      className={`p-2 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-black hover:text-indigo-700 dark:hover:text-indigo-300 hover:scale-110 shadow-lg border border-white/20 dark:border-white/10 `}
    >
      <FaBookmark size={16} />
    </Button>
  );
};

export default RemoveBookmarkButton;
