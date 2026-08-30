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
const screenMap = $("screen-map"), screenGame = $("screen-game");

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
  WORLD.levels.forEach((lv, i) => {
    const unlocked = i < save.unlocked;
    const done = save.stars[lv.id] > 0;
    const el = document.createElement("div");
    el.className = "node " + (done ? "done" : "") +
                   (i === save.unlocked - 1 && !done ? " current" : "") +
                   (unlocked ? "" : " locked");
    el.innerHTML = `
      <div class="portal">${unlocked ? (done ? "✓" : "⚔") : "🔒"}</div>
      <h3>${lv.title}</h3>
      <div class="meta">${lv.concept}</div>
      <div class="stars">${done ? starStr(save.stars[lv.id]) : "☆ ☆ ☆"}</div>
      ${i === save.unlocked - 1 && !done ? '<span class="state-tag">à toi</span>' : ""}
      ${!unlocked ? '<span class="state-tag">verrouillé</span>' : ""}`;
    if (unlocked) el.onclick = () => { location.hash = "#/jeu/" + lv.id; };
    holder.appendChild(el);
  });
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
  screenMap.classList.remove("visible");
  screenGame.classList.add("visible");
  setTimeout(() => ed.resize(), 50);
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
    screenGame.classList.remove("visible");
    screenMap.classList.add("visible");
    renderMap(); return;
  }
  document.body.dataset.route = "home";
  screenGame.classList.remove("visible");
  screenMap.classList.add("visible");
  renderMap();
}
window.addEventListener("hashchange", applyRoute);

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

  $("win-stars").innerHTML = starStr(base);
  $("win-msg").textContent =
    `${sim.steps} actions · ${sim.errors} erreur(s) · ${sim.hintsUsed} indice(s)`;
  const review = [];
  const code = ace.edit("editor").getValue();
  if (/for\s+\w+\s+in\s+range/.test(code)) review.push("✔ Tu as utilisé une boucle for");
  if (/if\s+/.test(code) && /else/.test(code)) review.push("✔ Tu as utilisé if/else");
  if (/def\s+\w+\s*\(/.test(code)) review.push("✔ Tu as défini une fonction");
  if (/\w+\s*=\s*\w+\s*\+\s*1/.test(code)) review.push("✔ Tu as incrémenté une variable");
  if (!review.length) review.push("Des boucles et des fonctions t'attendent dans les prochains niveaux !");
  $("win-review-list").innerHTML = review.map(r => `<li>${r}</li>`).join("");
  $("win-code-review").classList.remove("hidden");
  $("win-modal").classList.remove("hidden");
}

/* ---------- execution du code enfant via Aether ---------- */
async function runCode() {
  if (sim.won) return;
  const ed = ace.edit("editor");
  const code = ed.getValue();
  save.editor[LV.id] = code; persist();

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
  $("btn-back").onclick = backToMap;
  const menuBtn = $("btn-menu"), menuDrop = $("menu-drop");
  if (menuBtn && menuDrop) {
    menuBtn.onclick = (e) => { e.stopPropagation(); const open = menuDrop.hidden; menuDrop.hidden = !open; menuBtn.setAttribute("aria-expanded", String(open)); };
    document.addEventListener("click", () => { menuDrop.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); });
    menuDrop.addEventListener("click", (e) => e.stopPropagation());
  }
  $("btn-run").onclick = runCode;
  $("btn-run2").onclick = runCode;
  $("btn-hint").onclick = showHint;
  $("btn-reset").onclick = () => { resetSim(); $("run-state").textContent = ""; };
  $("btn-goal").onclick = () => $("goal-box").classList.toggle("hidden");
  $("btn-replay").onclick = () => { $("win-modal").classList.add("hidden"); resetSim(); };
  $("btn-next").onclick = () => {
    $("win-modal").classList.add("hidden");
    backToMap();
  };
})();