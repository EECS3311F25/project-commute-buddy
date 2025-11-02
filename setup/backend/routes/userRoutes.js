import { Router } from "express";
const router = Router();
import { protect } from "../middleware/authMiddleware.js";
import { registerUser, getContent } from "../controllers/userController.js";

router.post("/register", registerUser);
router.get("/content", protect, getContent);

export default router;
