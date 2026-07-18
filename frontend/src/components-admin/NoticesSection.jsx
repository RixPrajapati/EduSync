import { useState, useRef, useEffect } from "react";
import NoticeCard from "./NoticeCard";

const CATEGORY_OPTIONS = [
  { value: "EXAM",      color: "violet" },
  { value: "HOLIDAY",   color: "blue"   },
  { value: "IMPORTANT", color: "red"    },
  { value: "EVENT",     color: "green"  },
  { value: "GENERAL",   color: "amber"  },
];

const CATEGORY_COLOR_MAP = Object.fromEntries(CATEGORY_OPTIONS.map((c) => [c.value, c.color]));

const initialNotices = [
  {
    id: 1,
    category: "EXAM",
    categoryColor: "violet",
    title: "Mid-Term Schedule Released",
    description: "The mid-term examination schedule for all departments has been finalized.",
    time: "2 hrs ago",
  },
  {
    id: 2,
    category: "HOLIDAY",
    categoryColor: "blue",
    title: "Annual Day Celebration",
    description: "School will remain closed on June 10th for Annual Day celebrations.",
    time: "5 hrs ago",
  },
  {
    id: 3,
    category: "IMPORTANT",
    categoryColor: "red",
    title: "Fee Submission Deadline",
    description: "Last date for fee submission is June 15th. Late fees will be applied.",
    time: "1 day ago",
  },
];

function AddNoticeModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: "", description: "", category: "GENERAL" });
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Publish Notice</h3>
              <p className="text-xs text-white/70 mt-0.5">Post a new announcement</p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Title</label>
              <input
                autoFocus
                required
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Mid-Term Exam Schedule"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Description</label>
              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write the notice content..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all placeholder:text-slate-400 resize-none"
              />
            </div>
          </div>
          <div className="px-6 pb-5 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold active:scale-95 transition-all shadow-sm"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function NoticesSection() {
  const [notices, setNotices] = useState(initialNotices);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    const headers = ["Category", "Title", "Description", "Time"];
    const rows = notices.map((n) => [n.category, n.title, n.description, n.time]);
    if (format === "csv") {
      const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
      downloadFile(csv, "notices.csv", "text/csv");
    } else if (format === "tsv") {
      const tsv = [headers, ...rows].map((r) => r.join("\t")).join("\n");
      downloadFile(tsv, "notices.tsv", "text/tab-separated-values");
    }
  };

  const handleAddNotice = (form) => {
    setNotices((prev) => [
      {
        id: Date.now() + Math.floor(Math.random() * 9999),
        category: form.category,
        categoryColor: CATEGORY_COLOR_MAP[form.category] ?? "amber",
        title: form.title.trim(),
        description: form.description.trim(),
        time: "Just now",
      },
      ...prev,
    ]);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 border border-blue-50 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Recent Notices & Announcements</h2>
              <p className="text-slate-400 text-xs mt-0.5">{notices.length} active notice{notices.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={exportRef}>
              <button
                onClick={() => setShowExportMenu((v) => !v)}
                className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 text-sm font-medium px-4 py-2.5 rounded-xl shadow-sm transition-all duration-150"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showExportMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-blue-100 rounded-xl shadow-lg z-10 min-w-[140px] overflow-hidden">
                  {[
                    { label: "CSV", fmt: "csv", ext: ".csv" },
                    { label: "TSV", fmt: "tsv", ext: ".tsv" },
                  ].map(({ label, fmt, ext }) => (
                    <button
                      key={fmt}
                      onClick={() => handleExport(fmt)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-medium">{label}</span>
                      <span className="text-xs text-slate-400">{ext}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-sm shadow-blue-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Publish Notice
            </button>
          </div>
        </div>

        {notices.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-600">No notices yet</p>
            <p className="text-xs text-slate-400 mt-1">Publish the first notice to get started.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Publish First Notice
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddNoticeModal onClose={() => setShowAddModal(false)} onSave={handleAddNotice} />
      )}
    </>
  );
}

export default NoticesSection;
