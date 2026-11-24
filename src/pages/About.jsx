import { useState } from "react";
import { img } from "@/lib/assets";
import { Lightbox } from "@/components/Gallery";
import { CTA, Recognition } from "@/components/Sections";
import { Reveal, SectionBar } from "@/components/ui";

const PILLS = [
  { label: "Coder", emoji: "⌨️", c: "var(--blue)" },
  { label: "Trail Rider", emoji: "🏍️", c: "var(--amber)" },
  { label: "Rap Listener", emoji: "🎵", c: "var(--violet)" },
  { label: "MMA / Fitness", emoji: "🥊", c: "var(--red)" },
];
const BIKE_SPECS = [
  { label: "Make", val: "Yamaha" }, { label: "Model", val: "XT 200" },
  { label: "Style", val: "Dual-Sport" }, { label: "Terrain", val: "Trail / Off-Road" },
];
const CODE_STACK = [
  "Python — libraries, scripts, automation",
  "JavaScript / React — frontends & web apps",
  "Java / Jakarta EE — backend & university projects",
  "Arduino / ESP32 — IoT & embedded systems",
];
const MUSIC_GENRES = [
  { label: "Hip-Hop", emoji: "🎤" }, { label: "Rap", emoji: "🎧" },
  { label: "Trap", emoji: "🔊" }, { label: "Drill", emoji: "🎵" },
];
const FITNESS_LIST = [
  "Strength & conditioning workouts", "Mixed Martial Arts (MMA)",
  "Trail riding as active recovery", "Early morning training sessions",
];

function Chapter({ n, label, title, children, aside, reverse = false, accent }) {
  return (
    <section className="border-b border-line">
      <div className="frame">
        <SectionBar n={n} label={label} />
        <div className={`grid lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className={`sec-pad flex flex-col justify-center border-b border-line lg:border-b-0 ${reverse ? "lg:border-l" : "lg:border-r"}`}>
            <Reveal>
              <span className="num-chip inline-block" style={{ background: accent }}>{n}</span>
              <h2 className="display mt-5 text-[clamp(1.8rem,3.6vw,3.1rem)]">{title}</h2>
              <div className="prose-p mt-6 max-w-xl text-[1.02rem] leading-[1.8] text-ink2">{children}</div>
            </Reveal>
          </div>
          <div className="sec-pad flex items-center bg-card/50"><div className="w-full"><Reveal dir={reverse ? "left" : "right"}>{aside}</Reveal></div></div>
        </div>
      </div>
    </section>
  );
}

function ListCard({ emoji, title, items }) {
  return (
    <div className="border border-line bg-paper p-6">
      <span className="text-3xl" aria-hidden="true">{emoji}</span>
      <p className="display-md mt-3 text-xl">{title}</p>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {items.map((t, i) => (
          <li key={t} className="flex items-start gap-3 py-3 text-sm text-ink2">
            <span className="mono-sm pt-0.5 text-ink3">{String(i + 1).padStart(2, "0")}</span>{t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  const riders = ["/images/about/trail.jpg", "/images/about/off-the-road.jpg", "/images/about/fav-pov.jpg"].map(img);
  const alts = ["Trail Riding", "Off-road trail", "POV on the bike"];
  const [lb, setLb] = useState(null);
  const mma = img("/images/about/mma-workout.jpg");
  const [mmaOpen, setMmaOpen] = useState(false);

  return (
    <>
      {/* ───── hero ───── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -right-40 top-1/2 aspect-square w-[900px] -translate-y-1/2 rounded-full border border-line" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 top-1/2 aspect-square w-[620px] -translate-y-1/2 rounded-full border border-line" aria-hidden="true" />
        <div className="frame">
          <SectionBar n="00" label="About me" right="Sri Lanka" />
          <div className="grid items-center gap-10 px-[clamp(1rem,3vw,2.5rem)] py-[clamp(2.5rem,7vw,6rem)] md:grid-cols-[1.4fr_1fr]">
            <div>
              <h1 className="display text-[clamp(3rem,10vw,9rem)]">
                <span className="mask"><span>Thisal</span></span>
                <span className="mask"><span style={{ "--d": "120ms", color: "var(--blue)" }}>Dilmith</span></span>
              </h1>
              <p className="lede fade-up mt-7 max-w-xl" style={{ "--d": "450ms" }}>
                A programmer who rides trails on weekends, listens to rap on loop, and treats code like a
                workout — push hard, break things, rebuild stronger.
              </p>
              <div className="fade-up mt-7 flex flex-wrap gap-2" style={{ "--d": "600ms" }}>
                {PILLS.map((p) => (
                  <span key={p.label} className="mono flex items-center gap-2 border bg-paper/70 px-3.5 py-2 backdrop-blur transition-transform hover:-translate-y-0.5" style={{ borderColor: p.c }}>
                    <span aria-hidden="true">{p.emoji}</span> {p.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="fade-up relative mx-auto w-full max-w-[400px]" style={{ "--d": "300ms" }}>
              <div className="absolute -inset-3 border border-line" aria-hidden="true" />
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-blue/15" aria-hidden="true" />
              <img src={img("/images/profile.jpg")} alt="Thisal Dilmith" className="relative aspect-square w-full border border-line object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Recognition n="01" compact />

      <Chapter n="02" label="The Coder" title="I build things that solve real problems." accent="var(--blue)" aside={<ListCard emoji="⌨️" title="What I Work With" items={CODE_STACK} />}>
        <p>I started coding out of curiosity — wanting to build a network speed monitor in Python, struggling to find the right widget, and deciding to make it myself. That's still how I work. If something doesn't exist, I build it.</p>
        <p>I work across the stack — from Python libraries published to PyPI, to Android apps, React web apps, and IoT systems with ESP32. Whatever the problem requires.</p>
      </Chapter>

      {/* ───── rider ───── */}
      <section className="border-b border-line">
        <div className="frame">
          <SectionBar n="03" label="The Rider" />
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            <div className="sec-pad border-b border-line lg:border-b-0 lg:border-r">
              <Reveal>
                <span className="num-chip inline-block" style={{ background: "var(--amber)" }}>03</span>
                <h2 className="display mt-5 text-[clamp(1.8rem,3.6vw,3.1rem)]">Where the road ends, it gets interesting.</h2>
                <div className="prose-p mt-6 max-w-xl text-[1.02rem] leading-[1.8] text-ink2">
                  <p>I ride trails — not circuits, not highways. The kind of riding where the path disappears into mud, roots, and gravel, and you figure it out as you go.</p>
                  <p>My bike is an old Yamaha XT 200. It's not fast, it's not flashy — but it's light, reliable, and gets me exactly where I want to go. There's something honest about riding a machine that doesn't try to be more than it is.</p>
                </div>
              </Reveal>
            </div>
            <div className="sec-pad flex items-center bg-card/50">
              <Reveal dir="right" className="w-full">
                <div className="relative overflow-hidden border border-line bg-ink p-7 text-paper">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-paper/20" aria-hidden="true" />
                  <p className="mono text-paper/60">My Ride</p>
                  <p className="display mt-3 text-6xl">XT 200</p>
                  <p className="mono mt-1 text-paper/60">Yamaha</p>
                  <dl className="mt-7 grid grid-cols-2 gap-px bg-paper/20">
                    {BIKE_SPECS.map((s) => (
                      <div key={s.label} className="bg-ink p-4">
                        <dt className="mono-sm text-paper/50">{s.label}</dt>
                        <dd className="mt-1 text-sm font-semibold">{s.val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="grid gap-px border-t border-line bg-line md:grid-cols-[1.6fr_1fr] md:grid-rows-2">
            {riders.map((src, i) => (
              <button key={src} onClick={() => setLb(i)} aria-label={`Open photo: ${alts[i]}`} className={`group relative overflow-hidden bg-card ${i === 0 ? "aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-[16/10]"}`}>
                <img src={src} alt={alts[i]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <span className="mono absolute bottom-3 left-3 bg-paper px-2 py-1 text-ink opacity-0 transition-opacity group-hover:opacity-100">{alts[i]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {lb !== null && <Lightbox images={riders} index={lb} onClose={() => setLb(null)} onIndex={setLb} alt="Trail riding" />}

      <Chapter n="04" label="The Music" title="Rap is the soundtrack, not just background noise." accent="var(--violet)" reverse
        aside={
          <div className="border border-line bg-paper p-6">
            <span className="text-3xl" aria-hidden="true">🎧</span>
            <p className="display-md mt-3 text-xl">What's Playing</p>
            <p className="mt-3 text-sm leading-relaxed text-ink2">Whatever hits hard and means something. The genre doesn't matter as much as the substance. Good bars are good bars.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {MUSIC_GENRES.map((g, i) => (
                <span key={g.label} className="mono flex items-center gap-2 border border-line px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-ink" style={{ animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>{g.emoji} {g.label}</span>
              ))}
            </div>
          </div>
        }>
        <p>I listen to rap — properly. Not just for the beat, but for the craft: the wordplay, the cadence, the way a good verse lands.</p>
        <p>It's the genre that understands what it means to come from nothing and build something anyway. That energy translates. When I'm in the zone — coding, training, riding — there's always rap in the background.</p>
      </Chapter>

      <Chapter n="05" label="The Athlete" title="Fitness is how I stay sharp, mentally and physically." accent="var(--red)"
        aside={
          <div className="grid gap-4">
            <button onClick={() => setMmaOpen(true)} className="group relative aspect-[16/10] overflow-hidden border border-line bg-card" aria-label="Open photo: MMA workout">
              <img src={mma} alt="MMA Workout" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </button>
            <ListCard emoji="🥊" title="Training Routine" items={FITNESS_LIST} />
          </div>
        }>
        <p>I work out regularly — strength training, conditioning, and MMA. Not to compete (yet), but because the discipline carries over to everything else.</p>
        <p>Training teaches you the same thing coding does: consistent effort beats talent. Show up, do the work, improve incrementally. There's no shortcut in the gym, and there's no shortcut in software either.</p>
      </Chapter>
      {mmaOpen && <Lightbox images={[mma]} index={0} onClose={() => setMmaOpen(false)} onIndex={() => {}} alt="MMA workout" />}

      <CTA n="06" />
    </>
  );
}
