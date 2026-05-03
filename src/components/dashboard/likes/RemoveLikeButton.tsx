"use client";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface RemoveLikeButtonProps {
  blogId: string;
}

const RemoveLikeButton = ({ blogId }: RemoveLikeButtonProps) => {
  const session = useSession();
  const router = useRouter();
  const { t } = useTranslation("likes");
  const id = session.data?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  async function removeLike() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blogs/like`, {
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
      onClick={removeLike}
      disabled={isLoading}
      className={`p-2 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-red-600 dark:text-red-400 hover:bg-white dark:hover:bg-black hover:text-red-700 dark:hover:text-red-300 hover:scale-110 shadow-lg border border-white/20 dark:border-white/10 `}
    >
      <FaHeart size={16} />
    </Button>
  );
};

export default RemoveLikeButton;
