import express from "express";

import upload from "../middleware/upload.js";
import studentController from "../controller/student.controller.js";

import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";

import { ADMIN, STUDENT } from "../constants/role.js";

const router = express.Router();

// Admin
router.post( "/", verifyToken, allowRoles(ADMIN), upload.single("image"), studentController.createStudent );

// Admin
router.get( "/", verifyToken, allowRoles(ADMIN), studentController.getStudents );

// Logged In
router.get("/:id", verifyToken, studentController.getSingleStudent);

// Admin
router.put( "/:id", verifyToken, allowRoles(ADMIN), upload.single("image"), studentController.updateStudent );

// Admin
router.delete( "/:id", verifyToken, allowRoles(ADMIN), studentController.deleteStudent );

// Student/Admin
router.put( "/:id/profile-image", verifyToken, allowRoles(ADMIN, STUDENT), upload.single("image"), studentController.updateProfileImage );

export default router;
