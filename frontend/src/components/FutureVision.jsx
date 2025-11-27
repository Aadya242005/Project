import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/upload5.svg";
import futuImg from "../assets/futu.jpg";

const references = [
  {
    title: "OpenAI GPT-4 Documentation",
    link: "https://platform.openai.com/docs/",
  },
  {
    title: "DeepLearning.AI Generative AI Course",
    link: "https://www.deeplearning.ai/short-courses/generative-ai/",
  },
  {
    title: "Hugging Face Transformers Docs",
    link: "https://huggingface.co/docs/transformers/index",
  },
  {
    title: "Google AI Blog",
    link: "https://ai.googleblog.com/",
  },
];

const FutureVision = () => {
  return (
    <section
      className="relative min-h-[100vh] flex flex-col lg:flex-row text-gray-100 overflow-hidden bg-[#0F172A]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#1E293B]/90 to-[#0F172A]/95 pointer-events-none"></div>

      {/* Left Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-start lg:w-1/2 px-6 lg:px-16 py-32 gap-6">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-[#3B82F6] drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          Shaping the Future of Youths
        </motion.h1>

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#22D3EE]"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          Into Reality
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        >
          Empowering students with next-gen AI tools, real-world projects, and peer collaboration — SkillX transforms your campus learning into impactful innovation.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <a
            href="#learn-more"
            className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-300"
          >
            Explore the Vision →
          </a>

          {/* Generative AI References */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-[#1E293B]/80 hover:bg-[#3B82F6]/40 rounded-xl text-sm md:text-base text-[#22D3EE] font-medium transition-shadow shadow-md hover:shadow-lg"
              >
                {ref.title}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <motion.div
        className="relative lg:w-1/2 w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={futuImg}
          alt="Future Vision"
          className="w-full h-full object-cover rounded-l-3xl shadow-2xl"
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Soft glow behind image */}
        <div className="absolute inset-0 bg-[#3B82F6]/20 rounded-l-3xl blur-3xl"></div>
      </motion.div>
    </section>
  );
};

export default FutureVision;
