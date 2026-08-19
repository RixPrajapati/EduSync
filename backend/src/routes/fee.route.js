import express from "express";
import feeController from "../controller/fee.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";
import { ADMIN } from "../constants/role.js";

const router = express.Router();

router.post("/", verifyToken, allowRoles(ADMIN), feeController.createFee);
router.get("/", verifyToken, allowRoles(ADMIN), feeController.getAllFees);
router.get("/:id", verifyToken, allowRoles(ADMIN), feeController.getFeeById);
router.put("/:id", verifyToken, allowRoles(ADMIN), feeController.updateFee);
router.delete("/:id", verifyToken, allowRoles(ADMIN), feeController.deleteFee);

export default router;
