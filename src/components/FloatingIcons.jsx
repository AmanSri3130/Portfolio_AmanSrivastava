import { FaReact, FaPython, FaJsSquare, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";

const FloatingIcons = () => {

  return (

    <div className="absolute inset-0 pointer-events-none">

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-20 left-20 text-cyan-400 text-5xl"
      >
        <FaReact />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-40 right-20 text-yellow-400 text-5xl"
      >
        <FaJsSquare />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-40 left-40 text-green-400 text-5xl"
      >
        <FaPython />
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute bottom-20 right-40 text-blue-400 text-5xl"
      >
        <FaDatabase />
      </motion.div>

    </div>

  );
};

export default FloatingIcons;