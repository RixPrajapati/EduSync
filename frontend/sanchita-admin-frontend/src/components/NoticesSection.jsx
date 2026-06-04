// src/components/NoticesSection.jsx
import React from "react";
import NoticeCard from "./NoticeCard";

function NoticesSection() {
  const notices = [
    {
      id: 1,
      category: "EXAM",
      categoryColor: "violet",
      title: "Mid-Term Schedule Released",
      description:
        "The mid-term examination schedule for all departments has been finalized.",
      time: "2 hrs ago",
    },
    {
      id: 2,
      category: "HOLIDAY",
      categoryColor: "blue",
      title: "Annual Day Celebration",
      description:
        "School will remain closed on June 10th for Annual Day celebrations.",
      time: "5 hrs ago",
    },
    {
      id: 3,
      category: "IMPORTANT",
      categoryColor: "red",
      title: "Fee Submission Deadline",
      description:
        "Last date for fee submission is June 15th. Late fees will be applied.",
      time: "1 day ago",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Recent Notices & Announcements
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">{notices.length} active notices</p>
        </div>
        <button
          onClick={() => alert("Notice modal coming soon!")}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-sm text-sm font-medium"
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Publish Notice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  );
}

export default NoticesSection;
