import logo from '../assets/Betbook logo.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  // We destructure everything cleanly in one single line
  const { user, setUser, balance } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
      <Link to="/"><img src={logo} alt="BetBook Logo" className="h-20 w-auto" /></Link>
      
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-yellow-400">Live</Link>
        <Link to="/games" className="hover:text-yellow-400">Games</Link>
        <Link to="/my-bookings" className="hover:text-yellow-400">My Bets</Link>
        <Link to="/admin" className="hover:text-yellow-400">Admin</Link>
        
        {/* Swaps out the Login button for a profile pill + logout when user exists */}
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-slate-800 px-3 py-1.5 rounded-full text-slate-300 border border-slate-700">
              👤 {user.email}
            </span>
            <button 
              onClick={() => setUser(null)} // Wipes context state to log out instantly
              className="text-sm text-red-400 hover:text-red-500 hover:underline cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" className="bg-yellow-500 px-4 py-2 rounded text-black font-bold hover:bg-yellow-600 transition-colors">
            Login
          </Link>
        )}
        
        <div className="bg-slate-800 px-4 py-2 rounded-lg font-mono border border-slate-700">
          Balance: ${balance ? balance.toFixed(2) : "0.00"}
        </div>
      </div>
    </nav>
  );
}