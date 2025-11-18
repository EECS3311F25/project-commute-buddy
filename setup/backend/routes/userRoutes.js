import { Router } from "express";
import { protect, verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";
import {
  registerUser,
  loginUser,
  getContent,
  getAllUsers,
  getAllRoutes,
  getUserRoutes,
  updateUserRoutes,
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
} from "../controllers/userController.js";

const router = Router();

// Limit to 5 login attempts per minute per IP
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth routes
router.post("/register", loginLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);

// Content
router.get("/content", protect, getContent);

// Admin routes
router.get("/all", verifyToken, isAdmin, getAllUsers);

// Route preferences
router.get("/routes", verifyToken, getAllRoutes);
router.get("/preferences", verifyToken, getUserRoutes);
router.put("/preferences", verifyToken, updateUserRoutes);

// Profile
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.put("/changePassword", verifyToken, changeUserPassword);

export default router;
