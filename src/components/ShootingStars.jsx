import React from 'react'

import { motion } from "framer-motion";

const ShootingStars = () => {
  return (

    <div className="absolute inset-0 pointer-events-none">

      {[...Array(5)].map((_, i) => (

        <motion.div
          key={i}

          initial={{
            x:-200,
            y:Math.random()*400
          }}

          animate={{
            x:1200,
            y:Math.random()*400
          }}

          transition={{
            duration:3,
            repeat:Infinity,
            delay:i*2
          }}

          className="absolute w-1 h-1 bg-white shadow-[0_0_10px_white]"
        />

      ))}

    </div>

  );
};

export default ShootingStars;