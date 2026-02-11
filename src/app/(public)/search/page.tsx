"use client";

import ExploreCard from "@/components/cards/ExploreCard";
import SectionWrapper from "@/components/SectionWrapper";
import Input from "@/components/ui/Input";
import { IBaseBlog } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [blogs, setBlogs] = useState<IBaseBlog[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  useEffect(() => {
    if (!query) return setBlogs([]);
    // Fetch Data from API Based on query Every 300ms
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${query}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setBlogs(data.blogs);
      } catch (error) {
        console.error(error as Error);
      }
    };

    const interval = setTimeout(() => fetchData(), 300);

    return () => clearTimeout(interval);
  }, [query]);

  const sortedBlogs = [...blogs];
  switch (sortBy) {
    case "Most Views":
      sortedBlogs.sort((a, b) => b.meta.views - a.meta.views);
      break;

    case "Least Views":
      sortedBlogs.sort((a, b) => a.meta.views - b.meta.views);
      break;
    case "Newest":
      sortedBlogs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      break;
    case "Oldest":
      sortedBlogs.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
      break;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-linear-to-b from-primary/10 to-transparent pt-32 pb-16 dark:from-primary/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl filter" />
          <div className="absolute top-1/2 right-0 h-64 w-64 rounded-full bg-shineYellow/20 blur-3xl filter" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-baseInk dark:text-white md:text-6xl">
            Explore our <span className="text-primary">Knowledge Base</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover the latest trends in development, design, and technology.
            Find exactly what you are looking for.
          </p>

          <div className="mx-auto max-w-2xl relative">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-4 text-gray-400 z-10" />
              <Input
                id="search"
                name="search"
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
                className="w-full pl-12 py-4 text-lg shadow-lg border-transparent focus:border-primary rounded-xl  "
              />
            </div>
          </div>
        </div>
      </div>

      <SectionWrapper className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-baseInk dark:text-white">
              Search Results
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Showing {blogs.length} results
            </p>
          </div>

          {/* Sort Dropdown Placeholder */}
          <div className="hidden md:block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-700 dark:text-gray-300"
            >
              <option disabled value="">
                Sort By{" "}
              </option>
              <option value="Most Views">Most Views</option>
              <option value="Least views">Least views</option>
              <option value="Newest">Newest</option>
              <option value="oldest">oldest</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {sortedBlogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <ExploreCard key={blog.id} {...blog} />
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default SearchPage;
