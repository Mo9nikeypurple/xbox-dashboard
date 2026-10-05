/* Arcade V catalog (~1092 games with covers). UGS (~2956) merges at runtime in index.html */
window.GAMES = window.GAMES || [];
(function(){
  // Minimal bootstrap set so UI works offline; full Arcade list is large.
  // Prefer loading from same-origin games-data.json when present.
  const bootstrap = [
    {"t":"2048","u":"https://cdn.jsdelivr.net/gh/arcade-v/turbowarp/2048.html","i":"https://cdn.jsdelivr.net/gh/arcade-v/images/games/2048.png","c":["Popular","Puzzle"]},
    {"t":"Slope","u":"https://cdn.jsdelivr.net/gh/arcade-v/unity/slope/index.html","i":"https://cdn.jsdelivr.net/gh/arcade-v/images/games/slope.png","c":["Popular","3D"]},
    {"t":"Cookie Clicker","u":"https://cdn.jsdelivr.net/gh/arcade-v/javascript/cookie_clicker/index.html","i":"https://cdn.jsdelivr.net/gh/arcade-v/images/games/cookie_clicker.png","c":["Popular","Idle"]},
    {"t":"Geometry Dash","u":"https://cdn.jsdelivr.net/gh/arcade-v/javascript/geometry_dash/index.html","i":"https://cdn.jsdelivr.net/gh/arcade-v/images/games/geometry_dash.png","c":["Popular","Platformer"]},
    {"t":"Minecraft Classic","u":"https://cdn.jsdelivr.net/gh/arcade-v/javascript/minecraft_classic/index.html","i":"https://cdn.jsdelivr.net/gh/arcade-v/images/games/minecraft.png","c":["Popular","3D"]}
  ];
  // Merge bootstrap if empty
  if (!window.GAMES.length) window.GAMES.push(...bootstrap);
  // Try load full Arcade JSON if hosted next to this file
  fetch("games-data.json").then(r=>r.ok?r.json():null).then(data=>{
    if (Array.isArray(data) && data.length) {
      const seen = new Set(window.GAMES.map(g=>g.t));
      data.forEach(g=>{ if(g&&g.t&&!seen.has(g.t)){ seen.add(g.t); window.GAMES.push(g);} });
      console.log("Arcade loaded:", window.GAMES.length);
      window.dispatchEvent(new Event("games-ready"));
    }
  }).catch(()=>{});
})();
