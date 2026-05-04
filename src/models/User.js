import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: (value) => {
        const testmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return testmail.test(value);
      },
      message: "Invalid email address",
    },
    unique: true,
  },
  password: {
    required: [true, "Password is required"],
    type: String,
    minLength: [8, "Password is grater then 8 character"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
  },
  address: {
    city: {
      required: [true, "City is required "],
      type: String,
    },
    province: String,
    street: String,
    country: {
      default: "Nepal",
      type: String,
    },
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHER"],
    required: [true, "Gender required"],
  },
  dob: { type: Date },
  profile: { type: [String] },

  createdAt: { type: Date, default: Date.now() },
  isActive: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now() },
  role: {
    type: [String],
    enum: ["STUDENT", "TEACHER", "ADMIN"],
    default: ["STUDENT"],
  },
  //   extra for students
  rollNo: { type: String },
  semester: { type: String },
  faculty: { type: String },

  //   extra for teacher

  department: { type: String },
  designation: { type: String },
});

export default mongoose.model("User", userSchema);
