import Express from"express";
import userController from "../controller/user.controller.js"

const router=Express.Router();

router.get("/user",userController.getUsers)
router.post("/addUser",userController.createUser)

export default router;