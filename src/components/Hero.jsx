import React, { useEffect, useRef } from "react";
import "../styles/Hero.css";

/* ── Scroll-reveal hook ── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* small RAF delay so CSS is painted first */
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("revealed");
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return ref;
}

/* ── Decorative terminal code lines ── */
const CODE_LINES = [
  { indent: 0, token: "keyword",  text: "@staticmethod",       suffix: ""                              },
  { indent: 0, token: "fn",       text: "def",                  suffix: " theme_tracker() -> None:"     },
  { indent: 1, token: "comment",  text: "# auto-sync theme across all chart widgets", suffix: ""       },
  { indent: 1, token: "keyword",  text: "while",                suffix: " ThemeManager.child_objects:"  },
  { indent: 2, token: "var",      text: "current_theme",        suffix: " = ctk.get_appearance_mode()"  },
  { indent: 2, token: "keyword",  text: "if",                   suffix: " current_theme != ThemeManager.theme:" },
  { indent: 3, token: "var",      text: "ThemeManager.theme",   suffix: " = current_theme"              },
  { indent: 3, token: "keyword",  text: "for",                  suffix: " widget in ThemeManager.child_objects:" },
  { indent: 4, token: "keyword",  text: "try:",                 suffix: ""                              },
  { indent: 5, token: "var",      text: "widget",               suffix: ".__configure_theme_mode()"     },
  { indent: 4, token: "keyword",  text: "except",               suffix: " Exception as e:"              },
  { indent: 5, token: "fn",       text: "print",                suffix: "(f\"[ThemeManager] {e}\")"     },
  { indent: 2, token: "fn",       text: "time",                 suffix: ".sleep(1)"                     },
  { indent: 0, token: "comment",  text: ""                     , suffix: ""                             },
  { indent: 0, token: "var",      text: "ThemeManager.running_state", suffix: " = False"               },
];

const STATS = [
  { value: "8+",  label: "Projects Shipped"  },
  { value: "5+",  label: "PyPI Packages"     },
  { value: "3+",  label: "Years Building"    },
];

const Hero = () => {
  const leftRef  = useReveal(0);
  const rightRef = useReveal(120);
  const statsRef = useReveal(240);

  return (
    <section className="hero-section" aria-label="Introduction">

      {/* ── Main content row ── */}
      <div className="hero-content">

        {/* ── LEFT: Decorative terminal card ── */}
        <div className="hero-terminal-wrap reveal-left" ref={leftRef} aria-hidden="true">
          {/* Window chrome */}
          <div className="hero-terminal">
            <div className="hero-terminal-bar">
              <span className="hero-terminal-dot" style={{ background: "#ff5f57" }} />
              <span className="hero-terminal-dot" style={{ background: "#febc2e" }} />
              <span className="hero-terminal-dot" style={{ background: "#28c840" }} />
              <a
                href="https://github.com/thisal-d/ctkchart/blob/main/src/ctkchart/ThemeManager.py"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-terminal-filename hero-terminal-filename--link"
              >ctkchart / ThemeManager.py</a>
            </div>
            <pre className="hero-terminal-code">
              {CODE_LINES.map((line, i) => (
                <div key={i} className={`hero-code-line token-${line.token}`}>
                  {"\u00a0".repeat(line.indent * 2)}
                  <span className={`hero-token hero-token--${line.token}`}>{line.text}</span>
                  <span className="hero-token--suffix">{line.suffix}</span>
                </div>
              ))}
            </pre>
          </div>

          {/* Profile photo overlaid at bottom-right of terminal */}
          <div className="hero-avatar-wrap">
            <div className="hero-avatar-ring" />
            <img
              src="/images/profile.jpg"
              alt="Thisal Dilmith"
              className="hero-avatar"
              loading="eager"
            />
          </div>
        </div>

        {/* ── RIGHT: Headline, CTAs ── */}
        <div className="hero-text reveal-right" ref={rightRef}>

          <p className="hero-pre-label">
            <span className="hero-pre-label-dot" aria-hidden="true" />
            Available for opportunities
          </p>

          <h1 className="hero-title">
            I build end-to-end<br />
            <span className="hero-title-accent">engineering solutions.</span>
          </h1>

          <p className="hero-subtitle">
            Python developer &amp; open source contributor based in Sri Lanka.
            I ship libraries to PyPI, build full-stack web platforms, and take
            ideas from hardware prototype to production — because real problems
            rarely live on just one layer of the stack.
          </p>

          <div className="hero-chips" aria-label="Specialisations">
            {["Python", "Open Source", "Full Stack", "IoT", "PyPI Author"].map(t => (
              <span className="hero-chip" key={t}>{t}</span>
            ))}
          </div>

          <div className="hero-actions">
            <a href="/projects" className="btn btn-primary" id="hero-cta-projects">
              View Projects →
            </a>
            <a href="/contact" className="btn btn-secondary" id="hero-cta-contact">
              Get in Touch
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-resume"
              id="hero-cta-resume"
              aria-label="Download Thisal Dilmith's resume as a PDF (opens in new tab)"
              download="Thisal_Dilmith_Resume.pdf"
            >
              <svg
                className="btn-resume-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </a>
          </div>

          {/* Social proof micro-links */}
          <div className="hero-social-row">
            <a
              href="https://github.com/thisal-d"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub profile"
            >
              <img src="/icons/social/github.png" alt="" className="hero-social-icon" />
              GitHub
            </a>
            <span className="hero-social-sep" aria-hidden="true">·</span>
            <a
              href="https://www.linkedin.com/in/thisal-dilmith"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn profile"
            >
              <img src="/icons/social/linkedin.png" alt="" className="hero-social-icon" />
              LinkedIn
            </a>
            <span className="hero-social-sep" aria-hidden="true">·</span>
            <a
              href="https://pypi.org/user/Thisal_D/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="PyPI profile"
            >
              <img src="/icons/social/pypi.svg" alt="" className="hero-social-icon" />
              PyPI
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="hero-stats reveal-up" ref={statsRef} aria-label="Highlights">
        {STATS.map((s, i) => (
          <div className="hero-stat" key={i}>
            <span className="hero-stat-value">{s.value}</span>
            <span className="hero-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Hero;