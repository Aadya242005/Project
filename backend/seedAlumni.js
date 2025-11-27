import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // ✅ Import your User model

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/skillx";

// ✅ Alumni dataset from your Excel (cleaned & fixed)
const alumniData = [
  {
    name: "ARIKUL GUPTA",
    email: "harikul.gupta@campusskillx.com",
    password: "campus123",
    alumni: true,
    role: "Software Engineer",
    company: "JP Morgan",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    linkedin: "https://linkedin.com/in/harikulgupta",
  },
  {
    name: "HEMLATA DUBIA",
    email: "hemlata.dubia@campusskillx.com",
    password: "campus123",
    alumni: true,
    role: "Data Analyst",
    company: "TCS",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    linkedin: "https://linkedin.com/in/hemlatadubia",
  },
  {
    name: "VIDHI AMBREA",
    email: "vidhi.ambrea@campusskillx.com",
    password: "campus123",
    alumni: true,
    role: "Software Engineer",
    company: "Hexaware",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    linkedin: "https://linkedin.com/in/vidhiambrea",
  },
  {
    name: "VANSHIKA GUPTA",
    email: "vanshika.gupta@campusskillx.com",
    password: "campus123",
    alumni: true,
    role: "Frontend Developer",
    company: "Global Logic",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    linkedin: "https://linkedin.com/in/vanshikagupta",
  },
  {
    name: "VAIBHAV YADAV",
    email: "vaibhav.yadav@campusskillx.com",
    password: "campus123",
    alumni: true,
    role: "Backend Engineer",
    company: "Mediflow",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    linkedin: "https://linkedin.com/in/vaibhavyadav",
  },
  {
    name: "ADARSH JAIN",
    email: "adarsh.jain@campusskillx.com",
    password: "campus123",
    alumni: true,
    role: "Software Engineer",
    company: "Hike Technology",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    linkedin: "https://linkedin.com/in/adarshjain",
  },
  {
    name: "HARSHIT RATHI",
    email: "harshit.rathi@campusskillx.com",
    password: "campus123",
    alumni: true,
    role: "Full Stack Developer",
    company: "Hike Technology",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    linkedin: "https://linkedin.com/in/harshitrathi",
  },
];

// 🧩 Main Seeder Function
const seedAlumni = async () => {
  try {
    console.log("🧩 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected.");

    console.log("🧹 Clearing existing alumni data...");
    await User.deleteMany({ alumni: true });
    console.log("🗑️ Old alumni data removed.");

    // Add new alumni data
    for (const alumni of alumniData) {
      const hashedPassword = await bcrypt.hash(alumni.password, 10);
      await User.create({ ...alumni, password: hashedPassword });
      console.log(`🌱 Added: ${alumni.name}`);
    }

    console.log("🎓 Alumni data successfully replaced and seeded!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.connection.close();
  }
};

seedAlumni();
