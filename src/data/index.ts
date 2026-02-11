import { INavLinks, ITab, IAuthor } from "@/types";

export const navLinksData: INavLinks[] = [
  {
    id: 1,
    name: "Home",
    to: "/",
  },
  {
    id: 2,
    name: "Blogs",
    to: "/blog",
  },
  {
    id: 3,
    name: "Authors",
    to: "/authors",
  },
  {
    id: 4,
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
    name: "Development",
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

export const authorsData: IAuthor[] = [
  {
    id: "1",
    name: "Adham Nasser",
    image: "/assets/authors/adham.png",
    title: "Software Engineer",
    bio: "Adham is a passionate software engineer with a knack for building scalable web applications. He loves exploring new technologies and sharing his knowledge with the community.",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    image: "/assets/authors/sarah.png",
    title: "Content Writer",
    bio: "Sarah is a creative content writer who enjoys storytelling. She specializes in technology and lifestyle topics, bringing a unique perspective to her articles.",
  },
  {
    id: "3",
    name: "Michael Brown",
    image: "/assets/authors/michael.png",
    title: "Data Scientist",
    bio: "Michael is a data scientist with a background in mathematics. He loves analyzing data to find trends and insights that can help businesses grow.",
  },
  {
    id: "4",
    name: "Emily Davis",
    image: "/assets/authors/emily.png",
    title: "UX Designer",
    bio: "Emily is a UX designer who is passionate about creating user-friendly interfaces. She believes that good design can solve complex problems and improve people's lives.",
  },
];
