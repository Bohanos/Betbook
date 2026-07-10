export default function UserManagement({ users, onUpdateBalance, onBanUser }) {
  return (
    <table className="w-full text-white bg-slate-800 rounded-lg">
      <thead className="border-b border-slate-700">
        <tr>
          <th className="p-3">Email</th>
          <th className="p-3">Balance</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-b border-slate-700">
            <td className="p-3">{u.email}</td>
            <td className="p-3">${u.balance}</td>
            <td className="p-3 flex gap-2">
              <button onClick={() => onBanUser(u.id)} className="bg-red-600 px-2 py-1 rounded text-xs hover:bg-red-700">Ban</button>
              <button onClick={() => onUpdateBalance(u.id)} className="bg-yellow-600 px-2 py-1 rounded text-xs hover:bg-yellow-700">Adjust</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}