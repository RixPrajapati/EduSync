import { useState, useEffect } from "react";
import { assignmentAPI, courseAPI } from "../services/api";

const STATUS_STYLE = {
  SUBMITTED: "bg-blue-50 text-blue-600",
  GRADED: "bg-emerald-50 text-emerald-600",
  LATE: "bg-red-50 text-red-600",
};

function SubmitModal({ assignment, onClose, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(document.getElementById("student-submit-file")?.files?.[0] ?? null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
          <h2 className="text-lg font-bold text-white">Submit Assignment</h2>
          <p className="text-sm text-white/70 mt-0.5">{assignment.title}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              File <span className="font-normal text-gray-400">(PDF or image)</span>
            </label>
            <input id="student-submit-file" type="file" required accept="image/*,.pdf"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700" />
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AssignmentsCard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submittingFor, setSubmittingFor] = useState(null);

  useEffect(() => {
    courseAPI.getAll()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setCourses(list);
        if (list.length > 0) setSelectedCourseId(list[0]._id);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));

    assignmentAPI.getMySubmissions()
      .then(setMySubmissions)
      .catch(() => setMySubmissions([]));
  }, []);

  const fetchAssignments = () => {
    if (!selectedCourseId) return;
    assignmentAPI.getByCourse(selectedCourseId)
      .then(setAssignments)
      .catch(() => setAssignments([]));
  };

  useEffect(fetchAssignments, [selectedCourseId]);

  const extractError = (err) =>
    typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.message;

  const handleSubmitAssignment = async (file) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("assignmentId", submittingFor._id);
      formData.append("file", file);
      await assignmentAPI.submit(formData);
      setSubmittingFor(null);
      const subs = await assignmentAPI.getMySubmissions();
      setMySubmissions(subs);
    } catch (err) {
      setError(extractError(err));
      setSubmittingFor(null);
    }
  };

  const findSubmission = (assignmentId) =>
    mySubmissions.find((s) => (s.assignmentId?._id ?? s.assignmentId) === assignmentId);

  const selectedCourse = courses.find((c) => c._id === selectedCourseId);

  return (
    <div className="p-6">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-2.5 mb-4">{error}</div>
      )}

      <select
        value={selectedCourseId}
        onChange={(e) => setSelectedCourseId(e.target.value)}
        className="w-full sm:w-64 text-sm px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
      >
        {courses.length === 0 && <option>No courses available</option>}
        {courses.map((c) => <option key={c._id} value={c._id}>{c.courseName} ({c.courseCode})</option>)}
      </select>

      {loading ? (
        <p className="text-sm text-gray-400 text-center py-6">Loading…</p>
      ) : assignments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No assignments for this course yet.</p>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => {
            const submission = findSubmission(a._id);
            return (
              <div key={a._id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 truncate">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Due {new Date(a.dueDate).toLocaleDateString()}</p>
                  {submission?.remarks && <p className="text-xs text-gray-500 mt-1">{submission.remarks}</p>}
                </div>
                {submission ? (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLE[submission.status] ?? "bg-gray-50 text-gray-600"}`}>
                    {submission.status}
                  </span>
                ) : (
                  <button onClick={() => setSubmittingFor(a)} className="text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-full shrink-0 hover:bg-blue-700 transition-colors">
                    Submit
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {submittingFor && (
        <SubmitModal assignment={submittingFor} onClose={() => setSubmittingFor(null)} onSave={handleSubmitAssignment} />
      )}
    </div>
  );
}

export default AssignmentsCard;
