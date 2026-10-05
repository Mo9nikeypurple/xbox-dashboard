# Dual Console Dashboard

**Xbox (GSN-style)** + **PlayStation** shells, same **Arcade V** game library (~1,092 games).

## Features

- **OS picker** — choose Xbox or PlayStation on launch
- **Xbox mode** — splash (“Your console awaits”), home pins, library, settings, profile (layout inspired by GSN/XB-GSN)
- **PlayStation mode** — hero banner, horizontal rows, search
- **Arcade V catalog** — covers + direct game URLs (no proxy)
- Switch console anytime via the button

## Files

| File | Purpose |
|------|---------|
| `index.html` | Dual-OS UI |
| `games.js` | Arcade V catalog |

## Run locally

```bash
git clone https://github.com/Mo9nikeypurple/xbox-dashboard.git
cd xbox-dashboard
# open index.html  (needs games.js next to it)
```

For the full `games.js` (~214KB Arcade list), use the package from the dual-os artifacts if the repo only has a bootstrap catalog.

## GitHub Pages

Settings → Pages → branch `main` / root.
