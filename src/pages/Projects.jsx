import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme";
import { badges } from "@/lib/data";
import { badgeImage } from "@/lib/assets";
import { Lineup } from "@/components/Lineup";
import { CaseStudy, PcForgeShowcase } from "@/components/Showcase";
import { CTA } from "@/components/Sections";
import { Reveal, SectionBar } from "@/components/ui";

export default function Projects() {
  const { theme } = useTheme();
  return (
    <>
      <section className="border-b border-line">
        <div className="frame">
          <SectionBar n="00" label="Open source" right="Libraries · Apps · Websites · Systems" />
          <div className="sec-pad py-[clamp(3rem,8vw,6rem)]">
            <h1 className="display text-[clamp(2.6rem,8vw,7rem)]">
              <span className="mask"><span>All Projects</span></span>
            </h1>
            <p className="lede fade-up mt-6 max-w-2xl" style={{ "--d": "300ms" }}>
              Libraries, apps, and websites — things I built to solve real problems, learn new tech, or just because I wanted to.
            </p>
          </div>
          {/* recognition bar */}
          <div className="flex flex-col gap-4 border-t border-line px-[clamp(1rem,3vw,2.5rem)] py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="mono text-ink3">Recognition</span>
              <Link to="/about" state={{ scroll: "achievements" }} className="mono border-b border-ink pb-0.5 hover:text-blue">View details →</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b.id} className="flex items-center gap-2 border border-line bg-card py-1.5 pl-2 pr-3 transition-transform hover:-translate-y-0.5">
                  <img src={badgeImage(b.id, theme)} alt={b.name} className="h-6 w-6 object-contain" />
                  <span className="mono-sm">
                    {b.platform === "GitHub" ? (b.id === "starstruck" ? "GitHub Starstruck" : `Starstruck · ${b.tierLabel}`) : `SF ${b.name}`}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reveal><PcForgeShowcase n="01" /></Reveal>
      <Lineup n="02" id="lineup" title="Filter & search" />
      <CaseStudy n="03" />
      <CTA n="04" />
    </>
  );
}
