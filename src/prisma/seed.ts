import { prisma } from "./prisma";


async function main() {
  // 🟡 Users
  await prisma.user.createMany({
    data: [
      {
        name: "Ahmed Hossam",
        email: "ahmed@test.com",
        image: "https://i.pravatar.cc/150?img=1",
        title: "Frontend Developer",
        bio: "Passionate about React & Next.js",
      },
      {
        name: "Sara Ali",
        email: "sara@test.com",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        title: "UI/UX Designer",
        bio: "Designing modern interfaces",
      },
      {
        name: "John Doe",
        email: "john@test.com",
        image: "https://avatars.githubusercontent.com/u/1?v=4",
        title: "Backend Engineer",
        bio: "Node.js & Databases",
      },
    ],
  });

  const allUsers = await prisma.user.findMany();

  // 🟢 Blogs
  const blog1 = await prisma.blog.create({
    data: {
      title: "Getting Started with Next.js",
      slug: "nextjs-guide",
      category: "Programming",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      readTime: "5 min read",
      content: "This is a complete guide to Next.js...",
      status: "PUBLISHED",
      authorId: allUsers[0].id,
    },
  });

  const blog2 = await prisma.blog.create({
    data: {
      title: "Design Tips for Beginners",
      slug: "design-tips",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d",
      readTime: "3 min read",
      content: "Learn basic UI/UX principles...",
      status: "PUBLISHED",
      authorId: allUsers[1].id,
    },
  });

  const blog3 = await prisma.blog.create({
    data: {
      title: "MongoDB Performance Tricks",
      slug: "mongodb-performance",
      category: "Database",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
      readTime: "7 min read",
      content: "Optimize your MongoDB queries...",
      status: "PUBLISHED",
      authorId: allUsers[2].id,
    },
  });

  // 🟣 Comments
  await prisma.comment.createMany({
    data: [
      {
        authorName: "Sara Ali",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        comment: "Great article!",
        blogId: blog1.id,
      },
      {
        authorName: "Ahmed Hossam",
        image: "https://i.pravatar.cc/150?img=1",
        comment: "Very helpful 🔥",
        blogId: blog2.id,
      },
      {
        authorName: "John Doe",
        image: "https://avatars.githubusercontent.com/u/1?v=4",
        comment: "Nice tips!",
        blogId: blog3.id,
      },
    ],
  });

  // 🔵 Likes
  await prisma.like.createMany({
    data: [
      {
        userId: allUsers[0].id,
        blogId: blog2.id,
      },
      {
        userId: allUsers[1].id,
        blogId: blog1.id,
      },
      {
        userId: allUsers[2].id,
        blogId: blog1.id,
      },
    ],
  });

  // 🟡 Bookmarks
  await prisma.bookMark.createMany({
    data: [
      {
        userId: allUsers[0].id,
        blogId: blog3.id,
      },
      {
        userId: allUsers[1].id,
        blogId: blog1.id,
      },
    ],
  });

  // 🟢 Follow System
  await prisma.follow.createMany({
    data: [
      {
        followerId: allUsers[0].id,
        followingId: allUsers[1].id,
      },
      {
        followerId: allUsers[1].id,
        followingId: allUsers[2].id,
      },
    ],
  });

  console.log("✅ Seed data inserted successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());