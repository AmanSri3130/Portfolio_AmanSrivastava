import React from 'react'

import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* moving gradient blob 1 */}
      <motion.div
        animate={{
          x: [0, 200, -200, 0],
          y: [0, -200, 200, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="absolute w-[600px] h-[600px] bg-cyan-500 opacity-20 rounded-full blur-[120px]"
      />

      {/* moving gradient blob 2 */}
      <motion.div
        animate={{
          x: [0, -300, 300, 0],
          y: [0, 200, -200, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
        }}
        className="absolute right-0 w-[600px] h-[600px] bg-purple-500 opacity-20 rounded-full blur-[120px]"
      />

      {/* grid effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg,#22d3ee 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

    </div>
  );
};

export default HeroBackground;