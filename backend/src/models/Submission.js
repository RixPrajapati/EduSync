import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submittedFile: {
      type: String,
      required: [true, "Submitted file is required"],
    },
    status: {
      type: String,
      enum: ["SUBMITTED", "GRADED", "LATE"],
      default: "SUBMITTED",
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// One submission per student per assignment
submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });

export default mongoose.model("Submission", submissionSchema);
