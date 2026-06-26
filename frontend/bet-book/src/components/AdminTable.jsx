export default function AdminTable({ data }) {
  return (
    <table className="w-full text-left bg-white rounded-lg overflow-hidden shadow">
      <thead className="bg-slate-100 uppercase text-xs text-slate-500">
        <tr>
          <th className="p-4">User</th>
          <th className="p-4">Action</th>
          <th className="p-4">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b">
            <td className="p-4">{row.user}</td>
            <td className="p-4">{row.action}</td>
            <td className="p-4">{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}