import React from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Stars } from "@react-three/drei";
import { useRef } from "react";

const skills = [
  // Frontend
  { label: "React",           color: "#22d3ee", bg: "rgba(34,211,238,0.12)",  border: "rgba(34,211,238,0.3)"  },
  { label: "JavaScript",      color: "#facc15", bg: "rgba(250,204,21,0.12)",  border: "rgba(250,204,21,0.3)"  },
  { label: "HTML / CSS",      color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.3)"  },
  { label: "Tailwind CSS",    color: "#67e8f9", bg: "rgba(103,232,249,0.12)", border: "rgba(103,232,249,0.3)" },

  // Backend
  { label: "Node.js",         color: "#86efac", bg: "rgba(134,239,172,0.12)", border: "rgba(134,239,172,0.3)" },
  { label: "Python",          color: "#4ade80", bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.3)"  },
  { label: "FastAPI",         color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.3)"  },

  // AI / ML
  { label: "Machine Learning",color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
  { label: "Deep Learning",   color: "#c084fc", bg: "rgba(192,132,252,0.12)", border: "rgba(192,132,252,0.3)" },
  { label: "LangChain",       color: "#e879f9", bg: "rgba(232,121,249,0.12)", border: "rgba(232,121,249,0.3)" },
  { label: "Scikit-learn",    color: "#f472b6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.3)" },
  { label: "NLP",             color: "#fb7185", bg: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.3)" },

  // Data & DB
  { label: "SQL",             color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.3)"  },
  { label: "MongoDB",         color: "#6ee7b7", bg: "rgba(110,231,183,0.12)", border: "rgba(110,231,183,0.3)" },
  { label: "Pandas",          color: "#93c5fd", bg: "rgba(147,197,253,0.12)", border: "rgba(147,197,253,0.3)" },

  // DevOps
  { label: "Git",             color: "#fca5a5", bg: "rgba(252,165,165,0.12)", border: "rgba(252,165,165,0.3)" },
  { label: "Docker",          color: "#38bdf8", bg: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.3)"  },
  { label: "Linux",           color: "#fde68a", bg: "rgba(253,230,138,0.12)", border: "rgba(253,230,138,0.3)" },
];

function Globe() {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.0015;
  });

  return (
    <group ref={group}>
      {skills.map((skill, i) => {
        const phi   = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;

        const r = 3.4;
        const x = r * Math.cos(theta) * Math.sin(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(phi);

        return (
          <Float key={i} speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
            <Html position={[x, y, z]} center>
              <div
                style={{
                  padding: "5px 12px",
                  background: "#ffffff",
                  borderRadius: "4px",
                  border: "2px solid #000000",
                  color: "#000000",
                  fontWeight: 900,
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  fontFamily: "'Satoshi', sans-serif",
                  letterSpacing: "0.02em",
                  boxShadow: "2px 2px 0px #000000",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = skill.color;
                  e.currentTarget.style.transform = "translate(-2px, -2px) scale(1.08)";
                  e.currentTarget.style.boxShadow = "4px 4px 0px #000000";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.transform = "translate(0px, 0px) scale(1)";
                  e.currentTarget.style.boxShadow = "2px 2px 0px #000000";
                }}
              >
                {skill.label}
              </div>
            </Html>
          </Float>
        );
      })}
    </group>
  );
}

const SkillGlobe = () => {
  return (
    <div style={{ height: "520px", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 60 }}>
        <Stars
          radius={80}
          depth={60}
          count={3000}
          factor={3}
          fade
          saturation={0.3}
        />
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#7c3aed" />
        <Globe />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default SkillGlobe;