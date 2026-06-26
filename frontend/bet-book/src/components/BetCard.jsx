export default function BetCard({ teamA, teamB, odds, onPlaceBet }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-yellow-500 transition">
      <div className="flex justify-between mb-4">
        <span className="font-semibold text-slate-800">{teamA} vs {teamB}</span>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onPlaceBet(odds.a)} 
          className="flex-1 bg-slate-900 text-white py-2 rounded hover:bg-yellow-500 transition"
        >
          1: {odds.a}
        </button>
        
        <button 
          onClick={() => onPlaceBet(odds.x)} 
          className="flex-1 bg-slate-900 text-white py-2 rounded hover:bg-yellow-500 transition"
        >
          X: {odds.x}
        </button>
        
        <button 
          onClick={() => onPlaceBet(odds.b)} 
          className="flex-1 bg-slate-900 text-white py-2 rounded hover:bg-yellow-500 transition"
        >
          2: {odds.b}
        </button>
      </div>
    </div>
  );
}