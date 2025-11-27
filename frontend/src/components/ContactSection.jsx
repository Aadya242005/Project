import React, { useState } from "react";
import { motion } from "framer-motion";
import uploadImg from "../assets/upload5.svg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok && data.success) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const msg = data.error || data.message || `HTTP ${response.status}`;
        alert("❌ Error: " + msg);
      }
    } catch (err) {
      alert("❌ Failed to send message: " + err.message);
    }
  };

  return (
    <section className="relative min-h-screen bg-gray-900 py-20 px-6 lg:px-20 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-900 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${uploadImg})` }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-pink-500/30 
                     rounded-3xl p-10 shadow-[0_0_25px_rgba(236,72,153,0.4)] 
                     w-full lg:w-1/2 space-y-6"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl font-extrabold text-pink-400 mb-4 drop-shadow-lg">
            📬 Contact Us
          </h1>
          <p className="text-gray-300 mb-6">
            We’d love to hear from you! Reach out for queries, support, or partnerships.
          </p>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full p-3 rounded-lg bg-black/30 border border-pink-400/40 text-white"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg bg-black/30 border border-pink-400/40 text-white"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Write your message..."
            className="w-full p-3 rounded-lg bg-black/30 border border-pink-400/40 text-white"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 
                       text-white font-bold py-3 rounded-xl shadow-lg 
                       hover:scale-105 transition-transform"
          >
            Send Message
          </button>
        </motion.form>

        {/* Decorative Card */}
        <motion.div className="w-full lg:w-1/2 h-[28rem] perspective">
          <motion.div
            className="relative w-full h-full rounded-3xl"
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 flex flex-col justify-center items-center 
                         bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl 
                         p-8 shadow-2xl text-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img src={uploadImg} alt="Contact Illustration" className="w-3/4 mb-6" />
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">Get in Touch</h2>
              <p className="text-gray-200 mb-6">
                Stay connected with us for more updates 🚀
              </p>
            </div>

            <div
              className="absolute inset-0 flex flex-col justify-center items-center 
                         bg-gradient-to-br from-teal-700 to-purple-800 rounded-3xl p-8 text-center"
              style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">📞 Contact Info</h2>
              <div className="space-y-3 text-gray-100">
                <p>📧 <strong>Email:</strong> support@skillx.in</p>
                <p>📞 <strong>Phone:</strong> +91 8755093039</p>
                <p>📍 <strong>Address:</strong> GLA University, India</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
