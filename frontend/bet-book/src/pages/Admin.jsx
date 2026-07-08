// Admin.jsx
import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import StatsCards from '../components/StatsCards';
import UserManagement from '../components/UserManagement';
import AdminTable from '../components/AdminTable'; // Import the reusable table

export default function Admin() {
  const [view, setView] = useState("Dashboard");
  
  // Example data for Bets
  const betData = [
    { user: "Chinonso", action: "Won $50", date: "2026-07-08" },
    { user: "Bohanos", action: "Lost $10", date: "2026-07-07" }
  ];

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      <AdminSidebar setActiveView={setView} />
      <div className="p-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">{view}</h1>
        
        {view === "Dashboard" && <StatsCards />}
        {view === "Users" && <UserManagement users={[]} />}
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