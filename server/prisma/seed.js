const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

// I've used an example of Estate Chart of Accounts from a Canadian perspective.

async function main() {
  console.log("Seeding estate chart of accounts...");

  // I'm in between create and upsert. For the purpose of simplicity, I will assume the seed file will run only once and will not be run multiple times.

  //ASSETS
  await prisma.account.createMany({
    data: [
      {
        code: "10000",
        name: "Assets",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "11000",
        name: "Cash & Cash Equivalents",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "11100",
        name: "Estate Chequing Account",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "bank",
      },
      {
        code: "11200",
        name: "Estate Savings / Investment Account",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "bank",
      },
      {
        code: "11300",
        name: "Cash on Hand",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "cash",
      },

      {
        code: "12000",
        name: "Real Property",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "12100",
        name: "Primary Residence",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "real_property",
      },
      {
        code: "12200",
        name: "Vacation / Rental Property",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "real_property",
      },

      {
        code: "13000",
        name: "Personal & Household Assets",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "13100",
        name: "Vehicles & Boats",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "personal_property",
      },
      {
        code: "13200",
        name: "Art, Jewellery & Collectibles",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "personal_property",
      },

      {
        code: "14000",
        name: "Financial Investments",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "14100",
        name: "Publicly Traded Stocks & Bonds",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "investment",
      },
      {
        code: "14200",
        name: "GICs / Term Deposits",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "investment",
      },
      {
        code: "14300",
        name: "Mutual Funds",
        type: "ASSET",
        normalBalance: "DEBIT",
        subtype: "investment",
      },
    ],
    skipDuplicates: true,
  });
  console.log("Assets seeded");

  //LIABILITIES
  await prisma.account.createMany({
    data: [
      {
        code: "20000",
        name: "Liabilities",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "summary",
      },

      {
        code: "21000",
        name: "Deceased Debts",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "summary",
      },
      {
        code: "21100",
        name: "Credit Card Debt",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "debt",
      },
      {
        code: "21200",
        name: "Mortgages Payable",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "mortgage",
      },
      {
        code: "21300",
        name: "Bank Loans",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "loan",
      },

      {
        code: "22000",
        name: "Administration Liabilities",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "summary",
      },
      {
        code: "22100",
        name: "Funeral Expenses Payable",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "payable",
      },
      {
        code: "22200",
        name: "Income Tax Payable",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "tax_payable",
      },
      {
        code: "22300",
        name: "Probate Fees Payable",
        type: "LIABILITY",
        normalBalance: "CREDIT",
        subtype: "probate_payable",
      },
    ],
    skipDuplicates: true,
  });
  console.log("Liabilities seeded");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
