import Attendance from "../models/Attendance.js";
import Student from "../models/Student.model.js";

export const createAttendanceService = async (attendanceData) => {
  return await Attendance.create(attendanceData);
};

export const getStudentAttendanceService = async (studentId) => {
  return await Attendance.find({
    studentId,
  }).sort({ date: -1 });
};

export const getAttendancePercentageService = async (studentId) => {
  const totalClasses = await Attendance.countDocuments({
    studentId,
  });

  const presentClasses = await Attendance.countDocuments({
    studentId,
    status: "present",
  });

  const percentage =
    totalClasses === 0 ? 0 : ((presentClasses / totalClasses) * 100).toFixed(2);

  return {
    totalClasses,
    presentClasses,
    percentage,
  };
};

const LOW_ATTENDANCE_THRESHOLD = 75;

export const getAttendanceOverviewService = async () => {
  const allRecords = await Attendance.find({});
  const totalClasses = allRecords.length;
  const presentClasses = allRecords.filter((r) => r.status === "present").length;
  const overallPercentage = totalClasses === 0 ? 0 : Number(((presentClasses / totalClasses) * 100).toFixed(1));

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const todayRecords = allRecords.filter(
    (r) => r.attendanceDate >= startOfDay && r.attendanceDate <= endOfDay
  );
  const presentToday = todayRecords.filter((r) => r.status === "present").length;
  const absentToday = todayRecords.filter((r) => r.status === "absent").length;

  // Per-student aggregation
  const perStudent = new Map();
  for (const r of allRecords) {
    const sid = r.studentId.toString();
    if (!perStudent.has(sid)) perStudent.set(sid, { total: 0, present: 0 });
    const s = perStudent.get(sid);
    s.total += 1;
    if (r.status === "present") s.present += 1;
  }

  const studentProfiles = await Student.find({ user: { $in: Array.from(perStudent.keys()) } })
    .populate("user", "userName");
  const profileByUserId = new Map(studentProfiles.map((s) => [s.user._id.toString(), s]));

  const lowAttendanceStudents = [];
  const courseAgg = new Map();

  for (const [sid, stats] of perStudent) {
    const pct = stats.total === 0 ? 0 : Number(((stats.present / stats.total) * 100).toFixed(1));
    const profile = profileByUserId.get(sid);
    const course = profile?.course ?? "Unassigned";

    if (!courseAgg.has(course)) courseAgg.set(course, { total: 0, present: 0, students: 0 });
    const c = courseAgg.get(course);
    c.total += stats.total;
    c.present += stats.present;
    c.students += 1;

    if (pct < LOW_ATTENDANCE_THRESHOLD) {
      lowAttendanceStudents.push({
        id: sid,
        name: profile?.user?.userName ?? "Unknown",
        course,
        attendance: pct,
      });
    }
  }

  const departmentWise = Array.from(courseAgg.entries()).map(([course, c]) => ({
    course,
    avgAttendance: c.total === 0 ? 0 : Number(((c.present / c.total) * 100).toFixed(1)),
    totalStudents: c.students,
  }));

  return {
    overallPercentage,
    totalStudents: perStudent.size,
    presentToday,
    absentToday,
    lowAttendanceStudents,
    departmentWise,
  };
};

export const getAttendanceByCourseService = async (courseId) => {
  const records = await Attendance.find({ courseId }).populate("studentId", "userName");

  const perStudent = new Map();
  for (const r of records) {
    const sid = r.studentId._id.toString();
    if (!perStudent.has(sid)) {
      perStudent.set(sid, { id: sid, name: r.studentId.userName, total: 0, present: 0 });
    }
    const s = perStudent.get(sid);
    s.total += 1;
    if (r.status === "present") s.present += 1;
  }

  return Array.from(perStudent.values()).map((s) => ({
    ...s,
    percentage: s.total === 0 ? 0 : Number(((s.present / s.total) * 100).toFixed(1)),
  }));
};
