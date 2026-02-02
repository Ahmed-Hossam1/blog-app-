import { blogs } from "@/data/blogs";
import { IBlog } from "@/types";

export async function getBlogs(): Promise<IBlog[]> {
  return blogs;
}

export async function getBlogById(id: string): Promise<IBlog | undefined> {
  return blogs.find((blog) => blog.id === id);
}
