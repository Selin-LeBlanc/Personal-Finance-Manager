import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />
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