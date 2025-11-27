import React from "react";
import { motion } from "framer-motion";
import studioImage from "../assets/upload6.svg"; // Replace with your image

const features = [
  { title: "Alumni Guidance", category: "Creative" },
  { title: "Peer Learning", category: "Creative" },
  { title: "Certificates", category: "Creative" },
  { title: "Weekly Hackathons", category: "Production" },
  { title: "Resume Matcher", category: "Production" },
  { title: "Personal Dashboard", category: "Production" },
];

const FeatureSection = () => {
  const creativeFeatures = features.filter((f) => f.category === "Creative");
  const productionFeatures = features.filter((f) => f.category === "Production");

  return (
    <section className="w-full min-h-screen bg-[#0F172A] text-gray-100 flex flex-col lg:flex-row p-10 gap-10 relative overflow-hidden">
      {/* Left Image with motion */}
      <motion.div
        className="relative w-full lg:w-1/2 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src={studioImage}
          alt="Studio"
          className="w-full h-full object-cover"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Neon overlay text */}
        <div className="absolute top-10 left-8 text-[#3B82F6] font-serif text-5xl italic drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">
          Studio
        </div>
        <div className="absolute bottom-10 left-8 text-[#22D3EE] font-serif text-5xl italic drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
          Services
        </div>

        {/* Soft glow behind image */}
        <div className="absolute inset-0 bg-[#3B82F6]/20 rounded-xl blur-3xl"></div>
      </motion.div>

      {/* Right Side: Features */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-10">
        <div>
          <h2 className="text-4xl font-serif mb-4 text-[#3B82F6]">Creative</h2>
          <ul className="space-y-3 text-lg">
            {creativeFeatures.map((feature, idx) => (
              <li
                key={idx}
                className="pl-6 relative before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] before:rounded-full"
              >
                {feature.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-4xl font-serif mb-4 text-[#22D3EE]">Production</h2>
          <ul className="space-y-3 text-lg">
            {productionFeatures.map((feature, idx) => (
              <li
                key={idx}
                className="pl-6 relative before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] before:rounded-full"
              >
                {feature.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating particles behind section */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random(),
              scale: Math.random(),
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
