import Express from"express";
import noticeController from "../controller/notice.controller.js";
import roleBaseAuth from "../middleware/roleBaseAuth.js";
import { ADMIN, TEACHER } from "../constants/role.js";
import { verifyToken } from "../middleware/auth.js";

const router=Express.Router();

router.post("/create",verifyToken,roleBaseAuth(ADMIN),noticeController.createNotice)
router.get("/notice",noticeController.getAllNotice)
router.delete("/:id/delete",verifyToken,roleBaseAuth(ADMIN),noticeController.deleteNotice)

export default router;