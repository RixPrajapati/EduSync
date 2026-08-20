// src/components/AttendanceTable.jsx
import { useState, useEffect } from "react";
import { attendanceAPI, courseAPI } from "../services/api";

const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        return null;
    }
};

const AttendanceTable = () => {
    const currentUser = getCurrentUser();
    const [rows, setRows] = useState([]);
    const [overallPct, setOverallPct] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser?._id) { setLoading(false); return; }

        Promise.all([
            attendanceAPI.getMyRecords(currentUser._id),
            courseAPI.getAll(),
            attendanceAPI.getMyPercentage(currentUser._id),
        ])
            .then(([records, courses, percentageData]) => {
                const courseList = Array.isArray(courses) ? courses : (courses?.data ?? []);
                const courseNameById = Object.fromEntries(courseList.map((c) => [c._id, c.courseName]));

                const byCourse = new Map();
                for (const r of records) {
                    const cid = r.courseId;
                    if (!byCourse.has(cid)) byCourse.set(cid, { held: 0, attended: 0 });
                    const c = byCourse.get(cid);
                    c.held += 1;
                    if (r.status === "present") c.attended += 1;
                }

                setRows(Array.from(byCourse.entries()).map(([cid, c]) => ({
                    course: courseNameById[cid] ?? "Unknown course",
                    held: c.held,
                    attended: c.attended,
                    percentage: c.held === 0 ? 0 : Math.round((c.attended / c.held) * 100),
                })));
                setOverallPct(Number(percentageData?.percentage ?? 0));
            })
            .catch(() => setRows([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Current Semester • {overallPct}% Average
            </p>

            {loading ? (
                <p className="text-sm text-gray-400 text-center py-6">Loading…</p>
            ) : rows.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No attendance recorded yet.</p>
            ) : (
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-150">
                        <thead>
                            <tr className="border-b text-left text-xs sm:text-sm text-gray-500">
                                <th className="pb-4 font-medium">COURSE NAME</th>
                                <th className="pb-4 font-medium">LECTURES HELD</th>
                                <th className="pb-4 font-medium">ATTENDED</th>
                                <th className="pb-4 font-medium">PERCENTAGE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-xs sm:text-sm">
                            {rows.map((item, index) => (
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AttendanceTable;
