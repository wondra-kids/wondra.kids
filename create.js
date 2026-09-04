/* =========================================================================
   WONDRA CREATE — Monde 1 « Le Quai des signaux » (pilote jouable)
   Page autonome : platform/create.html + platform/create.js

   Logique en pur JavaScript : la simulation (runStage) est une fonction pure
   d'un (stage, seq). Aucune dépendance au DOM : on peut donc tester chaque
   solution canonique sans navigateur (test headless / node). L'initialisation
   DOM n'a lieu QUE si document existe (appel init() sur DOMContentLoaded).

   Commandes (sémantique LightBot) :
     A  AVANCE  (FORWARD) : 1 case dans la direction (départ face EST).
     T  TOURNE  (TURN)    : pivot 90° horaire sur place.
     R  RAMASSE (PICK UP) : ramasse le cristal sous Galet.
     L  ALLUME  (LIGHT)   : allume la lanterne si Galet est sur la plateforme.

   Géométrie = couche produit (table STAGES) ; textes = bundle CREATE_MISSIONS.
   ========================================================================= */

/* ---- Garde : la simulation pure fonctionne même sans DOM ---- */
const HAS_DOM = (typeof document !== "undefined" && !!document);

/* Labels des commandes FR/EN (vocabulaire du Quai des signaux). */
const CMD_META = {
  A: { fr: "AVANCE",  en: "FORWARD" },
  T: { fr: "TOURNE",  en: "TURN" },
  R: { fr: "RAMASSE", en: "PICK UP" },
  L: { fr: "ALLUME",  en: "LIGHT" }
};

/* Sens horaire (écran) : E→S→W→N. */
const DIRS = { E: [1, 0], S: [0, 1], W: [-1, 0], N: [0, -1] };
const ROT_CW = { E: "S", S: "W", W: "N", N: "E" };

/* Ordre des 8 missions du Monde 1. */
const W1_ORDER = ["w1p1", "w1p2", "w1p3", "w1p4", "w1p5", "w1p6", "w1p7", "w1p8"];

/* ------------------------------------------------------------------ */
/* STAGES — géométrie produit (grille col,row ; départ face EST).
   commandes : sous-ensemble de {A,T,R,L} autorisé pour l'étape.
   solution  : séquence canonique VÉRIFIÉE (won + 0 erreur), test automatique. */
const STAGES = {
  w1p1: {
    cols: 5, rows: 2,
    hero: [0, 0], facing: "E",
    pastille: [4, 0],
    walls: [],
    crystals: [],
    lanterns: [],
    commands: ["A"],
    role: "introduction",
    solution: ["A", "A", "A", "A"]
  },
  w1p2: {
    cols: 5, rows: 3,
    hero: [0, 1], facing: "E",
    pastille: [1, 2], goalType: "crystal",
    walls: [[1, 0]],
    crystals: [],
    lanterns: [],
    commands: ["A", "T"],
    role: "worked_example",
    solution: ["A", "T", "A"]
  },
  w1p3: {
    kind: "spell_grid",
    fixWords: ["A", "T"],
    cols: 7, rows: 3,
    hero: [0, 1], facing: "E",
    pastille: null,
    walls: [],
    crystals: [[2, 1], [4, 1]],
    lanterns: [[6, 1]],
    commands: ["A", "T", "R", "L"],
    role: "guided_practice",
    solution: ["A", "A", "R", "A", "A", "R", "A", "A", "L"]
  },
  w1p4: {
    cols: 6, rows: 4,
    hero: [0, 2], facing: "E",
    pastille: null,
    walls: [],
    crystals: [],
    lanterns: [[3, 2], [5, 3]],
    landmarks: [{ type: "hut", at: [0, 1] }],
    commands: ["A", "T", "L"],
    role: "guided_practice",
    solution: ["A", "A", "A", "L", "A", "A", "T", "A", "L"]
  },
  w1p5: {
    cols: 7, rows: 3,
    hero: [0, 1], facing: "E",
    pastille: null,
    walls: [[2, 0], [4, 0], [6, 0]],
    crystals: [[1, 1], [3, 1], [5, 1]],
    lanterns: [],
    commands: ["A", "T", "R"],
    role: "independent_practice",
    efficiency: 8,
    solution: ["A", "R", "A", "A", "R", "A", "A", "R"]
  },
  w1p6: {
    kind: "match_quiz",
    cols: 6, rows: 3,
    hero: [0, 1], facing: "E",
    pastille: null,
    walls: [], crystals: [], lanterns: [],
    commands: [],
    role: "retrieval",
    solution: []
  },
  w1p7: {
    cols: 8, rows: 5,
    hero: [0, 1], facing: "E",
    pastille: [4, 3], goalType: "ramp",
    walls: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
            [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]],
    buoys: [[5, 1]],
    crystals: [], lanterns: [],
    commands: ["A", "T"],
    role: "transfer",
    heroType: "boat",
    solution: ["A", "A", "A", "A", "T", "A", "A"]
  },
  w1p8: {
    cols: 9, rows: 5,
    hero: [0, 1], facing: "E",
    pastille: null,
    walls: [[1, 0], [3, 0], [5, 0], [7, 0], [8, 0], [2, 4], [4, 4], [6, 4]],
    crystals: [[2, 1], [3, 3]],
    lanterns: [[7, 2]],
    landmarks: [{ type: "mast", at: [3, 1] }],
    commands: ["A", "T", "R", "L"],
    role: "checkpoint",
    solution: ["A", "A", "R", "A", "T", "A", "A", "R", "T", "T", "A", "T", "A", "A", "A", "A", "L"]
  }
};

/* Noms de rôle FR/EN pour les badges de la carte. */
const ROLE_LABEL = {
  introduction:        { fr: "Introduction", en: "Introduction" },
  worked_example:      { fr: "Exemple guidé", en: "Worked example" },
  guided_practice:     { fr: "Pratique guidée", en: "Guided practice" },
  independent_practice:{ fr: "En autonomie", en: "Independent practice" },
  retrieval:           { fr: "Révision", en: "Review" },
  transfer:            { fr: "Transfert", en: "Transfer" },
  checkpoint:          { fr: "Épreuve finale", en: "Final challenge" }
};

/* ---------------------------------------------------------------- */
/* Simulation pure — aucun accès au DOM.                             */
/* ---------------------------------------------------------------- */

/* Renseigne l'état initial à partir de la géométrie. Objets portés avec un
   statut individuel (crystals[].taken, lanterns[].lit) pour un dessin fidèle. */
function freshState(stage) {
  return {
    x: stage.hero[0],
    y: stage.hero[1],
    face: stage.facing || "E",
    crystals: (stage.crystals || []).map(c => ({ x: c[0], y: c[1], taken: false })),
    lanterns: (stage.lanterns || []).map(l => ({ x: l[0], y: l[1], lit: false })),
    crystalsTaken: 0,
    lanternsLit: 0,
    pastilleReached: stage.pastille ? false : true
  };
}

function objectivesDone(stage, st) {
  return st.pastilleReached &&
    st.crystalsTaken === (stage.crystals || []).length &&
    st.lanternsLit === (stage.lanterns || []).length;
}

/* Applique UNE commande sur `state` (muté). Retourne {ok, errType, won}.
   Pure au sens logique (aucun accès extérieur). Utilisée pour l'exécution
   pas à pas comme pour la boucle de test complète. */
function applyOne(stage, state, cmd) {
  const walls = stage._walls || (stage._walls = new Set([...(stage.walls || []), ...(stage.buoys || [])].map(w => w.join(","))));
  const key = (x, y) => x + "," + y;
  function out(x, y) { return x < 0 || y < 0 || x >= stage.cols || y >= stage.rows; }

  if (cmd === "A") {
    const d = DIRS[state.face];
    const nx = state.x + d[0], ny = state.y + d[1];
    if (out(nx, ny) || walls.has(key(nx, ny))) return { ok: false, errType: "wall" };
    state.x = nx; state.y = ny;
    if (stage.pastille && nx === stage.pastille[0] && ny === stage.pastille[1]) state.pastilleReached = true;
  } else if (cmd === "T") {
    state.face = ROT_CW[state.face];
  } else if (cmd === "R") {
    const c = state.crystals.find(c => c.x === state.x && c.y === state.y && !c.taken);
    if (!c) return { ok: false, errType: "crystal" };
    c.taken = true; state.crystalsTaken++;
  } else if (cmd === "L") {
    const l = state.lanterns.find(l => l.x === state.x && l.y === state.y && !l.lit);
    if (!l) return { ok: false, errType: "lantern" };
    l.lit = true; state.lanternsLit++;
  } else {
    return { ok: false, errType: "command" };
  }
  return { ok: true, errType: null, won: objectivesDone(stage, state) };
}

/* Exécute une séquence complète (départ vierge). Fonction PURE.
   Retourne {won, errors, steps, errorIdx, errType, state}. */
function executeSeq(stage, seq) {
  const state = freshState(stage);
  const steps = seq.length;
  for (let i = 0; i < seq.length; i++) {
    const r = applyOne(stage, state, seq[i]);
    if (!r.ok) {
      return {
        won: false, errors: 1, steps: i, errorIdx: i, errType: r.errType, state: state
      };
    }
    if (r.won) {
      return { won: true, errors: 0, steps: i + 1, errorIdx: -1, errType: null, state: state };
    }
  }
  return {
    won: objectivesDone(stage, state), errors: 0, steps: steps,
    errorIdx: -1, errType: null, state: state
  };
}

/* runStage : fonction pure (stage, seq). Point d'entrée des tests. */
function runStage(stage, seq) {
  return executeSeq(stage, seq || []);
}

/* API de test exposée (utilisée en console / headless) :
   __testStage('w1p1', ['A','A','A','A']) => {won, errors, steps, state} */
if (typeof window !== "undefined") {
  window.__testStage = function (stageId, seq) {
    if (!STAGES[stageId]) return { error: "unknown stage " + stageId };
    return runStage(STAGES[stageId], seq || []);
  };
  window.__CREATE_STAGES = STAGES;
  window.__RUN_STAGE = runStage;
}

/* ------------------------------------------------------------------ */
/* Partie DOM — ne s'exécute que si document existe.                  */
/* ------------------------------------------------------------------ */

const CELL = 64;
const SAVE_KEY = "kodawari-create-v1";
const STEP_MS = 280;

let save = null;
let ui = {};           // références DOM
let current = null;    // {stageId, stage, lang, seq:[], errorsThis, hintsThis, timer}
let running = false;

function getLang(s) { return (s && s.lang === "en") ? "en" : "fr"; }

/* -- Lecture / écriture de la progression (clé séparée) -- */
function loadSave() {
  try {
    const raw = (typeof localStorage !== "undefined") && localStorage.getItem(SAVE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      s.stars = s.stars || {};
      if (!s.unlocked || s.unlocked < 1) s.unlocked = 1;
      return s;
    }
  } catch (e) { /* ignore */ }
  return { lang: "fr", stars: {}, unlocked: 1 };
}
function persistSave() {
  try {
    if (typeof localStorage !== "undefined") localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (e) { /* ignore */ }
}

/* Raccourci DOM + création d'élément. */
function el(id) { return document.getElementById(id); }
function mkl(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined && text !== null) n.textContent = text;
  return n;
}
function t(s) {
  return (s && typeof s === "object") ? (s[currentLang()] !== undefined ? s[currentLang()] : s.fr) : s;
}
function currentLang() { return save ? save.lang : "fr"; }

/* Cartographie bundle → étape : stage 'w1p1' lit CREATE_MISSIONS['create_w1_p1']. */
function bundleKey(stageId) { return "create_w1_" + stageId.slice(2); }   // w1p1 -> create_w1_p1
function missionContent(stageId) {
  const b = (typeof window !== "undefined" && window.CREATE_MISSIONS) ? window.CREATE_MISSIONS : null;
  return b ? b[bundleKey(stageId)] : null;
}

/* ------------------------------------------------------------------ */
/* Init DOM                                                           */
/* ------------------------------------------------------------------ */
function init() {
  save = loadSave();
  buildTopbar();
  route();
}

function buildTopbar() {
  // Le HTML statique fournit les boutons ; on câble les écouteurs ici.
  ui.langFr = el("lang-fr");
  ui.langEn = el("lang-en");
  if (ui.langFr) ui.langFr.addEventListener("click", () => setLang("fr"));
  if (ui.langEn) ui.langEn.addEventListener("click", () => setLang("en"));
  ui.back = el("back-btn");
  if (ui.back) ui.back.addEventListener("click", () => location.hash = "#/w1");
}

function setLang(l) {
  save.lang = l;
  persistSave();
  refreshLang();
  route();   // relit la vue courante avec la nouvelle langue
}

function refreshLang() {
  const fr = currentLang() === "fr";
  if (ui.langFr) ui.langFr.classList.toggle("active", fr);
  if (ui.langEn) ui.langEn.classList.toggle("active", !fr);
}

/* ------------------------------------------------------------------ */
/* Routage par hash :  #/w1  (carte)  |  #/w1/pN  (mission)           */
/* ------------------------------------------------------------------ */
function route() {
  if (running) stopRun();
  closeModal();   // naviguer (continuer / retour) ferme toute modale ouverte
  const h = (location.hash || "").replace(/^#\/?/, "");
  let view = el("screen-map"), mission = null;
  const parts = h.split("/");          // ['w1'] ou ['w1','w1p3'] ou ['w1','p3']
  if (parts.length >= 2) {
    if (/^w1p[1-8]$/.test(parts[1])) {
      mission = parts[1];
    } else if (/^p[1-8]$/.test(parts[1])) {
      const n = parseInt(parts[1].slice(1), 10);
      mission = W1_ORDER[n - 1];
    }
    if (mission) {
      const n = W1_ORDER.indexOf(mission) + 1;
      if (n <= save.unlocked) view = el("screen-mission");
      else { view = el("screen-map"); mission = null; }
    } else {
      view = el("screen-map");
    }
  } else {
    view = el("screen-map");
  }
  el("screen-map").classList.toggle("visible", view === el("screen-map"));
  el("screen-mission").classList.toggle("visible", view === el("screen-mission"));
  refreshLang();
  if (view === el("screen-map")) renderMap();
  if (mission) startMission(mission);
}

function renderMap() {
  const holder = el("missions");
  if (!holder) return;
  holder.textContent = "";
  const lang = currentLang();
  W1_ORDER.forEach((id, i) => {
    const idx = i + 1;
    const st = STAGES[id];
    const mc = missionContent(id);
    const name = mc ? mc.i18n[lang].name : (id + " — " + st.role);
    const locked = idx > save.unlocked;
    const stars = save.stars[id] || 0;
    const card = mkl("button", "mission-card" + (locked ? " locked" : "") + (idx === save.unlocked ? " next" : ""));
    card.setAttribute("type", "button");
    card.setAttribute("aria-label", (locked ? "Verrouillé. " : "") + name + ". Étoiles : " + stars + " sur 3.");
    if (!locked) card.addEventListener("click", () => { location.hash = "#/w1/" + id; });

    const num = mkl("div", "mc-num", "Étape " + idx);
    const role = mkl("div", "mc-role", ROLE_LABEL[st.role] ? ROLE_LABEL[st.role][lang] : st.role);
    const nm = mkl("div", "mc-name", name);
    if (mc && mc.competency) nm.setAttribute("title", mc.competency);
    const starsEl = mkl("div", "mc-stars", starsBadge(stars, lang));
    card.appendChild(num);
    card.appendChild(role);
    card.appendChild(nm);
    card.appendChild(starsEl);
    if (locked) {
      const lock = mkl("div", "mc-lock", "🔒");
      card.appendChild(lock);
    }
    holder.appendChild(card);
  });

  // En-tête de la carte
  const mh = el("map-title");
  if (mh) {
    const mc = missionContent("w1p1");
    mh.textContent = (mc && mc.i18n[lang].name) ? "Monde 1 — Le Quai des signaux" : "Monde 1 — Le Quai des signaux";
  }
  const msub = el("map-sub");
  if (msub) {
    const done = W1_ORDER.filter(id => save.stars[id]).length;
    msub.textContent = done + " / 8 missions réussies";
  }
}

function starsBadge(n, lang) {
  const full = "★", empty = "☆";
  let s = "";
  for (let i = 0; i < 3; i++) s += (i < n) ? full : empty;
  return s;
}

/* ------------------------------------------------------------------ */
/* Mission                                                            */
/* ------------------------------------------------------------------ */
function startMission(id) {
  const st = STAGES[id];
  const mc = missionContent(id);
  const lang = currentLang();
  current = {
    stageId: id, stage: st, lang: lang,
    seq: [], errorsThis: 0, hintsThis: 0, timer: null,
    repaired: {}, quiz: null
  };

  // Titres et libellés
  const title = el("mission-name");
  if (title) title.textContent = mc ? mc.i18n[lang].name : id;
  const roleEl = el("mission-role");
  if (roleEl && ROLE_LABEL[st.role]) roleEl.textContent = "Étape " + (W1_ORDER.indexOf(id) + 1) + " · " + ROLE_LABEL[st.role][lang];
  el("screen-mission").setAttribute("data-stage", id);

  // Panneau instructions
  const hookEl = el("inst-hook"), instEl = el("inst-instructions");
  if (hookEl && mc) hookEl.textContent = mc.i18n[lang].hook;
  if (instEl && mc) instEl.textContent = mc.i18n[lang].instructions;

  // Indices (boutons dévoilés un à un) + compteur d'usage
  const hintsBox = el("inst-hints");
  if (hintsBox) {
    hintsBox.textContent = "";
    const tips = (mc && mc.i18n[lang].hints) || [];
    const hintHead = mkl("div", "block-title", lang === "fr" ? "💡 Indices (en cas de blocage)" : "💡 Hints (if you're stuck)");
    hintsBox.appendChild(hintHead);
    if (tips.length) {
      const reveal = mkl("button", "btn ghost small", lang === "fr" ? "Afficher un indice" : "Show a hint");
      reveal.type = "button";
      reveal.setAttribute("aria-label", "Afficher un indice de la mission");
      let shown = 0;
      reveal.addEventListener("click", () => {
        if (shown < tips.length) {
          current.hintsThis++;
          const li = mkl("div", "hint-li", "→ " + tips[shown]);
          hintsBox.appendChild(li);
          shown++;
          if (shown >= tips.length) reveal.remove();
          persistAttempt();
        }
      });
      hintsBox.appendChild(reveal);
    } else {
      hintsBox.appendChild(mkl("div", "muted", lang === "fr" ? "Pas d'indice pour cette étape." : "No hints for this step."));
    }
  }

  // Objectif (construit depuis la géométrie + langue)
  const goal = el("inst-goal");
  if (goal) {
    goal.textContent = "";
    const items = objectiveLines(st, lang);
    const gHead = mkl("div", "block-title", lang === "fr" ? "🎯 Objectif" : "🎯 Goal");
    goal.appendChild(gHead);
    items.forEach(it => goal.appendChild(mkl("div", "goal-li", it)));
  }

  // Palette + liste
  buildPalette(st, lang);
  renderCommandList(lang);

  // Boutons d'action
  bindActionButtons();

  // Zones spéciales : p3 (mots à réparer), p6 (machines + question)
  renderSpecialZone(st, lang);

  // Canvas : dimension selon la grille, redessin
  const canvas = el("world");
  if (canvas) {
    canvas.width = st.cols * CELL;
    canvas.height = st.rows * CELL;
    // adaptation mobile : CSS réduit l'affichage, la résolution interne reste nette
  }
  resetSim();
  el("screen-mission").classList.remove("hidden");
  el("screen-map").classList.remove("hidden");
}

function objectiveLines(st, lang) {
  const lines = [];
  if (st.pastille) {
    if (st.goalType === "ramp") {
      lines.push(lang === "fr"
        ? "Amène la barque sur la rampe du phare, sans toucher la bouée ni la berge."
        : "Bring the boat to the lighthouse ramp, without touching the buoy or the bank.");
    } else if (st.goalType === "crystal") {
      lines.push(lang === "fr" ? "Fais toucher le cristal à Galet." : "Make Galet touch the crystal.");
    } else {
      lines.push(lang === "fr" ? "Fais poser la patte de Galet sur la pastille dorée." : "Get Galet's paw onto the golden spot.");
    }
  }
  (st.crystals || []).forEach(() => lines.push(lang === "fr" ? "Ramasse un cristal (commande RAMASSE)." : "Pick up a crystal (PICK UP command)."));
  (st.lanterns || []).forEach(() => lines.push(lang === "fr" ? "Allume une lanterne sur sa plateforme (ALLUME)." : "Light a lantern on its platform (LIGHT)."));
  return lines;
}

function buildPalette(st, lang) {
  const pal = el("palette");
  if (!pal) return;
  pal.textContent = "";
  const allowed = st.commands || Object.keys(CMD_META);
  const label = (c) => CMD_META[c] ? CMD_META[c][lang] : c;
  allowed.forEach(c => {
    const b = mkl("button", "cmd-btn cmd-" + c, label(c));
    b.type = "button";
    b.setAttribute("aria-label", "Ajouter la commande " + label(c));
    // p3 : mots cassés à réparer avant usage
    const broken = st.kind === "spell_grid" && (st.fixWords || []).includes(c) && !(current.repaired || {})[c];
    if (broken) {
      b.disabled = true;
      b.classList.add("broken");
      b.title = lang === "fr" ? "Commande cassée — répare le mot d'abord." : "Broken command — fix the word first.";
    } else {
      b.addEventListener("click", () => {
        if (!running) {
          current.seq.push(c);
          renderCommandList(lang);
        }
      });
    }
    pal.appendChild(b);
  });
}

function bindActionButtons() {
  ui.clearBtn = el("clear-btn");
  ui.runBtn = el("run-btn");
  ui.stopBtn = el("stop-btn");
  if (ui.clearBtn) { ui.clearBtn.onclick = () => { if (running) return; current.seq = []; renderCommandList(currentLang()); }; }
  if (ui.runBtn) ui.runBtn.onclick = () => startRun();
  if (ui.stopBtn) ui.stopBtn.onclick = () => stopRun();
}

function renderCommandList(lang) {
  const holder = el("cmd-list");
  if (!holder) return;
  holder.textContent = "";
  const label = (c) => CMD_META[c] ? CMD_META[c][lang] : c;
  current.seq.forEach((c, i) => {
    const row = mkl("div", "cmd-item cmd-" + c);
    row.setAttribute("data-idx", i);
    const code = mkl("span", "cmd-code", (i + 1) + ". " + label(c));
    row.appendChild(code);
    // déplacement (optionnel) et suppression
    const up = mkl("button", "mini", "↑"); up.type = "button"; up.setAttribute("aria-label", "Monter la commande");
    const dn = mkl("button", "mini", "↓"); dn.type = "button"; dn.setAttribute("aria-label", "Descendre la commande");
    const rm = mkl("button", "mini", "✕"); rm.type = "button"; rm.setAttribute("aria-label", "Supprimer la commande");
    up.addEventListener("click", () => { if (running) return; if (i > 0) { const [x] = current.seq.splice(i, 1); current.seq.splice(i - 1, 0, x); renderCommandList(lang); } });
    dn.addEventListener("click", () => { if (running) return; if (i < current.seq.length - 1) { const [x] = current.seq.splice(i, 1); current.seq.splice(i + 1, 0, x); renderCommandList(lang); } });
    rm.addEventListener("click", () => { if (running) return; current.seq.splice(i, 1); renderCommandList(lang); });
    row.appendChild(up);
    row.appendChild(dn);
    row.appendChild(rm);
    holder.appendChild(row);
  });
  const count = el("cmd-count");
  if (count) count.textContent = current.seq.length + (lang === "fr" ? " commande(s)" : " command(s)");
  persistAttempt();
  previewFirstMission(lang);
}

/* P1 : chaque clic montre immédiatement le pas ajouté, sans valider la victoire.
   Le bouton Exécuter reste le moment où la liste complète est évaluée. */
function previewFirstMission(lang) {
  if (!current || current.stageId !== "w1p1" || running) return;
  const canvas = el("world"), ctx = canvas ? canvas.getContext("2d") : null;
  if (!canvas || !ctx) return;
  const preview = freshState(current.stage);
  for (const cmd of current.seq) {
    const result = applyOne(current.stage, preview, cmd);
    if (!result.ok || result.won) break;
  }
  simState = preview;
  draw(ctx, simState);
  if (current.seq.length) {
    setRunState(lang === "fr" ? "Aperçu immédiat — exécute ta liste pour la valider." : "Instant preview — run your list to validate it.", "ok");
  }
}

/* Comptage étoiles de la tentative en cours. */
/* ------------------------------------------------------------------ */
/* Zones spéciales : p3 « Le mot exact » (réparation de mots cassés)   */
/* et p6 « La carte des commandes » (machines + question de Luciole).  */
/* ------------------------------------------------------------------ */
const QUIZ_DATA = {
  machines: [
    { cmd: "A", icon: "🛒",
      fr: { name: "La charrette", wants: "veut rouler" },
      en: { name: "The cart", wants: "wants to roll" } },
    { cmd: "T", icon: "🌀",
      fr: { name: "Le moulin", wants: "veut tourner" },
      en: { name: "The windmill", wants: "wants to turn" } },
    { cmd: "R", icon: "🏗️",
      fr: { name: "La grue", wants: "veut soulever" },
      en: { name: "The crane", wants: "wants to lift" } }
  ],
  question: {
    fr: "Quel est le secret pour qu'une commande fonctionne ?",
    en: "What is the secret for a command to work?"
  },
  answers: [
    { ok: true,
      fr: "C'est un mot exact de la carte des commandes.",
      en: "It must be an exact word from the command map." },
    { ok: false,
      fr: "Il faut cliquer plusieurs fois très vite.",
      en: "You have to click several times very fast." },
    { ok: false,
      fr: "N'importe quel mot peut fonctionner.",
      en: "Any word can work." }
  ]
};

function shuffleArr(a) {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = r[i]; r[i] = r[j]; r[j] = t;
  }
  return r;
}

function renderSpecialZone(st, lang) {
  const sp = el("panel-special");
  const pc = el("panel-canvas"), pp = el("panel-palette"), pl = el("panel-list");
  const kind = st.kind || "grid";
  if (!sp) return;
  sp.textContent = "";
  const isGrid = kind !== "match_quiz";
  if (pc) pc.classList.toggle("hidden", !isGrid);
  if (pp) pp.classList.toggle("hidden", !isGrid);
  if (pl) pl.classList.toggle("hidden", !isGrid);
  sp.classList.toggle("hidden", kind === "grid");
  if (kind === "match_quiz") { buildQuiz(st, lang); return; }
  if (kind === "spell_grid") { buildRepairPanel(st, lang); }
}

const BROKEN_WORDS = {
  A: { fr: "AVVANCE", en: "FORRWARD" },
  T: { fr: "TOUNE", en: "TRN" }
};

function buildRepairPanel(st, lang) {
  const sp = el("panel-special");
  sp.textContent = "";
  const head = mkl("div", "block-title", lang === "fr"
    ? "🔧 Répare les commandes cassées (clique les lettres dans l'ordre)"
    : "🔧 Fix the broken commands (tap the letters in order)");
  sp.appendChild(head);
  const wrap = mkl("div", "repair-wrap");
  sp.appendChild(wrap);
  (st.fixWords || []).forEach(cmd => {
    const word = CMD_META[cmd][lang].replace(/ /g, "");      // AVANCE / FORWARD…
    const row = mkl("div", "repair-row");
    row.setAttribute("data-cmd", cmd);
    const brokenWord = (BROKEN_WORDS[cmd] && BROKEN_WORDS[cmd][lang]) || "?";
    const info = mkl("div", "repair-label", (lang === "fr" ? "Commande cassée : " : "Broken command: ") + brokenWord);
    const tiles = mkl("div", "repair-tiles");
    row.appendChild(info);
    row.appendChild(tiles);
    // lettres du mot + lettres parasites
    const used = new Set(word.split(""));
    const decoys = [];
    const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (const ch of pool) { if (decoys.length >= 2) break; if (!used.has(ch)) decoys.push(ch); }
    const letters = shuffleArr(word.split("").concat(decoys));
    let progress = 0;
    const buildProg = mkl("div", "repair-prog");
    row.appendChild(buildProg);
    letters.forEach(ch => {
      const t = mkl("button", "rtile", ch);
      t.type = "button";
      t.setAttribute("aria-label", "Lettre " + ch);
      t.addEventListener("click", () => {
        if (progress >= word.length) return;
        if (ch === word[progress]) {
          progress++;
          t.classList.add("used");
          buildProg.textContent = word.slice(0, progress);
          if (progress === word.length) {
            current.repaired[cmd] = true;
            row.classList.add("fixed");
            const all = (st.fixWords || []).every(c => current.repaired[c]);
            if (all) {
              toast(lang === "fr" ? "Mots réparés ! Galet hoche la tête." : "Words fixed! Galet nods.", "ok");
              buildPalette(st, lang);   // active les commandes dans la carte
            }
          }
        } else {
          current.errorsThis++;
          t.classList.add("wrong");
          setTimeout(() => t.classList.remove("wrong"), 400);
          toast(lang === "fr" ? "Pas la bonne lettre — compare avec la carte des commandes." : "Wrong letter — compare with the command card.", "err");
        }
      });
      tiles.appendChild(t);
    });
    wrap.appendChild(row);
  });
}

/* ----- p6 : associer chaque machine à sa commande, puis répondre à Luciole ----- */
function buildQuiz(st, lang) {
  const sp = el("panel-special");
  sp.textContent = "";
  const intro = mkl("p", "inst", lang === "fr"
    ? "Clique la bonne commande sur chaque machine pour la réveiller."
    : "Tap the right command on each machine to wake it up.");
  sp.appendChild(intro);
  const machinesBox = mkl("div", "quiz-machines");
  sp.appendChild(machinesBox);
  const cmdLabel = c => CMD_META[c] ? CMD_META[c][lang] : c;

  current.quiz = { assigned: 0, answered: false };
  QUIZ_DATA.machines.forEach(m => {
    const row = mkl("div", "machine-row");
    row.setAttribute("data-cmd", m.cmd);
    const icon = mkl("span", "m-icon", m.icon);
    const who = mkl("span", "m-name", m[lang].name);
    const wants = mkl("span", "m-wants", m[lang].wants);
    const opts = mkl("span", "m-opts");
    row.appendChild(icon); row.appendChild(who); row.appendChild(wants); row.appendChild(opts);
    ["A", "T", "R"].forEach(c => {
      const b = mkl("button", "btn small m-opt", cmdLabel(c));
      b.type = "button";
      b.addEventListener("click", () => {
        if (current.quiz.assigned >= 3) return;
        if (c === m.cmd) {
          current.quiz.assigned++;
          row.classList.add("ok");
          row.setAttribute("aria-label", m[lang].name + " réveillée avec " + cmdLabel(c));
          opts.textContent = "→ " + cmdLabel(c);
          if (current.quiz.assigned === 3) showQuizQuestion(lang);
        } else {
          current.errorsThis++;
          toast(lang === "fr" ? "Cette machine n'attend pas cette commande. Réessaie." : "This machine is not waiting for that command. Try again.", "err");
        }
      });
      opts.appendChild(b);
    });
    machinesBox.appendChild(row);
  });
}

function showQuizQuestion(lang) {
  const sp = el("panel-special");
  const q = mkl("div", "quiz-question");
  q.appendChild(mkl("p", "quiz-q", "🦋 " + QUIZ_DATA.question[lang]));
  shuffleArr(QUIZ_DATA.answers).forEach(a => {
    const b = mkl("button", "btn big quiz-ans", a[lang]);
    b.type = "button";
    b.addEventListener("click", () => {
      if (current.quiz.answered) return;
      if (a.ok) {
        current.quiz.answered = true;
        finishQuiz(true);
      } else {
        current.errorsThis++;
        toast(lang === "fr" ? "Pas tout à fait… Réessaie." : "Not quite… Try again.", "err");
      }
    });
    q.appendChild(b);
  });
  sp.appendChild(q);
}

function finishQuiz(won) {
  if (won) {
    const stars = computeStars(1);
    recordWin(current.stageId, stars);
    showVictory(stars);
  }
}

function persistAttempt() {
  // (garde en mémoire pour les états d'écran ; le vrai save se fait à la victoire)
  if (el("run-state")) el("run-state").textContent = "";
}

/* ------------------------------------------------------------------ */
/* Simulation visuelle (pas à pas)                                    */
/* ------------------------------------------------------------------ */
function resetSim() {
  const canvas = el("world"), ctx = canvas ? canvas.getContext("2d") : null;
  if (!canvas || !ctx) return;
  simState = freshState(current.stage);
  running = false;
  current.errorsThis = 0;
  draw(ctx, simState);
  setRunState("", "");
  unhighlightAll();
}

let simState = null;

function draw(ctx, st) {
  const stage = current.stage;
  ctx.fillStyle = "#101d15";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // damier léger
  ctx.fillStyle = "rgba(255,255,255,.025)";
  for (let r = 0; r < stage.rows; r++) for (let c = 0; c < stage.cols; c++)
    if ((r + c) % 2 === 0) ctx.fillRect(c * CELL, r * CELL, CELL, CELL);

  // bordures de grille discrètes
  ctx.strokeStyle = "rgba(255,255,255,.05)";
  ctx.lineWidth = 1;
  for (let r = 0; r <= stage.rows; r++) { ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(stage.cols * CELL, r * CELL); ctx.stroke(); }
  for (let c = 0; c <= stage.cols; c++) { ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, stage.rows * CELL); ctx.stroke(); }

  // murs
  (stage.walls || []).forEach(w => {
    drawWall(ctx, w[0], w[1], stage.heroType);
  });
  // bouées (p7) : obstacles visuels distincts, infranchissables
  (stage.buoys || []).forEach(b => drawBuoy(ctx, b[0], b[1]));
  // repères cités par les consignes (p4 cabane, p8 mât)
  (stage.landmarks || []).forEach(mark => drawLandmark(ctx, mark));

  // objectif (pastille dorée / cristal p2 / rampe p7) — atteint en marchant dessus
  if (stage.pastille) drawGoal(ctx, stage, st);

  // cristaux (RAMASSE) — on cache ceux déjà pris
  (stage.crystals || []).forEach(cr => {
    const taken = (st.crystals || []).find(o => o.x === cr[0] && o.y === cr[1]);
    if (taken && taken.taken) return;
    drawCrystal(ctx, cr[0], cr[1]);
  });

  // lanternes (ALLUME) — allumées vs éteintes
  (stage.lanterns || []).forEach(ln => {
    const rec = (st.lanterns || []).find(o => o.x === ln[0] && o.y === ln[1]);
    drawLantern(ctx, ln[0], ln[1], !!(rec && rec.lit));
  });

  // héros Galet (tortue) ou barque selon l'étape
  drawHero(ctx, st, stage.heroType || "turtle", stage);
}

function drawWall(ctx, c, r, heroType) {
  const x = c * CELL + 4, y = r * CELL + 4, w = CELL - 8;
  ctx.fillStyle = "#39424e";
  rrect(ctx, x, y, w, w, 8); ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,.25)";
  ctx.beginPath(); ctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, 6, 0, Math.PI * 2); ctx.fill();
}

/* Repères narratifs explicitement utilisés pour planifier le parcours. */
function drawLandmark(ctx, mark) {
  const c = mark.at[0], r = mark.at[1];
  const cx = c * CELL + CELL / 2, cy = r * CELL + CELL / 2;
  ctx.save();
  if (mark.type === "hut") {
    ctx.fillStyle = "#76563b";
    rrect(ctx, cx - 18, cy - 10, 36, 26, 4); ctx.fill();
    ctx.fillStyle = "#b96b45";
    ctx.beginPath(); ctx.moveTo(cx - 22, cy - 10); ctx.lineTo(cx, cy - 27); ctx.lineTo(cx + 22, cy - 10); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#f5b83d";
    rrect(ctx, cx - 5, cy + 1, 10, 15, 2); ctx.fill();
  } else if (mark.type === "mast") {
    ctx.strokeStyle = "#d8c39b"; ctx.lineWidth = 5; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx, cy + 22); ctx.lineTo(cx, cy - 24); ctx.stroke();
    ctx.fillStyle = "#4fd0e0";
    ctx.beginPath(); ctx.moveTo(cx + 3, cy - 22); ctx.lineTo(cx + 21, cy - 14); ctx.lineTo(cx + 3, cy - 7); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

/* Bouée rouge (p7) : infranchissable, rendue comme obstacle marin distinct. */
function drawBuoy(ctx, c, r) {
  const cx = c * CELL + CELL / 2, cy = r * CELL + CELL / 2;
  ctx.save();
  // halo de vague
  ctx.strokeStyle = "rgba(79,208,224,.35)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(cx, cy + 2, 22, 8, 0, 0, Math.PI * 2); ctx.stroke();
  // corps de la bouée
  ctx.fillStyle = "#e05d5d";
  ctx.beginPath(); ctx.arc(cx, cy, 13, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#8f2f2f"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, 13, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

/* Objectif de case : pastille dorée (défaut), cristal (p2) ou rampe (p7). */
function drawGoal(ctx, stage, st) {
  const [px, py] = stage.pastille;
  const cx = px * CELL + CELL / 2, cy = py * CELL + CELL / 2;
  const reached = !!st.pastilleReached;
  const type = stage.goalType || "pastille";
  ctx.save();
  if (type === "crystal") {
    ctx.strokeStyle = reached ? "#59c86b" : "rgba(79,208,224,.9)";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = reached ? "rgba(89,200,107,.15)" : "#4fd0e0";
    ctx.strokeStyle = "#1d7f8c"; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 13); ctx.lineTo(cx + 9, cy); ctx.lineTo(cx, cy + 13); ctx.lineTo(cx - 9, cy);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#dffbff";
    ctx.beginPath(); ctx.moveTo(cx, cy - 6); ctx.lineTo(cx + 3, cy); ctx.lineTo(cx, cy + 6); ctx.lineTo(cx - 3, cy);
    ctx.closePath(); ctx.fill();
  } else if (type === "ramp") {
    // rampe en bois au bord de l'eau
    ctx.fillStyle = "#6d4c41";
    rrect(ctx, cx - 22, cy - 4, 44, 18, 4); ctx.fill();
    ctx.strokeStyle = "#4e342e"; ctx.lineWidth = 2;
    rrect(ctx, cx - 22, cy - 4, 44, 18, 4); ctx.stroke();
    ctx.fillStyle = "#8d6e63";
    for (let i = -14; i <= 14; i += 7) { rrect(ctx, cx + i, cy - 4, 4, 14, 1); ctx.fill(); }
    if (reached) {
      ctx.strokeStyle = "#59c86b"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(cx, cy + 5, 16, 0, Math.PI * 2); ctx.stroke();
    }
    // fanion de la cloche
    ctx.fillStyle = reached ? "#59c86b" : "#9aa5b1";
    ctx.beginPath(); ctx.arc(cx + 24, cy - 10, 4, 0, Math.PI * 2); ctx.fill();
  } else {
    // pastille dorée
    ctx.fillStyle = "#f5b83d";
    ctx.beginPath(); ctx.arc(cx, cy, 13, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#a8761d"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, 13, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#fff6d8";
    ctx.beginPath(); ctx.arc(cx - 4, cy - 4, 3, 0, Math.PI * 2); ctx.fill();
  }
  if (reached) {
    ctx.font = "bold 15px Trebuchet MS"; ctx.fillStyle = "#59c86b"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("✓", cx, cy + 1);
  }
  ctx.restore();
}

function drawCrystal(ctx, c, r) {
  const cx = c * CELL + CELL / 2, cy = r * CELL + CELL / 2;
  ctx.save();
  // ombre
  ctx.fillStyle = "rgba(0,0,0,.2)"; ctx.beginPath(); ctx.ellipse(cx, cy + 12, 9, 3, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#4fd0e0";  // cyan "eau" / cristal de la baie
  ctx.strokeStyle = "#1d7f8c"; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 12); ctx.lineTo(cx + 8, cy); ctx.lineTo(cx, cy + 12); ctx.lineTo(cx - 8, cy);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#dffbff";
  ctx.beginPath(); ctx.moveTo(cx, cy - 6); ctx.lineTo(cx + 3, cy); ctx.lineTo(cx, cy + 6); ctx.lineTo(cx - 3, cy);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawLantern(ctx, c, r, lit) {
  const cx = c * CELL + CELL / 2, cy = r * CELL + CELL / 2;
  ctx.save();
  // plateforme (petite estrade)
  ctx.fillStyle = "#2c3540";
  rrect(ctx, cx - 20, cy + 6, 40, 10, 4); ctx.fill();
  // mât
  ctx.strokeStyle = "#4a3f2e"; ctx.lineWidth = 5; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(cx, cy + 6); ctx.lineTo(cx, cy - 16); ctx.stroke();
  // verrière
  const glassCol = lit ? "#ffe9a8" : "#39424e";
  ctx.fillStyle = glassCol;
  ctx.strokeStyle = lit ? "#b8860b" : "#2a2f37"; ctx.lineWidth = 2;
  rrect(ctx, cx - 11, cy - 26, 22, 22, 5); ctx.fill(); ctx.stroke();
  // feu
  if (lit) {
    ctx.fillStyle = "#ffd54f";
    ctx.beginPath(); ctx.arc(cx, cy - 15, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,213,79,.25)";
    ctx.beginPath(); ctx.arc(cx, cy - 15, 11, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

/* Galet : tortue-lanterne orientée selon la direction (tête vers l'avant). */
function drawHero(ctx, st, type, stage) {
  const cx = st.x * CELL + CELL / 2, cy = st.y * CELL + CELL / 2;
  const ang = { E: 0, S: Math.PI / 2, W: Math.PI, N: -Math.PI / 2 }[st.face] || 0;
  ctx.save();
  ctx.translate(cx, cy);
  if (type === "boat") {
    drawBoat(ctx, ang);
  } else {
    drawTurtle(ctx, ang);
  }
  // marqueur discret de direction (non-couleur) sous l'héros
  ctx.fillStyle = "rgba(255,255,255,.55)";
  ctx.font = "10px Trebuchet MS"; ctx.textAlign = "center"; ctx.textBaseline = "bottom";
  ctx.fillText(dirArrow(st.face), 0, CELL / 2 - 4);
  ctx.restore();
}

function dirArrow(f) {
  return { E: "→", S: "↓", W: "←", N: "↑" }[f] || "→";
}

function drawTurtle(ctx, ang) {
  ctx.rotate(ang);
  // corps / coquille
  ctx.fillStyle = "rgba(0,0,0,.25)";
  ctx.beginPath(); ctx.ellipse(0, 4, 17, 6, 0, 0, Math.PI * 2); ctx.fill();   // ombre
  ctx.fillStyle = "#3f7f4f";   // coquille verte
  ctx.beginPath(); ctx.ellipse(0, -2, 15, 13, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#2c5a38"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(0, -2, 15, 13, 0, 0, Math.PI * 2); ctx.stroke();
  // losange de coquille
  ctx.fillStyle = "#9fd6a6";
  ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(7, -2); ctx.lineTo(0, 8); ctx.lineTo(-7, -2); ctx.closePath(); ctx.fill();
  // tête orientée (+x = avant car on a tourné)
  ctx.fillStyle = "#5fae6e";
  ctx.beginPath(); ctx.ellipse(16, -1, 5, 6, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.arc(19, -3, 1.4, 0, Math.PI * 2); ctx.fill();  // œil
  // pattes
  ctx.fillStyle = "#5fae6e";
  ctx.beginPath(); ctx.ellipse(-10, 9, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(8, 9, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
}

function drawBoat(ctx, ang) {
  ctx.rotate(ang);
  // coque
  ctx.fillStyle = "#6d4c41";
  ctx.beginPath(); ctx.moveTo(-18, 8); ctx.lineTo(-14, -2); ctx.lineTo(14, -2); ctx.lineTo(18, 8);
  ctx.closePath(); ctx.fill(); ctx.strokeStyle = "#4e342e"; ctx.stroke();
  // voile
  ctx.fillStyle = "#e8e6df";
  ctx.beginPath(); ctx.moveTo(4, -2); ctx.lineTo(4, -16); ctx.lineTo(-6, -2); ctx.closePath(); ctx.fill();
}

function setRunState(text, cls) {
  const rs = el("run-state");
  if (!rs) return;
  rs.textContent = text;
  rs.className = "run-state" + (cls ? " " + cls : "");
}

function unhighlightAll() {
  const items = document.querySelectorAll("#cmd-list .cmd-item.err");
  items.forEach(n => n.classList.remove("err"));
}

/* Lance l'exécution pas à pas. */
function startRun() {
  if (!current || current.seq.length === 0) return;
  if (running) return;
  resetSim();
  const lang = currentLang();
  let i = 0;
  const seq = current.seq.slice();
  running = true;
  const runBtn = el("run-btn"), stopBtn = el("stop-btn");
  if (runBtn) runBtn.classList.add("hidden");
  if (stopBtn) stopBtn.classList.remove("hidden");

  function step() {
    if (!running) return;
    if (i >= seq.length) {
      finishRun();
      return;
    }
    const cmd = seq[i];
    // exécute UNE commande sur l'état sim courant (logique pure partagée)
    const r = applyOne(current.stage, simState, cmd);
    if (!r.ok) {
      current.errorsThis++;
      highlightErr(i);
      const who = heroNoun(lang);
      setRunState(lang === "fr"
        ? "Erreur douce : " + errText(current.stage, r.errType, lang)
        : "Soft error: " + errText(current.stage, r.errType, lang), "err");
      toast(lang === "fr"
        ? who + " s'est arrêté" + (current.stage.heroType === "boat" ? "e" : "") + " : corrige ta liste puis relance."
        : who + " stopped: fix your list and run again.", "err");
      stopRun(false);
      return;
    }
    draw(el("world").getContext("2d"), simState);
    if (r.won) {
      finishRun(true, i + 1);
      return;
    }
    i++;
    setTimeout(step, STEP_MS);
  }
  step();
}

function errText(stage, type, lang) {
  const isBoat = stage.heroType === "boat";
  if (type === "wall") return lang === "fr"
    ? (isBoat ? "la berge ou la bouée bloque la barque." : "un mur ou la bordure bloque Galet.")
    : (isBoat ? "the bank or the buoy blocks the boat." : "a wall or the edge blocks Galet.");
  if (type === "crystal") return lang === "fr" ? "rien à ramasser ici." : "nothing to pick up here.";
  if (type === "lantern") return lang === "fr" ? "pas de lanterne à allumer sur cette case." : "no lantern to light here.";
  if (type === "command") return lang === "fr" ? "commande inconnue." : "unknown command.";
  return "";
}

function heroNoun(lang) {
  if (lang === "fr") return current && current.stage && current.stage.heroType === "boat" ? "La barque" : "Galet";
  return current && current.stage && current.stage.heroType === "boat" ? "The boat" : "Galet";
}

function highlightErr(i) {
  const items = document.querySelectorAll("#cmd-list .cmd-item");
  items.forEach((n, idx) => n.classList.toggle("err", idx === i));
}

function finishRun(won, stepsRun) {
  const lang = currentLang();
  running = false;
  const runBtn = el("run-btn"), stopBtn = el("stop-btn");
  if (runBtn) runBtn.classList.remove("hidden");
  if (stopBtn) stopBtn.classList.add("hidden");
  if (won) {
    const stars = computeStars(stepsRun);
    recordWin(current.stageId, stars);
    showVictory(stars);
  } else {
    setRunState(lang === "fr" ? "La mission n'est pas terminée : il reste des objectifs." : "Mission not complete: some goals remain.", "");
  }
}

function stopRun(victoryShown) {
  running = false;
  const runBtn = el("run-btn"), stopBtn = el("stop-btn");
  if (runBtn) runBtn.classList.remove("hidden");
  if (stopBtn) stopBtn.classList.add("hidden");
}

/* Étoiles : les indices aident et ne punissent jamais.
   3 = zéro erreur d'exécution ; 2 = une erreur ; 1 = deux erreurs ou plus.
   Si le stage impose un défi d'efficacité (p5 : ≤ 8 commandes), au-delà = 2 max. */
function computeStars(stepsRun) {
  const e = current.errorsThis;
  let stars = e === 0 ? 3 : (e === 1 ? 2 : 1);
  const st = current.stage;
  if (st && st.efficiency && stepsRun && stepsRun > st.efficiency) {
    stars = Math.min(stars, 2);
  }
  return stars;
}

function recordWin(stageId, stars) {
  const idx = W1_ORDER.indexOf(stageId) + 1;
  save.stars[stageId] = Math.max(save.stars[stageId] || 0, stars);
  if (idx + 1 > save.unlocked) save.unlocked = Math.min(idx + 1, W1_ORDER.length);
  persistSave();
}

/* Modales victoire / fin de monde. */
function showVictory(stars) {
  const lang = currentLang();
  const mc = missionContent(current.stageId);
  const card = el("modal-card");
  card.textContent = "";
  const title = mkl("h3", "", lang === "fr" ? "Mission réussie ! 🎉" : "Mission complete! 🎉");
  const starsEl = mkl("div", "win-stars", starsBadge(stars, lang));
  const vic = mkl("p", "modal-text", mc ? mc.i18n[lang].victory : "");
  const cel = mkl("p", "modal-sub", mc ? mc.i18n[lang].celebration : "");
  card.appendChild(title);
  card.appendChild(starsEl);
  card.appendChild(vic);
  card.appendChild(cel);

  const isP8 = current.stageId === "w1p8";
  const nextBtn = mkl("button", "btn big primary", isP8
    ? (lang === "fr" ? "Voir l'artefact 🌟" : "See the artefact 🌟")
    : (lang === "fr" ? "Mission suivante →" : "Next mission →"));
  nextBtn.type = "button";
  const mapBtn = mkl("button", "btn big", lang === "fr" ? "Retour à la carte" : "Back to map");
  mapBtn.type = "button";
  mapBtn.addEventListener("click", () => { location.hash = "#/w1"; });
  if (isP8) {
    // Fin du monde : modale artefact (texte celebration P8) puis retour.
    nextBtn.addEventListener("click", showWorldEnd);
  } else {
    const n = W1_ORDER.indexOf(current.stageId) + 1;
    nextBtn.addEventListener("click", () => { location.hash = "#/w1/" + W1_ORDER[n]; });
  }
  card.appendChild(nextBtn);
  card.appendChild(mapBtn);
  el("modal").classList.remove("hidden");
}

function showWorldEnd() {
  const lang = currentLang();
  const mc = missionContent("w1p8");
  const card = el("modal-card");
  card.textContent = "";
  const title = mkl("h3", "", lang === "fr" ? "🌟 Artefact du Quai des signaux 🌟" : "🌟 Artefact of Signal Quay 🌟");
  const artefact = mkl("div", "artefact", "🏮");
  const txt = mkl("p", "modal-text", mc ? mc.i18n[lang].celebration : "");
  card.appendChild(title);
  card.appendChild(artefact);
  card.appendChild(txt);
  const backBtn = mkl("button", "btn big primary", lang === "fr" ? "Retour à la carte" : "Back to map");
  backBtn.type = "button";
  backBtn.addEventListener("click", () => { location.hash = "#/w1"; });
  card.appendChild(backBtn);
  el("modal").classList.remove("hidden");
}

function closeModal() {
  const m = el("modal");
  if (m) m.classList.add("hidden");
}

/* ------------------------------------------------------------------ */
/* Utils canvas                                                        */
/* ------------------------------------------------------------------ */
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

let toastTimer = null;
function toast(msg, cls) {
  const t = el("toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "toast" + (cls ? " " + cls : "");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 2800);
}

/* -- Démarrage (uniquement si DOM) -- */
if (HAS_DOM) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  // navigation par hash : carte <-> missions (et clic "retour")
  window.addEventListener("hashchange", () => route());
  // fermer la modale avec Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
