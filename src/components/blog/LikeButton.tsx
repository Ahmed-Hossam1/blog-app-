"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../ui/Button";

interface LikeButtonProps {
  likes: number;
  blogId: string;
  authorId: string;
  isLiked: boolean;
}
const LikeButton = ({ likes, blogId, isLiked , authorId }: LikeButtonProps) => {
  const session = useSession();
  const router = useRouter();
  const userId = session.data?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  async function addLike() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blogs/like`, {
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
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
      setIsLoading(false);
    }
  }

  return (
    <Button
       onClick={addLike}
       disabled={isLoading}
       className={` flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-red-500 dark:text-red-400 hover:bg-white dark:hover:bg-black hover:text-red-600 dark:hover:text-red-400 hover:scale-105 transition-all shadow-md border border-gray-200 dark:border-white/10 `}
    >
      {isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}{" "}
      {likes}
    </Button>
  );
};

export default LikeButton;
