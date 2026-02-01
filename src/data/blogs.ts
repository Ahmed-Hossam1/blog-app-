import { IBlog } from "@/interface";

export const blogs: IBlog[] = [
    {
        id: "1",
        slug: "understanding-react-server-components",
        pageTitle: "Blog Detail | BlogForge Sanity Blog Template",

        title: "Top Articles to Read on Technology",
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
                avatar: "avatar1.jpg",
                comment:
                    "This blog was incredibly insightful! I’ve always wanted to explore Thailand beyond the typical tourist spots. Thanks for the travel tips!",
            },
            {
                id: 2,
                author: "Don Turner",
                avatar: "avatar2.jpg",
                comment:
                    "I loved reading about the hidden gems in Thailand. The writing style is engaging, and the photos really brought the places to life.",
            },
            {
                id: 3,
                author: "Rodney Russell",
                avatar: "avatar1.jpg",
                comment:
                    "Great article. I’ve visited Thailand twice, and this gave me new ideas for my next trip.",
            },
            {
                id: 4,
                author: "Lelia Mason",
                avatar: "avatar1.jpg",
                comment:
                    "This was such a refreshing read. It’s nice to see a blog that focuses on more than just the popular beaches.",
            },
        ],
    },

    {
        id: "2",
        slug: "technical-blogging-benefits",
        pageTitle: "Blog Detail | BlogForge Sanity Blog Template",

        title: "Technical Blogging: Why Every Developer Should Start",
        subtitle: "The Power of Writing Code Stories",
        category: "Technology",

        meta: {
            readTime: "3 min read",
            publishDate: "Jun 12, 2025",
            views: 412,
            commentsCount: 2,
        },

        author: {
            name: "Manpreet Singh Minhas",
            avatar: "avatar1.jpg",
        },

        coverImage: "image2.jpg",

        content: [
            {
                type: "paragraph",
                text: "Technical blogging helps developers clarify their thoughts and document their learning journey.",
            },
            {
                type: "heading",
                text: "Why Technical Blogging Matters",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Improves communication skills",
                    "Builds personal brand",
                    "Helps others learn faster",
                ],
            },
            {
                type: "heading",
                text: "Final Thoughts",
            },
            {
                type: "paragraph",
                text: "Writing regularly about technical topics can dramatically improve your understanding and confidence.",
            },
        ],

        comments: [
            {
                id: 1,
                author: "Don Turner",
                avatar: "avatar2.jpg",
                comment: "Very motivating article!",
            },
            {
                id: 2,
                author: "Lelia Mason",
                avatar: "avatar1.jpg",
                comment: "This inspired me to start my own blog.",
            },
        ],
    },

    {
        id: "3",
        slug: "react-server-components-overview",
        pageTitle: "Blog Detail | BlogForge Sanity Blog Template",

        title: "A Beginner’s Guide to React Server Components",
        subtitle: "Modern Rendering in React",
        category: "Technology",

        meta: {
            readTime: "4 min read",
            publishDate: "Jun 14, 2025",
            views: 628,
            commentsCount: 3,
        },

        author: {
            name: "Sanjida windx",
            avatar: "avatar2.jpg",
        },

        coverImage: "image3.jpg",

        content: [
            {
                type: "paragraph",
                text: "React Server Components allow developers to offload heavy rendering work to the server.",
            },
            {
                type: "heading",
                text: "Key Advantages",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Better performance",
                    "Smaller client bundles",
                    "Improved SEO",
                ],
            },
            {
                type: "paragraph",
                text: "This approach is especially powerful when combined with frameworks like Next.js.",
            },
        ],

        comments: [
            {
                id: 1,
                author: "Sophie Hamilton",
                avatar: "avatar1.jpg",
                comment: "Clear explanation, thanks!",
            },
            {
                id: 2,
                author: "Rodney Russell",
                avatar: "avatar1.jpg",
                comment: "This finally made RSC click for me.",
            },
            {
                id: 3,
                author: "Don Turner",
                avatar: "avatar2.jpg",
                comment: "Great overview.",
            },
        ],
    },

    {
        id: "4",
        slug: "building-scalable-frontend-apps",
        pageTitle: "Blog Detail | BlogForge Sanity Blog Template",

        title: "Building Scalable Frontend Applications",
        subtitle: "Lessons from Real Projects",
        category: "Development",

        meta: {
            readTime: "5 min read",
            publishDate: "Jun 16, 2025",
            views: 784,
            commentsCount: 2,
        },

        author: {
            name: "Manpreet Singh Minhas",
            avatar: "avatar1.jpg",
        },

        coverImage: "image4.jpg",

        content: [
            {
                type: "paragraph",
                text: "Scalability in frontend apps is about structure, performance, and maintainability.",
            },
            {
                type: "heading",
                text: "Core Principles",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Component reusability",
                    "Clear data flow",
                    "Performance optimization",
                ],
            },
            {
                type: "paragraph",
                text: "Choosing the right architecture early can save months of refactoring later.",
            },
        ],

        comments: [
            {
                id: 1,
                author: "Lelia Mason",
                avatar: "avatar1.jpg",
                comment: "Very practical advice!",
            },
            {
                id: 2,
                author: "Sophie Hamilton",
                avatar: "avatar1.jpg",
                comment: "Loved the real-world focus.",
            },
        ],
    },

    {
        id: "5",
        slug: "how-writing-improves-programming-skills",
        pageTitle: "Blog Detail | BlogForge Sanity Blog Template",

        title: "How Writing Improves Your Programming Skills",
        subtitle: "Think Better by Writing Code Stories",
        category: "Knowledge",

        meta: {
            readTime: "3 min read",
            publishDate: "Jun 18, 2025",
            views: 531,
            commentsCount: 1,
        },

        author: {
            name: "Sanjida windx",
            avatar: "avatar2.jpg",
        },

        coverImage: "image5.jpg",

        content: [
            {
                type: "paragraph",
                text: "Writing forces you to slow down and organize your technical thinking.",
            },
            {
                type: "heading",
                text: "How Writing Helps",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Reveals knowledge gaps",
                    "Strengthens problem solving",
                    "Improves communication",
                ],
            },
            {
                type: "paragraph",
                text: "Developers who write regularly tend to learn faster and retain concepts longer.",
            },
        ],

        comments: [
            {
                id: 1,
                author: "Don Turner",
                avatar: "avatar2.jpg",
                comment: "Never thought about it this way before!",
            },
        ],
    },

    {
        id: "6",
        slug: "deep-dive-into-nextjs-app-router",
        pageTitle: "Blog Detail | BlogForge Sanity Blog Template",

        title: "A Deep Dive into the Next.js App Router",
        subtitle: "Understanding the New Mental Model",
        category: "Technology",

        meta: {
            readTime: "7 min read",
            publishDate: "Jun 20, 2025",
            views: 1042,
            commentsCount: 4,
        },

        author: {
            name: "Manpreet Singh Minhas",
            avatar: "avatar1.jpg",
        },

        coverImage: "next.jpg",

        content: [
            {
                type: "paragraph",
                text: "The App Router in Next.js introduces a new way of thinking about routing, data fetching, and rendering strategies.",
            },
            {
                type: "paragraph",
                text: "Instead of treating routing as a simple file-to-URL mapping, the App Router encourages developers to think in terms of layouts, nested UI, and streaming.",
            },
            {
                type: "heading",
                text: "What Changed from the Pages Router?",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Server Components by default",
                    "Nested layouts and templates",
                    "Colocation of data fetching",
                    "Improved loading and error handling",
                ],
            },
            {
                type: "paragraph",
                text: "These changes allow developers to build more scalable and maintainable applications with less boilerplate.",
            },
            {
                type: "heading",
                text: "Server vs Client Components",
            },
            {
                type: "paragraph",
                text: "Understanding when to use Server Components versus Client Components is key to unlocking the full power of the App Router.",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Server Components reduce client bundle size",
                    "Client Components enable interactivity",
                    "A balanced mix delivers optimal performance",
                ],
            },
            {
                type: "heading",
                text: "Final Thoughts",
            },
            {
                type: "paragraph",
                text: "While the App Router may feel unfamiliar at first, adopting its mental model leads to cleaner architecture and better performance in the long run.",
            },
        ],

        comments: [
            {
                id: 1,
                author: "Sophie Hamilton",
                avatar: "avatar1.jpg",
                comment: "This finally made the App Router click for me.",
            },
            {
                id: 2,
                author: "Rodney Russell",
                avatar: "avatar1.jpg",
                comment: "Great breakdown of server vs client components.",
            },
            {
                id: 3,
                author: "Don Turner",
                avatar: "avatar2.jpg",
                comment: "Very thorough and easy to follow.",
            },
            {
                id: 4,
                author: "Lelia Mason",
                avatar: "avatar1.jpg",
                comment: "Exactly what I needed before migrating my project.",
            },
        ],
    },

    {
        id: "7",
        slug: "thinking-in-components-frontend-architecture",
        pageTitle: "Blog Detail | BlogForge Sanity Blog Template",

        title: "Thinking in Components: A Frontend Architecture Guide",
        subtitle: "How to Design UI That Scales",
        category: "Development",

        meta: {
            readTime: "8 min read",
            publishDate: "Jun 22, 2025",
            views: 1365,
            commentsCount: 5,
        },

        author: {
            name: "Sanjida windx",
            avatar: "avatar2.jpg",
        },

        coverImage: "React-JS-component-1.png",

        content: [
            {
                type: "paragraph",
                text: "Modern frontend development is less about individual pages and more about composing reusable, predictable components.",
            },
            {
                type: "paragraph",
                text: "Thinking in components helps teams reason about UI complexity and reduces the cost of future changes.",
            },
            {
                type: "heading",
                text: 'What Does "Thinking in Components" Mean?',
            },
            {
                type: "paragraph",
                text: "It means breaking down the UI into small, focused pieces that each solve a single problem.",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Single responsibility components",
                    "Clear input and output via props",
                    "Minimal shared state",
                ],
            },
            {
                type: "heading",
                text: "Common Architectural Mistakes",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Overly large components",
                    "Tightly coupled UI and logic",
                    "Duplicated state across components",
                ],
            },
            {
                type: "paragraph",
                text: "Avoiding these pitfalls early makes applications easier to test, debug, and extend.",
            },
            {
                type: "heading",
                text: "Scaling a Component-Based System",
            },
            {
                type: "paragraph",
                text: "As applications grow, consistency and conventions become more important than clever abstractions.",
            },
            {
                type: "list",
                text: "",
                items: [
                    "Shared design systems",
                    "Clear folder structure",
                    "Strong typing with TypeScript",
                ],
            },
            {
                type: "heading",
                text: "Conclusion",
            },
            {
                type: "paragraph",
                text: "Frontend architecture is ultimately about making future development easier, not just solving today’s problem.",
            },
        ],

        comments: [
            {
                id: 1,
                author: "Don Turner",
                avatar: "avatar2.jpg",
                comment: "This explains component architecture perfectly.",
            },
            {
                id: 2,
                author: "Sophie Hamilton",
                avatar: "avatar1.jpg",
                comment: "Really helpful for large team projects.",
            },
            {
                id: 3,
                author: "Rodney Russell",
                avatar: "avatar1.jpg",
                comment: "I wish I read this earlier in my career.",
            },
            {
                id: 4,
                author: "Lelia Mason",
                avatar: "avatar1.jpg",
                comment: "Clear, structured, and practical.",
            },
            {
                id: 5,
                author: "Manpreet Singh Minhas",
                avatar: "avatar1.jpg",
                comment: "Glad this helped the community.",
            },
        ],
    },
];
