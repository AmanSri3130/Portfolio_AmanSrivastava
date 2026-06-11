import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaExpand, FaCompress } from "react-icons/fa";

const ResumeModal = ({ onClose }) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: fullscreen ? 0 : "20px",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1,    opacity: 1, y: 0 }}
        exit={{    scale: 0.88, opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width:  fullscreen ? "100vw"  : "min(900px, 100%)",
          height: fullscreen ? "100vh"  : "min(90vh, 700px)",
          borderRadius: fullscreen ? 0 : 12,
          overflow: "hidden",
          display: "flex", flexDirection: "column",
          background: "#ffffff",
          border: fullscreen ? "none" : "2px solid #000000",
          boxShadow: fullscreen ? "none" : "8px 8px 0px #000000",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "14px 20px",
          borderBottom: "2px solid #000000",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "var(--cyan)",
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 800, fontSize: "1rem",
            color: "var(--bg-primary)",
          }}>
            📄 Aman Srivastava — Resume
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href="/resume.pdf"
              download
              title="Download"
              style={{
                width: 34, height: 34, borderRadius: 6,
                background: "#ffffff",
                border: "2px solid #000000",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#000000", textDecoration: "none", fontSize: "0.85rem",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: "2px 2px 0px #000000",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translate(1px, 1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translate(0px, 0px)"}
            >
              <FaDownload />
            </a>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
              style={{
                width: 34, height: 34, borderRadius: 6,
                background: "#ffffff",
                border: "2px solid #000000",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#000000", cursor: "pointer", fontSize: "0.85rem",
                transition: "all 0.2s",
                boxShadow: "2px 2px 0px #000000",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translate(1px, 1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translate(0px, 0px)"}
            >
              {fullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            <button
              onClick={onClose}
              title="Close"
              style={{
                width: 34, height: 34, borderRadius: 6,
                background: "#f87171",
                border: "2px solid #000000",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#000000", cursor: "pointer", fontSize: "0.85rem",
                transition: "all 0.2s",
                boxShadow: "2px 2px 0px #000000",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translate(1px, 1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translate(0px, 0px)"}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div style={{ flex: 1, background: "#ffffff", position: "relative" }}>
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
            title="Aman Srivastava Resume"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
          {/* Fallback message */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            color: "#171e19",
            pointerEvents: "none", zIndex: -1,
            gap: 12,
          }}>
            <div style={{ fontSize: "2.5rem" }}>📄</div>
            <p style={{ fontSize: "0.9rem", fontWeight: 700 }}>Loading resume...</p>
            <a
              href="/resume.pdf"
              download
              style={{
                pointerEvents: "all",
                color: "#000000", fontSize: "0.85rem",
                textDecoration: "underline",
                fontWeight: 800,
              }}
            >
              Click here to download instead
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeModal;