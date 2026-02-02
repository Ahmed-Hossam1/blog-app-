import { blogs } from "@/data/blogs";
import { IBlog } from "@/types";

export async function getBlogs(): Promise<IBlog[]> {
    // Simulate async database call if needed, or just return data
    return blogs;
}

export async function getBlogById(id: string): Promise<IBlog | undefined> {
    return blogs.find((blog) => blog.id === id);
}
