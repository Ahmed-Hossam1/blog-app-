import { prisma } from "./prisma";

async function main() {
  console.log("Seed data inserted successfully 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });