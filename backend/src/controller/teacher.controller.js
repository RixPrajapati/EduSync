import teacherService from "../service/teacher.service.js";

const createTeacher = async (req, res, next) => {
  try {
    const teacher = await teacherService.createTeacher(req.body, req.file);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully.",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

const getTeachers = async (req, res, next) => {
  try {
    const teachers = await teacherService.getTeachers();

    res.status(200).json({
      success: true,
      message: "Teachers fetched successfully.",
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const teacher = await teacherService.getSingleTeacher(id);

    res.status(200).json({
      success: true,
      message: "Teacher fetched successfully.",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const teacher = await teacherService.updateTeacher(
      id,
      req.body,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully.",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await teacherService.deleteTeacher(id);

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

    const teacher = await teacherService.updateProfileImage(
      id,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully.",
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createTeacher,
  getTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
  updateProfileImage,
};