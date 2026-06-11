import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const shortcuts = [
  { key: "H", label: "Go to Home",     path: "/" },
  { key: "A", label: "Go to About",    path: "/about" },
  { key: "P", label: "Go to Projects", path: "/projects" },
  { key: "C", label: "Go to Contact",  path: "/contact" },
  { key: "?", label: "Toggle Shortcuts",path: null },
  { key: "ESC", label: "Close this menu", path: null },
];

const KeyboardShortcuts = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        setVisible((v) => !v);
      } else if (e.key === "Escape") {
        setVisible(false);
      } else if (!visible) {
        const link = shortcuts.find(
          (s) => s.key === e.key.toUpperCase() && s.path
        );
        if (link) {
          window.location.href = link.path;
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible]);

  return (
    <>
      {/* Hint badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
        onClick={() => setVisible(true)}
        style={{
          position: "fixed", bottom: 28, left: 28,
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 13px",
          borderRadius: 8,
          background: "rgba(5,11,24,0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "var(--text-muted)",
          fontSize: "0.74rem",
          cursor: "pointer",
          zIndex: 1500,
          transition: "all 0.2s",
          userSelect: "none",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "rgba(34,211,238,0.25)";
          e.currentTarget.style.color = "#94a3b8";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.color = "var(--text-muted)";
        }}
      >
        <kbd style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 4, padding: "1px 6px",
          fontSize: "0.7rem", fontFamily: "monospace",
          color: "#94a3b8",
        }}>
          ?
        </kbd>
        Keyboard shortcuts
      </motion.div>

      {/* Overlay */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 4000,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={() => setVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1,   opacity: 1, y: 0 }}
              exit={{    scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "rgba(5,11,24,0.98)",
                border: "1px solid rgba(34,211,238,0.15)",
                borderRadius: 20,
                padding: "28px 32px",
                width: "min(480px, 90vw)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(34,211,238,0.06)",
              }}
            >
              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 24,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "linear-gradient(135deg,rgba(34,211,238,0.15),rgba(124,58,237,0.15))",
                  border: "1px solid rgba(34,211,238,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem",
                }}>
                  ⌨️
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 700, fontSize: "1.1rem",
                  }}>
                    Keyboard Shortcuts
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                    Navigate the portfolio without clicking
                  </div>
                </div>
              </div>

              {/* Shortcuts list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {shortcuts.map((s) => (
                  <div
                    key={s.key}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                      {s.label}
                    </span>
                    <kbd style={{
                      background: "rgba(34,211,238,0.08)",
                      border: "1px solid rgba(34,211,238,0.2)",
                      borderRadius: 6,
                      padding: "3px 10px",
                      fontFamily: "monospace",
                      fontSize: "0.82rem",
                      color: "#22d3ee",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}>
                      {s.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <p style={{
                color: "var(--text-muted)", fontSize: "0.75rem",
                textAlign: "center", marginTop: 20,
              }}>
                Press <kbd style={{ fontFamily: "monospace", color: "#22d3ee" }}>ESC</kbd> or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
