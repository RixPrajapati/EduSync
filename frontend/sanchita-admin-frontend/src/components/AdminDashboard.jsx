// src/components/AdminDashboard.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import StatsCards from "./StatsCards";
import NoticesSection from "./NoticesSection";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navbar */}
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Stats Cards */}
          <StatsCards />

          {/* Notices Section */}
          <NoticesSection />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;