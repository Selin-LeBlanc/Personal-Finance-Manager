const API_BASE_URL = "http://localhost:5001/api";

// Let's get all the functions from the API and return them as JSON

// Get Accounts
export async function getAccounts() {
  const response = await fetch(`${API_BASE_URL}/accounts`);
  return response.json();
}

// Get Journal Entries
// Update: Get Journal Entries with as of date variable, account code variable, or both, if left blank, should return the latest journal entries
// These two variables will be the search bar filters on the Frond End journal entries page
export async function getJournalEntries(asOfDate = "", accountCode = "") {
  const response = await fetch(
    `${API_BASE_URL}/journal-entries?asOfDate=${asOfDate}&accountCode=${accountCode}`,
  );
  return response.json();
}

// Creating a new journal entry
// Update the createJournalEntry function on the server side to include Project name
export async function createJournalEntry(journalEntry) {
  const response = await fetch(`${API_BASE_URL}/journal-entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journalEntry),
  });

  return response.json();
}

// Get Account Balances with as of date variable, if left blank, should return the latest balances
// Update: Get Account Balances with account code variable, if left blank, should return the latest balances
export async function getAccountBalances(asOfDate = "", accountCode = "") {
  const response = await fetch(
    `${API_BASE_URL}/account-balances?asOfDate=${asOfDate}&accountCode=${accountCode}`,
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
