import SectionWrapper from "@/components/SectionWrapper";
import ExploreCard from "@/components/cards/ExploreCard";
import { getBlogs } from "@/services";
import Link from "next/link";

const BlogPage = async () => {
  const blogs = await getBlogs();

  return (
    <SectionWrapper>
      <div className="container mx-auto">
        {/* Header */}
        <div className=" mb-14 text-center">
          <h1 className="mb-3 text-4xl font-semibold text-black dark:text-white">
            Read, Learn &amp; Grow
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">
            From expert advice to behind-the-scenes stories – explore content
            designed for curious minds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <ExploreCard
                title={blog.title}
                image={blog.image}
                category={blog.category}
                meta={blog.meta}
                author={blog.author}
              />
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BlogPage;
