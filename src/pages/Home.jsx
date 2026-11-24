import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import { CTA, Intro, Marquee, Recognition, Toolkit } from "@/components/Sections";
import { Lineup } from "@/components/Lineup";
import { CaseStudy, PcForgeShowcase } from "@/components/Showcase";

const NAV = [
  { id: "hero", label: "Hero" },
  { id: "intro", label: "Intro" },
  { id: "flagship", label: "PCForge" },
  { id: "lineup", label: "Lineup" },
  { id: "case-study", label: "Case study" },
  { id: "toolkit", label: "Toolkit" },
  { id: "achievements", label: "Recognition" },
];

/** Bottom-right section indicator, echoing the reference's sticky section label. */
function SectionNav() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Sections" className="fixed bottom-6 right-14 z-30 hidden text-right 2xl:block">
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          onClick={(e) => { e.preventDefault(); document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" }); }}
          className={`display block text-right uppercase transition-all duration-300 ${active === n.id ? "text-[1.15rem] text-ink" : "text-[.8rem] text-ink3 hover:text-ink2"}`}
          style={{ lineHeight: 1.35 }}
        >
          {n.label}
        </a>
      ))}
    </nav>
  );
}

export default function Home() {
  return (
    <>
      <SectionNav />
      <Hero />
      <Marquee />
      <Intro />
      <PcForgeShowcase n="02" />
      <Lineup n="03" />
      <CaseStudy n="04" />
      <Toolkit />
      <Recognition n="06" />
      <CTA n="07" />
    </>
  );
}
