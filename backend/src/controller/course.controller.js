import courseService from "../service/course.Service.js";

const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: "error.message" });
  }
};

const createCourse = async (req, res) => {
  try {
    {
      req.body.teacherId = req.token.id;
    }
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: "course already existed" });
  }
};

const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const data = req.body;

  try {
    const course = await courseService.updateCourse(courseId, data);
    res.json(course);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteCourse = async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(200).json({ message: "Course deleted Sucessfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCourseBySem = async (req, res) => {
  try {
    const courses = await courseService.getCourseBySem(
      Number(req.params.semester),
    );
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).send("No Semester");
  }
};

const getCourseByTeacher = async (req, res) => {
  try {
    const courses = await courseService.getCourseByTeacher(
      req.params.teacherId,
    );
    res.status(200).json({ data: courses, count: courses.length });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseBySem,
  getCourseByTeacher,
};
