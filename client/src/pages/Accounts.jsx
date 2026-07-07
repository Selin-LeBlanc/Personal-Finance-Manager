import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import Table from "../components/Table";

import { getAccounts } from "../services/api";

// This afunction should fetch the account debit and credit balances too. 
// Should update the getAccounts function instead, it would be cleaner instead of calculating it in here

// Helper function to format currency

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      const response = await getAccounts();
      setAccounts(response.data || []);
    }

    fetchAccounts();
  }, []);
  
  // List of columns for the table, with the following headers: Code, Account Name, Account Type, Balances (total debits - total credits calculation).

  // Currency needs a formatCurrency helper
  const columns = [
    { header: "Code", accessor: "code" },
    { header: "Account Name", accessor: "name"},

    { header: "Debit", accessor: "totalDebits", render: (row) => formatCurrency(row.totalDebits) },
    { header: "Credit", accessor: "totalCredits", render: (row) => formatCurrency(row.totalCredits) },
    { header: "Balance", accessor: "balance", render: (row) => formatCurrency(row.balance) },
  ];

  return (
    <>
      <PageHeader
        title="Chart of Accounts"
        subtitle="Chart of Accounts Balances"
      />
      <Table 
      columns={columns} 
      data={accounts}   
      getRowProps={(row) => ({
        fontWeight: row.parentAccountId ? "normal" : "700",
        textDecoration: row.parentAccountId ? "none" : "underline",
        textIndent: row.parentAccountId ? "20px" : "0px",
      })} />
    </>
  );
}

export default Accounts;