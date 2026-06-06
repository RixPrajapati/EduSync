import React from "react";

const stats = [
  {
    title: "Total Students",
    value: "1,200",
    trend: "+5% vs last month",
    trendPositive: true,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    accent: "border-t-blue-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Total Teachers",
    value: "85",
    trend: "96% Active",
    trendPositive: true,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    accent: "border-t-emerald-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Revenue",
    value: "$120k",
    trend: "85% Fees Collected",
    trendPositive: true,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    accent: "border-t-amber-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Total Courses",
    value: "24",
    trend: "6 Departments",
    trendPositive: null,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    accent: "border-t-violet-400",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-2xl border border-blue-50 border-t-4 ${stat.accent} shadow-sm hover:shadow-md hover:shadow-blue-100/60 transition-all duration-200`}
        >
          <div className="flex items-start justify-between mb-4">
            <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
            <div className={`${stat.iconBg} ${stat.iconColor} p-2 rounded-xl shrink-0`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
          <div className={`flex items-center gap-1 text-sm mt-2 font-medium ${
            stat.trendPositive === true ? "text-emerald-600" : stat.trendPositive === false ? "text-red-500" : "text-slate-400"
          }`}>
            {stat.trendPositive === true && (
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            )}
            {stat.trendPositive === false && (
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
            <span>{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
