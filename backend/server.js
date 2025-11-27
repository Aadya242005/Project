import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import authRoutes from "./routes/auth.js";
import alumniRoutes from "./routes/Alumni.js";
import mlRoutes from "./routes/mlRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import linkedinImageUpdater from "./routes/linkedinImageUpdater.js";

dotenv.config();
const app = express();

/* ---------------- Middleware ---------------- */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

/* ---------------- Routes ---------------- */
app.use("/auth", authRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/ml", mlRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/evaluation", evaluationRoutes);
app.use("/api/alumni", linkedinImageUpdater);

app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend is running!" });
});

/* ---------------- Mailer Verification ---------------- */
const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

mailer.verify((err, success) => {
  if (err) {
    console.error("❌ Mailer not ready:", err);
  } else {
    console.log("✅ Mailer ready to send emails");
  }
});

/* ---------------- MongoDB Connection ---------------- */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ---------------- Start Server ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running at http://localhost:${PORT}`));
