import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Table from "../components/Table";

import {
  getAccounts,
  getJournalEntries,
  createJournalEntry,
} from "../services/api";


function JournalEntries() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [entryDateFilter, setEntryDateFilter] = useState("");
  const [accountCodeFilter, setAccountCodeFilter] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  // Form data will include the following fields: date, description, account code, debit amount, credit amount
  const [formData, setFormData] = useState({
    entryDate: "",
    description: "",
    lines: [
      { accountId: "", debit: "", credit: "", memo: "" },
      { accountId: "", debit: "", credit: "", memo: "" },
    ],
  });

  // We will load the Journal entries with filters and then the accounts, then setJournalEntries and setAccounts, respectively.

  async function loadJournalEntries(filters = {}) {
    const response = await getJournalEntries(filters);
    if (response.success) {
      setJournalEntries(response.data || []);
    } else {
      setMessage("Failed to load journal entries");
    }
  }
  async function loadAccounts() {
    const response = await getAccounts();
    if (response.success) {
      setAccounts(response.data || []);
    } else {
      setMessage("Failed to load accounts");
    }
  }
// loadJournnal entries is throwing an error, will check the API call
  useEffect(() => {
    loadJournalEntries();
    loadAccounts();
  }, []);

  // Event handlers for the filters

  function handleSearch(event) {
    event.preventDefault();
    loadJournalEntries({
      asOfDate: entryDateFilter, 
      accountCode: accountCodeFilter,
    });
  }

  function handleClearSearch() {
    setEntryDateFilter("");
    setAccountCodeFilter("");
    loadJournalEntries();
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  // This is spooky, copilot can guess correctly what I'm goint to handle next. 
  function handleLineChange(index, event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const newLines = [...prevData.lines];
      newLines[index][name] = value;
      return { ...prevData, lines: newLines };
    });
  }

  function handleAddLine() {
    setFormData((prevData) => ({
      ...prevData,
      lines: [...prevData.lines, { accountId: "", debit: "", credit: "", memo: "" }],
    }));
  }
async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      entryDate: formData.entryDate,
      description: formData.description,
      status: "POSTED", // Right now I'm only using POSTED status, but in the future, we can add a DRAFT status and a way to change the status of a journal entry
      lines: formData.lines.map((line) => ({
        accountId: line.accountId,
        debit: parseFloat(line.debit) || 0,
        credit: parseFloat(line.credit) || 0,
        memo: line.memo,
      })),
    }
    const response = await createJournalEntry(payload);
    if (response.success) {
      setMessage("Journal entry created successfully");
      setShowForm(false);
      loadJournalEntries();
    } else {
      setMessage("Failed to create journal entry");
    }

    setFormData({
      entryDate: "",
      description: "",
      lines: [
        { accountId: "", debit: "", credit: "", memo: "" },
        { accountId: "", debit: "", credit: "", memo: "" },
      ],
    });

    setShowForm(false);
    loadJournalEntries();
  }

   const columns = [
    {
      header: "Date",
      accessor: "entryDate",
      render: (row) => new Date(row.entryDate).toLocaleDateString(),
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Lines",
      accessor: "lines",
      render: (row) => row.lines.length,
    },
  ];

  // That was a lot...

  return (
    <>
      <PageHeader
        title="Journal Entries"
        subtitle="Create and review double-entry journal entries."
      />

      <Card>

      </Card>

      <Card title="Search Journal Entries">
        <form className="form-grid" onSubmit={handleSearch}>
          <label>
            Entry Date
            <input
              type="date"
              value={entryDateFilter}
              onChange={(event) => setEntryDateFilter(event.target.value)}
            />
          </label>

          <label>
            Account Code
            <input
              type="text"
              value={accountCodeFilter}
              onChange={(event) => setAccountCodeFilter(event.target.value)}
              placeholder="Example: 11100"
            />
          </label>

          <div className="button-row">
            <button type="submit" className="primary-button">
              Search
            </button>

            <button type="button" className="secondary-button" onClick={handleClearSearch}>
              Clear
            </button>
          </div>
        </form>
      </Card>

      <Card title="Journal Entries">
        <Table columns={columns} data={journalEntries} />
      </Card>
    </>
  );
}

export default JournalEntries;