const prisma = require("../prismaClient");

// Need another function to include journalLines and their associated journalEntries, so that the account balances can be calculated. Doesnt need to be async, since it will be called from another async function.

function calculateAccountBalance(account) {
  const totalDebits = account.journalLines.reduce(
    (acc, line) => acc + Number(line.debit || 0),
    0,
  );
  const totalCredits = account.journalLines.reduce(
    (acc, line) => acc + Number(line.credit || 0),
    0,
  );

  const balance =
    account.normalBalance === "DEBIT"
      ? totalDebits - totalCredits
      : totalCredits - totalDebits;

  return {
    totalDebits,
    totalCredits,
    balance,
  };
}

async function getAccounts() {
  const accounts = await prisma.account.findMany({
    orderBy: {
      code: "asc",
    },
    include: {
      journalLines: {
        select: {
          debit: true,
          credit: true,
        },
      },
    },
  });

  return accounts.map((account) => {
    const { totalDebits, totalCredits, balance } =
      calculateAccountBalance(account);
    return {
      id: account.id,
      code: account.code,
      name: account.name,
      type: account.type,
      subAccounts: account.subAccounts,
      normalBalance: account.normalBalance,
      parentAccountId: account.parentAccountId,
      totalDebit: totalDebits,
      totalCredit: totalCredits,
      balance: balance,
    };
  });
}

module.exports = {
  getAccounts,
};
