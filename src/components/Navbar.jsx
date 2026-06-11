import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/",         label: "Home",     emoji: "🏠" },
  { to: "/about",    label: "About",    emoji: "👨‍💻" },
  { to: "/projects", label: "Projects", emoji: "🚀" },
  { to: "/blog",     label: "Blog",     emoji: "✍️" },
  { to: "/contact",  label: "Contact",  emoji: "✉️" },
];

/* Magnetic button hook */
function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return { ref, sx, sy, onMove, onLeave };
}

/* Single nav link with animated hover background */
const NavLink = ({ link, isActive }) => {
  const [hovered, setHovered] = useState(false);
  const mag = useMagnetic(0.2);

  return (
    <Link to={link.to} style={{ textDecoration: "none" }}>
      <motion.div
        ref={mag.ref}
        style={{ x: mag.sx, y: mag.sy, position: "relative" }}
        onMouseMove={mag.onMove}
        onMouseLeave={() => { mag.onLeave(); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
      >
        {/* Hover glow blob */}
        <AnimatePresence>
          {hovered && !isActive && (
            <motion.span
              layoutId="nav-hover-bg"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute", inset: 0,
                borderRadius: 10,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Active pill */}
        {isActive && (
          <motion.span
            layoutId="active-pill"
            style={{
              position: "absolute", inset: 0,
              borderRadius: 0,
              background: "var(--bg-primary)",
              border: "2px solid var(--border-card)",
              boxShadow: "2px 2px 0px var(--border-card)",
              pointerEvents: "none",
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}

        <span style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", gap: 6,
          padding: "9px 18px",
          fontFamily: "'Space Mono', monospace",
          fontWeight: 800,
          fontSize: "0.92rem",
          color: isActive ? "var(--nav-bg)" : "var(--bg-primary)",
          transition: "color 0.2s ease",
          whiteSpace: "nowrap",
        }}>
          {isActive && (
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--nav-bg)",
              display: "inline-block",
              flexShrink: 0,
            }} />
          )}
          {link.label}
        </span>
      </motion.div>
    </Link>
  );
};

const Navbar = () => {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY]   = useState(0);
  const location                = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const hireMag = useMagnetic(0.3);
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
      }}
    >
      {/* ── TOP GRADIENT LINE ─────────────────────────── */}
      <div style={{
        height: 1,
        background: scrolled
          ? "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), rgba(124,58,237,0.5), transparent)"
          : "transparent",
        transition: "background 0.4s ease",
      }} />

      {/* ── MAIN NAV BAR ─────────────────────────────── */}
      <div style={{
        background: "var(--nav-bg)",
        borderBottom: "2px solid #000000",
        boxShadow: "none",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div 
          className="px-4 md:px-8"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            paddingTop: scrolled ? "12px" : "17px",
            paddingBottom: scrolled ? "12px" : "17px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "padding 0.4s ease",
          }}>

          {/* ── LOGO ───────────────────────────────────── */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "flex", alignItems: "center", gap: 11 }}
            >
              {/* Animated logo mark */}
              <div style={{ position: "relative", width: 38, height: 38 }}>
                {/* Spinning ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute", inset: -2,
                    borderRadius: "50%",
                    border: "1.5px solid transparent",
                    borderTopColor: "var(--bg-primary)",
                    borderRightColor: "var(--bg-primary)",
                  }}
                />
                {/* Inner icon */}
                <div style={{
                  position: "absolute", inset: 0,
                  borderRadius: "50%",
                  border: "2px solid var(--border-card)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 800, fontSize: "0.85rem",
                  background: "#000000",
                  color: "#22d3ee",
                }}>
                  AS
                </div>
              </div>

              {/* Name + tagline */}
              <div>
                <div 
                  className="text-[0.95rem] sm:text-[1.05rem]"
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: "var(--bg-primary)",
                  }}
                >
                  Aman Srivastava
                </div>
                <div 
                  className="hidden sm:block"
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--bg-primary)",
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Developer · AI · ML
                </div>
              </div>
            </motion.div>
          </Link>

          {/* ── DESKTOP LINKS ──────────────────────────── */}
          <div className="hidden md:flex items-center gap-2 font-satoshi">
            {navLinks.map((link) => (
              <NavLink key={link.to} link={link} isActive={isActive(link.to)} />
            ))}
          </div>

          {/* ── CTA + BURGER ───────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ y: 2, x: 2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{
                width: 38, height: 38,
                borderRadius: 0,
                background: "var(--bg-card)",
                border: "2px solid var(--border-card)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                color: "#000000",
                fontSize: "1rem",
                boxShadow: "2px 2px 0px var(--border-card)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1 }}
                  exit={{    rotate:  90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  {isDark ? <FaSun /> : <FaMoon />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Hire Me CTA — desktop */}
            <motion.div
              ref={hireMag.ref}
              style={{ x: hireMag.sx, y: hireMag.sy }}
              onMouseMove={hireMag.onMove}
              onMouseLeave={hireMag.onLeave}
              className="hidden md:block"
            >
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-nb-push"
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "9px 22px",
                    borderRadius: 0,
                    border: "2px solid var(--border-card)",
                    cursor: "pointer",
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    color: "var(--bg-primary)",
                    background: "var(--cyan)",
                    boxShadow: "4px 4px 0px var(--border-card)",
                  }}
                >
                  <Zap size={13} strokeWidth={2.5} />
                  Hire Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile burger */}
            <motion.button
              whileTap={{ scale: 0.88, rotate: 90 }}
              onClick={() => setOpen(!open)}
              className="md:hidden flex items-center justify-center"
              style={{
                width: 40, height: 40,
                borderRadius: 0,
                background: "var(--bg-card)",
                border: "2px solid var(--border-card)",
                boxShadow: "2px 2px 0px var(--border-card)",
                cursor: "pointer",
                color: "#000000",
                transition: "all 0.15s ease",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              margin: "8px 16px 0",
              borderRadius: 0,
              overflow: "hidden",
              background: "var(--bg-card)",
              border: "2px solid var(--border-card)",
              boxShadow: "4px 4px 0px 0px var(--border-card)",
            }}
          >
            <div style={{ padding: "16px 16px 20px" }}>
              {/* Nav links */}
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    to={link.to}
                    style={{ textDecoration: "none", display: "block", marginBottom: 6 }}
                  >
                    <div style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px",
                      borderRadius: 0,
                      background: isActive(link.to) ? "var(--bg-primary)" : "transparent",
                      border: isActive(link.to) ? "2px solid var(--border-card)" : "2px solid transparent",
                      boxShadow: isActive(link.to) ? "2px 2px 0px var(--border-card)" : "none",
                      transition: "all 0.2s",
                    }}>
                      <span style={{ fontSize: "1.1rem" }}>{link.emoji}</span>
                      <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        color: isActive(link.to) ? "var(--text-primary)" : "#000000",
                      }}>
                        {link.label}
                      </span>
                      {isActive(link.to) && (
                        <div
                          style={{
                            marginLeft: "auto",
                            width: 6, height: 6, borderRadius: "50%",
                            background: "var(--text-primary)",
                          }}
                        />
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <div style={{
                height: 2,
                background: "#000000",
                margin: "12px 0",
              }} />

              {/* Theme toggle row */}
              <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px",
                  borderRadius: 0,
                  border: "2px solid var(--border-card)",
                  background: "var(--bg-card)",
                  cursor: "pointer",
                  marginBottom: 8,
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 800,
                  fontSize: "0.93rem",
                  color: "#000000",
                  transition: "all 0.2s",
                  boxShadow: "2px 2px 0px var(--border-card)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", fontSize: "1.05rem" }}>
                  {isDark ? <FaSun /> : <FaMoon />}
                </span>
                {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </motion.button>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 }}
              >
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <button style={{
                    width: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 8,
                    padding: "12px",
                    borderRadius: 0,
                    border: "2px solid var(--border-card)",
                    cursor: "pointer",
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "var(--bg-primary)",
                    background: "var(--cyan)",
                    boxShadow: "2px 2px 0px var(--border-card)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translate(2px, 2px)";
                    e.currentTarget.style.boxShadow = "0px 0px 0px var(--border-card)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translate(0px, 0px)";
                    e.currentTarget.style.boxShadow = "2px 2px 0px var(--border-card)";
                  }}
                  >
                    <Zap size={15} strokeWidth={2.5} />
                    Hire Me — Let's Talk!
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;