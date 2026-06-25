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

async function getAccountBalances() {
  const accounts = await prisma.account.findMany({
    orderBy: {
      code: "asc",
    },
    include: {
      journalLines: true,
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
