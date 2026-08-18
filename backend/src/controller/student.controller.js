import studentService from "../service/student.service.js";

const createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body, req.file);

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const students = await studentService.getStudents();

    res.status(200).json({
      success: true,
      message: "Students fetched successfully.",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await studentService.getSingleStudent(id);

    res.status(200).json({
      success: true,
      message: "Student fetched successfully.",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await studentService.updateStudent(
      id,
      req.body,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await studentService.deleteStudent(id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfileImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await studentService.updateProfileImage(
      id,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully.",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  updateProfileImage,
};