import React from "react";
import Hero from "../components/Hero";
import StatsCounter from "../components/StatsCounter";
import SkillGlobe from "../components/SkillGlobe";
import Projects from "../components/Projects";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaBrain, FaCode, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CreepyButton from "../components/CreepyButton";

const highlights = [
  { icon: <FaReact />,   color: "#ffe17c", title: "Frontend",        desc: "React, JavaScript, HTML/CSS with pixel-perfect UI" },
  { icon: <FaPython />,  color: "#4ade80", title: "Backend & Python", desc: "Node.js, FastAPI, RESTful APIs & databases" },
  { icon: <FaBrain />,   color: "#a78bfa", title: "AI / ML",          desc: "LangChain, Gemini, Scikit-learn & NLP systems" },
  { icon: <FaCode />,    color: "#22d3ee", title: "Problem Solving",   desc: "300+ DSA problems, algorithms & system design" },
];

const Home = () => {
  const { theme } = useTheme();

  return (
    <main 
      className={theme === "dark" ? "mesh-bg-dark" : "mesh-bg-light"}
      style={{ width: "100%", overflowX: "hidden", position: "relative" }}
    >

      {/* ── DYNAMIC BG BLOBS ────────────────────────────── */}
      <motion.div
        animate={{
          x: [0, 180, -180, 0],
          y: [0, -120, 120, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: "15%",
          left: "-10%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{
          x: [0, -180, 180, 0],
          y: [0, 120, -120, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          bottom: "10%",
          right: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 100, -100, 0],
          scale: [0.9, 1.05, 0.95, 0.9]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: "50%",
          left: "40%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <Hero />

      {/* ── STATS COUNTER ────────────────────────────────── */}
      <StatsCounter />

      {/* ── DIVIDER ──────────────────────────────────────── */}
      <div className="section-divider" />

      {/* ── ABOUT SNIPPET ────────────────────────────────── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 64 }} data-aos="fade-up">
            <span className="section-tag">Who I Am</span>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 12, marginBottom: 16,
            }}>
              About{" "}
              <span style={{
                background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Me
              </span>
            </h2>
          </div>

          {/* Two-column layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 48, alignItems: "center",
          }}>
            {/* Text side */}
            <div data-aos="fade-right">
              <p style={{
                color: "var(--text-secondary)", fontSize: "1.05rem",
                lineHeight: 1.85, marginBottom: 24,
              }}>
                I'm <strong style={{ color: "var(--text-primary)" }}>Aman Srivastava</strong>, a 4th-year B.Tech CS student
                with a deep passion for software development, Artificial Intelligence, and Data Science.
              </p>
              <p style={{
                color: "var(--text-secondary)", fontSize: "1.05rem",
                lineHeight: 1.85, marginBottom: 32,
              }}>
                I love building modern, scalable applications that combine{" "}
                <strong style={{ color: "var(--text-primary)" }}>clean interfaces</strong>,{" "}
                <strong style={{ color: "var(--text-primary)" }}>intelligent systems</strong>, and{" "}
                <strong style={{ color: "var(--text-primary)" }}>real-world impact</strong>.
              </p>
              <CreepyButton to="/about" variant="primary" style={{ display: "inline-flex" }}>
                Learn More About Me →
              </CreepyButton>
            </div>

            {/* Cards grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}>
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass glass-hover"
                  style={{ padding: "20px 18px", borderRadius: 12 }}
                >
                  <div style={{
                    fontSize: "1.6rem", color: item.color,
                    marginBottom: 10,
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{
                    fontSize: "0.95rem", fontWeight: 700,
                    marginBottom: 6, color: "#000000",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "#000000", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS GLOBE ─────────────────────────────────── */}
      <section className="bg-nb-yellow-dots border-nb" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div data-aos="fade-up" style={{ marginBottom: 48 }}>
            <span className="section-tag" style={{ backgroundColor: "#ffffff" }}>Skills</span>
            <h2 className="font-cabinet" style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              marginTop: 12,
              color: "#000000"
            }}>
              My Tech Stack
            </h2>
            <p className="font-satoshi" style={{ color: "#000000", marginTop: 12, fontWeight: 700 }}>
              Drag the globe to explore my skills in 3D
            </p>
          </div>
          <SkillGlobe />
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────── */}
      <div className="section-divider" />

      {/* ── FEATURED PROJECTS ────────────────────────────── */}
      <Projects />

      {/* ── DIVIDER ──────────────────────────────────────── */}
      <div className="section-divider" />

      {/* ── CONTACT CTA ──────────────────────────────────── */}
      <section style={{ padding: "100px 24px", backgroundColor: "var(--bg-secondary)", borderTop: "2px solid #000000", borderBottom: "2px solid #000000", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }} data-aos="fade-up">
          <span className="section-tag" style={{ backgroundColor: "#ffffff" }}>Get In Touch</span>
          <h2 className="font-cabinet" style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
            marginTop: 16, marginBottom: 20,
          }}>
            Let's Build Something <span className="text-stroke-nb">Amazing 🚀</span>
          </h2>
          <p className="font-satoshi" style={{
            color: "var(--text-secondary)", fontSize: "1.05rem",
            lineHeight: 1.8, marginBottom: 40, fontWeight: 700
          }}>
            Feel free to reach out if you want to collaborate, discuss opportunities,
            or just have a conversation about tech.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <CreepyButton to="/contact" variant="primary">
              Contact Me ✉️
            </CreepyButton>
            <CreepyButton
              href="https://www.linkedin.com/in/amansri3130"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Connect on LinkedIn
            </CreepyButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;