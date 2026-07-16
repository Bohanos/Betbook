import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import StatsCards from '../components/StatsCards';
import UserManagement from '../components/UserManagement';
import AdminTable from '../components/AdminTable';
import { API_URL } from '../api';

export default function Admin() {
  const [view, setView] = useState("Dashboard");
  const [users, setUsers] = useState([]);
  
  // Example data for Bets
  const betData = [
    { user: "Chinonso", action: "Won $50", date: "2026-07-08" },
    { user: "Bohanos", action: "Lost $10", date: "2026-07-07" }
  ];

  // 1. Fetch Users from your FastAPI backend
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    if (view === "Users") fetchUsers();
  }, [view]);

  // 2. Handle Balance Adjustment
  const handleUpdateBalance = async (userId) => {
    const amount = parseFloat(prompt("Enter new balance:"));
    if (isNaN(amount)) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/admin/users/${userId}/balance?new_balance=${amount}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" // Good practice
        }
      });

      if (response.ok) {
        // 1. Instant UI update
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId ? { ...user, balance: amount } : user
          )
        );
        
        // 2. Optional: Fetch in the background just to be 100% sure the DB matches the UI
        // We don't 'await' this so it doesn't slow down the user experience
        fetchUsers(); 
      } else {
        alert("Failed to update balance.");
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  // 3. Handle Ban (Placeholder for now)
  const handleBanUser = (userId) => {
    alert(`Ban feature for user ${userId} coming soon!`);
  };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      <AdminSidebar setActiveView={setView} />
      <div className="p-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">{view}</h1>
        
        {view === "Dashboard" && <StatsCards />}
        
        {view === "Users" && (
          <UserManagement 
            users={users} 
            onUpdateBalance={handleUpdateBalance} 
            onBanUser={handleBanUser} 
          />
        )}
        
        {view === "Bets" && (
           <AdminTable 
             columns={["User", "Action", "Date"]} 
             data={betData} 
           />
        )}
      </div>
    </div>
  );
}