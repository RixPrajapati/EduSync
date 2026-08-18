import { useState, useEffect } from "react";
import { attendanceAPI, courseAPI } from "../services/api";

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

  const [overview, setOverview] = useState(null);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState(null);

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courseAttendance, setCourseAttendance] = useState([]);
  const [courseAttendanceLoading, setCourseAttendanceLoading] = useState(false);
  const [courseAttendanceError, setCourseAttendanceError] = useState(null);

  useEffect(() => {
    attendanceAPI.getOverview()
      .then((data) => setOverview(data))
      .catch((err) => setOverviewError(err.response?.data?.message ?? err.message))
      .finally(() => setOverviewLoading(false));
  }, []);

  useEffect(() => {
    courseAPI.getAll()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setCourses(list);
        if (list.length > 0) setSelectedCourseId(list[0]._id);
      })
      .catch(() => setCourses([]))
      .finally(() => setCoursesLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedCourseId) return;
    setCourseAttendanceLoading(true);
    setCourseAttendanceError(null);
    attendanceAPI.getByCourse(selectedCourseId)
      .then((data) => setCourseAttendance(Array.isArray(data) ? data : []))
      .catch((err) => setCourseAttendanceError(err.response?.data?.message ?? err.message))
      .finally(() => setCourseAttendanceLoading(false));
  }, [selectedCourseId]);

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportOverview = () => {
    if (!overview) return;
    const headers = ["Name", "Course", "Attendance %"];
    const rows = overview.lowAttendanceStudents.map((s) => [s.name, s.course, `${s.attendance}%`]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, "low-attendance.csv", "text/csv");
  };

  const handleExportByCourse = () => {
    const headers = ["Name", "Present", "Total", "Attendance %", "Status"];
    const rows = courseAttendance.map((s) => [
      s.name, s.present, s.total, `${s.percentage}%`,
      s.percentage >= 75 ? "Regular" : s.percentage >= 60 ? "Low" : "Critical",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, "attendance-by-course.csv", "text/csv");
  };

  const selectedCourse = courses.find((c) => c._id === selectedCourseId);

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
              <p className="text-sm text-white/70 mt-0.5">Track attendance across all courses</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        {overviewLoading ? (
          <p className="text-sm text-slate-400 text-center py-10">Loading attendance overview…</p>
        ) : overviewError ? (
          <p className="text-sm text-red-500 text-center py-10">{overviewError}</p>
        ) : (
          <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatBox
              label="Overall Attendance" value={`${overview.overallPercentage}%`} sub="All-time"
              bg="bg-sky-50" text="text-sky-700"
              icon={<svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
            />
            <StatBox
              label="Present Today" value={overview.presentToday} sub={`of ${overview.presentToday + overview.absentToday} marked`}
              bg="bg-emerald-50" text="text-emerald-700"
              icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            />
            <StatBox
              label="Absent Today" value={overview.absentToday} sub="Requires follow-up"
              bg="bg-red-50" text="text-red-600"
              icon={<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            />
            <StatBox
              label="Low Attendance" value={overview.lowAttendanceStudents.length} sub="Below 75%"
              bg="bg-amber-50" text="text-amber-700"
              icon={<svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>}
            />
          </div>
        )}
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

      {tab === "overview" && !overviewLoading && !overviewError && (
        <>
          {/* Course-wise Summary */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-700">Course-wise Summary</h2>
              <p className="text-xs text-slate-400 mt-0.5">Grouped by each student's enrolled course</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Course</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Total Students</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Avg Attendance</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.departmentWise.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-8 text-slate-400">No attendance recorded yet.</td></tr>
                  ) : overview.departmentWise.map((d) => (
                    <tr key={d.course} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-700">{d.course}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">{d.totalStudents}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${d.avgAttendance >= 80 ? "bg-emerald-500" : d.avgAttendance >= 65 ? "bg-amber-400" : "bg-red-400"}`}
                              style={{ width: `${d.avgAttendance}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{d.avgAttendance}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          d.avgAttendance >= 80 ? "bg-emerald-100 text-emerald-700"
                          : d.avgAttendance >= 65 ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                        }`}>
                          {d.avgAttendance >= 80 ? "Good" : d.avgAttendance >= 65 ? "Warning" : "Critical"}
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
                  <p className="text-xs text-slate-400 mt-0.5">{overview.lowAttendanceStudents.length} student{overview.lowAttendanceStudents.length !== 1 ? "s" : ""} below 75%</p>
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

            {overview.lowAttendanceStudents.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-semibold text-slate-500">No low-attendance students</p>
                <p className="text-xs text-slate-400 mt-1">All students are above 75% threshold.</p>
              </div>
            ) : (
              <div className="p-5 space-y-2.5">
                {overview.lowAttendanceStudents.map((s) => (
                  <div key={s.id} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.course}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${s.attendance >= 65 ? "bg-amber-400" : "bg-red-400"}`}
                          style={{ width: `${s.attendance}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        s.attendance >= 65 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"
                      }`}>
                        {s.attendance}%
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
              <p className="text-xs text-slate-400 mt-0.5">
                {courseAttendanceLoading ? "Loading…" : `${courseAttendance.length} student${courseAttendance.length !== 1 ? "s" : ""}`}
                {selectedCourse ? ` · ${selectedCourse.courseName}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                disabled={coursesLoading || courses.length === 0}
                className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
              >
                {courses.length === 0 && <option>No courses yet</option>}
                {courses.map((c) => <option key={c._id} value={c._id}>{c.courseName} ({c.courseCode})</option>)}
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

          {courseAttendanceLoading ? (
            <p className="text-sm text-slate-400 text-center py-10">Loading attendance…</p>
          ) : courseAttendanceError ? (
            <p className="text-sm text-red-500 text-center py-10">{courseAttendanceError}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Student</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Present</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Total Classes</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Attendance</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courseAttendance.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-8 text-slate-400">No attendance recorded for this course yet.</td></tr>
                  ) : courseAttendance.map((s) => (
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
                      <td className="py-4 px-6 text-sm font-semibold text-emerald-600">{s.present}</td>
                      <td className="py-4 px-6 text-sm text-slate-500">{s.total}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${s.percentage >= 75 ? "bg-emerald-500" : s.percentage >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                              style={{ width: `${s.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{s.percentage}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          s.percentage >= 75 ? "bg-emerald-100 text-emerald-700"
                          : s.percentage >= 60 ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                        }`}>
                          {s.percentage >= 75 ? "Regular" : s.percentage >= 60 ? "Low" : "Critical"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default AttendanceSection;
