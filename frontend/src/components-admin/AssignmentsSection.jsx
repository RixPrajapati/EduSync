import { useState } from "react";

const assignmentsData = [
  { id: 1, title: "Web App Portfolio",       subject: "Web Development",      course: "BCA", due: "2025-07-10", submitted: 28, total: 32, status: "active" },
  { id: 2, title: "Linked List Implementation", subject: "Data Structures",   course: "BCA", due: "2025-07-05", submitted: 30, total: 32, status: "active" },
  { id: 3, title: "Firewall Configuration",  subject: "Network Security",     course: "BIT", due: "2025-06-28", submitted: 22, total: 26, status: "active" },
  { id: 4, title: "Cloud Deployment Lab",    subject: "Cloud Computing",      course: "BIT", due: "2025-06-20", submitted: 26, total: 26, status: "closed" },
  { id: 5, title: "SEO Campaign Report",     subject: "Digital Marketing",    course: "BBA", due: "2025-07-15", submitted: 14, total: 30, status: "active" },
  { id: 6, title: "Balance Sheet Analysis",  subject: "Financial Accounting", course: "BBA", due: "2025-06-30", submitted: 29, total: 30, status: "active" },
  { id: 7, title: "Business Case Study",     subject: "Strategic Management", course: "MBA", due: "2025-07-20", submitted: 10, total: 18, status: "active" },
  { id: 8, title: "Quantum Problem Set",     subject: "Quantum Mechanics",    course: "BSc", due: "2025-06-25", submitted: 18, total: 22, status: "closed" },
  { id: 9, title: "Thermodynamics Lab",      subject: "Thermodynamics",       course: "BSc", due: "2025-07-08", submitted: 20, total: 22, status: "active" },
];

const submissionByStudent = [
  { id: 1, name: "Ananya Singh",     course: "BCA", assignment: "Web App Portfolio",       submitted: true,  score: 88 },
  { id: 2, name: "Bikash Shrestha", course: "BCA", assignment: "Web App Portfolio",       submitted: true,  score: 75 },
  { id: 3, name: "Nisha Poudel",    course: "BCA", assignment: "Web App Portfolio",       submitted: true,  score: 92 },
  { id: 4, name: "Aarav Joshi",     course: "BCA", assignment: "Web App Portfolio",       submitted: false, score: null },
  { id: 5, name: "Arjun Khanal",    course: "BIT", assignment: "Firewall Configuration",  submitted: true,  score: 70 },
  { id: 6, name: "Ramesh Thapa",    course: "BIT", assignment: "Firewall Configuration",  submitted: true,  score: 85 },
  { id: 7, name: "Deepa Karki",     course: "BIT", assignment: "Firewall Configuration",  submitted: false, score: null },
  { id: 8, name: "Priya Tamang",    course: "BBA", assignment: "SEO Campaign Report",     submitted: true,  score: 78 },
  { id: 9, name: "Sunita Rai",      course: "BBA", assignment: "SEO Campaign Report",     submitted: false, score: null },
  { id: 10, name: "Sita Maharjan",  course: "MBA", assignment: "Business Case Study",     submitted: true,  score: 82 },
  { id: 11, name: "Puja KC",        course: "MBA", assignment: "Business Case Study",     submitted: true,  score: 90 },
  { id: 12, name: "Rajan Gurung",   course: "BSc", assignment: "Thermodynamics Lab",      submitted: true,  score: 65 },
  { id: 13, name: "Kumar Limbu",    course: "BSc", assignment: "Thermodynamics Lab",      submitted: true,  score: 74 },
];

const totalAssignments = assignmentsData.length;
const activeAssignments = assignmentsData.filter((a) => a.status === "active").length;
const totalSubmissions = assignmentsData.reduce((s, a) => s + a.submitted, 0);
const totalExpected = assignmentsData.reduce((s, a) => s + a.total, 0);
const overallRate = Math.round((totalSubmissions / totalExpected) * 100);

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

function AssignmentsSection() {
  const [tab, setTab] = useState("overview");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [studentCourse, setStudentCourse] = useState("BCA");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "", course: "BCA", due: "", total: "" });

  const courses = [...new Set(assignmentsData.map((a) => a.course))];

  const filtered = assignmentsData.filter((a) => {
    const matchCourse = courseFilter === "all" || a.course === courseFilter;
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchCourse && matchStatus;
  });

  const studentFiltered = submissionByStudent.filter((s) => s.course === studentCourse);

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const headers = ["Title", "Subject", "Course", "Due Date", "Submitted", "Total", "Rate", "Status"];
    const rows = filtered.map((a) => [
      a.title, a.subject, a.course, a.due, a.submitted, a.total,
      `${Math.round((a.submitted / a.total) * 100)}%`, a.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    downloadFile(csv, "assignments-report.csv", "text/csv");
  };

  const handleAdd = () => {
    setForm({ title: "", subject: "", course: "BCA", due: "", total: "" });
    setShowModal(true);
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Assignments</h1>
                <p className="text-sm text-white/70 mt-0.5">Track and manage all course assignments</p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all border border-white/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Assignment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox
            label="Total Assignments" value={totalAssignments} sub="All courses"
            bg="bg-amber-50" text="text-amber-700"
            icon={<svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>}
          />
          <StatBox
            label="Active" value={activeAssignments} sub="Currently open"
            bg="bg-emerald-50" text="text-emerald-700"
            icon={<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <StatBox
            label="Submissions" value={totalSubmissions} sub={`of ${totalExpected} expected`}
            bg="bg-blue-50" text="text-blue-700"
            icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>}
          />
          <StatBox
            label="Submission Rate" value={`${overallRate}%`} sub="College-wide"
            bg="bg-purple-50" text="text-purple-700"
            icon={<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["overview", "submissions"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
              tab === t
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t === "overview" ? "Overview" : "By Course"}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-700">All Assignments</h2>
              <p className="text-xs text-slate-400 mt-0.5">{filtered.length} assignments</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
              >
                <option value="all">All Courses</option>
                {courses.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
              <button
                onClick={handleExport}
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
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Assignment</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Course</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Due Date</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Submissions</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const rate = Math.round((a.submitted / a.total) * 100);
                  return (
                    <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{a.subject}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-700">{a.course}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{a.due}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${rate >= 90 ? "bg-emerald-500" : rate >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-600">{a.submitted}/{a.total}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          a.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          {a.status === "active" ? "Active" : "Closed"}
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

      {tab === "submissions" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-700">Student Submissions by Course</h2>
              <p className="text-xs text-slate-400 mt-0.5">{studentFiltered.length} student{studentFiltered.length !== 1 ? "s" : ""}</p>
            </div>
            <select
              value={studentCourse}
              onChange={(e) => setStudentCourse(e.target.value)}
              className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
            >
              {courses.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="p-5 space-y-2.5">
            {studentFiltered.map((s) => (
              <div key={s.id} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.submitted ? "bg-emerald-100" : "bg-red-100"}`}>
                  <svg className={`w-4 h-4 ${s.submitted ? "text-emerald-600" : "text-red-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {s.submitted
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    }
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.assignment}</p>
                </div>
                <div className="text-right shrink-0">
                  {s.submitted ? (
                    <span className="text-sm font-bold text-slate-700">{s.score}/100</span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-600">Not Submitted</span>
                  )}
                  {s.submitted && (
                    <span className={`ml-2 text-xs font-bold px-2.5 py-1 rounded-full ${s.score >= 80 ? "bg-emerald-100 text-emerald-700" : s.score >= 60 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>
                      {s.score >= 80 ? "Excellent" : s.score >= 60 ? "Good" : "Needs Work"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5">
              <h2 className="text-lg font-bold text-white">Add Assignment</h2>
              <p className="text-sm text-white/70 mt-0.5">Create a new assignment for a course</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Assignment Title", key: "title", placeholder: "e.g. Lab Report 3" },
                { label: "Subject", key: "subject", placeholder: "e.g. Data Structures" },
                { label: "Due Date", key: "due", placeholder: "", type: "date" },
                { label: "Total Students", key: "total", placeholder: "e.g. 30", type: "number" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                  <input
                    type={type || "text"}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Course</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                >
                  {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors shadow-sm"
              >
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentsSection;
