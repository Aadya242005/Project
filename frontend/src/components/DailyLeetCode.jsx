import React, { useState } from "react";
import { Search } from "lucide-react";
import bgFuture from "../assets/web2.jpeg";

const allQuestions = [
  { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: 56.4 },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", acceptance: 47.8 },
  { id: 3, title: "Longest Palindromic Substring", difficulty: "Medium", acceptance: 39.2 },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: 31.5 },
  { id: 5, title: "Merge Intervals", difficulty: "Medium", acceptance: 44.3 },
];

const trendingCompanies = [
  { name: "Google", count: 2134 },
  { name: "Meta", count: 1314 },
  { name: "Amazon", count: 1885 },
  { name: "Microsoft", count: 1276 },
  { name: "Uber", count: 458 },
  { name: "Netflix", count: 512 },
  { name: "Adobe", count: 678 },
  { name: "Oracle", count: 322 },
];

const DailyLeetCode = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredQuestions = allQuestions.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate LeetCode URL
  const getLeetCodeUrl = (title) =>
    `https://leetcode.com/problems/${title.toLowerCase().replace(/ /g, "-")}/`;

  return (
    <div
      className="min-h-screen text-gray-100 flex justify-center px-8 py-10 relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgFuture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay + glassmorphism blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl w-full flex flex-col lg:flex-row gap-8">
        {/* Left — Question List */}
        <div className="flex-1 bg-[#1a1a1a]/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-white">
              📘 Daily LeetCode Challenges
            </h1>
            <div className="flex items-center bg-[#2a2a2a]/70 px-3 py-2 rounded-md">
              <Search className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm focus:outline-none text-gray-300 placeholder-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="flex justify-between items-center bg-[#202020]/70 hover:bg-[#2c2c2c]/70 transition-colors px-4 py-3 rounded-lg cursor-pointer"
                onClick={() => window.open(getLeetCodeUrl(q.title), "_blank")}
              >
                <div className="flex flex-col">
                  <span className="text-gray-200 font-medium">
                    {q.id}. {q.title}
                  </span>
                  <span
                    className={`text-xs mt-0.5 ${
                      q.difficulty === "Easy"
                        ? "text-green-400"
                        : q.difficulty === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <div className="text-sm text-gray-400">{q.acceptance}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Calendar + Trending */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          {/* Calendar */}
          <div className="bg-[#1a1a1a]/70 backdrop-blur-lg rounded-xl p-5 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-3">
              📅 October Progress
            </h2>
            <div className="grid grid-cols-7 text-center text-sm gap-1 text-gray-400">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i}>{d}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const active = Math.random() > 0.6;
                return (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-md mx-auto transition-colors ${
                      active
                        ? "bg-emerald-500/80 hover:bg-emerald-400"
                        : "bg-[#2a2a2a]/70"
                    }`}
                  ></div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">Green = Solved days</p>
          </div>

          {/* Trending Companies */}
          <div className="bg-[#1a1a1a]/70 backdrop-blur-lg rounded-xl p-5 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-3">
              🚀 Trending Companies
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingCompanies.map((c, i) => (
                <span
                  key={i}
                  className="text-xs bg-[#2a2a2a]/70 hover:bg-emerald-500/30 text-gray-300 rounded-full px-3 py-1 border border-gray-700 transition"
                >
                  {c.name}{" "}
                  <span className="text-yellow-400 font-medium">{c.count}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLeetCode;
