import { prisma } from "./prisma";

async function main() {
  console.log("🌱 Seeding database...");
  console.log("Blogs seeded successfully 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
