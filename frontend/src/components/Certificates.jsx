import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/upload5.svg"; // Subtle tech pattern background

const certificates = [
  {
    name: "AWS Certified Solutions Architect",
    description:
      "Highly valued in cloud and DevOps roles, validating expertise in designing scalable cloud systems.",
    link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    name: "Google Cloud Professional Data Engineer",
    description:
      "Demonstrates proficiency in building, maintaining, and optimizing data processing systems.",
    link: "https://cloud.google.com/certification/data-engineer",
  },
  {
    name: "Microsoft Azure Fundamentals",
    description:
      "Good entry-level certification for understanding cloud concepts and Microsoft Azure services.",
    link: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    name: "Certified Ethical Hacker (CEH)",
    description:
      "Widely recognized in cybersecurity, proving skills in identifying vulnerabilities and securing systems.",
    link: "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/",
  },
  {
    name: "TensorFlow Developer Certificate",
    description:
      "Proves hands-on ability in machine learning and deep learning model development.",
    link: "https://www.tensorflow.org/certificate",
  },
  {
    name: "PMP (Project Management Professional)",
    description:
      "Globally recognized certification for project managers, in demand across industries.",
    link: "https://www.pmi.org/certifications/project-management-pmp",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 14 },
  },
};

const Certificates = () => {
  return (
    <section
      className="relative py-24 px-6 text-gray-100 bg-[#0F172A]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#1E293B]/90 to-[#0F172A]/95 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-[#3B82F6]">
          📜 Valuable Certifications
        </h2>
        <p className="text-lg mb-12 text-gray-300 max-w-3xl mx-auto">
          Boost your career with globally recognized certifications in Cloud, AI,
          Cybersecurity, and Project Management. These validate your expertise and
          open doors to high-impact roles.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={card}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(34, 211, 238, 0.4)",
              }}
              className="bg-[#1E293B]/80 border border-[#3B82F6]/30 rounded-xl shadow-md p-6 text-left transition-all duration-300 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-[#22D3EE] mb-2">
                {cert.name}
              </h3>
              <p className="text-sm text-gray-400 mb-6">{cert.description}</p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-white bg-[#3B82F6] hover:bg-[#22D3EE] px-4 py-2 rounded-lg transition-all duration-300"
              >
                Learn More →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
