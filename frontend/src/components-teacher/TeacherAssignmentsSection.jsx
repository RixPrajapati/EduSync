import { useState, useEffect } from "react";
import { assignmentAPI, courseAPI } from "../services/api";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const STATUS_STYLE = {
  SUBMITTED: "bg-blue-100 text-blue-700",
  GRADED: "bg-emerald-100 text-emerald-700",
  LATE: "bg-red-100 text-red-600",
};

function AddAssignmentModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form, document.getElementById("teacher-assignment-file")?.files?.[0] ?? null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5">
          <h2 className="text-lg font-bold text-white">Add Assignment</h2>
          <p className="text-sm text-white/70 mt-0.5">Create a new assignment for this course</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title</label>
              <input required autoFocus name="title" value={form.title} onChange={handleChange}
                placeholder="e.g. Chapter 5 Assignment"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                placeholder="Optional description"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Due Date</label>
              <input required type="datetime-local" name="dueDate" value={form.dueDate} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Attachment <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input id="teacher-assignment-file" type="file" accept="image/*,.pdf"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700" />
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors shadow-sm">
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GradeModal({ submission, onClose, onSave }) {
  const [remarks, setRemarks] = useState(submission.remarks ?? "");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-5">
          <h2 className="text-lg font-bold text-white">Grade Submission</h2>
          <p className="text-sm text-white/70 mt-0.5">{submission.studentId?.userName}</p>
        </div>
        <div className="p-6 space-y-4">
          <a href={submission.submittedFile} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline break-all">
            View submitted file
          </a>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Remarks</label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition-all resize-none" />
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={() => onSave(remarks)} className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
            Save Grade
          </button>
        </div>
      </div>
    </div>
  );
}

function TeacherAssignmentsSection() {
  const currentUser = getCurrentUser();
  const [tab, setTab] = useState("overview");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [gradingSubmission, setGradingSubmission] = useState(null);

  useEffect(() => {
    if (!currentUser?._id) return;
    courseAPI.getByTeacher(currentUser._id)
      .then((list) => {
        setCourses(list);
        if (list.length > 0) setSelectedCourseId(list[0]._id);
      })
      .catch(() => setCourses([]));
  }, []);

  const fetchAssignments = () => {
    if (!selectedCourseId) return;
    assignmentAPI.getByCourse(selectedCourseId)
      .then((data) => setAssignments(data))
      .catch((err) => setError(extractError(err)));
  };

  useEffect(fetchAssignments, [selectedCourseId]);

  useEffect(() => {
    if (assignments.length > 0) setSelectedAssignmentId(assignments[0]._id);
    else setSelectedAssignmentId("");
  }, [assignments]);

  const fetchSubmissions = () => {
    if (!selectedAssignmentId) { setSubmissions([]); return; }
    assignmentAPI.getSubmissions(selectedAssignmentId)
      .then((data) => setSubmissions(data))
      .catch((err) => setError(extractError(err)));
  };

  useEffect(fetchSubmissions, [selectedAssignmentId]);

  const extractError = (err) =>
    typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.message;

  const handleAddAssignment = async (form, file) => {
    try {
      const formData = new FormData();
      formData.append("courseId", selectedCourseId);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("dueDate", new Date(form.dueDate).toISOString());
      if (file) formData.append("file", file);
      await assignmentAPI.create(formData);
      setShowAddModal(false);
      fetchAssignments();
    } catch (err) {
      setError(extractError(err));
      setShowAddModal(false);
    }
  };

  const handleDeleteAssignment = async (id) => {
    try {
      await assignmentAPI.remove(id);
      fetchAssignments();
    } catch (err) {
      setError(extractError(err));
    }
  };

  const handleSaveGrade = async (remarks) => {
    try {
      await assignmentAPI.gradeSubmission(gradingSubmission._id, remarks);
      setGradingSubmission(null);
      fetchSubmissions();
    } catch (err) {
      setError(extractError(err));
    }
  };

  const selectedCourse = courses.find((c) => c._id === selectedCourseId);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Assignments</h1>
            <p className="text-sm text-white/70 mt-0.5">Create, track and grade assignments</p>
          </div>
          <button onClick={() => setShowAddModal(true)} disabled={!selectedCourseId}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all border border-white/30">
            + Add Assignment
          </button>
        </div>
        <div className="p-5">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Course</label>
          <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full sm:w-80 text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all">
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

      <div className="flex gap-2">
        {["overview", "submissions"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
              tab === t ? "bg-amber-500 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}>
            {t === "overview" ? "Overview" : "Submissions"}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-700">Assignments{selectedCourse ? ` · ${selectedCourse.courseName}` : ""}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Title</th>
                  <th className="text-left py-3 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wide">Due Date</th>
                  <th className="text-right py-3 px-6 text-slate-500 font-semibold text-xs uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.length === 0 ? (
                  <tr><td colSpan="3" className="text-center py-8 text-slate-400">No assignments for this course yet.</td></tr>
                ) : assignments.map((a) => (
                  <tr key={a._id} className="border-b border-slate-50">
                    <td className="py-4 px-6 text-sm font-semibold text-slate-800">{a.title}</td>
                    <td className="py-4 px-4 text-sm text-slate-600">{new Date(a.dueDate).toLocaleString()}</td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => { setTab("submissions"); setSelectedAssignmentId(a._id); }} className="text-xs font-semibold text-blue-600 hover:text-blue-800 mr-3">Submissions</button>
                      <button onClick={() => handleDeleteAssignment(a._id)} className="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "submissions" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-700">Submissions</h2>
            <select value={selectedAssignmentId} onChange={(e) => setSelectedAssignmentId(e.target.value)} disabled={assignments.length === 0}
              className="text-sm px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all">
              {assignments.length === 0 && <option>No assignments</option>}
              {assignments.map((a) => <option key={a._id} value={a._id}>{a.title}</option>)}
            </select>
          </div>
          <div className="p-5 space-y-2.5">
            {submissions.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No submissions yet.</p>
            ) : submissions.map((s) => (
              <div key={s._id} className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-slate-100 bg-white">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{s.studentId?.userName ?? "Unknown"}</p>
                  <a href={s.submittedFile} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">View file</a>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[s.status] ?? "bg-slate-100 text-slate-600"}`}>{s.status}</span>
                <button onClick={() => setGradingSubmission(s)} className="text-xs font-semibold text-emerald-600 hover:text-emerald-800">Grade</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddModal && <AddAssignmentModal onClose={() => setShowAddModal(false)} onSave={handleAddAssignment} />}
      {gradingSubmission && <GradeModal submission={gradingSubmission} onClose={() => setGradingSubmission(null)} onSave={handleSaveGrade} />}
    </div>
  );
}

export default TeacherAssignmentsSection;
