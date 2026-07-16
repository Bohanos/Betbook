import { useState } from 'react';

export default function BetSlip({ selectedBet, onPlaceBet }) {
  const [amount, setAmount] = useState("");

  if (!selectedBet) {
    return (
      <div className="bg-slate-900 text-white p-6 rounded-2xl w-80 shadow-2xl">
        <h2 className="text-lg font-bold mb-4">Your Bet Slip</h2>
        <p className="text-slate-400 text-sm">No bets selected yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl w-80 shadow-2xl">
      <h2 className="text-lg font-bold mb-4">Your Bet Slip</h2>
      <div className="mb-4 text-sm">
        <p>Selection: {selectedBet.team}</p>
        <p>Odds: {selectedBet.odds}</p>
      </div>
      <input 
        type="number" 
        placeholder="Stake Amount" 
        className="w-full p-2 mb-4 text-black rounded"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button 
        onClick={() => onPlaceBet(amount)} 
        className="w-full bg-yellow-500 text-slate-900 py-3 rounded-lg font-bold"
      >
        Place Bet
      </button>
    </div>
  );
}