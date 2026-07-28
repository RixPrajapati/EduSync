import express from "express";

import timetableController from "../controllers/timetable.controller.js";

import verifyToken from "../middlewares/verifyToken.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER, } from "../constants/roles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

// Create Timetable
router.post( "/", verifyToken, roleBasedAuth(ROLE_ADMIN), timetableController.createTimetable );

// Get All Timetables
router.get( "/", verifyToken, roleBasedAuth(ROLE_ADMIN), timetableController.getAllTimetables );

// Get Single Timetable
router.get( "/:id", verifyToken, roleBasedAuth(ROLE_ADMIN), timetableController.getTimetableById );

// Update Timetable
router.put( "/:id", verifyToken, roleBasedAuth(ROLE_ADMIN), timetableController.updateTimetable );

// Delete Timetable
router.delete( "/:id", verifyToken, roleBasedAuth(ROLE_ADMIN), timetableController.deleteTimetable );

/*
|--------------------------------------------------------------------------
| STUDENT
|--------------------------------------------------------------------------
*/

router.get( "/student/my-timetable", verifyToken, roleBasedAuth(ROLE_STUDENT), timetableController.getStudentTimetable );

/*
|--------------------------------------------------------------------------
| TEACHER
|--------------------------------------------------------------------------
*/

router.get( "/teacher/my-timetable", verifyToken, roleBasedAuth(ROLE_TEACHER), timetableController.getTeacherTimetable );

export default router;