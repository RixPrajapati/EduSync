import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Teacher is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    description: {
      type: String,
      default: "",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    fileUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

assignmentSchema.index({ courseId: 1, title: 1 }, { unique: true });
export default mongoose.model("Assignment", assignmentSchema);
