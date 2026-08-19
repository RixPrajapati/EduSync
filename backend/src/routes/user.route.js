import Express from"express";
import userController from "../controller/user.controller.js"
import validation from "../middleware/validation.js";
import userSchema from "../lib/schemas/user.schemas.js";
import { normalizeRole } from "../middleware/normalizeRole.js";
import { verifyToken } from "../middleware/auth.js";
import { allowRoles } from "../middleware/course.js";
import { ADMIN } from "../constants/role.js";

const router=Express.Router();

router.get("/user",userController.getUsers)
router.post("/addUser",verifyToken,allowRoles(ADMIN),normalizeRole,validation(userSchema),userController.createUser)
router.put("/:id", verifyToken, allowRoles(ADMIN), userController.updateUser)
router.delete("/:id", verifyToken, allowRoles(ADMIN), userController.deleteUser)

export default router;