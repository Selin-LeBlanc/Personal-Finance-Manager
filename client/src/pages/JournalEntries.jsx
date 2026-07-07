import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Table from "../components/Table";

import {
  getAccounts,
  getJournalEntries,
  createJournalEntry,
} from "../services/api";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(Number(amount || 0));
}
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
    setMessage("");
    const payload = {
      entryDate: formData.entryDate,
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
  if (!response.success) {
    setMessage(response.message || "Failed to create journal entry");
    return;
  }

  setMessage("Journal entry created successfully.");

  setFormData({
    entryDate: "",
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

    const journalEntryRows = journalEntries.flatMap((entry) =>
    entry.lines.map((line) => ({
      id: line.id,
      entryDate: entry.entryDate,
      description: entry.description,
      accountCode: line.account.code,
      accountName: line.account.name,
      debit: line.debit,
      credit: line.credit,
    }))
  );

   const columns = [
    {
      header: "Date",
      accessor: "entryDate",
      render: (row) => new Date(row.entryDate).toLocaleDateString(),
    },
    {
      header: "Account Code",
      accessor: "accountCode",
    },
    {
      header: "Account Name",
      accessor: "accountName",
    },
    {
      header: "Debit",
      accessor: "debit",
      render: (row) => {return formatCurrency(row.debit) },
    },
    {
      header: "Credit",
      accessor: "credit",
      render: (row) => {
        return formatCurrency(row.credit);
      },
    },
    {
      header: "Description",
      accessor: "description",
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
        <Table columns={columns} data={journalEntryRows} />
      </Card>
    </>
  );
}

export default JournalEntries;