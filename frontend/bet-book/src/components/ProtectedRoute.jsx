// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);

  // 1. Check if logged in
  if (!user) return <Navigate to="/login" />;
  
  // 2. If the route is admin-only, check for admin status
  if (adminOnly && !user.is_admin) return <Navigate to="/" />;
  
  return (
    <div className="text-slate-900">
      {children}
    </div>
  );
}