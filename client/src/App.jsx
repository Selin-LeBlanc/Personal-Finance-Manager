import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Estate Ledger</h2>

        <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
        <button onClick={() => setActivePage("accounts")}>Accounts</button>
        <button onClick={() => setActivePage("journalEntries")}>
          Journal Entries
        </button>
        <button onClick={() => setActivePage("reports")}>Reports</button>
      </aside>

      <main className="main-content">
        {activePage === "dashboard" && <h1>Dashboard</h1>}
        {activePage === "accounts" && <h1>Accounts</h1>}
        {activePage === "journalEntries" && <h1>Journal Entries</h1>}
        {activePage === "reports" && <h1>Reports</h1>}
      </main>
    </div>
  );
}

export default App;