import { prisma } from "./prisma";

async function main() {
  // seed here
  console.log(`🌱 Database ready!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
