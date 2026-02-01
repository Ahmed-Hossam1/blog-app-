import { blogs } from "@/data/blogs";
import { IBlog } from "@/interface";

export function truncateText(text: string) {
  return text.length > 40 ? text.slice(0, 40) + "..." : text;
}

export async function getProduct(id: string) {
  return blogs.find((blog: IBlog) => blog.id === id);
}
