import React from "react";
import SplashCursor from "./SplashCursor";

const CursorTrail = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
   
  <SplashCursor
    SIM_RESOLUTION={160}
    DYE_RESOLUTION={1152}
    DENSITY_DISSIPATION={9.5}
    VELOCITY_DISSIPATION={1}
    PRESSURE={0.1}
    CURL={18}
    SPLAT_RADIUS={0.15}
    SPLAT_FORCE={3000}
    COLOR_UPDATE_SPEED={7}
  />

    </div>
  );
};

export default CursorTrail; 