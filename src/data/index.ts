import { IAuthor, INavLinks, ITab } from "@/interface";

export const navLinksData: INavLinks[] = [
  {
    id: 2,
    name: "Blogs",
    to: "/blog",
  },
  {
    id: 3,
    name: "Contact",
    to: "/contact",
  },
];

export const tabsData: ITab[] = [
  {
    id: 1,
    name: "All",
  },

  {
    id: 2,
    name: "Technology",
  },
  {
    id: 3,
    name: "Health",
  },
  {
    id: 4,
    name: "Culture",
  },
  {
    id: 5,
    name: "Knowledge",
  },
  {
    id: 6,
    name: "Travel",
  },
  {
    id: 7,
    name: "Lifestyle",
  },
];

export const authorData: IAuthor[] = [
  {
    id: 1,
    name: "Manpreet Singh Minhas",
    role: "Staff Writer",
    bio: "DL/CV Research Engineer sharing insights on technical blogging.",
    avatar: "/avatar1.jpg",
  },
  {
    id: 2,
    name: "Sanjida windx",
    role: "Guest Author",
    bio: "Health writer focusing on wellness and lifestyle improvements.",
    avatar: "/avatar2.jpg",
  },
  {
    id: 3,
    name: "Alice Ben",
    role: "Co-Author",
    bio: "Travel enthusiast sharing tips and stories about various tourist destinations.",
    avatar: "/avatar3.jpg",
  },
];
