import { prisma } from "./prisma";

async function main() {
await prisma.comment.deleteMany({
  where: { parentId: { not: null } },
});

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
