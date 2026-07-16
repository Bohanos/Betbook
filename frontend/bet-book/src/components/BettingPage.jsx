import { useState } from 'react';
import BetCard from './BetCard';
import BetSlip from './BetSlip';
import { API_URL } from '../api'; // Ensure this points to your backend URL

export default function BettingPage() {
  const [selectedBet, setSelectedBet] = useState(null);

  // This is passed to BetCard
  const handleSelectBet = (gameId, team, odds) => {
    setSelectedBet({ gameId, team, odds });
  };

  // This handles the API logic
  const handlePlaceBet = async (amount) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/bets/book`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          game_id: selectedBet.gameId,
          amount: parseFloat(amount),
          chosen_team: selectedBet.team
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Bet placed successfully!");
        setSelectedBet(null); // Clear the slip
      } else {
        // This captures the "Insufficient funds" or "Minimum bet" messages
        alert(data.detail || "Failed to place bet.");
      }
    } catch (error) {
      console.error("Betting error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="flex gap-8 p-8">
      {/* Example: You might map over a list of games here later */}
      <BetCard 
        teamA="Team A" 
        teamB="Team B" 
        odds={{ a: 1.5, x: 3.2, b: 2.1 }} 
        onPlaceBet={(oddsValue) => handleSelectBet(1, "Team A", oddsValue)} 
      />
      
      <BetSlip 
        selectedBet={selectedBet} 
        onPlaceBet={handlePlaceBet} 
      />
    </div>
  );
}