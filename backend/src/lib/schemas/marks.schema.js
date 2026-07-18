import z from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createMarksSchema = z.object({
  studentId: z
    .string({ required_error: "studentId is required" })
    .regex(objectIdRegex, { message: "Invalid Student ID format" }),
  courseId: z
    .string({ required_error: "courseId is required" })
    .regex(objectIdRegex, { message: "Invalid Course ID format" }),
  internalMarks: z
    .number({ invalid_type_error: "Internal marks must be a number" })
    .min(0, { message: "Internal marks must be at least 0" })
    .max(30, { message: "Internal marks cannot exceed 30" })
    .default(0)
    .optional(),
  practicalMarks: z
    .number({ invalid_type_error: "Practical marks must be a number" })
    .min(0, { message: "Practical marks must be at least 0" })
    .max(30, { message: "Practical marks cannot exceed 30" })
    .default(0)
    .optional(),
  finalExamMarks: z
    .number({ invalid_type_error: "Final exam marks must be a number" })
    .min(0, { message: "Final exam marks must be at least 0" })
    .max(40, { message: "Final exam marks cannot exceed 40" })
    .default(0)
    .optional(),
  remarks: z.string().optional(),
});

export const updateMarksSchema = z.object({
  internalMarks: z
    .number({ invalid_type_error: "Internal marks must be a number" })
    .min(0, { message: "Internal marks must be at least 0" })
    .max(30, { message: "Internal marks cannot exceed 30" })
    .optional(),
  practicalMarks: z
    .number({ invalid_type_error: "Practical marks must be a number" })
    .min(0, { message: "Practical marks must be at least 0" })
    .max(30, { message: "Practical marks cannot exceed 30" })
    .optional(),
  finalExamMarks: z
    .number({ invalid_type_error: "Final exam marks must be a number" })
    .min(0, { message: "Final exam marks must be at least 0" })
    .max(40, { message: "Final exam marks cannot exceed 40" })
    .optional(),
  remarks: z.string().optional(),
});
