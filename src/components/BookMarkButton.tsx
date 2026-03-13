"use client";
import { useSession } from "next-auth/react";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface BookMarkButtonProps {
  bookmarkNumber: number;
  blogId: string;
  isBookmarked: boolean;
}
const BookMarkButton = ({
  bookmarkNumber,
  blogId,
  isBookmarked,
}: BookMarkButtonProps) => {
  const session = useSession();
  const router = useRouter();
  const id = session.data?.user?.id;

  async function addToBookmark() {
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
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }

  return (
    <Button onClick={addToBookmark} className="flex items-center gap-2">
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />} {bookmarkNumber}
    </Button>
  );
};

export default BookMarkButton;
