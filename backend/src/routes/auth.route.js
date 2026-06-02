import express from "express"
import authController from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";
import roleBaseAuth from "../middleware/roleBaseAuth.js";
import { ADMIN, STUDENT, TEACHER } from "../constants/role.js";
import { loginSchema, registerSchema } from "../lib/schemas/auth.schema.js";
import validation from "../middleware/validation.js";
import { normalizeRole } from "../middleware/normalizeRole.js";
const router=express.Router();

router.post("/login",validation(loginSchema),authController.login);
router.post("/register",normalizeRole,validation(registerSchema),authController.register);
router.post("/forget-password",authController.forgetPassword)
router.post("/reset-password",authController.resetPassword)

export default router;