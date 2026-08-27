import User from "../models/User.js"
import bcrypt from "bcrypt"
import uploadFile from "../utils/fileUploder.js";
import { file } from "zod";
import authService from "./auth.service.js";

const getUsers = () => {
    return User.find().select("-password");
}
const createUser = async (user,files) => {
   return authService.register(user,files)
}

const updateUser = async (id, data) => {
    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select("-password");
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
}

const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id).select("-password");
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
}

export default { getUsers, createUser, updateUser, deleteUser }