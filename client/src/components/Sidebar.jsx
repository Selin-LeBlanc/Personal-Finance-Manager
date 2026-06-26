function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "accounts", label: "Accounts" },
    { id: "journalEntries", label: "Journal Entries" },
    { id: "reports", label: "Reports" },
    // We can add more menu items here in the future if needed
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Estate Accounting & Administration</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={activePage === item.id ? "active" : ""}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;