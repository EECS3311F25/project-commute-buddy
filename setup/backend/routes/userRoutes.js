import { Router } from "express";
const router = Router();
import { protect, verifyToken, isAdmin } from "../middleware/authMiddleware.js";
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
} from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/content", protect, getContent);
router.get("/all", verifyToken, isAdmin, getAllUsers);
router.get("/routes", verifyToken, getAllRoutes); //get all available routes
router.get("/preferences", verifyToken, getUserRoutes); //this will GET all the user routes they have subscribed to.
router.put("/preferences", verifyToken, updateUserRoutes); //this will update existing route preferences of the user
router.get("/profile", verifyToken, getUserProfile); //get this users data {email, name, etc}
router.put("/profile", verifyToken, updateUserProfile); //get this users data {email, name, etc}


export default router;
