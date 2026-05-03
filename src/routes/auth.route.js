import express from "express"
import authController from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";
import roleBaseAuth from "../middleware/roleBaseAuth.js";
import { ADMIN, STUDENT, TEACHER } from "../constants/role.js";

const router=express.Router();

router.post("/login",authController.login);
router.post("/register",verifyToken,roleBaseAuth(ADMIN),authController.register);

export default router;