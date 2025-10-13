// backend/routes/userRoutes.js
import { Router } from "express";
const router = Router();
import User from "../models/User.js";

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
