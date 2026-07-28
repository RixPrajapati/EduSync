 import axios from "axios";
 export const forgetPassword=async(email)=>{
return await axios.post("http://localhost:8080/api/auth/forget-password",email)
 }

 export const resetPassword=async(data)=>{
      return await axios.post("http://localhost:8080/api/auth/reset-password",data)
 } 