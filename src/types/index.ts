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
  coverImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  meta: {
    readTime: string;
    publishDate: string;
    views: number;
    commentsCount: number;
  };
  content: {
    type: string;
    text: string;
    listItems?: string[];
  }[];
  author?: IAuthor;
  comments?: IComment[];
}

export interface IAuthor {
  id?: number;
  name: string;
  email: string;
  password: string;
  image?: string;
}

export interface IComment {
  id: number;
  author: string;
  avatar: string;
  comment: string;
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
