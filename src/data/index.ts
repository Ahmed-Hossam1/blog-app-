import { IBlog, INavLinks, ITab } from "@/interface";

export const navLinksData: INavLinks[] = [
  {
    id: 2,
    name: "Blogs",
    to: "/blogs",
  },
  {
    id: 3,
    name: "Contact",
    to: "/contact",
  },
];

export const blogsData: IBlog[] = [
  {
    id: 1,
    slug: "understanding-react-server-components",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",

    title: "Understanding React Server Components",
    subtitle: "Understanding React Server Components",
    category: "Technology",

    meta: {
      readTime: "2 min read",
      publishDate: "Jun 10, 2025",
      views: 213,
      commentsCount: 3,
    },

    author: {
      name: "Manpreet Singh Minhas",
      avatar: "avatar1.jpg",
    },
    coverImage: "image1.jpg",
    content: [
      {
        type: "paragraph",
        text: "This improves performance and user experience, especially on content-heavy websites such as blogs and news platforms.",
      },
      {
        type: "heading",
        text: "Benefits of Server Components",
      },
      {
        type: "list",
        text: "",
        items: [
          "Less JavaScript sent to the client",
          "Faster initial page loads",
          "Improved SEO",
          "Easier data fetching patterns",
        ],
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "React Server Components are still evolving, but they show great promise for the future of web development. If you're using Next.js 13+ with the App Router, you're already set up to experiment with them.",
      },
      {
        type: "heading",
        text: "How to Use",
      },
      {
        type: "list",
        text: "",
        items: [
          "Open the Body field in your blog post in Sanity Studio",
          "Paste the above content",
          "Use the formatting toolbar inside the editor to style text (H2, H3, bullet points)",
        ],
      },
    ],

    comments: [
      {
        id: 1,
        author: "Sophie Hamilton",
        avatar: "commenter-img",
        comment:
          "This blog was incredibly insightful! I’ve always wanted to explore Thailand beyond the typical tourist spots. Thanks for the travel tips!",
      },
      {
        id: 2,
        author: "Don Turner",
        avatar: "commenter-img",
        comment:
          "I loved reading about the hidden gems in Thailand. The writing style is engaging, and the photos really brought the places to life.",
      },
      {
        id: 3,
        author: "Rodney Russell",
        avatar: "commenter-img",
        comment:
          "Great article. I’ve visited Thailand twice, and this gave me new ideas for my next trip.",
      },
      {
        id: 4,
        author: "Lelia Mason",
        avatar: "commenter-img",
        comment:
          "This was such a refreshing read. It’s nice to see a blog that focuses on more than just the popular beaches.",
      },
    ],
  },

  {
    id: 2,
    slug: "technical-blogging-react-server-components",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",
    title: "Technical blogging - A skill with many benefits",
    subtitle: "Understanding React Server Components",
    category: "Technology",
    meta: {
      readTime: "2 min read",
      publishDate: "Jun 10, 2025",
      views: 213,
      commentsCount: 3,
    },
    author: { name: "Manpreet Singh Minhas", avatar: "avatar2.jpg" },
    coverImage: "image2.jpg",
    content: [
      {
        type: "paragraph",
        text: "React Server Components (RSC) are a powerful new addition to the React ecosystem.",
      },
      {
        type: "paragraph",
        text: "They allow you to render components on the server without sending unnecessary JavaScript to the browser.",
      },
      { type: "heading", text: "Benefits of Server Components" },
      {
        type: "list",
        text: "",
        items: [
          "Less JavaScript sent to the client",
          "Faster initial page loads",
          "Improved SEO",
          "Easier data fetching patterns",
        ],
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "React Server Components are still evolving, but they show great promise for the future of web development.",
      },
      {
        type: "quote",
        text: "Technical blogging helps developers solidify their understanding and share knowledge.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Sophie Hamilton",
        avatar: "commenter-img",
        comment: "Very insightful article!",
      },
      {
        id: 2,
        author: "Don Turner",
        avatar: "commenter-img",
        comment: "Clear and easy to understand.",
      },
      {
        id: 3,
        author: "Rodney Russell",
        avatar: "commenter-img",
        comment: "Helped me a lot, thanks!",
      },
      {
        id: 4,
        author: "Lelia Mason",
        avatar: "commenter-img",
        comment: "Great read.",
      },
    ],
  },

  {
    id: 3,
    slug: "top-health-wellness-blogs-2022",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",
    title: "The Top 25 Health & Wellness Blogs You Should Follow in 2022",
    subtitle: "Understanding React Server Components",
    category: "Health",
    meta: {
      readTime: "2 min read",
      publishDate: "Jun 10, 2025",
      views: 213,
      commentsCount: 3,
    },
    author: { name: "Sanjida windx", avatar: "avatar1.jpg" },
    coverImage: "image3.jpg",
    content: [
      {
        type: "paragraph",
        text: "Health & wellness blogs inspire people to live better lives.",
      },
      {
        type: "quote",
        text: "Health blogging empowers people to make informed lifestyle choices.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Sophie Hamilton",
        avatar: "commenter-img",
        comment: "Very motivating!",
      },
    ],
  },

  {
    id: 4,
    slug: "best-travel-blogs-2020-whiskey-and-words",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",
    title: "The Best Travel Blogs of 2020 Of Whiskey and Words",
    subtitle: "Understanding React Server Components",
    category: "Culture",
    meta: {
      readTime: "2 min read",
      publishDate: "Jun 09, 2025",
      views: 213,
      commentsCount: 3,
    },
    author: { name: "Manpreet Singh Minhas", avatar: "avatar2.jpg" },
    coverImage: "image4.jpg",
    content: [
      {
        type: "paragraph",
        text: "Travel blogging combines storytelling with culture.",
      },
      {
        type: "quote",
        text: "Travel blogging blends culture, storytelling, and personal perspective.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Rodney Russell",
        avatar: "commenter-img",
        comment: "Loved this article!",
      },
    ],
  },

  {
    id: 5,
    slug: "i-wish-i-knew-this-before-creating-a-travel-blog",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",
    title: "I wish i knew this before creating a travel blog on my own",
    subtitle: "Understanding React Server Components",
    category: "Knowledge",
    meta: {
      readTime: "2 min read",
      publishDate: "Jun 09, 2025",
      views: 213,
      commentsCount: 3,
    },
    author: { name: "Sanjida windx", avatar: "avatar1.jpg" },
    coverImage: "image5.jpg",
    content: [
      {
        type: "paragraph",
        text: "Starting a blog without guidance can cost you time and energy.",
      },
      {
        type: "quote",
        text: "Knowing these lessons early can save months of effort.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Don Turner",
        avatar: "commenter-img",
        comment: "Wish I read this earlier!",
      },
    ],
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

/* 

  {
    id: 6,
    slug: "how-to-start-a-travel-blog-step-by-step",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",
    title: "How To Start A Travel Blog - An Easy Step By Step Guide",
    subtitle: "Understanding React Server Components",
    category: "Travel",
    meta: {
      readTime: "2 min read",
      publishDate: "Jun 09, 2025",
      views: 213,
      commentsCount: 3,
    },
    author: { name: "Sanjida windx", avatar: "author-image" },
    coverImage: "cover-image",
    content: [
      {
        type: "paragraph",
        text: "Starting a travel blog becomes easier with a roadmap.",
      },
      {
        type: "quote",
        text: "A clear plan is the key to a successful travel blog.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Sophie Hamilton",
        avatar: "commenter-img",
        comment: "Very helpful guide!",
      },
    ],
  },

  {
    id: 7,
    slug: "a-classic-cup-of-joe-or-a-wild-cup-of-blow",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",
    title:
      "A Classic Cup of Joe or a Wild Cup of Blow — What’s Your Brew Today?",
    subtitle: "Understanding React Server Components",
    category: "Lifestyle",
    meta: {
      readTime: "2 min read",
      publishDate: "Jun 09, 2025",
      views: 213,
      commentsCount: 3,
    },
    author: { name: "Alice Ben", avatar: "author-image" },
    coverImage: "cover-image",
    content: [
      {
        type: "paragraph",
        text: "Lifestyle blogging reflects personal habits and routines.",
      },
      {
        type: "quote",
        text: "Lifestyle blogging is about the rituals that shape everyday life.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Lelia Mason",
        avatar: "commenter-img",
        comment: "Loved the vibe of this post.",
      },
    ],
  },

  {
    id: 8,
    slug: "chatgpt-is-poisoning-your-brain",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",
    title: "ChatGPT Is Poisoning Your Brain And You Don’t Even Realize It Yet.",
    subtitle: "Understanding React Server Components",
    category: "Technology",
    meta: {
      readTime: "2 min read",
      publishDate: "Jun 09, 2025",
      views: 213,
      commentsCount: 3,
    },
    author: { name: "Alice Ben", avatar: "author-image" },
    coverImage: "cover-image",
    content: [
      {
        type: "paragraph",
        text: "AI tools should enhance thinking, not replace it.",
      },
      {
        type: "quote",
        text: "Technology should enhance thinking — not replace it.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Rodney Russell",
        avatar: "commenter-img",
        comment: "Thought-provoking article.",
      },
    ],
  },

  {
    id: 9,
    slug: "beyond-the-beaches-unveiling-thailands-quiet-retreats",
    pageTitle: "Blog Detail | BlogForge Sanity Blog Template",
    title:
      "Beyond the Beaches - Unveiling Thailand’s Quiet Retreats and Travel Tips",
    subtitle: "Understanding React Server Components",
    category: "Travel",
    meta: {
      readTime: "2 min read",
      publishDate: "Jun 09, 2025",
      views: 213,
      commentsCount: 3,
    },
    author: { name: "Alice Ben", avatar: "author-image" },
    coverImage: "cover-image",
    content: [
      {
        type: "paragraph",
        text: "Thailand offers peaceful retreats beyond crowded beaches.",
      },
      {
        type: "quote",
        text: "Travel is best when you discover quieter stories.",
      },
    ],
    comments: [
      {
        id: 1,
        author: "Sophie Hamilton",
        avatar: "commenter-img",
        comment: "Now I want to visit Thailand!",
      },
    ],
  },
  */
