import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
    },

    subjects: [
      {
        type: String,
      },
    ],

    experience: {
      type: Number,
      default: 0,
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

export default mongoose.model("Teacher", teacherSchema);