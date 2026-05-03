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
// {
//     _id: newUser._id,
//     userName: newUser.userName,
//     email: newUser.email,

//     phone: newUser.phone,
//     address: newUser.address,
//     gender: newUser.gender,
//     dob: newUser.dob,
//     profile: newUser.profile,

//     createdAt: newUser.createdAt,
//     isActive: newUser.isActive,
//     updatedAt: newUser.updatedAt,
//     role: newUser.role,
//     //   extra for students
//     rollNo: newUser.rollNo,
//     semester: newUser.semester,
//     faculty: newUser.faculty,

//     //   extra for teacher

//     department: newUser.department,
//     designation: newUser.designation,
//   };
};
 const register=async(data)=>{
    
    return userService.createUser(data);
 }
export default {login,register}