import projectsJson from "@/data/projects.json";
import skillsJson from "@/data/skills.json";
import contactJson from "@/data/contact.json";
import badgesJson from "@/data/badges.json";

import tkchart from "@/data/projects/tkchart.json";
import ctkchart from "@/data/projects/ctkchart.json";
import pytube from "@/data/projects/pytube-downloader.json";
import ipWizard from "@/data/projects/ip-wizard.json";
import aiVerse from "@/data/projects/ai-verse.json";
import autoFuelX from "@/data/projects/auto-fuel-x.json";
import tutor from "@/data/projects/tutor-booking-system.json";
import smartWater from "@/data/projects/smart-water-tank-system.json";
import autoMate from "@/data/projects/auto-mate.json";
import pcforge from "@/data/projects/pcforge.json";

export const projects = projectsJson;
export const skills = skillsJson;
export const contact = contactJson;
export const badges = badgesJson;

export const projectDetails = {
  tkchart, ctkchart, "pytube-downloader": pytube, "ip-wizard": ipWizard, "ai-verse": aiVerse,
  "auto-fuel-x": autoFuelX, "tutor-booking-system": tutor, "smart-water-tank-system": smartWater,
  "auto-mate": autoMate, pcforge,
};

/** Original `type` strings are free-form ("System", "Web & Mobile"…) — normalise for filtering. */
export function categoryOf(p) {
  const t = String(p.type).toLowerCase();
  if (t === "library" || t === "app" || t === "website" || t === "system") return t;
  if (t.includes("web")) return "website";
  return "system";
}

export const CATEGORY_LABEL = {
  library: "Library", app: "App", website: "Website", system: "System",
};
export const CATEGORY_PLURAL = {
  library: "Libraries", app: "Apps", website: "Websites", system: "Systems",
};

const ACCENTS = ["blue", "green", "teal", "red", "violet", "amber", "blue", "green", "teal", "red"];
export const accentOf = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return `var(--${ACCENTS[(i < 0 ? 0 : i) % ACCENTS.length]})`;
};

/** "PyTube Downloader" → ["PyTube ", "Downloader"], "tkchart" → ["tk","chart"] … */
export function splitTitle(title) {
  const words = title.split(" ");
  if (words.length > 1) return [words[0] + " ", words.slice(1).join(" ")];
  const known = {
    tkchart: ["tk", "chart"], ctkchart: ["ctk", "chart"], PCForge: ["PC", "Forge"],
  };
  if (known[title]) return known[title];
  return [title, ""];
}

export const nextPrev = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};

/* human formatting helpers */
export const fmtNum = (n) =>
  n == null ? "—" : n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
export const fmtDate = (iso, long = false) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: long ? "long" : "short", year: "numeric" }) : "";
