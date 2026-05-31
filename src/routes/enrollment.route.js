import express from "express";
import enrollementController from "../controller/enrollement.controller.js";

import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";
import { STUDENT, TEACHER, ADMIN } from "../constants/role.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  allowRoles(STUDENT),
  enrollementController.enrollCourse,
);

router.get(
  "/myEnrolls",
  verifyToken,
  allowRoles(STUDENT),
  enrollementController.getMyEnrollments,
);
router.get(
  "/pending/:courseId",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  enrollementController.getPendingEnrollments,
);

router.get(
  "/:courseId",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  enrollementController.getEnrollmentsByCourse,
);

router.put(
  "/drop",
  verifyToken,
  allowRoles(STUDENT),
  enrollementController.dropCourse,
);

router.put(
  "/:enrollmentId/approve",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  enrollementController.approveEnrollment,
);

export default router;
