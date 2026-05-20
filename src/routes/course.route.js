import courseController from "../controller/course.controller.js";

import express from "express";

const router = express.Router();

router.get("/", courseController.getAllCourses);

router.post("/", courseController.createCourse);

router.get("/:id", courseController.getCourseById);

router.put("/:id", courseController.updateCourse);

router.delete("/:id", courseController.deleteCourse);

router.get("/semester/:semester", courseController.getCourseBySem);

router.get("/teacher/:teacherId", courseController.getCourseByTeacher )

export default router;
