import mongoose from "mongoose";

const marksSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student ID is required"],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"],
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Teacher ID is required"],
    },
    internalMarks: {
      type: Number,
      default: 0,
    },
    practicalMarks: {
      type: Number,
      default: 0,
    },
    finalExamMarks: {
      type: Number,
      default: 0,
    },
    totalMarks: {
      type: Number,
      required: [true, "Total marks is required"],
    },
    grade: {
      type: String,
      required: [true, "Grade is required"],
    },
    remarks: {
      type: String,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one student can only have ONE marks record per course
marksSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("Marks", marksSchema);
