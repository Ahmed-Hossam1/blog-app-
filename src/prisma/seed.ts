import { prisma } from "@/prisma/prisma";

const userId = "69e373bc89236d811f9fb13c";

const titles = [
  "Getting Started with Next.js",
  "Understanding React Hooks",
  "Mastering Tailwind CSS",
  "Prisma with MongoDB Guide",
  "Building a Blog App",
  "Authentication with NextAuth",
  "Server vs Client Components",
  "Optimizing React Performance",
  "Form Validation with Yup",
  "React Query Deep Dive",
  "Dark Mode UI Tips",
  "REST API Best Practices",
  "Clean Code in JavaScript",
  "TypeScript for Beginners",
  "State Management Patterns",
  "Building Reusable Components",
  "Handling Errors in APIs",
  "Deploying Next.js Apps",
  "SEO Optimization Guide",
  "Debugging Like a Pro",
];

function generateSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-") +
    "-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 1000)
  );
}

async function seedBlogs() {
  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];

    await prisma.blog.create({
      data: {
        title,
        slug: generateSlug(title),
        content: `This is a sample content for "${title}". You can replace it later.`,
        category: "Tech",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        readTime: `${Math.floor(Math.random() * 5) + 1} min read`,
        status: i % 2 === 0 ? "PUBLISHED" : "DRAFT",
        views: Math.floor(Math.random() * 500),
        likesCount: Math.floor(Math.random() * 100),
        commentsCount: Math.floor(Math.random() * 50),
        bookmarksCount: Math.floor(Math.random() * 30),
        authorId: userId,
      },
    });
  }

  console.log("✅ 20 blogs created successfully");
}

seedBlogs()
  .catch((e) => {
    console.error("❌ Error seeding blogs:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });