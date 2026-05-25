import "../../styles/ProjectPage.css";
import { useGitHubData } from "../../hooks/useProjectData";
import {
  Gallery, StatsBar, ProjectReleases,
  TechStackCard, TopicsCard, FeaturesList, ProjectMeta,
} from "../../components/project/ProjectPageParts";

const PLATFORM_META = {
  "Windows":      { icon: "🪟", downloadLabel: "Download for Windows" },
  "Android":      { icon: "🤖", downloadLabel: "Download APK" },
  "IoT / Mobile": { icon: "📡", downloadLabel: null },
};

function AppPage({ data }) {
  const { repoData, releases, latestTag, loading, error } = useGitHubData(data["api_url"]);

  const platform      = data.platform || "";
  const meta          = PLATFORM_META[platform] || { icon: "💻", downloadLabel: "Download" };
  const hasDownload   = data["publish-url"] && data["publish-url"] !== false;
  const isPortrait    = platform === "Android";
  const downloadLabel = data["download-label"] || meta.downloadLabel;

  return (
    <div className="pp-page">
      {/* Back */}
      <div className="pp-back-bar">
        <button className="pp-back-btn" onClick={() => window.close()}>← Close</button>
      </div>

      {/* Hero */}
      <div className="pp-hero">
        <div className="pp-hero-inner">
          <h1 className="pp-title">{data.title}</h1>

          <div className="pp-badges">
            <span className="badge badge-app">App</span>
            {platform && (
              <span className="pp-status maintained">{meta.icon} {platform}</span>
            )}
            {data.status && (
              <span className={`pp-status ${data.status}`}>{data.status}</span>
            )}
          </div>

          <p className="pp-description">{data.description}</p>

          <div className="pp-actions">
            {hasDownload && downloadLabel && (
              <a href={data["publish-url"]} target="_blank" rel="noopener noreferrer" className="pp-btn pp-btn-primary">
                ⬇️ {downloadLabel}
              </a>
            )}
            <a href={data.repo_url} target="_blank" rel="noopener noreferrer" className="pp-btn pp-btn-github">
              <img src="/icons/social/github.png" alt="" className="pp-btn-icon" />
              Source Code
            </a>
          </div>

          <StatsBar repoData={repoData} latestTag={latestTag} loading={loading} />
        </div>
      </div>

      {/* Content */}
      <div className="pp-content">
        <div className="pp-main">
          <Gallery images={data.images} portrait={isPortrait} />

          {/* About */}
          {data["long-description"] && (
            <div className="pp-section">
              <h3 className="pp-section-title">About</h3>
              <p className="pp-long-desc">{data["long-description"]}</p>
            </div>
          )}

          {/* Why I built this */}
          {data["why-i-made-this"]?.extended && (
            <div className="pp-section">
              <h3 className="pp-section-title">Why I Built This</h3>
              <div className="pp-why-block">
                <p>{data["why-i-made-this"].extended}</p>
              </div>
            </div>
          )}

          <FeaturesList features={data.features} />

          {/* Release History */}
          <div className="pp-section">
            <h3 className="pp-section-title">Release History</h3>
            <ProjectReleases
              releases={releases}
              loading={loading}
              error={error}
              repoUrl={data.repo_url}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="pp-sidebar">
          <ProjectMeta data={data} />

          {/* Requirements */}
          {data.requirements && data.requirements.length > 0 && (
            <div className="pp-sidebar-card">
              <p className="pp-sidebar-card-title">Requirements</p>
              <div className="pp-requirements">
                {data.requirements.map((r, i) => (
                  <div key={i} className="pp-requirement-item">{r}</div>
                ))}
              </div>
            </div>
          )}

          <TechStackCard tags={data["tech-stack"]} />
          <TopicsCard topics={repoData?.topics} />
        </div>
      </div>
    </div>
  );
}

export default AppPage;
