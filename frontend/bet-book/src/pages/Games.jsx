import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function Games() {
  const { balance, setBalance } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Simulate API data fetching delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, []);

  // 3. Conditional rendering
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">All Sports Matches</h2>
      <p className="my-4">Current Balance: <strong>${balance}</strong></p>
      
      <button 
        onClick={() => setBalance(balance + 50)} 
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add $50 to Balance
      </button>
    </div>
  );
}