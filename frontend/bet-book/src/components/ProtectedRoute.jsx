import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/auth" />;
  
  return (
    <div className="text-slate-900"> {/* Consistent text color */}
      {children}
    </div>
  );
}