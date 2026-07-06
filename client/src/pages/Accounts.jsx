import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import Table from "../components/Table";

import { getAccounts } from "../services/api";

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      const response = await getAccounts();
      const accountBalances = response.data.map((account) => {
        const balance = account.journalLines.reduce((acc, line) => {
          return acc + (line.debit - line.credit);
        }, 0);

        return {
          ...account,
          balance,
        };
      });
      setAccounts(accountBalances || []);
    }

    fetchAccounts();
  }, []);
  
  // List of columns for the table, with the following headers: Code, Account Name, Account Type, Balance (total debits - total credits calculation).
  const columns = [
    { header: "Code", accessor: "code" },
    { header: "Account Name", accessor: "name" },
    { header: "Account Type", accessor: "type" },
    { header: "Balance", accessor: "balance" },
  ];

  return (
    <>
      <PageHeader
        title="Chart of Accounts"
        subtitle="Manage estate accounts."
      />
      <Table columns={columns} data={accounts} />
    </>
  );
}

export default Accounts;