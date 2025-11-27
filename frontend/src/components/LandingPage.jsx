import React from "react";
import Hero from "./Hero";
import AlumniSection from "./Alumni";
import FeaturesSection from "./FeaturesSection";
import TechStack from "./Hackathon";
import Certificates from "./Certificates"; 
import Footer from "./Footer";
import Resume from "./Resume";
import ContactSection from "./ContactSection";
import Website from "./Website";
import FutureVision from "./FutureVision";
import DailyLeetCode from "./DailyLeetCode"; 

const LandingPage = () => {
  return (
    <div className="pt-20"> {/* Push content below fixed navbar */}
      <section id="hero">
        <Hero />
      </section>

      <section id="core-features">
        <FeaturesSection />
      </section>

      <section id="alumni">
        <AlumniSection />
      </section>

      <section id="about-website">
        <Website />
      </section>

      <section id="hackathons">
        <TechStack />
      </section>

      <section id="certifications">
        <Certificates />
      </section>

      <section id="future-vision">
        <FutureVision />
      </section>

      <section id="resume">
        <Resume />
      </section>

  
      <section id="daily-leetcode">
        <DailyLeetCode />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
