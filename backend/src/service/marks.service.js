import Marks from "../models/Marks.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { calculateGrade } from "../utils/calculateGrade.js";
import { ApiError } from "../utils/ApiError.js";
import { ADMIN, TEACHER, STUDENT } from "../constants/role.js";

const createMarks = async (data, userToken) => {
  // 1. Find course
  const course = await Course.findById(data.courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // 2. Check teacher permission limit: Teacher can only add marks for courses assigned to them
  const isTeacher = userToken.role.includes(TEACHER);
  const isAdmin = userToken.role.includes(ADMIN);
  if (isTeacher && !isAdmin) {
    if (course.teacherId.toString() !== userToken.id) {
      throw new ApiError(403, "You can only add marks for courses assigned to you");
    }
  }

  // 3. Verify student exists and has student role
  const student = await User.findById(data.studentId);
  if (!student || !student.role.includes(STUDENT)) {
    throw new ApiError(404, "Student not found");
  }

  // 4. Prevent duplicates
  const duplicate = await Marks.findOne({
    studentId: data.studentId,
    courseId: data.courseId,
  });
  if (duplicate) {
    throw new ApiError(409, "Marks record already exists for this student in this course");
  }

  // 5 & 6. Calculate total and grade
  const internalMarks = data.internalMarks ?? 0;
  const practicalMarks = data.practicalMarks ?? 0;
  const finalExamMarks = data.finalExamMarks ?? 0;
  const totalMarks = internalMarks + practicalMarks + finalExamMarks;
  const grade = calculateGrade(totalMarks);

  // 7 & 8. Save marks (isPublished defaults to false)
  const newMarks = await Marks.create({
    studentId: data.studentId,
    courseId: data.courseId,
    teacherId: userToken.id,
    internalMarks,
    practicalMarks,
    finalExamMarks,
    totalMarks,
    grade,
    remarks: data.remarks || "",
    isPublished: false,
  });

  return newMarks;
};

const updateMarks = async (id, data, userToken) => {
  // 1. Find existing marks record
  const marksRecord = await Marks.findById(id);
  if (!marksRecord) {
    throw new ApiError(404, "Marks record not found");
  }

  // 2. Find course to verify permissions
  const course = await Course.findById(marksRecord.courseId);
  if (!course) {
    throw new ApiError(404, "Associated course not found");
  }

  // 3. Check teacher permission limit: Teacher can only update own course marks
  const isTeacher = userToken.role.includes(TEACHER);
  const isAdmin = userToken.role.includes(ADMIN);
  if (isTeacher && !isAdmin) {
    if (course.teacherId.toString() !== userToken.id) {
      throw new ApiError(403, "You can only update marks for courses assigned to you");
    }
  }

  // 4 & 5. Recalculate totalMarks and grade based on merged updates
  const internalMarks = data.internalMarks !== undefined ? data.internalMarks : marksRecord.internalMarks;
  const practicalMarks = data.practicalMarks !== undefined ? data.practicalMarks : marksRecord.practicalMarks;
  const finalExamMarks = data.finalExamMarks !== undefined ? data.finalExamMarks : marksRecord.finalExamMarks;
  const totalMarks = internalMarks + practicalMarks + finalExamMarks;
  const grade = calculateGrade(totalMarks);

  marksRecord.internalMarks = internalMarks;
  marksRecord.practicalMarks = practicalMarks;
  marksRecord.finalExamMarks = finalExamMarks;
  marksRecord.totalMarks = totalMarks;
  marksRecord.grade = grade;
  if (data.remarks !== undefined) {
    marksRecord.remarks = data.remarks;
  }

  await marksRecord.save();
  return marksRecord;
};

const getMarksByCourse = async (courseId, userToken) => {
  // 1. Verify course existence
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // 2. Check teacher permissions
  const isTeacher = userToken.role.includes(TEACHER);
  const isAdmin = userToken.role.includes(ADMIN);
  if (isTeacher && !isAdmin) {
    if (course.teacherId.toString() !== userToken.id) {
      throw new ApiError(403, "You can only view marks for courses assigned to you");
    }
  }

  // 3. Fetch marks and populate
  const marksList = await Marks.find({ courseId })
    .populate("studentId", "userName rollNo")
    .populate("courseId", "courseName");

  return marksList;
};

const publishResults = async (courseId, userToken) => {
  // 1. Verify course existence
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // 2. Check teacher permissions
  const isTeacher = userToken.role.includes(TEACHER);
  const isAdmin = userToken.role.includes(ADMIN);
  if (isTeacher && !isAdmin) {
    if (course.teacherId.toString() !== userToken.id) {
      throw new ApiError(403, "You can only publish results for courses assigned to you");
    }
  }

  // 3. Update marks isPublished = true for given course
  await Marks.updateMany({ courseId }, { isPublished: true });
  return { message: "Results published successfully" };
};

const getStudentResults = async (studentId) => {
  // Fetch published marks records for this student
  const results = await Marks.find({ studentId, isPublished: true })
    .populate("courseId", "courseName courseCode");

  // Map to format required by API 5 response spec
  return results.map((r) => ({
    courseName: r.courseId?.courseName || "",
    courseCode: r.courseId?.courseCode || "",
    internalMarks: r.internalMarks,
    practicalMarks: r.practicalMarks,
    finalExamMarks: r.finalExamMarks,
    totalMarks: r.totalMarks,
    grade: r.grade,
  }));
};

const getStudentSummary = async (studentId) => {
  // Fetch published marks records for calculations
  const results = await Marks.find({ studentId, isPublished: true });

  const totalCourses = results.length;
  const passedCourses = results.filter((r) => r.grade !== "F").length;
  const failedCourses = results.filter((r) => r.grade === "F").length;
  const totalMarksSum = results.reduce((sum, r) => sum + r.totalMarks, 0);
  const averageMarks = totalCourses === 0 ? 0 : Number((totalMarksSum / totalCourses).toFixed(1));
  const overallGrade = totalCourses === 0 ? "F" : calculateGrade(averageMarks);

  return {
    totalCourses,
    passedCourses,
    failedCourses,
    averageMarks,
    overallGrade,
  };
};

export default {
  createMarks,
  updateMarks,
  getMarksByCourse,
  publishResults,
  getStudentResults,
  getStudentSummary,
};
