import { Router } from "express";
import { registerUser, loginUser } from "../modules/users/userController";
import { loginValidator, registerValidator } from "../validators/index";
import { upload } from "../middleware/uploadMiddleware";
import { authorize } from "../middleware/auth";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);

// upload with multer
// router.post("/upload", upload.single("file"), registerUser);

export default router;
