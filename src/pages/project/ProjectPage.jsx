/**
 * ProjectPage.jsx — The router/dispatcher for project detail pages.
 *
 * How it works:
 *  1. Reads the slug from the URL: /projects/:slug
 *  2. Looks up the pre-imported JSON data for that slug
 *  3. Picks the right page template based on data.type
 *  4. Renders it — no props passed via router navigation state
 */
import { useParams } from "react-router-dom";
import "../../styles/ProjectPage.css";

/* ── Statically import all project JSONs ──────────────────────
   Vite processes these at build time, so each one is bundled
   separately and loaded immediately when the route matches.  */
import tkchart           from "../../data/projects/tkchart.json";
import ctkchart          from "../../data/projects/ctkchart.json";
import pytubeDownloader  from "../../data/projects/pytube-downloader.json";
import ipWizard          from "../../data/projects/ip-wizard.json";
import aiVerse           from "../../data/projects/ai-verse.json";
import autoFuelX         from "../../data/projects/auto-fuel-x.json";
import tutorBooking      from "../../data/projects/tutor-booking-system.json";
import smartWater        from "../../data/projects/smart-water-tank-system.json";
import autoMate          from "../../data/projects/auto-mate.json";

/* ── Page templates ── */
import LibraryPage from "./LibraryPage";
import AppPage     from "./AppPage";
import WebsitePage from "./WebsitePage";

/* ── Slug → data map ── */
const PROJECT_DATA = {
  "tkchart":                tkchart,
  "ctkchart":               ctkchart,
  "pytube-downloader":      pytubeDownloader,
  "ip-wizard":              ipWizard,
  "ai-verse":               aiVerse,
  "auto-fuel-x":            autoFuelX,
  "tutor-booking-system":   tutorBooking,
  "smart-water-tank-system":smartWater,
  "auto-mate":              autoMate,
};

/* ── Type → component map ── */
const PAGE_COMPONENT = {
  library: LibraryPage,
  app:     AppPage,
  website: WebsitePage,
};

function ProjectPage() {
  const { slug } = useParams();
  const data = PROJECT_DATA[slug];

  if (!data) {
    return (
      <div className="pp-not-found">
        <h2>Project Not Found</h2>
        <p>No project with slug <code>{slug}</code> exists.</p>
        <button className="pp-back-btn" onClick={() => window.close()}>← Go Back</button>
      </div>
    );
  }

  const PageComponent = PAGE_COMPONENT[data.type] || WebsitePage;
  return <PageComponent data={data} />;
}

export default ProjectPage;
