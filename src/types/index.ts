import { FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons";

export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface INavLinks {
  id: number;
  name: string;
  to: string;
}

export interface ITab {
  id: number;
  name: string;
}

export interface IBlog {
  id: string;
  authorId: string;
  title: string | null;
  slug: string | null;
  category: string | null;
  image: string | null;
  readTime: string | null;
  content: string | null;
  status: BlogStatus;
  views: number;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  createdAt: Date;
  author?: IAuthor;
  replies?: IComment[];
  likes?: ILike[];
  comments?: IComment[];
}

export interface IAuthor {
  id?: string;
  name: string;
  image: string | null;
  email?: string | null;
  title?: string | null;
  bio?: string | null;
  blogs?: IBlog[];
}

export interface Follower {
  id?: string;
  name: string;
  image: string | null;
}

export interface IComment {
  id: string;
  authorName: string;
  image: string;
  comment: string;
  createdAt: Date;
  parentId?: string | null;
  blogId: string;
  replies?: IComment[];
}

export interface ILike {
  id: string;
  userId: string;
  blogId: string;
  createdAt: Date;
}

export interface IField<T extends FieldValues> {
  id: string;
  name: Path<T>;
  type: string;
  placeholder: string;
  label?: string;
  options?: { name: string; value: string }[];
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}

export interface IContactForm {
  name: string;
  email: string;
  message: string;
}

export interface INewBlogForm {
  authorId?: string;
  title: string;
  slug?: string;
  image: string | FileList | File[];
  content: string;
  status?: BlogStatus;
  category: string;
}
export interface IProfileForm {
  name: string;
  title: string;
  bio: string;
}
export interface ISessionResponse {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
    expires: string;
  };
  status: "authenticated" | "unauthenticated";
}

// State Card Type
export type performanceItems = "blogs" | "views" | "comments" | "likes";
export type blogsState = "blogs" | BlogStatus;

export interface StatItem<T> {
  key: T;
  title: string;
  icon: IconType;
  color: string;
}

