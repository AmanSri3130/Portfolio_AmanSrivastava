import React, { useState, useEffect, useRef } from "react";

const CatCursor = () => {
  const catRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastMoveTime = useRef(Date.now());
  const lastStateChange = useRef(Date.now());
  
  const [state, setState] = useState("idle"); // idle, running, sleeping, purring, flipping, greeting
  const [isFlipped, setIsFlipped] = useState(false); // face left when true
  const [isHidden, setIsHidden] = useState(false); // hide when hovering buttons/links/navbars

  const [currentGreeting, setCurrentGreeting] = useState("");
  const [greetingVisible, setGreetingVisible] = useState(false);
  const greetingTimeoutRef = useRef(null);
  const greetingExitTimeoutRef = useRef(null);
  const lastTapRef = useRef(0);

  const GREETINGS = [
    "Hi human! Let's build something awesome! 💻✨",
    "Meow! Hope you're having a great day! 🐾",
    "Hello there! *purr* *purr* ❤️",
    "Hey! Don't forget to take a break! ☕🐱",
    "Hi! I'm your coding companion today! 🚀",
    "Meow! You are doing amazing! ⭐",
    "Hi! Click the background to see a backflip! 🤸‍♂️",
  ];

  const handleGreet = () => {
    // Clear any active timeouts
    if (greetingTimeoutRef.current) clearTimeout(greetingTimeoutRef.current);
    if (greetingExitTimeoutRef.current) clearTimeout(greetingExitTimeoutRef.current);

    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setCurrentGreeting(randomGreeting);
    setState("greeting");
    setGreetingVisible(true);

    greetingTimeoutRef.current = setTimeout(() => {
      setGreetingVisible(false);
      greetingExitTimeoutRef.current = setTimeout(() => {
        setState("idle");
        lastMoveTime.current = Date.now();
      }, 350); // Wait for the transition scale(0) to complete
    }, 3800); // Keep the bubble visible for 3.8s
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    handleGreet();
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      handleGreet();
    }
    lastTapRef.current = now;
  };

  // State ref to access inside the requestAnimationFrame loop without re-triggering it
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
    lastStateChange.current = Date.now();
  }, [state]);

  const triggerBackflipRef = useRef(null);
  triggerBackflipRef.current = () => {
    if (stateRef.current !== "flipping") {
      if (greetingTimeoutRef.current) clearTimeout(greetingTimeoutRef.current);
      if (greetingExitTimeoutRef.current) clearTimeout(greetingExitTimeoutRef.current);
      setGreetingVisible(false);

      setState("flipping");
      setTimeout(() => {
        setState("idle");
        lastMoveTime.current = Date.now();
      }, 600); // matches the CSS backflip duration
    }
  };

  useEffect(() => {
    // 1. Track Mouse Position
    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();

      // Wake up if sleeping or purring when mouse moves
      if (stateRef.current === "sleeping" || stateRef.current === "purring") {
        setState("running");
      }
    };

    // 2. Perform backflip on click
    const handleWindowClick = (e) => {
      // Ignore click on cat to prevent backflip trigger on double clicks
      if (catRef.current && catRef.current.contains(e.target)) {
        return;
      }

      if (stateRef.current !== "flipping") {
        triggerBackflipRef.current();
      }
    };

    // 3. Detect when mouse is over clickable/nav elements to hide cat
    const handleMouseOver = (e) => {
      let el = e.target;
      let shouldHide = false;
      while (el && el !== document.body && el !== document.documentElement) {
        if (!el.tagName) {
          el = el.parentElement;
          continue;
        }

        const tagName = el.tagName.toLowerCase();
        const className = typeof el.className === "string" ? el.className.toLowerCase() : "";
        const role = el.getAttribute ? el.getAttribute("role") : null;
        
        if (
          tagName === "button" ||
          tagName === "a" ||
          tagName === "nav" ||
          tagName === "input" ||
          tagName === "textarea" ||
          tagName === "select" ||
          tagName === "label" ||
          role === "button" ||
          role === "link" ||
          className.includes("nav") ||
          className.includes("btn") ||
          className.includes("button") ||
          className.includes("menu") ||
          window.getComputedStyle(el).cursor === "pointer"
        ) {
          // Exception: don't hide when hovering over the cat itself!
          if (catRef.current && catRef.current.contains(el)) {
            shouldHide = false;
            break;
          }
          shouldHide = true;
          break;
        }
        el = el.parentElement;
      }
      setIsHidden(shouldHide);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleWindowClick);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleWindowClick);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (greetingTimeoutRef.current) clearTimeout(greetingTimeoutRef.current);
      if (greetingExitTimeoutRef.current) clearTimeout(greetingExitTimeoutRef.current);
    };
  }, []);

  // 3. RequestAnimationFrame Loop for Physics & Position Interpolation
  useEffect(() => {
    let animId;
    const speed = 0.08; // Easing speed
    const minDistance = 32; // Stop distance

    const update = () => {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      const dist = Math.hypot(dx, dy);

      // Determine facing direction (horizontally flip SVG)
      if (stateRef.current !== "flipping" && stateRef.current !== "purring") {
        if (dx > 2) {
          setIsFlipped(false); // face right
        } else if (dx < -2) {
          setIsFlipped(true); // face left
        }
      }

      let nextState = stateRef.current;
      const timeSinceLastMove = Date.now() - lastMoveTime.current;

      if (stateRef.current !== "flipping" && stateRef.current !== "purring" && stateRef.current !== "greeting") {
        if (dist > minDistance) {
          const offsetAngle = Math.atan2(dy, dx);
          const offsetX = Math.cos(offsetAngle) * minDistance;
          const offsetY = Math.sin(offsetAngle) * minDistance;

          const targetX = target.current.x - offsetX;
          const targetY = target.current.y - offsetY;

          pos.current.x += (targetX - pos.current.x) * speed;
          pos.current.y += (targetY - pos.current.y) * speed;

          nextState = "running";
        } else {
          if (timeSinceLastMove > 5000) {
            nextState = "sleeping";
          } else {
            nextState = "idle";
          }
        }

        if (nextState !== stateRef.current) {
          setState(nextState);
        }
      } else if (stateRef.current === "flipping") {
        if (dist > minDistance) {
          pos.current.x += dx * (speed * 0.4);
          pos.current.y += dy * (speed * 0.4);
        }
      } else if (stateRef.current === "greeting") {
        // Continue to follow cursor smoothly, but slightly slower/more damped
        if (dist > minDistance) {
          pos.current.x += dx * (speed * 0.6);
          pos.current.y += dy * (speed * 0.6);
        }
      }

      if (catRef.current) {
        catRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseEnter = () => {
    if (state !== "flipping" && state !== "greeting") {
      setState("purring");
    }
  };

  const handleMouseLeave = () => {
    if (state === "purring") {
      setState("idle");
      lastMoveTime.current = Date.now();
    }
  };

  return (
    <div className="cat-cursor-container">
      {/* Scoped CSS for the Cat Cursor */}
      <style>{`
        .cat-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 999999;
        }

        .cat-wrapper {
          position: absolute;
          top: -45px;
          left: -40px;
          width: 80px;
          height: 80px;
          pointer-events: none;
          will-change: transform;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        /* Smooth disappearance transition */
        .cat-wrapper.hidden {
          opacity: 0;
          pointer-events: none;
        }
        
        .cat-wrapper.hidden .cat-svg-container {
          pointer-events: none;
        }

        .cat-svg-container {
          width: 100%;
          height: 100%;
          pointer-events: auto;
          cursor: pointer;
          transform-origin: center bottom;
          transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Facing Direction (Horizontal Flip) */
        .cat-svg-container.flipped {
          transform: scaleX(-1);
        }

        /* Greeting Zoom Effect */
        .cat-svg-container.greeting {
          transform: scale(2.0);
          z-index: 99999;
        }
        .cat-svg-container.greeting.flipped {
          transform: scaleX(-2.0) scaleY(2.0);
          z-index: 99999;
        }

        /* Neo-Brutalist shadow beneath the cat */
        .cat-shadow {
          fill: rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        .cat-svg-container.running .cat-shadow {
          transform: scaleX(0.9) translateY(2px);
        }
        .cat-svg-container.sleeping .cat-shadow {
          transform: scaleX(0.7) translateY(2px);
        }

        /* Neo-Brutalist Speech Bubble */
        .speech-bubble {
          position: absolute;
          bottom: 165px; /* position above scaled 2x cat */
          left: 50%;
          transform: translateX(-50%) scale(0);
          transform-origin: bottom center;
          background: #ffeaa7; /* Neon yellow/cream */
          border: 3px solid #000000;
          border-radius: 12px;
          padding: 8px 14px;
          box-shadow: 4px 4px 0px #000000;
          z-index: 1000000;
          pointer-events: none;
          transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease;
          opacity: 0;
          user-select: none;
        }

        .speech-bubble.visible {
          transform: translateX(-50%) scale(1);
          opacity: 1;
          pointer-events: auto;
        }

        /* Speech bubble arrow/tail */
        .speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 10px 10px 0;
          border-style: solid;
          border-color: #000000 transparent;
          display: block;
          width: 0;
        }

        .speech-bubble::before {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 8px 8px 0;
          border-style: solid;
          border-color: #ffeaa7 transparent;
          display: block;
          width: 0;
          z-index: 1;
        }

        .speech-text {
          font-family: 'Space Grotesk', 'Satoshi', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #000000;
          line-height: 1.2;
          white-space: nowrap;
        }

        .bubble-flip-btn {
          margin-left: 8px;
          background: #ff7675; /* Coral red */
          border: 2px solid #000000;
          border-radius: 6px;
          padding: 2px 8px;
          font-family: 'Space Grotesk', 'Satoshi', sans-serif;
          font-weight: 800;
          font-size: 11px;
          color: #000000;
          cursor: pointer;
          box-shadow: 2px 2px 0px #000000;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
          display: inline-block;
          vertical-align: middle;
        }
        .bubble-flip-btn:hover {
          background: #ff5252;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px #000000;
        }
        .bubble-flip-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px #000000;
        }

        /* ── ANIMATION DEFINITIONS ── */

        /* 1. Tail Wagging */
        .tail {
          transform-origin: 22px 38px;
          animation: tailWagSlow 1.6s ease-in-out infinite;
        }
        .cat-svg-container.running .tail {
          animation: tailWagFast 0.4s linear infinite;
        }
        .cat-svg-container.sleeping .tail {
          animation: tailCurl 3s ease-in-out infinite;
          transform: rotate(-25deg) translate(2px, 2px);
        }
        .cat-svg-container.purring .tail {
          animation: tailWagSlow 0.8s ease-in-out infinite;
        }
        .cat-svg-container.greeting .tail {
          animation: tailWagFast 0.3s linear infinite;
        }

        @keyframes tailWagSlow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes tailWagFast {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(25deg); }
        }
        @keyframes tailCurl {
          0%, 100% { transform: rotate(-25deg); }
          50% { transform: rotate(-18deg); }
        }

        /* 2. Leg Cycles (Running) */
        .leg {
          transform-origin: center 46px;
        }
        .cat-svg-container.running .leg-front-right {
          animation: legRunA 0.4s linear infinite;
        }
        .cat-svg-container.running .leg-back-left {
          animation: legRunA 0.4s linear infinite;
        }
        .cat-svg-container.running .leg-front-left {
          animation: legRunB 0.4s linear infinite;
        }
        .cat-svg-container.running .leg-back-right {
          animation: legRunB 0.4s linear infinite;
        }

        @keyframes legRunA {
          0%, 100% { transform: rotate(-25deg) translateY(0); }
          50% { transform: rotate(25deg) translateY(-3px); }
        }
        @keyframes legRunB {
          0%, 100% { transform: rotate(25deg) translateY(-3px); }
          50% { transform: rotate(-25deg) translateY(0); }
        }

        /* Sitting Pose for Idle */
        .cat-svg-container.idle .leg-back-left,
        .cat-svg-container.idle .leg-back-right {
          transform: translateY(-2px) rotate(15deg);
        }
        
        /* Hide regular legs when sleeping */
        .cat-svg-container.sleeping .standing-legs {
          display: none;
        }
        .cat-svg-container:not(.sleeping) .sleeping-legs {
          display: none;
        }

        /* 3. Body Bobbing / Breathing */
        .body-group {
          transform-origin: 37px 41px;
        }
        .cat-svg-container.running .body-group {
          animation: bodyRunBob 0.4s linear infinite;
        }
        .cat-svg-container.idle .body-group {
          animation: breathingSlow 3s ease-in-out infinite;
        }
        .cat-svg-container.sleeping .body-group {
          animation: sleepingDeep 4s ease-in-out infinite;
        }
        .cat-svg-container.purring .body-group {
          animation: purringVibe 0.15s linear infinite;
        }
        .cat-svg-container.greeting .body-group {
          animation: greetingHappy 0.45s ease-in-out infinite;
        }

        @keyframes bodyRunBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-2deg); }
        }
        @keyframes breathingSlow {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.97) translateY(0.5px); }
        }
        @keyframes sleepingDeep {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(0.92) scaleX(0.96) translateY(2px); }
        }
        @keyframes purringVibe {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-0.5px, 0.5px) rotate(-0.5deg); }
          75% { transform: translate(0.5px, -0.5px) rotate(0.5deg); }
        }
        @keyframes greetingHappy {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-3px) scaleY(1.06); }
        }

        /* 4. Head adjustments */
        .head-group {
          transform-origin: 47px 26px;
          transition: transform 0.3s ease;
        }
        .cat-svg-container.sleeping .head-group {
          transform: translate(-3px, 5px) rotate(-12deg);
        }
        .cat-svg-container.purring .head-group {
          transform: rotate(8deg) translateY(1px);
        }
        .cat-svg-container.greeting .head-group {
          transform: rotate(4deg) translateY(-1px);
        }

        /* Eye Blinking for Idle/Running */
        .eye {
          transform-origin: center;
        }
        .cat-svg-container.idle .eye,
        .cat-svg-container.running .eye {
          animation: eyeBlink 4s ease-in-out infinite;
        }
        @keyframes eyeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        /* 5. Zzz sleeping animation */
        .zzz-container {
          position: absolute;
          top: -20px;
          left: 10px;
          width: 60px;
          height: 60px;
          pointer-events: none;
        }
        .zzz {
          position: absolute;
          color: var(--text-primary, #ffffff);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 14px;
          opacity: 0;
          text-shadow: 2px 2px 0px #000000;
        }
        .zzz-1 {
          animation: floatZzz 3s linear infinite 0s;
        }
        .zzz-2 {
          animation: floatZzz 3s linear infinite 1s;
        }
        .zzz-3 {
          animation: floatZzz 3s linear infinite 2s;
        }

        @keyframes floatZzz {
          0% { transform: translate(0, 20px) scale(0.6); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translate(15px, -20px) scale(1.1); opacity: 0; }
        }

        /* 6. Heart / Purr float animation */
        .heart-container {
          position: absolute;
          top: -25px;
          left: 30px;
          width: 40px;
          height: 40px;
          pointer-events: none;
        }
        .heart {
          font-size: 18px;
          position: absolute;
          animation: floatHeart 1.2s ease-out infinite;
          opacity: 0;
        }
        @keyframes floatHeart {
          0% { transform: translate(0, 15px) scale(0.6); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translate(-10px, -15px) scale(1.2); opacity: 0; }
        }

        /* 7. Click Flip Animation */
        .cat-wrapper.flipping {
          animation: clickBackflip 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes clickBackflip {
          0% { transform: translateY(0) rotate(0deg); }
          30% { transform: translateY(-70px) rotate(-120deg); }
          60% { transform: translateY(-70px) rotate(-240deg); }
          100% { transform: translateY(0) rotate(-360deg); }
        }
      `}</style>

      {/* The actual Cat element */}
      <div 
        ref={catRef} 
        className={`cat-wrapper ${state === "flipping" ? "flipping" : ""} ${isHidden ? "hidden" : ""}`}
      >
        {/* Speech Bubble */}
        <div className={`speech-bubble ${greetingVisible ? "visible" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="speech-text">{currentGreeting}</span>
            {currentGreeting.includes("backflip") && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerBackflipRef.current();
                }}
                className="bubble-flip-btn"
              >
                Flip! 🤸‍♂️
              </button>
            )}
          </div>
        </div>

        {/* Sleeping Zzz Bubbles */}
        {state === "sleeping" && (
          <div className="zzz-container">
            <span className="zzz zzz-1">z</span>
            <span className="zzz zzz-2" style={{ fontSize: "17px", left: "12px", top: "-5px" }}>z</span>
            <span className="zzz zzz-3" style={{ fontSize: "20px", left: "26px", top: "-10px" }}>Z</span>
          </div>
        )}

        {/* Purring Heart Icons */}
        {state === "purring" && (
          <div className="heart-container">
            <span className="heart" style={{ animationDelay: "0s" }}>❤️</span>
            <span className="heart" style={{ animationDelay: "0.6s", left: "8px", top: "-6px" }}>💖</span>
          </div>
        )}

        {/* SVG Cat Mascot */}
        <div 
          className={`cat-svg-container ${state} ${isFlipped ? "flipped" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={handleDoubleClick}
          onTouchEnd={handleTouchEnd}
        >
          <svg 
            viewBox="0 0 80 80" 
            width="80" 
            height="80"
            className="cat-svg"
          >
            {/* 1. Shadows (Neo-Brutalist styling) */}
            <ellipse className="cat-shadow" cx="37" cy="61" rx="20" ry="4" />

            {/* 2. Standing/Running Legs (Visible in non-sleeping states) */}
            <g className="standing-legs">
              {/* Back Leg Left (Darker color for shadow depth) */}
              <g className="leg leg-back-left">
                <path d="M 23,45 L 21,59 C 21,61 24,61 24,59 L 26,45" fill="none" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
                <path d="M 23,45 L 21,59 C 21,61 24,61 24,59 L 26,45" fill="none" stroke="#d97d24" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Back Leg Right (Primary color) */}
              <g className="leg leg-back-right">
                <path d="M 28,45 L 27,59 C 27,61 30,61 30,59 L 31,45" fill="none" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
                <path d="M 28,45 L 27,59 C 27,61 30,61 30,59 L 31,45" fill="none" stroke="#ff9f43" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Front Leg Left (Darker color) */}
              <g className="leg leg-front-left">
                <path d="M 42,45 L 40,59 C 40,61 43,61 43,59 L 45,45" fill="none" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
                <path d="M 42,45 L 40,59 C 40,61 43,61 43,59 L 45,45" fill="none" stroke="#d97d24" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Front Leg Right (Primary color) */}
              <g className="leg leg-front-right">
                <path d="M 47,45 L 46,59 C 46,61 49,61 49,59 L 50,45" fill="none" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
                <path d="M 47,45 L 46,59 C 46,61 49,61 49,59 L 50,45" fill="none" stroke="#ff9f43" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>

            {/* 2.5 Sleeping Legs (Visible only when sleeping) */}
            <g className="sleeping-legs">
              {/* Curved tucked legs */}
              <path d="M 26,51 C 28,55 35,55 37,51" fill="none" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
              <path d="M 26,51 C 28,55 35,55 37,51" fill="none" stroke="#ff9f43" strokeWidth="3" strokeLinecap="round" />
              <path d="M 40,51 C 42,54 48,54 50,51" fill="none" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
              <path d="M 40,51 C 42,54 48,54 50,51" fill="none" stroke="#ff9f43" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* 3. Tail */}
            {/* Outline Tail */}
            <path 
              className="tail" 
              d="M 21,39 C 13,38 7,24 12,12" 
              fill="none" 
              stroke="#000000" 
              strokeWidth="9" 
              strokeLinecap="round" 
            />
            {/* Inner Tail */}
            <path 
              className="tail" 
              d="M 21,39 C 13,38 7,24 12,12" 
              fill="none" 
              stroke="#ff9f43" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />

            {/* 4. Body Group (bobbing is applied to this) */}
            <g className="body-group">
              {/* Outer Body Outline */}
              <rect x="19" y="29" width="36" height="24" rx="12" fill="#ff9f43" stroke="#000000" strokeWidth="3" />
              
              {/* Body Stripes */}
              <path d="M 28,29 L 28,34" stroke="#d97d24" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 33,29 L 33,36" stroke="#d97d24" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 38,29 L 38,34" stroke="#d97d24" strokeWidth="3.5" strokeLinecap="round" />

              {/* Cream Belly Patch */}
              <ellipse cx="37" cy="42" rx="12" ry="7" fill="#fff5e6" />
            </g>

            {/* 5. Head Group */}
            <g className="head-group">
              {/* Left Ear */}
              <polygon points="37,20 42,8 46,19" fill="#ff9f43" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="39,18 42,10 44,18" fill="#ff8a8a" />

              {/* Right Ear */}
              <polygon points="48,19 52,8 57,20" fill="#ff9f43" stroke="#000000" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="50,18 52,10 55,18" fill="#ff8a8a" />

              {/* Head Circle */}
              <circle cx="47" cy="25" r="13" fill="#ff9f43" stroke="#000000" strokeWidth="3" />

              {/* Head Stripes */}
              <path d="M 44,12 L 44,16" stroke="#d97d24" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 47,11 L 47,16" stroke="#d97d24" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 50,12 L 50,16" stroke="#d97d24" strokeWidth="2.5" strokeLinecap="round" />

              {/* Muzzle (Cream patch) */}
              <ellipse cx="47" cy="29.5" rx="6" ry="4.5" fill="#fff5e6" />
              
              {/* Mouth w shape */}
              <path d="M 45,29.5 Q 46,31 47,29.5 Q 48,31 49,29.5" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />

              {/* Nose */}
              <polygon points="46,27 48,27 47,28.5" fill="#ff8a8a" stroke="#ff8a8a" strokeWidth="0.5" strokeLinejoin="round" />

              {/* Whiskers */}
              <path d="M 39,27.5 L 32,26" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 38.5,30 L 31.5,31" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
              
              <path d="M 55,27.5 L 62,26" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 55.5,30 L 62.5,31" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />

              {/* Expressive Eyes depending on state */}
              {state === "sleeping" ? (
                // Sleeping eyes (u_u shape)
                <g>
                  <path d="M 40.5,23.5 Q 42,25.5 43.5,23.5" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 50.5,23.5 Q 52,25.5 53.5,23.5" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" />
                </g>
              ) : state === "purring" ? (
                // Heart Eyes
                <g>
                  <path 
                    d="M 42,21 C 41,19.5 39,20.5 40.5,22.5 L 42,25 L 43.5,22.5 C 45,20.5 43,19.5 42,21 Z" 
                    fill="#ff4d4d" 
                    stroke="#000000" 
                    strokeWidth="1" 
                  />
                  <path 
                    d="M 52,21 C 51,19.5 49,20.5 50.5,22.5 L 52,25 L 53.5,22.5 C 55,20.5 53,19.5 52,21 Z" 
                    fill="#ff4d4d" 
                    stroke="#000000" 
                    strokeWidth="1" 
                  />
                </g>
              ) : state === "greeting" ? (
                // Happy curved eyes (^ _ ^ shape)
                <g>
                  <path d="M 40.5,24.5 Q 42,21.5 43.5,24.5" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 50.5,24.5 Q 52,21.5 53.5,24.5" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              ) : (
                // Normal Anime Eyes (with shiny blink reflections)
                <g>
                  <circle className="eye" cx="42" cy="23.5" r="2.5" fill="#000000" />
                  <circle className="eye" cx="41.2" cy="22.7" r="0.75" fill="#ffffff" />
                  
                  <circle className="eye" cx="52" cy="23.5" r="2.5" fill="#000000" />
                  <circle className="eye" cx="51.2" cy="22.7" r="0.75" fill="#ffffff" />
                </g>
              )}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CatCursor;
