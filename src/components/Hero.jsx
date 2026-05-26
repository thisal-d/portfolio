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
  { indent: 0, token: "keyword",  text: "from"       , suffix: " tkchart "           },
  { indent: 0, token: "keyword",  text: "import"     , suffix: " LineChart"           },
  { indent: 0, token: "comment",  text: ""           , suffix: ""                     },
  { indent: 0, token: "keyword",  text: "class"      , suffix: " RealTimeChart:"      },
  { indent: 1, token: "fn",       text: "def"        , suffix: " __init__(self, root):" },
  { indent: 2, token: "comment",  text: "# Live data stream → chart widget" , suffix: "" },
  { indent: 2, token: "var",      text: "self.chart" , suffix: " = LineChart("        },
  { indent: 3, token: "param",    text: "master"     , suffix: "=root,"               },
  { indent: 3, token: "param",    text: "width"      , suffix: "=700,"                },
  { indent: 3, token: "param",    text: "height"     , suffix: "=400,"                },
  { indent: 3, token: "accent",   text: "axis_size"  , suffix: "=1)"                  },
  { indent: 2, token: "var",      text: "self.line"  , suffix: " = self.chart"        },
  { indent: 3, token: "fn",       text: ".create_line"  , suffix: "("                 },
  { indent: 4, token: "accent",   text: "color"      , suffix: '="#6366F1")'          },
  { indent: 0, token: "comment",  text: ""           , suffix: ""                     },
  { indent: 1, token: "fn",       text: "def"        , suffix: " stream(self, data):" },
  { indent: 2, token: "var",      text: "self.chart" , suffix: ""                     },
  { indent: 3, token: "fn",       text: ".show_data" , suffix: "("                    },
  { indent: 4, token: "param",    text: "self.line"  , suffix: ", data)"              },
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
              <span className="hero-terminal-filename">tkchart / chart.py</span>
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
            <a href="/projects" className="btn-primary" id="hero-cta-projects">
              View Projects →
            </a>
            <a href="/contact" className="btn-secondary" id="hero-cta-contact">
              Get in Touch
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
              href="https://pypi.org/user/thisal-d/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="PyPI profile"
            >
              🐍 PyPI
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