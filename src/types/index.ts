export interface INavLinks {
  id: number;
  name: string;
  to: string;
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
  author: IAuthor;
}

export interface IAuthor {
  name: string;
  image: string | null;
}
export interface IComment {
  id: string;
  authorName: string;
  image: string;
  comment: string;
  createdAt: Date;
}

export interface ITab {
  id: number;
  name: string;
}

export interface IField {
  id: number;
  name: "name" | "email" | "password";
  type: string;
  placeholder: string;
  label?: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface IContent {
  type: string;
  text: string;
  listItems: string[];
}

export interface IBlog extends IBaseBlog {
  content: IContent[];
  comments: IComment[];
}

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
}
