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

import { motion, Variants } from "framer-motion";

const MeetOurAuthors = ({
  authors,
  numberOfShownAuthors,
}: MeetOurAuthorsProps) => {
  const { t } = useTranslation("home");
  const slicedAuthors = authors.slice(0, numberOfShownAuthors);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-between"
        >
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
        </motion.div>

        {/* Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {slicedAuthors.map((author) => (
            <motion.div key={author.id} variants={itemVariants}>
              <AuthorCard {...author} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurAuthors;
