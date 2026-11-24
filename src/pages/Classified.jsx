import { useEffect, useState } from "react";
import { img } from "@/lib/assets";
import { IconArrow, SectionBar } from "@/components/ui";

/* The passcode is the bike model — "XT200" — referenced indirectly through the riddle */
const PASSCODE = "XT200";
const MAX_ATTEMPTS = 5;
const COOLDOWN_SECS = 60;

const PRIVATE_LINKS = [
  { name: "Facebook", handle: "Thisal Dilmith", url: "https://www.facebook.com/profile.php?id=61552227560429", icon: "/icons/social/facebook.png" },
  { name: "Instagram", handle: "@thisal.rapa", url: "https://www.instagram.com/thisal.rapa", icon: "/icons/social/instagram.png" },
];

export default function Classified() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => {
      setCooldown((c) => c - 1);
      if (cooldown - 1 <= 0) { setAttempts(0); setError(""); }
    }, 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function onSubmit(e) {
    e.preventDefault();
    if (cooldown > 0) return;
    if (input.trim().toUpperCase() === PASSCODE) {
      setUnlocked(true); setError("");
      return;
    }
    const next = attempts + 1;
    setAttempts(next); setInput(""); setShake((s) => s + 1);
    if (next >= MAX_ATTEMPTS) {
      setError("Too many attempts. Please wait.");
      setCooldown(COOLDOWN_SECS);
    } else {
      const left = MAX_ATTEMPTS - next;
      setError(`Wrong answer. ${left} attempt${left !== 1 ? "s" : ""} left.`);
    }
  }

  return (
    <section className="relative min-h-[calc(100svh-48px)] overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" aria-hidden="true" />
      <div className="frame min-h-[calc(100svh-48px)]">
        <SectionBar n="??" label="Private zone" right={unlocked ? "Access granted" : "Restricted"} />
        <div className="relative mx-auto max-w-[620px] px-5 py-[clamp(2.5rem,8vw,6rem)]">
          <div className="text-center">
            <span className="inline-block text-6xl" style={{ animation: unlocked ? "page-in .6s both" : "float 5s ease-in-out infinite" }} aria-hidden="true">{unlocked ? "🔓" : "🔒"}</span>
            <h1 className="display mt-4 text-[clamp(2.4rem,7vw,4.5rem)]">Private Zone</h1>
            <p className="lede mt-4">
              Some things I prefer to keep away from the open internet.{!unlocked && " Solve the riddle to unlock."}
            </p>
          </div>

          <div key={shake} className="mt-10 border border-ink bg-paper/80 p-6 shadow-[8px_8px_0_var(--ink)] backdrop-blur sm:p-8" style={{ animation: shake ? "shake .45s" : undefined }}>
            {!unlocked ? (
              <>
                <p className="mono text-ink3">🧩 The Riddle</p>
                <p className="mt-3 text-[1.02rem] italic leading-[1.8] text-ink2">
                  I ride the trails on two wheels, not a superbike, not a scooter — just old enough to have soul, and light enough to go where the road ends.
                  I am a Yamaha. My name ends with the number of hours in more than a week. What am I?
                </p>
                <form onSubmit={onSubmit} className="mt-6">
                  {error && <p role="alert" className="mb-3 text-sm text-red">⚠ {error}</p>}
                  {cooldown > 0 ? (
                    <p className="mono text-amber">Cooling down… try again in {cooldown}s</p>
                  ) : (
                    <>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input className={`field flex-1 ${error ? "err" : ""}`} type="text" placeholder="Your answer…" value={input}
                          onChange={(e) => { setInput(e.target.value); setError(""); }} autoComplete="off" spellCheck={false} maxLength={20} aria-label="Riddle answer" />
                        <button type="submit" className="btn btn-solid">Unlock</button>
                      </div>
                      {attempts > 0 && attempts < MAX_ATTEMPTS && <p className="mono-sm mt-3 text-ink3">Hint: format is [Model][Number] e.g. XT200</p>}
                    </>
                  )}
                </form>
              </>
            ) : (
              <div style={{ animation: "page-in .6s both" }}>
                <p className="border border-green bg-green/10 p-4 text-sm font-medium text-green">✓ Access granted — nice one, you know your bikes.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {PRIVATE_LINKS.map((l) => (
                    <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-start gap-3 border border-line p-5 transition-all hover:-translate-y-1 hover:border-ink hover:bg-card">
                      <img src={img(l.icon)} alt={l.name} className="h-9 w-9 object-contain" />
                      <span className="font-display text-lg font-bold">{l.name}</span>
                      <span className="mono-sm flex items-center gap-1 text-ink3">{l.handle} <IconArrow /></span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes shake { 10%,90% { transform: translateX(-2px);} 20%,80% { transform: translateX(4px);} 30%,50%,70% { transform: translateX(-7px);} 40%,60% { transform: translateX(7px);} }`}</style>
    </section>
  );
}
