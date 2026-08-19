// src/components/MarksCard.jsx
import { useState, useEffect } from 'react';
import { marksAPI } from '../services/api';

const GRADE_STYLE = {
  "A+": "bg-emerald-50 text-emerald-600", "A": "bg-emerald-50 text-emerald-600",
  "B+": "bg-blue-50 text-blue-600", "B": "bg-blue-50 text-blue-600",
  "C+": "bg-amber-50 text-amber-600", "C": "bg-amber-50 text-amber-600",
  "F": "bg-red-50 text-red-600",
};

function MarksCard() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        marksAPI.getMyResults()
            .then(setResults)
            .catch(() => setResults([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-4 sm:p-6">

            {loading ? (
                <p className="text-sm text-gray-400 text-center py-6">Loading…</p>
            ) : results.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No published results yet.</p>
            ) : (
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <table className="w-full text-left min-w-137.5">
                        <thead>
                            <tr className="text-gray-400 text-xs sm:text-sm border-b font-medium">
                                <th className="pb-3">SUBJECT</th>
                                <th className="pb-3">INTERNAL</th>
                                <th className="pb-3">PRACTICAL</th>
                                <th className="pb-3">FINAL</th>
                                <th className="pb-3">TOTAL</th>
                                <th className="pb-3">GRADE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-xs sm:text-sm">
                            {results.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50/50">
                                    <td className="py-4 font-medium text-gray-800">{item.courseName || "Unknown course"}</td>
                                    <td className="py-4 text-gray-600">{item.internalMarks}</td>
                                    <td className="py-4 text-gray-600">{item.practicalMarks}</td>
                                    <td className="py-4 text-gray-600">{item.finalExamMarks}</td>
                                    <td className="py-4 font-bold text-gray-800">{item.totalMarks}</td>
                                    <td className="py-4">
                                        <span className={`font-medium px-2.5 py-1 rounded-md ${GRADE_STYLE[item.grade] ?? "bg-gray-50 text-gray-600"}`}>
                                            {item.grade}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MarksCard;
