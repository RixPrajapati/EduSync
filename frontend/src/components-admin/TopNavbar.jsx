import { useState, useEffect, useRef } from "react";
import { noticeAPI } from "../services/api";

const today = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

function getCurrentUserName() {
  try {
    return JSON.parse(localStorage.getItem("user"))?.userName ?? "Admin";
  } catch {
    return "Admin";
  }
}

function timeAgo(dateStr) {
  const diffMins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hr${diffHrs !== 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
}

const LAST_SEEN_KEY = "notices_last_seen_at";

function TopNavbar({ onMenuClick, onAddStudent }) {
  const userName = getCurrentUserName();
  const [notices, setNotices] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef(null);

  useEffect(() => {
    noticeAPI.getAll()
      .then((data) => {
        const list = Array.isArray(data) ? data.slice(0, 5) : [];
        setNotices(list);
        const lastSeen = Number(localStorage.getItem(LAST_SEEN_KEY) ?? 0);
        setHasUnread(list.some((n) => new Date(n.publishedAt ?? n.createdAt).getTime() > lastSeen));
      })
      .catch(() => setNotices([]));
  }, []);

  const handleToggleNotifications = () => {
    setShowNotifications((v) => !v);
    if (!showNotifications) {
      localStorage.setItem(LAST_SEEN_KEY, String(Date.now()));
      setHasUnread(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-blue-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-500 hover:bg-blue-50 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Institutional Dashboard</h1>
          <p className="text-slate-400 text-sm leading-tight">Welcome back, {userName} &mdash; {today}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search students, records..."
            className="w-72 pl-9 pr-4 py-2.5 bg-blue-50 border border-blue-100 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Notification bell */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={handleToggleNotifications}
            className="relative p-2.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {hasUnread && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-blue-100 rounded-xl shadow-lg z-10 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-700">Recent Notices</p>
              </div>
              {notices.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No notices yet.</p>
              ) : (
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                  {notices.map((n) => (
                    <div key={n._id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                      <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{timeAgo(n.publishedAt ?? n.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Student */}
        <button
          onClick={onAddStudent}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add Student</span>
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;
