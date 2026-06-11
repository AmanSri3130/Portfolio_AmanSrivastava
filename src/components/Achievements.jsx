import { motion } from "framer-motion";

{/* ACHIEVEMENTS */}

<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="mt-28 text-center"
>
  <h2 className="text-3xl font-bold text-cyan-400 mb-12">
    Achievements
  </h2>

  <div className="grid md:grid-cols-3 gap-10">

    {/* Smart India Hackathon */}

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl"
    >
      <h3 className="text-xl font-semibold text-white">
        Smart India Hackathon
      </h3>

      <p className="text-gray-300 mt-3">
        Participated in Smart India Hackathon with two innovative ideas 
        <span className="text-cyan-400 font-semibold"> HitAyu </span>
        and 
        <span className="text-cyan-400 font-semibold"> PrakritiX</span>, 
        qualifying for both submissions.
      </p>
    </motion.div>


    {/* DSA Practice */}

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl"
    >
      <h3 className="text-xl font-semibold text-white">
        Data Structures & Algorithms
      </h3>

      <p className="text-gray-300 mt-3">
        Solved 
        <span className="text-cyan-400 font-semibold"> 200+ problems </span>
        across platforms like LeetCode and other coding platforms,
        strengthening problem-solving and algorithmic thinking.
      </p>
    </motion.div>


    {/* Hackathons */}

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl"
    >
      <h3 className="text-xl font-semibold text-white">
        Hackathon Participation
      </h3>

      <p className="text-gray-300 mt-3">
        Actively participated in multiple hackathons, collaborating in teams
        to build innovative solutions and real-world problem-solving projects.
      </p>
    </motion.div>


    {/* AI Projects */}

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl"
    >
      <h3 className="text-xl font-semibold text-white">
        AI Projects
      </h3>

      <p className="text-gray-300 mt-3">
        Built multiple AI-driven applications including emotion-based music
        recommendation systems and intelligent quiz generators.
      </p>
    </motion.div>


    {/* Full Stack */}

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl"
    >
      <h3 className="text-xl font-semibold text-white">
        Full Stack Development
      </h3>

      <p className="text-gray-300 mt-3">
        Developed full-stack platforms including job portals,
        university networking systems, and AI-powered web applications.
      </p>
    </motion.div>


    {/* Innovation */}

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl"
    >
      <h3 className="text-xl font-semibold text-white">
        Innovative Development
      </h3>

      <p className="text-gray-300 mt-3">
        Continuously building innovative solutions combining 
        <span className="text-cyan-400 font-semibold"> AI, Data Science, and Web Development </span>
        to solve real-world problems.
      </p>
    </motion.div>

  </div>

</motion.section>