/**
 * Asset resolution. The build is a single self-contained HTML file, so every
 * image is bundled (as an optimised .webp copy) and resolved here from the
 * original public-style paths used in the project data (e.g. "/images/tkchart/1.png").
 */
const files = import.meta.glob("/src/assets/**/*.{webp,png,jpg,svg,gif,ico,pdf}", {
  eager: true,
  query: "?url",
  import: "default",
});

const look = (p) => files[`/src/assets/${p}`];

export function img(path) {
  if (!path) return "";
  const clean = path.replace(/^\/+/, "");
  if (clean.startsWith("icons/")) return look(clean) ?? "";
  if (clean === "images/profile.jpg") return look("about/profile.webp") ?? "";
  const m = clean.match(/^images\/([^/]+)\/([^/.]+)\.\w+$/);
  if (m) {
    const [, folder, name] = m;
    return look(`projects/${folder}/${name}.webp`) ?? look(`${folder}/${name}.webp`) ?? "";
  }
  return look(clean) ?? "";
}

/** Only keep images that actually exist in the bundle */
export const imgs = (list) => (list ?? []).map(img).filter(Boolean);

export const logoFor = (theme) => look(`logo/${theme === "dark" ? "white" : "black"}.webp`) ?? "";
export const logoBlue = () => look("logo/blue.webp") ?? "";
export const pcforgeLogo = () => look("pcforge/logo.webp") ?? "";
export const resumeUrl = () => look("resume.pdf") ?? "";

/* ── Award badges ── */
const B = (p) => look(`awards-badges/${p}`) ?? "";
export function badgeImage(id, theme) {
  const light = theme === "light";
  switch (id) {
    case "starstruck": return B("tkchart/starstruck-normal.png");
    case "starstruck-bronze": return B("pytube-downloader/starstruck-bronze.png");
    case "starstruck-silver": return B("pytube-downloader/starstruck-silver.png");
    case "sf-rising-star": return B(`pytube-downloader/source-forge-rising-start/${light ? "white" : "black"}.svg`);
    case "sf-favourite": return B(`pytube-downloader/source-forge-favourite/${light ? "white" : "black"}.svg`);
    case "sf-community-choice": return B(`pytube-downloader/source-froge-community-choice/${light ? "white" : "black"}.svg`);
    default: return "";
  }
}
