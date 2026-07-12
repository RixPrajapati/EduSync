import { useState } from "react";

const departments = [
  { code: "FOE", name: "Faculty of Engineering", total: 105, present: 89, avg: 85 },
  { code: "FOM", name: "Faculty of Management",  total: 120, present: 98, avg: 82 },
  { code: "FOS", name: "Faculty of Science",     total: 50,  present: 38, avg: 76 },
];

const lowAttendanceStudents = [
  { id: 1,  name: "Ananya Singh",    course: "BCA", dept: "FOE", pct: 62 },
  { id: 2,  name: "Rajan Gurung",    course: "BSc", dept: "FOS", pct: 58 },
  { id: 3,  name: "Priya Tamang",    course: "BBA", dept: "FOM", pct: 70 },
  { id: 4,  name: "Arjun Khanal",    course: "BIT", dept: "FOE", pct: 65 },
  { id: 5,  name: "Sita Maharjan",   course: "MBA", dept: "FOM", pct: 72 },
  { id: 12, name: "Dinesh Basnet",   course: "BBA", dept: "FOM", pct: 69 },
];

const studentAttendance = [
  { id: 1,  name: "Ananya Singh",    course: "BCA", dept: "FOE", present: 52, total: 84, pct: 62 },
  { id: 6,  name: "Bikash Shrestha", course: "BCA", dept: "FOE", present: 76, total: 84, pct: 90 },
  { id: 7,  name: "Nisha Poudel",    course: "BCA", dept: "FOE", present: 70, total: 84, pct: 83 },
  { id: 13, name: "Aarav Joshi",     course: "BCA", dept: "FOE", present: 80, total: 84, pct: 95 },
  { id: 4,  name: "Arjun Khanal",    course: "BIT", dept: "FOE", present: 55, total: 84, pct: 65 },
  { id: 8,  name: "Ramesh Thapa",    course: "BIT", dept: "FOE", present: 79, total: 84, pct: 94 },
  { id: 14, name: "Deepa Karki",     course: "BIT", dept: "FOE", present: 68, total: 84, pct: 81 },
  { id: 3,  name: "Priya Tamang",    course: "BBA", dept: "FOM", present: 59, total: 84, pct: 70 },
  { id: 9,  name: "Sunita Rai",      course: "BBA", dept: "FOM", present: 67, total: 84, pct: 80 },
  { id: 12, name: "Dinesh Basnet",   course: "BBA", dept: "FOM", present: 58, total: 84, pct: 69 },
  { id: 5,  name: "Sita Maharjan",   course: "MBA", dept: "FOM", present: 61, total: 84, pct: 72 },
  { id: 11, name: "Puja KC",         course: "MBA", dept: "FOM", present: 71, total: 84, pct: 85 },
  { id: 15, name: "Rohan Adhikari",  course: "MBA", dept: "FOM", present: 75, total: 84, pct: 89 },
  { id: 2,  name: "Rajan Gurung",    course: "BSc", dept: "FOS", present: 48, total: 84, pct: 58 },
  { id: 10, name: "Kumar Limbu",     course: "BSc", dept: "FOS", present: 63, total: 84, pct: 75 },
  { id: 16, name: "Mina Shakya",     course: "BSc", dept: "FOS", present: 70, total: 84, pct: 83 },
];

const DEPT_FILTER_ALL = "all";

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

function AttendanceSection() {
  const [tab, setTab] = useState("overview");
  const [deptFilter, setDeptFilter] = useState(DEPT_FILTER_ALL);
  const [courseFilter, setCourseFilter] = useState("all");

  const totalStudents = departments.reduce((s, d) => s + d.total, 0);
  const totalPresent  = departments.reduce((s, d) => s + d.present, 0);
  const totalAbsent   = totalStudents - totalPresent;
  const overallPct    = Math.round((totalPresent / totalStudents) * 100);

  const filteredDepts = deptFilter === DEPT_FILTER_ALL
    ? departments
    : departments.filter((d) => d.code === deptFilter);

  const filteredLow = deptFilter === DEPT_FILTER_ALL
    ? lowAttendanceStudents
    : lowAttendanceStudents.filter((s) => s.dept === deptFilter);

  const courses = [...new Set(studentAttendance.map((s) => s.course))].sort();
  const filteredStudents = courseFilter === "all"
    ? studentAttendance
    : studentAttendance.filter((s) => s.course === courseFilter);

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportOverview = () => {
    const headers = ["Name", "Course", "Department", "Attendance %"];
    const rows = filteredLow.map((s) => [s.name, s.course, s.dept, `${s.pct}%`]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, "low-attendance.csv", "text/csv");
  };

  const handleExportByCourse = () => {
    const headers = ["Name", "Course", "Department", "Present", "Total", "Attendance %", "Status"];
    const rows = filteredStudents.map((s) => [
      s.name, s.course, s.dept, s.present, s.total, `${s.pct}%`,
      s.pct >= 75 ? "Regular" : s.pct >= 60 ? "Low" : "Critical",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, `attendance-by-course-${courseFilter}.csv`, "text/csv");
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Attendance Monitoring</h1>
              <p className="text-sm text-white/70 mt-0.5">Track attendance across all departments</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox
            label="Overall Attendance" value={`${overallPct}%`} sub="College-wide"
            bg="bg-sky-50" text="text-sky-700"
            icon={<svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
          />
          <StatBox
            label="Present Today" value={totalPresent} sub={`of ${totalStudents} students`}
            bg="bg-emerald-50" text="text-emerald-700"
            icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <StatBox
            label="Absent Today" value={totalAbsent} sub="Requires follow-up"
            bg="bg-red-50" text="text-red-600"
            icon={<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <StatBox
            label="Low Attendance" value={lowAttendanceStudents.length} sub="Below 75%"
            bg="bg-amber-50" text="text-amber-700"
            icon={<svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("overview")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === "overview"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("bycourse")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === "bycourse"
              ? "bg-sky-600 text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          By Course
        </button>
      </div>

      {tab === "overview" && (
        <>
          {/* Filter + Department Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-700">Department-wise Summary</h2>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide shrink-0">Filter:</label>
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
                >
                  <option value="all">All Departments</option>
                  {departments.map((d) => (
                    <option key={d.code} value={d.code}>{d.code} — {d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Department</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Total</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Present</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Absent</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Avg Attendance</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepts.map((dept) => (
                    <tr key={dept.code} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <p className="text-sm font-semibold text-slate-800">{dept.name}</p>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-700 mt-0.5 inline-block">{dept.code}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">{dept.total}</td>
                      <td className="py-4 px-6 text-sm font-semibold text-emerald-600">{dept.present}</td>
                      <td className="py-4 px-6 text-sm font-semibold text-red-500">{dept.total - dept.present}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${dept.avg >= 80 ? "bg-emerald-500" : dept.avg >= 65 ? "bg-amber-400" : "bg-red-400"}`}
                              style={{ width: `${dept.avg}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{dept.avg}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          dept.avg >= 80 ? "bg-emerald-100 text-emerald-700"
                          : dept.avg >= 65 ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                        }`}>
                          {dept.avg >= 80 ? "Good" : dept.avg >= 65 ? "Warning" : "Critical"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Attendance Alerts */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-700">Students with Low Attendance</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{filteredLow.length} student{filteredLow.length !== 1 ? "s" : ""} below 75%</p>
                </div>
              </div>
              <button
                onClick={handleExportOverview}
                className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Export CSV
              </button>
            </div>

            {filteredLow.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-semibold text-slate-500">No low-attendance students</p>
                <p className="text-xs text-slate-400 mt-1">All students are above 75% threshold.</p>
              </div>
            ) : (
              <div className="p-5 space-y-2.5">
                {filteredLow.map((s) => (
                  <div key={s.id} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.course} · {s.dept}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${s.pct >= 65 ? "bg-amber-400" : "bg-red-400"}`}
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        s.pct >= 65 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"
                      }`}>
                        {s.pct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {tab === "bycourse" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-700">Student Attendance by Course</h2>
              <p className="text-xs text-slate-400 mt-0.5">{filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
              >
                <option value="all">All Courses</option>
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
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Course</th>
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Dept</th>
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Present</th>
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Total Days</th>
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Attendance</th>
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-sky-100 text-sky-700">{s.course}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 font-medium">{s.dept}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-emerald-600">{s.present}</td>
                    <td className="py-4 px-6 text-sm text-slate-500">{s.total}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${s.pct >= 75 ? "bg-emerald-500" : s.pct >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{s.pct}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        s.pct >= 75 ? "bg-emerald-100 text-emerald-700"
                        : s.pct >= 60 ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                      }`}>
                        {s.pct >= 75 ? "Regular" : s.pct >= 60 ? "Low" : "Critical"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

export default AttendanceSection;
