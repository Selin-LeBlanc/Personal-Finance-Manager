import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import JournalEntries from "./pages/JournalEntries";
import Reports from "./pages/Reports";


function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <main className="main-content">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "accounts" && <Accounts />}
        {activePage === "journalEntries" && <JournalEntries />}
        {activePage === "reports" && <Reports />}
      </main>
    </div>
  );
}

export default App;