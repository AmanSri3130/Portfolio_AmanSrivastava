import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const stats = [
  { value: 10,  suffix: "+", label: "Projects Built",       icon: "🚀" },
  { value: 300, suffix: "+", label: "Problems Solved",       icon: "🧩" },
  { value: 5,   suffix: "+", label: "Technologies Mastered", icon: "⚡" },
  { value: 1,   suffix: "",  label: "Years of Experience",   icon: "🎯" },
];

const StatsCounter = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} style={{ padding: "60px 20px" }}>
      <div style={{
        maxWidth: 1000,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 24,
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
            className="glass glass-hover gradient-border"
            style={{
              padding: "32px 24px",
              textAlign: "center",
              cursor: "default",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>{stat.icon}</div>
            <div style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#000000",
              lineHeight: 1,
            }}>
              {inView ? (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2}
                  delay={i * 0.12}
                  suffix={stat.suffix}
                />
              ) : (
                `0${stat.suffix}`
              )}
            </div>
            <div style={{
              color: "#171e19",
              fontSize: "0.88rem",
              marginTop: 8,
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
