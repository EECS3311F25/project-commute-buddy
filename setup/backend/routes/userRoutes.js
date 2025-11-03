import {Router} from "express";
const router = Router();
import {protect, verifyToken, isAdmin} from "../middleware/authMiddleware.js";
import {
    registerUser,
    loginUser,
    getContent,
    getAllUsers,
} from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/content", protect, getContent);
router.get("/all", verifyToken, isAdmin, getAllUsers);

export default router;
