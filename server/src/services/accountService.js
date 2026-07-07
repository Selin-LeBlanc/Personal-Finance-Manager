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

// Helper function to calculate the total debit, total credit for the sub accounts and to add it to the parent account.

function addChildBalances(accounts) {
  const accountsById = {};

  accounts.forEach((account) => {
    accountsById[account.id] = { ...account };
  });

  accounts.forEach((account) => {
    let parentAccountId = account.parentAccountId;

    while (parentAccountId) {
      const parentAccount = accountsById[parentAccountId];

      if (!parentAccount) {
        break;
      }

      parentAccount.totalDebits += account.totalDebits;
      parentAccount.totalCredits += account.totalCredits;

      parentAccount.balance =
        parentAccount.normalBalance === "DEBIT"
          ? parentAccount.totalDebits - parentAccount.totalCredits
          : parentAccount.totalCredits - parentAccount.totalDebits;

      parentAccountId = parentAccount.parentAccountId;
    }
  });

  return Object.values(accountsById).sort((a, b) =>
    a.code.localeCompare(b.code),
  );
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

  const accountsWithOwnBalances = accounts.map((account) => {
    const { totalDebits, totalCredits, balance } =
      calculateAccountBalance(account);

    return {
      id: account.id,
      code: account.code,
      name: account.name,
      type: account.type,
      subtype: account.subtype,
      normalBalance: account.normalBalance,
      parentAccountId: account.parentAccountId,
      isActive: account.isActive,
      totalDebits: totalDebits,
      totalCredits: totalCredits,
      balance: balance,
    };
  });

  return addChildBalances(accountsWithOwnBalances);
}

module.exports = {
  getAccounts,
};
