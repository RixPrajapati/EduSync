import { useState, useEffect } from "react";
import { courseAPI, userAPI } from "../services/api";

const getCurrentRole = () => {
  try {
    return JSON.parse(localStorage.getItem("user"))?.role?.[0] ?? null;
  } catch {
    return null;
  }
};

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all placeholder:text-slate-400";

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function CourseModal({ title, subtitle, initial, teachers, onClose, onSave }) {
  const [form, setForm] = useState(initial ?? {
    courseName: "", courseCode: "", creditHours: 3, semester: 1, description: "", teacherId: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: (name === "creditHours" || name === "semester") ? Number(value) : value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">{title}</h2>
              {subtitle && <p className="text-xs text-white/70 mt-0.5">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">
            <Field label="Course Name">
              <input required autoFocus name="courseName" value={form.courseName} onChange={handleChange}
                placeholder="e.g. Web Development" className={inputCls} />
            </Field>
            <Field label="Course Code">
              <input required name="courseCode" value={form.courseCode} onChange={handleChange}
                placeholder="e.g. WD101" className={inputCls} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Semester">
                <input required type="number" min="1" max="8" name="semester" value={form.semester} onChange={handleChange} className={inputCls} />
              </Field>
              <Field label="Credit Hours">
                <input required type="number" min="1" name="creditHours" value={form.creditHours} onChange={handleChange} className={inputCls} />
              </Field>
            </div>
            {teachers && (
              <Field label="Assign Teacher">
                <select required name="teacherId" value={form.teacherId} onChange={handleChange} className={inputCls}>
                  <option value="" disabled>Select a teacher</option>
                  {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </Field>
            )}
            <Field label="Description">
              <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                placeholder="Optional description" className={`${inputCls} resize-none`} />
            </Field>
          </div>
          <div className="px-6 pb-5 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold active:scale-95 transition-all shadow-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ course, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-slate-100 overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Delete Course?</h3>
          <p className="text-sm text-slate-500 mb-4">
            <span className="font-semibold text-slate-700">{course.courseName}</span> will be permanently removed.
          </p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademicManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [teachers, setTeachers] = useState(null);

  const isAdmin = getCurrentRole() === "ADMIN";

  const fetchCourses = () => {
    setLoading(true);
    courseAPI.getAll()
      .then((data) => setCourses(Array.isArray(data) ? data : (data?.data ?? [])))
      .catch((err) => setError(err.response?.data?.message ?? err.response?.data ?? err.message))
      .finally(() => setLoading(false));
  };

  useEffect(fetchCourses, []);

  // Admins must pick which teacher a course belongs to; teachers auto-assign themselves.
  useEffect(() => {
    if (!isAdmin) return;
    userAPI.getAll()
      .then((users) => setTeachers(users.filter((u) => u.role === "TEACHER")))
      .catch(() => setTeachers([]));
  }, [isAdmin]);

  const extractError = (err) =>
    typeof err.response?.data === "string" ? err.response.data
    : err.response?.data?.message ?? err.response?.data?.error ?? err.message;

  const handleAdd = async (form) => {
    try {
      await courseAPI.create(form);
      setShowAddModal(false);
      fetchCourses();
    } catch (err) {
      setError(extractError(err));
    }
  };

  const handleEdit = async (form) => {
    try {
      await courseAPI.update(editingCourse._id, form);
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      setError(extractError(err));
    }
  };

  const handleDelete = async () => {
    try {
      await courseAPI.remove(deletingCourse._id);
      setDeletingCourse(null);
      fetchCourses();
    } catch (err) {
      setError(extractError(err));
    }
  };

  if (loading) return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6">
      <p className="text-sm text-slate-400 text-center py-10">Loading courses…</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-6">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 flex items-start justify-between gap-3">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 shrink-0">✕</button>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Course Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">{courses.length} course{courses.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-sm shadow-blue-200 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <p className="text-sm font-semibold text-slate-600">No courses yet</p>
          <p className="text-xs text-slate-400 mt-1">Add the first course to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Course</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Code</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Semester</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Credit Hours</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {courses.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{c.courseName}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-700">{c.courseCode}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c.semester}</td>
                  <td className="px-4 py-3 text-slate-600">{c.creditHours}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${c.isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditingCourse(c)} className="text-xs font-semibold text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button onClick={() => setDeletingCourse(c)} className="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <CourseModal
          title="Add Course" subtitle="Create a new course" teachers={teachers}
          onClose={() => setShowAddModal(false)} onSave={handleAdd}
        />
      )}
      {editingCourse && (
        <CourseModal
          title="Edit Course" subtitle={`Update ${editingCourse.courseName}`} teachers={teachers}
          initial={{
            courseName: editingCourse.courseName, courseCode: editingCourse.courseCode,
            creditHours: editingCourse.creditHours, semester: editingCourse.semester,
            description: editingCourse.description ?? "", teacherId: editingCourse.teacherId ?? "",
          }}
          onClose={() => setEditingCourse(null)} onSave={handleEdit}
        />
      )}
      {deletingCourse && (
        <DeleteModal course={deletingCourse} onClose={() => setDeletingCourse(null)} onConfirm={handleDelete} />
      )}
    </div>
  );
}

export default AcademicManagement;
