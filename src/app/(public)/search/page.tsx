"use client";

import ExploreCard from "@/components/cards/ExploreCard";
import SectionWrapper from "@/components/SectionWrapper";
import Input from "@/components/ui/Input";
import { IBaseBlog } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  /* ==== State ==== */
  const [query, setQuery] = useState<string>("");
  const [blogs, setBlogs] = useState<IBaseBlog[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* ==== Effects ==== */
  useEffect(() => {
    if (!query) return setBlogs([]);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${query}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setBlogs(data.blogs);
      } catch (error) {
        console.error(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeout = setTimeout(() => fetchData(), 300);

    return () => clearTimeout(timeout);
  }, [query]);

  /* ==== Derived Data ==== */
  const sortedBlogs = [...blogs];
  switch (sortBy) {
    case "Most Views":
      sortedBlogs.sort((a, b) => b.views - a.views);
      break;
    case "Least Views":
      sortedBlogs.sort((a, b) => a.views - b.views);
      break;
    case "Newest":
      sortedBlogs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      break;
    case "Oldest":
      sortedBlogs.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
      break;
  }

  /* ==== Render Helpers ==== */
  const SkeletonLoader = () => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-surfaceDark animate-pulse"
        >
          <div className="h-40 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-4 w-1/3 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="mt-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );

  /* ==== JSX ==== */
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-transparent pt-32 pb-16 dark:from-primary/5">
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
                className="w-full pl-12 py-4 text-lg shadow-lg border-transparent focus:border-primary rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <SectionWrapper className="container mx-auto px-4">
        {query && (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
            <div>
              <h2 className="text-2xl font-bold text-baseInk dark:text-white">
                Search Results
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {isLoading ? "Searching..." : `Showing ${sortedBlogs.length} results`}
              </p>
            </div>

            {/* Enhanced Sort Dropdown */}
            <div>
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-surfaceDark dark:text-white dark:hover:border-primary cursor-pointer"
              >
                <option disabled value="">
                  Sort By...
                </option>
                <option value="Most Views">Most Views</option>
                <option value="Least Views">Least Views</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div>
        )}

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {sortedBlogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.slug}>
                <ExploreCard
                  title={blog.title}
                  image={blog.image}
                  category={blog.category}
                  views={blog.views}
                  readTime={blog.readTime}
                  createdAt={blog.createdAt}
                  author={blog.author}
                />
              </Link>
            ))}
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

export default SearchPage;
