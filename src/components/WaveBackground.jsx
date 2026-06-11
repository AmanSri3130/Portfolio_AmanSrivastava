import React from 'react'


import { motion } from "framer-motion";

const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      <motion.div
        animate={{
          x: [0, -200, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[200%] h-[300px] bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur-[80px] top-40 rounded-full"
      />

      <motion.div
        animate={{
          x: [0, 200, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[200%] h-[300px] bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 blur-[80px] bottom-20 rounded-full"
      />

    </div>
  );
};

export default WaveBackground;