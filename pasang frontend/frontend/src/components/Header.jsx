// src/components/Header.jsx
import React from 'react';
import { Search } from "lucide-react";

function Header({ onMenuToggle }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-1 px-2">
            {/* Title & Mobile Toggle Row */}
            <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex items-center gap-3">
                    {/* Hamburger Button (Only visible on mobile screens) */}
                    <button
                        onClick={onMenuToggle}
                        className="md:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none cursor-pointer"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
                </div>
            </div>

            {/* Right Actions Section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                {/* Search Bar adapts width dynamically */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-white border text-sm rounded-full px-5 py-2.5 w-full sm:w-48 lg:w-64 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700 placeholder-gray-400 <img src:img/lens.png>"
                />

                {/* Icons & Download Button Group */}
                <div className="flex items-center justify-end gap-3 sm:gap-4">
                    {/* Bell Icon Button */}
                    <button className="text-gray-500 hover:text-gray-500 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>

                    {/* Settings Icon Button */}
                    <button className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    {/* Vertical Divider Line (Matches your screenshot) */}
                    <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

                    {/* Action Button with Download Arrow Icon */}
                    <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm active:scale-95 duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;