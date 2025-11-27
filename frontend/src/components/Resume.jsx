import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import uploadImg from "../assets/upload4.svg";

const ResumeAnalyzer = () => {
  const [fileName, setFileName] = useState(null);
  const [fileObj, setFileObj] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [matchScore, setMatchScore] = useState(null);
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const controls = useAnimation();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileObj(file);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    // simple validation
    if (!fileObj) return alert("Please upload a resume file first.");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const form = new FormData();
      form.append("resume", fileObj);
      form.append("jobText", jobDesc);

      const res = await fetch(`${apiUrl}/api/ml/score-resume`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Server error");
      }

      const data = await res.json();

      // response shape: { status: 'success', result: { score, matched_keywords, missing_keywords, top_resume_keywords } }
      const result = data?.result || data?.raw || {};
  const score = (result.score ?? parseFloat(data?.raw)) || 0;

      setMatchScore(score);

      // animate the circle
      controls.start({ strokeDashoffset: (1 - score / 100) * 2 * Math.PI * 50 });

      // you can extend to show matched/missing keywords
      if (result.matched_keywords) {
        setMatchedKeywords(result.matched_keywords || []);
      }
      if (result.missing_keywords) {
        setMissingKeywords(result.missing_keywords || []);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to analyze resume");
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0F172A] py-20 px-6 lg:px-20 text-white overflow-hidden">
      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/30 via-[#22D3EE]/20 to-[#3B82F6]/30 animate-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Upload & Job Description */}
        <motion.div
          className="w-full lg:w-1/2 space-y-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl font-extrabold text-[#22D3EE] drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">
            🧾 Resume Analyzer
          </h1>
          <p className="text-gray-300">
            Upload your resume and paste the job description to see how well you match.
          </p>

          {/* Resume Upload */}
          <div className="border-b border-gray-700 pb-6">
            <div className="flex items-center gap-4 mb-4">
              <FiUpload className="text-[#f472b6] text-3xl" />
              <div>
                <h2 className="text-lg font-semibold text-[#f472b6]">Upload Resume</h2>
                <p className="text-sm text-gray-400">Accepted: PDF, DOC, DOCX</p>
              </div>
            </div>
            <label className="block cursor-pointer bg-gray-800/40 text-white rounded-lg px-4 py-3 hover:bg-gray-700/60 transition-all">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
              {fileName ? `📄 ${fileName}` : "Click to upload resume"}
            </label>
          </div>

          {/* Job Description */}
          <div className="border-b border-gray-700 pb-6">
            <textarea
              rows={6}
              placeholder="Paste the job description here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="w-full bg-gray-800/40 text-white rounded-lg p-4 focus:ring-2 focus:ring-[#22D3EE] placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-[#f472b6] via-[#a78bfa] to-[#22D3EE] text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform"
          >
            🔍 Analyze Match
          </button>

          {/* Match Score */}
          {matchScore !== null && (
            <div className="flex flex-col items-center gap-4 pt-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="50"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="50"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50}
                    strokeLinecap="round"
                    fill="none"
                    transform="rotate(-90 60 60)"
                    animate={controls}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                  {matchScore}%
                </div>
              </div>
              <p className="text-gray-400 text-center">Resume Match Score</p>
              <div className="w-full max-w-md mt-4 bg-gray-900/50 rounded-lg p-4">
                <h3 className="text-sm text-[#22D3EE] font-semibold">Matched Keywords</h3>
                {matchedKeywords.length ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {matchedKeywords.map((k) => (
                      <span key={k} className="px-2 py-1 bg-green-600/30 rounded text-sm">{k}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2">No matched keywords found.</p>
                )}

                <h3 className="text-sm text-[#f472b6] font-semibold mt-4">Missing Keywords</h3>
                {missingKeywords.length ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {missingKeywords.map((k) => (
                      <span key={k} className="px-2 py-1 bg-red-600/20 rounded text-sm">{k}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2">No missing keywords detected.</p>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={uploadImg} alt="Upload Illustration" className="w-3/4 lg:w-full rounded-2xl shadow-2xl" />
        </motion.div>
      </div>

      {/* Floating Glows */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-24 -left-24 w-64 h-64 bg-[#f472b6]/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute -bottom-28 -right-28 w-80 h-80 bg-[#22D3EE]/30 rounded-full blur-3xl"
      />
    </section>
  );
};

export default ResumeAnalyzer;
