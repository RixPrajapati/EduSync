import User from "../models/User.js";
import bcrypt from "bcrypt";
import userService from "./user.service.js";
import jwt from "../utils/jwt.js"
const login = async (data) => {
  const newUser = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });

  if (! newUser) {
    throw { status: 400, message: "User not found" };
  }

  const passCheck = await bcrypt.compareSync(data.password,  newUser.password);
  if (!passCheck) {
    throw { status: 400, message: "Password do not match" };
  }
   
   const token= jwt.generateJwt(newUser)
  
 return token;

};
 const register=async(data,files)=>{
    
    return userService.createUser(data,files);
 }
export default {login,register}