import { useState, useEffect } from "react";
import { courseAPI, userAPI, marksAPI } from "../services/api";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const GRADE_STYLE = {
  "A+": "bg-emerald-100 text-emerald-700", "A": "bg-emerald-100 text-emerald-700",
  "B+": "bg-blue-100 text-blue-700", "B": "bg-blue-100 text-blue-700",
  "C+": "bg-amber-100 text-amber-700", "C": "bg-amber-100 text-amber-700",
  "F": "bg-red-100 text-red-600",
};

function TeacherMarksSection() {
  const currentUser = getCurrentUser();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({ studentId: "", internalMarks: "", practicalMarks: "", finalExamMarks: "" });

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

  const fetchMarks = () => {
    if (!selectedCourseId) return;
    setLoading(true);
    marksAPI.getByCourse(selectedCourseId)
      .then((data) => setMarks(Array.isArray(data) ? data : []))
      .catch(() => setMarks([]))
      .finally(() => setLoading(false));
  };

  useEffect(fetchMarks, [selectedCourseId]);

  const extractError = (err) =>
    typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.response?.data?.errors?.[0]?.message ?? err.message;

  const handleAddMarks = async (e) => {
    e.preventDefault();
    try {
      await marksAPI.create({
        studentId: form.studentId,
        courseId: selectedCourseId,
        internalMarks: Number(form.internalMarks) || 0,
        practicalMarks: Number(form.practicalMarks) || 0,
        finalExamMarks: Number(form.finalExamMarks) || 0,
      });
      setForm({ studentId: "", internalMarks: "", practicalMarks: "", finalExamMarks: "" });
      setSuccess("Marks added.");
      setTimeout(() => setSuccess(null), 3000);
      fetchMarks();
    } catch (err) {
      setError(extractError(err));
    }
  };

  const handlePublish = async () => {
    try {
      await marksAPI.publish(selectedCourseId);
      setSuccess("Results published for this course.");
      setTimeout(() => setSuccess(null), 3000);
      fetchMarks();
    } catch (err) {
      setError(extractError(err));
    }
  };

  const selectedCourse = courses.find((c) => c._id === selectedCourseId);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-purple-500 px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Marks</h1>
            <p className="text-sm text-white/70 mt-0.5">Add marks and publish results for your courses</p>
          </div>
          <button onClick={handlePublish} disabled={!selectedCourseId} className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all border border-white/30">
            Publish Results
          </button>
        </div>
        <div className="p-5">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Course</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full sm:w-80 text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all"
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
          <h2 className="text-sm font-bold text-slate-700">Add Marks{selectedCourse ? ` · ${selectedCourse.courseName}` : ""}</h2>
          <p className="text-xs text-slate-400 mt-0.5">Internal max 30 · Practical max 30 · Final exam max 40</p>
        </div>
        <form onSubmit={handleAddMarks} className="p-5 grid grid-cols-1 sm:grid-cols-5 gap-3 sm:items-end">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Student</label>
            <select required value={form.studentId} onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all">
              <option value="" disabled>Select a student</option>
              {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Internal</label>
            <input type="number" min="0" max="30" value={form.internalMarks} onChange={(e) => setForm((f) => ({ ...f, internalMarks: e.target.value }))}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Practical</label>
            <input type="number" min="0" max="30" value={form.practicalMarks} onChange={(e) => setForm((f) => ({ ...f, practicalMarks: e.target.value }))}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Final Exam</label>
            <input type="number" min="0" max="40" value={form.finalExamMarks} onChange={(e) => setForm((f) => ({ ...f, finalExamMarks: e.target.value }))}
              className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all" />
          </div>
          <div className="sm:col-span-5">
            <button type="submit" disabled={!selectedCourseId} className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
              Add Marks
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-700">Recorded Marks</h2>
          <p className="text-xs text-slate-400 mt-0.5">{loading ? "Loading…" : `${marks.length} record${marks.length !== 1 ? "s" : ""}`}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Student</th>
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Total</th>
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Grade</th>
                <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Published</th>
              </tr>
            </thead>
            <tbody>
              {marks.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-slate-400">No marks recorded for this course yet.</td></tr>
              ) : marks.map((m) => (
                <tr key={m._id} className="border-b border-slate-50">
                  <td className="py-3 px-6 text-sm font-semibold text-slate-800">{m.studentId?.userName ?? "Unknown"}</td>
                  <td className="py-3 px-4 text-sm font-bold text-slate-700">{m.totalMarks}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${GRADE_STYLE[m.grade] ?? "bg-slate-100 text-slate-600"}`}>{m.grade}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-500">{m.isPublished ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherMarksSection;
