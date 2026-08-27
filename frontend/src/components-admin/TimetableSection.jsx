import { useState, useEffect } from "react";
import { timetableAPI, teacherAPI } from "../services/api";

const inputCls = "w-full border border-blue-100 bg-blue-50/40 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all";

const DAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

function AddTimetableModal({ teachers, onSave, onClose }) {
  const [form, setForm] = useState({
    className: "", subject: "", teacher: teachers[0]?._id ?? "",
    day: "SUNDAY", startTime: "", endTime: "", roomNumber: "",
  });
  const [saving, setSaving] = useState(false);
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.className.trim() || !form.subject.trim() || !form.teacher || !form.startTime || !form.endTime || !form.roomNumber.trim()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Add Timetable Slot</h3>
              <p className="text-xs text-white/70 mt-0.5">Schedule a class period</p>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Class</label>
                <input autoFocus required name="className" value={form.className} onChange={handleChange} placeholder="e.g. CSIT-A" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Subject</label>
                <input required name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Data Structures" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Teacher</label>
              {teachers.length === 0 ? (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                  No teacher profiles yet — add a Teacher in User Management first.
                </p>
              ) : (
                <select required name="teacher" value={form.teacher} onChange={handleChange} className={inputCls}>
                  {teachers.map((t) => (
                    <option key={t._id} value={t._id}>{t.user?.userName ?? "Unnamed"} — {t.department}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Day</label>
                <select name="day" value={form.day} onChange={handleChange} className={inputCls}>
                  {DAYS.map((d) => <option key={d} value={d}>{d[0] + d.slice(1).toLowerCase()}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Start</label>
                <input required type="time" name="startTime" value={form.startTime} onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">End</label>
                <input required type="time" name="endTime" value={form.endTime} onChange={handleChange} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Room</label>
              <input required name="roomNumber" value={form.roomNumber} onChange={handleChange} placeholder="e.g. Room 204" className={inputCls} />
            </div>
          </div>
          <div className="px-6 pb-5 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" disabled={saving || teachers.length === 0} className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold active:scale-95 transition-all shadow-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed">
              {saving ? "Saving…" : "Add Slot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TimetableSection() {
  const [slots, setSlots] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      timetableAPI.getAll().catch(() => []),
      teacherAPI.getAll().catch(() => []),
    ])
      .then(([timetableList, teacherList]) => {
        setSlots(timetableList);
        setTeachers(teacherList);
      })
      .catch((err) => setError(err.response?.data?.message ?? err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleAdd = async (form) => {
    try {
      await timetableAPI.create(form);
      setAdding(false);
      load();
    } catch (err) {
      setError(typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.message);
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await timetableAPI.remove(id);
      setSlots((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message ?? err.message);
    }
  };

  const dayOrder = Object.fromEntries(DAYS.map((d, i) => [d, i]));
  const sorted = [...slots].sort((a, b) => (dayOrder[a.day] - dayOrder[b.day]) || a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Timetable</h1>
              <p className="text-sm text-white/70 mt-0.5">Class schedule across the institution</p>
            </div>
          </div>
          <button onClick={() => setAdding(true)} className="px-4 py-2 bg-white text-indigo-700 text-sm font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-sm active:scale-95">
            + Add Slot
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400 text-center py-10">Loading timetable…</p>
        ) : error ? (
          <p className="text-sm text-red-500 text-center py-10">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-slate-600">Day</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-600">Time</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-600">Class</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-600">Subject</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-600">Teacher</th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-600">Room</th>
                  <th className="text-right px-6 py-3 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sorted.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-10 text-slate-400">No timetable slots scheduled yet.</td></tr>
                ) : sorted.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3 text-slate-700 font-medium">{s.day[0] + s.day.slice(1).toLowerCase()}</td>
                    <td className="px-6 py-3 text-slate-600">{s.startTime} – {s.endTime}</td>
                    <td className="px-6 py-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">{s.className}</span>
                    </td>
                    <td className="px-6 py-3 text-slate-700">{s.subject}</td>
                    <td className="px-6 py-3 text-slate-600">{s.teacher?.user?.userName ?? "—"}</td>
                    <td className="px-6 py-3 text-slate-600">{s.roomNumber}</td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => handleDelete(s._id)} className="text-xs font-semibold text-red-500 hover:text-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {adding && <AddTimetableModal teachers={teachers} onSave={handleAdd} onClose={() => setAdding(false)} />}
    </div>
  );
}

export default TimetableSection;
