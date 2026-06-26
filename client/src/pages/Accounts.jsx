import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import Table from "../components/Table";

import { getAccounts } from "../services/api";

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      const response = await getAccounts();
      setAccounts(response.data || []);
    }

    fetchAccounts();
  }, []);
  
  const columns = [
    { header: "Code", accessor: "code" },
    { header: "Account Name", accessor: "name" },
    { header: "Account Type", accessor: "type" },
    { header: "Balance", accessor: "normalBalance" },
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