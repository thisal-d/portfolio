# Thisal Dilmith — Portfolio (redesign)

React 19 + Vite + Tailwind CSS v4 + React Router (HashRouter). Design language inspired by getartcraft.com:
warm paper palette, extra-wide Archivo display type, tracked monospace labels, hairline grid frames with numbered
section bars, a scroll ruler, floating skill icons on concentric rings, and light/dark themes.

```bash
npm install
npm run dev      # local dev
npm run build    # outputs ONE self-contained dist/index.html (images + fonts inlined)
```

## What's where
| Path | Contents |
|---|---|
| `src/data/*.json`, `src/data/projects/*.json` | All content (projects, skills, badges, contact). **PCForge** is `projects.json[0]` + `projects/pcforge.json`. |
| `src/assets/projects/<slug>/N.webp` | Optimised copies of your project screenshots (same images as the originals). |
| `src/assets/pcforge/*.webp` | PCForge screenshots (see below) + logo. |
| `src/assets/about/` | Profile + trail/MMA photos. `src/assets/icons/` skill + social icons. `src/assets/awards-badges/` badges. `src/assets/resume.pdf` CV. |
| `src/pages`, `src/components`, `src/lib` | Pages, UI, helpers (GitHub/PyPI hooks with 30-min cache). |

## Replacing / adding PCForge screenshots
Screenshots were captured from the live portal (pc-forge-admin.pages.dev) with customer names/emails masked.
To replace them, overwrite the files in `src/assets/pcforge/` (`dashboard`, `build-reviews`, `orders`, `inventory`,
`service-requests`, `products` — `.webp`, ~1600px wide). To add more (e.g. Flutter mobile app screenshots), drop a new
`.webp` there, then add its path (`/images/pcforge/<name>.png`) to `images` (and a caption to `image-captions`) in
`src/data/projects/pcforge.json` and `src/data/projects.json`.

## Notes
* Contact form: set `VITE_FORMSPREE_ID` in `.env` to send via Formspree; otherwise it opens the visitor's mail client (as before).
* Private-links riddle page lives at `#/classified` (unchanged logic).
* Routes use the URL hash (`#/projects/pcforge`) so the single-file build works from any host or even `file://`.
