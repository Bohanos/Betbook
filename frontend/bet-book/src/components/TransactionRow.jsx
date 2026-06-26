export default function TransactionRow({ type, amount, date }) {
  return (
    <tr className="border-b border-slate-100">
      <td className="p-4">{type}</td>
      <td className="p-4 font-mono">{date}</td>
      <td className={`p-4 font-bold ${amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {amount > 0 ? '+' : ''}{amount}
      </td>
    </tr>
  );
}