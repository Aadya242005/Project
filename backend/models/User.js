import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🧍 Basic Info
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    alumni: { type: Boolean, default: false },
    role: { type: String },
    company: { type: String },
    batch: { type: String },
    image: { type: String },
    linkedin: { type: String },

    // 📊 Evaluation System Fields
    cpi: { type: Number, default: 0 }, // out of 10

    hackathons: [
      {
        name: { type: String },
        position: { type: Number, default: -1 }, // 1=winner, 2-3=runner-up, -1=participation only
        date: { type: Date },
      },
    ],

    certificates: [
      {
        title: { type: String },
        issuer: { type: String },
        verified: { type: Boolean, default: false },
      },
    ],

    resumeATS: { type: Number, default: 0 }, // out of 100
    evaluationScore: { type: Number, default: 0 }, // auto-calculated total score
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
