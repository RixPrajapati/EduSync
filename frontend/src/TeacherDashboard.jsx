import { useState } from "react";
import TeacherSidebar from "./components-teacher/TeacherSidebar";
import TeacherOverview from "./components-teacher/TeacherOverview";
import TeacherAttendanceSection from "./components-teacher/TeacherAttendanceSection";
import TeacherMarksSection from "./components-teacher/TeacherMarksSection";
import TeacherAssignmentsSection from "./components-teacher/TeacherAssignmentsSection";
import TeacherNoticesSection from "./components-teacher/TeacherNoticesSection";

function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleItemClick = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-violet-50/40">
      <TeacherSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeSection}
        onItemClick={handleItemClick}
      />

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-violet-100 px-6 py-4 flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-500 hover:bg-violet-50 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-base font-bold text-slate-800">Teacher Panel</h1>
        </header>

        <main className="p-8">
          {activeSection === "dashboard" && <TeacherOverview />}
          {activeSection === "attendance" && <TeacherAttendanceSection />}
          {activeSection === "marks" && <TeacherMarksSection />}
          {activeSection === "assignments" && <TeacherAssignmentsSection />}
          {activeSection === "notices" && <TeacherNoticesSection />}
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
