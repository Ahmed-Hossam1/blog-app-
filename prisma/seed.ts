import { prisma } from "./prisma"

async function main() {
  const userId = "69985d3195ee6d18859407a6"

  const userExists = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!userExists) {
    throw new Error("User not found. Please create the user first.")
  }

  const blogs = [
    {
      slug: "ai-transforming-web-development-2026",
      seoTitle: "How AI is Transforming Web Development in 2026",
      title: "How AI is Transforming Web Development",
      subtitle: "AI tools reshaping frontend and backend engineering",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      readTime: "7 min read",
      publishDate: "2026-02-21",
      views: 1340
    },
    {
      slug: "react-performance-optimization",
      seoTitle: "React Performance Optimization Guide",
      title: "React Performance Optimization",
      subtitle: "Make your apps blazing fast",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b",
      readTime: "8 min read",
      publishDate: "2026-02-20",
      views: 980
    },
    {
      slug: "building-rest-apis-nodejs",
      seoTitle: "Building Scalable REST APIs with Node.js",
      title: "Building Scalable REST APIs",
      subtitle: "Architecture patterns that scale",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      readTime: "9 min read",
      publishDate: "2026-02-19",
      views: 870
    },
    {
      slug: "docker-for-modern-developers",
      seoTitle: "Docker for Modern Developers",
      title: "Docker Essentials",
      subtitle: "Containerization simplified",
      category: "DevOps",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b",
      readTime: "6 min read",
      publishDate: "2026-02-18",
      views: 760
    },
    {
      slug: "graphql-vs-rest-2026",
      seoTitle: "GraphQL vs REST in 2026",
      title: "GraphQL vs REST",
      subtitle: "Which one should you choose?",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
      readTime: "7 min read",
      publishDate: "2026-02-17",
      views: 690
    },
    {
      slug: "advanced-tailwind-patterns",
      seoTitle: "Advanced TailwindCSS Patterns",
      title: "Advanced TailwindCSS Patterns",
      subtitle: "Scaling utility-first CSS",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      readTime: "5 min read",
      publishDate: "2026-02-16",
      views: 640
    },
    {
      slug: "seo-optimization-modern-web",
      seoTitle: "SEO Optimization for Modern Web Apps",
      title: "SEO Optimization Guide",
      subtitle: "Rank higher on search engines",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07",
      readTime: "6 min read",
      publishDate: "2026-02-15",
      views: 720
    },
    {
      slug: "design-systems-at-scale",
      seoTitle: "Building Design Systems at Scale",
      title: "Design Systems at Scale",
      subtitle: "Consistency across large teams",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
      readTime: "8 min read",
      publishDate: "2026-02-14",
      views: 610
    },
    {
      slug: "cybersecurity-basics-developers",
      seoTitle: "Cybersecurity Basics Every Developer Should Know",
      title: "Cybersecurity Basics",
      subtitle: "Protect your applications",
      category: "Security",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      readTime: "10 min read",
      publishDate: "2026-02-13",
      views: 920
    },
    {
      slug: "introduction-to-prisma-orm",
      seoTitle: "Introduction to Prisma ORM with MongoDB",
      title: "Introduction to Prisma ORM",
      subtitle: "Modern database toolkit",
      category: "Database",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
      readTime: "6 min read",
      publishDate: "2026-02-12",
      views: 540
    },
    {
      slug: "server-actions-nextjs",
      seoTitle: "Understanding Server Actions in Next.js",
      title: "Understanding Server Actions",
      subtitle: "Full-stack without API routes",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      readTime: "7 min read",
      publishDate: "2026-02-11",
      views: 880
    },
    {
      slug: "microservices-architecture-guide",
      seoTitle: "Microservices Architecture Guide",
      title: "Microservices Architecture",
      subtitle: "When and how to use it",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      readTime: "9 min read",
      publishDate: "2026-02-10",
      views: 770
    },
    {
      slug: "clean-code-principles",
      seoTitle: "Clean Code Principles for Developers",
      title: "Clean Code Principles",
      subtitle: "Write readable and maintainable software",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      readTime: "8 min read",
      publishDate: "2026-02-09",
      views: 990
    },
    {
      slug: "state-management-react-2026",
      seoTitle: "State Management in React 2026",
      title: "State Management in React",
      subtitle: "Redux, Zustand, or Context?",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3",
      readTime: "7 min read",
      publishDate: "2026-02-08",
      views: 860
    },
    {
      slug: "future-of-web-development",
      seoTitle: "The Future of Web Development",
      title: "The Future of Web Development",
      subtitle: "Trends shaping the next decade",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      readTime: "9 min read",
      publishDate: "2026-02-07",
      views: 1100
    }
  ]

  for (const blog of blogs) {
    await prisma.blog.create({
      data: {
        slug: blog.slug,
        seoTitle: blog.seoTitle,
        title: blog.title,
        subtitle: blog.subtitle,
        category: blog.category,
        image: blog.image,
        meta: {
          readTime: blog.readTime,
          publishDate: blog.publishDate,
          views: blog.views,
          commentsCount: 0
        },
        content: `
# ${blog.title}

${blog.subtitle}

## Overview
This article explores key concepts and practical insights about ${blog.title.toLowerCase()}.

## Key Takeaways
- Practical real-world examples
- Modern development patterns
- Scalable architecture ideas

## Example Code

\`\`\`ts
export function example() {
  console.log("Learning never stops 🚀")
}
\`\`\`

> Stay consistent. Keep building. Ship fast.
        `,
        published: true,
        authorId: userId
      }
    })
  }

  console.log("✅ 15 Blogs Seeded Successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })