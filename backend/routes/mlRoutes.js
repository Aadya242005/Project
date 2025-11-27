import express from "express";
import multer from "multer";
import { execFile } from "child_process";
import path from "path";
import fs from "fs";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// POST /api/ml/score-resume
router.post("/score-resume", upload.single("resume"), async (req, res) => {
  try {
    const { jobText } = req.body;
    if (!req.file) {
      return res.status(400).json({ status: "error", message: "No resume uploaded." });
    }

    // Define paths
    const resumePath = path.resolve(req.file.path);
    const scriptPath = path.resolve("ml/train_skill_matcher.py");

    // Run Python model
    const py = execFile(
      "python",
      [scriptPath, resumePath, jobText],
      { maxBuffer: 1024 * 1024 * 10 },
      (error, stdout, stderr) => {
        // Cleanup uploaded file
        try {
          fs.unlinkSync(resumePath);
        } catch (e) {
          console.warn("Failed to cleanup uploaded file:", e.message);
        }

        if (error) {
          console.error("Python error:", error);
          console.error("stderr:", stderr);
          // return stderr as message if available
          return res.status(500).json({ status: "error", message: stderr || error.message });
        }

        // If the Python script prints JSON (newer skill_matcher), parse it first
        const out = (stdout || "").trim();
        console.debug("ML stdout:", out.slice(0, 1000));

        if (!out) {
          return res.status(500).json({ status: "error", message: "Empty model output" });
        }

        // Try JSON parse
        try {
          const parsed = JSON.parse(out);
          // expected parsed: { score, matched_keywords, missing_keywords, ... }
          return res.json({ status: "success", result: parsed });
        } catch (jsonErr) {
          // fallback to legacy line-parsing (Score:, Matched:, Missing:)
          try {
            const lines = out.split("\n");
            const scoreLine = lines.find((line) => line.startsWith("Score:"));
            const matchedLine = lines.find((line) => line.startsWith("Matched:"));
            const missingLine = lines.find((line) => line.startsWith("Missing:"));

            const score = scoreLine ? parseFloat(scoreLine.split(":")[1]) : 0;
            const matched = matchedLine
              ? matchedLine
                  .replace("Matched:", "")
                  .replace(/\[|\]|'/g, "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [];
            const missing = missingLine
              ? missingLine
                  .replace("Missing:", "")
                  .replace(/\[|\]|'/g, "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [];

            return res.json({
              status: "success",
              result: {
                score,
                matched_keywords: matched,
                missing_keywords: missing,
              },
            });
          } catch (err) {
            console.error("Parse error:", err);
            return res.status(500).json({ status: "error", message: "Failed to parse model output" });
          }
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;
