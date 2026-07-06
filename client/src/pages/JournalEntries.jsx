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

  // Form data will include the following fields: date, account code, debit amount, credit amount

  // This needs to be updated to include multiple lines, so we will have an array of lines, each line will have an account code, debit amount, credit amount, and memo. 
  const [formData, setFormData] = useState({
    entryDate: "",
    lines: [
      { accountCode: "", debit: "", credit: "", memo: "" },
      { accountCode: "", debit: "", credit: "", memo: "" },
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
// loadJournnal entries is throwing an error, will check the API call.
// Instead of useEffect = {loadJournalEntries, loadAccounts} copilot suggested an async function in case we want to load both at the same time, which is not a bad idea. Good job copilot!
  useEffect(() => {
    const initializePageData = async () => {
      await Promise.all([loadJournalEntries(), loadAccounts()]);
    };

    void initializePageData();
  }, []);

  // Event handlers for the filters

  function handleSearch(event) {
    event.preventDefault();
    loadJournalEntries({
      entryDate: entryDateFilter, 
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
  function handleLineChange(index, fieldOrEvent, fieldValue) {
    const name = typeof fieldOrEvent === "string" ? fieldOrEvent : fieldOrEvent.target.name;
    const value = typeof fieldOrEvent === "string" ? fieldValue : fieldOrEvent.target.value;
    setFormData((prevData) => {
      const newLines = [...prevData.lines];
      newLines[index][name] = value;
      return { ...prevData, lines: newLines };
    });
  }

  function handleAddLine() {
    setFormData((prevData) => ({
      ...prevData,
      lines: [...prevData.lines, { accountCode: "", debit: "", credit: "", memo: "" }],
    }));
  }
async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      asOfDate: formData.entryDate,
      description: formData.description,
      status: "POSTED", // Right now I'm only using POSTED status, but in the future, we can add a DRAFT status and a way to change the status of a journal entry
      lines: formData.lines.map((line) => ({
        accountCode: line.accountCode,
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
      asOfDate: "",
      description: "",
      lines: [
        { accountCode: "", debit: "", credit: "", memo: "" },
        { accountCode: "", debit: "", credit: "", memo: "" },
      ],
    });

    setShowForm(false);
    loadJournalEntries();
  }
    
  // Table columns for the journal entries table, shoudl display journal entry date, description, Debit account and amount, credit account and amount.
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
      header: "Debit Account",
      accessor: "debitAccount",
      render: (row) => {
        const debitLine = row.lines.find((line) => line.debit > 0);
        return debitLine?.account?.name || "";
      },
    },
    {
      header: "Debit",
      accessor: "debit",
      render: (row) => {
        const debitLine = row.lines.find((line) => line.debit > 0);
        return debitLine
          ? `$${Number(debitLine.debit).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "";
      },
    },
    {
      header: "Credit Account",
      accessor: "creditAccount",
      render: (row) => {
        const creditLine = row.lines.find((line) => line.credit > 0);
        return creditLine?.account?.name || "";
      },
    },
    {
      header: "Credit",
      accessor: "credit",
      render: (row) => {
        const creditLine = row.lines.find((line) => line.credit > 0);
        return creditLine
          ? `$${Number(creditLine.credit).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "";
      },
    },
  ];

  // That was a lot...

  return (
    <>
      <PageHeader
        title="Journal Entries"
        subtitle="Create and review journal entries."
      />

      <Card>
        <div className="toolbar">
          <button className="primary-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add New Journal Entry"}
          </button>
        </div>

        {message && <p className="message">{message}</p>}

        {showForm && (
          <form className="form-section" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Entry Date
                <input
                  type="date"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Description
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </label>
            </div>

            <h3>Journal Lines</h3>

            {formData.lines.map((line, index) => (
              <div className="journal-line-grid" key={index}>
                <label>
                  Account
                  <select
                    value={line.accountCode}
                    onChange={(event) =>
                      handleLineChange(index, "accountCode", event.target.value)
                    }
                    required
                  >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.code}>
                        {account.code} - {account.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Debit
                  
                  <input
                    type="text"
                    value={line.debit}
                    onChange={(event) =>
                      handleLineChange(index, "debit", event.target.value)
                    }
                  />
                </label>

                <label>
                  Credit
                  <input
                    type="text"

                    value={line.credit}
                    onChange={(event) =>
                      handleLineChange(index, "credit", event.target.value)
                    }
                  />
                </label>

                <label>
                  Memo
                  <input
                    type="text"
                    value={line.memo}
                    onChange={(event) =>
                      handleLineChange(index, "memo", event.target.value)
                    }
                  />
                </label>
              </div>
            ))}

            <button type="button" className="secondary-button" onClick={handleAddLine}>
              + Add Line
            </button>

            <button type="submit" className="primary-button">
              Save Journal Entry
            </button>
          </form>
        )}
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