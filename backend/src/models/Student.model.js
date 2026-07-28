import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    course: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    imageUrls: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);