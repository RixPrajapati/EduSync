import Enrollment from "../models/Enrollment.js";

// const enrollCourse = async (studentId, courseId) => {
//   const existing = await Enrollment.findOne({ studentId, courseId });
//   if (existing) throw new Error("Already enrolled");

//   const enrollment = await Enrollment.create({ studentId, courseId });
//   return enrollment;
// };

const enrollCourse = async (studentId, courseId) => {
  const existing = await Enrollment.findOne({ studentId, courseId });

  if (!existing) {
    return await Enrollment.create({ studentId, courseId, status: "PENDING" });
  }

  if (existing.status === "ACTIVE") {
    throw new Error("Already enrolled in this course");
  }

  existing.status = "PENDING";
  await existing.save();
  return existing;
};
const approveEnrollment = async (enrollmentId) => {
  const enrollment = await Enrollment.findByIdAndUpdate(
    enrollmentId,
    { status: "ACTIVE" },
    { returnDocument: "after" },
  );

  if (!enrollment) throw new Error("Enrollment not Found");
  return enrollment;
};

const getPendingEnrollments = async (courseId) => {
  return await Enrollment.find({ courseId, status: "PENDING" })
    .populate("studentId", "userName email rollNo semester")
    .populate("courseId", "courseName courseCode");
};

const getMyEnrollments = async (studentId) => {
  return await Enrollment.find({
    studentId,
    status: { $in: ["ACTIVE", "PENDING"] },
  }).populate("courseId", "courseName courseCode semester creditHours");
};
const getEnrollmentsByCourse = async (courseId) => {
  return await Enrollment.find({ courseId, status: "ACTIVE" })
    .populate("studentId", "userName rollNo semester ")
    .populate("courseId", "courseName courseCode creditHours");
};

const dropCourse = async (studentId, courseId) => {
  const enrollment = await Enrollment.findOneAndUpdate(
    { studentId, courseId },
    { status: "Dropped" },
    { returnDocument: "after" },
  );

  if (!enrollment) throw new Error("Enrollment not Found");
  return enrollment;
};
export default {
  enrollCourse,
  approveEnrollment,
  getPendingEnrollments,
  getMyEnrollments,
  getEnrollmentsByCourse,
  dropCourse,
};
