import { useState, useEffect } from "react";
import { courseAPI, timetableAPI } from "../services/api";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

function TeacherOverview() {
  const currentUser = getCurrentUser();
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser?._id) return;
    Promise.all([
      courseAPI.getByTeacher(currentUser._id),
      timetableAPI.getMyTeacherTimetable().catch(() => []),
    ])
      .then(([courseList, timetableList]) => {
        setCourses(courseList);
        setTimetable(timetableList);
      })
      .catch((err) => setError(err.response?.data?.message ?? err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <p className="text-sm text-slate-400 text-center py-10">Loading your dashboard…</p>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 via-violet-500 to-purple-500 px-6 py-5">
          <h1 className="text-lg font-bold text-white">Welcome back, {currentUser?.userName ?? "Teacher"}</h1>
          <p className="text-sm text-white/70 mt-0.5">Here's what's happening with your courses</p>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-violet-50 rounded-2xl p-5">
            <p className="text-2xl font-bold text-violet-700">{courses.length}</p>
            <p className="text-xs font-semibold text-violet-600 mt-1">Your Courses</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-5">
            <p className="text-2xl font-bold text-blue-700">{timetable.length}</p>
            <p className="text-xs font-semibold text-blue-600 mt-1">Scheduled Classes</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-700">Your Courses</h2>
        </div>
        <div className="p-5">
          {courses.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No courses assigned to you yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courses.map((c) => (
                <div key={c._id} className="border border-slate-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-800">{c.courseName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{c.courseCode} · Semester {c.semester} · {c.creditHours} credits</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-700">Your Timetable</h2>
        </div>
        <div className="p-5">
          {timetable.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No timetable entries found.</p>
          ) : (
            <div className="space-y-2">
              {timetable.map((t) => (
                <div key={t._id} className="flex items-center justify-between border border-slate-100 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.subject}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{t.className} · Room {t.roomNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700">{t.day}</span>
                    <p className="text-xs text-slate-400 mt-1">{t.startTime} – {t.endTime}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherOverview;
