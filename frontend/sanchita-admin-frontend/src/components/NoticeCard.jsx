// src/components/NoticeCard.jsx
import React from "react";

function NoticeCard({ notice }) {
  const categoryColors = {
    violet: "bg-violet-100 text-violet-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
  };

  const borderAccents = {
    violet: "border-l-violet-400",
    blue: "border-l-blue-400",
    red: "border-l-red-400",
    green: "border-l-emerald-400",
    amber: "border-l-amber-400",
  };

  const accent = borderAccents[notice.categoryColor] || borderAccents.blue;

  return (
    <div className={`border border-slate-100 border-l-4 ${accent} rounded-2xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer bg-slate-50 hover:bg-white hover:-translate-y-0.5`}>
      <span
        className={`${
          categoryColors[notice.categoryColor] || categoryColors.blue
        } text-xs font-semibold px-3 py-1 rounded-full`}
      >
        {notice.category}
      </span>
      <h3 className="font-semibold text-slate-800 mt-4 text-lg">
        {notice.title}
      </h3>
      <p className="text-slate-600 text-sm mt-2 line-clamp-2">
        {notice.description}
      </p>
      <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {notice.time}
      </p>
    </div>
  );
}

export default NoticeCard;
