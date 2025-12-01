import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// Return the currently authenticated user
router.get("/me", protect, async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findById(req.user._id).select(
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

//Silent token refresh (only works if current token is valid)
router.get("/refresh", protect, async (req, res) => {
  try {
    const newToken = generateToken(req.user._id);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600 * 1000, // 1 hour
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
