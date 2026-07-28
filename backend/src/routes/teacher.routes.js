import express from "express";

import upload from "../middlewares/upload.js";
import teacherController from "../controllers/teacher.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, } from "../constants/roles.js";

const router = express.Router();

// Admin
router.post( "/", verifyToken, roleBasedAuth(ROLE_ADMIN), upload.single("image"), teacherController.createTeacher );

// Logged In Users
router.get("/", verifyToken, teacherController.getTeachers);

router.get("/:id", verifyToken, teacherController.getSingleTeacher);

// Admin
router.put( "/:id", verifyToken, roleBasedAuth(ROLE_ADMIN), upload.single("image"), teacherController.updateTeacher );

router.delete( "/:id", verifyToken, roleBasedAuth(ROLE_ADMIN), teacherController.deleteTeacher );

router.put( "/:id/profile-image", verifyToken, upload.single("image"), teacherController.updateProfileImage );

export default router;