import authService from "../service/auth.service.js";
import jwt from "../utils/jwt.js";
import { STUDENT, ADMIN } from "../constants/role.js";
import User from "../models/User.js";
import BootstrapLock from "../models/BootstrapLock.js";

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

    // Public self-registration can only ever create a STUDENT account,
    // EXCEPT for the very first account on a fresh deployment — that one
    // becomes ADMIN so there's always a way to bootstrap a new install.
    // Once any user exists, this door closes for good.
    //
    // The ADMIN grant itself is decided by an atomic claim (BootstrapLock's
    // unique _id) rather than just this count check, so two registrations
    // arriving at the same instant on an empty database can't both win ADMIN.
    let isFirstAdmin = false;
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      try {
        await BootstrapLock.create({ _id: "admin-bootstrap" });
        isFirstAdmin = true;
      } catch (lockErr) {
        if (lockErr.code !== 11000) throw lockErr;
      }
    }
    req.body.role = isFirstAdmin ? [ADMIN] : [STUDENT];

    let user;
    try {
      user = await authService.register(req.body, req.files);
    } catch (registerErr) {
      // Registration itself failed (e.g. duplicate email) — release the
      // bootstrap slot so it isn't burned on a user that was never created.
      if (isFirstAdmin) await BootstrapLock.deleteOne({ _id: "admin-bootstrap" });
      throw registerErr;
    }
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
