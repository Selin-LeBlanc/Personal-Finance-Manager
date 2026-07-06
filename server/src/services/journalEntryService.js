const prisma = require("../prismaClient");

// Selin, do not forget the route and controller for these services pls.
// And export the functions
// And update the src/app.js

// Validation logic:
// there should be at least two lines,
// each line must have either a debit or credit amount,
// and total debits must equal total credits.
// Description and entryDate are required fields.
// I'm not adding validation for the date for the purpose of this assignment

function validateJournalEntryInput({ entryDate, description, lines }) {
  if (!entryDate) {
    throw new Error("Entry date is required");
  }

  if (!description) {
    throw new Error("Description is required");
  }

  if (!Array.isArray(lines) || lines.length < 2) {
    throw new Error("A journal entry must have at least two lines");
  }

  let totalDebits = 0;
  let totalCredits = 0;

  for (const line of lines) {
    const debit = Number(line.debit || 0);
    const credit = Number(line.credit || 0);

    if (!line.accountCode) {
      throw new Error("Each line must have an accountCode");
    }

    if (debit < 0 || credit < 0) {
      throw new Error("Debit and credit amounts cannot be negative");
    }

    if (debit > 0 && credit > 0) {
      throw new Error("A line cannot have both debit and credit");
    }

    if (debit === 0 && credit === 0) {
      throw new Error("Each line must have either a debit or credit amount");
    }

    totalDebits += debit;
    totalCredits += credit;
  }

  if (totalDebits !== totalCredits) {
    throw new Error("Total debits must equal total credits");
  }
}

//CRESTE
async function createJournalEntry(data) {
  validateJournalEntryInput(data);

  const accountCodes = data.lines.map((line) => line.accountCode);
  // Check if all accountCodes exist in the database
  // for a better UX, this should be a dropdown menu in the front end IMO, since the user should only be able to select from existing accounts, but can check here just in case
  const accounts = await prisma.account.findMany({
    where: {
      code: {
        in: accountCodes,
      },
    },
  });

  if (accounts.length !== accountCodes.length) {
    throw new Error("One or more accounts do not exist");
  }
  // creating the journal entry, with entry date, description, status, sourceType, and lines.

  // "tx" stands for "transaction" in databases. It allows you to perform multiple database operations within a single transaction, ensuring that either all operations succeed or none of them are applied, maintaining data integrity.
  // This is important in accounting, as you want to ensure that all lines of a journal entry are created together, or none at all, to maintain the integrity of the financial records.
  const journalEntry = await prisma.$transaction(async (prismaTx) => {
    return prismaTx.journalEntry.create({
      data: {
        entryDate: new Date(data.entryDate),
        description: data.description,
        status: data.status || "POSTED",
        sourceType: data.sourceType || "MANUAL",
        lines: {
          create: data.lines.map((line) => ({
            // Should've used accountCode instead of accountId, since the front end is sending accountCode, and we need to find the accountId from the accountCode
            accountId: accounts.find(
              (account) => account.code === line.accountCode,
            ).id,
            debit: Number(line.debit || 0),
            credit: Number(line.credit || 0),
            memo: line.memo || null,
          })),
        },
      },
      include: {
        lines: {
          include: {
            account: true,
          },
        },
      },
    });
  });

  return journalEntry;
}

//GET
async function getAllJournalEntries(filters = {}) {
  // If filters are provided, we will filter the journal entries based on the filters.

  const where = {};

  if (filters.entryDate) {
    const [year, month, day] = filters.entryDate.split("-").map(Number);

    const startOfDay = new Date(year, month - 1, day);
    const endOfDay = new Date(year, month - 1, day + 1);

    where.entryDate = {
      gte: startOfDay,
      lt: endOfDay,
    };
  }

  if (filters.accountCode) {
    where.lines = {
      some: {
        account: {
          code: filters.accountCode,
        },
      },
    };
  }

  // should return the latest journal entries if no filters are provided.
  // if account code is provided, should return the journal enties for that line-account-code
  return prisma.journalEntry.findMany({
    where,
    orderBy: {
      entryDate: "desc",
    },
    include: {
      lines: {
        include: {
          account: true,
        },
      },
    },
  });
}

// Thank you copilot for automatically updating the exports.
module.exports = {
  createJournalEntry,
  getAllJournalEntries,
};
