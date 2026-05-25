import { useState, useEffect } from "react";

/**
 * Fetches GitHub repo data + releases for a project.
 * Returns { repoData, releases, latestTag, loading }
 */
export function useGitHubData(apiUrl) {
  const [repoData,   setRepoData]   = useState(null);
  const [releases,   setReleases]   = useState([]);
  const [latestTag,  setLatestTag]  = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(false);

  useEffect(() => {
    if (!apiUrl) { setLoading(false); return; }

    Promise.all([
      fetch(apiUrl),
      fetch(`${apiUrl}/releases?per_page=30`)
    ])
      .then(async ([repoRes, relsRes]) => {
        if (!repoRes.ok || !relsRes.ok) {
          setError(true);
        }
        
        const repo = repoRes.ok ? await repoRes.json() : null;
        const rels = relsRes.ok ? await relsRes.json() : null;

        setRepoData(repo);
        if (rels) {
          setReleases(rels);
          if (rels.length > 0) setLatestTag(rels[0].tag_name);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return { repoData, releases, latestTag, loading, error };
}

/**
 * Fetches PyPI package metadata (version, downloads).
 * Returns { pypiData, loading }
 */
export function usePyPIData(pypiApiUrl) {
  const [pypiData, setPypiData] = useState(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!pypiApiUrl) { setLoading(false); return; }
    fetch(pypiApiUrl)
      .then(r => r.ok ? r.json() : null)
      .then(d => setPypiData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pypiApiUrl]);

  return { pypiData, loading };
}

/** Format large numbers: 1234 → "1.2k" */
export function fmt(n) {
  if (n == null) return "—";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

/** Format ISO date to "May 2026" */
export function fmtDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
