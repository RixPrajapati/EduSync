import { useState } from "react";

const subjectData = [
  { subject: "Web Development",      course: "BCA", avg: 74, passRate: 92 },
  { subject: "Data Structures",      course: "BCA", avg: 68, passRate: 85 },
  { subject: "Network Security",     course: "BIT", avg: 71, passRate: 88 },
  { subject: "Cloud Computing",      course: "BIT", avg: 65, passRate: 80 },
  { subject: "Digital Marketing",    course: "BBA", avg: 78, passRate: 95 },
  { subject: "Financial Accounting", course: "BBA", avg: 62, passRate: 76 },
  { subject: "Strategic Management", course: "MBA", avg: 80, passRate: 96 },
  { subject: "Quantum Mechanics",    course: "BSc", avg: 55, passRate: 68 },
  { subject: "Thermodynamics",       course: "BSc", avg: 60, passRate: 74 },
];

const gradeDistribution = [
  { grade: "A", count: 142, color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-700" },
  { grade: "B", count: 310, color: "bg-blue-500",    light: "bg-blue-50 text-blue-700"    },
  { grade: "C", count: 425, color: "bg-amber-400",   light: "bg-amber-50 text-amber-700"  },
  { grade: "D", count: 187, color: "bg-orange-400",  light: "bg-orange-50 text-orange-700"},
  { grade: "F", count: 136, color: "bg-red-500",     light: "bg-red-50 text-red-700"      },
];

const backlogStudents = [
  { id: 1, name: "Priya Tamang",   course: "BCA", dept: "FOE", failed: 2 },
  { id: 2, name: "Rajan Gurung",   course: "BSc", dept: "FOS", failed: 3 },
  { id: 3, name: "Arjun Khanal",   course: "BIT", dept: "FOE", failed: 1 },
  { id: 4, name: "Sita Maharjan",  course: "BBA", dept: "FOM", failed: 2 },
];

// Per-student marks: subjects vary by course
const studentMarks = [
  {
    id: 1, name: "Ananya Singh", course: "BCA", dept: "FOE",
    subjects: { "Web Development": 55, "Data Structures": 48 },
  },
  {
    id: 2, name: "Bikash Shrestha", course: "BCA", dept: "FOE",
    subjects: { "Web Development": 82, "Data Structures": 76 },
  },
  {
    id: 3, name: "Nisha Poudel", course: "BCA", dept: "FOE",
    subjects: { "Web Development": 91, "Data Structures": 88 },
  },
  {
    id: 4, name: "Aarav Joshi", course: "BCA", dept: "FOE",
    subjects: { "Web Development": 78, "Data Structures": 84 },
  },
  {
    id: 5, name: "Arjun Khanal", course: "BIT", dept: "FOE",
    subjects: { "Network Security": 65, "Cloud Computing": 52 },
  },
  {
    id: 6, name: "Ramesh Thapa", course: "BIT", dept: "FOE",
    subjects: { "Network Security": 88, "Cloud Computing": 79 },
  },
  {
    id: 7, name: "Deepa Karki", course: "BIT", dept: "FOE",
    subjects: { "Network Security": 73, "Cloud Computing": 68 },
  },
  {
    id: 8, name: "Priya Tamang", course: "BBA", dept: "FOM",
    subjects: { "Digital Marketing": 74, "Financial Accounting": 45 },
  },
  {
    id: 9, name: "Sunita Rai", course: "BBA", dept: "FOM",
    subjects: { "Digital Marketing": 85, "Financial Accounting": 72 },
  },
  {
    id: 10, name: "Dinesh Basnet", course: "BBA", dept: "FOM",
    subjects: { "Digital Marketing": 68, "Financial Accounting": 58 },
  },
  {
    id: 11, name: "Sita Maharjan", course: "MBA", dept: "FOM",
    subjects: { "Strategic Management": 78 },
  },
  {
    id: 12, name: "Puja KC", course: "MBA", dept: "FOM",
    subjects: { "Strategic Management": 92 },
  },
  {
    id: 13, name: "Rohan Adhikari", course: "MBA", dept: "FOM",
    subjects: { "Strategic Management": 85 },
  },
  {
    id: 14, name: "Rajan Gurung", course: "BSc", dept: "FOS",
    subjects: { "Quantum Mechanics": 42, "Thermodynamics": 38 },
  },
  {
    id: 15, name: "Kumar Limbu", course: "BSc", dept: "FOS",
    subjects: { "Quantum Mechanics": 65, "Thermodynamics": 70 },
  },
  {
    id: 16, name: "Mina Shakya", course: "BSc", dept: "FOS",
    subjects: { "Quantum Mechanics": 72, "Thermodynamics": 68 },
  },
];

const getAvg = (subjects) => {
  const vals = Object.values(subjects);
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
};

const getGrade = (avg) => {
  if (avg >= 80) return "A";
  if (avg >= 65) return "B";
  if (avg >= 50) return "C";
  if (avg >= 40) return "D";
  return "F";
};

const gradeStyle = {
  A: "bg-emerald-100 text-emerald-700",
  B: "bg-blue-100 text-blue-700",
  C: "bg-amber-100 text-amber-700",
  D: "bg-orange-100 text-orange-700",
  F: "bg-red-100 text-red-600",
};

const totalStudents = gradeDistribution.reduce((s, g) => s + g.count, 0);
const passCount     = gradeDistribution.filter((g) => g.grade !== "F").reduce((s, g) => s + g.count, 0);
const avgMarks      = Math.round(subjectData.reduce((s, sb) => s + sb.avg, 0) / subjectData.length);
const passPct       = Math.round((passCount / totalStudents) * 100);

function StatBox({ label, value, sub, bg, text, icon }) {
  return (
    <div className={`${bg} rounded-2xl p-5 flex items-center gap-4`}>
      <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <p className={`text-2xl font-bold leading-none ${text}`}>{value}</p>
        <p className={`text-xs font-semibold mt-1 ${text} opacity-80`}>{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function MarksSection() {
  const [tab, setTab] = useState("overview");
  const [courseFilter, setCourseFilter] = useState("all");
  const [byCourseFilter, setByCourseFilter] = useState("BCA");

  const courses = [...new Set(subjectData.map((s) => s.course))];
  const filteredSubjects = courseFilter === "all"
    ? subjectData
    : subjectData.filter((s) => s.course === courseFilter);

  const maxCount = Math.max(...gradeDistribution.map((g) => g.count));

  const byCourseStudents = studentMarks.filter((s) => s.course === byCourseFilter);
  const byCourseSubjects = byCourseStudents.length > 0
    ? Object.keys(byCourseStudents[0].subjects)
    : [];

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportOverview = () => {
    const headers = ["Subject", "Course", "Avg Marks", "Pass Rate"];
    const rows = filteredSubjects.map((s) => [s.subject, s.course, `${s.avg}%`, `${s.passRate}%`]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, "marks-report.csv", "text/csv");
  };

  const handleExportByCourse = () => {
    const headers = ["Student", "Course", "Dept", ...byCourseSubjects, "Average", "Grade"];
    const rows = byCourseStudents.map((s) => {
      const avg = getAvg(s.subjects);
      return [s.name, s.course, s.dept, ...byCourseSubjects.map((sub) => s.subjects[sub] ?? "-"), `${avg}%`, getGrade(avg)];
    });
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, `marks-${byCourseFilter}.csv`, "text/csv");
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-purple-500 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Academic Performance</h1>
              <p className="text-sm text-white/70 mt-0.5">Marks, grades and subject-wise results</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox
            label="Average Marks" value={`${avgMarks}%`} sub="College-wide"
            bg="bg-violet-50" text="text-violet-700"
            icon={<svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
          />
          <StatBox
            label="Pass Percentage" value={`${passPct}%`} sub="Overall pass rate"
            bg="bg-emerald-50" text="text-emerald-700"
            icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <StatBox
            label="Total Backlogs" value={backlogStudents.length} sub="Students with fails"
            bg="bg-red-50" text="text-red-600"
            icon={<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <StatBox
            label="Total Students" value={totalStudents} sub="Across all courses"
            bg="bg-blue-50" text="text-blue-700"
            icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("overview")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === "overview"
              ? "bg-violet-600 text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("bycourse")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === "bycourse"
              ? "bg-violet-600 text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          By Course
        </button>
      </div>

      {tab === "overview" && (
        <>
          {/* Grade Distribution */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-5">Grade Distribution</h2>
            <div className="flex items-end justify-around gap-3 h-36">
              {gradeDistribution.map((g) => (
                <div key={g.grade} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-bold text-slate-500">{g.count}</span>
                  <div className="w-full flex items-end justify-center">
                    <div
                      className={`w-full max-w-[56px] ${g.color} rounded-t-xl transition-all duration-500`}
                      style={{ height: `${Math.round((g.count / maxCount) * 96)}px` }}
                    />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg ${g.light}`}>{g.grade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject-wise Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-700">Subject-wise Performance</h2>
                <p className="text-xs text-slate-400 mt-0.5">{filteredSubjects.length} subjects</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
                >
                  <option value="all">All Courses</option>
                  {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <button
                  onClick={handleExportOverview}
                  className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Subject</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Course</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Avg Marks</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Pass Rate</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((s, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 text-sm font-semibold text-slate-800">{s.subject}</td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-violet-100 text-violet-700">{s.course}</span>
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-slate-700">{s.avg}%</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          s.passRate >= 90 ? "bg-emerald-100 text-emerald-700"
                          : s.passRate >= 75 ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                        }`}>{s.passRate}%</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${s.avg >= 70 ? "bg-emerald-500" : s.avg >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                              style={{ width: `${s.avg}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Backlog Students */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-700">Students with Backlogs</h2>
                <p className="text-xs text-slate-400 mt-0.5">{backlogStudents.length} students with failed subjects</p>
              </div>
            </div>
            <div className="p-5 space-y-2.5">
              {backlogStudents.map((s) => (
                <div key={s.id} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all">
                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{s.course} · {s.dept}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-600 shrink-0">
                    {s.failed} Failed Subject{s.failed !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "bycourse" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-700">Student Marks by Course</h2>
              <p className="text-xs text-slate-400 mt-0.5">{byCourseStudents.length} student{byCourseStudents.length !== 1 ? "s" : ""} · {byCourseSubjects.join(", ")}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={byCourseFilter}
                onChange={(e) => setByCourseFilter(e.target.value)}
                className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
              >
                {courses.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button
                onClick={handleExportByCourse}
                className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Student</th>
                  {byCourseSubjects.map((sub) => (
                    <th key={sub} className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{sub}</th>
                  ))}
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Average</th>
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Grade</th>
                </tr>
              </thead>
              <tbody>
                {byCourseStudents.map((s) => {
                  const avg = getAvg(s.subjects);
                  const grade = getGrade(avg);
                  return (
                    <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                            <p className="text-xs text-slate-400">{s.dept}</p>
                          </div>
                        </div>
                      </td>
                      {byCourseSubjects.map((sub) => (
                        <td key={sub} className="py-4 px-4">
                          <span className={`text-sm font-semibold ${
                            s.subjects[sub] >= 50 ? "text-slate-700" : "text-red-500"
                          }`}>
                            {s.subjects[sub] ?? "—"}
                          </span>
                          {s.subjects[sub] !== undefined && (
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${s.subjects[sub] >= 70 ? "bg-emerald-500" : s.subjects[sub] >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                                style={{ width: `${s.subjects[sub]}%` }}
                              />
                            </div>
                          )}
                        </td>
                      ))}
                      <td className="py-4 px-6">
                        <span className="text-sm font-bold text-slate-700">{avg}%</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${gradeStyle[grade]}`}>
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

export default MarksSection;
