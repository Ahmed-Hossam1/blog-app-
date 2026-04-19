"use client";

import { useState } from "react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";

interface FollowButtonProps {
  followingId: string;
  isFollowing?: boolean;
}

export default function FollowButton({ followingId , isFollowing }: FollowButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const { t } = useTranslation("authors");
  const followerId = session.data?.user.id;

  const handleFollowToggle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/user/follow`, {
        method: "POST",
        body: JSON.stringify({
          followerId,
          followingId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleFollowToggle}
      isLoading={isLoading}
      loadingText={isFollowing ? t("profile.unfollowing_text") : t("profile.following_text")}
      className={`
        flex items-center gap-2 rounded-full px-5 py-2 font-medium transition-all duration-300 active:scale-95
        ${
          isLoading
            ? "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            : "border-2 border-transparent bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
        }
      `}
    >
      {isFollowing ? (
        <>
          <FaUserCheck size={16} />
          {t("profile.following")}
        </>
      ) : (
        <>
          <FaUserPlus size={16} />
          {t("profile.follow")}
        </>
      )}
    </Button>
  );
}
