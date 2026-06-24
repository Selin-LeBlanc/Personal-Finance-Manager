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

  //EQUITY
  await prisma.account.createMany({
    data: [
      {
        code: "30000",
        name: "Estate Equity",
        type: "EQUITY",
        normalBalance: "CREDIT",
        subtype: "summary",
      },

      {
        code: "31000",
        name: "Original Estate Value",
        type: "EQUITY",
        normalBalance: "CREDIT",
        subtype: "summary",
      },
      {
        code: "31100",
        name: "Value at Date of Death",
        type: "EQUITY",
        normalBalance: "CREDIT",
        subtype: "opening_estate_value",
      },

      {
        code: "32000",
        name: "Capital Adjustments",
        type: "EQUITY",
        normalBalance: "CREDIT",
        subtype: "summary",
      },
      {
        code: "32100",
        name: "Capital Gains",
        type: "EQUITY",
        normalBalance: "CREDIT",
        subtype: "capital_gain",
      },
      {
        code: "32200",
        name: "Capital Losses",
        type: "EQUITY",
        normalBalance: "DEBIT",
        subtype: "capital_loss",
      },

      {
        code: "33000",
        name: "Beneficiary Distributions",
        type: "EQUITY",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "33100",
        name: "Specific Bequests",
        type: "EQUITY",
        normalBalance: "DEBIT",
        subtype: "distribution",
      },
      {
        code: "33200",
        name: "Interim Distributions",
        type: "EQUITY",
        normalBalance: "DEBIT",
        subtype: "distribution",
      },
      {
        code: "33300",
        name: "Final / Residuary Distributions",
        type: "EQUITY",
        normalBalance: "DEBIT",
        subtype: "distribution",
      },
    ],
    skipDuplicates: true,
  });
  console.log("Equity seeded");

  //INCOME
  await prisma.account.createMany({
    data: [
      {
        code: "40000",
        name: "Revenue",
        type: "INCOME",
        normalBalance: "CREDIT",
        subtype: "summary",
      },

      {
        code: "41000",
        name: "Investment & Estate Income",
        type: "INCOME",
        normalBalance: "CREDIT",
        subtype: "summary",
      },
      {
        code: "41100",
        name: "Interest Earned",
        type: "INCOME",
        normalBalance: "CREDIT",
        subtype: "interest_income",
      },
      {
        code: "41200",
        name: "Dividend Income",
        type: "INCOME",
        normalBalance: "CREDIT",
        subtype: "dividend_income",
      },
      {
        code: "41300",
        name: "Rental Income",
        type: "INCOME",
        normalBalance: "CREDIT",
        subtype: "rental_income",
      },
    ],
    skipDuplicates: true,
  });
  console.log("Revenue seeded");

  //EXPENSES
  await prisma.account.createMany({
    data: [
      {
        code: "50000",
        name: "Expenses",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "summary",
      },

      {
        code: "51000",
        name: "Property Maintenance",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "51100",
        name: "Property Taxes",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "property_tax",
      },
      {
        code: "51200",
        name: "Property Insurance",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "insurance",
      },
      {
        code: "51300",
        name: "Utilities",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "utilities",
      },
      {
        code: "51400",
        name: "Repairs & Cleaning",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "repairs_cleaning",
      },

      {
        code: "52000",
        name: "Professional Fees",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "52100",
        name: "Legal Fees",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "legal_fees",
      },
      {
        code: "52200",
        name: "Accounting Fees",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "accounting_fees",
      },
      {
        code: "52300",
        name: "Appraisal Fees",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "appraisal_fees",
      },

      {
        code: "53000",
        name: "Administration",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "summary",
      },
      {
        code: "53100",
        name: "Executor Compensation",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "executor_compensation",
      },
      {
        code: "53200",
        name: "Postage / Courier / Banking",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "administration_cost",
      },
      {
        code: "53300",
        name: "Executor Care & Management",
        type: "EXPENSE",
        normalBalance: "DEBIT",
        subtype: "executor_management",
      },
    ],
    skipDuplicates: true,
  });
  console.log("Expenses seeded");

  console.log("Estate chart of accounts seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
