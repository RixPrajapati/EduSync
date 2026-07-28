import express from "express";

import upload from "../middlewares/upload.js";
import studentController from "../controllers/student.controller.js";

import verifyToken from "../middlewares/verifyToken.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

import { ROLE_ADMIN, ROLE_STUDENT, } from "../constants/roles.js";

const router = express.Router();

// Admin
router.post( "/", verifyToken, roleBasedAuth(ROLE_ADMIN), upload.single("image"), studentController.createStudent );

// Admin
router.get( "/", verifyToken, roleBasedAuth(ROLE_ADMIN), studentController.getStudents );

// Logged In
router.get("/:id", verifyToken, studentController.getSingleStudent);

// Admin
router.put( "/:id", verifyToken, roleBasedAuth(ROLE_ADMIN), upload.single("image"), studentController.updateStudent );

// Admin
router.delete( "/:id", verifyToken, roleBasedAuth(ROLE_ADMIN), studentController.deleteStudent );

// Student/Admin
router.put( "/:id/profile-image", verifyToken, roleBasedAuth(ROLE_ADMIN, ROLE_STUDENT), upload.single("image"), studentController.updateProfileImage );

export default router;