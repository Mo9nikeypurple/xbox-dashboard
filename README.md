# Dual Console Dashboard

**Xbox (GSN-style)** + **PlayStation** shells sharing the **Arcade V** game library.

## Open

1. Clone or download this repo
2. Open `index.html` in a browser (needs the `games-part*.js` files next to it)

Or use GitHub Pages after enabling it on branch `main`.

## What you get

- **OS picker** on launch (Xbox or PlayStation)
- **Xbox mode**: splash ("Your console awaits"), pins, library, settings, profile — layout inspired by the GSN/XB-GSN video
- **PlayStation mode**: hero banner, rows, search
- **Arcade V** games with covers (~1,092) + optional UGS titles at runtime
- No proxy / no Scramjet — direct iframe launches
- **Switch console** button on both shells

## Files

| File | Role |
|------|------|
| `index.html` | Dual-OS UI |
| `games-part1.js` … `games-part3.js` | Arcade V catalog chunks |
| `games-loader.js` | Merges parts + optional UGS |
