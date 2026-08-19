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

function NoticeBoard({ bare = false }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    noticeAPI.getAll()
      .then((data) => setNotices(data.slice(0, 5)))
      .catch(() => setNotices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={bare ? "p-6" : "bg-white p-6 rounded-2xl shadow-sm border border-gray-200"}>
      {!bare && <h2 className="text-xl font-semibold mb-5">Notices</h2>}

      {loading ? (
        <p className="text-sm text-gray-400 text-center py-6">Loading…</p>
      ) : notices.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No notices yet.</p>
      ) : (
        <div className="space-y-5">
          {notices.map((notice) => (
            <div key={notice._id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">
                {notice.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {timeAgo(notice.publishedAt ?? notice.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;
