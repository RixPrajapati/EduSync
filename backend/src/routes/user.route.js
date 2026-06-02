import Express from"express";
import userController from "../controller/user.controller.js"
import validation from "../middleware/validation.js";
import userSchema from "../lib/schemas/user.schemas.js";
import { normalizeRole } from "../middleware/normalizeRole.js";

const router=Express.Router();

router.get("/user",userController.getUsers)
router.post("/addUser",normalizeRole,validation(userSchema),userController.createUser)

export default router;