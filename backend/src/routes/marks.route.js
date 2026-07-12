import express from "express";
import marksController from "../controller/marks.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";
import validation from "../middleware/validation.js";
import { ADMIN, TEACHER, STUDENT } from "../constants/role.js";
import { createMarksSchema, updateMarksSchema } from "../lib/schemas/marks.schema.js";

const router = express.Router();

// 1. Add Marks (Teacher, Admin)
router.post(
  "/",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  validation(createMarksSchema),
  marksController.createMarks
);

// 2. Update Marks (Teacher, Admin)
router.put(
  "/:id",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  validation(updateMarksSchema),
  marksController.updateMarks
);

// 3. Get Marks by Course (Teacher, Admin)
router.get(
  "/course/:courseId",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  marksController.getMarksByCourse
);

// 4. Publish Results (Teacher, Admin)
router.patch(
  "/publish/:courseId",
  verifyToken,
  allowRoles(TEACHER, ADMIN),
  marksController.publishResults
);

// 5. Student View Own Results (Student)
router.get(
  "/my-results",
  verifyToken,
  allowRoles(STUDENT),
  marksController.getStudentResults
);

// 6. Student View Summary (Student)
router.get(
  "/my-summary",
  verifyToken,
  allowRoles(STUDENT),
  marksController.getStudentSummary
);

export default router;
