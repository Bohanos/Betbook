export default function StatsCards() {
  const stats = [
    { title: "Total Users", val: "1,204" },
    { title: "Active Bets", val: "45" },
    { title: "Daily Volume", val: "$12,400" },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.title} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-slate-400 text-sm">{s.title}</h3>
          <p className="text-2xl font-bold text-white">{s.val}</p>
        </div>
      ))}
    </div>
  );
}