import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import BetCard from '../components/BetCard';

export default function Home() {
  const { balance, setBalance } = useContext(AuthContext);

  const placeBet = (amount) => {
    if (balance >= amount) {
      setBalance(balance - amount); 
      alert("Bet placed!");
    } else {
      alert("Insufficient funds!");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Live Games</h2>
      <p className="mb-4 text-slate-600">Your current balance: ${balance}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BetCard 
          teamA="Lakers" 
          teamB="Celtics" 
          odds={{a: 1.5, x: 3.2, b: 2.1}} 
          onPlaceBet={() => placeBet(100)} 
        />
      </div>
    </div>
  );
}