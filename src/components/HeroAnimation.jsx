import React from 'react'

import { motion } from "framer-motion";

const HeroAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Orb 1 */}
      <motion.div
        animate={{
          x: [0, 200, -200, 0],
          y: [0, -150, 150, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[500px] h-[500px] bg-cyan-500 opacity-20 rounded-full blur-[120px]"
      />

      {/* Orb 2 */}
      <motion.div
        animate={{
          x: [0, -250, 250, 0],
          y: [0, 200, -200, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-0 w-[500px] h-[500px] bg-purple-500 opacity-20 rounded-full blur-[120px]"
      />

      {/* Orb 3 */}
      <motion.div
        animate={{
          x: [0, 150, -150, 0],
          y: [0, 250, -250, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-[120px]"
      />

    </div>
  );
};

export default HeroAnimation;
