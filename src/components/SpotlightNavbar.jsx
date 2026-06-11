import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { animate } from "framer-motion";
import { cn } from "../lib/utils";

export function SpotlightNavbar({
  items = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
  ],
  className,
  onItemClick,
}) {
  const navRef = useRef(null);
  const location = useLocation();

  // Determine active index based on route
  const activeIndex = items.findIndex((item) => {
    if (item.to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(item.to);
  });

  const [hoverX, setHoverX] = useState(null);

  // Refs for the "light" positions so we can animate them imperatively
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  // Synchronize the spotlight position on mouse movements or active changes
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      // When mouse leaves, spring the spotlight back to the active item
      const activeIdx = activeIndex !== -1 ? activeIndex : 0;
      const activeItem = nav.querySelector(`[data-index="${activeIdx}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    // Initial positioning of spotlight on mount/route change (when not hovering)
    if (hoverX === null) {
      const activeIdx = activeIndex !== -1 ? activeIndex : 0;
      const activeItem = nav.querySelector(`[data-index="${activeIdx}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;
        spotlightX.current = targetX;
        nav.style.setProperty("--spotlight-x", `${targetX}px`);
      }
    }

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex, hoverX]);

  // Handle the "Ambience" (Active Item) Movement
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    const activeIdx = activeIndex !== -1 ? activeIndex : 0;
    const activeItem = nav.querySelector(`[data-index="${activeIdx}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  return (
    <div className={cn("relative flex justify-center", className)}>
      <nav
        ref={navRef}
        className={cn(
          "spotlight-nav spotlight-nav-bg glass-border spotlight-nav-shadow",
          "relative h-11 rounded-full transition-all duration-300 overflow-hidden flex items-center"
        )}
      >
        {/* Content */}
        <ul className="relative flex items-center h-full px-2 gap-0 z-[10] list-none m-0">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              <Link
                to={item.to}
                data-index={idx}
                onClick={() => {
                  onItemClick?.(item, idx);
                }}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full text-decoration-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
                  // Active vs Inactive Text
                  activeIndex === idx
                    ? "text-black dark:text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* LIGHTING LAYERS */}
        {/* 1. The Moving Spotlight (Follows Mouse) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(0,0,0,0.1)) 0%, 
                transparent 50%
              )
            `,
          }}
        />

        {/* 2. The Active State Ambience (Stays on Active) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
          style={{
            background: `
              radial-gradient(
                60px circle at var(--ambience-x) 0%, 
                var(--ambience-color, rgba(0,0,0,1)) 0%, 
                transparent 100%
              )
            `,
          }}
        />

        {/* 3. Bottom Border Track (Subtle) */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 dark:bg-white/[0.1] z-0" />
      </nav>
    </div>
  );
}

export default SpotlightNavbar;
