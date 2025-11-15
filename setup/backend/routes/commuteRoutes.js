import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendRequest, respondRequest, getUserRequests } from "../controllers/commuteController.js";

const router = Router();

router.post("/send", protect, sendRequest);
router.post("/respond", protect, respondRequest);
router.get("/my-requests", protect, getUserRequests);

export default router;
