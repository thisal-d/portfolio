import { Link } from "react-router-dom";
import "../styles/About.css";

/* ── Data ── */
const IDENTITY_PILLS = [
  { label: "Coder",      emoji: "⌨️",  cls: "about-pill-code"    },
  { label: "Trail Rider",emoji: "🏍️", cls: "about-pill-ride"    },
  { label: "Rap Listener",emoji: "🎵", cls: "about-pill-music"   },
  { label: "MMA / Fitness",emoji: "🥊",cls: "about-pill-fitness" },
];

const BIKE_SPECS = [
  { label: "Make",    val: "Yamaha"       },
  { label: "Model",   val: "XT 200"       },
  { label: "Style",   val: "Dual-Sport"   },
  { label: "Terrain", val: "Trail / Off-Road" },
];

const CODE_STACK = [
  "Python — libraries, scripts, automation",
  "JavaScript / React — frontends & web apps",
  "Java / Jakarta EE — backend & university projects",
  "Arduino / ESP32 — IoT & embedded systems",
];

const MUSIC_GENRES = [
  { label: "Hip-Hop", emoji: "🎤" },
  { label: "Rap",     emoji: "🎧" },
  { label: "Trap",    emoji: "🔊" },
  { label: "Drill",   emoji: "🎵" },
];

const FITNESS_LIST = [
  "Strength & conditioning workouts",
  "Mixed Martial Arts (MMA)",
  "Trail riding as active recovery",
  "Early morning training sessions",
];

function About() {
  return (
    <div className="about-page">
      {/* ════════════ HERO ════════════ */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-hero-text">
            <p className="section-label">Who Am I</p>
            <h1 className="about-hero-name">
              Thisal<br /><span>Dilmith</span>
            </h1>
            <p className="about-hero-tagline">
              A programmer who rides trails on weekends, listens to rap on loop,
              and treats code like a workout — push hard, break things, rebuild stronger.
            </p>
            <div className="about-identity-pills">
              {IDENTITY_PILLS.map((p, i) => (
                <span key={i} className={`about-pill ${p.cls}`}>
                  {p.emoji} {p.label}
                </span>
              ))}
            </div>
          </div>

          <div className="about-profile-wrap">
            <div className="about-profile-ring" />
            <img
              src="/images/profile.jpg"
              alt="Thisal Dilmith"
              className="about-profile-img"
              onError={e => { e.target.style.display = "none"; }}
            />
          </div>
        </div>
      </section>

      {/* ════════════ SECTIONS ════════════ */}
      <div className="about-sections">

        {/* ── The Coder ── */}
        <div className="about-section">
          <div className="about-section-text">
            <p className="about-section-label">01 / The Coder</p>
            <h2 className="about-section-title">I build things that solve real problems.</h2>
            <div className="about-section-body">
              <p>
                I started coding out of curiosity — wanting to build a network speed monitor
                in Python, struggling to find the right widget, and deciding to make it myself.
                That's still how I work. If something doesn't exist, I build it.
              </p>
              <p>
                I work across the stack — from Python libraries published to PyPI, to Android apps,
                React web apps, and IoT systems with ESP32. Whatever the problem requires.
              </p>
            </div>
          </div>
          <div className="about-visual-card">
            <span className="about-visual-card-emoji">⌨️</span>
            <p className="about-visual-card-title">What I Work With</p>
            <div className="about-visual-card-list">
              {CODE_STACK.map((item, i) => (
                <div key={i} className="about-visual-card-item">{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── The Rider ── */}
        <div className="about-rider-section">
          <div className="about-rider-header">
            <div className="about-section-text">
              <p className="about-section-label">02 / The Rider</p>
              <h2 className="about-section-title">Where the road ends, it gets interesting.</h2>
              <div className="about-section-body">
                <p>
                  I ride trails — not circuits, not highways. The kind of riding where the path
                  disappears into mud, roots, and gravel, and you figure it out as you go.
                </p>
                <p>
                  My bike is an old Yamaha XT 200. It's not fast, it's not flashy — but it's
                  light, reliable, and gets me exactly where I want to go. There's something
                  honest about riding a machine that doesn't try to be more than it is.
                </p>
              </div>
            </div>
            
            <div className="about-bike-card rider-card-override">
              <p className="about-bike-badge">My Ride</p>
              <p className="about-bike-model">XT 200</p>
              <p className="about-bike-make">Yamaha</p>
              <div className="about-bike-specs">
                {BIKE_SPECS.map((s, i) => (
                  <div key={i} className="about-bike-spec">
                    <p className="about-bike-spec-label">{s.label}</p>
                    <p className="about-bike-spec-val">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* New Image Gallery */}
          <div className="about-rider-gallery">
            <div className="rider-img-wrap img-1">
              <img src="/images/about/trail.jpg" alt="Trail Riding" loading="lazy" />
            </div>
            <div className="rider-img-wrap img-2">
              <img src="/images/about/off-the-road.jpg" alt="Off-road trail" loading="lazy" />
            </div>
            <div className="rider-img-wrap img-3">
              <img src="/images/about/fav-pov.jpg" alt="POV on the bike" loading="lazy" />
            </div>
          </div>
        </div>

        {/* ── The Music ── */}
        <div className="about-section">
          <div className="about-section-text">
            <p className="about-section-label">03 / The Music</p>
            <h2 className="about-section-title">Rap is the soundtrack, not just background noise.</h2>
            <div className="about-section-body">
              <p>
                I listen to rap — properly. Not just for the beat, but for the craft:
                the wordplay, the cadence, the way a good verse lands.
              </p>
              <p>
                It's the genre that understands what it means to come from nothing and build
                something anyway. That energy translates. When I'm in the zone — coding,
                training, riding — there's always rap in the background.
              </p>
            </div>
          </div>
          <div className="about-music-card">
            <span className="about-visual-card-emoji">🎧</span>
            <p className="about-visual-card-title">What's Playing</p>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Whatever hits hard and means something. The genre doesn't matter as much as
              the substance. Good bars are good bars.
            </p>
            <div className="about-music-genres">
              {MUSIC_GENRES.map((g, i) => (
                <span key={i} className="about-music-genre">{g.emoji} {g.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── The Fighter ── */}
        <div className="about-section reverse">
          <div className="about-section-text">
            <p className="about-section-label">04 / The Athlete</p>
            <h2 className="about-section-title">Fitness is how I stay sharp, mentally and physically.</h2>
            <div className="about-section-body">
              <p>
                I work out regularly — strength training, conditioning, and MMA. Not to
                compete (yet), but because the discipline carries over to everything else.
              </p>
              <p>
                Training teaches you the same thing coding does: consistent effort beats
                talent. Show up, do the work, improve incrementally. There's no shortcut
                in the gym, and there's no shortcut in software either.
              </p>
            </div>
          </div>
          <div className="about-visual-card">
            <span className="about-visual-card-emoji">🥊</span>
            <p className="about-visual-card-title">Training Routine</p>
            <div className="about-visual-card-list">
              {FITNESS_LIST.map((item, i) => (
                <div key={i} className="about-visual-card-item">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ CTA STRIP ════════════ */}
      <div className="about-cta-strip">
        <div className="about-cta-strip-inner">
          <h2 className="about-cta-title">Want to work together?</h2>
          <p className="about-cta-body">
            I'm open to collaborations, interesting projects, and conversations about code,
            bikes, or anything in between.
          </p>
          <div className="about-cta-actions">
            <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
            <Link to="/projects" className="btn btn-secondary">See My Work</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
