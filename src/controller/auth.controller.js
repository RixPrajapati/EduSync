import authService from "../service/auth.service.js";
import jwt from "../utils/jwt.js";

const login = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    const token = jwt.generateJwt(user);
    res.cookie("token", token, {
      maxAge: 86400 * 1000,
    });
    res.status(200).json({ ...user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const register = async (req, res) => {
  


  try {
   
    const user = await authService.register(req.body, req.files);
    const token = jwt.generateJwt(user);

    
    res.cookie("authCookies", token, {
      maxAge: 86400 * 1000,
    });
    res.status(200).json({ ...user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const forget = await authService.forgetPassword(req.body?.email);
    res.json(forget);
  } catch (error) {
    res.status(400).json(error.message);
  }
};



const resetPassword=async(req,res)=>{
    try {
        
        const reset=await authService.resetPassword(req.body)
        res.json(reset)
    } catch (error) {
        res.status(400).json(error.message)
        
    }
}
export default { login, register, forgetPassword,resetPassword };
