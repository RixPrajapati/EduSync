import { useState, useEffect } from "react";
import { marksAPI, attendanceAPI, feeAPI } from "../services/api";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

function StudentOverview() {
  const currentUser = getCurrentUser();
  const [summary, setSummary] = useState(null);
  const [attendancePct, setAttendancePct] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?._id) { setLoading(false); return; }
    Promise.all([
      marksAPI.getMySummary().catch(() => null),
      attendanceAPI.getMyPercentage(currentUser._id).catch(() => null),
      feeAPI.getMyFees().catch(() => []),
    ])
      .then(([marksSummary, attendance, fees]) => {
        setSummary(marksSummary);
        setAttendancePct(Number(attendance?.percentage ?? 0));
        setDueAmount(fees.filter((f) => f.status !== "Paid").reduce((s, f) => s + f.amount, 0));
      })
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
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 py-5">
          <h1 className="text-lg font-bold text-white">Welcome back, {currentUser?.userName ?? "Student"}</h1>
          <p className="text-sm text-white/70 mt-0.5">Here's a snapshot of your academic progress</p>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-2xl p-5">
            <p className="text-2xl font-bold text-blue-700">{attendancePct}%</p>
            <p className="text-xs font-semibold text-blue-600 mt-1">Attendance</p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-5">
            <p className="text-2xl font-bold text-emerald-700">{summary?.averageMarks ?? "—"}</p>
            <p className="text-xs font-semibold text-emerald-600 mt-1">Average Marks</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-5">
            <p className="text-2xl font-bold text-amber-700">${dueAmount.toLocaleString()}</p>
            <p className="text-xs font-semibold text-amber-600 mt-1">Fees Due</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentOverview;
