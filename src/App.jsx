import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar              from "./components/Navbar";
import Loader              from "./components/Loader";
import ScrollProgress      from "./components/ScrollProgress";
import SplashCursor        from "./components/SplashCursor";
import ChatBot             from "./components/ChatBot";
import KeyboardShortcuts   from "./components/KeyboardShortcuts";
import CatCursor           from "./components/CatCursor";

import Home      from "./pages/Home";
import About     from "./pages/About";
import Contact   from "./pages/Contact";
import NotFound  from "./pages/NotFound";
import Projects  from "./components/Projects";
import Blog      from "./pages/Blog";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
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
      <CatCursor />
      <ScrollProgress />
      <Navbar />
      <ChatBot />
      <KeyboardShortcuts />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            border: "2px solid #000000",
            borderRadius: "8px",
            color: "#000000",
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 800,
            padding: "12px 16px",
            boxShadow: "4px 4px 0px #000000",
          },
          success: {
            iconTheme: { primary: "#4ade80", secondary: "#ffffff" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#ffffff" },
          },
        }}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about"    element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><Projects standalone /></PageWrapper>} />
          <Route path="/contact"  element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/blog"     element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="*"         element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;