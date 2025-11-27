import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/web.jpg";
import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.png";

const AboutWebsite = () => {
  return (
    <section
      className="relative min-h-[160vh] flex flex-col justify-center items-center text-white text-center px-6 py-32 overflow-hidden bg-[#0F172A]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay with tech-blue tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#1E293B]/70 to-[#0F172A]/95 pointer-events-none"></div>

      {/* Floating particles for dynamic depth */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random(),
              scale: Math.random(),
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Sliding images with glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={slide1}
          alt="slide1"
          className="absolute top-32 left-[-300px] w-[28rem] h-[18rem] object-cover rounded-xl opacity-60 shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          animate={{ x: [0, 400, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src={slide2}
          alt="slide2"
          className="absolute bottom-40 right-[-300px] w-[28rem] h-[18rem] object-cover rounded-xl opacity-60 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          animate={{ x: [0, -400, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src={slide3}
          alt="slide3"
          className="absolute top-[60%] right-[35%] w-[26rem] h-[17rem] object-cover rounded-xl opacity-60 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          animate={{ x: [0, 200, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Text content */}
      <motion.div
        className="relative z-10 max-w-3xl mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-[#3B82F6] drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
          The Future of Intelligent Gladiators!
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Built with next-generation AI, our platform connects students, mentors,
          and projects through a single adaptive ecosystem — making learning
          smarter, faster, and more impactful.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutWebsite;
