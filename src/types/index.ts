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

export interface IBaseBlog {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  readTime: string;
  status: BlogStatus;
  views: number;
  createdAt: Date;
  author: IAuthor;
}

export interface IAuthor {
  id?: string;
  name: string;
  image: string | null;
  title?: string | null;
  bio?: string | null;
  blogs?: IBlog[];
}
export interface IComment {
  id: string;
  authorName: string;
  image: string;
  comment: string;
  createdAt: Date;
  parentId?: string | null;
  replies?: IComment[];
}

export interface IBlog extends IBaseBlog {
  replies?: IComment[];
  content: string;
  comments: IComment[];
}

export type SignInFields = "email" | "password";
export type SignUpFields = "name" | "email" | "password";
export type ContactFields = "name" | "email" | "message";
export type NewBlogFields =
  | "title"
  | "image"
  | "content"
  | "status"
  | "category";

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
  title: string;
  image: File;
  content: string;
  status: BlogStatus;
  category: string;
}
export interface ISessionResponse {
  data: {
    user: {
      name: string;
      email: string;
      image: string | null;
    };
    expires: string;
  };
  status: "authenticated" | "unauthenticated";
}

// State Card Type
export interface StatItem {
  key: "posts" | "views" | "comments" | "likes";
  title: string;
  icon: IconType;
  color: string;
}
