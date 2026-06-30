import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/'); // Redirect to Home
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={handleLogin} className="p-8 bg-slate-800 rounded-lg shadow-xl text-white w-96 border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to BetBook</h2>
        
        {/* Error Message Display */}
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email Address" 
          className="w-full p-3 mb-4 bg-slate-900 rounded border border-slate-600 focus:outline-none focus:border-yellow-500"
          required
        />
        
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="w-full p-3 mb-2 bg-slate-900 rounded border border-slate-600 focus:outline-none focus:border-yellow-500"
          required
        />
        
        <div className="text-right mb-6">
          <Link to="/forgot-password" className="text-xs text-yellow-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button 
          type="submit" 
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-600 transition-colors"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-slate-400">
          Don't have an account? <Link to="/register" className="text-yellow-500 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}