import express from "express";
import { getContent } from "../controllers/contentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/content  -> protected route
router.get("/", protect, getContent);

export default router;
