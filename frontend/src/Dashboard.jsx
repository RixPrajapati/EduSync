import { useState } from "react";
import StudentSidebar from "./components-student/StudentSidebar";
import StudentOverview from "./components-student/StudentOverview";
import AttendanceTable from "./components/AttendanceTable";
import MarksCard from "./components/MarksCard";
import AssignmentsCard from "./components/AssignmentsCard";
import FeeStatusCard from "./components/FeeStatusCard";
import NoticeBoard from "./components/NoticeBoard";
import SupportCard from "./components/SupportCard";

function SectionHeader({ title, subtitle, gradient }) {
  return (
    <div className={`bg-gradient-to-r ${gradient} px-6 py-5 rounded-t-2xl`}>
      <h1 className="text-lg font-bold text-white">{title}</h1>
      <p className="text-sm text-white/70 mt-0.5">{subtitle}</p>
    </div>
  );
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleItemClick = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-blue-50/40">
      <StudentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeSection}
        onItemClick={handleItemClick}
      />

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-blue-100 px-6 py-4 flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-500 hover:bg-blue-50 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-base font-bold text-slate-800">Student Panel</h1>
        </header>

        <main className="p-8 space-y-5">
          {activeSection === "dashboard" && (
            <>
              <StudentOverview />
              <NoticeBoard />
              <SupportCard />
            </>
          )}

          {activeSection === "attendance" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <SectionHeader title="Attendance" subtitle="Your attendance across all courses" gradient="from-sky-600 via-sky-500 to-cyan-500" />
              <AttendanceTable />
            </div>
          )}

          {activeSection === "marks" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <SectionHeader title="Marks & Performance" subtitle="Your published results" gradient="from-violet-600 via-violet-500 to-purple-500" />
              <MarksCard />
            </div>
          )}

          {activeSection === "assignments" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <SectionHeader title="Assignments" subtitle="Submit and track your assignments" gradient="from-amber-500 via-orange-500 to-red-500" />
              <AssignmentsCard />
            </div>
          )}

          {activeSection === "fees" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <SectionHeader title="Fee Status" subtitle="Your payment history and dues" gradient="from-emerald-600 via-emerald-500 to-teal-500" />
              <FeeStatusCard />
            </div>
          )}

          {activeSection === "notices" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <SectionHeader title="Notices & Announcements" subtitle="Latest updates from your institution" gradient="from-blue-600 to-indigo-500" />
              <NoticeBoard bare />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
