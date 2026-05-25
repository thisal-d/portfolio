import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <NavLink to="/" className="header-brand">
        <img src="/logo/blue.png" alt="Who Am I Logo" className="header-logo" />
        <div className="header-title">Who Am I</div>
      </NavLink>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      <nav className={`header-links-container ${menuOpen ? "active" : ""}`}>
        <ul className="header-links">
          <li><NavLink className="header-link" to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink className="header-link" to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink className="header-link" to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink></li>
          <li><NavLink className="header-link" to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
