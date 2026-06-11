import React from 'react'
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (

    <Particles
      id="tsparticles"
      init={particlesInit}

      options={{
        background: {
          color: "#0f172a",
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },

          color: {
            value: "#22d3ee",
          },

          links: {
            enable: true,
            distance: 150,
            color: "#22d3ee",
            opacity: 0.5,
          },

          move: {
            enable: true,
            speed: 1,
          },

          size: {
            value: 3,
          },
        },
      }}

      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />

  );
};

export default ParticlesBackground;