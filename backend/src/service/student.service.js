import Student from "../models/Student.model.js";
import User from "../models/User.js";
import uploadFile from "../utils/fileUploder.js";

const createStudent = async (data, file) => {
  const { user, course, semester, className, address } = data;

  // Validate required fields
  if (!user || !course || !semester || !className) {
    const error = new Error("All required fields must be provided.");
    error.statusCode = 400;
    throw error;
  }

  // Check user exists
  const existingUser = await User.findById(user);

  if (!existingUser) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  // ✅ Check if user has STUDENT role
  if (!existingUser.role.includes("STUDENT")) {
    const error = new Error("Selected user is not a student.");
    error.statusCode = 400;
    throw error;
  }

  // Check duplicate student
  const existingStudent = await Student.findOne({ user });

  if (existingStudent) {
    const error = new Error("Student already exists for this user.");
    error.statusCode = 409;
    throw error;
  }

  let imageUrls = [];

  if (file) {
    const uploadedFiles = await uploadFile([file]);

    if (!uploadedFiles?.length) {
      const error = new Error("Image upload failed.");
      error.statusCode = 500;
      throw error;
    }

    imageUrls = [uploadedFiles[0].url];
  }

  const student = await Student.create({
    user,
    course,
    semester,
    className,
    address,
    imageUrls,
  });

  return await Student.findById(student._id).populate("user", "-password");
};

const getStudents = async () => {
  const students = await Student.find()
    .populate("user", "-password")
    .sort({ createdAt: -1 })
    .lean();

  if (!students.length) {
    const error = new Error("No students found.");
    error.statusCode = 404;
    throw error;
  }

  return students;
};

const getSingleStudent = async (id) => {
  const student = await Student.findById(id)
    .populate("user", "-password")
    .lean();

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  return student;
};

const updateStudent = async (id, data, file) => {
  const student = await Student.findById(id);

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  // Validate user if updating
  if (data.user) {
    const user = await User.findById(data.user);

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    
    // ✅ Check STUDENT role
    if (!user.role.includes("STUDENT")) {
      const error = new Error("Selected user is not a student.");
      error.statusCode = 400;
      throw error;
    }

    const duplicate = await Student.findOne({
      user: data.user,
      _id: { $ne: id },
    });


    if (duplicate) {
      const error = new Error(
        "User already assigned to another student."
      );
      error.statusCode = 409;
      throw error;
    }

    student.user = data.user;
  }

  student.course = data.course ?? student.course;
  student.semester = data.semester ?? student.semester;
  student.className = data.className ?? student.className;
  student.address = data.address ?? student.address;

  if (file) {
    const uploadedFiles = await uploadFile([file]);

    if (!uploadedFiles?.length) {
      const error = new Error("Image upload failed.");
      error.statusCode = 500;
      throw error;
    }

    // Replace profile image
    student.imageUrls = [uploadedFiles[0].url];
  }

  await student.save();

  return await Student.findById(id).populate("user", "-password");
};

const deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  return {
    message: "Student deleted successfully.",
    student,
  };
};

const updateProfileImage = async (id, file) => {
  if (!file) {
    const error = new Error("Please upload an image.");
    error.statusCode = 400;
    throw error;
  }

  const student = await Student.findById(id);

  if (!student) {
    const error = new Error("Student not found.");
    error.statusCode = 404;
    throw error;
  }

  const uploadedFiles = await uploadFile([file]);

  if (!uploadedFiles?.length) {
    const error = new Error("Image upload failed.");
    error.statusCode = 500;
    throw error;
  }

  // Replace profile image
  student.imageUrls = [uploadedFiles[0].url];

  await student.save();

  return await Student.findById(id).populate("user", "-password");
};

export default {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  updateProfileImage,
};