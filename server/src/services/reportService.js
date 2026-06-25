const prisma = require("../prismaClient");

// There will be multiple report generation functions here,
// The account balances is going to be the base for the reports, so we will start with that one first

// this function will be a simple sum of debit/credit, I'm not implementing a roll over balance calculation for now, but it can be added later if needed.

function calculateBalance(account) {
  const totalDebit = account.journalLines.reduce((sum, line) => {
    return sum + Number(line.debit);
  }, 0);

  const totalCredit = account.journalLines.reduce((sum, line) => {
    return sum + Number(line.credit);
  }, 0);

  if (account.normalBalance === "DEBIT") {
    return totalDebit - totalCredit;
  }

  return totalCredit - totalDebit;
}

async function getAccountBalances(asOfDate = new Date()) {
  const accounts = await prisma.account.findMany({
    orderBy: {
      code: "asc",
    },
    include: {
      journalLines: {
        where: {
          journalEntry: {
            entryDate: {
              lte: asOfDate,
            },
          },
        },
        include: {
          journalEntry: true,
        },
      },
    },
  });

  return accounts.map((account) => {
    const balance = calculateBalance(account);

    return {
      id: account.id,
      code: account.code,
      name: account.name,
      type: account.type,
      normalBalance: account.normalBalance,
      balance,
    };
  });
}

// Balance sheet and Income statement
async function getBalanceSheet(asOfDate = new Date()) {
  const balances = await getAccountBalances(asOfDate);

  const assets = balances.filter((account) => account.type === "ASSET");
  const liabilities = balances.filter(
    (account) => account.type === "LIABILITY",
  );
  const equity = balances.filter((account) => account.type === "EQUITY");

  // Total Sums per category may or maynot be needed, but I will include them for now.
  const totalAssets = assets.reduce((sum, account) => sum + account.balance, 0);
  const totalLiabilities = liabilities.reduce(
    (sum, account) => sum + account.balance,
    0,
  );
  const totalEquity = equity.reduce((sum, account) => sum + account.balance, 0);

  return {
    asOfDate,
    assets,
    liabilities,
    equity,
    totals: {
      totalAssets,
      totalLiabilities,
      totalEquity,
      totalLiabilitiesAndEquity: totalLiabilities + totalEquity,
    },
  };
}

module.exports = {
  getAccountBalances,
  getBalanceSheet,
};
