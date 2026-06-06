import jwt from "../utils/jwt.js"
export const verifyToken=async(req,res,next)=>{

    const token =req?.cookies["token"]||req?.headers.Authorization.split("Bearer")[1];

  const verify= jwt.jwtVerify(token)
  req.token=verify;
  if(!verify){
    throw new Error("User not Authorized")
  }
next();

}
