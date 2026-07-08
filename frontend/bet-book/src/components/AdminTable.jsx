export default function AdminTable({ columns, data }) {
  return (
    <table className="w-full text-left bg-slate-800 rounded-lg overflow-hidden shadow border border-slate-700">
      <thead className="bg-slate-900 uppercase text-xs text-slate-400">
        <tr>
          {columns.map((col) => <th key={col} className="p-4">{col}</th>)}
        </tr>
      </thead>
      <tbody className="text-white">
        {data.map((row, i) => (
          <tr key={i} className="border-b border-slate-700">
            {columns.map((col) => (
              <td key={col} className="p-4">{row[col.toLowerCase()]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}