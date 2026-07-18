import express from "express";

import {
  markAttendance,
  getStudentAttendance,
  getAttendancePercentage,
} from "../controller/attendance.controller.js";


const router = express.Router();

router.post("/mark", markAttendance);

router.get("/student/:studentId", getStudentAttendance);

router.get("/percentage/:studentId", getAttendancePercentage);

export default router;
