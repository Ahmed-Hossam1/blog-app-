import { prisma } from "./prisma";


async function main() {
  console.log("Start seeding...");

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();

  // Create Users with real avatar URLs from randomuser.me
  const usersData = [
    { name: "Alex Johnson", email: "alex@example.com", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sarah Chen", email: "sarah@example.com", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Michael Smith", email: "michael@example.com", image: "https://randomuser.me/api/portraits/men/75.jpg" },
    { name: "Emily Parker", email: "emily@example.com", image: "https://randomuser.me/api/portraits/women/21.jpg" },
    { name: "David Miller", email: "david@example.com", image: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Sophia Zhang", email: "sophia@example.com", image: "https://randomuser.me/api/portraits/women/63.jpg" },
    { name: "James Wilson", email: "james@example.com", image: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Isabella Garcia", email: "isabella@example.com", image: "https://randomuser.me/api/portraits/women/17.jpg" },
    { name: "Oliver Brown", email: "oliver@example.com", image: "https://randomuser.me/api/portraits/men/55.jpg" },
    { name: "Emma Davis", email: "emma@example.com", image: "https://randomuser.me/api/portraits/women/35.jpg" },
  ];

  const users = await Promise.all(
    usersData.map((u, i) =>
      prisma.user.create({
        data: {
          ...u,
          password: `hashed_password_${i + 1}`,
        },
      })
    )
  );

  const categories = ["Technology", "Lifestyle", "Travel", "Wellness", "Business"];

  // Real Unsplash image URLs for each category
  const categoryImages: Record<string, string[]> = {
    Technology: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
      "https://images.unsplash.com/photo-1531297461136-82047554afab?w=1200&q=80",

    ],
    Lifestyle: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80",
      "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=1200&q=80",
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
      "https://images.unsplash.com/photo-1484069555208-126aebb58e94?w=1200&q=80",

    ],
    Travel: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
      "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=1200&q=80",
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=1200&q=80",

    ],
    Wellness: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
      "https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80",
      "https://images.unsplash.com/photo-1544367563-121955b79664?w=1200&q=80",

    ],
    Business: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",

    ]
  };

  const blogs = [];

  for (let i = 1; i <= 50; i++) {
    const author = users[i % users.length];
    const category = categories[i % categories.length];
    const images = categoryImages[category];
    const imageUrl = images[i % images.length];

    const blog = await prisma.blog.create({
      data: {
        slug: `modern-${category.toLowerCase()}-insight-${i}`,
        seoTitle: `The Ultimate Guide to ${category} - ${i}`,
        title: `How ${category} is Transforming the Industry in 2026`,
        subtitle: `A deep dive into the revolutionary changes and practical applications of ${category.toLowerCase()} in the modern era.`,
        category: category,
        image: imageUrl,
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
            type: "heading",
            text: "The Evolution of Trends",
            listItems: []
          },
          {
            type: "paragraph",
            text: `Looking back at the history of ${category.toLowerCase()}, we notice a significant shift in how professionals approach problems. What used to be manually intensive is now automated and streamlined. This evolution allows for more creative thinking and less repetitive work.`,
            listItems: []
          },
          {
            type: "list",
            text: "Here's what you'll learn in this comprehensive analysis:",
            listItems: [
              "Historical context and rapid evolution",
              "Top 5 trends to watch this year",
              "Practical implementation strategies",
              "Expert tips for sustainable growth",
              "Future predictions for the next decade"
            ]
          },
          {
            type: "heading",
            text: "Why It Matters Now",
            listItems: []
          },
          {
            type: "paragraph",
            text: `The urgency to adopt modern ${category.toLowerCase()} practices has never been higher. With global competition increasing, businesses and individuals must adapt or risk falling behind. The tools available today are more powerful and accessible than ever before.`,
            listItems: []
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

    // Create 3-8 comments for each blog
    const commentCount = Math.floor(Math.random() * 6) + 3;
    const commenters = [
      { name: "Emily Parker", img: "https://randomuser.me/api/portraits/women/21.jpg" },
      { name: "David Miller", img: "https://randomuser.me/api/portraits/men/45.jpg" },
      { name: "Sophia Zhang", img: "https://randomuser.me/api/portraits/women/63.jpg" },
      { name: "James Wilson", img: "https://randomuser.me/api/portraits/men/22.jpg" },
      { name: "Isabella Garcia", img: "https://randomuser.me/api/portraits/women/17.jpg" },
      { name: "Lucas Brown", img: "https://randomuser.me/api/portraits/men/33.jpg" },
      { name: "Mia Davis", img: "https://randomuser.me/api/portraits/women/34.jpg" },
      { name: "Ethan Wilson", img: "https://randomuser.me/api/portraits/men/51.jpg" },
    ];

    const commentTexts = [
      "Great read! The section on trends was particularly helpful.",
      "I've been looking for this information for weeks. Thanks!",
      "Could you elaborate more on the practical implementation strategies?",
      "This is a game changer for my workflow.",
      "I disagree with the point about automation, but great article overall.",
      "Looking forward to the next part of this series.",
      "Shared this with my team, very insightful.",
      "The historical context provided really helps understand the current landscape."
    ];

    for (let j = 0; j < commentCount; j++) {
      const commenter = commenters[j % commenters.length];
      const commentText = commentTexts[j % commentTexts.length];
      await prisma.comment.create({
        data: {
          comment: commentText,
          authorName: commenter.name,
          image: commenter.img,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(`💬 Total Comments: ${blogs.reduce((acc, b) => acc + (b.meta as any).commentsCount, 0)}`);
  console.log(`🖼️  All images are real Unsplash/RandomUser photos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
