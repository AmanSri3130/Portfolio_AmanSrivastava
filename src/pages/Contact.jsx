import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt,
  FaPaperPlane, FaCheckCircle, FaCopy, FaCheck,
} from "react-icons/fa";
import confetti from "canvas-confetti";
import Footer from "./Footer";
import CreepyButton from "../components/CreepyButton";

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "amankinnie31@gmail.com",
    href: "mailto:amankinnie31@gmail.com",
    color: "#ec4899",
    copyable: true,
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    value: "github.com/AmanSri3130",
    href: "https://github.com/AmanSri3130",
    color: "#e2e8f0",
    copyable: false,
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    value: "in/amansri3130",
    href: "https://www.linkedin.com/in/amansri3130",
    color: "#60a5fa",
    copyable: false,
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "India 🇮🇳",
    href: null,
    color: "#4ade80",
    copyable: false,
  },
];

const fireConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ["#22d3ee", "#a78bfa", "#ec4899", "#facc15"],
  });
};

const Contact = () => {
  const form = useRef();
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const [errors, setErrors]   = useState({});
  const [copied, setCopied]   = useState(false);

  const validate = (data) => {
    const errs = {};
    if (!data.user_name?.trim())  errs.user_name  = "Name is required";
    if (!data.user_email?.trim()) errs.user_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.user_email)) errs.user_email = "Invalid email";
    if (!data.message?.trim())    errs.message    = "Message is required";
    return errs;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form.current));
    const errs = validate(formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");

    const sendPromise = emailjs.sendForm(
      "service_pczzq44",
      "template_e28wr1f",
      form.current,
      "ZnKrzrVXOSM4x0YJf"
    );

    toast.promise(sendPromise, {
      loading: "Sending your message...",
      success: "Message sent! I'll reply soon 🚀",
      error:   "Something went wrong. Try again!",
    });

    try {
      await sendPromise;
      setStatus("success");
      fireConfetti();
      form.current.reset();
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("amankinnie31@gmail.com");
      setCopied(true);
      toast.success("Email copied to clipboard! 📋");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Couldn't copy. Please copy manually.");
    }
  };

  return (
    <main>
      <section style={{
        minHeight: "100vh",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background blobs */}
        <motion.div
          animate={{ x: [0,100,-100,0], y: [0,-80,80,0] }}
          transition={{ duration: 18, repeat: Infinity }}
          style={{
            position: "absolute", top: "10%", left: "5%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ x: [0,-100,100,0], y: [0,80,-80,0] }}
          transition={{ duration: 22, repeat: Infinity }}
          style={{
            position: "absolute", bottom: "10%", right: "5%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 72 }} data-aos="fade-up">
            <span className="section-tag" style={{ backgroundColor: "#ffffff" }}>Let's Talk</span>
            <h1 className="font-cabinet" style={{
              fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
              fontWeight: 900,
              marginTop: 16, marginBottom: 16,
              color: "var(--text-primary)"
            }}>
              Get In Touch
            </h1>
            <p className="font-satoshi" style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontWeight: 700 }}>
              Have a project in mind, want to collaborate, or just want to say hi?
              I'd love to hear from you!
            </p>
          </div>

          {/* Two-column layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 40,
          }}>

            {/* ── LEFT: Contact Info ──────────────────── */}
            <div data-aos="fade-right" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <h2 className="font-cabinet" style={{
                  fontSize: "1.6rem", fontWeight: 900,
                  marginBottom: 8, color: "var(--text-primary)"
                }}>
                  Let's connect 🤝
                </h2>
                <p className="font-satoshi" style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", fontWeight: 700 }}>
                  I'm currently available for freelance work and open to full-time opportunities.
                  Drop me a message and I'll reply quickly!
                </p>
              </div>

              {/* Contact cards */}
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="glass glass-hover"
                  style={{ padding: "16px 20px", borderRadius: 12 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, flex: 1 }}
                      >
                        <div style={{
                          width: 42, height: 42, borderRadius: 10,
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "1rem", color: item.color, flexShrink: 0,
                        }}>
                          {item.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "#303c37", fontSize: "0.73rem", marginBottom: 2 }}>
                            {item.label}
                          </div>
                          <div style={{ color: "#000000", fontSize: "0.88rem", fontWeight: 600 }}>
                            {item.value}
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: 10,
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "1rem", color: item.color, flexShrink: 0,
                        }}>
                          {item.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "#303c37", fontSize: "0.73rem", marginBottom: 2 }}>{item.label}</div>
                          <div style={{ color: "#000000", fontSize: "0.88rem", fontWeight: 600 }}>{item.value}</div>
                        </div>
                      </div>
                    )}

                    {/* Copy button for email */}
                    {item.copyable && (
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={copyEmail}
                        title="Copy email"
                        style={{
                          width: 34, height: 34, borderRadius: 6,
                          border: "1.5px solid #000000",
                          background: copied ? "#86efac" : "#ffffff",
                          cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#000000",
                          boxShadow: "2px 2px 0px #000000",
                          fontSize: "0.85rem",
                          transition: "all 0.2s",
                          flexShrink: 0,
                        }}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={copied ? "check" : "copy"}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1,   opacity: 1 }}
                            exit={{    scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            {copied ? <FaCheck /> : <FaCopy />}
                          </motion.div>
                        </AnimatePresence>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Availability badge */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="glass border-nb"
                style={{
                  padding: "14px 18px", borderRadius: 12,
                  display: "flex", alignItems: "center", gap: 12,
                }}
              >
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: 9, height: 9, borderRadius: "50%",
                    background: "#28c840",
                    boxShadow: "0 0 10px #28c840",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "#000000", fontWeight: 800, fontSize: "0.88rem" }}>
                  Available for new opportunities
                </span>
              </motion.div>
            </div>

            {/* ── RIGHT: Contact Form ─────────────────── */}
            <motion.div
              data-aos="fade-left"
              className="glass"
              style={{ padding: "38px 34px", borderRadius: 16 }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      gap: 20, textAlign: "center", minHeight: 360,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1,1.15,1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ fontSize: "4rem", color: "#4ade80" }}
                    >
                      <FaCheckCircle />
                    </motion.div>
                    <h3 style={{
                      fontSize: "1.6rem", fontWeight: 700,
                      fontFamily: "'Space Grotesk',sans-serif",
                      color: "#4ade80",
                    }}>
                      Message Sent! 🚀
                    </h3>
                    <p style={{ color: "#171e19", lineHeight: 1.7 }}>
                      Thanks for reaching out! I'll get back to you as soon as possible.
                    </p>
                    <CreepyButton
                      onClick={() => setStatus("idle")}
                      variant="outline"
                      style={{ borderColor: "#4ade80" }}
                      coverClassName="text-[#4ade80]"
                    >
                      Send Another Message
                    </CreepyButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={form}
                    onSubmit={sendEmail}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: "flex", flexDirection: "column", gap: 18 }}
                  >
                    <h2 style={{
                      fontSize: "1.35rem", fontWeight: 700,
                      fontFamily: "'Space Grotesk',sans-serif",
                      marginBottom: 4,
                      color: "#000000",
                    }}>
                      Send a Message ✉️
                    </h2>

                    {/* Name */}
                    <div>
                      <input type="text" name="user_name" placeholder="Your Name" className="input-field"
                        style={errors.user_name ? { borderColor: "#f87171" } : {}} />
                      {errors.user_name && <p style={{ color:"#f87171", fontSize:"0.76rem", marginTop:4 }}>{errors.user_name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <input type="email" name="user_email" placeholder="Your Email" className="input-field"
                        style={errors.user_email ? { borderColor: "#f87171" } : {}} />
                      {errors.user_email && <p style={{ color:"#f87171", fontSize:"0.76rem", marginTop:4 }}>{errors.user_email}</p>}
                    </div>

                    {/* Subject */}
                    <input type="text" name="subject" placeholder="Subject (optional)" className="input-field" />

                    {/* Message */}
                    <div>
                      <textarea name="message" rows={5} placeholder="Your Message..." className="input-field"
                        style={{ resize:"vertical", ...(errors.message ? { borderColor:"#f87171" } : {}) }} />
                      {errors.message && <p style={{ color:"#f87171", fontSize:"0.76rem", marginTop:4 }}>{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <CreepyButton
                      type="submit"
                      disabled={status === "sending"}
                      variant="primary"
                      className="w-full"
                      coverClassName="flex items-center justify-center gap-2 w-full"
                    >
                      {status === "sending" ? (
                        <>
                          <span style={{
                            display: "inline-block", width: 16, height: 16,
                            borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTopColor: "#fff",
                            animation: "spin-slow 0.8s linear infinite",
                          }} />
                          Sending...
                        </>
                      ) : (
                        <><FaPaperPlane /> Send Message</>
                      )}
                    </CreepyButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;