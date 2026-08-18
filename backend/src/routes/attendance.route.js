import express from "express";
import {verifyToken} from "../middleware/auth.js"

import {
  markAttendance,
  getStudentAttendance,
  getAttendancePercentage,
  getAttendanceOverview,
  getAttendanceByCourse,
} from "../controller/attendance.controller.js";


const router = express.Router();

router.post("/mark", verifyToken,markAttendance);

router.get("/overview", verifyToken, getAttendanceOverview);

router.get("/course/:courseId", verifyToken, getAttendanceByCourse);

router.get("/student/:studentId", verifyToken,getStudentAttendance);

router.get("/percentage/:studentId", verifyToken,getAttendancePercentage);

export default router;
