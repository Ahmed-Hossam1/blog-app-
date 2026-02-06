export interface INavLinks {
  id: number;
  name: string;
  to: string;
}

export interface IBlog {
  id: string;
  slug: string;
  pageTitle: string;
  title: string;
  subtitle: string;
  category: string;
  meta: {
    readTime: string;
    publishDate: string;
    views: number;
    commentsCount: number;
  };
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  content: {
    type: string;
    text: string;
    items?: string[];
  }[];
  comments: {
    id: number;
    author: string;
    avatar: string;
    comment: string;
  }[];
}

export interface IAuthor {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface ITab {
  id: number;
  name: string;
}

export interface IField {
  id: number;
  name: "user_name" | "email" | "password" | "confirm_password";
  type: string;
  placeholder: string;
  label?: string;
}

export interface ISignInErrors {
  email: string;
  password: string;
}

export interface ISignUpErrors {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
