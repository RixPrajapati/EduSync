import Assignment from "../models/Assignment.js";
import AssignmentSubmission from "../models/AssignmentSubmission.js";
import { deleteFile, updateFile } from "../utils/fileUploder.js";

const createAssignment = async (data) => {
  return await Assignment.create(data);
};

const getAssignmentByCourse = async (courseId) => {
  return await Assignment.find({ courseId })
    .populate("teacherId", "userName")
    .populate("courseId", "courseName")
    .sort({ dueDate: 1 });
};

const getAssignmentById = async (assignmentId) => {
  const assignment = await Assignment.findById(assignmentId).populate(
    "teacherId",
    "userName",
  );
  if (!assignment) throw new Error("Assignment not found");
  return assignment;
};

const updateAssignment = async (assignmentId, data, newFiles) => {
  const assignment = await Assignment.findById(assignmentId, data);
  if (!assignment) throw new Error("Assignment not Found");

  if (newFiles && newFiles.length > 0) {
    const uploaded = await updateFile(assignment.fileUrl, newFiles);
    data.fileUrl = uploaded[0].secure_url;
  }
  return await Assignment.findByIdAndUpdate(assignmentId, data, {
    returnDocument: "after",
  });
};

const deleteAssignment = async (assignmentId) => {
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) throw new Error("Assignment not Found");

  if (assignment.fileUrl) await deleteFile(assignment.fileUrl);

  return await Assignment.findByIdAndDelete(assignmentId);
};

const submitAssignment = async (data) => {
  const existing = await AssignmentSubmission.findOne({
    assignmentId: data.assignmentId,
    studentId: data.studentId,
  });
  if (existing) throw new Error("Already submitted this assignment ");

  const assignment = await Assignment.findById(data.assignmentId);
  if (!assignment) throw new Error("Assignment not found");

  const isLate = new Date() > new Date(assignment.dueDate);
  if (isLate) data.status = "LATE";

  return await AssignmentSubmission.create(data);
};

const getSubmissionsByAssignment = async (assignmentId) => {
  return await AssignmentSubmission.find({ assignmentId })
    .populate("studentId", "userName rollNo")
    .sort({ createdAt: -1 });
};

const getMySubmissions = async (studentId) => {
  return await AssignmentSubmission.find({ studentId })
    .populate("assignmentId", "title dueDate courseId")
    .sort({ createdAt: -1 });
};

const gradeSummision = async (submissionId, remarks) => {
  const submission = await AssignmentSubmission.findByIdAndUpdate(
    submissionId,
    { remarks, status: "GRADED" },
    { returnDocument: "after" },
  );
  if (!submission) throw new Error("Submission not found");
  return submission;
};
export default {
  createAssignment,
  getAssignmentByCourse,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissionsByAssignment,
  getMySubmissions,
  gradeSummision,
};
