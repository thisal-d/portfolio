import { useEffect, useState } from "react";

/** Tiny fetch cache (memory + localStorage, 30 min) so we stay well under GitHub's unauthenticated rate limit. */
const TTL = 30 * 60 * 1000;
const mem = new Map();

function cached(url) {
  if (mem.has(url)) return mem.get(url);
  try {
    const raw = localStorage.getItem("cache:" + url);
    if (raw) {
      const { t, d } = JSON.parse(raw);
      if (Date.now() - t < TTL) {
        const p = Promise.resolve(d);
        mem.set(url, p);
        return p;
      }
    }
  } catch { /* ignore */ }
  const p = fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (d) {
        try { localStorage.setItem("cache:" + url, JSON.stringify({ t: Date.now(), d })); } catch { /* quota */ }
      }
      return d;
    })
    .catch(() => null);
  mem.set(url, p);
  p.then((d) => { if (!d) mem.delete(url); });
  return p;
}

/** Repo stats + latest release */
export function useRepo(apiUrl, withRelease = true) {
  const [repo, setRepo] = useState(null);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(!!apiUrl);
  useEffect(() => {
    if (!apiUrl) { setLoading(false); return; }
    let live = true;
    Promise.all([cached(apiUrl), withRelease ? cached(`${apiUrl}/releases/latest`) : Promise.resolve(null)]).then(([r, l]) => {
      if (!live) return;
      setRepo(r); setLatest(l); setLoading(false);
    });
    return () => { live = false; };
  }, [apiUrl]);
  return { repo, latest, loading };
}

/** Full release list (detail pages) */
export function useReleases(apiUrl) {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(!!apiUrl);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!apiUrl) { setLoading(false); return; }
    let live = true;
    cached(`${apiUrl}/releases?per_page=30`).then((d) => {
      if (!live) return;
      if (Array.isArray(d)) setReleases(d); else setError(true);
      setLoading(false);
    });
    return () => { live = false; };
  }, [apiUrl]);
  return { releases, loading, error };
}

export function usePyPI(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!url) return;
    let live = true;
    cached(url).then((d) => live && setData(d));
    return () => { live = false; };
  }, [url]);
  return data;
}

export function usePyPIDownloads(name) {
  const [n, setN] = useState(null);
  useEffect(() => {
    if (!name) return;
    let live = true;
    cached(`https://pypistats.org/api/packages/${name}/recent`).then((d) => {
      if (live && d?.data?.last_month != null) setN(d.data.last_month);
    });
    return () => { live = false; };
  }, [name]);
  return n;
}
