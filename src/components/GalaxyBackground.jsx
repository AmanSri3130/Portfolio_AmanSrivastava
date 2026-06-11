import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const GalaxyBackground = () => {

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (

    <Particles
      id="tsparticles"
      init={particlesInit}

      options={{
        fullScreen: { enable: true, zIndex: -1 },

        background: {
          color: "#020617"
        },

        particles: {
          number: {
            value: 120
          },

          color: {
            value: "#22d3ee"
          },

          links: {
            enable: true,
            distance: 150,
            color: "#22d3ee",
            opacity: 0.4
          },

          move: {
            enable: true,
            speed: 1
          },

          size: {
            value: 2
          }
        },

        interactivity: {

          events: {
            onHover: {
              enable: true,
              mode: "grab"
            },

            onClick: {
              enable: true,
              mode: "push"
            }
          },

          modes: {

            grab: {
              distance: 200,
              links: {
                opacity: 1
              }
            },

            push: {
              quantity: 4
            }
          }

        }

      }}

    />

  );
};

export default GalaxyBackground;