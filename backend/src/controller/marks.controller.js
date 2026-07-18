import marksService from "../service/marks.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createMarks = async (req, res, next) => {
  try {
    const marks = await marksService.createMarks(req.body, req.token);
    return res
      .status(201)
      .json(new ApiResponse(201, marks, "Marks added successfully"));
  } catch (error) {
    next(error);
  }
};

const updateMarks = async (req, res, next) => {
  try {
    const marks = await marksService.updateMarks(req.params.id, req.body, req.token);
    return res
      .status(200)
      .json(new ApiResponse(200, marks, "Marks updated successfully"));
  } catch (error) {
    next(error);
  }
};

const getMarksByCourse = async (req, res, next) => {
  try {
    const marksList = await marksService.getMarksByCourse(req.params.courseId, req.token);
    return res
      .status(200)
      .json(new ApiResponse(200, marksList, "Marks fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const publishResults = async (req, res, next) => {
  try {
    const result = await marksService.publishResults(req.params.courseId, req.token);
    return res
      .status(200)
      .json(new ApiResponse(200, null, result.message));
  } catch (error) {
    next(error);
  }
};

const getStudentResults = async (req, res, next) => {
  try {
    const results = await marksService.getStudentResults(req.token.id);
    return res
      .status(200)
      .json(new ApiResponse(200, results, "Results fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const getStudentSummary = async (req, res, next) => {
  try {
    const summary = await marksService.getStudentSummary(req.token.id);
    return res
      .status(200)
      .json(new ApiResponse(200, summary, "Result summary fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export default {
  createMarks,
  updateMarks,
  getMarksByCourse,
  publishResults,
  getStudentResults,
  getStudentSummary,
};
