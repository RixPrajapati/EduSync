import timetableService from "../services/timetable.service.js";
import Teacher from "../models/Teacher.model.js";
import Student from "../models/Student.model.js";

const createTimetable = async (req, res) => {
    try {
        const timetable = await timetableService.createTimetable(req.body);

        return res.status(201).json({
            success: true,
            message: "Timetable created successfully.",
            data: timetable,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to create timetable.",
        });
    }
};

const getAllTimetables = async (req, res) => {
    try {
        const timetables = await timetableService.getAllTimetables();

        return res.status(200).json({
            success: true,
            count: timetables.length,
            data: timetables,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
};

const getTimetableById = async (req, res) => {
    try {
        const timetable = await timetableService.getTimetableById(req.params.id);

        return res.status(200).json({
            success: true,
            data: timetable,
        });
    } catch (error) {
        return res.status(error.statusCode || 404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateTimetable = async (req, res) => {
    try {
        const timetable = await timetableService.updateTimetable(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Timetable updated successfully.",
            data: timetable,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteTimetable = async (req, res) => {
    try {
        await timetableService.deleteTimetable(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Timetable deleted successfully.",
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
};

const getStudentTimetable = async (req, res) => {
    try {
        // Find student profile using logged-in user ID
        const student = await Student.findOne({
            user: req.user._id,
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found.",
            });
        }

        console.log(student);
console.log("Student Class:", student.className);
        // Get timetable using student's class
        const timetable = await timetableService.getStudentTimetable(
            student.className
        );

        return res.status(200).json({
            success: true,
            data: timetable,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
};

const getTeacherTimetable = async (req, res) => {
    try {
        console.log("req.user:", req.user);
        // Find teacher profile using logged-in user ID
        const teacher = await Teacher.findOne({
            user: req.user._id,
        });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher profile not found.",
            });
        }

        // Get timetable using Teacher ID
        const timetable = await timetableService.getTeacherTimetable(
            teacher._id
        );

        return res.status(200).json({
            success: true,
            data: timetable,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
};

export default {
    createTimetable,
    getAllTimetables,
    getTimetableById,
    updateTimetable,
    deleteTimetable,
    getStudentTimetable,
    getTeacherTimetable,
};