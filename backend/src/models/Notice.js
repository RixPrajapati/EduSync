import mongoose from "mongoose";
import {
  EVENT_NOTICE,
  EXAM_NOTICE,
  HOLIDAY_NOTICE,
  OTHER_NOTICE,
} from "../constants/noticeType.js";

const noticeSchema = mongoose.Schema({
  title: { type: String, required: [true, "Title of notice is required"] },
  description: {
    type: String,
    required: [true, "Description of notice is required"],
  },
  noticeTyped: {
    type: String,
    enum: [EVENT_NOTICE, EXAM_NOTICE, HOLIDAY_NOTICE, OTHER_NOTICE],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Created by user id is required"],
  },
  publishedAt: { type: Date, default: Date.now() },
  expiredAt: { type: Date },
});

export default mongoose.model("Notice", noticeSchema);
