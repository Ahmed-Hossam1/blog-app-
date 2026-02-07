"use client";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import SectionWrapper from "@/components/SectionWrapper";
import { IBlog } from "@/types";
import Link from "next/link";
import { lazy, Suspense, useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import PageLoader from "@/components/PageLoader";

const ExploreCard = lazy(() => import("@/components/cards/ExploreCard"));
const Page = () => {
  /*===== STATE ===== */
  const [data, setData] = useState<IBlog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  /*===== FETCH ===== */
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("http://localhost:3000/api/blogs");
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
      <ExploreCard blog={blog} />
    </Link>
  ));

  /*===== UI ===== */
  if (data.length === 0) return <PageLoader />;
  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Header */}
        <div className=" mb-14 text-center">
          <h1 className="mb-3 text-4xl font-semibold text-black">
            Read, Learn & Grow
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500">
            From expert advice to behind-the-scenes stories – explore content
            designed for curious minds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<CardSkeleton numberOfSkeleton={9} />}>
            {renderCards}
          </Suspense>
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
