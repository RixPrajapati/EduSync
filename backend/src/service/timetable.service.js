import Timetable from "../models/Timetable.model.js"
import Teacher from "../models/Teacher.model.js";

const createTimetable = async (data) => {
    const { className, subject, teacher, day, startTime, endTime, roomNumber, } = data;

    // Validate required fields
    if (!className || !subject || !teacher || !day || !startTime || !endTime || !roomNumber) {
        const error = new Error("All fields are required.");
        error.statusCode = 400;
        throw error;
    }

    // Validate teacher exists
    const teacherExists = await Teacher.findById(teacher);

    if (!teacherExists) {
        const error = new Error("Teacher not found.");
        error.statusCode = 404;
        throw error;
    }

    // Check teacher conflict
    const teacherConflict = await Timetable.findOne({
        teacher,
        day,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });

    if (teacherConflict) {
        const error = new Error(
            "Teacher already has another class during this time."
        );
        error.statusCode = 409;
        throw error;
    }

    // Check class conflict
    const classConflict = await Timetable.findOne({
        className,
        day,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });

    if (classConflict) {
        const error = new Error(
            "Class already has another subject during this time."
        );
        error.statusCode = 409;
        throw error;
    }

    // Check room conflict
    const roomConflict = await Timetable.findOne({
        roomNumber,
        day,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });

    if (roomConflict) {
        const error = new Error(
            "Room is already occupied during this time."
        );
        error.statusCode = 409;
        throw error;
    }

    // Create timetable
    const timetable = await Timetable.create({
        className,
        subject,
        teacher,
        day,
        startTime,
        endTime,
        roomNumber,
    });

    return timetable.populate("teacher");
};

const getAllTimetables = async () => {
    const timetables = await Timetable.find()
        .populate("teacher")
        .sort({
            day: 1,
            startTime: 1,
        });

    if (!timetables.length) {
        const error = new Error("No timetable found.");
        error.statusCode = 404;
        throw error;
    }

    return timetables;
};

const getTimetableById = async (id) => {
    const timetable = await Timetable.findById(id)
        .populate("teacher");

    if (!timetable) {
        const error = new Error("Timetable not found.");
        error.statusCode = 404;
        throw error;
    }

    return timetable;
};

const updateTimetable = async (id, data) => {
    const {
        className,
        subject,
        teacher,
        day,
        startTime,
        endTime,
        roomNumber,
    } = data;

    // Check if timetable exists
    const existingTimetable = await Timetable.findById(id);

    if (!existingTimetable) {
        const error = new Error("Timetable not found.");
        error.statusCode = 404;
        throw error;
    }

    // Validate required fields
    if (
        !className ||
        !subject ||
        !teacher ||
        !day ||
        !startTime ||
        !endTime ||
        !roomNumber
    ) {
        const error = new Error("All fields are required.");
        error.statusCode = 400;
        throw error;
    }

    // Validate teacher exists
    const teacherExists = await Teacher.findById(teacher);

    if (!teacherExists) {
        const error = new Error("Teacher not found.");
        error.statusCode = 404;
        throw error;
    }

    // Check teacher conflict
    const teacherConflict = await Timetable.findOne({
        _id: { $ne: id },
        teacher,
        day,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });

    if (teacherConflict) {
        const error = new Error(
            "Teacher already has another class during this time."
        );
        error.statusCode = 409;
        throw error;
    }

    // Check class conflict
    const classConflict = await Timetable.findOne({
        _id: { $ne: id },
        className,
        day,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });

    if (classConflict) {
        const error = new Error(
            "Class already has another subject during this time."
        );
        error.statusCode = 409;
        throw error;
    }

    // Check room conflict
    const roomConflict = await Timetable.findOne({
        _id: { $ne: id },
        roomNumber,
        day,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });

    if (roomConflict) {
        const error = new Error(
            "Room is already occupied during this time."
        );
        error.statusCode = 409;
        throw error;
    }

    // Update timetable
    const updatedTimetable = await Timetable.findByIdAndUpdate(
        id,
        {
            className,
            subject,
            teacher,
            day,
            startTime,
            endTime,
            roomNumber,
        },
        {
            new: true,
            runValidators: true,
        }
    ).populate("teacher");

    return updatedTimetable;
};

const deleteTimetable = async (id) => {
    // Check if timetable exists
    const timetable = await Timetable.findById(id);

    if (!timetable) {
        const error = new Error("Timetable not found.");
        error.statusCode = 404;
        throw error;
    }

    // Delete timetable
    await Timetable.findByIdAndDelete(id);

    return {
        message: "Timetable deleted successfully.",
    };
};

const getStudentTimetable = async (className) => {
    if (!className) {
        const error = new Error("Class name is required.");
        error.statusCode = 400;
        throw error;
    }

    const timetable = await Timetable.find({ className })
        .populate("teacher")
        .sort({
            day: 1,
            startTime: 1,
        });

    if (!timetable.length) {
        const error = new Error("No timetable found for this class.");
        error.statusCode = 404;
        throw error;
    }

    return timetable;
};

const getTeacherTimetable = async (teacherId) => {
    if (!teacherId) {
        const error = new Error("Teacher ID is required.");
        error.statusCode = 400;
        throw error;
    }

    // Check teacher exists
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
        const error = new Error("Teacher not found.");
        error.statusCode = 404;
        throw error;
    }

    const timetable = await Timetable.find({
        teacher: teacherId,
    })
        .populate("teacher")
        .sort({
            day: 1,
            startTime: 1,
        });

    if (!timetable.length) {
        const error = new Error("No timetable found for this teacher.");
        error.statusCode = 404;
        throw error;
    }

    return timetable;
};

export default {
    createTimetable,
    getAllTimetables,
    getTimetableById,
    updateTimetable,
    deleteTimetable,
    getStudentTimetable,
    getTeacherTimetable

}