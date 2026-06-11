import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import {
  FaReact, FaPython, FaJs, FaNodeJs,
  FaGithub, FaLinkedin, FaDownload, FaBrain
} from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";
import NeoBrutalist3D from "./NeoBrutalist3D";
import CreepyButton from "./CreepyButton";

const techBadges = [
  { icon: <FaReact />,    label: "React",            color: "#000000" },
  { icon: <FaPython />,   label: "Python",           color: "#000000" },
  { icon: <FaJs />,       label: "JavaScript",       color: "#000000" },
  { icon: <FaNodeJs />,   label: "Node.js",          color: "#000000" },
  { icon: <FaBrain />,    label: "Machine Learning", color: "#000000" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: "120px 40px 60px",
      gap: 60,
      overflow: "hidden",
      flexWrap: "wrap",
      borderBottom: "2px solid #000000",
    }}>

      {/* ── LEFT: TEXT CONTENT ────────────────────────── */}
      <div style={{ zIndex: 10, maxWidth: 580, flex: "1 1 320px" }}>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="section-tag" style={{ marginBottom: 20 }}>
            👋 Hello, World!
          </span>
        </motion.div>

        {/* Name with stroke outline style */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{
            fontSize: "clamp(2.8rem, 6.5vw, 4.6rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            marginBottom: 20,
            fontFamily: "'Cabinet Grotesk', sans-serif",
            color: "var(--text-primary)",
            letterSpacing: "-0.03em"
          }}
        >
          Aman <span className="text-stroke-nb">Srivastava</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.h2
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
            fontWeight: 800,
            color: "var(--text-secondary)",
            marginBottom: 24,
            fontFamily: "'Cabinet Grotesk', sans-serif",
            minHeight: 40,
          }}
        >
          <span>{"< "}</span>
          <Typewriter
            words={[
              "Frontend Developer",
              "AI & ML Enthusiast",
              "Python Developer",
              "Problem Solver",
              "DevOps Explorer",
            ]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={65}
            deleteSpeed={40}
            delaySpeed={1800}
          />
          <span>{" />"}</span>
        </motion.h2>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 500,
            fontWeight: 500,
            fontFamily: "'Satoshi', sans-serif"
          }}
        >
          I craft <strong style={{ fontWeight: 800 }}>modern web experiences</strong> using
          React, JavaScript &amp; AI technologies. Passionate about building
          scalable, beautiful &amp; high-contrast layouts.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}
        >
          <CreepyButton
            href="/resume.pdf"
            download
            variant="primary"
            coverClassName="flex items-center justify-center gap-2"
          >
            <FaDownload /> Download Resume
          </CreepyButton>
          <CreepyButton
            href="https://github.com/AmanSri3130"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            coverClassName="flex items-center justify-center gap-2"
          >
            <FaGithub /> GitHub
          </CreepyButton>
          <CreepyButton
            href="https://www.linkedin.com/in/amansri3130"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            coverClassName="flex items-center justify-center gap-2"
          >
            <FaLinkedin /> LinkedIn
          </CreepyButton>
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          {techBadges.map((badge, i) => (
            <span
              key={i}
              className="tech-badge border-nb shadow-nb-sm"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: "#ffffff",
                padding: "6px 14px",
                borderRadius: "4px"
              }}
            >
              {badge.icon} {badge.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: PROFILE IMAGE & 3D CANVAS ────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        style={{
          zIndex: 10,
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: 360,
          height: 380,
        }}
      >
        {/* Background 3D Canvas rendering rotating outined elements */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <NeoBrutalist3D />
        </div>

        {/* Central Profile Card */}
        <div className="border-nb shadow-nb-lg" style={{
          position: "relative",
          zIndex: 5,
          width: 210,
          height: 210,
          backgroundColor: "#ffffff",
          padding: "8px",
          borderRadius: "16px",
          transform: "rotate(-3deg)",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(0deg) scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(-3deg) scale(1)"}
        >
          <img
            src="/profile.jpg"
            alt="Aman Srivastava"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              objectFit: "cover",
              border: "2px solid #000000",
            }}
          />
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: 30, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8,
          color: "var(--text-secondary)",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 800,
          fontFamily: "'Satoshi', sans-serif"
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 24, height: 40,
            borderRadius: 12,
            border: "2px solid #000000",
            display: "flex", justifyContent: "center", paddingTop: 6,
            backgroundColor: "#ffffff"
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 4, height: 8, borderRadius: 2,
              background: "#000000",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;