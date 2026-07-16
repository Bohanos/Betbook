import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setMessage(data.message || "Registration successful! Please check your email.");
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleRegister} className="p-8 bg-slate-800 rounded-lg shadow-xl text-white w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter a Valid Email Address" className="w-full p-3 mb-4 bg-slate-900 rounded border border-slate-600" required />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-4 bg-slate-900 rounded border border-slate-600" required />
        <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-3 rounded">Register</button>
        <p className="mt-4 text-sm text-center">Already have an account? <Link to="/login" className="text-yellow-500">Log in</Link></p>
        {message && <p className="mt-4 text-center text-sm text-green-400">{message}</p>}
      </form>
    </div>
  );
}