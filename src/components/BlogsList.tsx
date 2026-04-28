import { getBlogs } from "@/services";
import ExploreCard from "./cards/ExploreCard";
import Link from "next/link";

const BlogsList = async () => {
  const blogs = await getBlogs();
  return (
    <>
      {blogs.map((blog) => (
        <Link href={`/blog/${blog.slug}`} key={blog.slug}>
          <ExploreCard key={blog.id} {...blog} />
        </Link>
      ))}
    </>
  );
};

export default BlogsList;
