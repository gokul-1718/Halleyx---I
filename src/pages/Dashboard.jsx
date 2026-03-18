import Card from "../components/Card";

export default function Dashboard() {
  return (
    <div className="container">
      <h2>Dashboard</h2>

      <Card>
        <h3>Total Workflows: 1</h3>
        <h3>Status: Active</h3>
      </Card>
    </div>
  );
}