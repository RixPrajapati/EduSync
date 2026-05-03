import User from "../models/User.js"
import bcrypt from "bcrypt"

const getUsers = () => {
    return User.find();
}
const createUser = async (user) => {
    if (!user.password) {
            throw {
                status: 400,
                message: "Password is required"
            };
        }
   const check= await User.findOne({$or:[{email:user?.email },{phone:user?.phone}]})
   console.log(check)
if(check){
    throw{
        status:409,
        message:"User already present"
    }
}


    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(user.password, salt)

    const newUser = await User.create({ ...user, password: hashPassword })
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

    }
}
export default { getUsers, createUser }