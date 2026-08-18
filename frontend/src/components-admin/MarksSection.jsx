import { useState, useEffect } from "react";
import { marksAPI, courseAPI } from "../services/api";

const GRADE_META = {
  "A+": { color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-700" },
  "A":  { color: "bg-emerald-400", light: "bg-emerald-50 text-emerald-700" },
  "B+": { color: "bg-blue-500",    light: "bg-blue-50 text-blue-700" },
  "B":  { color: "bg-blue-400",    light: "bg-blue-50 text-blue-700" },
  "C+": { color: "bg-amber-400",   light: "bg-amber-50 text-amber-700" },
  "C":  { color: "bg-amber-300",   light: "bg-amber-50 text-amber-700" },
  "F":  { color: "bg-red-500",     light: "bg-red-50 text-red-700" },
};
const GRADE_ORDER = ["A+", "A", "B+", "B", "C+", "C", "F"];

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

  const [overview, setOverview] = useState(null);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState(null);

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courseMarks, setCourseMarks] = useState([]);
  const [courseMarksLoading, setCourseMarksLoading] = useState(false);
  const [courseMarksError, setCourseMarksError] = useState(null);

  useEffect(() => {
    marksAPI.getOverview()
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
    setCourseMarksLoading(true);
    setCourseMarksError(null);
    marksAPI.getByCourse(selectedCourseId)
      .then((data) => setCourseMarks(Array.isArray(data) ? data : []))
      .catch((err) => setCourseMarksError(err.response?.data?.message ?? err.message))
      .finally(() => setCourseMarksLoading(false));
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
    const headers = ["Subject", "Avg Marks", "Pass Rate"];
    const rows = overview.subjectWise.map((s) => [s.subject, `${s.avgMarks}%`, `${s.passRate}%`]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, "marks-report.csv", "text/csv");
  };

  const handleExportByCourse = () => {
    const headers = ["Student", "Internal", "Practical", "Final Exam", "Total", "Grade"];
    const rows = courseMarks.map((m) => [
      m.studentId?.userName ?? "Unknown",
      m.internalMarks, m.practicalMarks, m.finalExamMarks, m.totalMarks, m.grade,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, "marks-by-course.csv", "text/csv");
  };

  const selectedCourse = courses.find((c) => c._id === selectedCourseId);
  const gradeCounts = overview?.gradeDistribution ?? {};
  const maxCount = Math.max(1, ...GRADE_ORDER.map((g) => gradeCounts[g] ?? 0));

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
        {overviewLoading ? (
          <p className="text-sm text-slate-400 text-center py-10">Loading marks overview…</p>
        ) : overviewError ? (
          <p className="text-sm text-red-500 text-center py-10">{overviewError}</p>
        ) : (
          <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatBox
              label="Average Marks" value={`${overview.averageMarks}%`} sub="College-wide"
              bg="bg-violet-50" text="text-violet-700"
              icon={<svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
            />
            <StatBox
              label="Pass Percentage" value={`${overview.passPercentage}%`} sub="Overall pass rate"
              bg="bg-emerald-50" text="text-emerald-700"
              icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            />
            <StatBox
              label="Total Backlogs" value={overview.backlogStudents.length} sub="Students with fails"
              bg="bg-red-50" text="text-red-600"
              icon={<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            />
            <StatBox
              label="Total Students" value={overview.totalStudents} sub="With published results"
              bg="bg-blue-50" text="text-blue-700"
              icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
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

      {tab === "overview" && !overviewLoading && !overviewError && (
        <>
          {/* Grade Distribution */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-700 mb-5">Grade Distribution</h2>
            <div className="flex items-end justify-around gap-3 h-36">
              {GRADE_ORDER.map((grade) => {
                const count = gradeCounts[grade] ?? 0;
                return (
                  <div key={grade} className="flex flex-col items-center gap-2 flex-1">
                    <span className="text-xs font-bold text-slate-500">{count}</span>
                    <div className="w-full flex items-end justify-center">
                      <div
                        className={`w-full max-w-[56px] ${GRADE_META[grade].color} rounded-t-xl transition-all duration-500`}
                        style={{ height: `${Math.round((count / maxCount) * 96)}px` }}
                      />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg ${GRADE_META[grade].light}`}>{grade}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subject-wise Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-700">Subject-wise Performance</h2>
                <p className="text-xs text-slate-400 mt-0.5">{overview.subjectWise.length} subjects</p>
              </div>
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Subject</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Avg Marks</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Pass Rate</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.subjectWise.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-8 text-slate-400">No published marks yet.</td></tr>
                  ) : overview.subjectWise.map((s, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 text-sm font-semibold text-slate-800">{s.subject}</td>
                      <td className="py-4 px-6 text-sm font-semibold text-slate-700">{s.avgMarks}%</td>
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
                              className={`h-full rounded-full ${s.avgMarks >= 70 ? "bg-emerald-500" : s.avgMarks >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                              style={{ width: `${s.avgMarks}%` }}
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
                <p className="text-xs text-slate-400 mt-0.5">{overview.backlogStudents.length} students with failed subjects</p>
              </div>
            </div>
            <div className="p-5 space-y-2.5">
              {overview.backlogStudents.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">No backlogs — everyone has passed so far.</p>
              ) : overview.backlogStudents.map((s) => (
                <div key={s.studentId} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all">
                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-600 shrink-0">
                    {s.failedSubjects} Failed Subject{s.failedSubjects !== 1 ? "s" : ""}
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
              <p className="text-xs text-slate-400 mt-0.5">
                {courseMarksLoading ? "Loading…" : `${courseMarks.length} student${courseMarks.length !== 1 ? "s" : ""}`}
                {selectedCourse ? ` · ${selectedCourse.courseName}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                disabled={coursesLoading || courses.length === 0}
                className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
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

          {courseMarksLoading ? (
            <p className="text-sm text-slate-400 text-center py-10">Loading marks…</p>
          ) : courseMarksError ? (
            <p className="text-sm text-red-500 text-center py-10">{courseMarksError}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Student</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Internal</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Practical</th>
                    <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Final Exam</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Total</th>
                    <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {courseMarks.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-8 text-slate-400">No marks recorded for this course yet.</td></tr>
                  ) : courseMarks.map((m) => (
                    <tr key={m._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-slate-800">{m.studentId?.userName ?? "Unknown"}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-slate-700">{m.internalMarks}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-slate-700">{m.practicalMarks}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-slate-700">{m.finalExamMarks}</td>
                      <td className="py-4 px-6 text-sm font-bold text-slate-800">{m.totalMarks}</td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${GRADE_META[m.grade]?.light ?? "bg-slate-100 text-slate-600"}`}>
                          {m.grade}
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

export default MarksSection;
