import express from "express";
import assignmentController from "../controller/assignment.controller.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";
import { ADMIN, TEACHER, STUDENT } from "../constants/role.js";

const router = express.Router();

router.post("/create", verifyToken, allowRoles(TEACHER, ADMIN), upload.single("file"), assignmentController.createAssignment);

router.get("/course/:courseId", verifyToken, assignmentController.getAssignmentsByCourse);

// Literal paths before /:id so they aren't shadowed
router.get("/my-submissions", verifyToken, allowRoles(STUDENT), assignmentController.getMySubmissions);

router.post("/submit", verifyToken, allowRoles(STUDENT), upload.single("file"), assignmentController.submitAssignment);

router.put("/submissions/:submissionId/grade", verifyToken, allowRoles(TEACHER), assignmentController.gradeSubmission);

router.get("/:id/submissions", verifyToken, allowRoles(TEACHER, ADMIN), assignmentController.getSubmissionsByAssignment);

router.get("/:id", verifyToken, assignmentController.getAssignmentById);

router.put("/:id", verifyToken, allowRoles(TEACHER, ADMIN), upload.single("file"), assignmentController.updateAssignment);

router.delete("/:id", verifyToken, allowRoles(TEACHER, ADMIN), assignmentController.deleteAssignment);

export default router;
