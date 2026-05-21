import Course from "../models/Course.js";

const getAllCourses = async () => {
  const courses = await Course.find();
  return courses;
};

const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId);

  return course;
};

const createCourse = async (data) => {
  const existing = await Course.findOne({
    courseCode: data.courseCode.toUpperCase,
  });
  if (existing) throw new Error();
  const course = await Course.create(data);
  return course;
};

const updateCourse = async (courseId, data) => {
  const course = await Course.findByIdAndUpdate(courseId, data, {
    returnDocument: "after",
  });
  return course;
};

const deleteCourse = async (courseId) => {
  const course = await Course.findByIdAndDelete(courseId);
  return course;
};

const getCourseBySem = async (semester) => {
  return await Course.find({ semester: semester });
};

const getCourseByTeacher = async (teacherId) => {
  return await Course.find({ teacherId }).sort({ semester: 1 });
};

export default {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseBySem,
  getCourseByTeacher,
};
