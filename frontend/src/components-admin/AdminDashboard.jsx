// src/components/AdminDashboard.jsx
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import StatsCards from "./StatsCards";
import NoticesSection from "./NoticesSection";
import UserManagementTable from "./UserManagementTable";
import FeeCollectionSection from "./FeeCollectionSection";
import AcademicManagement from "./AcademicManagement";
import AttendanceSection from "./AttendanceSection";
import MarksSection from "./MarksSection";
import AssignmentsSection from "./AssignmentsSection";
import TimetableSection from "./TimetableSection";

const sectionTitles = {
  dashboard: "Dashboard",
  users: "User Management",
  fees: "Fee Collection",
  notices: "Notices & Announcements",
  attendance: "Attendance",
  marks: "Marks",
  assignments: "Assignments",
  courses: "Courses",
  timetable: "Timetable",
};


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
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} onAddStudent={() => handleItemClick("users")} />

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
          {activeSection === "courses" && <AcademicManagement />}
          {activeSection === "attendance"  && <AttendanceSection />}
          {activeSection === "marks"       && <MarksSection />}
          {activeSection === "assignments" && <AssignmentsSection />}
          {activeSection === "timetable"   && <TimetableSection />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
