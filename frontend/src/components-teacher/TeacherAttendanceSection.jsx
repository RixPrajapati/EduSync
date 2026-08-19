import { useState, useEffect } from "react";
import { courseAPI, userAPI, attendanceAPI } from "../services/api";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

function TeacherAttendanceSection() {
  const currentUser = getCurrentUser();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({ studentId: "", date: new Date().toISOString().slice(0, 10), status: "present" });

  useEffect(() => {
    if (!currentUser?._id) return;
    courseAPI.getByTeacher(currentUser._id)
      .then((list) => {
        setCourses(list);
        if (list.length > 0) setSelectedCourseId(list[0]._id);
      })
      .catch(() => setCourses([]));

    userAPI.getAll()
      .then((users) => setStudents(users.filter((u) => u.role === "STUDENT")))
      .catch(() => setStudents([]));
  }, []);

  const fetchRecords = () => {
    if (!selectedCourseId) return;
    setRecordsLoading(true);
    attendanceAPI.getByCourse(selectedCourseId)
      .then((data) => setRecords(Array.isArray(data) ? data : []))
      .catch(() => setRecords([]))
      .finally(() => setRecordsLoading(false));
  };

  useEffect(fetchRecords, [selectedCourseId]);

  const extractError = (err) =>
    typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.message;

  const handleMark = async (e) => {
    e.preventDefault();
    if (!form.studentId || !selectedCourseId) return;
    try {
      await attendanceAPI.mark({
        studentId: form.studentId,
        courseId: selectedCourseId,
        attendanceDate: new Date(form.date).toISOString(),
        status: form.status,
      });
      setSuccess("Attendance marked successfully.");
      setTimeout(() => setSuccess(null), 3000);
      fetchRecords();
    } catch (err) {
      setError(extractError(err));
    }
  };

  const selectedCourse = courses.find((c) => c._id === selectedCourseId);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 px-6 py-5">
          <h1 className="text-lg font-bold text-white">Attendance</h1>
          <p className="text-sm text-white/70 mt-0.5">Mark attendance for your courses</p>
        </div>
        <div className="p-5">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Course</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full sm:w-80 text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
          >
            {courses.length === 0 && <option>No courses assigned</option>}
            {courses.map((c) => <option key={c._id} value={c._id}>{c.courseName} ({c.courseCode})</option>)}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 flex items-start justify-between gap-3">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 shrink-0">✕</button>
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm rounded-xl px-4 py-3">{success}</div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-700">Mark Attendance{selectedCourse ? ` · ${selectedCourse.courseName}` : ""}</h2>
        </div>
        <form onSubmit={handleMark} className="p-5 flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Student</label>
            <select
              required
              value={form.studentId}
              onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
            >
              <option value="" disabled>Select a student</option>
              {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Date</label>
            <input
              type="date" required value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 transition-all"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <button type="submit" disabled={!selectedCourseId} className="bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
            Mark
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-700">Records</h2>
          <p className="text-xs text-slate-400 mt-0.5">{recordsLoading ? "Loading…" : `${records.length} student${records.length !== 1 ? "s" : ""} recorded`}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Student</th>
                <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Present</th>
                <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Total</th>
                <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-slate-400">No attendance recorded for this course yet.</td></tr>
              ) : records.map((r) => (
                <tr key={r.id} className="border-b border-slate-50">
                  <td className="py-3 px-6 text-sm font-semibold text-slate-800">{r.name}</td>
                  <td className="py-3 px-6 text-sm text-emerald-600 font-semibold">{r.present}</td>
                  <td className="py-3 px-6 text-sm text-slate-500">{r.total}</td>
                  <td className="py-3 px-6 text-sm font-bold text-slate-700">{r.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherAttendanceSection;
