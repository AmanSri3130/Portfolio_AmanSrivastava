import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "./Footer";
import {
  FaReact, FaPython, FaJsSquare, FaDatabase, FaGitAlt,
  FaDocker, FaNodeJs, FaTrophy, FaGraduationCap, FaLaptopCode,
  FaYoutube, FaWordpress, FaHandsHelping, FaBookReader,
} from "react-icons/fa";
import { SiScikitlearn, SiTailwindcss, SiMongodb, SiPostgresql } from "react-icons/si";

const certifications = [
  { title: "Advanced Frontend Development", issuer: "E&ICT Academy, IIIT", icon: "💻", pdf: "https://drive.google.com/file/d/1DKOx0lW6f4yE-nquTnsWJaVf8zvpxxrg/view" },
  { title: "Python Programming", issuer: "Online Certification", icon: "🐍", pdf: "https://drive.google.com/file/d/1DLDW-on-gtV7lsEoC6LM33Ai1niQj1yS/view" },
  { title: "Digital Marketing Certification", issuer: "Online Certification", icon: "📈", pdf: "https://drive.google.com/file/d/1DKb4Wg6xPqXf9n5eEr5SCZ-mR84Wh4ee/view" },
  { title: "Social Impact Crowdfunding", issuer: "Muskurahat Foundation", icon: "🤝", pdf: "https://drive.google.com/file/d/1DT_lTMqbwnb-8oSrWmy_mfeB_lxxgDFi/view" },
];

const achievements = [
  { icon: <FaTrophy />, title: "AI/ML Projects", desc: "Built multiple end-to-end AI & ML projects including recommendation systems and GenAI chatbots.", color: "#facc15" },
  { icon: <FaLaptopCode />, title: "300+ DSA Problems", desc: "Solved 300+ Data Structures & Algorithm problems on LeetCode and GeeksforGeeks.", color: "#22d3ee" },
  { icon: <FaGraduationCap />, title: "Full Stack Apps", desc: "Developed full-stack applications using React, Node.js, Python and cloud deployments.", color: "#a78bfa" },
];

const skills = [
  { name: "React & JavaScript", level: 88, color: "#22d3ee", icon: <FaReact /> },
  { name: "Python", level: 82, color: "#4ade80", icon: <FaPython /> },
  { name: "Machine Learning", level: 74, color: "#a78bfa", icon: <SiScikitlearn /> },
  { name: "Node.js & Express", level: 70, color: "#86efac", icon: <FaNodeJs /> },
  { name: "SQL & Databases", level: 72, color: "#60a5fa", icon: <FaDatabase /> },
  { name: "Git & DevOps", level: 68, color: "#fb923c", icon: <FaGitAlt /> },
];

const techStack = [
  { icon: <FaReact />, name: "React", color: "#22d3ee" },
  { icon: <FaJsSquare />, name: "JavaScript", color: "#facc15" },
  { icon: <FaPython />, name: "Python", color: "#4ade80" },
  { icon: <FaNodeJs />, name: "Node.js", color: "#86efac" },
  { icon: <SiMongodb />, name: "MongoDB", color: "#6ee7b7" },
  { icon: <SiPostgresql />, name: "PostgreSQL", color: "#60a5fa" },
  { icon: <FaDocker />, name: "Docker", color: "#38bdf8" },
  { icon: <SiTailwindcss />, name: "Tailwind", color: "#67e8f9" },
  { icon: <FaGitAlt />, name: "Git", color: "#f87171" },
  { icon: <SiScikitlearn />, name: "Scikit-learn", color: "#f9a8d4" },
];

const experiences = [
  {
    year: "March 2025 – April 2025",
    role: "CrowdFunding Intern",
    company: "Muskurahat Foundation",
    icon: <FaHandsHelping />,
    desc: "Worked as part of a social impact campaign to raise funds for underprivileged children. Created outreach strategies, promoted fundraising initiatives through digital platforms, and engaged with donors to meet funding targets. Developed communication, marketing, and donor management skills while supporting the foundation’s mission.",
    color: "#c2185b",
  },
  {
    year: "July 2024 – Present",
    role: "Freelance Tutor",
    company: "Self-Employed",
    icon: <FaBookReader />,
    desc: "Provided personalized academic support to students in subjects like Math, Science, and Computer Programming.",
    color: "#1e3a8a",
  },
  {
    year: "Aug 2025",
    role: "Smart India Hackathon 2025",
    company: "Hackathon Participant",
    icon: <FaTrophy />,
    desc: "Learnt a lot from the experience of the hackathon and got to know about the importance of teamwork and integrity.",
    color: "#b45309",
  },
  {
    year: "2023 – Present",
    role: "B.Tech in Computer Science",
    company: "CS Degree Student",
    icon: <FaGraduationCap />,
    desc: "Currently pursuing a degree with a focus on AI, Data Science, and Software Engineering.",
    color: "#6d28d9",
  },
  {
    year: "2023 – Present",
    role: "Building NotepediaX & StuConX",
    company: "Side Hustle",
    icon: <FaGraduationCap />,
    desc: "Working and hustling on building platforms for students powered by AI.",
    color: "#047857",
  },
  {
    year: "Jan 2023 – May 2023",
    role: "Freelance Wordpress Developer",
    company: "Self-Employed",
    icon: <FaWordpress />,
    desc: "Designed and developed custom WordPress websites for clients across various industries. Specialized in theme customization, plugin integration, and responsive design.",
    color: "#1b75bb",
  },
  {
    year: "June 2022 – Sept 2022",
    role: "Content Creator",
    company: "YouTube Channel",
    icon: <FaYoutube />,
    desc: "Worked on creating content for a youtube channel.",
    color: "#c21807",
  },
];

// Skill bar component
const SkillBar = ({ skill }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        marginBottom: 8,
      }}>
        <span style={{
          display: "flex", alignItems: "center", gap: 8,
          color: "#000000", fontWeight: 800, fontSize: "0.9rem",
          fontFamily: "'Satoshi', sans-serif"
        }}>
          <span style={{ color: "#000000", fontSize: "1rem" }}>{skill.icon}</span>
          {skill.name}
        </span>
        <span style={{ color: "#000000", fontWeight: 900, fontSize: "0.85rem" }}>
          {skill.level}%
        </span>
      </div>
      <div style={{
        height: 14,
        background: "#ffffff",
        border: "2px solid #000000",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "2px 2px 0px #000000"
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="nb-stripes"
          style={{
            height: "100%",
            background: skill.color || "var(--cyan)",
            borderRight: "2px solid #000000"
          }}
        />
      </div>
    </div>
  );
};

const About = () => {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Background blobs */}
      <motion.div
        animate={{ x: [0, 150, -150, 0], y: [0, -100, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed", top: "10%", left: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <motion.div
        animate={{ x: [0, -150, 150, 0], y: [0, 100, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed", bottom: "10%", right: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      <section style={{ position: "relative", zIndex: 1, padding: "120px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── PAGE TITLE ─────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 40 }} data-aos="fade-up">
          <span className="section-tag">Get to Know Me</span>
          <h1 style={{
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontWeight: 800,
            fontFamily: "'Space Grotesk', sans-serif",
            marginTop: 16,
            background: "linear-gradient(135deg, #22d3ee, #a78bfa, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 24,
          }}>
            About Me
          </h1>
        </div>

        {/* ── RIBBON MARQUEE ─────────────────────────────── */}
        <div style={{
          overflow: "hidden",
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          background: "var(--cyan)",
          borderTop: "3px solid #000000",
          borderBottom: "3px solid #000000",
          padding: "14px 0",
          marginBottom: 80,
          transform: "rotate(-1.5deg)",
          display: "flex",
          whiteSpace: "nowrap",
          boxShadow: "0px 6px 0px rgba(0,0,0,0.15)",
        }}>
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
            style={{
              display: "flex",
              gap: "40px",
              fontFamily: "'Space Mono', monospace",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "var(--bg-primary)",
              textTransform: "uppercase",
              paddingRight: "40px",
            }}
          >
            <span>React • Node.js • Python • Machine Learning • Deep Learning • Web Dev • Competitive Coding • React • Node.js • Python • Machine Learning • Deep Learning • Web Dev • Competitive Coding •</span>
            <span>React • Node.js • Python • Machine Learning • Deep Learning • Web Dev • Competitive Coding • React • Node.js • Python • Machine Learning • Deep Learning • Web Dev • Competitive Coding •</span>
          </motion.div>
        </div>

        {/* ── PROFILE SECTION ────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 56, alignItems: "center", marginBottom: 100,
        }}>
          {/* Profile image */}
          <motion.div
            data-aos="fade-right"
            style={{ display: "flex", justifyContent: "center", position: "relative" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{
                position: "relative",
                width: 260,
                height: 260,
                backgroundColor: "#ffffff",
                padding: "8px",
                borderRadius: "0px",
                border: "3px solid #000000",
                boxShadow: "8px 8px 0px #000000",
              }}
            >
              <img
                src="/profile.jpg"
                alt="Aman Srivastava"
                style={{
                  width: "100%", height: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                  border: "2px solid #000000",
                }}
              />
              
              {/* Rotating Circular badge stamp */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  bottom: -35,
                  right: -35,
                  width: 105,
                  height: 105,
                  zIndex: 10,
                  background: "#000000",
                  borderRadius: "50%",
                  border: "2.5px solid #000000",
                  boxShadow: "4px 4px 0px #000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg viewBox="0 0 100 100" style={{ width: "90%", height: "90%" }}>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                  />
                  <text style={{ fontSize: "7px", fontFamily: "'Space Mono', monospace", fontWeight: 800, fill: "#ffffff" }}>
                    <textPath href="#circlePath">
                      • AMAN SRIVASTAVA • 4TH YEAR B.TECH CS • STUDENT •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bio text */}
          <div data-aos="fade-left">
            <h2 className="font-cabinet" style={{
              fontSize: "2rem", fontWeight: 900,
              color: "var(--text-primary)",
              marginBottom: 16
            }}>
              Aman Srivastava
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: 16, fontSize: "1rem" }}>
              I'm a <strong style={{ color: "var(--text-primary)", textDecoration: "underline" }}>4th-year B.Tech CS student</strong> with a deep passion for
              software development, Artificial Intelligence, and Data Science. I thrive on building
              modern, scalable apps that solve real-world problems.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: 16, fontSize: "1rem" }}>
              My focus is on creating innovative solutions using{" "}
              <strong style={{ color: "var(--text-primary)", textDecoration: "underline" }}>React</strong>,{" "}
              <strong style={{ color: "var(--text-primary)", textDecoration: "underline" }}>Python</strong>,{" "}
              <strong style={{ color: "var(--text-primary)", textDecoration: "underline" }}>Machine Learning</strong> and modern web technologies —
              constantly exploring new tools to level up my craft.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.9, marginBottom: 32, fontSize: "1rem" }}>
              Currently, I am actively building systems using <strong style={{ color: "var(--text-primary)", textDecoration: "underline" }}>Retrieval-Augmented Generation (RAG)</strong>, <strong style={{ color: "var(--text-primary)", textDecoration: "underline" }}>Generative AI (GenAI)</strong>, and intelligent <strong style={{ color: "var(--text-primary)", textDecoration: "underline" }}>AI Agents</strong>.
            </p>
            {/* Info pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
              {[
                "📍 India",
                "🎓 B.Tech CS",
                "💼 Open to Work",
                "🌐 Full Stack Dev",
              ].map((item) => (
                <span key={item} className="tech-badge border-nb shadow-nb-sm" style={{
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: "4px",
                  padding: "6px 12px"
                }}>{item}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="/resume.pdf" download className="btn-primary">Download CV</a>
              <a href="/contact" className="btn-outline">Hire Me</a>
            </div>
          </div>
        </div>

        {/* ── TECH STACK ─────────────────────────────────── */}
        <div style={{ marginBottom: 100 }} data-aos="fade-up">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">Stack</span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 12,
            }}>
              Tech Stack
            </h2>
          </div>
          <div style={{
            display: "flex", flexWrap: "wrap",
            gap: 16, justifyContent: "center",
          }}>
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 50}
                whileHover={{ y: -6, scale: 1.08 }}
                className="glass glass-hover"
                style={{
                  padding: "14px 20px",
                  borderRadius: 12,
                  display: "flex", alignItems: "center", gap: 10,
                  cursor: "default",
                }}
              >
                <span style={{
                  fontSize: "1.4rem", color: tech.color,
                  filter: `drop-shadow(0 0 6px ${tech.color}60)`,
                }}>
                  {tech.icon}
                </span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#000000" }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── SKILL BARS ─────────────────────────────────── */}
        <div style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }} data-aos="fade-up">
            <span className="section-tag">Proficiency</span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 12,
            }}>
              Skill Levels
            </h2>
          </div>
          <div
            data-aos="fade-up"
            className="glass"
            style={{ padding: "40px 36px", borderRadius: 16 }}
          >
            {skills.map((skill, i) => (
              <SkillBar key={i} skill={skill} />
            ))}
          </div>
        </div>

        {/* ── GITHUB ACTIVITY ────────────────────────────── */}
        <div style={{ marginBottom: 100, textAlign: "center" }} data-aos="fade-up">
          <span className="section-tag">Open Source</span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
            marginTop: 12, marginBottom: 40,
          }}>
            GitHub Activity
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              src="https://github-readme-streak-stats.herokuapp.com/?user=AmanSri3130&theme=tokyonight&hide_border=true&background=0a1628&ring=22d3ee&fire=a78bfa&currStreakLabel=22d3ee"
              alt="GitHub streak stats"
              style={{ borderRadius: 12, maxWidth: "100%", border: "1px solid rgba(34,211,238,0.15)" }}
            />
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              src="https://github-readme-stats.vercel.app/api?username=AmanSri3130&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0a1628&title_color=22d3ee&icon_color=a78bfa&text_color=94a3b8"
              alt="GitHub stats"
              style={{ borderRadius: 12, maxWidth: "100%", border: "1px solid rgba(34,211,238,0.15)" }}
            />
          </div>
        </div>

        {/* ── LEETCODE STATS ─────────────────────────────── */}
        <div style={{ marginBottom: 100, display: "flex", flexDirection: "column", alignItems: "center" }} data-aos="fade-up">
          <span className="section-tag">Competitive Coding</span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
            marginTop: 12, marginBottom: 40,
          }}>
            LeetCode Stats
          </h2>
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            src="https://leetcard.jacoblin.cool/AmanSri3130?theme=dark&font=Karma&ext=heatmap"
            alt="LeetCode stats"
            style={{ borderRadius: 12, maxWidth: "100%", border: "1px solid rgba(34,211,238,0.15)" }}
          />
          <a
            href="https://leetcode.com/u/AmanSri3130/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ marginTop: 20, display: "inline-flex" }}
          >
            View LeetCode Profile →
          </a>
        </div>

        {/* ── ACHIEVEMENTS ───────────────────────────────── */}
        <div style={{ marginBottom: 100 }} data-aos="fade-up">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">Highlights</span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 12,
            }}>
              Achievements
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}>
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                whileHover={{ y: -6, rotateY: 5, scale: 1.02 }}
                className="glass gradient-border"
                style={{ padding: "32px 28px", borderRadius: 16 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  style={{
                    fontSize: "2rem", color: item.color,
                    marginBottom: 16,
                    filter: `drop-shadow(0 0 10px ${item.color}60)`,
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 style={{
                  fontSize: "1.1rem", fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  marginBottom: 10, color: "#000000",
                }}>
                  {item.title}
                </h3>
                <p style={{ color: "#171e19", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CERTIFICATIONS ─────────────────────────────── */}
        <div style={{ marginBottom: 100 }} data-aos="fade-up">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">Learning</span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 12,
            }}>
              Certifications
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass glass-hover"
                style={{ padding: "28px 24px", borderRadius: 14 }}
              >
                <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>{cert.icon}</div>
                <h3 style={{
                  fontSize: "1rem", fontWeight: 700,
                  marginBottom: 6, color: "#000000",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {cert.title}
                </h3>
                <p style={{ color: "#171e19", fontSize: "0.85rem", marginBottom: 18 }}>
                  {cert.issuer}
                </p>
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "8px 18px", fontSize: "0.82rem" }}
                >
                  View Certificate →
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── EXPERIENCE TIMELINE ────────────────────────── */}
        <div data-aos="fade-up">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-tag">Journey</span>
            <h2 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 12,
            }}>
              Experience
            </h2>
          </div>

          <div style={{ position: "relative", maxWidth: 750, margin: "0 auto" }}>
            {/* Timeline line */}
            <div style={{
              position: "absolute",
              left: "50%", top: 0, bottom: 0,
              width: 2, transform: "translateX(-50%)",
              background: "#000000",
              borderRadius: 1,
            }} />

            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.4), type: "spring", stiffness: 90, damping: 14 }}
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                  marginBottom: 48,
                  paddingLeft: i % 2 === 0 ? 0 : "52%",
                  paddingRight: i % 2 === 0 ? "52%" : 0,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: "absolute",
                  left: "50%", top: 20,
                  transform: "translateX(-50%)",
                  width: 18, height: 18, borderRadius: "50%",
                  background: exp.color,
                  border: "2px solid #000000",
                  boxShadow: "2px 2px 0px #000000",
                  zIndex: 2,
                }} />

                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="glass glass-hover"
                  style={{ padding: "24px 22px", borderRadius: 12, width: "100%" }}
                >
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    marginBottom: 8, color: exp.color,
                    fontSize: "0.82rem", fontWeight: 800,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                  }}>
                    <span style={{ fontSize: "1rem" }}>{exp.icon}</span>
                    {exp.year}
                  </div>
                  <h3 className="font-cabinet" style={{
                    fontSize: "1.15rem", fontWeight: 800,
                    marginBottom: 4, color: "#000000",
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{ color: exp.color, fontSize: "0.85rem", marginBottom: 10, fontWeight: 800 }}>
                    {exp.company}
                  </p>
                  <p style={{ color: "#171e19", fontSize: "0.88rem", lineHeight: 1.7, fontWeight: 500 }}>
                    {exp.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;