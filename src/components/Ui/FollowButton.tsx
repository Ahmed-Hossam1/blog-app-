"use client";

import { useState } from "react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa6";
import Button from "./Button";

interface FollowButtonProps {
  authorId: string;
  initialIsFollowing?: boolean;
}

export default function FollowButton({
  authorId,
  initialIsFollowing = false,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async () => {
    setIsLoading(true);

    /// needs the followerId  and following Id
    
    // For now, simulating API delay:
    setTimeout(() => {
      setIsFollowing(!isFollowing);
      setIsLoading(false);
    }, 400);
  };

  return (
    <Button
      onClick={handleFollowToggle}
      isLoading={isLoading}
      className={`
        flex items-center gap-2 rounded-full px-5 py-2 font-medium transition-all duration-300 active:scale-95
        ${
          isFollowing
            ? "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            : "border-2 border-transparent bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
        }
      `}
    >
      {isFollowing ? (
        <>
          <FaUserCheck size={16} />
          Following
        </>
      ) : (
        <>
          <FaUserPlus size={16} />
          Follow
        </>
      )}
    </Button>
  );
}
