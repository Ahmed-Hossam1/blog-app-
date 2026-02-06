import { prisma } from "./prisma";


async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Alex Johnson",
        email: "alex@example.com",
        password: "hashed_password_1",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
    }),
    prisma.user.create({
      data: {
        name: "Sarah Chen",
        email: "sarah@example.com",
        password: "hashed_password_2",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
    }),
    prisma.user.create({
      data: {
        name: "Michael Smith",
        email: "michael@example.com",
        password: "hashed_password_3",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
    }),
  ]);

  const categories = ["Technology", "Lifestyle", "Travel", "Wellness", "Business"];
  const blogs = [];

  for (let i = 1; i <= 20; i++) {
    const author = users[Math.floor(Math.random() * users.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const blog = await prisma.blog.create({
      data: {
        slug: `blog-post-${i}`,
        pageTitle: `Title for Page ${i}`,
        title: `The Future of ${category} in 2026 - Part ${i}`,
        subtitle: `Exploring the latest trends and breakthroughs in ${category.toLowerCase()} that are shaping our world.`,
        category: category,
        coverImage: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=800&q=80`,
        meta: {
          readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
          publishDate: "2026-02-06",
          views: Math.floor(Math.random() * 5000),
          commentsCount: 0,
        },
        content: [
          {
            type: "paragraph",
            text: `This is a comprehensive guide about ${category}. We dive deep into the core concepts and emerging patterns that every enthusiast should know about.`,
            listItems: []
          },
          {
            type: "list",
            text: "Key takeaways from this article:",
            listItems: [
              "Understanding the foundation",
              "Implementing best practices",
              "Forecasting future growth"
            ]
          },
          {
            type: "paragraph",
            text: "The rapid evolution of this field presents both challenges and opportunities. By staying informed, we can navigate these changes effectively.",
            listItems: []
          }
        ],
        published: true,
        authorId: author.id,
      },
    });

    // Create 1-3 comments for each blog
    const commentCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < commentCount; j++) {
      await prisma.comment.create({
        data: {
          comment: `This is a really insightful article about ${category}! Thanks for sharing.`,
          author: ["John Doe", "Jane Roe", "Alice Wonder"][j % 3],
          avatar: `https://i.pravatar.cc/150?u=${i}${j}`,
          blogId: blog.id,
        },
      });
    }

    // Update comment count in blog meta
    await prisma.blog.update({
      where: { id: blog.id },
      data: {
        meta: {
          set: {
            ...blog.meta,
            commentsCount: commentCount,
          }
        }
      }
    });

    blogs.push(blog);
  }

  console.log(`Seeding finished. Created ${users.length} users and ${blogs.length} blogs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
