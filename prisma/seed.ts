import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const users = [
    {
      name: "Adham Nasser",
      email: "adham@example.com",
      password: "password123",
      image: "/assets/authors/adham.png",
      title: "Software Engineer",
      bio: "Adham is a passionate software engineer who enjoys building scalable web applications and exploring modern technologies.",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      password: "password123",
      image: "/assets/authors/sarah.png",
      title: "Content Writer",
      bio: "Sarah is a creative content writer specializing in technology and lifestyle topics, with a strong love for storytelling.",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      password: "password123",
      image: "/assets/authors/michael.png",
      title: "Data Scientist",
      bio: "Michael is a data scientist with a background in mathematics and a passion for turning data into meaningful insights.",
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      password: "password123",
      image: "/assets/authors/emily.png",
      title: "UX Designer",
      bio: "Emily is a UX designer focused on creating intuitive, accessible, and user-friendly interfaces.",
    },
  ];

  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        image: u.image,
        title: u.title,
        bio: u.bio,
      },
      create: {
        name: u.name,
        email: u.email,
        password: u.password,
        image: u.image,
        title: u.title,
        bio: u.bio,
      },
    });

    console.log(`✅ User seeded: ${user.email}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
