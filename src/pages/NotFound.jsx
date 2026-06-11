import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaRocket, FaHome, FaSatellite } from "react-icons/fa";

const NotFound = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "40px 24px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Animated stars */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0],
            scale:   [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          style={{
            position: "absolute",
            left:  `${Math.random() * 100}%`,
            top:   `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            borderRadius: "50%",
            background: "#fff",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Glow blob */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: "absolute",
          width: 300, height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--cyan) 0%, transparent 70%)",
          filter: "blur(40px)",
          top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          maxWidth: 500,
        }}
      >
        <div style={{ fontSize: "6rem", marginBottom: 20 }}>
          <FaRocket style={{ color: "var(--cyan)" }} />
        </div>
        <h1 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: "4rem", fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: "1",
          margin: "0 0 16px 0",
          color: "var(--text-primary)",
        }}>
          404
        </h1>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: "2rem", fontWeight: 700,
          margin: "0 0 20px 0",
          color: "var(--text-primary)",
        }}>
          Lost in Space
        </h2>
        <p style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "1.05rem", fontWeight: 500,
          lineHeight: "1.6",
          margin: "0 0 32px 0",
          color: "var(--text-primary)",
          opacity: 0.8,
        }}>
          The page you are looking for has vanished into the dark void. Let's get you back home!
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary shimmer-btn"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "13px 28px", fontSize: "0.95rem",
              }}
            >
              <FaHome /> Back to Home
            </motion.button>
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 26px", fontSize: "0.95rem",
              }}
            >
              <FaSatellite /> Contact Me
            </motion.button>
          </Link>
        </div>

        {/* Animated orbit around rocket */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: 120, height: 120,
            borderRadius: "50%",
            border: "1.5px dashed rgba(34,211,238,0.2)",
            top: "35%", left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          <div style={{
            position: "absolute", top: -6, left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.8rem",
          }}>
            ⭐
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;