import React from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip
} from "recharts";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const data = [
  { skill: "React",    value: 88 },
  { skill: "Python",   value: 82 },
  { skill: "ML / AI",  value: 74 },
  { skill: "Node.js",  value: 70 },
  { skill: "SQL",      value: 72 },
  { skill: "DevOps",   value: 68 },
  { skill: "DSA",      value: 80 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: "rgba(5,11,24,0.95)",
        border: "1px solid rgba(34,211,238,0.25)",
        borderRadius: 10, padding: "8px 14px",
        fontSize: "0.85rem", color: "#f0f6ff",
      }}>
        <strong style={{ color: "#22d3ee" }}>{payload[0].payload.skill}</strong>
        <div style={{ color: "#a78bfa" }}>{payload[0].value}%</div>
      </div>
    );
  }
  return null;
};

const SkillRadar = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ width: "100%", height: 360 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data}>
          <PolarGrid
            stroke="rgba(255,255,255,0.08)"
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: "#94a3b8",
              fontSize: 12,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
            }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "#475569", fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="Aman"
            dataKey="value"
            stroke="#22d3ee"
            strokeWidth={2}
            fill="url(#radarGradient)"
            fillOpacity={0.35}
            animationBegin={200}
            animationDuration={1200}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#22d3ee" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.5} />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SkillRadar;
