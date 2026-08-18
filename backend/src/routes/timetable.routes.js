import express from "express";

import timetableController from "../controller/timetable.controller.js";

import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";

import { ADMIN, STUDENT, TEACHER } from "../constants/role.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| STUDENT
|--------------------------------------------------------------------------
*/

router.get( "/student/my-timetable", verifyToken, allowRoles(STUDENT), timetableController.getStudentTimetable );

/*
|--------------------------------------------------------------------------
| TEACHER
|--------------------------------------------------------------------------
*/

router.get( "/teacher/my-timetable", verifyToken, allowRoles(TEACHER), timetableController.getTeacherTimetable );

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

// Create Timetable
router.post( "/", verifyToken, allowRoles(ADMIN), timetableController.createTimetable );

// Get All Timetables
router.get( "/", verifyToken, allowRoles(ADMIN), timetableController.getAllTimetables );

// Get Single Timetable
router.get( "/:id", verifyToken, allowRoles(ADMIN), timetableController.getTimetableById );

// Update Timetable
router.put( "/:id", verifyToken, allowRoles(ADMIN), timetableController.updateTimetable );

// Delete Timetable
router.delete( "/:id", verifyToken, allowRoles(ADMIN), timetableController.deleteTimetable );

export default router;
