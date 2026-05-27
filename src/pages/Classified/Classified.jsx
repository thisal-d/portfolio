import { useState } from "react";
import "./Classified.css";

/* The passcode is the bike model — "XT200" — referenced indirectly through the riddle */
const PASSCODE = "XT200";
const MAX_ATTEMPTS = 5;
const COOLDOWN_SECS = 60;

const PRIVATE_LINKS = [
  {
    name: "Facebook",
    handle: "Thisal Dilmith",
    url: "https://www.facebook.com/profile.php?id=61552227560429",
    icon: "/icons/social/facebook.png",
  },
  {
    name: "Instagram",
    handle: "@thisal.rapa",
    url: "https://www.instagram.com/thisal.rapa",
    icon: "/icons/social/instagram.png",
  },
];

function ClassifiedPage() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (cooldown > 0) return;
    if (input.trim().toUpperCase() === PASSCODE) {
      setUnlocked(true);
      setError("");
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setInput("");
      if (next >= MAX_ATTEMPTS) {
        setError("Too many attempts. Please wait.");
        let secs = COOLDOWN_SECS;
        setCooldown(secs);
        const timer = setInterval(() => {
          secs--;
          setCooldown(secs);
          if (secs <= 0) {
            clearInterval(timer);
            setAttempts(0);
            setError("");
          }
        }, 1000);
      } else {
        setError(`Wrong answer. ${MAX_ATTEMPTS - next} attempt${MAX_ATTEMPTS - next !== 1 ? "s" : ""} left.`);
      }
    }
  }

  return (
    <div className="classified-page">
      <div className="classified-inner">
        {/* Header */}
        <div className="classified-lock">
          <span className="classified-lock-icon">{unlocked ? "🔓" : "🔒"}</span>
          <h1 className="classified-title">Private Zone</h1>
          <p className="classified-subtitle">
            Some things I prefer to keep away from the open internet.
            {!unlocked && " Solve the riddle to unlock."}
          </p>
        </div>

        <div className={`classified-card ${unlocked ? "unlocked" : ""}`}>
          {!unlocked ? (
            <>
              {/* Riddle */}
              <div className="classified-hint">
                <p className="classified-hint-label">🧩 The Riddle</p>
                <p className="classified-hint-text">
                  I ride the trails on two wheels, not a superbike, not a scooter —
                  just old enough to have soul, and light enough to go where the road ends.
                  I am a Yamaha. My name ends with the number of hours in more than a week.
                  What am I?
                </p>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit}>
                {error && <p className="classified-error">⚠ {error}</p>}
                {cooldown > 0 && (
                  <p className="classified-cooldown">
                    Cooling down… try again in {cooldown}s
                  </p>
                )}
                {cooldown === 0 && (
                  <>
                    <div className="classified-input-row">
                      <input
                        className={`classified-input ${error ? "error" : ""}`}
                        type="text"
                        placeholder="Your answer…"
                        value={input}
                        onChange={e => { setInput(e.target.value); setError(""); }}
                        autoComplete="off"
                        spellCheck={false}
                        maxLength={20}
                      />
                      <button type="submit" className="classified-submit">Unlock</button>
                    </div>
                    {attempts > 0 && attempts < MAX_ATTEMPTS && (
                      <p className="classified-attempts">Hint: format is [Model][Number] e.g. XT200</p>
                    )}
                  </>
                )}
              </form>
            </>
          ) : (
            <>
              <div className="classified-unlocked-msg">
                ✓ Access granted — nice one, you know your bikes.
              </div>
              <div className="classified-social-links">
                {PRIVATE_LINKS.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="classified-social-link"
                  >
                    <img src={link.icon} alt={link.name} className="classified-social-icon" />
                    <span className="classified-social-name">{link.name}</span>
                    <span className="classified-social-handle">{link.handle}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassifiedPage;
