"use client";
import { useSession } from "next-auth/react";
import { BsHeart } from "react-icons/bs";
import { toast } from "react-toastify";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  likes: number;
  blogId: string;
}
const LikeButton = ({ likes, blogId }: LikeButtonProps) => {
  const session = useSession();
  const router = useRouter();
  const id = session.data?.user?.id;

  async function addLike() {
    try {
      const res = await fetch(`/api/likes/toggle`, {
        method: "POST",
        body: JSON.stringify({
          blogId,
          userId: id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      router.refresh()
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }


  return (
    <Button onClick={addLike} className="flex items-center gap-2">
      <BsHeart />
      {likes}
    </Button>
  );
};

export default LikeButton;

// add like
// remove like
// check if user has liked the blog then remove else add
