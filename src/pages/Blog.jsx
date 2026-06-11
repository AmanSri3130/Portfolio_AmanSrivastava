import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";

const posts = [
  {
    id: 1,
    title: "Getting Started with React Hooks in 2025",
    category: "React",
    date: "May 10, 2025",
    readTime: "5 min read",
    excerpt:
      "A deep dive into useState, useEffect, useRef and custom hooks — and how they change the way you think about React components.",
    emoji: "⚛️",
    color: "#22d3ee",
    tags: ["React", "JavaScript", "Hooks"],
  },
  {
    id: 2,
    title: "Building a GenAI Chatbot with LangChain & Gemini",
    category: "AI/ML",
    date: "Apr 22, 2025",
    readTime: "8 min read",
    excerpt:
      "Step-by-step guide to building an intelligent chatbot with memory using Google Gemini Pro and LangChain's conversation chain.",
    emoji: "🤖",
    color: "#a78bfa",
    tags: ["LangChain", "Gemini", "Python"],
  },
  {
    id: 3,
    title: "Top 10 DSA Patterns Every Developer Must Know",
    category: "DSA",
    date: "Apr 5, 2025",
    readTime: "6 min read",
    excerpt:
      "Sliding window, two pointers, fast & slow, merge intervals — the core patterns that unlock 80% of LeetCode problems.",
    emoji: "🧩",
    color: "#facc15",
    tags: ["DSA", "Algorithms", "LeetCode"],
  },
  {
    id: 4,
    title: "Framer Motion: Animations That Feel Premium",
    category: "React",
    date: "Mar 18, 2025",
    readTime: "7 min read",
    excerpt:
      "How to use layoutId, AnimatePresence, scroll-triggered animations, and spring physics to make your React apps feel alive.",
    emoji: "✨",
    color: "#ec4899",
    tags: ["Framer Motion", "React", "CSS"],
  },
  {
    id: 5,
    title: "Python for ML: From Pandas to Scikit-learn",
    category: "AI/ML",
    date: "Feb 28, 2025",
    readTime: "9 min read",
    excerpt:
      "End-to-end ML pipeline: data wrangling with Pandas, EDA, preprocessing, model training and evaluation with Scikit-learn.",
    emoji: "🐍",
    color: "#4ade80",
    tags: ["Python", "ML", "Scikit-learn"],
  },
  {
    id: 6,
    title: "Docker for Developers: A Practical Guide",
    category: "DevOps",
    date: "Jan 14, 2025",
    readTime: "6 min read",
    excerpt:
      "Containers, images, volumes, and compose — everything you need to Dockerize your React + Node.js fullstack app.",
    emoji: "🐳",
    color: "#38bdf8",
    tags: ["Docker", "DevOps", "Node.js"],
  },
];

const categories = ["All", "React", "AI/ML", "DSA", "DevOps"];

const Blog = () => {
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");

  const filtered = posts.filter((p) => {
    const matchCat    = filter === "All" || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <main>
      <section style={{ padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 60 }} data-aos="fade-up">
            <span className="section-tag">✍️ Writing</span>
            <h1 style={{
              fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              marginTop: 16, marginBottom: 16,
              background: "linear-gradient(135deg, #22d3ee, #a78bfa, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Blog & Articles
            </h1>
            <p style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
              Thoughts on React, AI/ML, DSA and modern dev practices. Written by Aman.
            </p>
          </div>

          {/* Search */}
          <div data-aos="fade-up" style={{ maxWidth: 500, margin: "0 auto 36px" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍  Search articles..."
              className="input-field"
              style={{ textAlign: "center" }}
            />
          </div>

          {/* Filter tabs */}
          <div
            data-aos="fade-up"
            style={{
              display: "flex", justifyContent: "center",
              gap: 8, marginBottom: 52,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: 5,
              width: "fit-content", margin: "0 auto 52px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "9px 22px",
                  borderRadius: 0,
                  border: "2px solid #000000",
                  cursor: "pointer",
                  fontFamily: "'Space Mono', monospace",
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

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>📭</div>
                <p>No articles found. Try a different search or category.</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: 28,
                }}
              >
                {filtered.map((post, i) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                    whileHover={{ y: -6 }}
                    className="glass glass-hover"
                    style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
                  >
                    {/* Top accent bar */}
                    <div style={{
                      height: 4,
                      background: `linear-gradient(90deg, ${post.color}, transparent)`,
                    }} />

                    <div style={{ padding: "24px 24px 28px" }}>
                      {/* Emoji + category */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <span style={{ fontSize: "2rem" }}>{post.emoji}</span>
                        <span style={{
                          padding: "3px 10px", borderRadius: 4,
                          background: post.color,
                          border: "1.5px solid #000000",
                          color: "#000000", fontSize: "0.72rem", fontWeight: 800,
                          letterSpacing: "0.04em",
                          boxShadow: "2px 2px 0px #000000",
                        }}>
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 style={{
                        fontSize: "1.08rem", fontWeight: 700,
                        fontFamily: "'Space Grotesk',sans-serif",
                        marginBottom: 10, lineHeight: 1.4,
                        color: "#000000",
                      }}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p style={{
                        color: "#171e19", fontSize: "0.86rem",
                        lineHeight: 1.7, marginBottom: 18,
                      }}>
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                        {post.tags.map((tag) => (
                          <span key={tag} style={{
                            padding: "4px 10px", borderRadius: 4,
                            background: "#ffffff",
                            border: "1px solid #000000",
                            color: "#000000", fontSize: "0.72rem", fontWeight: 800,
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta */}
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        borderTop: "1.5px solid #000000",
                        paddingTop: 14,
                      }}>
                        <span style={{ color: "#5e6a66", fontSize: "0.76rem", fontWeight: 700 }}>{post.date}</span>
                        <span style={{
                          display: "flex", alignItems: "center", gap: 5,
                          color: "#5e6a66", fontSize: "0.78rem", fontWeight: 800,
                        }}>
                          ⏱ {post.readTime}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            data-aos="fade-up"
            style={{
              textAlign: "center", marginTop: 72,
              padding: "48px 32px",
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(124,58,237,0.06))",
              border: "1px solid rgba(34,211,238,0.1)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📬</div>
            <h3 style={{
              fontSize: "1.4rem", fontWeight: 700,
              fontFamily: "'Space Grotesk',sans-serif",
              marginBottom: 10,
            }}>
              Want to discuss something?
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.7 }}>
              Have a topic you'd like me to write about, or want to collaborate on an article?
            </p>
            <a href="/contact" className="btn-primary shimmer-btn">
              Get in Touch →
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blog;