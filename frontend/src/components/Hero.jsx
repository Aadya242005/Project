import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import bgImage from "../assets/homebg.jpg";

const Hero = () => {
  const navigate = useNavigate();

  // 🌈 Parallax tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);
  const glowX = useTransform(x, [-500, 500], ["20%", "80%"]);
  const glowY = useTransform(y, [-300, 300], ["30%", "70%"]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    x.set(e.clientX - innerWidth / 2);
    y.set(e.clientY - innerHeight / 2);
  };

  const courses = [
    "Learn DSA",
    "Fullstack Development",
    "Machine Learning",
    "Python Programming",
    "Certified RCET Courses",
  ];

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-white"
      onMouseMove={handleMouseMove}
    >
      {/* 🌌 Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 🌑 Dark overlay covering entire viewport */}
      <div className="absolute inset-0 z-10 bg-black/70" />

      {/* 🌈 Animated gradient layers */}
      <motion.div
        className="absolute inset-0 z-20"
        animate={{
          background: [
            "radial-gradient(circle at 10% 20%, rgba(255,0,150,0.2) 0%, transparent 70%)",
            "radial-gradient(circle at 80% 80%, rgba(0,150,255,0.25) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 60%, rgba(255,0,150,0.2) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🪩 Glow orb */}
      <motion.div
        className="absolute w-[20rem] h-[20rem] rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 opacity-30 blur-3xl pointer-events-none z-30"
        style={{
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* ✨ Floating star */}
      <motion.div
        className="absolute top-12 left-10 text-yellow-400 z-30"
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <FiStar size={30} />
      </motion.div>

      {/* 🧠 Hero Content */}
      <motion.div
        className="z-40 text-center max-w-3xl px-4"
        style={{ rotateX, rotateY }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <h1 className="text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Linksy: Skills via Campus
        </h1>
        <p className="text-xl mb-4 opacity-90">
          Learn, Compete, Grow — Your Campus Journey Starts Here.
        </p>

        {/* 🎓 Moving Course Boxes */}
        <div className="relative w-full overflow-hidden py-6 mt-6">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...courses, ...courses].map((course, idx) => (
              <motion.div
                key={idx}
                className="min-w-[200px] px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white text-lg font-semibold text-center shadow-lg hover:scale-110 hover:bg-white/20 transition"
              >
                {course}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ✅ Login / Sign Up Buttons redirecting to AuthPage */}
        <div className="flex gap-4 justify-center mt-4 flex-wrap">
          <motion.button
            onClick={() => navigate("/auth")}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(255,255,255,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full font-semibold transition-all border border-white text-white hover:bg-white hover:text-black"
          >
            Login
          </motion.button>

          <motion.button
            onClick={() => navigate("/auth")}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(255,255,255,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full font-semibold transition-all bg-white text-black hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
          >
            Sign Up
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 text-white/70 text-sm tracking-wide z-40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ↓ Scroll to explore
      </motion.div>
    </section>
  );
};

export default Hero;
