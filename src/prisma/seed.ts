import { prisma } from "./prisma";
async function main() {
  console.log("✅ Blogs seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
