import mongoose from "mongoose";
import { required } from "zod/mini";

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: [true, "Assignment is required"],
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student Id is required"],
    },
    submittedFile: {
      type: String,
      required: [true, "Submitted file is required"],
    },
    remarks: {
      type: String,
      // default: "",
    },
    status: {
      type: String,
      enum: ["SUBMITTED", "GRADED", "LATE"],
      default: "SUBMITTED",
    },
  },
  { timestamps: true },
);

assignmentSubmissionSchema.index(
  {
    assignmentId: 1,
    studentId: 1,
  },
  { unique: true },
);

export default mongoose.model(
  "AssignmentSubmission",
  assignmentSubmissionSchema,
);
