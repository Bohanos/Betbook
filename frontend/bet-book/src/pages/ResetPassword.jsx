import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Gets the token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/reset-password", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.detail || "Error resetting password.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form onSubmit={handleReset} className="p-8 bg-slate-800 rounded-lg shadow-xl text-white w-96 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-center">Set New Password</h2>
        
        <input 
          type="password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="Enter new password" 
          className="w-full p-3 mb-4 bg-slate-900 rounded border border-slate-600 focus:outline-none focus:border-yellow-500"
          required
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-600 transition-colors disabled:bg-yellow-700"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
        
        {message && <p className="mt-4 text-sm text-center text-yellow-400">{message}</p>}
      </form>
    </div>
  );
}