import { useState } from 'react';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Get token from URL: http://localhost:5173/reset-password?token=XYZ
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    try {
      const response = await fetch(`http://localhost:8000/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Success! You can now log in.");
        // Optional: Redirect after 2 seconds
        setTimeout(() => window.location.href = "/login", 2000);
      } else {
        setMessage(data.detail || "Update failed.");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form onSubmit={handleReset} className="p-8 bg-slate-800 rounded-lg shadow-xl text-white w-96">
        <h2 className="text-xl font-bold mb-4">Set New Password</h2>
        <input 
          type="password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password" 
          className="w-full p-3 mb-4 bg-slate-900 rounded border border-slate-600"
          required
        />
        <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black py-3 rounded">
          {loading ? "Updating..." : "Update Password"}
        </button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}