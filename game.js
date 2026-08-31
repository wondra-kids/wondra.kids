/* WONDRA — moteur de jeu : grille, heros, execution du code enfant
   via Aether/Esper (sandbox), validation, etoiles, progression.
   Moteur inspire de l'architecture CodeCombat (MIT) : le code de l'enfant
   est compile puis execute pas a pas dans un interpreture separe. */

/* ---------- etat global + persistance locale ---------- */
const SAVE_KEY = "kodawari-save-v1";
let save = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}");
save.stars   = save.stars   || {};      // { L1: 3, ... }
save.unlocked= save.unlocked|| 1;       // nombre de niveaux debloques
save.editor  = save.editor || {};       // { L1: code }
const persist = () => localStorage.setItem(SAVE_KEY, JSON.stringify(save));

/* ---------- refs DOM ---------- */
const $ = id => document.getElementById(id);
const screenLanding = $("screen-landing"), screenMap = $("screen-map"), screenGame = $("screen-game");
function showScreen(el) {
  [screenLanding, screenMap, screenGame].forEach(s => { if (s) s.classList.toggle("visible", s === el); });
}

/* ---------- rendu de la carte ---------- */
function starStr(n) { return "★".repeat(n) + '<span class="off">★</span>'.repeat(3 - n); }

function renderCharPicker() {
  const holder = $("char-picker");
  if (!holder) return;
  holder.innerHTML = "";
  Object.entries(CHARACTERS).forEach(([key, c]) => {
    const el = document.createElement("button");
    el.className = "char-chip" + (save.character === key ? " selected" : "");
    el.title = c.name;
    el.innerHTML = `<canvas width="44" height="44"></canvas><span>${c.name}</span>`;
    holder.appendChild(el);
    // aperçu : dessine le personnage dans la miniature
    const cv = el.querySelector("canvas"), cc = cv.getContext("2d");
    const savedCx = cx, savedCanvas = canvas;
    cx = cc; canvas = cv;
    cx.clearRect(0, 0, 44, 44);
    pickCharacter(c, 22, 26, performance.now(), 0);
    cx = savedCx; canvas = savedCanvas;
    el.onclick = () => { save.character = key; persist(); renderCharPicker(); toast("Personnage : " + c.name, "ok"); };
  });
}

function renderMap() {
  const holder = $("world-map");
  holder.innerHTML = "";
  $("hud-level").textContent = Math.min(save.unlocked, WORLD.levels.length);
  $("hud-xp").textContent = Object.keys(save.stars).length * 10;
  $("hud-stars").textContent = Object.values(save.stars).reduce((a, b) => a + b, 0);
  const doneCount = Object.values(save.stars).filter(v => v > 0).length;

  /* B1 — en-tête de carte : nom du monde, progression, échelle */
  const header = document.createElement("div");
  header.className = "map-header";
  header.innerHTML = `
    <h2 class="map-title">Monde 1 · ${WORLD.title}</h2>
    <div class="map-stats">
      <span class="map-progress">${doneCount} sur ${WORLD.levels.length}</span>
      <span class="map-scale">Monde 1 sur ${WORLDS.length}</span>
    </div>`;
  holder.appendChild(header);

  /* grille des niveaux */
  const grid = document.createElement("div");
  grid.className = "map-nodes";
  WORLD.levels.forEach((lv, i) => {
    const unlocked = save.devMode === true || i < save.unlocked;
    const done = save.stars[lv.id] > 0;
    const el = document.createElement("div");
    el.className = "node " + (done ? "done" : "") +
                   (i === save.unlocked - 1 && !done ? " current" : "") +
                   (unlocked ? "" : " locked") +
                   (lv.kind === "ia" ? " node-ia" : "");
    el.innerHTML = `
      <div class="portal">${unlocked ? (done ? "✓" : "⚔") : "🔒"}</div>
      ${lv.kind === "ia" ? '<span class="ia-badge">IA</span>' : ""}
      <h3>${lv.title}</h3>
      <div class="meta">${lv.concept}</div>
      <div class="stars">${done ? starStr(save.stars[lv.id]) : "☆ ☆ ☆"}</div>
      ${i === save.unlocked - 1 && !done ? '<span class="state-tag">à toi</span>' : ""}
      ${!unlocked ? '<span class="state-tag">verrouillé</span>' : ""}`;
    if (unlocked) el.onclick = () => { location.hash = "#/jeu/" + lv.id; };
    grid.appendChild(el);
  });
  holder.appendChild(grid);

  /* B2 + B3 — bande des huit mondes sous la carte, l'IA annoncée plus loin */
  const band = document.createElement("div");
  band.className = "worlds-band";
  band.innerHTML = `
    <h3 class="band-title">Les 8 mondes du parcours</h3>
    <p class="band-note">🤖 Le code et l'IA se croisent : l'IA revient plus loin — tu entraîneras ton propre robot.</p>
    <ol class="band-list">
      ${WORLDS.map((w, i) => `
        <li class="band-item${w.active ? " active" : ""}">
          <span class="band-num">${i + 1}</span>
          <span class="band-txt"><b>${w.title}</b><small>${w.what}</small></span>
          ${w.active ? '<em class="band-now">en cours</em>' : '<em class="band-soon">bientôt</em>'}
        </li>`).join("")}
    </ol>`;
  holder.appendChild(band);
}

/* ---------- ouverture d'un niveau ---------- */
let LV = null;          // niveau courant
let sim = null;         // etat de la simulation

function openLevel(idx) {
  LV = WORLD.levels[idx];
  $("level-title").textContent = `${LV.id} · ${LV.title}`;
  $("level-brief").innerHTML = LV.brief;
  $("hint-box").classList.add("hidden");
  $("goal-box").textContent = "Objectif : " + LV.goalText;
  $("goal-box").classList.remove("hidden");
  $("run-state").textContent = "";
  $("run-state").className = "run-state";

  const ed = ace.edit("editor");
  ed.setTheme("ace/theme/monokai");
  ed.session.setMode("ace/mode/python");
  ed.setOptions({ fontSize: "14px", tabSize: 4, useSoftTabs: true });
  ed.setValue(save.editor[LV.id] ?? LV.starterCode, -1);

  resetSim();
  showScreen(screenGame);
  assembled = (save.assembled && save.assembled[LV.id]) || [];
  setTimeout(() => ed.resize(), 50);
  if (!save.modality) showModalityIfNeeded(applyModalityUI); else applyModalityUI();
  updateLevelTabs();
  activateTab("mission");
}

function backToMap() { location.hash = "#/jeu"; }

/* ---------- routage par hash : une adresse par écran (WDR-041) ---------- */
function applyRoute() {
  const h = location.hash || "#/";
  if (h.startsWith("#/jeu/")) {
    const id = decodeURIComponent(h.slice(6));
    const idx = WORLD.levels.findIndex(l => l.id === id);
    if (idx >= 0) { document.body.dataset.route = "level"; openLevel(idx); return; }
    location.hash = "#/jeu"; return;
  }
  if (h === "#/jeu") {
    document.body.dataset.route = "jeu";
    showScreen(screenMap);
    renderMap();
    window.scrollTo(0, 0);
    return;
  }
  document.body.dataset.route = "home";
  showScreen(screenLanding);
  renderMap();
  if (h === "#faq") { const f = $("faq"); if (f) f.scrollIntoView({ behavior: "smooth", block: "start" }); }
}
window.addEventListener("hashchange", applyRoute);

/* ================= Étape 5 — E1.5 modalité + assemblage + mur (WDR-041) ================= */
save.modality = save.modality || null;   // 'code' | 'assemble' | null (choix de l'enfant)
save.assembled = save.assembled || {};   // { L1: [ "hero.moveRight()", ... ], ... } — code assemblé par niveau
const ASSEMBLE_LEVELS = ["L1", "L2", "L3", "L4"];
const TILE_DEFS = {
  moveRight: ["hero.moveRight()", "➡️ droite"],
  moveDown:  ["hero.moveDown()",  "⬇️ bas"],
  moveUp:    ["hero.moveUp()",    "⬆️ haut"],
  moveLeft:  ["hero.moveLeft()",  "⬅️ gauche"],
  pickup:    ["hero.pickup()",    "💎 ramasser"]
};
const TILES_BY_LEVEL = {
  L1: ["moveRight", "moveDown", "moveUp", "moveLeft"],
  L2: ["moveRight", "moveDown", "moveUp", "moveLeft"],
  L3: ["moveRight"],
  L4: ["moveRight", "moveDown", "pickup"]
};
let assembled = [];

function isAssembleLevel() { return save.modality === "assemble" && ASSEMBLE_LEVELS.includes(LV.id); }

function buildCode() {
  if (LV.id === "L3" || LV.id === "L4") {
    const body = assembled.map(l => "    " + l).join("\n");
    return "for i in range(3):\n" + (body || "    pass");
  }
  return assembled.join("\n");
}

/* ---------- Assembler : manipulation des blocs (ajout/suppression/duplication/reordonnancement) ---------- */
function commitAssemble() { save.assembled = save.assembled || {}; save.assembled[LV.id] = assembled; persist(); }
function addBlock(code, idx) {
  idx = (idx === undefined || idx < 0) ? assembled.length : Math.min(idx, assembled.length);
  assembled.splice(idx, 0, code); commitAssemble(); renderAssembleEditor();
}
function removeBlock(idx) { assembled.splice(idx, 1); commitAssemble(); renderAssembleEditor(); }
function duplicateBlock(idx) { assembled.splice(idx + 1, 0, assembled[idx]); commitAssemble(); renderAssembleEditor(); }
function moveBlock(from, to) {
  if (from === to || from < 0 || from >= assembled.length) return;
  const [x] = assembled.splice(from, 1);
  assembled.splice(to, 0, x); commitAssemble(); renderAssembleEditor();
}
function duplicateAll() { if (!assembled.length) return; assembled = assembled.concat(assembled.slice()); commitAssemble(); renderAssembleEditor(); }
function clearAll() { assembled = []; commitAssemble(); renderAssembleEditor(); }

function renderAssembleEditor() {
  const codeEl = $("assemble-code"), pal = $("assemble-palette");
  const isLoop = LV.id === "L3" || LV.id === "L4";
  codeEl.innerHTML = "";
  if (isLoop) {
    const pre = document.createElement("div");
    pre.className = "al-loop-header";
    pre.textContent = "for i in range(3):";
    codeEl.appendChild(pre);
  }
  const list = document.createElement("div");
  list.className = "al-list";
  if (!assembled.length) {
    const gap = document.createElement("div");
    gap.className = "al-gap";
    gap.textContent = isLoop ? "Glisse une instruction ici pour remplir la boucle." : "Glisse une instruction ici pour commencer.";
    list.appendChild(gap);
  } else {
    assembled.forEach((line, i) => {
      const blk = document.createElement("div");
      blk.className = "al-block";
      blk.dataset.idx = i;
      const grip = document.createElement("span");
      grip.className = "al-grip";
      grip.textContent = "⋮⋮";
      grip.title = "Glisser pour déplacer";
      const code = document.createElement("code");
      code.className = "al-code";
      code.textContent = line;
      const dup = document.createElement("button");
      dup.type = "button"; dup.className = "al-dup"; dup.title = "Dupliquer"; dup.setAttribute("aria-label", "Dupliquer");
      dup.textContent = "⧉";
      dup.onclick = (e) => { e.stopPropagation(); duplicateBlock(i); };
      const del = document.createElement("button");
      del.type = "button"; del.className = "al-del"; del.title = "Supprimer"; del.setAttribute("aria-label", "Supprimer");
      del.textContent = "✕";
      del.onclick = (e) => { e.stopPropagation(); removeBlock(i); };
      blk.appendChild(grip); blk.appendChild(code); blk.appendChild(dup); blk.appendChild(del);
      list.appendChild(blk);
    });
  }
  codeEl.appendChild(list);

  const tb = document.createElement("div");
  tb.className = "assemble-toolbar";
  const da = document.createElement("button");
  da.type = "button"; da.className = "btn ghost"; da.textContent = "⧉ Tout dupliquer"; da.onclick = duplicateAll;
  const cl = document.createElement("button");
  cl.type = "button"; cl.className = "btn ghost"; cl.textContent = "🗑 Vider"; cl.onclick = clearAll;
  tb.appendChild(da); tb.appendChild(cl);
  codeEl.appendChild(tb);

  pal.innerHTML = "";
  (TILES_BY_LEVEL[LV.id] || []).forEach(k => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "tile";
    b.dataset.code = TILE_DEFS[k][0];
    b.innerHTML = `<b>${TILE_DEFS[k][0]}</b><span>${TILE_DEFS[k][1]}</span>`;
    pal.appendChild(b);
  });
}

/* ---------- drag & drop (pointer events : souris + tactile) + tap au clic (clavier) ---------- */
let drag = null, ghost = null, lastDragEnd = 0;
function positionGhost(x, y) { if (ghost) { ghost.style.left = (x - 18) + "px"; ghost.style.top = (y - 32) + "px"; } }
function cleanupGhost() {
  if (ghost) { ghost.remove(); ghost = null; }
  document.querySelectorAll(".al-block.dragging, .al-block.drop-before, .tile.dragging")
    .forEach(el => el.classList.remove("dragging", "drop-before"));
}
function dropIndex(y) {
  const blocks = [...document.querySelectorAll(".al-list .al-block")];
  let idx = blocks.length;
  for (let i = 0; i < blocks.length; i++) {
    const r = blocks[i].getBoundingClientRect();
    if (y < r.top + r.height / 2) { idx = i; break; }
  }
  return idx;
}
function updateDropHint(y) {
  document.querySelectorAll(".al-list .al-block").forEach(b => b.classList.remove("drop-before"));
  if (drag && drag.type === "move" && drag.moved) {
    const idx = dropIndex(y);
    const blocks = [...document.querySelectorAll(".al-list .al-block")];
    if (blocks[idx] && blocks[idx] !== document.querySelector(".al-block.dragging")) blocks[idx].classList.add("drop-before");
  }
}
document.addEventListener("pointerdown", (e) => {
  const grip = e.target.closest(".al-grip");
  const tile = e.target.closest(".tile");
  if (grip) {
    const blk = grip.closest(".al-block");
    drag = { type: "move", idx: +blk.dataset.idx, sx: e.clientX, sy: e.clientY, moved: false };
  } else if (tile) {
    drag = { type: "add", code: tile.dataset.code, sx: e.clientX, sy: e.clientY, moved: false };
  }
});
document.addEventListener("pointermove", (e) => {
  if (!drag) return;
  if (!drag.moved && (Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy)) > 6) {
    drag.moved = true;
    ghost = document.createElement("div");
    ghost.className = "al-ghost";
    if (drag.type === "move") {
      const src = document.querySelector(`.al-block[data-idx="${drag.idx}"]`);
      ghost.textContent = src ? src.querySelector(".al-code").textContent : "";
      if (src) src.classList.add("dragging");
    } else {
      ghost.textContent = drag.code;
    }
    document.body.appendChild(ghost);
  }
  if (drag.moved) { positionGhost(e.clientX, e.clientY); updateDropHint(e.clientY); }
});
document.addEventListener("pointerup", (e) => {
  if (!drag) return;
  const d = drag;
  const moved = d.moved;
  cleanupGhost();
  if (d.type === "move") {
    if (moved) { lastDragEnd = Date.now(); const to = dropIndex(e.clientY); moveBlock(d.idx, to > d.idx ? to - 1 : to); }
  } else if (d.type === "add") {
    if (moved) { lastDragEnd = Date.now(); addBlock(d.code, dropIndex(e.clientY)); }
    // pas de mouvement → on laisse le `click` natif ajouter (tap clavier/souris)
  }
  drag = null;
});
document.addEventListener("pointercancel", () => { if (drag) { cleanupGhost(); drag = null; } });
// tap au clic (souris relâchée sans déplacement, clavier Enter/Espace, lecteur d'écran)
document.addEventListener("click", (e) => {
  if (Date.now() - lastDragEnd < 350) return; // ne pas double-ajouter après un drag
  const tile = e.target.closest(".tile");
  if (tile) addBlock(tile.dataset.code, assembled.length);
});

function applyModalityUI() {
  const inAssemble = isAssembleLevel();
  $("editor").classList.toggle("hidden", inAssemble);
  $("editor-assemble").classList.toggle("hidden", !inAssemble);
  $("btn-actions").style.display = inAssemble ? "none" : "";
  if (inAssemble) { renderAssembleEditor(); }
}

function showModalityIfNeeded(cb) {
  /* B4 — plus d'écran de choix : le mode Écrire est le défaut, l'onglet
     Assembler reste disponible dans le niveau (les deux façons manipulables). */
  if (!save.modality) { save.modality = "code"; persist(); renderModalityToggle(); }
  cb();
}

function renderModalityToggle() {
  const t = $("modality-toggle");
  if (!t) return;
  t.classList.remove("hidden");
  t.innerHTML = save.modality === "assemble" ? "🧩 Assembler · <u>changer</u>" : "✍️ Écrire · <u>changer</u>";
  t.onclick = () => {
    const next = save.modality === "assemble" ? "code" : "assemble";
    save.modality = next; persist();
    const tab = document.querySelector(`.ltab[data-tab="${next}"]`);
    if (tab && !tab.hidden) activateTab(next);
    renderModalityToggle();
  };
}

/* ---------- onglets du niveau (mobile) : Mission / Écrire / Assembler ---------- */
function updateLevelTabs() {
  const tabAssemble = $("tab-assemble");
  if (tabAssemble) tabAssemble.hidden = !ASSEMBLE_LEVELS.includes(LV.id);
}
function activateTab(name) {
  document.querySelectorAll(".level-tabs .ltab").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
  const mission = name === "mission";
  const pi = document.querySelector(".pane-instructions");
  const pe = document.querySelector(".pane-editor");
  if (pi) pi.classList.toggle("active", mission);
  if (pe) pe.classList.toggle("active", !mission);
  if ((name === "code" || name === "assemble") && save.modality !== name) {
    save.modality = name; persist(); renderModalityToggle();
  }
  applyModalityUI();
  setTimeout(() => { try { ace.edit("editor").resize(); } catch (e) {} }, 50);
}

let wallShownThisSession = false;
function maybeShowWall() {
  if (wallShownThisSession || LV.id !== "L4") return;
  if (!save.stars["L4"]) return;
  wallShownThisSession = true;
  /* B5 — montrer d'abord les 4 niveaux prouvés, puis demander */
  const proven = WORLD.levels.slice(0, 4).map(l => {
    const s = save.stars[l.id] || 0;
    return `<span class="wall-proof${s > 0 ? " done" : ""}"><b>${l.title}</b>${s > 0 ? " ★".repeat(s) : ""}</span>`;
  }).join("");
  $("wall-proofs").innerHTML = proven;
  $("wall-stats").textContent =
    `${Object.keys(save.stars).length} niveaux gagnés · ${Object.values(save.stars).reduce((a, b) => a + b, 0)} étoiles`;
  $("wall-modal").classList.remove("hidden");
  $("wall-later").onclick = () => $("wall-modal").classList.add("hidden");
  $("wall-adult").onclick = () => {
    $("wall-modal").classList.add("hidden");
    toast("La création du compte parent arrive bientôt — en attendant, tout reste sur cet appareil.", "");
  };
}

/* B6 — fin du Monde 1 : artefact → bande des 8 mondes (Monde 2 en avant) → capture email */
function openEndWorld() {
  const code = isAssembleLevel() ? (buildCode() || "") : ace.edit("editor").getValue();
  $("endworld-code").textContent = (code && code.trim()) ? code.trim() : LV.starterCode.trim();
  $("endworld-band").innerHTML = WORLDS.map((w, i) => `
    <li class="band-item${w.active ? " done" : ""}${i === 1 ? " next" : ""}">
      <span class="band-num">${i + 1}</span>
      <span class="band-txt"><b>${w.title}</b><small>${w.what}</small></span>
      ${i === 0 ? '<em class="band-now">terminé</em>' : (i === 1 ? '<em class="band-next">à suivre</em>' : '<em class="band-soon">bientôt</em>')}
    </li>`).join("");
  $("endworld-modal").classList.remove("hidden");
}

/* ---------- 🎒 référence des actions : la syntaxe est un outil, la logique est la leçon (R11) ---------- */
const ACTIONS_REF = [
  { code: "hero.moveRight()", fr: "Va d'une case à droite" },
  { code: "hero.moveLeft()",  fr: "Va d'une case à gauche" },
  { code: "hero.moveUp()",    fr: "Va d'une case en haut" },
  { code: "hero.moveDown()",  fr: "Va d'une case en bas" },
  { code: "hero.pickup()",    fr: "Ramasse la gemme à tes pieds" },
  { code: "hero.seeWall()",   fr: "Vrai s'il y a un mur devant toi" }
];
const LEVEL_SYNTAX = {
  L3: [{ code: "for i in range(3):", fr: "Répète 3 fois la ligne suivante" }],
  L4: [{ code: "for i in range(3):", fr: "Répète 3 fois les lignes suivantes" }],
  L6: [{ code: "if hero.seeWall():", fr: "Si un mur est devant" }, { code: "else:", fr: "Sinon" }],
  L7: [{ code: "gems = gems + 1",    fr: "Ajoute 1 au compteur de gemmes" }],
  L8: [{ code: "def step():",        fr: "Déclare une nouvelle action « step »" }]
};

function renderActionsList() {
  const list = $("actions-list");
  list.innerHTML = "";
  const items = [...ACTIONS_REF, ...(LEVEL_SYNTAX[LV.id] || [])];
  items.forEach(a => {
    const row = document.createElement("button");
    row.className = "action-row";
    row.innerHTML = `<code>${a.code}</code><span>${a.fr}</span>`;
    row.onclick = () => {
      if (isAssembleLevel()) {
        if (a.code.startsWith("hero.")) { assembled.push(a.code); renderAssembleEditor(); }
        else toast("Cette écriture se fait à la main — essaie le mode ✍️", "");
        return;
      }
      const ed = ace.edit("editor");
      ed.insert(a.code + "\n");
      ed.focus();
    };
    list.appendChild(row);
  });
}

/* ---------- mode développeur (test) ---------- */
save.devMode = save.devMode === true || save.devMode === false ? save.devMode : null;

function showDevChoice() {
  const m = $("dev-modal");
  m.classList.remove("hidden");
  $("dev-user").onclick = () => { save.devMode = false; persist(); m.classList.add("hidden"); renderDevUI(); renderMap(); };
  $("dev-dev").onclick = () => { save.devMode = true; persist(); m.classList.add("hidden"); renderDevUI(); renderMap(); };
}

function renderDevUI() {
  const badge = $("dev-badge");
  if (badge) badge.classList.toggle("hidden", save.devMode !== true);
  const su = $("dev-set-user"), sd = $("dev-set-dev");
  if (su) su.classList.toggle("on", save.devMode === false);
  if (sd) sd.classList.toggle("on", save.devMode === true);
  const mi = $("menu-dev");
  if (mi) mi.textContent = save.devMode === true ? "🧪 Outils développeur · DEV" : "🧪 Outils développeur";
  const sel = $("dev-goto");
  if (sel && !sel.dataset.filled && typeof WORLD !== "undefined" && WORLD.levels) {
    sel.innerHTML = WORLD.levels.map(l => `<option value="${l.id}">${l.id} · ${l.title}</option>`).join("");
    sel.dataset.filled = "1";
  }
  const st = $("dev-state");
  if (st) st.textContent = JSON.stringify({
    build: window.WONDRA_BUILD || "?",
    mode: save.devMode === true ? "développeur" : (save.devMode === false ? "utilisateur" : "non choisi"),
    route: document.body.dataset.route || "?",
    unlocked: save.unlocked,
    modality: save.modality || null,
    character: save.character || null,
    stars: save.stars
  }, null, 1);
}

function setDevMode(on) {
  save.devMode = on; persist(); renderDevUI(); renderMap();
  toast(on ? "Mode développeur activé" : "Mode utilisateur activé", "ok");
}

function openDevPanel() { renderDevUI(); $("dev-panel").classList.remove("hidden"); }
function closeDevPanel() { $("dev-panel").classList.add("hidden"); }

async function hardReload() {
  try {
    if (window.caches) { const ks = await caches.keys(); await Promise.all(ks.map(k => caches.delete(k))); }
  } catch (e) { /* pas de cache API : on force quand même */ }
  const u = new URL(location.href);
  u.searchParams.set("r", Date.now());
  location.replace(u.toString());
}

function purgeAndReload() {
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

/* ---------- simulation sur grille ---------- */
const CELL = 64;
let canvas, cx;
let animFrame = 0;          // frame de marche (alterne a chaque pas)
setInterval(() => { if (sim && !sim.won) { animFrame ^= 1; if (typeof draw === "function") draw(); } }, 180);

function resetSim() {
  canvas = $("world");
  cx = canvas.getContext("2d");
  sim = {
    x: LV.start.hero[0], y: LV.start.hero[1],
    gems: (LV.start.gems || []).map(g => ({ x: g[0], y: g[1], taken: false })),
    single: LV.start.gem ? { x: LV.start.gem[0], y: LV.start.gem[1], taken: false } : null,
    walls: new Set((LV.start.walls || []).map(w => w.join(","))),
    gate: LV.start.gate || null,
    counter: 0,            // variable gems de l'enfant, suivie par la porte
    steps: 0, errors: 0, hintsUsed: 0, won: false
  };
  draw();
}

function draw() {
  const { cols, rows } = gridDims();
  cx.fillStyle = "#101d15";
  cx.fillRect(0, 0, canvas.width, canvas.height);

  // damier leger
  cx.fillStyle = "rgba(255,255,255,.025)";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
    if ((r + c) % 2 === 0) cx.fillRect(c * CELL, r * CELL, CELL, CELL);

  // murs
  cx.fillStyle = "#39424e";
  sim.walls.forEach(w => {
    const [c, r] = w.split(",").map(Number);
    roundRect(c * CELL + 4, r * CELL + 4, CELL - 8, CELL - 8, 8);
    cx.fill();
  });

  // porte
  if (sim.gate) {
    cx.fillStyle = sim.counter >= 3 ? "#59c86b" : "#e05d5d";
    roundRect(sim.gate[0] * CELL + 8, sim.gate[1] * CELL + 8, CELL - 16, CELL - 16, 8);
    cx.fill();
    cx.fillStyle = "#0c0f13";
    cx.font = "bold 20px Trebuchet MS";
    cx.fillText("3", sim.gate[0] * CELL + CELL / 2 - 6, sim.gate[1] * CELL + CELL / 2 + 7);
  }

  // gemmes
  const gems = sim.gems.length ? sim.gems : (sim.single ? [sim.single] : []);
  gems.forEach(g => {
    if (g.taken) return;
    cx.fillStyle = "#f5b83d";
    cx.beginPath();
    const gx = g.x * CELL + CELL / 2, gy = g.y * CELL + CELL / 2;
    cx.moveTo(gx, gy - 14); cx.lineTo(gx + 11, gy); cx.lineTo(gx, gy + 14);
    cx.lineTo(gx - 11, gy); cx.closePath(); cx.fill();
    cx.strokeStyle = "#a8761d"; cx.stroke();
  });

  // heros : personnage anime choisi par l'enfant
  const hx = sim.x * CELL + CELL / 2, hy = sim.y * CELL + CELL / 2;
  const char = CHARACTERS[save.character] || CHARACTERS.chat;
  pickCharacter(char, hx, hy, performance.now(), animFrame);
}

function gridDims() {
  if (LV.start.size) return { cols: LV.start.size[0], rows: LV.start.size[1] };
  const pts = [...(LV.start.walls || []),
    ...(LV.start.gems || []), ...(LV.start.gem ? [LV.start.gem] : []),
    LV.start.hero, ...(LV.start.gate ? [LV.start.gate] : [])];
  return {
    cols: Math.max(...pts.map(p => p[0])) + 2,
    rows: Math.max(...pts.map(p => p[1])) + 2
  };
}

function roundRect(x, y, w, h, r) {
  cx.beginPath();
  cx.moveTo(x + r, y);
  cx.arcTo(x + w, y, x + w, y + h, r);
  cx.arcTo(x + w, y + h, x, y + h, r);
  cx.arcTo(x, y + h, x, y, r);
  cx.arcTo(x, y, x + w, y, r);
  cx.closePath();
}

function toast(msg, cls) {
  const t = $("toast");
  t.textContent = msg;
  t.className = "toast " + (cls || "");
  setTimeout(() => t.classList.add("hidden"), 2600);
  t.classList.remove("hidden");
}

/* ---------- API exposee au code de l'enfant (sandboxee) ---------- */
/* Deux modes : "record" — les ordres du proxy ne MODIFIENT PAS la sim,
   ils sont seulement enregistres. "play" — le replay applique les ordres
   au vrai sim, pas a pas, avec auto-ramassage des gemmes. C'etait le bug :
   le proxy bougeait le sim pendant le run Aether, PUIS le replay
   recommencait -> double execution (x=5, steps=5). */
let simVirtual = null;   // etat fantome pour seeWall pendant le record

function makeHeroAPI(mode, orders) {
  const blocked = () => { throw new Error("Action impossible : mur ou bordure"); };
  const dims = () => gridDims();

  function step_(dx, dy) {
    if (mode === "record") {
      orders.push(step_.callName);
      simVirtual.x += dx; simVirtual.y += dy;   // fantome : sans draw ni collision
      return;
    }
    sim.steps++;
    const nx = sim.x + dx, ny = sim.y + dy;
    const { cols, rows } = dims();
    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) blocked();
    if (sim.walls.has(`${nx},${ny}`)) blocked();
    sim.x = nx; sim.y = ny;
    autoPickup();
    draw();
  }
  step_.callName = null;

  function autoPickup() {
    const hit = g => !g.taken && g.x === sim.x && g.y === sim.y;
    let took = false;
    if (sim.single && hit(sim.single)) { sim.single.taken = took = true; }
    sim.gems.forEach(g => { if (hit(g)) { g.taken = took = true; } });
    if (took) toast("💎 +1", "ok");
  }

  const api = {
    moveRight: () => { step_.callName = "moveRight"; step_(1, 0); },
    moveLeft:  () => { step_.callName = "moveLeft";  step_(-1, 0); },
    moveUp:    () => { step_.callName = "moveUp";    step_(0, -1); },
    moveDown:  () => { step_.callName = "moveDown";  step_(0, 1); },
    pickup: () => {
      if (mode === "record") { orders.push("pickup"); return; }
      const here = g => g.x === sim.x && g.y === sim.y;
      const notTaken = g => !g.taken && g.x === sim.x && g.y === sim.y;
      // idempotent : auto-pickup peut avoir deja pris la gemme du pas precedent
      if (sim.gems.some(here) || (sim.single && here(sim.single))) {
        sim.gems.forEach(g => { if (notTaken(g)) { g.taken = true; } });
        if (sim.single && notTaken(sim.single)) sim.single.taken = true;
        return;
      }
      throw new Error("Rien a ramasser ici");
    },
    seeWall: () => sim.walls.has(`${simVirtual.x + 1},${simVirtual.y}`)
  };
  return api;
}

/* ---------- validation ---------- */
function checkWin() {
  const gemsLeft = sim.gems.some(g => !g.taken) ||
                   (sim.single && !sim.single.taken);
  if (gemsLeft) return false;
  if (sim.gate) {
    if (sim.x !== sim.gate[0] || sim.y !== sim.gate[1]) return false;
    if (sim.counter < 3) return false;
    return true;
  }
  // sans porte : gagner = toutes les gemmes ramassees (unique OU multiples)
  return !(sim.single || sim.gems.length) ||
         !!sim.single && sim.single.taken ||
         sim.gems.length > 0;
}

function win() {
  sim.won = true;
  $("run-state").textContent = "Gagné !";
  $("run-state").className = "run-state ok";
  const base = sim.errors === 0 && sim.hintsUsed === 0 ? 3
             : (sim.errors === 0 || sim.hintsUsed === 0 ? 2 : 1);
  const prev = save.stars[LV.id] || 0;
  save.stars[LV.id] = Math.max(prev, base);
  const idx = WORLD.levels.findIndex(l => l.id === LV.id);
  if (save.unlocked < idx + 2) save.unlocked = Math.min(idx + 2, WORLD.levels.length);
  persist();
  $("btn-next").textContent = idx === WORLD.levels.length - 1 ? "Découvrir la suite →" : "Niveau suivant →";

  $("win-stars").innerHTML = starStr(base);
  $("win-msg").textContent =
    `${sim.steps} actions · ${sim.errors} erreur(s) · ${sim.hintsUsed} indice(s)`;
  const review = [];
  const code = isAssembleLevel() ? (buildCode() || "") : ace.edit("editor").getValue();
  if (/for\s+\w+\s+in\s+range/.test(code)) review.push("✔ Tu as utilisé une boucle for");
  if (/if\s+/.test(code) && /else/.test(code)) review.push("✔ Tu as utilisé if/else");
  if (/def\s+\w+\s*\(/.test(code)) review.push("✔ Tu as défini une fonction");
  if (/\w+\s*=\s*\w+\s*\+\s*1/.test(code)) review.push("✔ Tu as incrémenté une variable");
  if (!review.length) review.push("Des boucles et des fonctions t'attendent dans les prochains niveaux !");
  $("win-review-list").innerHTML = review.map(r => `<li>${r}</li>`).join("");
  $("win-code-review").classList.remove("hidden");
  $("win-modal").classList.remove("hidden");
  setTimeout(maybeShowWall, 900);
}

/* ---------- execution du code enfant via Aether ---------- */
async function runCode() {
  if (sim.won) return;
  const ed = ace.edit("editor");
  const code = isAssembleLevel() ? (buildCode() || "") : ed.getValue();
  if (!isAssembleLevel()) save.editor[LV.id] = code;
  persist();

  resetSim();
  $("run-state").textContent = "exécution…";
  $("run-state").className = "run-state";

  // Phase 1 — record : le code enfant tourne dans le sandbox, les ordres
  // sont collectes sur un etat fantome (le vrai sim ne bouge pas encore)
  const orders = [];
  simVirtual = { x: sim.x, y: sim.y };
  const hero = makeHeroAPI("record", orders);
  const proxy = hero;

  try {
    const aether = new Aether({ language: "python" });
    // Aether.addGlobal est FIGE au premier appel (protectBuiltins: `return if
    // addedGlobals[name]?`). Au 2e run de la page, l'ancien proxy serait rejoue.
    // Contourne : un forwarder unique, enregistre une seule fois, qui delegue
    // au hero courant de la page (window.__heroAPI), remplace a chaque run.
    if (!window.__heroForwarder) {
      const names = ["moveRight", "moveLeft", "moveUp", "moveDown", "pickup", "seeWall"];
      window.__heroForwarder = {};
      for (const n of names) window.__heroForwarder[n] = (...a) => window.__heroAPI[n](...a);
      Aether.addGlobal("hero", window.__heroForwarder);
    }
    window.__heroAPI = proxy;
    if (!window.__tickForwarder) {
      window.__tickForwarder = () => window.__heroTick && window.__heroTick();
      Aether.addGlobal("__tick", window.__tickForwarder);
    }
    window.__heroTick = () => { sim.counter++; };
    // exposition de la variable gems pour les niveaux avec porte :
    // on injecte un tracker sur l'affectation via le code source (simple et fiable)
    const tracked = code.replace(/\bgems\s*=\s*gems\s*\+\s*1\b/g, "gems = gems + 1 ; __tick()");

    aether.transpile(tracked);
    const fn = aether.createFunction();
    fn();

    // Phase 2 — replay : les ordres enregistres sont appliques au vrai sim,
    // pas a pas, avec collisions, dessin et auto-ramassage
    const vis = makeHeroAPI("play", orders);
    for (const name of orders) {
      vis[name]();
      await new Promise(r => setTimeout(r, 260));
    }

    if (checkWin()) { win(); return; }
    $("run-state").textContent = "Pas encore gagné — regarde l'objectif.";
    $("run-state").className = "run-state";
  } catch (e) {
    sim.errors++;
    $("run-state").textContent = "Erreur : " + e.message;
    $("run-state").className = "run-state err";
    $("world").classList.add("error-flash");
    setTimeout(() => $("world").classList.remove("error-flash"), 350);
  }
}

/* ---------- indices ---------- */
function showHint() {
  if (!LV.hints || !LV.hints.length) return;
  const i = Math.min(sim.hintsUsed, LV.hints.length - 1);
  sim.hintsUsed++;
  const box = $("hint-box");
  box.innerHTML = `💡 ${LV.hints[i]}`;
  box.classList.remove("hidden");
}

/* ---------- branchements ---------- */
(async function () {
  // attendre Aether/Esper charges par aether-loader.js
  await (window.kodawariEngineReady || Promise.resolve());
  applyRoute();
  renderCharPicker();
  renderModalityToggle();
  renderDevUI();
  const bt = $("build-tag"); if (bt) bt.textContent = window.WONDRA_BUILD || "";
  $("dev-link").onclick = (e) => { e.preventDefault(); openDevPanel(); };
  /* B4 — premier visiteur : mode utilisateur par défaut, aucun écran intermédiaire.
     Le mode développeur reste accessible via « Développeur ? » (pied de page) et le panneau ☰. */
  if (save.devMode === null) { save.devMode = false; persist(); renderDevUI(); }
  $("btn-back").onclick = backToMap;
  const menuBtn = $("btn-menu"), menuDrop = $("menu-drop");
  if (menuBtn && menuDrop) {
    menuBtn.onclick = (e) => { e.stopPropagation(); const open = menuDrop.hidden; menuDrop.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); };
    document.addEventListener("click", () => { menuDrop.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); });
    menuDrop.addEventListener("click", (e) => e.stopPropagation());
    menuDrop.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      menuDrop.hidden = true; menuBtn.setAttribute("aria-expanded", "false");
    }));
  }
  /* ---- panneau développeur : vrais outils ---- */
  const menuDev = $("menu-dev");
  if (menuDev) menuDev.onclick = () => {
    if (menuDrop) { menuDrop.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); }
    openDevPanel();
  };
  $("dev-close").onclick = closeDevPanel;
  $("dev-panel").onclick = (e) => { if (e.target === $("dev-panel")) closeDevPanel(); };
  $("dev-set-user").onclick = () => setDevMode(false);
  $("dev-set-dev").onclick = () => setDevMode(true);
  $("dev-unlock").onclick = () => {
    save.unlocked = WORLD.levels.length; persist(); renderDevUI(); renderMap();
    toast("Tous les niveaux débloqués", "ok");
  };
  $("dev-stars").onclick = () => {
    WORLD.levels.forEach(l => { save.stars[l.id] = 3; }); persist(); renderDevUI(); renderMap();
    toast("3 étoiles partout", "ok");
  };
  $("dev-modality").onclick = () => {
    delete save.modality; persist(); renderDevUI();
    toast("Choix écrire/assembler réinitialisé", "ok");
  };
  $("dev-purge").onclick = purgeAndReload;
  $("dev-cache").onclick = hardReload;
  $("dev-copy").onclick = () => {
    const txt = $("dev-state").textContent;
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => toast("État copié", "ok")).catch(() => toast("Copie refusée par le navigateur", "err"));
    else toast("Copie non disponible", "err");
  };
  $("dev-go").onclick = () => {
    const id = $("dev-goto").value || (WORLD.levels[0] && WORLD.levels[0].id);
    if (!id) { toast("Aucun niveau disponible", "err"); return; }
    closeDevPanel();
    if (location.hash === "#/jeu/" + id) applyRoute(); else location.hash = "#/jeu/" + id;
  };
  /* B4 — « Jouer » : niveau 1 immédiat au premier passage, carte ensuite */
  const hasPlayed = () => Object.keys(save.stars).length > 0 || save.unlocked > 1;
  document.querySelectorAll(".play-cta").forEach(a => {
    a.onclick = (e) => { e.preventDefault(); location.hash = hasPlayed() ? "#/jeu" : "#/jeu/L1"; };
  });
  /* B6 — fin de Monde 1 : « Plus tard » ferme la modale, rien n'est bloqué */
  const ewClose = $("endworld-later");
  if (ewClose) ewClose.onclick = () => $("endworld-modal").classList.add("hidden");
  $("btn-run").onclick = runCode;
  $("btn-run2").onclick = runCode;
  $("btn-actions").onclick = () => { renderActionsList(); $("actions-modal").classList.toggle("hidden"); };
  $("actions-modal").onclick = (e) => { if (e.target === $("actions-modal")) $("actions-modal").classList.add("hidden"); };
  const ac = $("actions-close"); if (ac) ac.onclick = () => $("actions-modal").classList.add("hidden");
  document.querySelectorAll(".level-tabs .ltab").forEach(b => b.addEventListener("click", () => activateTab(b.dataset.tab)));
  $("btn-hint").onclick = showHint;
  $("btn-reset").onclick = () => { resetSim(); $("run-state").textContent = ""; };
  $("btn-goal").onclick = () => $("goal-box").classList.toggle("hidden");
  $("btn-replay").onclick = () => { $("win-modal").classList.add("hidden"); resetSim(); };
  $("btn-next").onclick = () => {
    $("win-modal").classList.add("hidden");
    const idx = WORLD.levels.findIndex(l => l.id === LV.id);
    if (idx === WORLD.levels.length - 1) { openEndWorld(); return; }
    const next = WORLD.levels[idx + 1];
    if (next && (save.devMode === true || idx + 1 < save.unlocked)) location.hash = "#/jeu/" + next.id;
    else backToMap();
  };
})();