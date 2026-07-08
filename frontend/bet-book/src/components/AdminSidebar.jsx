export default function AdminSidebar({ setActiveView }) {
  const links = ["Dashboard", "Users", "Bets"];
  return (
    <div className="w-64 bg-slate-900 h-screen p-4 border-r border-slate-700">
      <h2 className="text-xl font-bold text-white mb-8">Admin Panel</h2>
      {links.map((link) => (
        <button 
          key={link}
          onClick={() => setActiveView(link)}
          className="block w-full text-left p-3 text-slate-300 hover:bg-slate-800 rounded mb-2"
        >
          {link}
        </button>
      ))}
    </div>
  );
}