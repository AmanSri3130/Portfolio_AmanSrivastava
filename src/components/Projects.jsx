import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Footer from "../pages/Footer";

const projectsData = [
  {
    title: "University Connect 🎓",
    category: "Full Stack",
    description:
      "A MERN-stack student super-platform that merges the best of Unstop, LinkedIn & Instagram — exclusively for university students. Features student profiles, academic networking, hackathon & event listings, project collaboration boards, a campus social feed, post sharing, achievement showcasing, and peer messaging. Think of it as the all-in-one student ecosystem.",
    image: "/projects/university.jpg",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT", "REST API"],
    features: [
      { icon: "🧑‍🎓", label: "Student Profiles" },
      { icon: "🏆", label: "Hackathon Board" },
      { icon: "🤝", label: "Networking" },
      { icon: "📸", label: "Social Feed" },
      { icon: "💬", label: "Peer Messaging" },
      { icon: "📌", label: "Project Collabs" },
    ],
    github: "https://github.com/AmanSri3130",
    demo: "#",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "AI Resume Analyser & Interviewer 🤖",
    category: "Full Stack",
    description:
      "An AI-driven platform for resume analysis, creation, and mock interviews. Features automated resume ATS scoring, interactive resume building templates, speech-to-text enabled AI mock interviews, face-to-face interview simulation with integrated OpenCV for candidate behavioral analysis, and secure user authentication via Google OAuth.",
    image: "/projects/quiz.jpg",
    tags: ["React", "Node.js", "Gemini API", "OpenCV", "Google OAuth", "Web Speech API", "MongoDB"],
    features: [
      { icon: "📄", label: "ATS Resume Analyser" },
      { icon: "🛠️", label: "Resume Builder" },
      { icon: "🎙️", label: "AI Interviewer (Speech-to-Text)" },
      { icon: "📷", label: "OpenCV Behavior Analysis" },
      { icon: "👥", label: "Face-to-Face Interview" },
      { icon: "🔑", label: "Google OAuth" },
    ],
    github: "https://github.com/AmanSri3130",
    demo: "#",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Movie Recommender System",
    category: "AI/ML",
    description:
      "AI-powered system recommending movies based on emotion and mood using NLP & collaborative filtering techniques.",
    image: "/projects/music.jpg",
    tags: ["Python", "ML", "NLP", "Pandas"],
    github: "https://github.com/AmanSri3130/Movie_recommendation_system",
    demo: "#",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "HitAyu 🌿 — Ayurvedic Wellness Platform",
    category: "Web",
    description:
      "A full-stack Ayurvedic wellness platform bridging ancient wisdom with modern technology. Features an AI-powered AyurChikitsak chatbot (Gemini 1.5 Flash), a searchable herb & plant database, Dosha personality quiz, personalised diet charts, Ayurvedic yoga guides, doctor listings, wellness courses, multi-language support, and a dark/light theme toggle.",
    image: "/projects/quiz.jpg",
    tags: ["JavaScript", "HTML/CSS", "Gemini API", "Tailwind", "REST API"],
    features: [
      { icon: "🤖", label: "AyurChikitsak Bot" },
      { icon: "🌿", label: "Herb Database" },
      { icon: "🧘", label: "Dosha Quiz" },
      { icon: "🧘‍♂️", label: "Yoga Guide" },
      { icon: "🥗", label: "Diet Chart" },
      { icon: "🌐", label: "Multi-language" },
      { icon: "🌙", label: "Theme Toggle" },
    ],
    github: "#",
    demo: "https://hitayux.netlify.app/",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "GenAI Chatbot",
    category: "AI/ML",
    description:
      "Built a GenAI chatbot using LangChain and Google Gemini for context-aware, intelligent responses with memory.",
    image: "/projects/university.jpg",
    tags: ["LangChain", "Gemini", "Python", "FastAPI"],
    github: "#",
    demo: "#",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "DailyX — News App",
    category: "Web",
    description:
      "A feature-rich news platform built with React that aggregates real-time headlines using the News API, with AI-powered article summarisation, voice command navigation, live cricket scores, and weather integration.",
    image: "/projects/quiz.jpg",
    tags: ["React", "News API", "AI", "Voice Control", "JavaScript", "CSS"],
    features: [
      { icon: "🤖", label: "AI Analysis" },
      { icon: "🎙️", label: "Voice Control" },
      { icon: "🏏", label: "Live Cricket" },
      { icon: "🌤️", label: "Weather" },
      { icon: "📰", label: "News API" },
    ],
    github: "https://github.com/AmanSri3130",
    demo: "#",
    gradient: "from-sky-500 to-indigo-600",
  },
  {
    title: "React Portfolio v2",
    category: "Web",
    description:
      "This very portfolio! Built with React, Framer Motion, Three.js and GSAP for a premium animated experience.",
    image: "/projects/university.jpg",
    tags: ["React", "Framer Motion", "Three.js", "GSAP"],
    github: "https://github.com/AmanSri3130",
    demo: "#",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "AI Data Analytics & ML Pipeline Platform 📊",
    category: "AI/ML",
    description:
      "An end-to-end AI-powered data analytics, interactive visualization, and ML pipeline development platform. Features automated EDA (Exploratory Data Analysis), dynamic chart generation using D3.js and Recharts, no-code model training pipelines, and real-time evaluation dashboard metrics.",
    image: "/projects/music.jpg",
    tags: ["React", "Python", "FastAPI", "D3.js", "Scikit-Learn", "Pandas"],
    features: [
      { icon: "🤖", label: "AI Insights & EDA" },
      { icon: "⚙️", label: "ML Pipeline Builder" },
      { icon: "📊", label: "Interactive Visuals" },
      { icon: "📈", label: "Model Evaluation" },
    ],
    github: "#",
    demo: "#",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Text To SQL Query Generator ",
    category: "Web",
    description:
      "A ReactJS based platform integrated with LLAM 3.5 to generate SQL queries from natural language inputs. A GenAI , AI driven project.",
    image: "/projects/music.jpg",
    tags: ["React", "LLAM 3.5", "REST API"],
    github: "#",
    demo: "#",
    gradient: "from-amber-500 to-orange-600",
  },
];

const categories = ["All", "Full Stack", "Web", "AI/ML"];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit:   { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

const Projects = ({ standalone }) => {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <main>
      <section style={{ padding: standalone ? "120px 24px 80px" : "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }} data-aos="fade-up">
            <span className="section-tag">Portfolio</span>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 12, marginBottom: 16,
            }}>
              My{" "}
              <span style={{
                background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Projects
              </span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              A collection of projects showcasing my skills in AI, ML, and modern web development.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            style={{
              display: "flex", justifyContent: "center",
              gap: 8, marginBottom: 48,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: 6,
              width: "fit-content",
              margin: "0 auto 48px",
            }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "9px 22px",
                  borderRadius: 6,
                  border: "2px solid #000000",
                  cursor: "pointer",
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  transition: "all 0.15s ease",
                  background: filter === cat ? "var(--cyan)" : "#ffffff",
                  color: filter === cat ? "var(--bg-primary)" : "#000000",
                  boxShadow: filter === cat ? "2px 2px 0px #000000" : "none",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  transition={{ delay: index * 0.06 }}
                >
                  <Tilt
                    glareEnable
                    glareMaxOpacity={0.1}
                    glareColor="#22d3ee"
                    scale={1.02}
                    tiltMaxAngleX={6}
                    tiltMaxAngleY={6}
                    style={{ borderRadius: 16 }}
                  >
                    <div
                      className="glass glass-hover"
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                        position: "relative",
                        height: "100%",
                      }}
                    >
                      {/* Image with overlay */}
                      <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: "100%", height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                        />
                        {/* Gradient overlay */}
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to top, rgba(5,11,24,0.95) 0%, rgba(5,11,24,0.3) 60%, transparent 100%)",
                        }} />
                        {/* Top tag */}
                        <div style={{ position: "absolute", top: 12, right: 12 }}>
                          <span style={{
                            padding: "4px 10px",
                            borderRadius: "4px",
                            border: "2px solid #000000",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            background: "var(--cyan)",
                            color: "var(--bg-primary)",
                            boxShadow: "2px 2px 0px #000000",
                          }}>
                            {project.category}
                          </span>
                        </div>
                        {/* Hover links overlay */}
                        <div className="project-overlay" style={{
                          position: "absolute", inset: 0,
                          background: "rgba(5,11,24,0.85)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          gap: 20, opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                          onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                          onMouseLeave={e => e.currentTarget.style.opacity = "0"}
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex", alignItems: "center", gap: 8,
                              padding: "10px 20px",
                              background: "rgba(255,255,255,0.1)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: 8, color: "#fff",
                              fontSize: "0.88rem", fontWeight: 600,
                              textDecoration: "none", transition: "all 0.2s",
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = "rgba(34,211,238,0.2)";
                              e.currentTarget.style.borderColor = "#22d3ee";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                            }}
                          >
                            <FaGithub /> Code
                          </a>
                          {project.demo !== "#" && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "10px 20px",
                                background: "linear-gradient(135deg, #22d3ee, #7c3aed)",
                                border: "none",
                                borderRadius: 8, color: "#fff",
                                fontSize: "0.88rem", fontWeight: 600,
                                textDecoration: "none",
                              }}
                            >
                              <FiExternalLink /> Live Demo
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div style={{ padding: "20px 24px 24px" }}>
                        <h3 style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          fontFamily: "'Space Grotesk', sans-serif",
                          marginBottom: 10,
                          color: "#000000",
                        }}>
                          {project.title}
                        </h3>
                        <p style={{
                          color: "#171e19",
                          fontSize: "0.88rem",
                          lineHeight: 1.65,
                          marginBottom: 16,
                        }}>
                          {project.description}
                        </p>
                        {/* Feature badges (shown only when project has features) */}
                        {project.features && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                            {project.features.map((f) => (
                              <span
                                key={f.label}
                                style={{
                                  display: "inline-flex", alignItems: "center", gap: 4,
                                  padding: "3px 10px",
                                  borderRadius: "4px",
                                  fontSize: "0.71rem",
                                  fontWeight: 800,
                                  background: "var(--violet-light)",
                                  border: "1.5px solid #000000",
                                  color: "#000000",
                                  letterSpacing: "0.02em",
                                  boxShadow: "1.5px 1.5px 0px #000000",
                                }}
                              >
                                {f.icon} {f.label}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Tech tags */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                padding: "4px 10px",
                                borderRadius: "4px",
                                border: "1.5px solid #000000",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                background: "#ffffff",
                                color: "#000000",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {standalone && <Footer />}
    </main>
  );
};

export default Projects;