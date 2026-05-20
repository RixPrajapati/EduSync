// src/components/AttendanceTable.jsx
import React from 'react';

const AttendanceTable = () => {
    const attendanceData = [
        { course: "Physics II", held: 40, attended: 38, percentage: 95 },
        { course: "Software Engineering", held: 32, attended: 28, percentage: 87 },
        { course: "Data Visualization", held: 28, attended: 27, percentage: 96 },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 h-full">
            {/* Header section */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    Attendance Overview
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center gap-1">
                    View Calendar <span aria-hidden="true">→</span>
                </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Current Semester • 92% Average
            </p>

            {/* Horizontal Scroll Mask Wrapper for Mobile */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-150">
                    <thead>
                        <tr className="border-b text-left text-xs sm:text-sm text-gray-500">
                            <th className="pb-4 font-medium">COURSE NAME</th>
                            <th className="pb-4 font-medium">LECTURES HELD</th>
                            <th className="pb-4 font-medium">ATTENDED</th>
                            <th className="pb-4 font-medium">PERCENTAGE</th>
                            <th className="pb-4 font-medium text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-xs sm:text-sm">
                        {attendanceData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50/50">
                                <td className="py-4 font-medium text-gray-800">{item.course}</td>
                                <td className="py-4 text-gray-600">{item.held}</td>
                                <td className="py-4 text-gray-600">{item.attended}</td>
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-600"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                        <span className="font-semibold text-emerald-600">
                                            {item.percentage}%
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 text-center">
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                        ⓘ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceTable;