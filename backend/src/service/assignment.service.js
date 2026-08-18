import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import Course from "../models/Course.js";
import uploadFile from "../utils/fileUploder.js";
import { ApiError } from "../utils/ApiError.js";
import { ADMIN, TEACHER } from "../constants/role.js";

// Assignments/submissions are commonly PDFs, unlike profile photos (image-only)
const ASSIGNMENT_FILE_FORMATS = ["jpg", "jpeg", "png", "webp", "pdf"];

const assertOwnsCourse = (course, userToken) => {
  const isTeacher = userToken.role.includes(TEACHER);
  const isAdmin = userToken.role.includes(ADMIN);
  if (isTeacher && !isAdmin && course.teacherId.toString() !== userToken.id) {
    throw new ApiError(403, "You can only manage assignments for courses assigned to you");
  }
};

const createAssignment = async (data, file, userToken) => {
  const course = await Course.findById(data.courseId);
  if (!course) throw new ApiError(404, "Course not found");
  assertOwnsCourse(course, userToken);

  const isTeacher = userToken.role.includes(TEACHER);
  const teacherId = isTeacher ? userToken.id : data.teacherId;
  if (!teacherId) throw new ApiError(400, "teacherId is required");

  let fileUrl = "";
  if (file) {
    const uploaded = await uploadFile([file], ASSIGNMENT_FILE_FORMATS);
    fileUrl = uploaded?.[0]?.url ?? "";
  }

  return await Assignment.create({
    courseId: data.courseId,
    teacherId,
    title: data.title,
    description: data.description ?? "",
    dueDate: data.dueDate,
    fileUrl,
  });
};

const getAssignmentsByCourse = async (courseId) => {
  return await Assignment.find({ courseId }).sort({ dueDate: 1 });
};

const getAssignmentById = async (id) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) throw new ApiError(404, "Assignment not found");
  return assignment;
};

const updateAssignment = async (id, data, file, userToken) => {
  const assignment = await Assignment.findById(id);
  if (!assignment) throw new ApiError(404, "Assignment not found");

  const course = await Course.findById(assignment.courseId);
  if (course) assertOwnsCourse(course, userToken);

  if (data.title !== undefined) assignment.title = data.title;
  if (data.description !== undefined) assignment.description = data.description;
  if (data.dueDate !== undefined) assignment.dueDate = data.dueDate;

  if (file) {
    const uploaded = await uploadFile([file], ASSIGNMENT_FILE_FORMATS);
    assignment.fileUrl = uploaded?.[0]?.url ?? assignment.fileUrl;
  }

  await assignment.save();
  return assignment;
};

const deleteAssignment = async (id) => {
  const assignment = await Assignment.findByIdAndDelete(id);
  if (!assignment) throw new ApiError(404, "Assignment not found");
  return { message: "Assignment deleted successfully" };
};

const submitAssignment = async (data, file, studentId) => {
  if (!file) throw new ApiError(400, "A file is required to submit an assignment");

  const assignment = await Assignment.findById(data.assignmentId);
  if (!assignment) throw new ApiError(404, "Assignment not found");

  const existing = await Submission.findOne({ assignmentId: data.assignmentId, studentId });
  if (existing) throw new ApiError(409, "You have already submitted this assignment");

  const uploaded = await uploadFile([file], ASSIGNMENT_FILE_FORMATS);
  const submittedFile = uploaded?.[0]?.url ?? "";

  const status = new Date() > new Date(assignment.dueDate) ? "LATE" : "SUBMITTED";

  return await Submission.create({
    assignmentId: data.assignmentId,
    studentId,
    submittedFile,
    status,
  });
};

const getSubmissionsByAssignment = async (assignmentId) => {
  return await Submission.find({ assignmentId }).populate("studentId", "userName rollNo email");
};

const getMySubmissions = async (studentId) => {
  return await Submission.find({ studentId }).populate("assignmentId", "title dueDate");
};

const gradeSubmission = async (submissionId, remarks) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) throw new ApiError(404, "Submission not found");

  submission.status = "GRADED";
  if (remarks !== undefined) submission.remarks = remarks;
  await submission.save();
  return submission;
};

export default {
  createAssignment,
  getAssignmentsByCourse,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissionsByAssignment,
  getMySubmissions,
  gradeSubmission,
};
