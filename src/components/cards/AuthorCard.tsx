"use client";
import { IAuthor } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const AuthorCard = ({ id, name, image, title, bio }: IAuthor) => {
  const { t } = useTranslation("authors");
  return (
    <Link
      href={`/authors/${id}`}
      className="rounded-2xl group bg-white px-6 py-10 text-center  shadow-sm duration-500 hover:scale-105 hover:shadow-lg hover:transition dark:bg-surfaceDark"
    >
      {/* Avatar */}
      <div className="mx-auto mb-5 relative h-24 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <Image
          src={image || "/default-image.png"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Name */}
      <h2 className="mb-2 block text-xl group-hover:text-primary font-semibold  dark:text-white">
        {name}
      </h2>

      {/* Designation */}
      <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        {title || t("listing.contributor")}
      </p>

      {/* Bio Preview */}
      <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
        {bio || t("profile.noBio")}
      </p>
    </Link>
  );
};

export default AuthorCard;
