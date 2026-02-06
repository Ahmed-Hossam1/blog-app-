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
        avatar: "avatar1.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Sarah Chen",
        email: "sarah@example.com",
        password: "hashed_password_2",
        avatar: "avatar2.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Michael Smith",
        email: "michael@example.com",
        password: "hashed_password_3",
        avatar: "avatar3.jpg",
      },
    }),
  ]);

  const categories = ["Technology", "Lifestyle", "Travel", "Wellness", "Business"];

  const categoryImages: Record<string, string[]> = {
    Technology: [
      "images/blogs/tech1.png", "images/blogs/tech2.png", "images/blogs/tech3.png", "images/blogs/tech4.png"
    ],
    Lifestyle: [
      "images/blogs/life1.png", "images/blogs/life2.png", "image1.jpg", "image2.jpg"
    ],
    Travel: [
      "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg"
    ],
    Wellness: [
      "health.jpg", "images/blogs/blog3.jpg", "images/blogs/blog5.jpg", "images/blogs/blog8.jpg"
    ],
    Business: [
      "React-JS-component-1.png", "next.jpg", "images/blogs/blog10.jpg", "images/blogs/blog11.jpg"
    ]
  };

  const blogs = [];

  for (let i = 1; i <= 20; i++) {
    const author = users[i % users.length];
    const category = categories[i % categories.length];
    const images = categoryImages[category];
    const imageId = images[i % images.length];

    const blog = await prisma.blog.create({
      data: {
        slug: `modern-${category.toLowerCase()}-insight-${i}`,
        pageTitle: `The Ultimate Guide to ${category} - ${i}`,
        title: `How ${category} is Transforming the Industry in 2026`,
        subtitle: `A deep dive into the revolutionary changes and practical applications of ${category.toLowerCase()} in the modern era.`,
        category: category,
        coverImage: imageId,
        meta: {
          readTime: `${Math.floor(Math.random() * 8) + 4} min read`,
          publishDate: new Date().toISOString().split('T')[0],
          views: Math.floor(Math.random() * 10000) + 100,
          commentsCount: 0,
        },
        content: [
          {
            type: "paragraph",
            text: `In today's fast-paced world, ${category} stands as a testament to human innovation. This article explores how we can leverage these advancements to improve our daily workflows and long-term strategies.`,
            listItems: []
          },
          {
            type: "list",
            text: "Here’s what you’ll learn in this comprehensive analysis:",
            listItems: [
              "Historical context and rapid evolution",
              "Top 5 trends to watch this year",
              "Practical implementation strategies",
              "Expert tips for sustainable growth"
            ]
          },
          {
            type: "paragraph",
            text: `The synergy between tradition and innovation within ${category.toLowerCase()} creates a unique landscape for both professionals and enthusiasts. As we look towards the next decade, the potential for growth remains limitless.`,
            listItems: []
          }
        ],
        published: true,
        authorId: author.id,
      },
    });

    // Create 2-4 comments for each blog to make it look active
    const commentCount = Math.floor(Math.random() * 3) + 2;
    const commenters = ["Emily Parker", "David Miller", "Sophia Zhang", "James Wilson", "Isabella Garcia"];

    for (let j = 0; j < commentCount; j++) {
      await prisma.comment.create({
        data: {
          comment: `Great read! The section on ${category.toLowerCase()} trends was particularly helpful. Looking forward to more articles like this.`,
          author: commenters[j % commenters.length],
          avatar: `avatar${(j % 3) + 1}.jpg`,
          blogId: blog.id,
        },
      });
    }

    // Update comment count in blog meta and push to array
    const updatedBlog = await prisma.blog.update({
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

    blogs.push(updatedBlog);
  }

  console.log(`\n🚀 Seeding successfully completed!`);
  console.log(`----------------------------------`);
  console.log(`👥 Users Created: ${users.length}`);
  console.log(`📝 Blogs Created: ${blogs.length}`);
  console.log(`💬 Total Comments: ${blogs.reduce((acc, b) => acc + (b.meta as any).commentsCount, 0)}`);
  console.log(`🖼️  All images are high-resolution Unsplash photos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
