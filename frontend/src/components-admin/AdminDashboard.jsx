// src/components/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import StatsCards from "./StatsCards";
import NoticesSection from "./NoticesSection";
import UserManagementTable from "./UserManagementTable";
import FeeCollectionSection from "./FeeCollectionSection";

const sectionTitles = {
  dashboard: "Dashboard",
  users: "User Management",
  fees: "Fee Collection",
  notices: "Notices & Announcements",
  attendance: "Attendance",
  marks: "Marks",
  assignments: "Assignments",
  courses: "Courses",
};

function ComingSoon({ section }) {
  return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-16 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">{sectionTitles[section]} — Coming Soon</h3>
      <p className="text-sm text-slate-400">This section is under development.</p>
    </div>
  );
}

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarActiveItem, setSidebarActiveItem] = useState("dashboard");

  const statsRef = useRef(null);
  const noticesRef = useRef(null);
  const usersRef = useRef(null);

  useEffect(() => {
    if (activeSection !== "dashboard") return;

    const handleScroll = () => {
      const sections = [
        { ref: statsRef, id: "dashboard" },
        { ref: noticesRef, id: "notices" },
        { ref: usersRef, id: "users" },
      ];
      const trigger = window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].ref.current;
        if (el && el.getBoundingClientRect().top <= trigger) {
          setSidebarActiveItem(sections[i].id);
          return;
        }
      }
      setSidebarActiveItem("dashboard");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleItemClick = (id) => {
    setActiveSection(id);
    setSidebarActiveItem(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-blue-50/40">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={sidebarActiveItem}
        onItemClick={handleItemClick}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Navbar */}
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Dashboard Content */}
        <main className="p-8">
          {activeSection === "dashboard" && (
            <>
              <div ref={statsRef}>
                <StatsCards />
              </div>
              <div ref={noticesRef}>
                <NoticesSection />
              </div>
              <div ref={usersRef}>
                <UserManagementTable />
              </div>
            </>
          )}
          {activeSection === "users" && <UserManagementTable />}
          {activeSection === "fees" && <FeeCollectionSection />}
          {activeSection === "notices" && <NoticesSection />}
          {["attendance", "marks", "assignments", "courses"].includes(activeSection) && (
            <ComingSoon section={activeSection} />
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
