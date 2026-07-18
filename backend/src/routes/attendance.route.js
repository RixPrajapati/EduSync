import express from "express";
import {verifyToken} from "../middleware/auth.js"

import {
  markAttendance,
  getStudentAttendance,
  getAttendancePercentage,
} from "../controller/attendance.controller.js";


const router = express.Router();

router.post("/mark", verifyToken,markAttendance);

router.get("/student/:studentId", verifyToken,getStudentAttendance);

router.get("/percentage/:studentId", verifyToken,getAttendancePercentage);

export default router;
