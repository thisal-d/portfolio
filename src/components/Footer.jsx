import React from "react";
import contactData from "../data/contact.json";
import "../styles/Footer.css";

const socialLinks = contactData.socials;

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      {/* Brand */}
      <div className="footer-brand">
        <p className="footer-brand-title">Thisal Dilmith</p>
        <p className="footer-brand-desc">
          Python developer & open source enthusiast. Building libraries, apps, and platforms
          that actually solve problems. Curious about everything tech.
        </p>
      </div>

      {/* Social */}
      <div>
        <p className="footer-social-title">Find me online</p>
        <div className="footer-social-links">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <img src={link.icon} alt={link.name} className="footer-social-icon" />
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      © {new Date().getFullYear()} <span>Thisal Dilmith</span> · Built with React & ❤️
    </div>
  </footer>
);

export default Footer;