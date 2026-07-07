const prisma = require("../prismaClient");

// There will be multiple report generation functions here,
// The account balances is going to be the base for the reports, so we will start with that one first

// this function will be a simple sum of debit/credit, I'm not implementing a roll over balance calculation for now, but it can be added later if needed.

function calculateBalance(account) {
  const totalDebits = account.journalLines.reduce((sum, line) => {
    return sum + Number(line.debit);
  }, 0);

  const totalCredits = account.journalLines.reduce((sum, line) => {
    return sum + Number(line.credit);
  }, 0);

  if (account.normalBalance === "DEBIT") {
    return totalDebits - totalCredits;
  }

  return totalCredits - totalDebits;
}

// Helper function to get sub-accounts of a given parentaccount
async function getAccountAndSubAccounts(accountCode) {
  const parentAccount = await prisma.account.findUnique({
    where: { code: accountCode },
  });

  if (!parentAccount) {
    throw new Error(`Account with code ${accountCode} not found`);
  }

  const accountAndSubAccountIds = [parentAccount.id];
  let currentParentIds = [parentAccount.id];

  while (currentParentIds.length > 0) {
    const childAccounts = await prisma.account.findMany({
      where: {
        parentAccountId: {
          in: currentParentIds,
        },
      },
    });

    const childIds = childAccounts.map((account) => account.id);

    accountAndSubAccountIds.push(...childIds);
    currentParentIds = childIds;
  }

  return accountAndSubAccountIds;
}
// Updated the getAccountBalances function to include a filter for account code and its sub-accounts

async function getAccountBalances(asOfDate = new Date(), filters = {}) {
  const where = {};

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.code) {
    const accountAndSubAccountIds = await getAccountAndSubAccounts(
      filters.code,
    );
    where.id = {
      in: accountAndSubAccountIds,
    };
  }

  const accounts = await prisma.account.findMany({
    where,
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

async function getIncomeStatement(asOfDate = new Date()) {
  const balances = await getAccountBalances(asOfDate);

  const income = balances.filter((account) => account.type === "INCOME");
  const expenses = balances.filter((account) => account.type === "EXPENSE");

  const totalIncome = income.reduce((sum, account) => sum + account.balance, 0);
  const totalExpenses = expenses.reduce(
    (sum, account) => sum + account.balance,
    0,
  );

  return {
    asOfDate,
    income,
    expenses,
    totals: {
      totalIncome,
      totalExpenses,
      netIncome: totalIncome - totalExpenses,
    },
  };
}

module.exports = {
  getAccountBalances,
  getBalanceSheet,
  getIncomeStatement,
};
