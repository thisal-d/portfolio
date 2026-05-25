import React from "react";
import "../styles/Hero.css";

const Hero = () => (
  <section className="hero-section">
    <div className="hero-content">
      <div className="hero-text">
        <p className="hero-label">Portfolio</p>
        <h1 className="hero-title">
          Hi, I'm <span>Thisal Dilmith</span> 👋
        </h1>
        <p className="hero-tagline">
          <span className="tag">Python Developer</span>
          <span className="tag">Open Source</span>
          <span className="tag">UI Explorer</span>
        </p>
        <p className="hero-description">
          I build helpful tools, libraries, and apps — mostly in Python but also across the full stack. 
          I enjoy contributing to open source and experimenting with new tech. 
          Take a look at my projects below!
        </p>
        <div className="hero-actions">
          <a href="/projects" className="btn-primary">
            View Projects
          </a>
          <a
            href="https://github.com/thisal-d"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub Profile
          </a>
        </div>
      </div>

      <div className="hero-profile-image">
        <img src="/images/profile.jpg" alt="Thisal Dilmith" />
      </div>
    </div>
  </section>
);

export default Hero;