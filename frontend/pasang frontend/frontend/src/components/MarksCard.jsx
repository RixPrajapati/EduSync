// src/components/MarksCard.jsx
import React from 'react';
import { marksData } from '../data/dummyData';

function MarksCard() {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200">
            {/* Card Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    Marks & Performance
                </h2>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    Fall 2024
                </span>
            </div>

            {/* Horizontal Scroll Mask Wrapper for Mobile */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full text-left min-w-137.5">
                    <thead>
                        <tr className="text-gray-400 text-xs sm:text-sm border-b font-medium">
                            <th className="pb-3">SUBJECT</th>
                            <th className="pb-3">MID-TERM</th>
                            <th className="pb-3">END-TERM</th>
                            <th className="pb-3">GRADE</th>
                            <th className="pb-3">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-xs sm:text-sm">
                        {marksData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50/50">
                                <td className="py-4 font-medium text-gray-800">{item.subject}</td>
                                <td className="py-4 text-gray-600">{item.mid}</td>
                                <td className="py-4 text-gray-600">{item.end}</td>
                                <td className="py-4 text-blue-600 font-bold">
                                    {item.grade}
                                </td>
                                <td className="py-4">
                                    <span className="text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-md">
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MarksCard;