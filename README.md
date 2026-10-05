# Xbox Dashboard

Xbox Series X/S–style game launcher with **3,400+ HTML5 games**.

- Pure static — **2 files** (`index.html` + `games.js`)
- **No proxy** (no Scramjet, Bare, Wisp, or service worker)
- Official Xbox green `#107C10`, hero banner, rows, search
- Games open in a full-screen iframe

## Game count

| Source | Count |
|--------|------:|
| Arcade V (covers) | ~1,092 |
| UGS singlefile (runtime) | ~2,956 |
| **Total (deduped)** | **~3,400+** |

UGS titles are fetched live from the public UGS CDN when the page loads, so you always get the full ~3k library without a huge static JSON.

## Quick start

```bash
git clone https://github.com/Mo9nikeypurple/xbox-dashboard.git
cd xbox-dashboard
# open index.html in a browser
```

Or enable **GitHub Pages**: Settings → Pages → Deploy from branch `main` / root.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Xbox UI + logic + UGS loader |
| `games.js` | Arcade bootstrap catalog |

Optional: add `games-data.json` (Arcade full list) next to these files for offline Arcade covers; the page auto-merges it if present.

## Controls

- Click a tile or **Play** to launch
- **Esc** / back arrow returns home
- Search filters by title or category
