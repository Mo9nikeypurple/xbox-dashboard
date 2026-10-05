# Xbox Dashboard

A lightweight **Xbox Series X/S–style** game launcher with **3,400+ HTML5 games**.

- Pure static — **2 files only** (`index.html` + `games.js`)
- **No proxy** (no Scramjet, Bare, Wisp, or service worker)
- Dark theme, official Xbox green `#107C10`, hero banner, horizontal rows, search
- Games open in a full-screen iframe

## Quick start

1. Clone or download this repo
2. Open `index.html` in any modern browser  
   *or* host the folder on GitHub Pages / Netlify / Cloudflare Pages

```bash
git clone https://github.com/Mo9nikeypurple/xbox-dashboard.git
cd xbox-dashboard
# open index.html
```

## GitHub Pages

Settings → Pages → Source: Deploy from a branch → `main` / root.

## Files

| File | Purpose |
|------|---------|
| `index.html` | UI + logic (Xbox dashboard) |
| `games.js` | Full game catalog (~3400 entries) |

## Game sources

- Arcade V / Blooket dump (~1100 titles with cover art)
- UGS singlefile catalog (~2900 additional HTML5 games)

## Controls

- Click any tile or **Play** on the hero to launch
- **Esc** or the back arrow returns to the dashboard
- Search bar filters by title or category
