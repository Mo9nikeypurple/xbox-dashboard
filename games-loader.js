
window.GAMES = window.GAMES || [];
(function(){
  function merge(){
    var parts = window.__GAMES_PARTS || [];
    var all = [];
    for (var i=0;i<parts.length;i++) all = all.concat(parts[i]);
    if (all.length) window.GAMES = all;
  }
  merge();
  if (typeof fetch !== 'undefined') {
    fetch('https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile@main/games.js',{cache:'force-cache'})
      .then(r=>r.text()).then(function(text){
        var m = text.match(/let files\s*=\s*\[([\s\S]*?)\];/);
        if (!m) return;
        var ids = [];
        var re = /"([^"]+)"/g, x;
        while ((x = re.exec(m[1]))) ids.push(x[1]);
        var seen = {};
        (window.GAMES||[]).forEach(function(g){
          seen[(g.t||'').toLowerCase().replace(/[^a-z0-9]/g,'')] = 1;
        });
        var base = 'https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile/UGS-Files/';
        ids.forEach(function(fid){
          var title = fid.indexOf('cl')===0 && fid.length>2 ? fid.slice(2) : fid;
          title = title.replace(/([a-z])([A-Z])/g,'$1 $2').replace(/[_-]/g,' ').replace(/\s+/g,' ').trim() || fid;
          var key = title.toLowerCase().replace(/[^a-z0-9]/g,'');
          if (seen[key]) return; seen[key]=1;
          var fname = (fid.indexOf('.')>0) ? fid : fid+'.html';
          window.GAMES.push({t:title,u:base+encodeURIComponent(fname),i:'',c:['UGS']});
        });
        if (window.__onGamesReady) window.__onGamesReady();
      }).catch(function(){});
  }
})();
