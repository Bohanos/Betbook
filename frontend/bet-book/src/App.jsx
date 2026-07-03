import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login'; 
import RequestReset from './pages/RequestReset'; 
import ResetPassword from './pages/ResetPassword'; 
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import Games from './pages/Games';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Verify from './pages/Verify';
import Register from './pages/Register';


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/verify" element={<Verify />} />
              <Route path="/forgot-password" element={<RequestReset />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider> 
    </Router>
  );
}