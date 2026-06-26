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

  
}

export default JournalEntries;