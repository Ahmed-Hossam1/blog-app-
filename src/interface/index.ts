export interface INavLinks {
  id: number;
  name: string;
  to: string;
}

export interface IBlog {
  id: string ;
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

export interface ITab {
  id: number;
  name: string;
}

export interface IAuthor {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface Filed {
  id: string | number;
  name: string;
  type: string;
  placeholder: string;
  label?: string;
}

export const formConfig: Record<string, Filed[]> = {
  signIn: [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "password",
    },
  ],

  signUp: [
    {
      id: 1,
      name: "user_name",
      placeholder: "user name",
      type: "text",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "password",
    },
    {
      id: 4,
      name: "confirm_password",
      type: "password",
      placeholder: "confirm password",
    },
  ],
};
