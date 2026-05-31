import enrollmentService from "../service/enrollment.service.js";

const enrollCourse = async (req, res) => {
  try {
    const studentId = req.token.id;
    const { courseId } = req.body;

    const enrollment = await enrollmentService.enrollCourse(
      studentId,
      courseId,
    );
    res.status(201).json({ data: enrollment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const approveEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.approveEnrollment(
      req.params.enrollmentId,
    );
    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getPendingEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getPendingEnrollments(
      req.params.courseId,
    );
    res.status(200).json({ data: enrollments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.token.id;
    const enrollments = await enrollmentService.getMyEnrollments(studentId);
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnrollmentsByCourse = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getEnrollmentsByCourse(
      req.params.courseId,
    );
    res.status(200).json({ count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dropCourse = async (req, res) => {
  try {
    const studentId = req.token.id;
    const { courseId } = req.body;
    const enrollment = await enrollmentService.dropCourse(studentId, courseId);

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  enrollCourse,
  approveEnrollment,
  getPendingEnrollments,
  getMyEnrollments,
  getEnrollmentsByCourse,
  dropCourse,
};
