// apply after courseContent
import Enrollment from "../models/Enrollment.js";

export const checkEnrollment = async (req, res, next) => {
  const enrollment = await Enrollment.findOne({
    studentId: req.token.id,
    courseId: req.params.courseId,
    status: "ACTIVE",
  });

  if (!enrollment) {
    return res
      .status(403)
      .json({ message: "You are not enrolled in this course" });
  }
  next();
};
