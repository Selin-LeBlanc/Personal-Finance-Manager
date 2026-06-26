// Actually I don't have any ideas about dashboard yet.
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to Estate Ledger."
      />

      <div className="card-grid">
        <Card title="Accounts">
          <p>View and manage the Chart of Accounts.</p>
        </Card>

        <Card title="Journal Entries">
          <p>Create and review journal entries.</p>
        </Card>

        <Card title="Reports">
          <p>Generate financial reports.</p>
        </Card>
      </div>
    </>
  );
}

export default Dashboard;