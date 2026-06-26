const API_BASE_URL = "http://localhost:5001/api";

// Let's get all the functions from the API and return them as JSON

// Get Accounts
export async function getAccounts() {
  const response = await fetch(`${API_BASE_URL}/accounts`);
  return response.json();
}

// Get Journal Entries
export async function getJournalEntries() {
  const response = await fetch(`${API_BASE_URL}/journal-entries`);
  return response.json();
}

// Get Account Balances with as of date variable, if left blank, should return the latest balances
export async function getAccountBalances(asOfDate = "") {
  const response = await fetch(
    `${API_BASE_URL}/account-balances?asOfDate=${asOfDate}`,
  );
  return response.json();
}

// Get Balance Sheet with as of date variable, if left blank, should return the latest balance sheet
export async function getBalanceSheet(asOfDate = "") {
  const response = await fetch(
    `${API_BASE_URL}/balance-sheet?asOfDate=${asOfDate}`,
  );
  return response.json();
}

// Get Income Statement with as of date variable, if left blank, should return the latest income statement
export async function getIncomeStatement(asOfDate = "") {
  const response = await fetch(
    `${API_BASE_URL}/income-statement?asOfDate=${asOfDate}`,
  );
  return response.json();
}
