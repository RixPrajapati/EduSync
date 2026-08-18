import express from "express";

import upload from "../middleware/upload.js";
import teacherController from "../controller/teacher.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";
import { ADMIN } from "../constants/role.js";

const router = express.Router();

// Admin
router.post( "/", verifyToken, allowRoles(ADMIN), upload.single("image"), teacherController.createTeacher );

// Logged In Users
router.get("/", verifyToken, teacherController.getTeachers);

router.get("/:id", verifyToken, teacherController.getSingleTeacher);

// Admin
router.put( "/:id", verifyToken, allowRoles(ADMIN), upload.single("image"), teacherController.updateTeacher );

router.delete( "/:id", verifyToken, allowRoles(ADMIN), teacherController.deleteTeacher );

router.put( "/:id/profile-image", verifyToken, upload.single("image"), teacherController.updateProfileImage );

export default router;
