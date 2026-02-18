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
  subtitle: string;
  slug: string;
  seoTitle: string;
  category: string;
  image: string;
  meta: {
    readTime: string;
    publishDate: string;
    views: number;
    commentsCount: number;
  };
  published: boolean;
  createdAt: Date;
  author: IAuthor;
}

export interface IAuthor {
  id?: string;
  name: string;
  image: string | null;
  title?: string | null;
  bio?: string | null;
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

export interface IContent {
  type: string;
  text: string;
  listItems: string[];
}

export interface IBlog extends IBaseBlog {
  replies?: IComment[];
  content: IContent[];
  comments: IComment[];
}

export interface IField<T> {
  id: number;
  name: T;
  type: string;
  placeholder: string;
  label?: string;
}

export type ContactFields = "name" | "email" | "message";
export type SignInFields = "email" | "password";
export type SignUpFields = "name" | "email" | "password";

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

export interface ISessionResponse {
  data: {
    user: {
      name: string;
      email: string;
      image: string | null;
    };
    expires: string;
  };
  status: "authenticated" | "unauthenticated" | "loading";
}

 