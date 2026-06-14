import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FeeStatusCard from './components/FeeStatusCard';
import SupportCard from './components/SupportCard';
import AttendanceTable from './components/AttendanceTable';
import MarksCard from './components/MarksCard';
import NoticeBoard from './components/NoticeBoard';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b px-4 sm:px-6 py-3">
          <Header onMenuToggle={() => setSidebarOpen(true)} />
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">

          {/* Top Row: Fee Status + Marks & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <FeeStatusCard />
            </div>
            <div className="lg:col-span-7">
              <MarksCard />
            </div>
          </div>

          {/* Bottom Row: Attendance Overview + Notices */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Attendance Overview - Wider */}
            <div className="lg:col-span-7">
              <AttendanceTable />
            </div>

            {/* Notices Column */}
            <div className="lg:col-span-5 space-y-6">
              <NoticeBoard />
              <SupportCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;