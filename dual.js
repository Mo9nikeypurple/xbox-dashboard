(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const games = window.GAMES || [];
  let currentOS = null;
  let libFilter = "all";

  function clock() {
    const t = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    const xc = $("xb-clock"), pc = $("ps-clock");
    if (xc) xc.textContent = t;
    if (pc) pc.textContent = t;
  }
  setInterval(clock, 30000);
  clock();

  function launch(g) {
    if (!g || !g.u) return;
    $("player-title").textContent = g.t;
    const frame = $("game-frame");
    frame.src = "about:blank";
    $("player").classList.remove("hidden");
    setTimeout(() => { frame.src = g.u; }, 40);
  }
  function closePlayer() {
    $("game-frame").src = "about:blank";
    $("player").classList.add("hidden");
  }
  $("player-back").onclick = closePlayer;
  $("player-fs").onclick = () => {
    const f = $("game-frame");
    (f.requestFullscreen || f.webkitRequestFullscreen).call(f);
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("player").classList.contains("hidden")) closePlayer();
  });

  function makeXbTile(g) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "xb-tile";
    el.title = g.t;
    if (g.i) {
      const img = document.createElement("img");
      img.src = g.i; img.alt = g.t; img.loading = "lazy";
      img.onerror = () => { img.remove(); };
      el.appendChild(img);
    }
    const lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = g.t;
    el.appendChild(lbl);
    el.onclick = () => launch(g);
    return el;
  }
  function makePsTile(g) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "ps-tile";
    el.title = g.t;
    if (g.i) {
      const img = document.createElement("img");
      img.src = g.i; img.alt = g.t; img.loading = "lazy";
      img.onerror = () => { img.remove(); };
      el.appendChild(img);
    }
    const lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = g.t;
    el.appendChild(lbl);
    el.onclick = () => launch(g);
    return el;
  }
  function fillRow(id, list, maker, limit) {
    const row = $(id);
    if (!row) return;
    row.innerHTML = "";
    list.slice(0, limit || 24).forEach((g) => row.appendChild(maker(g)));
  }
  function byCat(name) {
    return games.filter((g) => (g.c || []).some((c) => c.toLowerCase() === name.toLowerCase()));
  }

  function showOS(os) {
    currentOS = os;
    $("os-picker").classList.add("hidden");
    $("xbox").classList.toggle("hidden", os !== "xbox");
    $("ps").classList.toggle("hidden", os !== "ps");
    function go() {
      if (os === "xbox") initXbox();
      if (os === "ps") initPS();
    }
    if ((window.GAMES || []).length) go();
    else {
      window.__onGamesReady = go;
      setTimeout(function(){ if ((window.GAMES||[]).length) go(); }, 800);
      setTimeout(function(){ if ((window.GAMES||[]).length) go(); }, 2500);
    }
  }
  $("pick-xbox").onclick = () => showOS("xbox");
  $("pick-ps").onclick = () => showOS("ps");
  document.querySelectorAll("[data-switch]").forEach((btn) => {
    btn.onclick = () => {
      closePlayer();
      $("xbox").classList.add("hidden");
      $("ps").classList.add("hidden");
      $("os-picker").classList.remove("hidden");
    };
  });

  function initXbox() {
    const list = window.GAMES || games;
    const pins = list.slice(0, 10);
    fillRow("xb-pins", pins, makeXbTile, 10);
    fillRow("xb-row-games", list, makeXbTile, 20);
    fillRow("xb-row-popular", byCat("Popular").length ? byCat("Popular") : list, makeXbTile, 20);
    fillRow("xb-row-puzzle", byCat("Puzzle").length ? byCat("Puzzle") : list.slice(20,40), makeXbTile, 16);
    fillRow("xb-row-plat", byCat("Platformer").length ? byCat("Platformer") : list.slice(40,56), makeXbTile, 16);
    if ($("xb-count-games")) $("xb-count-games").textContent = list.length;
  }

  function enterHome() {
    $("xb-splash").classList.add("hidden");
    $("xb-home").classList.remove("hidden");
  }
  $("xb-continue").onclick = enterHome;
  $("xb-fs").onclick = () => {
    enterHome();
    const el = document.documentElement;
    (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
  };
  $("xb-blank").onclick = () => {
    const w = window.open("about:blank", "_blank");
    if (!w) { enterHome(); return; }
    w.document.write('<!DOCTYPE html><title>XB-GSN</title><style>html,body{margin:0;height:100%;background:#000}</style><iframe src="'+location.href.split('#')[0]+'#xbox" style="border:0;width:100%;height:100%" allowfullscreen></iframe>');
    w.document.close();
  };
  if (location.hash === "#xbox") {
    showOS("xbox");
    enterHome();
  }

  function openLib(q) {
    $("xb-lib").classList.remove("hidden");
    renderLib(q || "");
    if (q) $("xb-lib-q").value = q;
  }
  function closeLib() { $("xb-lib").classList.add("hidden"); }
  function renderLib(q) {
    q = (q || "").toLowerCase().trim();
    let list = window.GAMES || games;
    if (libFilter === "popular") list = byCat("Popular");
    else if (libFilter === "puzzle") list = byCat("Puzzle");
    else if (libFilter === "platformer") list = byCat("Platformer");
    else if (libFilter === "flash") list = byCat("Flash");
    else if (libFilter === "retro") list = byCat("Retro");
    if (q) {
      list = list.filter((g) =>
        g.t.toLowerCase().includes(q) ||
        (g.c || []).some((c) => c.toLowerCase().includes(q))
      );
    }
    const grid = $("xb-lib-grid");
    grid.innerHTML = "";
    list.slice(0, 200).forEach((g) => grid.appendChild(makeXbTile(g)));
    $("xb-lib-count").textContent = list.length + " items";
  }
  $("xb-nav-lib").onclick = () => openLib();
  $("xb-q-lib").onclick = () => openLib();
  $("xb-manage").onclick = () => openLib();
  $("xb-lib-close").onclick = closeLib;
  $("xb-nav-search").onclick = () => openLib();
  $("xb-lib-q").oninput = (e) => renderLib(e.target.value);
  document.querySelectorAll("#xb-lib .side-nav button").forEach((btn) => {
    btn.onclick = () => {
      document.querySelectorAll("#xb-lib .side-nav button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      libFilter = btn.dataset.filter;
      renderLib($("xb-lib-q").value);
    };
  });
  $("xb-nav-home").onclick = () => {
    closeLib();
    $("xb-settings").classList.add("hidden");
    $("xb-profile").classList.add("hidden");
  };
  $("xb-open-profile").onclick = () => {
    $("xb-profile").classList.remove("hidden");
  };
  $("xb-prof-close").onclick = () => $("xb-profile").classList.add("hidden");

  const SET_PANELS = {
    general: [
      { ic: "\uD83D\uDDA5", t: "Personalization" },
      { ic: "\uD83D\uDCF6", t: "Network settings" },
      { ic: "\uD83D\uDD0A", t: "Audio" },
      { ic: "\u26A1", t: "Performance" },
      { ic: "\uD83C\uDFAE", t: "Controller & input" },
      { ic: "\u23FB", t: "Power options" },
    ],
    account: [
      { ic: "\uD83D\uDC64", t: "My profile" },
      { ic: "\uD83D\uDCAC", t: "GSN Chat & sign out" },
    ],
    personalization: [
      { ic: "\uD83C\uDFA8", t: "Home background" },
      { ic: "\uD83D\uDC9A", t: "Accent color" },
      { ic: "\uD83C\uDFE0", t: "Home groups" },
    ],
    network: [{ ic: "\uD83D\uDCF6", t: "Network settings" }],
    accessibility: [
      { ic: "\uD83D\uDC41", t: "High contrast focus" },
      { ic: "\uD83D\uDD07", t: "Sound preferences" },
    ],
    audio: [{ ic: "\uD83D\uDD0A", t: "Audio output" }],
    performance: [
      { ic: "\u26A1", t: "Automatic" },
      { ic: "\uD83D\uDC8E", t: "Full Quality" },
      { ic: "\u2696", t: "Balanced" },
      { ic: "\uD83D\uDD0B", t: "Battery Saver" },
    ],
    about: [{ ic: "\u2139", t: "GSN \u2014 independent browser gaming platform. Not affiliated with Microsoft or Xbox." }],
  };
  function showSettings(panel) {
    $("xb-settings").classList.remove("hidden");
    const grid = $("xb-set-grid");
    grid.innerHTML = "";
    (SET_PANELS[panel] || SET_PANELS.general).forEach((item) => {
      const c = document.createElement("div");
      c.className = "set-card";
      c.innerHTML = '<div class="ic">'+item.ic+'</div><span>'+item.t+'</span>';
      grid.appendChild(c);
    });
  }
  $("xb-nav-settings").onclick = () => showSettings("general");
  $("xb-q-home").onclick = () => showSettings("personalization");
  $("xb-set-close").onclick = () => $("xb-settings").classList.add("hidden");
  document.querySelectorAll("#xb-set-nav button").forEach((btn) => {
    btn.onclick = () => {
      document.querySelectorAll("#xb-set-nav button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      showSettings(btn.dataset.set);
    };
  });

  let psHero = null;
  function initPS() {
    const list = window.GAMES || games;
    const popular = byCat("Popular");
    const pool = popular.length ? popular : list;
    psHero = pool[Math.floor(Math.random() * Math.min(40, pool.length))];
    if (psHero) {
      $("ps-hero-title").textContent = psHero.t;
      $("ps-hero-desc").textContent = (psHero.c || []).slice(0, 3).join(" \u00b7 ") || "Play now";
      if (psHero.i) $("ps-hero-bg").style.backgroundImage = 'url("'+psHero.i+'")';
    }
    $("ps-hero-play").onclick = () => launch(psHero);
    fillRow("ps-row-popular", popular.length ? popular : list, makePsTile, 20);
    fillRow("ps-row-puzzle", byCat("Puzzle").length ? byCat("Puzzle") : list.slice(20,36), makePsTile, 16);
    fillRow("ps-row-plat", byCat("Platformer").length ? byCat("Platformer") : list.slice(36,52), makePsTile, 16);
    fillRow("ps-row-all", list, makePsTile, 40);
  }
  $("ps-nav-home").onclick = () => {
    $("ps-search-panel").classList.add("hidden");
    $("ps-main").classList.remove("hidden");
    document.querySelectorAll(".ps-nav button").forEach((b) => b.classList.remove("active"));
    $("ps-nav-home").classList.add("active");
  };
  $("ps-nav-search").onclick = () => {
    $("ps-main").classList.add("hidden");
    $("ps-search-panel").classList.remove("hidden");
    document.querySelectorAll(".ps-nav button").forEach((b) => b.classList.remove("active"));
    $("ps-nav-search").classList.add("active");
    $("ps-q").focus();
  };
  $("ps-q").oninput = (e) => {
    const q = e.target.value.toLowerCase().trim();
    const grid = $("ps-search-grid");
    grid.innerHTML = "";
    if (!q) return;
    (window.GAMES || games)
      .filter((g) => g.t.toLowerCase().includes(q) || (g.c || []).some((c) => c.toLowerCase().includes(q)))
      .slice(0, 80)
      .forEach((g) => grid.appendChild(makePsTile(g)));
  };
})();
