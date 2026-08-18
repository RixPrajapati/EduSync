import { useState, useEffect } from "react";
import { userAPI, courseAPI, attendanceAPI } from "../services/api";

const CARD_META = [
  {
    key: "totalStudents",
    title: "Total Students",
    iconBg: "bg-blue-100", iconColor: "text-blue-600", accent: "border-t-blue-400",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
  {
    key: "totalTeachers",
    title: "Total Teachers",
    iconBg: "bg-emerald-100", iconColor: "text-emerald-600", accent: "border-t-emerald-400",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    key: "overallAttendance",
    title: "Overall Attendance",
    suffix: "%",
    iconBg: "bg-amber-100", iconColor: "text-amber-600", accent: "border-t-amber-400",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
  {
    key: "totalCourses",
    title: "Total Courses",
    iconBg: "bg-violet-100", iconColor: "text-violet-600", accent: "border-t-violet-400",
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  },
];

function StatsCards() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      userAPI.getAll(),
      courseAPI.getAll(),
      attendanceAPI.getOverview(),
    ])
      .then(([users, courses, attendance]) => {
        const courseList = Array.isArray(courses) ? courses : (courses?.data ?? []);
        setStats({
          totalStudents: users.filter((u) => u.role === "STUDENT").length,
          totalTeachers: users.filter((u) => u.role === "TEACHER").length,
          overallAttendance: attendance.overallPercentage,
          totalCourses: courseList.length,
        });
      })
      .catch((err) => setError(err.response?.data?.message ?? err.message));
  }, []);

  if (error) return (
    <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-8">{error}</div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {CARD_META.map((card) => (
        <div
          key={card.key}
          className={`bg-white p-6 rounded-2xl border border-blue-50 border-t-4 ${card.accent} shadow-sm hover:shadow-md hover:shadow-blue-100/60 transition-all duration-200`}
        >
          <div className="flex items-start justify-between mb-4">
            <p className="text-slate-500 text-sm font-medium">{card.title}</p>
            <div className={`${card.iconBg} ${card.iconColor} p-2 rounded-xl shrink-0`}>
              {card.icon}
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">
            {stats ? `${stats[card.key]}${card.suffix ?? ""}` : "…"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
