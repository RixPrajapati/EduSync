import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, "Course Name is required"],
  },

  courseCode: {
    type: String,
    required: [true, "Course-Code is requred"],
    unique: true,
    uppercase: true,
  },

  creditHours: {
    type: Number,
    required: [true, "credit hours is required"],
    min: 1,
  },

  semester: {
    type: Number,
    required: [true, "Semester is required"],
    min: 1,
    max: 8,
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Teacher Id is required"],
  },
  description: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Course", courseSchema);
