import express from "express";
import axios from "axios";
import User from "../models/User.js";

const router = express.Router();

// Auto-fetch LinkedIn photos for all alumni
router.get("/update-images", async (req, res) => {
  try {
    const alumni = await User.find({ alumni: true });
    let updatedCount = 0;

    for (const alum of alumni) {
      if (alum.linkedin) {
        try {
          const response = await axios.get(`https://api.microlink.io?url=${alum.linkedin}`);
          const image = response.data?.data?.image?.url;
          if (image && !image.includes("logo")) {
            alum.image = image;
            await alum.save();
            updatedCount++;
          }
        } catch (e) {
          console.log("Failed to update:", alum.name);
        }
      }
    }

    res.json({ message: `✅ Updated ${updatedCount} alumni images` });
  } catch (error) {
    console.error("Error updating images:", error);
    res.status(500).json({ error: "Failed to update alumni images" });
  }
});

export default router;
