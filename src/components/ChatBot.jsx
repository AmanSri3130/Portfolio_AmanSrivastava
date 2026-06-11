import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";

const faqs = [
  {
    triggers: ["hello", "hi", "hey", "sup", "hlo", "greet"],
    answer: "👋 Hey there! I'm Aman's virtual assistant. Ask me anything about him — skills, projects, experience, or how to get in touch!",
  },
  {
    triggers: ["who", "about", "yourself", "aman", "introduce"],
    answer: "🧑‍💻 Aman Srivastava is a 4th-year B.Tech CS student passionate about React, Python, AI & Data Science. He builds modern, scalable web apps and intelligent systems.",
  },
  {
    triggers: ["skill", "tech", "stack", "know", "language", "technology"],
    answer: "⚡ Aman's core skills include:\n• Frontend: React, JavaScript, HTML/CSS, Tailwind\n• Backend: Node.js, Python, FastAPI\n• AI/ML: LangChain, Scikit-learn, NLP, Gemini\n• DB: MongoDB, SQL, Pandas\n• DevOps: Git, Docker, Linux",
  },
  {
    triggers: ["project", "built", "work", "portfolio", "app"],
    answer: "🚀 Some of Aman's top projects:\n• 📄 AI Resume Analyser & Interviewer (Full Stack with OpenCV & Gemini)\n• 🎬 Movie Recommender System (AI/ML)\n• 🤖 GenAI Chatbot (LangChain + Gemini)\n• 📰 DailyX News App (React)\n• 🏥 HitAyu Health Platform\n\nCheck the Projects page for more!",
  },
  {
    triggers: ["experience", "intern", "job", "work", "company"],
    answer: "💼 Aman has experience as a:\n• React Developer Intern (building dashboards, charts, auth)\n• AI/ML Projects Developer (NLP, LangChain integrations)\n• Open Source Contributor\n\nCheck the Experience section on the About page!",
  },
  {
    triggers: ["contact", "email", "phone", "touch", "hire", "social"],
    answer: "✉️ You can reach Aman at:\n• Email: amankinnie31@gmail.com\n• LinkedIn: linkedin.com/in/amansri3130\n• GitHub: github.com/AmanSri3130\n\nOr drop a message on the Contact page!",
  }
];

const getReply = (input) => {
  const cleanInput = input.toLowerCase().trim();
  for (const faq of faqs) {
    if (faq.triggers.some(t => cleanInput.includes(t))) {
      return faq.answer;
    }
  }
  return "🤖 I'm not sure about that one! Try asking about Aman's skills, projects, experience, or contact info. Or say hello!";
};

const TypingDots = () => (
  <div style={{ display: "flex", gap: 4, padding: "12px 16px", alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        style={{ width: 7, height: 7, borderRadius: "50%", background: "#000000" }}
      />
    ))}
  </div>
);

const ChatBot = () => {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I'm **Aman's AI Assistant**. Ask me anything about him — skills, projects, availability, or anything else!" },
  ]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [pulse, setPulse]       = useState(true);
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setPulse(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: getReply(msg) }]);
    }, 900 + Math.random() * 600);
  };

  const handleKey = (e) => { if (e.key === "Enter") send(); };

  const handleSuggestion = (text) => {
    send(text);
  };

  return (
    <>
      {/* ── FLOATING BUTTON ─────────────────────────── */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--cyan)",
          border: "2px solid #000000",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
          color: "var(--bg-primary)",
          boxShadow: "4px 4px 0px #000000",
          zIndex: 2000,
          transition: "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {open ? <FaTimes /> : <FaRobot />}
        {pulse && !open && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: "50%",
              border: "2px solid var(--cyan)",
            }}
          />
        )}
      </motion.button>

      {/* ── CHATBOX WINDOW ─────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: 96,
              right: 28,
              width: "360px",
              height: "500px",
              maxWidth: "calc(100vw - 56px)",
              background: "#ffffff",
              border: "2px solid #000000",
              borderRadius: "12px",
              boxShadow: "8px 8px 0px #000000",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 1999,
              fontFamily: "'Satoshi', sans-serif",
              color: "#000000",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                background: "#171e19",
                borderBottom: "2px solid #000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#ffffff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--cyan)",
                    border: "1.5px solid #000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--bg-primary)",
                  }}
                >
                  <FaRobot size={14} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      letterSpacing: "-0.02em",
                      color: "var(--cyan)",
                    }}
                  >
                    Aman's Assistant
                  </h3>
                  <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>Online & ready</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages body */}
            <div
              style={{
                flex: 1,
                padding: "20px",
                overflowY: "auto",
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  {msg.from === "bot" && (
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "var(--cyan)",
                        border: "1.5px solid #000000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        flexShrink: 0,
                        color: "var(--bg-primary)",
                      }}
                    >
                      <FaRobot />
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: msg.from === "user" ? "var(--cyan)" : "#ffffff",
                      border: "2px solid #000000",
                      color: msg.from === "user" ? "var(--bg-primary)" : "#000000",
                      fontSize: "0.85rem",
                      fontWeight: msg.from === "user" ? 600 : 500,
                      lineHeight: "1.4",
                      boxShadow: "2px 2px 0px #000000",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {msg.text}
                  </div>

                  {msg.from === "user" && (
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "var(--violet-light)",
                        border: "1.5px solid #000000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        color: "#000000",
                        flexShrink: 0,
                      }}
                    >
                      <FaUser />
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "var(--cyan)",
                      border: "1.5px solid #000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                    }}
                  >
                    <FaRobot color="#000000" />
                  </div>
                  <div
                    style={{
                      background: "#ffffff",
                      border: "2px solid #000000",
                      borderRadius: "8px",
                      boxShadow: "2px 2px 0px #000000",
                    }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions */}
            <div
              style={{
                padding: "8px 16px",
                background: "#ffffff",
                borderTop: "1px dashed #000000",
                display: "flex",
                gap: 8,
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              {["Skills ⚡", "Projects 🚀", "Experience 💼", "Contact ✉️"].map((sugg) => (
                <button
                  key={sugg}
                  onClick={() => handleSuggestion(sugg.replace(/[^\w]/g, "").toLowerCase())}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "2.5px solid #000000",
                    background: "#ffffff",
                    color: "#000000",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "2px 2px 0px #000000",
                    transition: "all 0.1s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(2px, 2px)";
                    e.currentTarget.style.boxShadow = "0px 0px 0px #000000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0px, 0px)";
                    e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
                  }}
                >
                  {sugg}
                </button>
              ))}
            </div>

            {/* Footer Input */}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "2px solid #000000",
                background: "#ffffff",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "6px",
                  background: "#ffffff",
                  border: "2px solid #000000",
                  color: "#000000",
                  outline: "none",
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: "0.85rem",
                  transition: "all 0.2s",
                  boxShadow: "2px 2px 0px #000000",
                }}
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => send()}
                disabled={!input.trim()}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "6px",
                  background: input.trim() ? "var(--cyan)" : "var(--violet-light)",
                  border: "2px solid #000000",
                  cursor: input.trim() ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: input.trim() ? "var(--bg-primary)" : "#000000",
                  fontSize: "0.9rem",
                  transition: "all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  flexShrink: 0,
                  boxShadow: input.trim() ? "2px 2px 0px #000000" : "none",
                }}
                onMouseEnter={(e) => {
                  if (input.trim()) {
                    e.currentTarget.style.transform = "translate(2px, 2px)";
                    e.currentTarget.style.boxShadow = "0px 0px 0px #000000";
                  }
                }}
                onMouseLeave={(e) => {
                  if (input.trim()) {
                    e.currentTarget.style.transform = "translate(0px, 0px)";
                    e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
                  }
                }}
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;