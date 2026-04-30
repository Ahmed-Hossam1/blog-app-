"use client";
import { IAuthor } from "@/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import AuthorCard from "../cards/AuthorCard";
import { HiOutlineUsers } from "react-icons/hi2";

interface MeetOurAuthorsProps {
  numberOfShownAuthors: number;
  authors: IAuthor[];
}

const MeetOurAuthors = ({
  authors,
  numberOfShownAuthors,
}: MeetOurAuthorsProps) => {
  const { t } = useTranslation("home");
  const slicedAuthors = authors.slice(0, numberOfShownAuthors);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HiOutlineUsers className="text-3xl text-primary" />
            <h2 className="text-3xl font-bold dark:text-white">
              {t("authors.title")}
            </h2>
          </div>
          <Link
            href="/authors"
            className="text-sm font-medium text-primary underline underline-offset-4 hover:text-blue-800 dark:text-gray-200 dark:hover:text-blue-400"
          >
            {t("authors.viewAll")}
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {slicedAuthors.map((author) => (
            <AuthorCard key={author.id} {...author} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurAuthors;
