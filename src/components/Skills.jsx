import React from 'react'

const Skills = () => {

  const skills = [
    {name:"React",level:90},
    {name:"JavaScript",level:85},
    {name:"Python",level:80},
    {name:"SQL",level:75},
    {name:"Machine Learning",level:70},
  ]

  return(

    <section className="p-20">

      <h2 className="text-4xl text-white text-center mb-10">
        Skills
      </h2>

      <div className="max-w-2xl mx-auto">

        {skills.map((skill,index)=>(
          <div key={index} className="mb-6">

            <p className="text-white mb-2">
              {skill.name}
            </p>

            <div className="w-full bg-gray-700 rounded">

              <div
              className="bg-cyan-500 p-1 rounded"
              style={{width:`${skill.level}%`}}
              />

            </div>

          </div>
        ))}

      </div>

    </section>

  )

}

export default Skills
