import React from 'react'

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

const skills = [
  "React",
  "JavaScript",
  "Python",
  "SQL",
  "Machine Learning",
  "HTML",
  "CSS",
];

const SkillSphere = () => {

  return (

    <div style={{ height: "400px" }}>

      <Canvas camera={{ position: [0, 0, 8] }}>

        <ambientLight intensity={1} />

        {skills.map((skill, i) => {

          const angle = (i / skills.length) * Math.PI * 2;

          const x = Math.cos(angle) * 3;
          const y = Math.sin(angle) * 3;

          return (

            <Html key={i} position={[x, y, 0]}>

              <div
                style={{
                  background: "rgba(34,211,238,0.2)",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  color: "cyan",
                  fontWeight: "bold",
                  backdropFilter: "blur(10px)",
                }}
              >
                {skill}
              </div>

            </Html>

          );

        })}

        <OrbitControls autoRotate />

      </Canvas>

    </div>

  );

};

export default SkillSphere;
