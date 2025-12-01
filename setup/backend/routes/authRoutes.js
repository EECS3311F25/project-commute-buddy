import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Return the currently authenticated user
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email profileImage role"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
