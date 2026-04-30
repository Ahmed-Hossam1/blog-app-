"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineDocumentText, HiOutlineBookmark, HiOutlineClock, HiOutlineBookOpen } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import SectionWrapper from "../shared/SectionWrapper";
import { IBlog } from "@/types";

interface ContinueReadingData {
  draft: IBlog | null;
  lastRead: IBlog | null;
  saved: IBlog | null;
}

import { motion } from "framer-motion";

const ContinueReading = () => {
  const { t } = useTranslation("home");
  const { data: session, status } = useSession();
  const [data, setData] = useState<ContinueReadingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      async function fetchData() {
        try {
          const res = await fetch("/api/user/continue-reading");
          if (res.ok) {
            const json = await res.json();
            setData(json);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  if (status === "unauthenticated" || status === "loading") return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const cards = [
    {
      title: t("continue.draft") || "Draft Blog",
      blog: data?.draft,
      icon: <HiOutlineDocumentText className="text-blue-500" />,
      link: `/dashboard/editor?id=${data?.draft?.id}`,
      show: !!data?.draft,
    },
    {
      title: t("continue.lastRead") || "Last Read",
      blog: data?.lastRead,
      icon: <HiOutlineClock className="text-orange-500" />,
      link: `/blog/${data?.lastRead?.slug}`,
      show: !!data?.lastRead,
    },
    {
      title: t("continue.saved") || "Saved Blog",
      blog: data?.saved,
      icon: <HiOutlineBookmark className="text-purple-500" />,
      link: `/blog/${data?.saved?.slug}`,
      show: !!data?.saved,
    },
  ];

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <HiOutlineBookOpen className="text-3xl text-primary" />
          <h2 className="text-3xl font-bold dark:text-white">
            {t("continue.title") || "Continue Reading"}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.filter(c => c.show).map((card, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link 
                href={card.link}
                className="group relative flex flex-col p-6 bg-white dark:bg-surface border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-primary transition-colors">
                    {card.title}
                  </span>
                  <div className="text-2xl opacity-80 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2 mb-4 group-hover:text-primary transition-colors">
                  {card.blog?.title}
                </h3>

                <div className="mt-auto flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                    <Image 
                      src={card.blog?.author?.image || "/default-user.png"} 
                      alt="author"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {card.blog?.author?.name}
                  </span>
                </div>

                {/* Hover effect background */}
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gray-50 dark:bg-gray-800/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
          ))}
          
          {cards.filter(c => c.show).length === 0 && (
            <motion.div 
              variants={itemVariants}
              className="col-span-full py-12 text-center bg-gray-50 dark:bg-surface-secondary/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800"
            >
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {t("continue.noActivity") || "No recent drafts or saved blogs found. Start exploring to see them here!"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default ContinueReading;
