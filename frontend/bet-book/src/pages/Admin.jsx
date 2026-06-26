import AdminTable from '../components/AdminTable';

export default function Admin() {
  const mockData = [{user: "JohnDoe", action: "Deposit", date: "2026-06-15"}];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <AdminTable data={mockData} />
    </div>
  );
}