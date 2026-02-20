import { prisma } from "./prisma";

async function main() {
  console.log("Emptying database...");
  await prisma.comment.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding Users...");
  const user1 = await prisma.user.create({
    data: {
      name: "Ahmed Hossam",
      email: "ahmed@example.com",
      password: "password123", // In a real app, this should be hashed
      image: "https://i.pravatar.cc/150?u=ahmed",
      title: "Senior Full-Stack Developer",
      bio: "Passionate about Next.js, React, and building scalable web applications.",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Sarah Chen",
      email: "sarah@example.com",
      password: "password123",
      image: "https://i.pravatar.cc/150?u=sarah",
      title: "Digital Nomad & Travel Blogger",
      bio: "Exploring the world one coffee shop at a time. Content creator and UI designer.",
    },
  });

  console.log("Seeding Blogs...");
  const blog1 = await prisma.blog.create({
    data: {
      slug: "future-of-ai-in-web-development",
      seoTitle: "The Future of AI in Web Development (2025)",
      title: "How AI is Transforming Web Development",
      subtitle: "From Copilots to autonomous agents, the game is changing.",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
      meta: {
        readTime: "8 min",
        publishDate: "Feb 20, 2026",
        views: 1250,
        commentsCount: 2,
      },
      content: `
# The Revolution of AI in Frontend
Artificial Intelligence is no longer just a buzzword. It is actively reshaping how we build interfaces.

## 1. Code Assistance
Tools like GitHub Copilot and Cursor are now standard. Developers are writing code 50% faster by using AI-driven autocompletion.

## 2. Real-time Generation
Imagine a world where components are generated on the fly based on user intent.

**Key takeaways:**
*   AI handles boilerplate.
*   Developers focus on architecture.
*   The barrier to entry is lowering.

> "The best way to predict the future is to invent it." - Alan Kay
      `.trim(),
      published: true,
      authorId: user1.id,
    },
  });

  const blog2 = await prisma.blog.create({
    data: {
      slug: "top-10-destinations-for-digital-nomads-2026",
      seoTitle: "Best Digital Nomad Destinations 2026",
      title: "10 Most Affordable Places for Remote Workers",
      subtitle: "Work from paradise without breaking the bank.",
      category: "Travel",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
      meta: {
        readTime: "5 min",
        publishDate: "Feb 15, 2026",
        views: 840,
        commentsCount: 1,
      },
      content: `
# Why Remote Work is the New Standard
The office is dead. Long live the beach!

## Our Top Picks:
1.  **Bali, Indonesia** - The classic choice.
2.  **Lisbon, Portugal** - Tech hub of Europe.
3.  **Medellin, Colombia** - Incredible weather all year.

### Connectivity
Make sure to check [Speedtest](https://speedtest.net) before booking your stay. High-speed internet is the lifeline of a nomad.
      `.trim(),
      published: true,
      authorId: user2.id,
    },
  });

  console.log("Seeding Comments...");
  const comment1 = await prisma.comment.create({
    data: {
      authorName: "John Smith",
      image: "https://i.pravatar.cc/150?u=john",
      comment: "This is a great insight into the AI landscape! I wonder how it will affect junior developers specifically.",
      blogId: blog1.id,
    },
  });

  await prisma.comment.create({
    data: {
      authorName: "Ahmed Hossam",
      image: user1.image!,
      comment: "I think junior developers will need to learn how to prompt and review AI-generated code rather than just writing it from scratch.",
      blogId: blog1.id,
      parentId: comment1.id,
    },
  });

  console.log("Database seeded successfully! 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
