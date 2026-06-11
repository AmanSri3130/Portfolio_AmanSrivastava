import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const CreepyButton = ({
  children,
  className,
  coverClassName,
  onClick,
  to,
  href,
  target,
  rel,
  download,
  type = "button",
  variant = "primary", // "primary" or "outline"
  disabled,
  style,
  ...props
}) => {
  const eyesRef = useRef(null);
  const [eyeCoords, setEyeCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const updateEyes = (e) => {
    const userEvent =
      "touches" in e ? e.touches[0] : e;

    if (!eyesRef.current) return;

    // get the center of the eyes container
    const eyesRect = eyesRef.current.getBoundingClientRect();
    const eyesCenter = {
      x: eyesRect.left + eyesRect.width / 2,
      y: eyesRect.top + eyesRect.height / 2,
    };

    // cursor position
    const cursor = {
      x: userEvent.clientX,
      y: userEvent.clientY,
    };

    // calculate the eye angle
    const dx = cursor.x - eyesCenter.x;
    const dy = cursor.y - eyesCenter.y;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;

    // pupil distance from the eye center
    const visionRangeX = 180; // Max distance to look horizontally
    const visionRangeY = 75;  // Max distance to look vertically
    const distance = Math.hypot(dx, dy);

    // Limit the movement so pupils don't go too far
    const x = (Math.sin(angle) * Math.min(distance, visionRangeX)) / visionRangeX;
    const y = (Math.cos(angle) * Math.min(distance, visionRangeY)) / visionRangeY;

    setEyeCoords({ x, y });
  };

  // Reset eyes when mouse leaves
  const resetEyes = () => {
    setEyeCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const pupilStyle = {
    transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`,
  };

  // Decide the tag to render
  let Tag = "button";
  const extraProps = { ...props };

  if (to && !disabled) {
    Tag = Link;
    extraProps.to = to;
  } else if (href && !disabled) {
    Tag = "a";
    extraProps.href = href;
    extraProps.target = target;
    extraProps.rel = rel;
    extraProps.download = download;
  } else {
    extraProps.type = type;
    extraProps.disabled = disabled;
  }

  const baseClassName = cn(
    "relative min-w-[9em] rounded-xl bg-black cursor-pointer outline-none select-none group tap-highlight-transparent",
    "border-2 border-black transition-shadow duration-150 active:translate-y-[2px] active:translate-x-[2px]",
    // Shadow matching theme shadow
    variant === "primary" ? "shadow-[4px_4px_0px_#000000]" : "shadow-[4px_4px_0px_#000000]",
    disabled && "opacity-60 cursor-not-allowed pointer-events-none",
    className
  );

  const finalCoverClassName = cn(
    "absolute inset-0 flex items-center justify-center pr-12 pl-6 rounded-[10px] font-bold tracking-wide transition-colors",
    "origin-[1.25em_50%] border-2 border-black z-10",
    variant === "primary"
      ? "bg-[var(--cyan)] text-black"
      : "bg-[var(--bg-card)] text-black",
    coverClassName
  );

  return (
    <Tag
      className={baseClassName}
      onClick={onClick}
      onMouseMove={(e) => {
        if (disabled) return;
        updateEyes(e);
        setIsHovered(true);
      }}
      onTouchMove={(e) => {
        if (disabled) return;
        updateEyes(e);
      }}
      onMouseLeave={resetEyes}
      onFocus={() => {
        if (disabled) return;
        setIsHovered(true);
      }}
      onBlur={() => setIsHovered(false)}
      style={style}
      {...extraProps}
    >
      {/* Button Cover */}
      <motion.span
        className={finalCoverClassName}
        animate={{
          rotate: isHovered ? -10 : 0,
          y: isHovered ? -2 : 0,
          x: isHovered ? -2 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 22,
          mass: 0.8,
        }}
      >
        {children}

        {/* Eyes Container (Always Visible on the Cover) */}
        <span
          ref={eyesRef}
          className="absolute flex items-center gap-[0.375em] right-[1.25em] top-1/2 -translate-y-1/2 h-[0.75em] pointer-events-none"
        >
          {/* Left Eye */}
          <motion.span
            className="relative w-[0.75em] h-[0.75em] bg-white border border-black rounded-full overflow-hidden inline-block"
            animate={{ height: ["0.75em", "0.75em", "0em", "0.75em"] }}
            transition={{
              duration: 3,
              times: [0, 0.92, 0.96, 1],
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span
              className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out"
              style={pupilStyle}
            />
          </motion.span>
          {/* Right Eye */}
          <motion.span
            className="relative w-[0.75em] h-[0.75em] bg-white border border-black rounded-full overflow-hidden inline-block"
            animate={{ height: ["0.75em", "0.75em", "0em", "0.75em"] }}
            transition={{
              duration: 3,
              times: [0, 0.92, 0.96, 1],
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span
              className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out"
              style={pupilStyle}
            />
          </motion.span>
        </span>
      </motion.span>

      {/* Invisible placeholder to maintain size since cover is absolute */}
      <span className="block opacity-0 pr-12 pl-6 py-3 font-bold tracking-wide select-none">
        {children}
      </span>
    </Tag>
  );
};

export default CreepyButton;
