import { useState, useEffect } from "react";
import { noticeAPI } from "../services/api";

function timeAgo(dateStr) {
  const diffMins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hr${diffHrs !== 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
}

function TeacherNoticesSection() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    noticeAPI.getAll()
      .then(setNotices)
      .catch((err) => setError(err.response?.data?.message ?? err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <p className="text-sm text-slate-400 text-center py-10">Loading notices…</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-5">
        <h1 className="text-lg font-bold text-white">Notices & Announcements</h1>
        <p className="text-sm text-white/70 mt-0.5">{notices.length} active notice{notices.length !== 1 ? "s" : ""}</p>
      </div>

      {error && <div className="bg-red-50 border-b border-red-100 text-red-600 text-sm px-6 py-3">{error}</div>}

      <div className="p-5">
        {notices.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-10">No notices yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map((n) => (
              <div key={n._id} className="border border-slate-100 rounded-2xl p-4">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-violet-100 text-violet-700">{n.noticeTyped}</span>
                <h3 className="font-semibold text-slate-800 mt-3">{n.title}</h3>
                <p className="text-slate-500 text-sm mt-1 line-clamp-2">{n.description}</p>
                <p className="text-xs text-slate-400 mt-3">{timeAgo(n.publishedAt ?? n.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherNoticesSection;
