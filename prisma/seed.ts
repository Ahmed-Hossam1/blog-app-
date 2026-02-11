import { prisma } from "./prisma";

async function main() {
  console.log("Updating createdAt for all blogs...");

  const blogs = await prisma.blog.findMany({
    select: { id: true },
    orderBy: { id: "asc" }, // ترتيب ثابت
  });

  const now = new Date();

  for (let i = 0; i < blogs.length; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - (blogs.length - i));

    await prisma.blog.update({
      where: { id: blogs[i].id },
      data: {
        createdAt: date,
      },
    });

    console.log(`✅ Updated blog ${blogs[i].id}`);
  }

  console.log("All blogs updated successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
