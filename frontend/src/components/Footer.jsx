import React from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Hackathons", href: "/hackathons" },
    { name: "Certificates", href: "/certificates" },
    { name: "Resume Matcher", href: "/resume" },
  ];

  const socialLinks = [
    { icon: <Facebook size={22} />, href: "#" },
    { icon: <Twitter size={22} />, href: "#" },
    { icon: <Linkedin size={22} />, href: "#" },
    { icon: <Mail size={22} />, href: "mailto:info@skillx.com" },
  ];

  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="text-center md:text-left max-w-sm">
          <h2 className="text-2xl font-bold">SkillX</h2>
          <p className="text-base mt-1">
            Empowering students with peer learning, hackathons & career growth.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white text-base hover:text-yellow-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className="hover:text-yellow-400 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Inspirational Quote */}
      <div className="mt-8 text-center max-w-2xl mx-auto text-white italic text-lg">
        “Learning never exhausts the mind.” — <span className="not-italic font-semibold">Leonardo da Vinci</span>
        <p className="mt-2 text-base not-italic font-normal">
          Empowering you to grow through hackathons, peer learning, and innovation.
        </p>
      </div>

      {/* Bottom Bar + Twilio Attribution */}
      <div className="mt-8 text-center text-base text-white/80 space-y-2">
        <p>© {currentYear} SkillX. Built with ❤️ for College Students.</p>
        <p>
          SMS & notifications powered by{" "}
          <a
            href="https://www.twilio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-400"
          >
            Twilio
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
