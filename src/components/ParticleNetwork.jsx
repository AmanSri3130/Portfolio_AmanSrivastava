import React from 'react'

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticleNetwork = () => {

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (

    <Particles
      id="particles"

      init={particlesInit}

      options={{

        fullScreen:{ enable:false },

        particles:{
          number:{ value:60 },

          color:{ value:"#22d3ee" },

          links:{
            enable:true,
            distance:120,
            color:"#22d3ee",
            opacity:0.3
          },

          move:{
            enable:true,
            speed:1
          }
        },

        interactivity:{
          events:{
            onHover:{
              enable:true,
              mode:"grab"
            }
          },

          modes:{
            grab:{
              distance:150,
              links:{ opacity:1 }
            }
          }
        }

      }}

    />

  )

}

export default ParticleNetwork
