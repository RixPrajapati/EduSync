import Teacher from "../models/Teacher.model.js";
import User from "../models/User.js";
import uploadFile from "../utils/fileUploder.js";

const createTeacher = async (data, file) => {
    const { user, department, subjects, experience } = data;

    // Validate required fields
    if (!user || !department) {
        const error = new Error("User and department are required.");
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

    // ✅ Validate TEACHER role
  if (!existingUser.role.includes("TEACHER")) {
    const error = new Error("Selected user is not a teacher.");
    error.statusCode =400;
    throw error;
  }

    // Check duplicate teacher
    const existingTeacher = await Teacher.findOne({ user });

    if (existingTeacher) {
        const error = new Error("Teacher already exists for this user.");
        error.statusCode = 409;
        throw error;
    }

    let imageUrls = [];

    if (file) {
        const uploadedFiles = await uploadFile([file]);
        imageUrls = [uploadedFiles[0].url];
    }

    const teacher = await Teacher.create({
        user,
        department,
        subjects: subjects || [],
        experience: experience || 0,
        imageUrls,
    });

    return await Teacher.findById(teacher._id).populate("user", "-password");
};

const getTeachers = async () => {
    const teachers = await Teacher.find()
        .populate("user", "-password")
        .sort({ createdAt: -1 });

    if (!teachers.length) {
        const error = new Error("No teachers found.");
        error.statusCode = 404;
        throw error;
    }

    return teachers;
};

const getSingleTeacher = async (id) => {
    const teacher = await Teacher.findById(id).populate(
        "user",
        "-password"
    );

    if (!teacher) {
        const error = new Error("Teacher not found.");
        error.statusCode = 404;
        throw error;
    }

    return teacher;
};

const updateTeacher = async (id, data, file) => {
    const teacher = await Teacher.findById(id);

    if (!teacher) {
        const error = new Error("Teacher not found.");
        error.statusCode = 404;
        throw error;
    }

    // Check user if updating
    if (data.user) {
        const user = await User.findById(data.user);

        if (!user) {
            const error = new Error("User not found.");
            error.statusCode = 404;
            throw error;
        }


        // ✅ Validate TEACHER role
    if (!user.role.includes("TEACHER")) {
      const error = new Error("Selected user is not a teacher.");
      error.statusCode = 400;
      throw error;
    }

        const duplicate = await Teacher.findOne({
            user: data.user,
            _id: { $ne: id },
        });

        if (duplicate) {
            const error = new Error(
                "User is already assigned to another teacher."
            );
            error.statusCode = 409;
            throw error;
        }

        teacher.user = data.user;
    }

    teacher.department = data.department ?? teacher.department;
    teacher.subjects = data.subjects ?? teacher.subjects;
    teacher.experience = data.experience ?? teacher.experience;

    if (file) {
        const uploadedFiles = await uploadFile([file]);

        // Replace existing profile image
        teacher.imageUrls = [uploadedFiles[0].url];
    }

    await teacher.save();

    return await Teacher.findById(id).populate("user", "-password");
};

const deleteTeacher = async (id) => {
    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
        const error = new Error("Teacher not found.");
        error.statusCode = 404;
        throw error;
    }

    return {
        message: "Teacher deleted successfully.",
    };
};

const updateProfileImage = async (id, file) => {
    if (!file) {
        const error = new Error("Please upload an image.");
        error.statusCode = 400;
        throw error;
    }

    const teacher = await Teacher.findById(id);

    if (!teacher) {
        const error = new Error("Teacher not found.");
        error.statusCode = 404;
        throw error;
    }

    const uploadedFiles = await uploadFile([file]);

    teacher.imageUrls = [uploadedFiles[0].url];

    await teacher.save();

    return await Teacher.findById(id).populate("user", "-password");
};

export default {
    createTeacher,
    getTeachers,
    getSingleTeacher,
    updateTeacher,
    deleteTeacher,
    updateProfileImage,
};