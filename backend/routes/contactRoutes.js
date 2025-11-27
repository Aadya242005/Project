import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Helper: create mail transporter
const createTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Gmail address
      pass: process.env.EMAIL_PASS, // App password (not your real password)
    },
  });

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"SkillX Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `SkillX Contact Form - ${name}`,
      text: `
📩 New Contact Form Submission
------------------------------
Name: ${name}
Email: ${email}

Message:
${message}
`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

export default router;
