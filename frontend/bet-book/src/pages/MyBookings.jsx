import { useEffect, useState } from 'react';
import { API_URL } from '../api';
import BetSlip from '../components/BetSlip';

export default function MyBookings() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    const fetchMyBets = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/bets/my-bets`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBets(data);
      }
    };
    fetchMyBets();
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">My Bet History</h1>
      <table className="w-full bg-slate-800 rounded-lg">
        <thead>
          <tr>
            <th className="p-3">Team</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bets.map((bet) => (
            <tr key={bet.id} className="border-b border-slate-700">
              <td className="p-3">{bet.chosen_team}</td>
              <td className="p-3">${bet.amount}</td>
              <td className="p-3 capitalize">{bet.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}