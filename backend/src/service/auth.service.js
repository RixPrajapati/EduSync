import User from "../models/User.js";
import bcrypt from "bcrypt";
import userService from "./user.service.js";
import jwt from "../utils/jwt.js";
import uploadFile from "../utils/fileUploder.js";
import config from "../config/config.js";
import ResetPassword from "../models/ResetPassword.js";
import sendEmail from "../utils/email.js";

const login = async (data) => {
  const newUser = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });

  if (!newUser) {
    throw { status: 400, message: "User not found" };
  }

  const passCheck = await bcrypt.compareSync(data.password, newUser.password);
  if (!passCheck) {
    throw { status: 400, message: "Password do not match" };
  }

  return {
    _id: newUser._id,
    address: newUser.address,
    email: newUser.email,
    isActive: newUser.isActive,
    role: newUser.role,
    userName: newUser.name,
    phone: newUser.phone,
  };
};
const register = async (data, files) => {
  const check = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  console.log(check);
  if (check) {
    throw {
      status: 409,
      message: "User already present",
    };
  }
  const uploadedFiles = await uploadFile(files);
  if (!data.password) {
    throw {
      status: 400,
      message: "Password is required",
    };
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(data.password, salt);

  const newUser = await User.create({
    ...data,
    password: hashPassword,
    profile: uploadedFiles.map((file) => file.url),
  });
  return {
    _id: newUser._id,
    userName: newUser.userName,
    email: newUser.email,

    phone: newUser.phone,
    address: newUser.address,
    gender: newUser.gender,
    dob: newUser.dob,
    profile: newUser.profile,

    createdAt: newUser.createdAt,
    isActive: newUser.isActive,
    updatedAt: newUser.updatedAt,
    role: newUser.role,
    //   extra for students
    rollNo: newUser.rollNo,
    semester: newUser.semester,
    faculty: newUser.faculty,

    //   extra for teacher

    department: newUser.department,
    designation: newUser.designation,
  };
};
const forgetPassword = async (email) => {
  const existUser = await User.findOne({ email });
  if (!existUser) {
    throw {
      status: 404,
      message: "User of this user is not exist ",
    };
  }
  const token = crypto.randomUUID();
  const forgetPassword = ResetPassword.create({
    userId: existUser._id,
    token: token,
  });
  const link = `${config.app_url}/reset-password?userId=${existUser._id}&token=${token}`;
  sendEmail({
    recipient: email,
    subject: "Reset password link ",
    html: `<div
        style="
          padding: 16px;
          font-family: sans-serif
        "
      >
        <h1>Please click the link to reset your password.</h1>
        <a
          href="${link}"
          style="
            background-color: steelblue;
            color: white;
            text-decoration: none;
            padding: 8px 32px;
            border-radius: 5px;
          "
          >Reset password</a
        >
      </div>
    `,
  });
  return { message: "Reset password link send  to your emil address" };
};

const resetPassword = async (input) => {
  const data = await ResetPassword.findOne({
    userId: input.userId,
    expireAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  if (!data || data.token != input.token) {
    throw {
      status: 400,
      message: "Invalid User or link is expired",
    };
  }
  if (data.isUsed) {
    throw {
      status: 400,
      message: "Link is already used",
    };
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(input.password, salt);
  await User.findByIdAndUpdate(input.userId, { password: hashedPassword });

  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });
  return { message: "password is reset successfully" };
};

export default { login, register, forgetPassword, resetPassword };
