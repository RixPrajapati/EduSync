import assignmentService from "../service/assignment.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.createAssignment(req.body, req.file, req.token);
    return res.status(201).json(new ApiResponse(201, assignment, "Assignment created successfully"));
  } catch (error) {
    next(error);
  }
};

const getAssignmentsByCourse = async (req, res, next) => {
  try {
    const assignments = await assignmentService.getAssignmentsByCourse(req.params.courseId);
    return res.status(200).json(new ApiResponse(200, assignments, "Assignments fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);
    return res.status(200).json(new ApiResponse(200, assignment, "Assignment fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.updateAssignment(req.params.id, req.body, req.file, req.token);
    return res.status(200).json(new ApiResponse(200, assignment, "Assignment updated successfully"));
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const result = await assignmentService.deleteAssignment(req.params.id);
    return res.status(200).json(new ApiResponse(200, null, result.message));
  } catch (error) {
    next(error);
  }
};

const submitAssignment = async (req, res, next) => {
  try {
    const submission = await assignmentService.submitAssignment(req.body, req.file, req.token.id);
    return res.status(201).json(new ApiResponse(201, submission, "Assignment submitted successfully"));
  } catch (error) {
    next(error);
  }
};

const getSubmissionsByAssignment = async (req, res, next) => {
  try {
    const submissions = await assignmentService.getSubmissionsByAssignment(req.params.id);
    return res.status(200).json(new ApiResponse(200, submissions, "Submissions fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const getMySubmissions = async (req, res, next) => {
  try {
    const submissions = await assignmentService.getMySubmissions(req.token.id);
    return res.status(200).json(new ApiResponse(200, submissions, "Submissions fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const submission = await assignmentService.gradeSubmission(req.params.submissionId, req.body.remarks);
    return res.status(200).json(new ApiResponse(200, submission, "Submission graded successfully"));
  } catch (error) {
    next(error);
  }
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
