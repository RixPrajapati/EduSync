import {
  createAttendanceService,
  getStudentAttendanceService,
  getAttendancePercentageService,
} from "../service/attendance.service.js";

import {ApiResponse} from "../utils/apiResponse.js";
import {ApiError} from "../utils/ApiError.js";

export const markAttendance = async (
  req,
  res,
  next
) => {
  try {
    const attendance =
      await createAttendanceService({
        ...req.body,
        teacherId: req.token.id,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        attendance,
        "Attendance marked successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getStudentAttendance =
  async (req, res, next) => {
    try {
      const { studentId } = req.params;

      const attendance =
        await getStudentAttendanceService(
          studentId
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          attendance,
          "Attendance fetched successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const getAttendancePercentage =
  async (req, res, next) => {
    try {
      const { studentId } = req.params;

      const result =
        await getAttendancePercentageService(
          studentId
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          result,
          "Attendance percentage fetched"
        )
      );
    } catch (error) {
      next(error);
    }
  };