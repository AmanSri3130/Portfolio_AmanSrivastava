import React, { useEffect, useState } from "react";
import { motion, useSpring, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, width: "100%" }}
    />
  );
};

export default ScrollProgress;
