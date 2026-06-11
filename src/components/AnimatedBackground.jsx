import React from 'react'

import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const AnimatedBackground = () => {

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">

      <Particles
        id="particles"
        init={particlesInit}

        options={{

          fullScreen: {
            enable: false
          },

          background: {
            color: "transparent"
          },

          particles: {

            number: {
              value: 100
            },

            color: {
              value: "#22d3ee"
            },

            links: {
              enable: true,
              distance: 150,
              color: "#22d3ee",
              opacity: 0.3,
              width: 1
            },

            move: {
              enable: true,
              speed: 1
            },

            size: {
              value: 3
            }

          },

          interactivity: {

            events: {

              onHover: {
                enable: true,
                mode: "grab"
              }

            },

            modes: {

              grab: {
                distance: 200,
                links: {
                  opacity: 1
                }
              }

            }

          }

        }}

      />

    </div>
  );
};

export default AnimatedBackground;
