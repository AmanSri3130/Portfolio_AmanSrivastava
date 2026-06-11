import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp, FaBolt } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const footerLinks = [
  { to: "/",         label: "Home" },
  { to: "/about",    label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog",     label: "Blog" },
  { to: "/contact",  label: "Contact" },
];

const socials = [
  {
    icon: <FaGithub />,
    href: "https://github.com/AmanSri3130",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/amansri3130",
    label: "LinkedIn",
  },
  {
    icon: <FaEnvelope />,
    href: "mailto:amankinnie31@gmail.com",
    label: "Email",
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer style={{
      position: "relative",
      background: "#171e19",
      borderTop: "2px solid #000000",
      marginTop: 0,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 28px 32px" }}>
        {/* Main footer grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40, marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36,
                backgroundColor: "#ffe17c",
                border: "2px solid #000000",
                display: "flex", alignItems: "center", justifyItems: "center",
                justifyContent: "center",
                fontWeight: 900, fontSize: "1rem", color: "#000000",
                boxShadow: "2px 2px 0px #000000"
              }}>
                <FaBolt />
              </div>
              <span className="font-cabinet" style={{
                fontWeight: 900, fontSize: "1.2rem",
                color: "#ffffff"
              }}>
                Aman Srivastava
              </span>
            </div>
            <p className="font-satoshi" style={{ color: "#b7c6c2", fontSize: "0.88rem", lineHeight: 1.7, maxWidth: 240, fontWeight: 500 }}>
              MERN Developer · Python · AI &amp; Data Science student building modern, robust solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-cabinet" style={{
              color: "#ffffff", fontWeight: 800,
              fontSize: "0.95rem", marginBottom: 16,
            }}>
              Navigation
            </h3>
            <ul className="font-satoshi" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} style={{ color: "#b7c6c2", textDecoration: "none", fontSize: "0.88rem", fontWeight: 600 }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-cabinet" style={{
              color: "#ffffff", fontWeight: 800,
              fontSize: "0.95rem", marginBottom: 16,
            }}>
              Connect
            </h3>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  style={{
                    width: 32, height: 32,
                    backgroundColor: "#272727",
                    border: "1.5px solid #000000",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#ffffff", borderRadius: 4, textDecoration: "none",
                    boxShadow: "2px 2px 0px #000000"
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="font-satoshi" style={{ color: "#b7c6c2", fontSize: "0.82rem", fontWeight: 700 }}>
              Open to work &amp; collaboration 🚀
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: "2px",
          background: "#000000",
          marginBottom: 28,
        }} />

        {/* Bottom bar */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center",
          gap: 16,
        }}>
          <p className="font-satoshi" style={{ color: "#b7c6c2", fontSize: "0.82rem", fontWeight: 500 }}>
            © {new Date().getFullYear()} Aman Srivastava. Made with{" "}
            <FaHeart style={{ color: "#ec4899", display: "inline", verticalAlign: "middle" }} />{" "}
            and React.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: 2, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: 6,
              background: "#ffffff",
              border: "2px solid #000000",
              color: "#000000", cursor: "pointer",
              fontSize: "0.82rem", fontWeight: 800,
              fontFamily: "'Satoshi', sans-serif",
              boxShadow: "2px 2px 0px #000000",
            }}
          >
            <FaArrowUp /> Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;