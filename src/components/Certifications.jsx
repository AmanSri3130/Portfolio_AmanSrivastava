import React from 'react'

{/* CERTIFICATIONS */}

<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  className="mt-28 text-center"
>
  <h2 className="text-3xl font-bold text-cyan-400 mb-12">
    Certifications
  </h2>

  <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl"
    >
      <h3 className="text-xl font-semibold">
        Python for Data Science
      </h3>
      <p className="text-gray-300 mt-2">
        Coursera / Online Certification
      </p>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl"
    >
      <h3 className="text-xl font-semibold">
        Python from OneRoadmap
      </h3>
      <p className="text-gray-300 mt-2">
        HTML, CSS, JavaScript, React
      </p>
    </motion.div>

  </div>
</motion.section>
