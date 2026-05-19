// src/components/Sidebar.jsx
import React from "react";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Dark Background Overlay mask for mobile view backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Main Frame */}
      <div
        className={`
    fixed top-0 left-0 bottom-0 bg-white border-r p-5 flex flex-col z-50 transition-transform duration-300 ease-in-out
    w-64 h-screen md:h-auto md:min-h-screen md:static md:translate-x-0 
    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >
        {/* Top Navigation Links */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-bold text-blue-600">EduSync</h1>
            {/* Close button inside mobile slideout menu view */}
            <button
              onClick={onClose}
              className="md:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul className="space-y-2 text-gray-700 font-medium">
            {/* 1. Dashboard */}
            <li className="hover:bg-gray-100 active:scale-95 active:animate-pulse p-3 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-3">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 14a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
                />
              </svg>
              <span>Dashboard</span>
            </li>

            {/* 2. Attendance */}
            <li className="hover:bg-gray-100 active:scale-95 active:animate-pulse p-3 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Attendance</span>
            </li>

            {/* 3. Marks */}
            <li className="hover:bg-gray-100 active:scale-95 active:animate-pulse p-3 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Marks</span>
            </li>
            {/* 4. Assignments */}
            <li className="hover:bg-gray-100 active:scale-95 active:animate-pulse p-3 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"
                />
              </svg>
              <span>Assignments</span>
            </li>

            {/* 5. Fees */}
            <li className="hover:bg-gray-100 active:scale-95 active:animate-pulse p-3 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Fees</span>
            </li>

            {/* 6. Notices */}
            <li className="hover:bg-gray-100 active:scale-95 active:animate-pulse p-3 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              <span>Notices</span>
            </li>
          </ul>
        </div>

        {/* Account Profile Banner Wrapper (Responsive container setup) */}
        <div className=" bg-gray-50 p-4 rounded-xl border w-full mt-7">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-sm text-gray-800">
                Alex Johnson
              </h3>
              <p className="text-xs text-gray-500">ID: EDU-202409</p>
            </div>
          </div>
          <button className="w-full bg-white border py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer active:scale-95 duration-150">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;


