import mongoose from "mongoose";

const ressetPasswordSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  token: { type: String, required: [true, "Token is required"] },
  createdAt: { type: Date, default: Date.now(), immutable: true },
  expireAt: { type: Date, default: Date.now() + 3600000, immutable: true }, //1 hr in  millisecond
  isUsed: { type: Boolean, default: false },
});
export default mongoose.model("ResetPassword", ressetPasswordSchema);
