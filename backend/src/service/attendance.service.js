import Attendance from "../models/Attendance.js";

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
