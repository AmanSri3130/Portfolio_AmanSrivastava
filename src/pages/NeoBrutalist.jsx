import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaCheck, FaXmark, FaGithub, FaLinkedin, FaTwitter, 
  FaGlobe, FaArrowRight, FaStar, FaBolt, FaChevronRight,
  FaLayerGroup, FaChartLine, FaRobot, FaLock, FaUsers, 
  FaArrowUp, FaQuoteLeft
} from "react-icons/fa6";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import NeoBrutalist3D from "../components/NeoBrutalist3D";

// Dummy chart data for Browser Mockup Dashboard
const chartData = [
  { name: "Jan", Revenue: 4000, Users: 1200 },
  { name: "Feb", Revenue: 9000, Users: 1800 },
  { name: "Mar", Revenue: 16000, Users: 2400 },
  { name: "Apr", Revenue: 13000, Users: 2200 },
  { name: "May", Revenue: 24000, Users: 3100 },
  { name: "Jun", Revenue: 38000, Users: 4500 },
  { name: "Jul", Revenue: 49000, Users: 5200 },
];

const NeoBrutalist = () => {
  const [activeTab, setActiveTab] = useState("revenue");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="neo-brutalist-page min-h-screen relative overflow-hidden" style={{ background: "#171e19" }}>
      
      {/* ── NAVIGATION ─────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "80px",
        backgroundColor: "#ffe17c", borderBottom: "2px solid #000000",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: "36px", height: "36px", backgroundColor: "#000000",
            display: "flex", alignItems: "center", justifyItems: "center",
            justifyContent: "center", border: "2px solid #000000"
          }}>
            <FaBolt style={{ color: "#ffe17c", fontSize: "1.1rem" }} />
          </div>
          <span className="font-cabinet" style={{ fontSize: "1.5rem", fontWeight: 900, color: "#000000" }}>
            STITCH<span style={{ fontSize: "1.1rem", verticalAlign: "super" }}>3D</span>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex font-satoshi" style={{ gap: 32, fontWeight: 700 }}>
          <a href="#problem" style={{ color: "#000000", textDecoration: "none" }}>Problems</a>
          <a href="#features" style={{ color: "#000000", textDecoration: "none" }}>Features</a>
          <a href="#how-it-works" style={{ color: "#000000", textDecoration: "none" }}>Workflow</a>
          <a href="#personas" style={{ color: "#000000", textDecoration: "none" }}>Audience</a>
          <a href="#testimonials" style={{ color: "#000000", textDecoration: "none" }}>Reviews</a>
        </div>

        {/* Start Free Trial Button */}
        <div>
          <a href="#signup" className="btn-nb-push shadow-nb-sm" style={{ padding: "10px 20px", fontSize: "0.9rem" }}>
            Start Free Trial
          </a>
        </div>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────── */}
      <section className="bg-nb-yellow-dots border-b-2 border-black" style={{ padding: "150px 24px 100px", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 48,
            alignItems: "center"
          }}>
            
            {/* Left: Text & badges */}
            <div>
              <div className="border-nb font-satoshi" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                backgroundColor: "#ffffff", padding: "6px 16px", borderRadius: "100px",
                fontSize: "0.85rem", fontWeight: 800, marginBottom: 24,
                boxShadow: "2px 2px 0px #000000"
              }}>
                <span style={{
                  backgroundColor: "#ec4899", color: "#ffffff", padding: "2px 8px",
                  borderRadius: "100px", fontSize: "0.75rem", fontWeight: 900
                }}>NEW</span>
                AI-Driven 3D Canvas Assistant 2.0
              </div>

              <h1 className="font-cabinet" style={{
                fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                color: "#000000",
                marginBottom: 24
              }}>
                Build Stunning <br />
                <span className="text-stroke-nb">3D Websites</span> <br />
                Without Code.
              </h1>

              <p className="font-satoshi" style={{
                fontSize: "1.15rem", color: "#171e19", lineHeight: 1.6,
                fontWeight: 500, marginBottom: 36, maxWidth: 500
              }}>
                Stitch3D empowers teams to design, animate, and deploy immersive 3D SaaS mockups and interfaces in minutes. No webgl expertise required.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#features" className="btn-nb-push-large shadow-nb-lg" style={{ padding: "16px 32px", fontSize: "1.05rem" }}>
                  Explore Templates <FaArrowRight style={{ marginLeft: 8 }} />
                </a>
                <a href="#how-it-works" className="btn-nb-push-white shadow-nb-sm" style={{ padding: "16px 32px", fontSize: "1.05rem" }}>
                  Watch Demo
                </a>
              </div>
            </div>

            {/* Right: 3D interactive Canvas & Browser Mockup */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* R3F Canvas Container */}
              <div className="border-nb shadow-nb-lg" style={{
                backgroundColor: "#ffffff", borderRadius: "12px", padding: "16px",
                position: "relative", minHeight: "360px",
                backgroundImage: "radial-gradient(#b7c6c2 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}>
                <div style={{
                  position: "absolute", top: "12px", left: "16px",
                  fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase",
                  backgroundColor: "#ffe17c", padding: "2px 8px", border: "1.5px solid #000"
                }}>
                  3D Workspace (Interact by Dragging/Hovering)
                </div>
                <NeoBrutalist3D />
              </div>

              {/* Browser Mockup */}
              <div className="border-nb shadow-nb-xl" style={{
                backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden"
              }}>
                {/* Header Bar */}
                <div style={{
                  backgroundColor: "#000000", height: "40px", padding: "0 16px",
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  {/* Three Circles */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f57" }}></div>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#febc2e" }}></div>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#28c840" }}></div>
                  </div>
                  {/* Mock URL bar */}
                  <div className="font-satoshi" style={{
                    backgroundColor: "#171e19", color: "#b7c6c2", fontSize: "0.75rem",
                    padding: "3px 40px", borderRadius: "4px", fontWeight: 500
                  }}>
                    stitch3d.io/dashboard/analytics
                  </div>
                  <div style={{ width: "36px" }}></div>
                </div>

                {/* Dashboard Mockup Content */}
                <div style={{ padding: "20px", background: "#f8f9fa" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginBottom: 16 }}>
                    
                    {/* Left Column: Metric summary */}
                    <div className="border-nb" style={{ backgroundColor: "#b7c6c2", padding: "16px", borderRadius: "8px" }}>
                      <h4 className="font-cabinet" style={{ fontSize: "0.9rem", fontWeight: 800 }}>Metrics Overview</h4>
                      <p style={{ fontSize: "0.7rem", color: "#171e19", margin: "4px 0 12px" }}>Real-time updates</p>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <button 
                          onClick={() => setActiveTab("revenue")} 
                          className="border-nb font-satoshi" 
                          style={{
                            width: "100%", padding: "6px", fontSize: "0.8rem", fontWeight: 700,
                            backgroundColor: activeTab === "revenue" ? "#ffe17c" : "#ffffff",
                            textAlign: "left", cursor: "pointer", borderRadius: "4px"
                          }}
                        >
                          💸 Monthly Revenue
                        </button>
                        <button 
                          onClick={() => setActiveTab("users")} 
                          className="border-nb font-satoshi" 
                          style={{
                            width: "100%", padding: "6px", fontSize: "0.8rem", fontWeight: 700,
                            backgroundColor: activeTab === "users" ? "#ffe17c" : "#ffffff",
                            textAlign: "left", cursor: "pointer", borderRadius: "4px"
                          }}
                        >
                          👥 Active Users
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Recharts live data */}
                    <div className="border-nb" style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span className="font-cabinet" style={{ fontSize: "0.9rem", fontWeight: 900 }}>
                          {activeTab === "revenue" ? "REVENUE: $49,000 / mo" : "ACTIVE USERS: 5,200 total"}
                        </span>
                        <span style={{ fontSize: "0.75rem", backgroundColor: "#ffe17c", padding: "2px 6px", fontWeight: 700, border: "1px solid #000" }}>
                          +24.8%
                        </span>
                      </div>
                      
                      <div style={{ width: "100%", height: "130px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffe17c" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ffe17c" stopOpacity={0.0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#171e19" fontSize={9} tickLine={false} />
                            <YAxis stroke="#171e19" fontSize={9} tickLine={false} />
                            <Tooltip contentStyle={{ background: "#ffffff", border: "2px solid #000", fontFamily: "Satoshi" }} />
                            <Area type="monotone" dataKey={activeTab === "revenue" ? "Revenue" : "Users"} stroke="#000000" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                  </div>

                  {/* Bottom bar inside dashboard mockup */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    {["Templates", "Component Sync", "CDN Export"].map((label, idx) => (
                      <div key={idx} className="border-nb" style={{
                        backgroundColor: "#ffffff", padding: "10px", borderRadius: "6px",
                        textAlign: "center", fontSize: "0.75rem", fontWeight: 700
                      }}>
                        {label}
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF MARQUEE ───────────────────────── */}
      <section style={{ backgroundColor: "#171e19", borderBottom: "2px solid #000000", padding: "20px 0", overflow: "hidden" }}>
        <div className="marquee-content-nb" style={{ display: "flex", gap: 64, whiteSpace: "nowrap" }}>
          {/* First loop */}
          {["GLOBEX CO", "ACME CORP", "INITECH LTD", "UMBRELLA INC", "HULI LABS", "STARK INDUSTRIES", "CHOAM CORP", "VANDELAY IND"].map((brand, i) => (
            <div key={i} className="font-cabinet" style={{
              fontSize: "1.6rem", fontWeight: 800, color: "#b7c6c2", opacity: 0.65,
              display: "flex", alignItems: "center", gap: 16
            }}>
              <span>✦</span> {brand}
            </div>
          ))}
          {/* Duplicate loop for infinite seamlesness */}
          {["GLOBEX CO", "ACME CORP", "INITECH LTD", "UMBRELLA INC", "HULI LABS", "STARK INDUSTRIES", "CHOAM CORP", "VANDELAY IND"].map((brand, i) => (
            <div key={`dup-${i}`} className="font-cabinet" style={{
              fontSize: "1.6rem", fontWeight: 800, color: "#b7c6c2", opacity: 0.65,
              display: "flex", alignItems: "center", gap: 16
            }}>
              <span>✦</span> {brand}
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM VS SOLUTION ───────────────────────── */}
      <section id="problem" style={{ backgroundColor: "#ffffff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="border-nb font-satoshi" style={{
              backgroundColor: "#b7c6c2", color: "#000000", padding: "4px 14px",
              borderRadius: "50px", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em",
            }}>
              THE STRUGGLE
            </span>
            <h2 className="font-cabinet" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, marginTop: 12 }}>
              Why 3D Web Design Usually Sucks
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            
            {/* Card A: Problem */}
            <div className="border-nb" style={{
              backgroundColor: "#f4f4f5", borderStyle: "dashed", opacity: 0.75,
              padding: "40px 32px", borderRadius: "16px"
            }}>
              <div style={{
                width: "48px", height: "48px", backgroundColor: "#ff5f57", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #000",
                fontSize: "1.2rem", fontWeight: 900, color: "#fff", marginBottom: 24
              }}>
                <FaXmark />
              </div>
              <h3 className="font-cabinet" style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: 16 }}>
                The Traditional Chaos
              </h3>
              
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.95rem", fontWeight: 500 }}>
                  <FaXmark style={{ color: "#ff5f57", marginTop: 4, flexShrink: 0 }} />
                  <span>Writing thousands of lines of complex boilerplate WebGL and math code.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.95rem", fontWeight: 500 }}>
                  <FaXmark style={{ color: "#ff5f57", marginTop: 4, flexShrink: 0 }} />
                  <span>Heavy performance lags and memory leaks crashing client browsers.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.95rem", fontWeight: 500 }}>
                  <FaXmark style={{ color: "#ff5f57", marginTop: 4, flexShrink: 0 }} />
                  <span>Desynchronization between UI mockups and actual interactive models.</span>
                </li>
              </ul>
            </div>

            {/* Card B: Solution */}
            <div className="border-nb shadow-nb-lg" style={{
              backgroundColor: "#ffe17c", padding: "40px 32px", borderRadius: "16px"
            }}>
              <div style={{
                width: "48px", height: "48px", backgroundColor: "#28c840", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #000",
                fontSize: "1.2rem", fontWeight: 900, color: "#fff", marginBottom: 24
              }}>
                <FaCheck />
              </div>
              <h3 className="font-cabinet" style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: 16 }}>
                The Stitch3D Solution
              </h3>

              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.95rem", fontWeight: 700 }}>
                  <FaCheck style={{ color: "#000000", marginTop: 4, flexShrink: 0 }} />
                  <span>Visually drag-and-drop elements with instant JSX component generation.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.95rem", fontWeight: 700 }}>
                  <FaCheck style={{ color: "#000000", marginTop: 4, flexShrink: 0 }} />
                  <span>Optimized WebGL buffers built-in, offering constant 60 FPS performance.</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.95rem", fontWeight: 700 }}>
                  <FaCheck style={{ color: "#000000", marginTop: 4, flexShrink: 0 }} />
                  <span>Live bidirectional synchronizer keeps designs and source code aligned.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURE GRID ────────────────────────────────── */}
      <section id="features" className="bg-nb-yellow-dots border-y-2 border-black" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="border-nb font-satoshi" style={{
              backgroundColor: "#ffffff", color: "#000000", padding: "4px 14px",
              borderRadius: "50px", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em",
            }}>
              CAPABILITIES
            </span>
            <h2 className="font-cabinet" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, marginTop: 12 }}>
              Feature Pack & Toolkit
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              {
                icon: <FaLayerGroup />,
                title: "Asymmetric Layouts",
                desc: "Combine absolute geometric panels, heavy hard borders, and responsive grid layouts smoothly."
              },
              {
                icon: <FaChartLine />,
                title: "Live Stats Sync",
                desc: "Inject live database API feeds to render SVG-based Neo-Brutalist charts and visualizations."
              },
              {
                icon: <FaRobot />,
                title: "AI Co-pilot Assistant",
                desc: "Prompt in plain English to alter materials, rotations, lighting configurations, or shaders on the fly."
              },
              {
                icon: <FaLock />,
                title: "End-to-End Encryption",
                desc: "Keep private assets, meshes, and enterprise design tokens locked down with military-grade SSL keys."
              },
              {
                icon: <FaUsers />,
                title: "Multiplayer Co-authoring",
                desc: "Design in real-time alongside team members with shared selection tools and immediate client previews."
              },
              {
                icon: <FaGlobe />,
                title: "One-Click Deployments",
                desc: "Export as highly-efficient standalone bundles or host directly on our global edge-mesh CDN."
              }
            ].map((feat, i) => (
              <div key={i} className="border-nb shadow-nb-sm" style={{
                backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px",
                transition: "all 0.2s"
              }}>
                {/* Icon box that changes on hover styling can be handled via React mouse states */}
                <FeatureCardInner icon={feat.icon} title={feat.title} desc={feat.desc} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section id="how-it-works" style={{ backgroundColor: "#171e19", color: "#ffffff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <span className="border-nb font-satoshi" style={{
              backgroundColor: "#ffe17c", color: "#000000", padding: "4px 14px",
              borderRadius: "50px", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em",
            }}>
              WORKFLOW
            </span>
            <h2 className="font-cabinet" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, color: "#ffffff", marginTop: 12 }}>
              Three Steps to Production
            </h2>
          </div>

          {/* Horizontal Flow Container */}
          <div style={{ position: "relative" }}>
            
            {/* Connecting horizontal line (visible on larger displays) */}
            <div className="hidden md:block" style={{
              position: "absolute", top: "48px", left: "10%", right: "10%",
              height: "4px", backgroundColor: "#272727", zIndex: 0
            }} />

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 40,
              position: "relative",
              zIndex: 1
            }}>
              {[
                { step: "01", glow: "#b7c6c2", title: "Select Geometry", desc: "Drag pre-optimized 3D meshes or import your own OBJ/GLTF CAD designs into the infinite viewport canvas." },
                { step: "02", glow: "#ffe17c", title: "Inject Styles", desc: "Customize layouts with heavy solid borders, vibrant Neo-Brutalist shadow presets, and modern Satoshi typography." },
                { step: "03", glow: "#ffffff", title: "Deploy Live", desc: "Click deploy to export your page as optimized React components or upload it directly to high-speed hosting nodes." }
              ].map((item, idx) => (
                <div key={idx} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {/* Circle Step */}
                  <div className="border-nb" style={{
                    width: "96px", height: "96px", borderRadius: "50%",
                    backgroundColor: "#171e19", display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 0 20px ${item.glow}25`, border: `4px solid ${item.glow}`,
                    fontFamily: "Cabinet Grotesk", fontSize: "2rem", fontWeight: 900, color: item.glow,
                    marginBottom: 24
                  }}>
                    {item.step}
                  </div>
                  
                  <h3 className="font-cabinet" style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                    {item.title}
                  </h3>
                  
                  <p className="font-satoshi" style={{ fontSize: "0.95rem", color: "#b7c6c2", lineHeight: 1.6, maxWidth: 280 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── USE CASE PERSONAS ──────────────────────────── */}
      <section id="personas" style={{ backgroundColor: "#ffffff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="border-nb font-satoshi" style={{
              backgroundColor: "#ffe17c", color: "#000000", padding: "4px 14px",
              borderRadius: "50px", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em",
            }}>
              WHO IS IT FOR?
            </span>
            <h2 className="font-cabinet" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, marginTop: 12 }}>
              Built for Modern Product Teams
            </h2>
          </div>

          {/* Bento-style Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24
          }}>
            
            {/* Persona 1: Sage card */}
            <div className="border-nb" style={{
              backgroundColor: "#b7c6c2", padding: "40px 32px", borderRadius: "16px",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "340px"
            }}>
              <div>
                <span className="border-nb font-satoshi" style={{
                  backgroundColor: "#ffffff", color: "#000000", padding: "4px 12px",
                  borderRadius: "100px", fontSize: "0.75rem", fontWeight: 800, display: "inline-block",
                  marginBottom: 24, boxShadow: "2px 2px 0px #000000"
                }}>
                  UI/UX DESIGNERS
                </span>
                <h3 className="font-cabinet" style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
                  Unleash your visual creativity
                </h3>
                <p className="font-satoshi" style={{ fontSize: "1rem", color: "#171e19", lineHeight: 1.5 }}>
                  Break free from mundane, boring grid cards. Experiment with real 3D assets directly inside canvas layouts without writing a single shader.
                </p>
              </div>
              <div className="font-satoshi" style={{ fontWeight: 800, fontSize: "0.9rem", marginTop: 24 }}>
                DESIGN PRESSETS INCLUDED →
              </div>
            </div>

            {/* Persona 2: Yellow Card with hard shadow */}
            <div className="border-nb shadow-nb-lg" style={{
              backgroundColor: "#ffe17c", padding: "40px 32px", borderRadius: "16px",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "340px"
            }}>
              <div>
                <span className="border-nb font-satoshi" style={{
                  backgroundColor: "#ffffff", color: "#000000", padding: "4px 12px",
                  borderRadius: "100px", fontSize: "0.75rem", fontWeight: 800, display: "inline-block",
                  marginBottom: 24, boxShadow: "2px 2px 0px #000000"
                }}>
                  SAAS FOUNDERS
                </span>
                <h3 className="font-cabinet" style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
                  Launch landing pages that convert
                </h3>
                <p className="font-satoshi" style={{ fontSize: "1rem", color: "#171e19", lineHeight: 1.5 }}>
                  Wow early-stage investors and prospective users instantly. Showcase mockups that look futuristic, professional, and interactive.
                </p>
              </div>
              <div className="font-satoshi" style={{ fontWeight: 800, fontSize: "0.9rem", marginTop: 24 }}>
                10x CONVERSION RATES →
              </div>
            </div>

            {/* Persona 3: Dark gray card */}
            <div className="border-nb" style={{
              backgroundColor: "#272727", color: "#ffffff", padding: "40px 32px", borderRadius: "16px",
              display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "340px"
            }}>
              <div>
                <span className="border-nb font-satoshi" style={{
                  backgroundColor: "#ffffff", color: "#000000", padding: "4px 12px",
                  borderRadius: "100px", fontSize: "0.75rem", fontWeight: 800, display: "inline-block",
                  marginBottom: 24, boxShadow: "2px 2px 0px #000000"
                }}>
                  FRONTEND DEVS
                </span>
                <h3 className="font-cabinet" style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, marginBottom: 16 }}>
                  Export production-ready JSX
                </h3>
                <p className="font-satoshi" style={{ fontSize: "1rem", color: "#b7c6c2", lineHeight: 1.5 }}>
                  Clean, structured React code generated automatically. Fully integrated with standard Tailwind configurations and Vite compilation pipelines.
                </p>
              </div>
              <div className="font-satoshi" style={{ fontWeight: 800, fontSize: "0.9rem", color: "#ffe17c", marginTop: 24 }}>
                VIEW API DOCUMENTATION →
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section id="testimonials" style={{ backgroundColor: "#b7c6c2", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="border-nb font-satoshi" style={{
              backgroundColor: "#ffffff", color: "#000000", padding: "4px 14px",
              borderRadius: "50px", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em",
            }}>
              TESTIMONIALS
            </span>
            <h2 className="font-cabinet" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, marginTop: 12 }}>
              Loved by Elite Teams
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 32 }}>
            {[
              {
                quote: "Stitch3D completely revamped our sales pipeline. Being able to show interactive 3D SaaS mockups rather than boring static screen captures increased close rates by 40%.",
                user: "Sarah Jenkins",
                role: "VP of Growth, Globex",
                stars: 5
              },
              {
                quote: "The React Three Fiber generation is incredibly clean. I usually hate no-code tools, but Stitch3D outputs pure, structured components that fit directly into our workspace.",
                user: "Marcus Chen",
                role: "Lead Developer, Acme Labs",
                stars: 5
              },
              {
                quote: "The aesthetic of this Neo-Brutalist interface is spectacular. We customized the theme in minutes, added our branding variables, and pushed to our domain in one click.",
                user: "Elena Rostova",
                role: "Creative Director, Huli",
                stars: 5
              }
            ].map((item, idx) => (
              <div key={idx} className="border-nb shadow-nb-lg" style={{
                backgroundColor: "#ffffff",
                padding: "36px",
                // Asymmetric rounding: Top-Right & Bottom-Left are 3xl (24px), others are 2px
                borderRadius: "2px 24px 2px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  {/* Star Rating */}
                  <div style={{ display: "flex", gap: 4, color: "#ffbc2e", marginBottom: 20 }}>
                    {[...Array(item.stars)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  
                  {/* Quote icon */}
                  <FaQuoteLeft style={{ fontSize: "1.4rem", color: "#b7c6c2", marginBottom: 12 }} />
                  
                  <p className="font-satoshi" style={{
                    fontSize: "0.95rem", color: "#171e19", lineHeight: 1.6,
                    fontWeight: 500, fontStyle: "italic", marginBottom: 24
                  }}>
                    "{item.quote}"
                  </p>
                </div>

                <div style={{ borderTop: "1.5px solid #000000", paddingTop: 16 }}>
                  <h4 className="font-cabinet" style={{ fontSize: "1.05rem", fontWeight: 800, color: "#000000" }}>
                    {item.user}
                  </h4>
                  <p className="font-satoshi" style={{ fontSize: "0.8rem", color: "#b7c6c2", fontWeight: 700, marginTop: 2 }}>
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FINAL CTA SECTION ──────────────────────────── */}
      <section id="signup" className="bg-nb-yellow-dots border-b-2 border-black" style={{ padding: "120px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          
          <span className="border-nb font-satoshi" style={{
            backgroundColor: "#ffffff", color: "#000000", padding: "4px 14px",
            borderRadius: "50px", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.05em",
          }}>
            GET INSTANT ACCESS
          </span>

          <h2 className="font-cabinet" style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1,
            marginTop: 20,
            marginBottom: 24
          }}>
            Ready to Build the Future? <br />
            Start in 60 Seconds.
          </h2>

          <p className="font-satoshi" style={{
            fontSize: "1.1rem", color: "#171e19", fontWeight: 500,
            lineHeight: 1.6, marginBottom: 40, maxWidth: 550, margin: "0 auto 40px"
          }}>
            Join over 12,000+ developers, creators, and SaaS founders building high-converting 3D interfaces daily. No credit card required.
          </p>

          {/* Inline Signup form */}
          <form onSubmit={handleSubscribe} style={{
            display: "flex", flexWrap: "wrap", gap: 12,
            justifyContent: "center", maxWidth: "560px", margin: "0 auto"
          }}>
            <input 
              type="email" 
              placeholder="Enter your professional email..." 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-nb font-satoshi"
              style={{
                flex: "1 1 300px", padding: "16px 20px", borderRadius: "8px",
                fontSize: "1rem", outline: "none", boxShadow: "4px 4px 0px #000000"
              }}
            />
            <button type="submit" className="btn-nb-push shadow-nb-sm" style={{ padding: "16px 32px", fontSize: "1rem" }}>
              Start Building Now
            </button>
          </form>

          {subscribed && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#28c840", fontWeight: 700, marginTop: 16 }}
            >
              🎉 Success! Welcome to Stitch3D!
            </motion.p>
          )}

        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#171e19", color: "#ffffff", padding: "80px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 48,
            marginBottom: 60
          }}>
            
            {/* Col 1: Branding */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: "32px", height: "32px", backgroundColor: "#ffe17c",
                  display: "flex", alignItems: "center", justifyItems: "center",
                  justifyContent: "center", border: "2px solid #000000"
                }}>
                  <FaBolt style={{ color: "#000000", fontSize: "1rem" }} />
                </div>
                <span className="font-cabinet" style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ffffff" }}>
                  STITCH3D
                </span>
              </div>
              <p className="font-satoshi" style={{ fontSize: "0.85rem", color: "#b7c6c2", lineHeight: 1.6 }}>
                Crafting the future of visual web elements using modular 3D interfaces and Neo-Brutalist design tokens.
              </p>
            </div>

            {/* Col 2: Product */}
            <div>
              <h4 className="font-cabinet" style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: 20 }}>
                PRODUCT
              </h4>
              <div className="font-satoshi" style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "0.85rem" }}>
                <a href="#features" style={{ color: "#b7c6c2", textDecoration: "none" }}>Features</a>
                <a href="#templates" style={{ color: "#b7c6c2", textDecoration: "none" }}>Templates</a>
                <a href="#pricing" style={{ color: "#b7c6c2", textDecoration: "none" }}>Pricing Plans</a>
                <a href="#changelog" style={{ color: "#b7c6c2", textDecoration: "none" }}>Changelog</a>
              </div>
            </div>

            {/* Col 3: Resources */}
            <div>
              <h4 className="font-cabinet" style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: 20 }}>
                RESOURCES
              </h4>
              <div className="font-satoshi" style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "0.85rem" }}>
                <a href="#docs" style={{ color: "#b7c6c2", textDecoration: "none" }}>API Docs</a>
                <a href="#tutorials" style={{ color: "#b7c6c2", textDecoration: "none" }}>Video Guides</a>
                <a href="#blog" style={{ color: "#b7c6c2", textDecoration: "none" }}>Dev Blog</a>
                <a href="#support" style={{ color: "#b7c6c2", textDecoration: "none" }}>Help Desk</a>
              </div>
            </div>

            {/* Col 4: Community / Socials */}
            <div>
              <h4 className="font-cabinet" style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: 20 }}>
                COMMUNITY
              </h4>
              <p className="font-satoshi" style={{ fontSize: "0.85rem", color: "#b7c6c2", marginBottom: 16 }}>
                Follow us for design showcases and updates.
              </p>
              
              {/* Social icons: 10x10 squares (#272727) with light gray borders */}
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { icon: <FaTwitter />, url: "https://twitter.com" },
                  { icon: <FaGithub />, url: "https://github.com" },
                  { icon: <FaLinkedin />, url: "https://linkedin.com" },
                  { icon: <FaGlobe />, url: "https://google.com" }
                ].map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="border-nb"
                    style={{
                      width: "36px", height: "36px", backgroundColor: "#272727",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#b7c6c2", textDecoration: "none", borderRadius: "4px",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffe17c";
                      e.currentTarget.style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#272727";
                      e.currentTarget.style.color = "#b7c6c2";
                    }}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom section */}
          <div style={{
            borderTop: "2px solid #272727", paddingTop: 30,
            display: "flex", flexWrap: "wrap", justifyContent: "space-between",
            alignItems: "center", gap: 16
          }}>
            <p className="font-satoshi" style={{ fontSize: "0.8rem", color: "#b7c6c2" }}>
              © 2026 STITCH3D. All rights reserved. Created for Aman's Developer Showcase.
            </p>
            <div className="font-satoshi" style={{ display: "flex", gap: 24, fontSize: "0.8rem" }}>
              <a href="#privacy" style={{ color: "#b7c6c2", textDecoration: "none" }}>Privacy Policy</a>
              <a href="#terms" style={{ color: "#b7c6c2", textDecoration: "none" }}>Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

// Sub-component for features card to handle hover color shifts
const FeatureCardInner = ({ icon, title, desc }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 16x16 icon box in #b7c6c2 that turns #ffe17c on hover */}
      <div className="border-nb" style={{
        width: "48px", height: "48px",
        backgroundColor: hovered ? "#ffe17c" : "#b7c6c2",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.4rem", color: "#000000", borderRadius: "6px",
        marginBottom: 20, transition: "background-color 0.2s"
      }}>
        {icon}
      </div>
      <h3 className="font-cabinet" style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: 12 }}>
        {title}
      </h3>
      <p className="font-satoshi" style={{ fontSize: "0.9rem", color: "#171e19", lineHeight: 1.6, fontWeight: 500 }}>
        {desc}
      </p>
    </div>
  );
};

export default NeoBrutalist;
