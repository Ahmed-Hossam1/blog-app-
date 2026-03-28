import { prisma } from "./prisma";

async function main() {
  console.log("🌱 Starting seed...");

  const userIds = [
    "65f1234567890abcdef00001",
    "65f1234567890abcdef00002",
    "65f1234567890abcdef00003",
    "65f1234567890abcdef00004",
    "65f1234567890abcdef00005",
    "65f1234567890abcdef00006",
    "65f1234567890abcdef00007",
    "65f1234567890abcdef00008",
    "65f1234567890abcdef00009",
    "65f1234567890abcdef00010",
  ];

  const firstNames = ["Ahmed", "Sara", "John", "Maria", "Omar", "Layla", "David", "Elena", "Youssef", "Nora"];
  const lastNames = ["Hossam", "Smith", "Johnson", "Garcia", "Zayed", "Rashid", "Miller", "Ivanova", "Mansour", "Karem"];
  const categories = ["Web Development", "Mobile Development", "UI/UX", "Data Science", "Cloud Computing"];
  const blogImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    "https://images.unsplash.com/photo-1550439062-609e1530277e",
    "https://images.unsplash.com/photo-1511649475669-e288648b2339",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  ];

  // 1. Create Users
  console.log("👤 Creating users...");
  for (let i = 0; i < userIds.length; i++) {
    const name = `${firstNames[i]} ${lastNames[i]}`;
    await prisma.user.upsert({
      where: { id: userIds[i] },
      update: {},
      create: {
        id: userIds[i],
        name,
        email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@example.com`,
        emailVerified: true,
        image: `https://i.pravatar.cc/150?u=${userIds[i]}`,
        title: `${categories[i % categories.length]} Enthusiast`,
        bio: `Hi, I am ${name}. I love coding and sharing my knowledge with the community. Hope you enjoy my blogs!`,
        password: "$2a$10$YourHashedPasswordHere", // Placeholder hashed password
      },
    });
  }

  // 2. Create Blogs with Comments
  console.log("📝 Creating blogs and comments...");
  let blogIndex = 0;
  for (const authorId of userIds) {
    for (let i = 1; i <= 5; i++) {
      blogIndex++;
      const title = `Exploring ${categories[blogIndex % categories.length]} #${i}`;
      const slug = `${title.toLowerCase().replace(/ /g, "-")}-${Date.now()}`;
      
      const blog = await prisma.blog.create({
        data: {
          title,
          slug,
          category: categories[blogIndex % categories.length],
          image: `${blogImages[blogIndex % blogImages.length]}?auto=format&fit=crop&w=800&q=80`,
          readTime: `${Math.floor(Math.random() * 8) + 3} min read`,
          status: "PUBLISHED",
          views: Math.floor(Math.random() * 500) + 50,
          likesCount: Math.floor(Math.random() * 50) + 10,
          commentsCount: 3,
          content: `This article discusses advanced topics in ${categories[blogIndex % categories.length]}. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          authorId,
        },
      });

      // Add 3 comments to each blog from other users
      for (let j = 0; j < 3; j++) {
        const commenterIndex = (userIds.indexOf(authorId) + j + 1) % userIds.length;
        const commenterId = userIds[commenterIndex];
        const commenter = firstNames[commenterIndex] + " " + lastNames[commenterIndex];
        
        await prisma.comment.create({
          data: {
            authorName: commenter,
            image: `https://i.pravatar.cc/150?u=${commenterId}`,
            comment: `Great article! I learned a lot about ${categories[blogIndex % categories.length]} from this. Keep it up!`,
            blogId: blog.id,
          },
        });
      }
    }
  }

  // 3. Create Follows
  console.log("🤝 Creating follows...");
  for (const userId of userIds) {
    const userIndex = userIds.indexOf(userId);
    // Follow next 3 users in the list
    for (let i = 1; i <= 3; i++) {
      const followingId = userIds[(userIndex + i) % userIds.length];
      await prisma.follow.upsert({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId,
          },
        },
        update: {},
        create: {
          followerId: userId,
          followingId,
        },
      });
    }
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
