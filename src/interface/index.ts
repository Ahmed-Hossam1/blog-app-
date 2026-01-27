export interface INavLinks {
  id: number;
  name: string;
  to: string;
}

export interface IImages {
  id: number;
  path: string;
}
export interface IBlog {
id : number 
slug: string;
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
}[];
comments: {
  id: number;
  author: string;
  avatar: string;
  text: string;
}[];
}
