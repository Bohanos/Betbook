import { useState } from 'react';

export default function RequestReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/auth/forgot-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form onSubmit={handleRequest} className="p-8 bg-slate-800 rounded-lg shadow-xl text-white w-96 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <p className="text-slate-400 text-sm mb-6 text-center">Enter your email to receive a reset link.</p>
        
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email Address" 
          className="w-full p-3 mb-4 bg-slate-900 rounded border border-slate-600 focus:outline-none focus:border-yellow-500"
          required
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-600 transition-colors disabled:bg-yellow-700"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        
        {message && <p className="mt-4 text-sm text-center text-yellow-400">{message}</p>}
      </form>
    </div>
  );
}