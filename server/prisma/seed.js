const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

// in between create and upsert. For the purpose of simplicity, I will assume the seed file will run only once and will not be run multiple times.

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
