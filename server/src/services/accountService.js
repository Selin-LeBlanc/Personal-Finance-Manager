const prisma = require("../prismaClient");

async function getAllAccounts() {
  return prisma.account.findMany({
    orderBy: {
      code: "asc",
    },
  });
}

module.exports = {
  getAllAccounts,
};
