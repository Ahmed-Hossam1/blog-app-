"use client";
import { IBlog } from "@/types";
import React, { useState } from "react";
import Pagination from "./Pagination";
import Link from "next/link";
import ExploreCard from "../cards/ExploreCard";



const PaginatedBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 9;
  const totalPages = Math.ceil(blogs.length / limit);
  const firstIndex = (currentPage - 1) * limit;
  const lastIndex = firstIndex + limit;
  const slicedData = blogs.slice(firstIndex, lastIndex);

  if (slicedData.length === 0)
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          No Blogs Found
        </h2>
      </div>
    );
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {slicedData.map((blog) => (
          <Link href={`/blog/${blog.slug}`} key={blog.slug}>
            <ExploreCard {...blog} />
          </Link>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        scrollToTop
      />
    </>
  );
};

export default PaginatedBlogs;
