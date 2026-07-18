import courseController from "../controller/course.controller.js";

import express from "express";
import { allowRoles } from "../middleware/course.js";
import { verifyToken } from "../middleware/auth.js";
import { ADMIN, TEACHER } from "../constants/role.js";

const router = express.Router();

router.get("/", verifyToken, courseController.getAllCourses);

router.get("/semester/:semester", verifyToken, courseController.getCourseBySem);

router.get(
  "/teacher/:teacherId",
  verifyToken,
  courseController.getCourseByTeacher,
);

router.post(
  "/",
  verifyToken,
  allowRoles(TEACHER),
  courseController.createCourse,
);

router.get("/:id", verifyToken, courseController.getCourseById);

router.put(
  "/:id",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  courseController.updateCourse,
);

router.delete(
  "/:id",
  verifyToken,
  allowRoles(ADMIN),
  courseController.deleteCourse,
);

export default router;
