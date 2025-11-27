// routes/alumni.js
import express from "express";
import User from "../models/User.js"; // existing User model

const router = express.Router();

// GET /api/alumni
router.get("/", async (req, res) => {
  try {
    // Fetch all users who are alumni
    const alumni = await User.find({ alumni: true }).select(
      "name email role company batch image linkedin package course gender phone placed"
    );

    if (!alumni || alumni.length === 0) {
      return res.status(404).json({ message: "No alumni found" });
    }

    res.status(200).json(alumni);
  } catch (err) {
    console.error("❌ Error fetching alumni:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
