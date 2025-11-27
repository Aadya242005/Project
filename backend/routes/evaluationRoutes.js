import express from "express";
import User from "../models/User.js";
import { calculateEvaluation } from "../utils/calculateEvaluation.js";

const router = express.Router();

// Recalculate evaluation for a specific user
router.get("/recalculate/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.evaluationScore = calculateEvaluation(user);
    await user.save();

    res.json({
      success: true,
      message: "Evaluation score updated",
      evaluationScore: user.evaluationScore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
