import { useState } from 'react';
import { API_URL } from '../api';

export default function RequestReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); 

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }) 
      });
      
      const data = await response.json();

      if (response.ok) {
        setMessage("If this email exists, a reset link has been sent.");
      } else {
        setMessage(data.detail || "Failed to send reset link.");
      }
    } catch (error) {
      setMessage("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form onSubmit={handleRequest} className="p-8 bg-slate-800 rounded-lg shadow-xl text-white w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email Address" 
          className="w-full p-3 mb-4 bg-slate-900 rounded border border-slate-600"
          required
        />
        <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black font-bold py-3 rounded">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="mt-4 text-sm text-center text-yellow-400">{message}</p>}
      </form>
    </div>
  );
}