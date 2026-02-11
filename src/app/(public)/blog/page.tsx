"use client";
import PageLoader from "@/components/PageLoader";
import Pagination from "@/components/Pagination";
import SectionWrapper from "@/components/SectionWrapper";
import ExploreCard from "@/components/cards/ExploreCard";
import { IBlog } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  /*===== STATE ===== */
  const [data, setData] = useState<IBlog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  /*===== FETCH ===== */
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`,
        );
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("error:", error);
      }
    }
    fetchBlogs();
  }, []);

  const ITEM_PER_PAGE = 20;
  const totalPages = Math.ceil(data.length / ITEM_PER_PAGE);
  const firstIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const lastIndex = firstIndex + ITEM_PER_PAGE;
  const currentData = data.slice(firstIndex, lastIndex);

  /*===== RENDER ===== */
  const renderCards = currentData?.map((blog: IBlog) => (
    <Link href={`/blog/${blog.slug}`} key={blog.slug}>
      <ExploreCard
        title={blog.title}
        image={blog.image}
        category={blog.category}
        meta={blog.meta}
        author={blog.author}
      />
    </Link>
  ));

  /*===== UI ===== */
  if (data.length === 0) return <PageLoader />;
  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Header */}
        <div className=" mb-14 text-center">
          <h1 className="mb-3 text-4xl font-semibold text-black dark:text-white">
            Read, Learn & Grow
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">
            From expert advice to behind-the-scenes stories – explore content
            designed for curious minds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {renderCards}
        </div>

        {data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </SectionWrapper>
  );
};
export default Page;
