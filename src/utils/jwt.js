import config  from "../config/config.js"
import jwt from "jsonwebtoken"

const generateJwt=(data)=>{

return jwt.sign({id:data._id,role:data.role},config.jwtSecret,{
  expiresIn:'30d'
})
}

const jwtVerify=(token)=>{
  return   jwt.verify(token,config.jwtSecret)
}

export default{generateJwt,jwtVerify}