"use client";

import { useState } from "react";
import Image from "next/image";
import MyModal from "./ui/MyModal";
import Link from "next/link";

interface Follower {
  id : string
  name: string;
  image: string | null;
}

interface FollowersAvatarGroupProps {
  followers: Follower[];
  total?: number;
}

export default function FollowersAvatarGroup({
  followers,
  total,
}: FollowersAvatarGroupProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalCount = total ?? followers?.length ?? 0;

  if (totalCount === 0 || !followers) {
    return (
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        0 Followers
      </div>
    );
  }

  const displayCount = 5;
  const displayFollowers = followers.slice(0, displayCount);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group/btn flex items-center justify-center md:justify-start gap-3 rounded-full hover:bg-gray-50 p-2 -ml-2 transition-colors dark:hover:bg-gray-800/50"
      >
        <div className="flex -space-x-3 rtl:space-x-reverse">
          {displayFollowers.map((follower, index) => (
            <div
              key={index}
              className="group relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-[#0f1014] transition-all duration-300 group-hover/btn:-translate-y-1 group-hover/btn:shadow-md bg-gray-100 dark:bg-gray-800"
              title={follower.name}
              style={{ zIndex: displayFollowers.length - index }}
            >
              <Image
                src={follower.image || "/default-image.png"}
                alt={follower.name}
                width={40}
                height={40}
                className="h-full w-full object-cover transition-transform duration-300"
              />
            </div>
          ))}
          {totalCount > displayCount && (
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-50 text-xs font-semibold text-gray-600 dark:border-[#0f1014] dark:bg-gray-800 dark:text-gray-300 z-0 transition-all duration-300 group-hover/btn:-translate-y-1 shadow-sm group-hover/btn:shadow-md">
              +{totalCount - displayCount}
            </div>
          )}
        </div>
        <div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors">
            <strong className="text-black dark:text-white text-base group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 transition-colors">
              {totalCount}
            </strong>{" "}
            {totalCount === 1 ? "Follower" : "Followers"}
          </span>
        </div>
      </button>

      {/* Followers Modal */}
      <MyModal
        title="Followers"
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
      >
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {followers.map((follower, index) => (
            <Link
              href={`/authors/${follower.id}`}
              key={index}
              className="flex items-center gap-4 rounded-xl p-3 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-transparent group-hover:border-blue-500 transition-colors shrink-0 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={follower.image || "/default-image.png"}
                  alt={follower.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="font-semibold text-gray-900 dark:text-white truncate">
                {follower.name}
              </div>
            </Link>
          ))}
        </div>
      </MyModal>
    </>
  );
}
