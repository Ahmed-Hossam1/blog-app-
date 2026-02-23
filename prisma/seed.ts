import { prisma } from "./prisma"


async function main() {
  const userId = "69985d3195ee6d18859407a6"

  const userExists = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!userExists) {
    throw new Error("User not found. Please create the user first.")
  }

  // Blog 1
  await prisma.blog.create({
    data: {
      slug: "mastering-nextjs-15",
      seoTitle: "Mastering Next.js 15 - Complete Guide",
      title: "Mastering Next.js 15",
      subtitle: "Everything you need to build modern web apps",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",

      meta: {
        readTime: "8 min read",
        publishDate: "2026-02-23",
        views: 1250,
        commentsCount: 0
      },

      content: `
# Mastering Next.js 15

## Introduction
Next.js 15 introduces powerful new features that make building scalable apps easier than ever.

## Why Next.js?

- App Router
- Server Actions
- Optimized Performance
- Full-stack capabilities

## Example Code

\`\`\`ts
export async function getData() {
  const res = await fetch("https://api.example.com")
  return res.json()
}
\`\`\`

> Next.js makes React production-ready.
      `,

      published: true,
      authorId: userId
    }
  })

  // Blog 2
  await prisma.blog.create({
    data: {
      slug: "typescript-best-practices-2026",
      seoTitle: "TypeScript Best Practices 2026",
      title: "TypeScript Best Practices",
      subtitle: "Write scalable and maintainable code",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

      meta: {
        readTime: "6 min read",
        publishDate: "2026-02-22",
        views: 890,
        commentsCount: 0
      },

      content: `
# TypeScript Best Practices

TypeScript helps you catch errors early and improve developer experience.

## Why TypeScript?

- Strong typing
- Better IntelliSense
- Safer refactoring

## Best Practices

1. Enable **strict mode**
2. Use Generics properly
3. Avoid \`any\`
4. Define clear interfaces

## Example

\`\`\`ts
interface User {
  id: string
  name: string
}

const user: User = {
  id: "1",
  name: "Ahmed"
}
\`\`\`

> Clean types = scalable code.
      `,

      published: true,
      authorId: userId
    }
  })

  console.log("✅ Markdown Seed completed successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })