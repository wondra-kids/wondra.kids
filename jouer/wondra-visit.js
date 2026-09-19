/* WONDRA — collecte visiteur v2 « max » (pré-lancement, décision WDR-079).
   First-party uniquement : tout part vers Supabase WONDRA, rien vers des tiers.
   Envoie : url/référent complets, UTM, langue(s), timezone, écran/viewport, appareil,
   connexion, session, durée+scroll (à la sortie), clics liens/boutons, lead (email).
   IP / user-agent / accept-language : capturés côté serveur (en-têtes), pas ici.
   Bascule au lancement officiel : wondra_settings.visit_mode='min' + purge
   (scripts/purge_visitor_data.py). */
(function(){
  var cfg = window.WONDRA_SUPABASE || {};
  if(!cfg.url || !cfg.anonKey) return;

  var LS = window.localStorage, SS = window.sessionStorage;
  function store(k,v,st){ try{ st.setItem(k,v); }catch(e){} }
  function read(k,st){ try{ return st.getItem(k); }catch(e){ return null; } }
  function uuid(){ return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c==='x'?r:(r&0x3|0x8);return v.toString(16);}); }
  function isoDay(){ return new Date().toISOString().slice(0,10); }

  /* --- identifiants --- */
  function dailyId(){ /* comptage « uniques du jour » (compat v1) */
    try{
      var D='wondra_pv_day', K='wondra_pv';
      if(LS.getItem(D)!==isoDay()){ LS.removeItem(K); store(D,isoDay(),LS); }
      var id=LS.getItem(K); if(!id){ id=uuid(); store(K,id,LS); }
      return id;
    }catch(e){ return null; }
  }
  function persistentId(){ /* visiteur récurrent (persiste dans le temps) */
    var K='wondra_uid';
    var id=read(K,LS); if(!id){ id=uuid(); store(K,id,LS); }
    return id;
  }
  function sessionId(){ /* session de navigation (30 min d'inactivité) */
    var S='wondra_sid', T='wondra_sid_ts', GAP=30*60*1000;
    var now=Date.now();
    var ts=parseInt(read(T,LS)||'0',10);
    var id=read(S,LS);
    if(!id || !ts || (now-ts)>GAP){ id=uuid(); }
    store(S,id,LS); store(T,String(now),LS);
    return id;
  }

  function route(){
    try{ var r=document.body && document.body.getAttribute('data-route'); return (r&&r!=='')?r:(location.pathname||'/'); }
    catch(e){ return location.pathname||'/'; }
  }
  function refDomain(r){ try{ var a=document.createElement('a'); a.href=r||''; return a.hostname||''; }catch(e){ return ''; } }
  function device(){
    var ua=navigator.userAgent||'';
    if(/iPad|Tablet/i.test(ua) || (navigator.maxTouchPoints>1 && /Macintosh/.test(ua))) return 'tablet';
    if(/Mobi|Android|iPhone|iPod/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  var t0=Date.now(), maxScroll=0;
  try{
    window.addEventListener('scroll',function(){
      try{
        var h=document.documentElement.scrollHeight||1;
        var p=Math.round(((window.scrollY||0)+window.innerHeight)*100/h);
        if(p>maxScroll) maxScroll=p;
      }catch(e){}
    },{passive:true});
  }catch(e){}

  function utm(){
    var out={};
    try{
      var q=new URLSearchParams(location.search||'');
      ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','ref'].forEach(function(k){
        var v=q.get(k); if(v) out[k]=v.slice(0,120);
      });
    }catch(e){}
    return out;
  }

  function baseMeta(){
    var m={};
    try{ m.url=location.href.slice(0,500); }catch(e){}
    try{ m.title=(document.title||'').slice(0,140); }catch(e){}
    try{ m.lang=navigator.language||undefined; }catch(e){}
    try{ m.langs=(navigator.languages||[]).join(',').slice(0,160); }catch(e){}
    try{ m.tz=Intl.DateTimeFormat().resolvedOptions().timeZone; }catch(e){}
    try{ m.screen=(screen.width+'x'+screen.height); m.dpr=(window.devicePixelRatio||1); }catch(e){}
    try{ m.vp=(window.innerWidth+'x'+window.innerHeight); }catch(e){}
    try{ if(navigator.connection && navigator.connection.effectiveType) m.conn=navigator.connection.effectiveType; }catch(e){}
    try{ m.dev=device(); m.touch=(navigator.maxTouchPoints||0); }catch(e){}
    try{ m.cores=navigator.hardwareConcurrency||undefined; }catch(e){}
    try{ if(navigator.deviceMemory) m.mem=navigator.deviceMemory; }catch(e){}
    try{ if(navigator.userAgentData && navigator.userAgentData.platform) m.platform=navigator.userAgentData.platform; }catch(e){}
    var u=utm(); for(var k in u){ if(Object.prototype.hasOwnProperty.call(u,k)) m[k]=u[k]; }
    return m;
  }

  function send(evt, extra){
    try{
      var m=baseMeta();
      if(extra){ for(var k in extra){ if(Object.prototype.hasOwnProperty.call(extra,k)) m[k]=extra[k]; } }
      var body={
        p_path: route(),
        p_event: evt,
        p_referrer: refDomain(document.referrer),
        p_ref_full: (document.referrer||'').slice(0,500),
        p_visitor: dailyId(),
        p_persistent: persistentId(),
        p_session: sessionId(),
        p_meta: m
      };
      if(JSON.stringify(body).length>3800){ body.p_meta={truncated:true}; }
      fetch(cfg.url+'/rest/v1/rpc/log_visit',{
        method:'POST',
        headers:{'apikey':cfg.anonKey,'Authorization':'Bearer '+cfg.anonKey,'Content-Type':'application/json'},
        body:JSON.stringify(body),
        keepalive:true
      }).catch(function(){});
    }catch(e){}
  }

  /* --- événements --- */
  send('pageview');

  /* changement de route in-game (MutationObserver sur data-route — comme v1) */
  try{
    var last=route();
    var mo=new MutationObserver(function(){
      var r=route();
      if(r&&r!==last){ last=r; send('route'); }
    });
    mo.observe(document.body,{attributes:true,attributeFilter:['data-route']});
  }catch(e){}

  /* clics : liens, boutons « .btn », éléments marqués data-track */
  try{
    document.addEventListener('click',function(e){
      try{
        var t=e.target;
        var el=(t && t.closest) ? t.closest('a[href], [data-track], button.btn, .btn') : null;
        if(!el) return;
        var tag=(el.tagName||'').toLowerCase();
        var txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,' ').slice(0,90);
        var href=''; try{ href=el.getAttribute('href')||''; }catch(e2){}
        var trk=''; try{ trk=el.getAttribute('data-track')||''; }catch(e2){}
        send('click',{el:tag, txt:txt, href:String(href).slice(0,220), track:trk||undefined});
      }catch(err){}
    },true);
  }catch(e){}

  /* sortie : durée + scroll */
  var exited=false;
  function onExit(){
    if(exited) return; exited=true;
    send('exit',{seconds:Math.round((Date.now()-t0)/1000), scroll:maxScroll});
  }
  try{
    document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden') onExit(); });
    window.addEventListener('pagehide',onExit);
  }catch(e){}

  /* hooks : lead (email laissé) + événement générique */
  window.WONDRA_TRACK_LEAD=function(email){
    send('lead',{email:String(email||'').slice(0,160)});
  };
  window.WONDRA_TRACK=function(name,data){
    send(String(name||'event').slice(0,40),data||{});
  };
})();
