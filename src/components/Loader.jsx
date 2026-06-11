import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelTransition from "./PixelTransition";

const letters = "Aman Srivastava".split("");

const Loader = () => {
  const [phase, setPhase] = useState(0); // 0 = letters animating, 1 = tagline, 2 = fade out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "var(--bg-primary)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Pixel Transition featuring cute miniature cat and Hellowwww */}
          <PixelTransition
            firstContent={
              <img
                src="/cute-cat.png"
                alt="Miniature cat"
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
              />
            }
            secondContent={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "var(--cyan)",
                  color: "#000000",
                  fontFamily: "'Space Grotesk', sans-serif",
                  borderRadius: "12px",
                }}
              >
                <p style={{ fontWeight: 900, fontSize: "1.1rem", textAlign: "center", margin: 0 }}>Hellowwww! 🐾</p>
              </div>
            }
            gridSize={10}
            pixelColor="var(--cyan)"
            once={false}
            animationStepDuration={0.4}
            className="loader-cat-transition"
            style={{
              width: "130px",
              height: "130px",
              marginBottom: "24px",
              borderRadius: "14px",
              border: "2px solid #000000",
              backgroundColor: "#ffffff",
              boxShadow: "4px 4px 0px #000000",
            }}
          />
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 800,
                  fontFamily: "var(--font-display), sans-serif",
                  color: "var(--cyan)",
                  display: "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              width: 150,
              height: 2,
              background: "var(--border-card)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ x: [-150, 150] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{
                width: 50,
                height: "100%",
                background: "var(--cyan)",
                position: "absolute",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;