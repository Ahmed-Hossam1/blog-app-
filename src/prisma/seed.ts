import { prisma } from "./prisma";
async function main() {
  await prisma.blog.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.follow.deleteMany({});
  await prisma.bookMark.deleteMany({});
  await prisma.user.deleteMany({});
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });