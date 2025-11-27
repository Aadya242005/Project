import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Award,
  Trophy,
  Star,
  Briefcase,
  GitBranch,
  Target,
  Users,
} from "lucide-react";
import axios from "axios";

const contributions = Array(7)
  .fill(0)
  .map(() =>
    Array(20)
      .fill(0)
      .map(() => Math.floor(Math.random() * 4))
  );

const colorMap = {
  0: "bg-gray-800",
  1: "bg-green-700",
  2: "bg-green-500",
  3: "bg-green-300",
};

// Mock alumni data (replace later with API)
const mockAlumni = [
  {
    id: 1,
    name: "Arikul Gupta",
    role: "Software Engineer",
    company: "JP Morgan",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    contributions: 120,
  },
  {
    id: 2,
    name: "Vanshika Gupta",
    role: "Frontend Developer",
    company: "Global Logic",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    contributions: 88,
  },
  {
    id: 3,
    name: "Adarsh Jain",
    role: "Backend Engineer",
    company: "Hike Technology",
    batch: "2024",
    image: "https://randomuser.me/api/portraits/men/49.jpg",
    contributions: 102,
  },
];

const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "Tailwind CSS",
  "GraphQL",
  "Docker",
  "Python",
  "AWS",
];

const userTabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "skills", label: "Skills", icon: Star },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "contributions", label: "Contributions", icon: GitBranch },
  { id: "recommendations", label: "Recommendations", icon: Users },
];

const alumniTabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "career", label: "Career Path", icon: Briefcase },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "contributions", label: "Contributions", icon: GitBranch },
];

const calculateEvaluation = (userData) => {
  let score = 0;
  if (userData.cpi) score += (userData.cpi / 10) * 40;
  if (userData.hackathons?.length) {
    let hackathonPoints = 0;
    userData.hackathons.forEach((h) => {
      if (h.position === 1) hackathonPoints += 20;
      else if (h.position <= 3) hackathonPoints += 15;
      else hackathonPoints += 10;
    });
    score += Math.min(
      (hackathonPoints / (userData.hackathons.length * 20)) * 20,
      20
    );
  }
  if (userData.resumeATS) score += (userData.resumeATS / 100) * 20;
  if (userData.certificates?.length) {
    let certPoints = 0;
    userData.certificates.forEach((c) => {
      certPoints += c.verified ? 5 : 2;
    });
    score += Math.min(
      (certPoints / (userData.certificates.length * 5)) * 10,
      10
    );
  }
  return Math.min(score, 100);
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [evaluationScore, setEvaluationScore] = useState(0);
  const [profileMode, setProfileMode] = useState("user"); // user or alumni
  const [showAlumniList, setShowAlumniList] = useState(false);

  const userData = {
    cpi: 8.5,
    hackathons: [{ position: 1 }, { position: 2 }, { position: 3 }],
    resumeATS: 85,
    certificates: [
      { name: "AWS Certified Developer", verified: true },
      { name: "React Advanced", verified: true },
      { name: "Node.js Mastery", verified: false },
    ],
  };

  useEffect(() => {
    setEvaluationScore(calculateEvaluation(userData));
  }, []);

  const currentTabs = profileMode === "alumni" ? alumniTabs : userTabs;

  // Smart Recommendation (based on user progress)
  const recommendedAlumni =
    evaluationScore >= 80
      ? mockAlumni.filter((a) => a.company.includes("JP"))
      : mockAlumni.filter((a) => a.company.includes("Hike"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-8 md:p-16 max-w-7xl mx-auto font-sans">
      {/* Toggle */}
      <div className="flex justify-center md:justify-end mb-10">
        <div className="bg-gray-800/50 p-1 rounded-xl flex">
          <button
            onClick={() => setProfileMode("user")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              profileMode === "user"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-indigo-300"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setProfileMode("alumni")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              profileMode === "alumni"
                ? "bg-teal-600 text-white"
                : "text-gray-400 hover:text-teal-300"
            }`}
          >
            Alumni
          </button>
        </div>
      </div>

      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={
            profileMode === "alumni"
              ? "https://randomuser.me/api/portraits/men/45.jpg"
              : "https://robohash.org/user123.png?set=set3"
          }
          alt="Profile"
          className="w-36 h-36 rounded-full border-4 border-indigo-500 shadow-2xl"
        />
        <div className="mt-6 md:mt-0 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-white mb-1 drop-shadow-lg">
            {profileMode === "alumni" ? "Arikul Gupta" : "Kevin Gilbert"}
          </h1>
          <p className="text-xl text-indigo-300 font-medium">
            {profileMode === "alumni"
              ? "Software Engineer @ JP Morgan"
              : "Student Developer @ GLA University"}
          </p>
          <div className="flex items-center justify-center md:justify-start space-x-4 mt-4 text-gray-400">
            <Mail size={20} />
            <span>
              {profileMode === "alumni"
                ? "arikul.gupta@campusskillx.com"
                : "kevin@example.com"}
            </span>
            <Phone size={20} />
            <span>
              {profileMode === "alumni"
                ? "+91 87550 93039"
                : "+91 70000 11111"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-700 mb-10 justify-center md:justify-start">
        {currentTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 pb-3 border-b-4 ${
              activeTab === id
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-gray-500 hover:text-indigo-300"
            } transition-all duration-300 font-medium`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* USER MODE */}
        {profileMode === "user" && activeTab === "overview" && (
          <section className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Trophy, label: "Hackathons", value: 12 },
                { icon: Award, label: "Certificates", value: 8 },
                { icon: Star, label: "Contributions", value: 45 },
                { icon: Target, label: "Evaluation Score", value: evaluationScore.toFixed(1) },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-center"
                >
                  <Icon className="mx-auto mb-2 text-indigo-400" size={36} />
                  <h3 className="text-3xl font-bold text-white">{value}</h3>
                  <p className="text-gray-400">{label}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* USER Recommendations */}
        {profileMode === "user" && activeTab === "recommendations" && (
          <section className="space-y-6 max-w-5xl">
            <h2 className="text-3xl font-semibold mb-4 text-indigo-300">
              Alumni You Can Reach Out To
            </h2>

            <button
              onClick={() => setShowAlumniList(!showAlumniList)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold mb-6"
            >
              {showAlumniList ? "Hide Alumni List" : "View Alumni Profiles"}
            </button>

            {showAlumniList && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {mockAlumni.map((a) => (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    key={a.id}
                    className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-center"
                  >
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-teal-200"
                    />
                    <h3 className="text-xl font-bold text-teal-400">{a.name}</h3>
                    <p className="text-gray-300">{a.role}</p>
                    <p className="text-sm text-gray-400 mb-2">
                      {a.company} • Batch {a.batch}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Contributions: <span className="text-teal-300">{a.contributions}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="bg-white/10 p-6 rounded-2xl shadow-lg max-w-lg">
              <h3 className="text-2xl font-semibold mb-2 text-indigo-300">
                Based on your progress...
              </h3>
              <p className="text-gray-300">
                You should connect with{" "}
                <span className="text-teal-400 font-bold">
                  {recommendedAlumni[0]?.name}
                </span>{" "}
                from {recommendedAlumni[0]?.company} for mentorship or guidance.
              </p>
            </div>
          </section>
        )}

        {/* ALUMNI MODE */}
        {profileMode === "alumni" && activeTab === "overview" && (
          <section className="space-y-6 max-w-4xl">
            <h2 className="text-3xl font-semibold text-teal-300 mb-6">Professional Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Briefcase, label: "Company", value: "JP Morgan" },
                { icon: Star, label: "Experience", value: "2 Years" },
                { icon: Award, label: "Projects", value: "14" },
                { icon: Target, label: "Mentorships", value: "12" },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow-lg text-center"
                >
                  <Icon className="mx-auto mb-2 text-teal-400" size={36} />
                  <h3 className="text-2xl font-bold text-white">{value}</h3>
                  <p className="text-gray-400">{label}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
