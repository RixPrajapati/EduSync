import express from "express";
import assignmentController from "../controller/assignment.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";
import { STUDENT, TEACHER, ADMIN } from "../constants/role.js";
import multer, { memoryStorage } from "multer";
import { templateLiteral } from "zod";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create",
  verifyToken,
  allowRoles(TEACHER),
  upload.array("file", 1),
  assignmentController.createAssignment,
);

router.get(
  "/course/:courseId",
  verifyToken,
  assignmentController.getAssignmentByCourse,
);

router.get(
  "/my-submissions",
  verifyToken,
  allowRoles(STUDENT),
  assignmentController.getMySubmissions,
);
router.get("/:id", verifyToken, assignmentController.getAssignmentById);

router.put(
  "/:id",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  upload.array("file", 1),
  assignmentController.updateAssignment,
);

router.delete(
  "/:id",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  assignmentController.deleteAssignment,
);

router.post(
  "/submit",
  verifyToken,
  allowRoles(STUDENT),
  upload.array("file", 1),
  assignmentController.submitAssignment,
);

router.get(
  "/:id/submissions",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  assignmentController.getSubmissionsByAssignment,
);
router.put(
  "/submissions/:submissionId/grade",
  verifyToken,
  allowRoles(TEACHER),
  assignmentController.gradeSummision,
);

export default router;
