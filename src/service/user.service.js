import User from "../models/User.js"
import bcrypt from "bcrypt"
import uploadFile from "../utils/fileUploder.js";
import { file } from "zod";
import authService from "./auth.service.js";

const getUsers = () => {
    return User.find();
}
const createUser = async (user,files) => {
   return authService.register(user,files)
}
export default { getUsers, createUser }