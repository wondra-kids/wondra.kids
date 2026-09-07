/* =========================================================================
   WONDRA CREATE — Monde 2 « L'Atelier des états » (pilote jouable)
   Page partagée : platform/create.html (routes #/w2 et #/w2/pN)

   Ce module est TOTALEMENT indépendant de platform/create.js (Monde 1) :
   il est enfermé dans une IIFE, ne déclare aucun global, et ne prend la main
   que sur les routes #/w2*. Sur #/w1*, il restaure l'écran du Monde 1 tel
   quel et ne touche plus à rien.

   Deux moitiés :
     1. INTERPRÉTEUR PUR (aucun DOM) — tokeniseur + parseur du sous-ensemble
        Python autorisé (PAS d'eval), runtime fidèle à ref_interpreter.py et
        à PLAYABLE_CONVENTION.md v1.0.1 pour les primitives W2, évaluation de
        victory_condition (state_equals / all_of / requires_variable_use).
        Testable en node : `global.window = {}` puis require() de
        create_w2_missions.js et de ce fichier, puis window.__testW2Stage(...).
     2. UI ATELIER (uniquement si document existe) — carte, gabarits de lignes,
        exécution pas à pas ~300 ms, panneaux d'états, prédiction, étoiles.

   Sémantique reproduite (ref_interpreter.py) :
     set_reaction(mode)        → reaction_mode                     ; 1 tick
     transition(target)        → transition_target + engine_state  ; 1 tick
     set_feedback(text, shape) → feedback_text / feedback_shape,
                                 feedback_clear = inclusive_feedback =
                                 (text et shape sont des chaînes non vides) ; 1 tick
     say(text)                 → say_text, feedback_clear          ; 1 tick
     current_state()           → renvoie engine_state              ; 1 tick
   ========================================================================= */
(function () {
  "use strict";

  var HAS_DOM = (typeof document !== "undefined" && !!document);
  var W2_ORDER = ["w2p1", "w2p2", "w2p3", "w2p4", "w2p5", "w2p6", "w2p7", "w2p8"];
  var SAVE_KEY_W2 = "kodawari-create-w2-v1";
  var STEP_MS_W2 = 300;
  var GRID_SIZE = 4;

  /* =====================================================================
     1. DONNÉES D'ATELIER — décor, gabarits et palettes par mission.
     Les noms de variables et les littéraux proviennent du texte FR canonique
     de chaque mission (create_w2_pN.json) : ce sont les noms que l'enfant lit.
     ===================================================================== */
  var W2_STAGES = {
    w2p1: {
      key: "create_w2_p1",
      role: "introduction",
      panel: "scene",
      object: { icon: "✦", fr: "La lanterne à une fente", en: "The one-slot lantern" },
      names: ["charge"],
      objects: [],
      values: ["1", "2", "3", "charge"],
      prediction: {
        property: "lantern_slot",
        value: 3,
        label: { fr: "Quel cristal restera dans la fente ?",
                 en: "Which crystal will remain in the slot?" },
        placeholder: "3"
      }
    },
    w2p2: {
      key: "create_w2_p2",
      role: "worked_example",
      panel: "drawers",
      object: { icon: "🗄️", fr: "Les trois tiroirs typés", en: "The three typed drawers" },
      names: ["number_value", "text_value", "yes_no_value"],
      objects: [],
      values: ["4", "\"NORTH\"", "True", "False",
               "[number_value, text_value, yes_no_value]", "\"types_sorted\""],
      drawers: [
        { name: "number_value", icon: "123", fr: "Tiroir des nombres", en: "Number drawer" },
        { name: "text_value", icon: "ABC", fr: "Tiroir des textes", en: "Text drawer" },
        { name: "yes_no_value", icon: "OUI/NON", fr: "Tiroir oui/non", en: "Yes/no drawer" }
      ],
      prediction: null
    },
    w2p3: {
      key: "create_w2_p3",
      role: "guided_practice",
      panel: "press",
      object: { icon: "🖨️", fr: "La presse", en: "The press" },
      names: [],
      objects: [],
      values: ["\"STAR\"", "\"size_2\"", "\"size_4\"", "[\"STAR\", 2, \"STAR\", 4]"],
      prediction: null
    },
    w2p4: {
      key: "create_w2_p4",
      role: "independent_practice",
      panel: "waterwheel",
      object: { icon: "🎡", fr: "La noria", en: "The waterwheel" },
      names: ["size", "speed"],
      objects: [],
      values: ["3", "1", "2", "size", "speed"],
      prediction: null
    },
    w2p5: {
      key: "create_w2_p5",
      role: "independent_practice",
      panel: "sign",
      object: { icon: "🪧", fr: "L'enseigne", en: "The sign" },
      names: ["zone", "separator", "state", "message"],
      objects: [],
      values: ["\"NORTH\"", "\" : \"", "\"READY\"", "zone", "separator", "state",
               "[zone, separator, state]", "message", "\"NORTH : READY\""],
      prediction: null
    },
    w2p6: {
      key: "create_w2_p6",
      role: "retrieval",
      panel: "lumo",
      object: { icon: "🗂️", fr: "La fiche de Lumo", en: "Lumo's card" },
      names: ["lumo"],
      objects: [{ name: "lumo", keys: ["name", "charge", "mode"] }],
      values: ["{\"name\": \"LUMO\", \"charge\": 1, \"mode\": \"DAY\"}",
               "\"LUMO\"", "1", "3", "\"DAY\"", "\"NIGHT\"",
               "lumo[\"name\"]", "lumo[\"charge\"]", "lumo[\"mode\"]",
               "[lumo[\"name\"], lumo[\"charge\"]]"],
      lumoKeys: ["name", "charge", "mode"],
      prediction: null
    },
    w2p7: {
      key: "create_w2_p7",
      role: "transfer",
      panel: "grid",
      object: { icon: "🔲", fr: "La table quadrillée", en: "The gridded table" },
      names: ["x", "y", "first_y"],
      objects: [],
      values: ["1", "2", "3", "4", "x", "y", "first_y",
               "[x, y]", "[[x, first_y], [x, y]]"],
      grid: true,
      prediction: null
    },
    w2p8: {
      key: "create_w2_p8",
      role: "checkpoint",
      panel: "chamber",
      object: { icon: "🧭", fr: "La chambre centrale", en: "The central chamber" },
      names: ["lumo", "mode", "charge", "x", "y"],
      objects: [{ name: "lumo", keys: ["mode", "charge"] }],
      values: ["{\"mode\": \"DAY\", \"charge\": 1}", "\"DAY\"", "1", "\"NIGHT\"", "2", "4",
               "mode", "charge", "x", "y",
               "lumo[\"mode\"]", "lumo[\"charge\"]",
               "[lumo[\"charge\"], lumo[\"mode\"]]", "[x, y]"],
      lumoKeys: ["mode", "charge"],
      grid: true,
      prediction: {
        property: "engine_state",
        value: [4, 2],
        label: { fr: "Ta prédiction : quelle position finale Lumo rejoint-il ?",
                 en: "Your prediction: which final position does Lumo reach?" },
        placeholder: "[4, 2]"
      }
    }
  };

  var ROLE_LABEL_W2 = {
    introduction:          { fr: "Introduction", en: "Introduction" },
    worked_example:        { fr: "Exemple guidé", en: "Worked example" },
    guided_practice:       { fr: "Pratique guidée", en: "Guided practice" },
    independent_practice:  { fr: "Pratique autonome", en: "Independent practice" },
    retrieval:             { fr: "Rappel", en: "Retrieval" },
    transfer:              { fr: "Transfert", en: "Transfer" },
    checkpoint:            { fr: "Point d'étape", en: "Checkpoint" }
  };

  /* =====================================================================
     2. TOKENISEUR — sous-ensemble strict, aucune évaluation dynamique.
     ===================================================================== */
  var PUNCT = "()[]{},:=.";

  function isDigit(c) { return c >= "0" && c <= "9"; }
  function isNameStart(c) { return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_"; }
  function isNamePart(c) { return isNameStart(c) || isDigit(c); }

  /* Erreurs douces : de vraies Error, pour rester lisibles en test et en console. */
  function ParseError(message) {
    this.name = "ParseError";
    this.message = message;
    this.stack = (new Error(message)).stack;
  }
  ParseError.prototype = Object.create(Error.prototype);
  ParseError.prototype.constructor = ParseError;

  function tokenize(src) {
    var toks = [], i = 0, n = src.length;
    while (i < n) {
      var c = src.charAt(i);
      if (c === " " || c === "\t" || c === "\r") { i++; continue; }
      if (c === "#") break;                                   // commentaire de fin de ligne
      if (PUNCT.indexOf(c) >= 0) { toks.push({ t: c, v: c, at: i }); i++; continue; }
      if (c === "\"" || c === "'") {
        var quote = c, out = "", j = i + 1, closed = false;
        while (j < n) {
          var d = src.charAt(j);
          if (d === "\\") {
            var e = src.charAt(j + 1);
            if (e === "n") out += "\n";
            else if (e === "t") out += "\t";
            else if (e === "\\") out += "\\";
            else if (e === "\"") out += "\"";
            else if (e === "'") out += "'";
            else throw new ParseError("echappement_inconnu:\\" + e);
            j += 2; continue;
          }
          if (d === quote) { closed = true; j++; break; }
          out += d; j++;
        }
        if (!closed) throw new ParseError("guillemet_non_ferme");
        toks.push({ t: "STR", v: out, at: i });
        i = j; continue;
      }
      if (isDigit(c) || (c === "-" && isDigit(src.charAt(i + 1)))) {
        var k = (c === "-") ? i + 1 : i;
        while (k < n && isDigit(src.charAt(k))) k++;
        if (src.charAt(k) === "." && isDigit(src.charAt(k + 1))) {
          k++;
          while (k < n && isDigit(src.charAt(k))) k++;
        }
        toks.push({ t: "NUM", v: parseFloat(src.slice(i, k)), at: i });
        i = k; continue;
      }
      if (isNameStart(c)) {
        var m = i + 1;
        while (m < n && isNamePart(src.charAt(m))) m++;
        toks.push({ t: "NAME", v: src.slice(i, m), at: i });
        i = m; continue;
      }
      throw new ParseError("caractere_interdit:" + c);
    }
    return toks;
  }

  /* =====================================================================
     3. PARSEUR — 3 formes de ligne :
          nom = expr
          nom[expr] = expr
          primitive(expr, ...)
        Expressions : nombre, chaîne, True/False/None, liste, dict, nom,
        indexation nom["clé"], appel de primitive.
     ===================================================================== */
  function Parser(toks) { this.toks = toks; this.i = 0; }
  Parser.prototype.peek = function () { return this.toks[this.i] || null; };
  Parser.prototype.next = function () { return this.toks[this.i++] || null; };
  Parser.prototype.expect = function (t) {
    var tok = this.next();
    if (!tok || tok.t !== t) throw new ParseError("attendu:" + t + (tok ? ":trouve:" + tok.t : ":fin_de_ligne"));
    return tok;
  };
  Parser.prototype.parseExpr = function () {
    var node = this.parsePrimary();
    for (;;) {
      var tok = this.peek();
      if (tok && tok.t === "[") {
        this.next();
        var key = this.parseExpr();
        this.expect("]");
        node = { k: "index", base: node, key: key };
      } else if (tok && tok.t === ".") {
        this.next();
        var attr = this.expect("NAME").v;
        if (node.k !== "name" || ["x", "y", "color", "state"].indexOf(attr) < 0) throw new ParseError("forbidden_attribute_access");
        node = { k: "attr", base: node, attr: attr };
      } else if (tok && tok.t === "(" && node.k === "name") {
        this.next();
        var args = this.parseArgs();
        node = { k: "call", name: node.name, args: args };
      } else break;
    }
    return node;
  };
  Parser.prototype.parseArgs = function () {
    var args = [];
    if (this.peek() && this.peek().t === ")") { this.next(); return args; }
    for (;;) {
      args.push(this.parseExpr());
      var tok = this.next();
      if (!tok) throw new ParseError("parenthese_non_fermee");
      if (tok.t === ")") break;
      if (tok.t !== ",") throw new ParseError("attendu:virgule:trouve:" + tok.t);
    }
    return args;
  };
  Parser.prototype.parsePrimary = function () {
    var tok = this.next();
    if (!tok) throw new ParseError("expression_vide");
    if (tok.t === "NUM") return { k: "num", v: tok.v };
    if (tok.t === "STR") return { k: "str", v: tok.v };
    if (tok.t === "NAME") {
      if (tok.v === "True") return { k: "bool", v: true };
      if (tok.v === "False") return { k: "bool", v: false };
      if (tok.v === "None") return { k: "none", v: null };
      return { k: "name", name: tok.v };
    }
    if (tok.t === "[") {
      var items = [];
      if (this.peek() && this.peek().t === "]") { this.next(); return { k: "list", items: items }; }
      for (;;) {
        items.push(this.parseExpr());
        var t1 = this.next();
        if (!t1) throw new ParseError("crochet_non_ferme");
        if (t1.t === "]") break;
        if (t1.t !== ",") throw new ParseError("attendu:virgule:trouve:" + t1.t);
      }
      return { k: "list", items: items };
    }
    if (tok.t === "{") {
      var pairs = [];
      if (this.peek() && this.peek().t === "}") { this.next(); return { k: "dict", pairs: pairs }; }
      for (;;) {
        var keyTok = this.next();
        if (!keyTok || keyTok.t !== "STR") throw new ParseError("cle_de_dictionnaire_doit_etre_un_texte");
        this.expect(":");
        pairs.push({ key: keyTok.v, value: this.parseExpr() });
        var t2 = this.next();
        if (!t2) throw new ParseError("accolade_non_fermee");
        if (t2.t === "}") break;
        if (t2.t !== ",") throw new ParseError("attendu:virgule:trouve:" + t2.t);
      }
      return { k: "dict", pairs: pairs };
    }
    throw new ParseError("token_inattendu:" + tok.t);
  };

  /* Découpe la ligne sur un `=` de profondeur 0 (affectation). */
  function splitAssign(toks) {
    var depth = 0;
    for (var i = 0; i < toks.length; i++) {
      var t = toks[i].t;
      if (t === "(" || t === "[" || t === "{") depth++;
      else if (t === ")" || t === "]" || t === "}") depth--;
      else if (t === "=" && depth === 0) return i;
    }
    return -1;
  }

  function parseLine(src) {
    var toks = tokenize(src);
    if (!toks.length) return { kind: "blank" };
    var eq = splitAssign(toks);
    if (eq >= 0) {
      var left = toks.slice(0, eq), right = toks.slice(eq + 1);
      if (!right.length) throw new ParseError("valeur_manquante_apres_egal");
      var rp = new Parser(right);
      var value = rp.parseExpr();
      if (rp.peek()) throw new ParseError("texte_en_trop_apres_la_valeur");
      if (left.length === 1 && left[0].t === "NAME") {
        return { kind: "assign", name: left[0].v, value: value };
      }
      var lp = new Parser(left);
      var target = lp.parseExpr();
      if (lp.peek()) throw new ParseError("cible_d_affectation_invalide");
      if (target.k === "index" && target.base.k === "name") {
        return { kind: "setitem", name: target.base.name, key: target.key, value: value };
      }
      throw new ParseError("cible_d_affectation_invalide");
    }
    var p = new Parser(toks);
    var expr = p.parseExpr();
    if (p.peek()) throw new ParseError("texte_en_trop_apres_l_appel");
    if (expr.k !== "call") throw new ParseError("ligne_sans_effet:une_ligne_doit_affecter_ou_appeler");
    return { kind: "call", name: expr.name, args: expr.args };
  }

  /* =====================================================================
     4. VALEURS — égalité profonde et rendu « à la Python ».
     ===================================================================== */
  function isDict(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }
  /* Extension WDR-069 : type JSON-strict d'une valeur — int, str ou bool.
     Miroir exact de Runtime._value_type de ref_interpreter.py (un booléen
     n'est jamais un entier, même si True == 1 en Python). */
  function jsonValueType(v) {
    if (typeof v === "boolean") return "bool";
    if (typeof v === "number" && v % 1 === 0) return "int";
    if (typeof v === "string") return "str";
    return null;
  }
  function acceptsTyped(prop, value) {
    if (!prop || typeof prop !== "object") return false;
    var expected = prop.accepts;
    if (expected === undefined || expected === null) {
      /* Comportement historique : appariement par valeur (portes P1). */
      return deepEqual(prop.value, value);
    }
    return jsonValueType(value) === String(expected);
  }
  function deepEqual(a, b) {
    if (a === b) return true;
    /* Python/ref_interpreter : bool est un sous-type de int, donc True == 1
       et False == 0. Les contrats W2 n'exploitent pas cette collision, mais
       la comparaison profonde doit rester fidèle à la sémantique de référence. */
    if ((typeof a === "boolean" && typeof b === "number") ||
        (typeof a === "number" && typeof b === "boolean")) {
      return Number(a) === Number(b);
    }
    if (typeof a === "boolean" || typeof b === "boolean") return a === b;
    if (Array.isArray(a) || Array.isArray(b)) {
      if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
      for (var i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    if (isDict(a) && isDict(b)) {
      var ka = Object.keys(a), kb = Object.keys(b);
      if (ka.length !== kb.length) return false;
      for (var j = 0; j < ka.length; j++) {
        if (!Object.prototype.hasOwnProperty.call(b, ka[j])) return false;
        if (!deepEqual(a[ka[j]], b[ka[j]])) return false;
      }
      return true;
    }
    return false;
  }
  function clone(v) {
    if (Array.isArray(v)) return v.map(clone);
    if (isDict(v)) {
      var o = {}, ks = Object.keys(v);
      for (var i = 0; i < ks.length; i++) o[ks[i]] = clone(v[ks[i]]);
      return o;
    }
    return v;
  }
  function pyRepr(v) {
    if (v === undefined) return "—";
    if (v === null) return "None";
    if (v === true) return "True";
    if (v === false) return "False";
    if (typeof v === "number") return String(v);
    if (typeof v === "string") return "\"" + v.replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\"";
    if (Array.isArray(v)) return "[" + v.map(pyRepr).join(", ") + "]";
    if (isDict(v)) {
      return "{" + Object.keys(v).map(function (k) { return "\"" + k + "\": " + pyRepr(v[k]); }).join(", ") + "}";
    }
    return String(v);
  }
  function pyType(v) {
    if (typeof v === "boolean") return "bool";
    if (typeof v === "number") return (v % 1 === 0) ? "int" : "float";
    if (typeof v === "string") return "str";
    if (Array.isArray(v)) return "list";
    if (isDict(v)) return "dict";
    if (v === null) return "NoneType";
    return "?";
  }

  /* =====================================================================
     5. LECTEUR DE SCÈNE — aucune connaissance d'un identifiant de mission.

     Le contrat fournit les acteurs, les props typés, les apparences d'état et
     les événements autorisés par primitive. Le moteur indexe ces données une
     seule fois puis produit un état de monde et des événements visuels. Les
     comportements physiques sont enregistrés par forme de primitive
     (affectation / appel), jamais par route ou par position de mission.
     ===================================================================== */
  function SceneContract(playable) {
    this.playable = playable || {};
    this.scene = this.playable.scene || null;
    this.actors = this.scene ? (this.scene.actors || []).slice() : [];
    this.props = this.scene ? (this.scene.props || []).slice() : [];
    this.grid = this.scene ? (this.scene.grid || null) : null;
    this.renders = this.scene ? (this.scene.renders || []).slice() : [];
    this.emits = this.scene ? (this.scene.emits || {}) : {};
    this.worldRefusal = this.playable.world_refusal || null;
    this.byId = {};
    this.byKind = {};
    this.assignmentNames = {};
    this.callNames = {};
    var self = this;
    this.props.forEach(function (p) {
      self.byId[p.id] = p;
      (self.byKind[p.kind] = self.byKind[p.kind] || []).push(p);
    });
    Object.keys(this.emits).forEach(function (signature) {
      if (signature.indexOf("=") >= 0) {
        self.assignmentNames[signature.split("=")[0].trim()] = signature;
      } else {
        self.callNames[primitiveName(signature)] = signature;
      }
    });
  }
  SceneContract.prototype.enabled = function () { return !!this.scene; };
  SceneContract.prototype.initialStates = function () {
    if (!this.scene) return {};
    var out = {};
    this.renders.forEach(function (r) { if (!(r.state in out)) out[r.state] = undefined; });
    if ((this.byKind.lantern_slot || []).length) out.lantern_slot = null;
    var doors = this.byKind.sealed_door || [];
    if (doors.length) {
      out.doors_open = 0;
      doors.forEach(function (d) {
        out[d.id + "_open"] = false;
        if (typeof d.value === "number") out["door_" + d.value + "_open"] = false;
      });
    }
    /* Extension WDR-069 (2026-09-06) : tiroirs typés déclarés par la scène
       (kind=typed_drawer + accepts=int|str|bool). États par prop
       `drawer_<id>_open` et compteur `drawers_open`, miroir de
       ref_interpreter.py. */
    var drawers = this.byKind.typed_drawer || [];
    if (drawers.length) {
      out.drawers_open = 0;
      out.door_open_ids = [];
      out.doors_open = 0;
      drawers.forEach(function (d) { out[d.id + "_open"] = false; });
    }
    if (this.grid && this.callNames.aim_at) {
      out.aimed_x = null;
      out.aimed_y = null;
      out.aim_source_x = null;
      out.aim_source_y = null;
      out.aim_provenance = "not_read";
      out.aim_confirmed = false;
    }
    if (this.callNames.call_by_name) {
      (this.byKind.named_receiver || []).forEach(function (receiver) {
        out[receiver.id + "_activated"] = false;
      });
    }
    return out;
  };
  SceneContract.prototype.namedObjects = function () {
    var out = Object.create(null);
    (this.byKind.named_object || []).forEach(function (prop) {
      var exposed = Object.create(null);
      ["x", "y", "color", "state"].forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(prop, key)) exposed[key] = prop[key];
      });
      out[prop.id] = exposed;
    });
    return out;
  };
  SceneContract.prototype.isGridCoordinate = function (x, y) {
    if (!this.grid || typeof x !== "number" || typeof y !== "number" || x % 1 !== 0 || y % 1 !== 0) return false;
    return x >= this.grid.x_min && x <= this.grid.x_max && y >= this.grid.y_min && y <= this.grid.y_max;
  };
  SceneContract.prototype.originsForNode = function (node) {
    if (!node) return [];
    if (node.k === "attr" && node.base && node.base.k === "name") return [node.base.name + "." + node.attr];
    if (node.k === "name" && this.runtimeOrigins && this.runtimeOrigins[node.name]) return this.runtimeOrigins[node.name].slice();
    return [];
  };
  SceneContract.prototype.eventsFor = function (signature) {
    return (this.emits[signature] || []).slice();
  };
  SceneContract.prototype.canEmit = function (signature, type) {
    return this.eventsFor(signature).indexOf(type) >= 0;
  };
  SceneContract.prototype.appearanceFor = function (stateName, value) {
    var render = null;
    for (var i = 0; i < this.renders.length; i++) if (this.renders[i].state === stateName) { render = this.renders[i]; break; }
    if (!render) return null;
    for (var j = 0; j < (render.visual_states || []).length; j++) {
      var visual = render.visual_states[j], when = visual.when || {}, ok = false;
      if (when.op === "empty") ok = value === null || value === undefined;
      else if (when.op === "nonempty") ok = value !== null && value !== undefined;
      else if (when.op === "eq") ok = deepEqual(value, when.value);
      else if (when.op === "gte") ok = value >= when.value;
      else if (when.op === "gt") ok = value > when.value;
      else if (when.op === "lte") ok = value <= when.value;
      else if (when.op === "lt") ok = value < when.value;
      if (ok) return visual;
    }
    return null;
  };
  SceneContract.prototype.applyAssignment = function (name, value, states) {
    var signature = this.assignmentNames[name];
    if (!signature) return [];
    var events = [], previous = states.lantern_slot;
    states.lantern_slot = value;
    if (previous !== null && previous !== undefined && this.canEmit(signature, "previous_crystal_ejected")) {
      events.push({ type: "previous_crystal_ejected", primitive: signature, value: previous, replacement: value });
    }
    if (this.canEmit(signature, "crystal_inserted")) {
      events.push({ type: "crystal_inserted", primitive: signature, value: value, previous: previous });
    }
    return events;
  };
  SceneContract.prototype.applyCall = function (name, args, states, argNodes) {
    var signature = this.callNames[name];
    if (!signature) return null;
    if (name === "aim_at") {
      if (args.length !== 2 || typeof args[0] !== "number" || typeof args[1] !== "number" ||
          args[0] % 1 !== 0 || args[1] % 1 !== 0) {
        return [{ type: "runtime_error", primitive: signature, message: "aim_coordinates_must_be_integers" }];
      }
      if (!this.isGridCoordinate(args[0], args[1])) {
        return this.canEmit(signature, "aim_out_of_bounds") ?
          [{ type: "aim_out_of_bounds", primitive: signature, x: args[0], y: args[1] }] : [];
      }
      states.aimed_x = args[0];
      states.aimed_y = args[1];
      /* WDR-074: provenance observable. These presentation-only states do not
         participate in victory and do not change WDR-073 semantics. */
      var xOrigins = this.originsForNode(argNodes && argNodes[0]);
      var yOrigins = this.originsForNode(argNodes && argNodes[1]);
      states.aim_source_x = xOrigins.indexOf("balise_dune.x") >= 0 ? "balise_dune.x" : null;
      states.aim_source_y = yOrigins.indexOf("balise_dune.y") >= 0 ? "balise_dune.y" : null;
      states.aim_provenance = states.aim_source_x && states.aim_source_y ? "both_feed_aim" :
        (states.aim_source_x || states.aim_source_y ? "one_property_feeds_aim" : "no_property_feeds_aim");
      states.aim_confirmed = states.aim_provenance === "both_feed_aim";
      return this.canEmit(signature, "cell_aimed") ?
        [{ type: "cell_aimed", primitive: signature, x: args[0], y: args[1],
           sourceX: states.aim_source_x, sourceY: states.aim_source_y,
           confirmed: states.aim_confirmed }] : [];
    }
    if (name === "call_by_name") {
      var value = args[0];
      if (args.length !== 1 || typeof value !== "string") {
        return this.canEmit(signature, "name_value_not_string") ?
          [{ type: "name_value_not_string", primitive: signature, value: value,
             message: { fr: "Seul un nom écrit entre guillemets réveille un automate.", en: "Only a name written in quotes wakes an automaton." },
             effect: "no_world_state_change" }] : [];
      }
      var receivers = this.byKind.named_receiver || [], receiver = null;
      for (var ni = 0; ni < receivers.length; ni++) {
        if (receivers[ni].name === value) { receiver = receivers[ni]; break; }
      }
      if (!receiver) {
        return this.canEmit(signature, "name_not_found") ?
          [{ type: "name_not_found", primitive: signature, value: value,
             message: { fr: "Aucun automate ne porte exactement ce nom.", en: "No automaton has exactly that name." },
             effect: "no_world_state_change" }] : [];
      }
      var activatedState = receiver.id + "_activated";
      if (states[activatedState]) {
        return this.canEmit(signature, "object_already_activated") ?
          [{ type: "object_already_activated", primitive: signature, objectId: receiver.id, value: value }] : [];
      }
      states[activatedState] = true;
      return this.canEmit(signature, "object_activated") ?
        [{ type: "object_activated", primitive: signature, objectId: receiver.id, value: value }] : [];
    }
    var refusal = this.worldRefusal;
    var firstNode = argNodes && argNodes.length ? argNodes[0] : null;
    if (refusal && refusal.primitive === name && refusal.rejects === "literal_argument" &&
        firstNode && firstNode.k !== "name") {
      var doorsForRefusal = this.byKind.sealed_door || [], refusedDoor = null;
      for (var ri = 0; ri < doorsForRefusal.length; ri++) {
        if (deepEqual(doorsForRefusal[ri].value, args[0])) { refusedDoor = doorsForRefusal[ri]; break; }
      }
      /* Extension WDR-069 : un tiroir typé (kind=typed_drawer) se refuse aussi
         quand on lui présente un littéral au lieu de la lecture de la fente. */
      if (!refusedDoor) {
        var drawersForRefusal = this.byKind.typed_drawer || [];
        for (var dr = 0; dr < drawersForRefusal.length; dr++) {
          if (acceptsTyped(drawersForRefusal[dr], args[0])) { refusedDoor = drawersForRefusal[dr]; break; }
        }
      }
      return [{
        type: "world_refusal", primitive: signature,
        doorId: refusedDoor ? refusedDoor.id : null,
        value: args[0], message: clone(refusal.message || {}),
        effect: refusal.effect || "no_world_state_change"
      }];
    }
    var slot = states.lantern_slot;
    if (slot === null || slot === undefined) {
      return this.canEmit(signature, "empty_slot_puff") ?
        [{ type: "empty_slot_puff", primitive: signature, value: null }] : [];
    }
    /* Extension WDR-069 : conteneurs typés (tiroirs) d'abord, puis portes. */
    var drawers = this.byKind.typed_drawer || [], drawer = null;
    for (var di = 0; di < drawers.length; di++) {
      if (acceptsTyped(drawers[di], slot)) { drawer = drawers[di]; break; }
    }
    if (drawer) {
      var dStateKey = drawer.id + "_open";
      if (states[dStateKey]) {
        return this.canEmit(signature, "drawer_already_open") ?
          [{ type: "drawer_already_open", primitive: signature, doorId: drawer.id, value: drawer.value }] : [];
      }
      states[dStateKey] = true;
      if (typeof states.drawers_open === "number") states.drawers_open += 1;
      if (Array.isArray(states.door_open_ids) && states.door_open_ids.indexOf(drawer.id) < 0) {
        states.door_open_ids.push(drawer.id);
        states.door_open_ids.sort();
      }
      if (typeof states.doors_open === "number") states.doors_open += 1;
      return this.canEmit(signature, "drawer_opens") ?
        [{ type: "drawer_opens", primitive: signature, doorId: drawer.id, value: drawer.value }] : [];
    }
    var doors = this.byKind.sealed_door || [], door = null;
    for (var i = 0; i < doors.length; i++) if (deepEqual(doors[i].value, slot)) { door = doors[i]; break; }
    if (!door) {
      return this.canEmit(signature, "empty_slot_puff") ?
        [{ type: "empty_slot_puff", primitive: signature, value: slot }] : [];
    }
    var stateKey = door.id + "_open";
    if (states[stateKey]) {
      return this.canEmit(signature, "door_already_open") ?
        [{ type: "door_already_open", primitive: signature, doorId: door.id, value: door.value }] : [];
    }
    states[stateKey] = true;
    if (typeof door.value === "number") states["door_" + door.value + "_open"] = true;
    states.doors_open = (typeof states.doors_open === "number" ? states.doors_open : 0) + 1;
    return this.canEmit(signature, "door_opens") ?
      [{ type: "door_opens", primitive: signature, doorId: door.id, value: door.value }] : [];
  };

  /* =====================================================================
     6. RUNTIME W2 — fidèle à ref_interpreter.py + canaux de monde.
     ===================================================================== */
  function Runtime(declared, stageOpts, sceneReader) {
    this.declared = declared || {};
    this.opts = stageOpts || {};
    this.sceneReader = sceneReader || null;
    this.states = {
      feedback_clear: false,
      inclusive_feedback: false,
      function_calls: 0,
      test_cases_passed: 0,
      event_count: 0,
      rules_active: false
    };
    if (this.sceneReader && this.sceneReader.enabled()) {
      var initialScene = this.sceneReader.initialStates();
      var sceneKeys = Object.keys(initialScene);
      for (var si = 0; si < sceneKeys.length; si++) this.states[sceneKeys[si]] = initialScene[sceneKeys[si]];
    }
    this.outputs = {};
    this.errors = [];
    this.errorDetails = [];
    this.steps = 0;
    this.markers = [];       // repères posés sur la grille (missions à table quadrillée)
    this.env = {};
    if (this.sceneReader && this.sceneReader.enabled()) {
      var named = this.sceneReader.namedObjects();
      Object.keys(named).forEach(function (id) { this.env[id] = named[id]; }, this);
    }
    this.lineEvents = [];
    this.events = [];
    this.originsByName = {};
    if (this.sceneReader) this.sceneReader.runtimeOrigins = this.originsByName;
  }
  Runtime.prototype.tick = function () { this.steps += 1; };
  Runtime.prototype.error = function (code, index) {
    if (this.errors.indexOf(code) < 0) this.errors.push(code);
    this.errorDetails.push({ index: (index === undefined ? -1 : index), code: code });
  };

  var PRIM_ARITY = {
    set_reaction: 1, transition: 1, set_feedback: 2, say: 1, current_state: 0
  };

  Runtime.prototype.callPrimitive = function (name, args, index, argNodes) {
    if (!Object.prototype.hasOwnProperty.call(this.declared, name)) {
      throw new RuntimeError("NameError", "name '" + name + "' is not defined");
    }
    var sceneEvents = this.sceneReader ? this.sceneReader.applyCall(name, args, this.states, argNodes) : null;
    if (sceneEvents !== null) {
      this.tick();
      this.lineEvents = this.lineEvents.concat(sceneEvents);
      this.events = this.events.concat(sceneEvents);
      this.states.event_count += sceneEvents.length;
      this.states.function_calls += 1;
      return undefined;
    }
    var arity = PRIM_ARITY[name];
    if (arity === undefined) {
      this.tick();
      this.error("primitive_without_reference_semantics:" + name, index);
      return undefined;
    }
    if (args.length !== arity) {
      throw new RuntimeError("TypeError",
        name + "() takes " + arity + " argument(s) but " + args.length + " were given");
    }
    this.tick();
    if (name === "set_reaction") {
      this.states.reaction_mode = args[0];
      this.outputs.reaction_mode = args[0];
      return undefined;
    }
    if (name === "transition") {
      this.states.transition_target = args[0];
      this.states.engine_state = args[0];
      this.outputs.transition_target = args[0];
      if (this.opts.grid) this.placeMarker(args[0], index);
      return undefined;
    }
    if (name === "set_feedback") {
      var text = args[0], shape = args[1];
      this.states.feedback_text = text;
      this.states.feedback_shape = shape;
      this.outputs.feedback_text = text;
      this.outputs.feedback_shape = shape;
      var complete = (typeof text === "string" && text.trim() !== "") &&
                     (typeof shape === "string" && shape.trim() !== "");
      this.states.feedback_clear = complete;
      this.states.inclusive_feedback = complete;
      return undefined;
    }
    if (name === "say") {
      this.states.say_text = args[0];
      this.outputs.say_text = args[0];
      this.states.feedback_clear = (typeof args[0] === "string" && args[0].trim() !== "");
      return undefined;
    }
    if (name === "current_state") {
      return this.states.engine_state;
    }
    return undefined;
  };

  /* Erreur douce de plateau : une coordonnée hors table 4×4 (P7/P8). */
  Runtime.prototype.placeMarker = function (target, index) {
    if (!Array.isArray(target) || target.length !== 2) return;
    var col = target[0], row = target[1];
    var ok = (typeof col === "number" && typeof row === "number" &&
              col % 1 === 0 && row % 1 === 0 &&
              col >= 1 && col <= GRID_SIZE && row >= 1 && row <= GRID_SIZE);
    if (!ok) { this.error("grid_out_of_range:" + pyRepr(target), index); return; }
    this.markers.push([col, row]);
  };

  function RuntimeError(kind, message) {
    this.name = "RuntimeError";
    this.kind = kind;
    this.message = message;
    this.stack = (new Error(kind + ": " + message)).stack;
  }
  RuntimeError.prototype = Object.create(Error.prototype);
  RuntimeError.prototype.constructor = RuntimeError;

  Runtime.prototype.evalExpr = function (node, index) {
    var self = this;
    switch (node.k) {
      case "num": case "str": case "bool": return node.v;
      case "none": return null;
      case "name":
        if (Object.prototype.hasOwnProperty.call(this.env, node.name)) return this.env[node.name];
        throw new RuntimeError("NameError", "name '" + node.name + "' is not defined");
      case "attr": {
        var objectValue = this.evalExpr(node.base, index);
        if (!objectValue || typeof objectValue !== "object" || !Object.prototype.hasOwnProperty.call(objectValue, node.attr)) {
          throw new RuntimeError("AttributeError", "unknown property '" + node.attr + "'");
        }
        return objectValue[node.attr];
      }
      case "list":
        return node.items.map(function (it) { return self.evalExpr(it, index); });
      case "dict": {
        var out = {};
        node.pairs.forEach(function (p) { out[p.key] = self.evalExpr(p.value, index); });
        return out;
      }
      case "index": {
        var base = this.evalExpr(node.base, index);
        var key = this.evalExpr(node.key, index);
        if (isDict(base)) {
          if (!Object.prototype.hasOwnProperty.call(base, String(key))) {
            throw new RuntimeError("KeyError", pyRepr(key));
          }
          return base[String(key)];
        }
        if (Array.isArray(base) || typeof base === "string") {
          if (typeof key !== "number" || key % 1 !== 0) {
            throw new RuntimeError("TypeError", "indices must be integers");
          }
          var idx = key < 0 ? base.length + key : key;
          if (idx < 0 || idx >= base.length) throw new RuntimeError("IndexError", "index out of range");
          return base[idx];
        }
        throw new RuntimeError("TypeError", "object is not subscriptable");
      }
      case "call": {
        var args = node.args.map(function (a) { return self.evalExpr(a, index); });
        return this.callPrimitive(node.name, args, index, node.args);
      }
      default:
        throw new RuntimeError("TypeError", "unsupported expression");
    }
  };

  Runtime.prototype.execStatement = function (stmt, index) {
    if (stmt.kind === "blank") return;
    if (stmt.kind === "assign") {
      var assigned = this.evalExpr(stmt.value, index);
      this.env[stmt.name] = assigned;
      if (stmt.value && stmt.value.k === "attr" && stmt.value.base && stmt.value.base.k === "name") {
        this.originsByName[stmt.name] = [stmt.value.base.name + "." + stmt.value.attr];
      } else if (stmt.value && stmt.value.k === "name") {
        this.originsByName[stmt.name] = (this.originsByName[stmt.value.name] || []).slice();
      } else {
        this.originsByName[stmt.name] = [];
      }
      if (this.sceneReader) {
        var isWorldAssignment = !!this.sceneReader.assignmentNames[stmt.name];
        var assignmentEvents = this.sceneReader.applyAssignment(stmt.name, assigned, this.states);
        if (isWorldAssignment) this.tick();
        this.lineEvents = this.lineEvents.concat(assignmentEvents);
        this.events = this.events.concat(assignmentEvents);
        this.states.event_count += assignmentEvents.length;
      }
      return;
    }
    if (stmt.kind === "setitem") {
      if (!Object.prototype.hasOwnProperty.call(this.env, stmt.name)) {
        throw new RuntimeError("NameError", "name '" + stmt.name + "' is not defined");
      }
      var base = this.env[stmt.name];
      var key = this.evalExpr(stmt.key, index);
      var value = this.evalExpr(stmt.value, index);
      if (isDict(base)) { base[String(key)] = value; return; }
      if (Array.isArray(base)) {
        if (typeof key !== "number" || key % 1 !== 0) throw new RuntimeError("TypeError", "indices must be integers");
        var idx = key < 0 ? base.length + key : key;
        if (idx < 0 || idx >= base.length) throw new RuntimeError("IndexError", "assignment index out of range");
        base[idx] = value; return;
      }
      throw new RuntimeError("TypeError", "object does not support item assignment");
    }
    if (stmt.kind === "call") {
      var self = this;
      var isSceneCall = !!(this.sceneReader && this.sceneReader.callNames[stmt.name]);
      var args = stmt.args.map(function (a) {
        /* `open_door(charge)` avec fente encore vide est une action du monde,
           pas une erreur NameError : le contrat exige l'événement pfff. */
        if (isSceneCall && a.k === "name" &&
            self.sceneReader.assignmentNames[a.name] &&
            !Object.prototype.hasOwnProperty.call(self.env, a.name)) return null;
        return self.evalExpr(a, index);
      });
      this.callPrimitive(stmt.name, args, index, stmt.args);
      return;
    }
    throw new RuntimeError("TypeError", "unsupported statement");
  };

  /* =====================================================================
     6. ANALYSE STATIQUE — requires_variable_use (réplique de la règle AST
        de ref_interpreter.py : une variable « utilisée » doit avoir une
        lecture qui ne soit pas une simple recopie `b = a`).
     ===================================================================== */
  function collectLoads(node, loads) {
    if (!node) return;
    switch (node.k) {
      case "name": loads[node.name] = (loads[node.name] || 0) + 1; break;
      case "attr": collectLoads(node.base, loads); break;
      case "list": node.items.forEach(function (i) { collectLoads(i, loads); }); break;
      case "dict": node.pairs.forEach(function (p) { collectLoads(p.value, loads); }); break;
      case "index": collectLoads(node.base, loads); collectLoads(node.key, loads); break;
      case "call":
        loads[node.name] = (loads[node.name] || 0) + 1;   // Python compte aussi Call.func (Load)
        node.args.forEach(function (a) { collectLoads(a, loads); });
        break;
      default: break;
    }
  }

  function analyseProgram(statements) {
    var stores = {}, loads = {}, copyLoads = {};
    var originsByName = {}, propertyCalls = {};
    function origins(node) {
      if (!node) return [];
      if (node.k === "attr" && node.base && node.base.k === "name") {
        return [node.base.name + "." + node.attr];
      }
      if (node.k === "name") return (originsByName[node.name] || []).slice();
      return [];
    }
    statements.forEach(function (stmt) {
      if (!stmt) return;
      if (stmt.kind === "assign") {
        stores[stmt.name] = true;
        collectLoads(stmt.value, loads);
        originsByName[stmt.name] = origins(stmt.value);
        if (stmt.value.k === "name") copyLoads[stmt.value.name] = (copyLoads[stmt.value.name] || 0) + 1;
      } else if (stmt.kind === "setitem") {
        loads[stmt.name] = (loads[stmt.name] || 0) + 1;    // `d[k] = v` lit d
        collectLoads(stmt.key, loads);
        collectLoads(stmt.value, loads);
      } else if (stmt.kind === "call") {
        loads[stmt.name] = (loads[stmt.name] || 0) + 1;
        stmt.args.forEach(function (a) { collectLoads(a, loads); });
        if (!propertyCalls[stmt.name]) propertyCalls[stmt.name] = [];
        propertyCalls[stmt.name].push(stmt.args.map(origins));
      }
    });
    var used = [];
    Object.keys(stores).forEach(function (name) {
      if ((loads[name] || 0) > (copyLoads[name] || 0)) used.push(name);
    });
    used.sort();
    return { stores: Object.keys(stores).sort(), used: used, propertyCalls: propertyCalls };
  }

  /* =====================================================================
     7. VICTOIRE — victory_rules / check_rule de ref_interpreter.py.
     ===================================================================== */
  function victoryRules(condition) {
    if (Array.isArray(condition)) {
      return condition.filter(function (r) { return r && typeof r === "object"; });
    }
    if (!condition || typeof condition !== "object") return [];
    if (condition.type === "all_of") {
      return (condition.rules || []).filter(function (r) { return r && typeof r === "object"; });
    }
    return [condition];
  }

  function checkRule(rule, states, steps, usedVars, propertyCalls) {
    var state, actual, expected;
    if (rule.type === "state_equals") {
      state = String(rule.property);
      actual = states[state];
      expected = rule.value;
      return { passed: deepEqual(actual, expected),
               detail: state + ":expected=" + pyRepr(expected) + ":actual=" + pyRepr(actual),
               property: state, expected: expected, actual: actual };
    }
    if (Object.prototype.hasOwnProperty.call(rule, "state")) {
      state = String(rule.state);
      actual = states[state];
      expected = rule.value;
      var op = rule.op || "eq";
      var ok;
      if (op === "eq") ok = deepEqual(actual, expected);
      else if (op === "gt") ok = actual > expected;
      else if (op === "gte") ok = actual >= expected;
      else if (op === "lt") ok = actual < expected;
      else if (op === "lte") ok = actual <= expected;
      else ok = false;
      return { passed: !!ok,
               detail: state + ":" + op + ":expected=" + pyRepr(expected) + ":actual=" + pyRepr(actual),
               property: state, expected: expected, actual: actual };
    }
    if (rule.type === "no_extra_command") {
      var limit = rule.max_commands;
      return { passed: (limit !== undefined && limit !== null && steps <= limit),
               detail: "steps:" + steps + ":max_commands:" + limit,
               property: "steps", expected: limit, actual: steps };
    }
    if (rule.requires_variable_use) {
      return { passed: usedVars.length > 0,
               detail: "requires_variable_use:used=[" + usedVars.join(", ") + "]",
               property: "requires_variable_use", expected: true, actual: usedVars.slice() };
    }
    if (Object.prototype.hasOwnProperty.call(rule, "requires_property_reads")) {
      var requirement = rule.requires_property_reads || {};
      var objectName = String(requirement.object);
      var properties = requirement.properties || [];
      var usedBy = String(requirement.used_by);
      var expectedOrigins = properties.map(function (name) { return objectName + "." + name; });
      var callRows = (propertyCalls && propertyCalls[usedBy]) || [];
      var matched = callRows.some(function (args) {
        if (args.length < expectedOrigins.length) return false;
        return expectedOrigins.every(function (origin, index) {
          return args[index].indexOf(origin) >= 0;
        });
      });
      var detail = "requires_property_reads:" + objectName + ":[" + expectedOrigins.join(",") +
                   "]:used_by=" + usedBy + ":matched=" + String(matched);
      return { passed: matched, detail: detail, property: "requires_property_reads",
               expected: expectedOrigins, actual: matched };
    }
    return { passed: false, detail: "unsupported_victory_rule:" + rule.type,
             property: null, expected: null, actual: null };
  }

  /* =====================================================================
     8. EXÉCUTION COMPLÈTE — fonction pure.
     ===================================================================== */
  function primitiveName(token) { return String(token).split("(")[0].trim(); }

  function runProgram(mission, lines, stageOpts) {
    var playable = (mission && mission.playable) || {};
    var declared = {};
    (playable.primitives || []).forEach(function (p) { declared[primitiveName(p)] = true; });

    var sceneReader = new SceneContract(playable);
    var rt = new Runtime(declared, stageOpts || {}, sceneReader);
    var statements = [], parsed = true;
    var errorIdx = -1;
    var trace = [];
    lines = lines || [];

    /* 8.1 — analyse de toutes les lignes (erreurs de syntaxe douces, indexées) */
    for (var i = 0; i < lines.length; i++) {
      var stmt = null;
      try {
        stmt = parseLine(String(lines[i]));
      } catch (e) {
        rt.error("syntax_error:" + e.message + ":line_" + (i + 1), i);
        if (errorIdx < 0) errorIdx = i;
        parsed = false;
        break;
      }
      statements.push(stmt);
    }

    /* 8.2 — erreurs structurelles : primitive appelée mais non déclarée */
    if (parsed) {
      var callNames = {};
      statements.forEach(function (stmt2, si) {
        collectCallNames(stmt2, callNames, si);
      });
      Object.keys(callNames).sort().forEach(function (name) {
        if (!Object.prototype.hasOwnProperty.call(declared, name)) {
          rt.error("undeclared_primitive:" + name, callNames[name]);
          if (errorIdx < 0) errorIdx = callNames[name];
        }
      });
    }

    /* 8.3 — exécution ligne par ligne, arrêt à la première erreur d'exécution */
    if (parsed) {
      for (var j = 0; j < statements.length; j++) {
        var lineError = null;
        var errCountBefore = rt.errorDetails.length;
        rt.lineEvents = [];
        try {
          rt.execStatement(statements[j], j);
        } catch (err) {
          if (err instanceof RuntimeError || (err && err.kind)) {
            lineError = "execution_error:" + err.kind + ":" + err.message;
          } else {
            lineError = "execution_error:InternalError:" + (err && err.message ? err.message : String(err));
          }
          rt.error(lineError, j);
          if (errorIdx < 0) errorIdx = j;
        }
        if (!lineError && rt.errorDetails.length > errCountBefore) {
          lineError = rt.errorDetails[rt.errorDetails.length - 1].code;   // erreur douce (hors grille…)
          if (errorIdx < 0) errorIdx = j;
        }
        trace.push({
          index: j,
          line: lines[j],
          states: clone(rt.states),
          vars: clone(rt.env),
          markers: rt.markers.slice(),
          events: clone(rt.lineEvents),
          steps: rt.steps,
          error: lineError
        });
        if (lineError && lineError.indexOf("execution_error") === 0) break;
      }
    }

    /* 8.4 — victoire */
    var analysis = analyseProgram(statements);
    var rules = victoryRules(playable.victory_condition);
    var checks = rules.map(function (rule) {
      return checkRule(rule, rt.states, rt.steps, analysis.used, analysis.propertyCalls);
    });
    /* WDR-074 P5: call_by_name keeps strict WDR-072 semantics internally, but
       a receiver is only presented as awake when the complete victory contract
       passes (notably requires_variable_use). */
    var usesStrictNames = !!sceneReader.callNames.call_by_name;
    var contractPassed = checks.length > 0 && checks.every(function (c) { return c.passed; });
    if (usesStrictNames && !contractPassed) {
      (sceneReader.byKind.named_receiver || []).forEach(function (receiver) {
        var key = receiver.id + "_activated";
        if (rt.states[key]) rt.states[key + "_pending"] = true;
        rt.states[key] = false;
      });
      trace.forEach(function (snap) {
        (sceneReader.byKind.named_receiver || []).forEach(function (receiver) {
          var key = receiver.id + "_activated";
          if (snap.states[key]) snap.states[key + "_pending"] = true;
          snap.states[key] = false;
        });
      });
    }
    checks.forEach(function (c) {
      if (!c.passed) rt.error("victory_failed:" + c.detail, -1);
    });
    var won = checks.length > 0 && checks.every(function (c) { return c.passed; }) &&
              rt.errorDetails.filter(function (d) { return d.code.indexOf("victory_failed:") !== 0; }).length === 0;

    return {
      won: won,
      errors: rt.errors,
      errorDetails: rt.errorDetails,
      errorIdx: errorIdx,
      hardErrors: rt.errorDetails.filter(function (d) { return d.code.indexOf("victory_failed:") !== 0; }).length,
      steps: rt.steps,
      states: rt.states,
      vars: rt.env,
      markers: rt.markers,
      trace: trace,
      victoryChecks: checks,
      usedVars: analysis.used,
      declaredVars: analysis.stores,
      observables: rt.outputs,
      scene: sceneReader.enabled() ? {
        actors: clone(sceneReader.actors), props: clone(sceneReader.props), grid: clone(sceneReader.grid),
        renders: clone(sceneReader.renders), emits: clone(sceneReader.emits)
      } : null,
      events: clone(rt.events)
    };
  }

  function collectCallNames(stmt, out, lineIndex) {
    if (!stmt) return;
    var walk = function (node) {
      if (!node) return;
      if (node.k === "call") {
        if (!(node.name in out)) out[node.name] = lineIndex;
        node.args.forEach(walk);
      } else if (node.k === "list") node.items.forEach(walk);
      else if (node.k === "dict") node.pairs.forEach(function (p) { walk(p.value); });
      else if (node.k === "index") { walk(node.base); walk(node.key); }
      else if (node.k === "attr") walk(node.base);
    };
    if (stmt.kind === "call") {
      if (!(stmt.name in out)) out[stmt.name] = lineIndex;
      stmt.args.forEach(walk);
    } else if (stmt.kind === "assign") walk(stmt.value);
    else if (stmt.kind === "setitem") { walk(stmt.key); walk(stmt.value); }
  }

  /* =====================================================================
     9. PRÉDICTION + ÉTOILES — logique testable (plafond à 2 étoiles quand la
        prédiction attendue est absente ou fausse, missions P1 et P8).
     ===================================================================== */
  function parsePrediction(raw) {
    if (raw === undefined || raw === null) return { ok: false, reason: "absent" };
    var text = String(raw).trim();
    if (text === "") return { ok: false, reason: "absent" };
    try {
      var toks = tokenize(text);
      var p = new Parser(toks);
      var node = p.parseExpr();
      if (p.peek()) return { ok: false, reason: "invalide" };
      var rt = new Runtime({}, {});
      return { ok: true, value: rt.evalExpr(node, -1) };
    } catch (e) {
      return { ok: false, reason: "invalide" };
    }
  }

  function evaluatePrediction(stage, raw, finalStates, mission) {
    var contractSpec = mission && mission.playable && mission.playable.prediction;
    var spec = contractSpec || (stage && stage.prediction);
    if (!spec) return { required: false, optional: true, provided: false, passed: false, correct: true, actual: undefined };
    var parsedPred = parsePrediction(raw);
    var property = contractSpec ? contractSpec.comparison_state : spec.property;
    var actual = finalStates ? finalStates[property] : undefined;
    var optional = !!(contractSpec && contractSpec.optional);
    if (!parsedPred.ok) {
      return { required: !optional, optional: optional, provided: false,
               passed: optional && parsedPred.reason !== "absent",
               correct: false, actual: actual,
               expected: contractSpec ? actual : spec.value, property: property };
    }
    var passed = optional && parsedPred.value === null;
    var allowed = !contractSpec || !(contractSpec.options instanceof Array) ||
      contractSpec.options.some(function (v) { return deepEqual(v, parsedPred.value); });
    return {
      required: !optional,
      optional: optional,
      provided: !passed,
      passed: passed,
      value: parsedPred.value,
      actual: actual,
      expected: contractSpec ? actual : spec.value,
      property: property,
      correct: !passed && allowed && deepEqual(parsedPred.value, actual) &&
        (contractSpec ? true : deepEqual(parsedPred.value, spec.value))
    };
  }

  function sceneElegance(mission, lines, result) {
    var policy = mission && mission.playable && mission.playable.star_policy;
    if (!result || !result.won || result.hardErrors > 0 || !policy) return false;
    if (policy.elegance_rule !== "no_unnecessary_action_in_final_program") return false;
    /* Une action est inutile si le programme gagne encore après sa suppression.
       Cette preuve mécanique couvre doublons, porte déjà ouverte, refus du monde
       et affectations écrasées, sans comparer à une séquence canonique. */
    for (var i = 0; i < lines.length; i++) {
      var shortened = lines.slice(0, i).concat(lines.slice(i + 1));
      if (runProgram(mission, shortened, {}).won) return false;
    }
    return true;
  }

  function computeContractStars(mission, lines, result, prediction) {
    var policy = mission && mission.playable && mission.playable.star_policy;
    if (!policy) return null;
    if (!result.won) return 0;
    var elegant = sceneElegance(mission, lines, result);
    result.elegance = elegant;
    var victoryStars = Number(policy.victory_stars || 2);
    return elegant ? 3 : Math.max(2, victoryStars);
  }

  /* Ancien barème conservé à l'identique pour P2-P8 sans star_policy.
     Les missions à contrat de scène utilisent computeContractStars. */
  function computeW2Stars(opts) {
    opts = opts || {};
    if (!opts.won) return 0;
    var stars = 3;
    if ((opts.errors || 0) > 0) stars -= 1;
    if ((opts.hints || 0) > 0) stars -= 1;
    if (opts.predictionRequired && !opts.predictionCorrect) stars = Math.min(stars, 2);
    return Math.max(1, stars);
  }

  /* =====================================================================
     10. API de test headless.
     ===================================================================== */
  function missionBundle() {
    var w = (typeof window !== "undefined") ? window : null;
    return (w && w.CREATE_MISSIONS_W2) ? w.CREATE_MISSIONS_W2 : null;
  }
  function missionContent(stageId) {
    var b = missionBundle();
    var st = W2_STAGES[stageId];
    return (b && st) ? b[st.key] : null;
  }

  function testW2Stage(stageId, lines, options) {
    var stage = W2_STAGES[stageId];
    if (!stage) return { error: "unknown stage " + stageId, won: false, errors: ["unknown_stage"], errorIdx: -1, steps: 0, states: {} };
    var mission = missionContent(stageId);
    if (!mission) return { error: "missing bundle CREATE_MISSIONS_W2", won: false, errors: ["missing_bundle"], errorIdx: -1, steps: 0, states: {} };
    options = options || {};
    var result = runProgram(mission, lines, { grid: !!stage.grid });
    var pred = evaluatePrediction(stage, options.prediction, result.states, mission);
    result.prediction = pred;
    var reward = mission.playable && mission.playable.prediction && mission.playable.prediction.reward;
    result.badge = (result.won && pred.correct && reward && reward.kind === "badge") ? {
      label: clone(reward.badge || {}),
      message: clone(reward.success_message || {}),
      affectsStars: reward.affects_stars === true
    } : null;
    var contractStars = computeContractStars(mission, lines || [], result, pred);
    result.stars = contractStars === null ? computeW2Stars({
      won: result.won,
      errors: options.errorsBefore || result.hardErrors,
      hints: options.hints || 0,
      predictionRequired: pred.required,
      predictionCorrect: pred.correct
    }) : contractStars;
    return result;
  }

  if (typeof window !== "undefined") {
    window.__testW2Stage = testW2Stage;
    window.__CREATE_W2_STAGES = W2_STAGES;
    window.__RUN_W2_PROGRAM = runProgram;
    window.__W2_PARSE_LINE = parseLine;
    window.__W2_COMPUTE_STARS = computeW2Stars;
    window.__W2_EVALUATE_PREDICTION = evaluatePrediction;
    window.__W2_DEEP_EQUAL = deepEqual;
    window.__W2_PY_REPR = pyRepr;
    window.__W2_SCENE_CONTRACT = SceneContract;
  }
  if (typeof module !== "undefined" && module && module.exports) {
    module.exports = {
      testW2Stage: testW2Stage,
      runProgram: runProgram,
      parseLine: parseLine,
      computeW2Stars: computeW2Stars,
      computeContractStars: computeContractStars,
      evaluatePrediction: evaluatePrediction,
      SceneContract: SceneContract,
      deepEqual: deepEqual,
      pyRepr: pyRepr,
      W2_STAGES: W2_STAGES,
      W2_ORDER: W2_ORDER
    };
  }

  /* =====================================================================
     11. INTERFACE — à partir d'ici, rien ne s'exécute sans DOM.
     ===================================================================== */
  if (!HAS_DOM) return;

  Object.defineProperty(window, "__wondra_trace", {
    configurable: true,
    get: function () { return wondraTrace; }
  });
  window.__wondraSaveKey = SAVE_KEY_W2;
  window.__wondraNoticeKey = noticeKey;
  window.__wondraSanitizeSave = sanitizeSave2;
  window.__wondraTraceEvent = traceEvent;

  var save2 = null;
  var cur = null;          // {stageId, lines[], errorsThis, hintsThis, prediction, timer}
  var running2 = false;
  var shellTouched = false;

  function el(id) { return document.getElementById(id); }
  function mk(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function show(id, visible) {
    var n = el(id);
    if (n) n.classList.toggle("hidden", !visible);
  }

  /* =====================================================================
     R2 — TRACES LOCALES (zéro réseau, zéro donnée personnelle).
     window.__wondra_trace = tableau append-only horodaté ; export dev
     « Exporter la trace » → JSON. Répond à : « combien de secondes avant
     la 1re action ? », « combien d'exécutions avant la victoire ? »,
     « où l'abandon ? ».
     ===================================================================== */
  var wondraTrace = [];
  var traceSession = null;
  var runCounter = 0;
  var noticeKey = "kodawari-create-w2-notice-v1";
  function traceReady() {
    if (traceSession === null) {
      traceSession = {
        id: String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8),
        started_at: Date.now(),
        app: "wondra-create-w2",
        lang: lang()
      };
    }
    return traceSession;
  }
  function traceEvent(name, data) {
    var e = { event: name, ms: Date.now() };
    if (traceReady()) { e.session = traceSession.id; e.lang = traceSession.lang; }
    if (data) {
      Object.keys(data).forEach(function (k) { e[k] = data[k]; });
    }
    wondraTrace.push(e);
    return e;
  }
  function missionLabel(stageId) {
    var mc = missionContent(stageId);
    if (mc) return mc.i18n[lang()].name;
    var st = W2_STAGES[stageId];
    return (st && st.object) ? (st.object[lang()] || stageId) : String(stageId);
  }
  function missionStartTrace(stageId) {
    cur.startedAt = Date.now();
    cur.missionWonAt = null;
    traceEvent("mission_start", { stage: stageId, mission: missionLabel(stageId) });
    if (missionHasScene(cur.mission)) {
      traceEvent("scene_ready", { stage: stageId, seconds: 0 });
    }
  }
  function lineAddedTrace(stageId) {
    traceEvent("line_added", {
      stage: stageId, line: cur.lines[cur.lines.length - 1], count: cur.lines.length
    });
    if (cur.lines.length === 1) {
      traceEvent("first_action", {
        stage: stageId,
        seconds: Math.max(0, Math.round((Date.now() - cur.startedAt) / 1000))
      });
    }
  }
  function runStartTrace(stageId, lineCount) {
    runCounter += 1;
    traceEvent("program_run", { stage: stageId, run: runCounter, lines: lineCount });
  }
  function runFailedTrace(stageId, reason) {
    traceEvent("run_failed", { stage: stageId, run: runCounter, reason: reason });
  }
  function missionWonTrace(stageId, stars, elegance, gestures) {
    var won = traceEvent("mission_won", {
      stage: stageId, stars: stars, elegance: !!elegance, gestures: gestures,
      run: runCounter, seconds: Math.max(0, Math.round((Date.now() - cur.startedAt) / 1000))
    });
    cur.missionWonAt = won.ms;
    return won;
  }
  function missionAbandonTrace() {
    if (!cur || !cur.stageId || cur.missionWonAt) return;
    if (!cur.startedAt) return;
    traceEvent("mission_abandon", {
      stage: cur.stageId, mission: missionLabel(cur.stageId),
      seconds: Math.max(0, Math.round((Date.now() - cur.startedAt) / 1000)),
      lines: (cur.lines || []).length, run: runCounter
    });
  }

  /* ---- export / import JSON (R15) ---- */
  function downloadJSON2(filename, obj) {
    try {
      var blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = mk("a");
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click();
      setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 400);
    } catch (e) { toast2(tr("Export impossible sur cet appareil.", "Export not possible on this device."), "err"); }
  }
  function exportTrace2() {
    if (!wondraTrace.length) { toast2(tr("Aucune activité à exporter pour l'instant.", "Nothing to export yet."), "err"); return; }
    var stage = (cur && cur.stageId) ? cur.stageId : "map";
    downloadJSON2("wondra_trace_" + stage + "_" + Date.now() + ".json", {
      session: traceReady(), events: wondraTrace.slice()
    });
    toast2(tr("Trace exportée (JSON).", "Trace exported (JSON)."), "ok");
  }
  function sanitizeSave2(raw) {
    var s = { lang: "fr", stars: {}, objects: {}, badges: {}, records: {}, unlocked: 1 };
    if (!raw || typeof raw !== "object") return s;
    s.lang = raw.lang === "en" ? "en" : "fr";
    if (raw.stars && typeof raw.stars === "object") {
      W2_ORDER.forEach(function (id) {
        var v = Number(raw.stars[id]);
        if (v >= 1 && v <= 3) s.stars[id] = Math.round(v);
      });
    }
    ["objects", "badges"].forEach(function (k) {
      if (raw[k] && typeof raw[k] === "object") {
        Object.keys(raw[k]).forEach(function (id) { if (raw[k][id]) s[k][id] = raw[k][id]; });
      }
    });
    if (raw.records && typeof raw.records === "object") {
      W2_ORDER.forEach(function (id) {
        var v = Number(raw.records[id]);
        if (v >= 1 && v <= 99) s.records[id] = Math.round(v);
      });
    }
    var u = Number(raw.unlocked);
    s.unlocked = (u >= 1 && u <= 8) ? Math.round(u) : 1;
    return s;
  }
  function exportSave2() {
    if (!save2) return;
    downloadJSON2("wondra_progression_" + Date.now() + ".json", saveExportPayload2());
    toast2(tr("Clé de progression exportée.", "Progress key exported."), "ok");
  }
  function saveExportPayload2() { return JSON.parse(JSON.stringify(save2)); }
  function importSave2(raw) {
    var parsed = null;
    try { parsed = JSON.parse(String(raw)); } catch (e) { parsed = null; }
    save2 = sanitizeSave2(parsed);
    persistSave2();
    toast2(tr("Progression restaurée depuis la clé.", "Progress restored from the key."), "ok");
    route2();
    return save2;
  }
  function pickSaveFile2() {
    var input = el("w2-save-file");
    if (!input) {
      input = mk("input", "hidden");
      input.id = "w2-save-file";
      input.type = "file";
      input.accept = "application/json,.json";
      input.style.display = "none";
      input.addEventListener("change", function () {
        var f = input.files && input.files[0];
        if (!f) return;
        var rd = new FileReader();
        rd.onload = function () { importSave2(rd.result); input.value = ""; };
        rd.onerror = function () { input.value = ""; toast2(tr("Clé illisible.", "Unreadable key."), "err"); };
        rd.readAsText(f);
      });
      document.body.appendChild(input);
    }
    input.click();
  }

  /* ---- outillage discret : trace + clé de progression (R2/R15) ---- */
  var w2DevBtns = null, w2Notice = null;
  function buildDevToolbar() {
    if (w2DevBtns) return w2DevBtns;
    w2DevBtns = mk("div", "w2-dev");
    var traceBtn = mk("button", "w2-devbtn", tr("Exporter la trace", "Export trace"));
    traceBtn.type = "button";
    traceBtn.setAttribute("aria-label",
      tr("Exporter la trace de jeu (JSON, reste sur cet appareil)", "Export the play trace (JSON, stays on this device)"));
    traceBtn.addEventListener("click", exportTrace2);
    var keyBtn = mk("button", "w2-devbtn", tr("Ma clé de progression", "My progress key"));
    keyBtn.type = "button";
    keyBtn.addEventListener("click", exportSave2);
    var impBtn = mk("button", "w2-devbtn", tr("Importer une clé…", "Import a key…"));
    impBtn.type = "button";
    impBtn.addEventListener("click", pickSaveFile2);
    w2DevBtns.appendChild(traceBtn);
    w2DevBtns.appendChild(keyBtn);
    w2DevBtns.appendChild(impBtn);
    return w2DevBtns;
  }
  function buildProgressNotice() {
    if (w2Notice) return w2Notice;
    w2Notice = mk("div", "w2-notice hidden");
    w2Notice.appendChild(mk("span", "", tr(
      "Ta progression est gardée sur cet appareil. Pour ne pas la perdre, exporte ta clé de progression.",
      "Your progress is saved on this device. To keep it safe, export your progress key.")));
    var ok = mk("button", "w2-notice-ok", tr("J'ai compris", "Got it"));
    ok.type = "button";
    ok.addEventListener("click", function () {
      try { localStorage.setItem(noticeKey, "1"); } catch (e) { /* ignore */ }
      w2Notice.classList.add("hidden");
    });
    w2Notice.appendChild(ok);
    return w2Notice;
  }
  function installW2Toolbar() {
    var actions = el("w2-actions");
    if (!actions) return;
    if (!w2DevBtns || !w2DevBtns.parentNode) actions.appendChild(buildDevToolbar());
    if (!w2Notice || !w2Notice.parentNode) actions.appendChild(buildProgressNotice());
    refreshDevToolbar();
  }
  function refreshDevToolbar() {
    if (!w2DevBtns) return;
    var missionEl = el("screen-w2-mission");
    var inMission = !!(missionEl && missionEl.classList.contains("visible"));
    var kids = w2DevBtns.children;
    if (kids[0]) kids[0].classList.toggle("hidden", !inMission);            // export trace : en mission
    for (var i = 1; i < kids.length; i++) kids[i].classList.toggle("hidden", inMission); // clé : sur la carte
    if (w2Notice) w2Notice.classList.toggle("hidden", inMission);           // avertissement : carte seulement
  }
  function showProgressNoticeOnce() {
    if (!w2Notice) return;
    var dismissed = false;
    try { dismissed = localStorage.getItem(noticeKey) === "1"; } catch (e) { /* ignore */ }
    w2Notice.classList.toggle("hidden", dismissed && !demoMode());
  }
  function updateGestures() {
    var g = el("w2-gestures");
    if (!g) return;
    var n = (cur && cur.lines) ? cur.lines.length : 0;
    if (n > 0) {
      var rec = (cur && cur.gestureRecord) || 0;
      g.textContent = n + " " + tr("geste(s)", "move(s)") +
        (rec > 0 ? tr(" — record : " + rec, " — best: " + rec) : "");
      g.classList.remove("hidden");
    } else {
      g.textContent = "";
      g.classList.add("hidden");
    }
  }
  function lang() { return (save2 && save2.lang === "en") ? "en" : "fr"; }
  function tr(fr, en) { return lang() === "fr" ? fr : en; }
  function missionHasScene(mission) {
    return !!(mission && mission.playable && mission.playable.scene);
  }

  /* Styles de la vue scène injectés par son moteur : les missions P2-P8
     gardent strictement leur DOM et leurs styles historiques. */
  function installSceneStyles() {
    if (el("w2-scene-styles")) return;
    var style = mk("style");
    style.id = "w2-scene-styles";
    style.textContent = [
      ".scene-mode .mission-wrap{grid-template-columns:1fr;max-width:1040px;margin:auto}",
      ".scene-mode .mission-wrap>div.panel:first-child{display:none}",
      "body.w2-scene-opening .appbar{opacity:0;pointer-events:none}",
      ".scene-mode.scene-intro #w2-panel-state~.panel{display:none!important}",
      ".scene-mode #w2-panel-predict.awaiting-program{display:none!important}",
      ".scene-mode #w2-panel-state{padding:0;overflow:hidden;border-color:#6e5328;background:#111517;position:relative}",
      ".w2-scene-shell{position:relative;min-height:360px;background:#111517;isolation:isolate}",
      ".w2-scene-canvas{display:block;width:100%;height:auto;aspect-ratio:16/9;background:#131619;touch-action:none}",
      ".w2-scene-caption{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);max-width:min(560px,88%);padding:10px 18px;border:1px solid rgba(245,184,61,.5);border-radius:18px;background:rgba(20,20,18,.88);box-shadow:0 8px 28px rgba(0,0,0,.35);font-size:clamp(15px,2vw,20px);font-weight:700;text-align:center;color:#f6ead2;opacity:0;transition:opacity .25s;pointer-events:none}",
      ".w2-scene-caption.show{opacity:1}",
      ".w2-scene-actions{position:absolute;right:16px;top:16px;display:flex;gap:8px;z-index:3}",
      ".w2-scene-help{background:#2d271d;color:#f5d58b;border:1px solid #9a7430;border-radius:999px;padding:9px 14px;font:700 14px/1.2 'Trebuchet MS','Segoe UI',sans-serif;cursor:pointer}",
      ".w2-scene-result{position:relative;display:none;align-items:center;justify-content:space-between;gap:14px;padding:14px 18px;border:1px solid rgba(245,184,61,.72);border-radius:0 0 18px 18px;background:#181714;box-shadow:0 12px 40px rgba(0,0,0,.35);z-index:4}",
      ".w2-scene-result.show{display:flex}",
      ".w2-scene-result h3{color:#f5b83d;font-size:1.15rem;margin:0}",
      ".w2-scene-result p{margin:2px 0;color:#f3e7ce}",
      ".w2-scene-result .scene-stars{font-size:24px;color:#f5b83d;white-space:nowrap}",
      ".w2-scene-result .btn{white-space:nowrap}",
      ".scene-mode #w2-panel-templates,.scene-mode #w2-panel-predict,.scene-mode #screen-w2-mission .view-pane>div.panel:not(#w2-panel-state){border-color:#4e4333;background:#1c1d1d}",
      ".scene-mode .w2-tpl,.scene-mode .cmd-item{background:#24221e;border-color:#544831}",
      ".scene-mode .w2-field,.scene-mode .w2-op,.scene-mode .w2-prim-name,.scene-mode .w2-chip,.scene-mode .cmd-item .cmd-code,.scene-mode .w2-line-num{font-family:'Trebuchet MS','Segoe UI',system-ui,sans-serif!important;letter-spacing:.02em}",
      ".scene-mode .cmd-item .cmd-code{color:#f5dfae;font-size:16px}",
      ".scene-mode .cmd-item.current,.scene-mode .cmd-item.selected{border-color:#f5b83d;background:#332b1b;box-shadow:0 0 0 1px rgba(245,184,61,.25)}",
      ".scene-mode .cmd-item.err{border-color:#8e7748;background:#302b22;box-shadow:none}",
      ".scene-mode .run-state.err{color:#d8c596}",
      ".scene-templates{display:flex;gap:12px;flex-wrap:wrap;align-items:stretch}",
      ".scene-tool{flex:1 1 260px;border:1px solid #5b4b31;border-radius:14px;padding:12px;background:#24221e}",
      ".scene-tool-title{font-weight:800;color:#f5d58b;margin-bottom:8px}",
      ".scene-crystals{display:flex;gap:9px;flex-wrap:wrap}",
      ".scene-crystal{width:50px;height:50px;border:1px solid #75e4ef;border-radius:14px 14px 18px 18px;background:linear-gradient(145deg,#cbfbff,#4fd0e0 48%,#176c78);color:#092c32;font:800 20px/1 'Trebuchet MS','Segoe UI',sans-serif;box-shadow:0 5px 15px rgba(79,208,224,.25);cursor:grab;transition:transform .18s}",
      ".scene-crystal:hover{transform:translateY(-4px) rotate(-2deg)}",
      ".scene-present{min-height:50px;border-radius:14px;background:linear-gradient(#f5c75f,#ce8d20);border:1px solid #8d5e12;color:#2b1b07;font:800 15px/1.2 'Trebuchet MS','Segoe UI',sans-serif;padding:10px 16px;cursor:pointer}",
      ".scene-prediction{display:flex;align-items:center;gap:14px;flex-wrap:wrap}",
      ".scene-prediction .predict-copy{flex:1 1 230px;color:#e7dbc1}",
      ".scene-prediction .predict-copy strong{display:block;color:#f5b83d;font-size:1rem}",
      ".scene-prediction .scene-crystals{flex:0 1 auto}",
      ".scene-predict-slot{width:78px;height:64px;display:grid;place-items:center;border:2px dashed #4fd0e0;border-radius:16px;background:#13282b;color:#9cf1f7;font:800 12px/1.1 'Trebuchet MS','Segoe UI',sans-serif;text-align:center;padding:3px}",
      ".scene-predict-slot.chosen{border-style:solid;background:#17444a;color:#fff;box-shadow:0 0 18px rgba(79,208,224,.25)}",
      ".scene-none{min-height:46px;border:1px solid #657079;border-radius:12px;background:#272d31;color:#d9e0e4;padding:8px 12px;font:700 13px 'Trebuchet MS','Segoe UI',sans-serif;cursor:pointer}",
      ".scene-mode .w2-memory,.scene-mode .w2-kv{display:none!important}",
      "@media(max-width:700px){.w2-scene-shell{min-height:260px}.w2-scene-result{align-items:flex-start;flex-direction:column}.w2-scene-result .btn{width:100%}}"
    ].join("");
    document.head.appendChild(style);
    appendPhase1Styles();
  }
  /* Styles R2/R15/A3/A4 — outillage discret, compteur de gestes, badge,
     zone parent. Aucun signal porté par la couleur seule (R9). */
  function appendPhase1Styles() {
    if (el("w2-phase1-styles")) return;
    var style = mk("style");
    style.id = "w2-phase1-styles";
    style.textContent = [
      ".w2-dev{display:inline-flex;gap:6px;align-items:center}",
      ".w2-devbtn{appearance:none;border:1px solid #3a4552;background:#232b34;color:#c9d2db;border-radius:999px;padding:6px 10px;font:600 11.5px/1.2 'Trebuchet MS','Segoe UI',sans-serif;min-height:30px;cursor:pointer}",
      ".w2-devbtn:hover{color:#f5b83d;border-color:#f5b83d}",
      ".w2-notice{display:flex;align-items:center;gap:8px;max-width:560px;padding:5px 8px 5px 12px;border:1px solid #6d4c41;border-radius:999px;background:#241f1a;color:#f3e7ce;font-size:12px;line-height:1.35}",
      ".w2-notice-ok{appearance:none;border:1px solid #9a7430;background:linear-gradient(#f5c75f,#ce8d20);color:#2b1b07;border-radius:999px;padding:4px 10px;font:700 11px/1 'Trebuchet MS','Segoe UI',sans-serif;min-height:28px;cursor:pointer;white-space:nowrap}",
      ".w2-gestures{color:#f5d58b;font-size:.8rem;font-weight:700}",
      ".w2-badge-chip{display:inline-flex;align-items:center;gap:6px;margin:6px 0 0;padding:5px 12px;border:1px solid #9a7430;border-radius:999px;background:#2d271d;color:#f5d58b;font:800 13px/1.2 'Trebuchet MS','Segoe UI',sans-serif;width:fit-content}",
      ".w2-parent-zone{margin-top:12px;padding-top:8px;border-top:1px dashed #544831;color:#9aa5b1;font-size:.74rem;line-height:1.45;max-width:56ch}",
      ".w2-parent-zone .w2-parent-tag{display:block;font-size:.6rem;font-weight:800;letter-spacing:.12em;color:#b3955a;margin-bottom:2px}",
      "@media(max-width:880px){.w2-notice{max-width:100%;border-radius:14px}.w2-devbtn{font-size:10.5px}}"
    ].join("");
    document.head.appendChild(style);
  }

  /* -- Progression : clé séparée du Monde 1 -- */
  function loadSave2() {
    try {
      var raw = (typeof localStorage !== "undefined") && localStorage.getItem(SAVE_KEY_W2);
      if (raw) {
        var s = JSON.parse(raw);
        s.stars = s.stars || {};
        s.objects = s.objects || {};
        s.badges = s.badges || {};
        s.records = s.records || {};
        if (!s.unlocked || s.unlocked < 1) s.unlocked = 1;
        if (s.unlocked > 8) s.unlocked = 8;
        if (s.lang !== "en") s.lang = "fr";
        return s;
      }
    } catch (e) { /* ignore */ }
    return { lang: "fr", stars: {}, objects: {}, badges: {}, records: {}, unlocked: 1 };
  }
  /* Mode démo (?demo=1, avant ou après le #) : débloque les 8 missions SANS toucher au save réel.
     Détecté une fois puis mémorisé : la navigation par hash (#/w2/p3) ne le perd pas. */
  var demoActive = false;
  function demoMode() {
    if (!demoActive && typeof location !== "undefined" && /[?&]demo=1/.test((location.search || "") + (location.hash || ""))) {
      demoActive = true;
    }
    return demoActive;
  }
  function unlockedCount2() {
    return demoMode() ? 8 : (save2 ? save2.unlocked : 1);
  }
  function persistSave2() {
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem(SAVE_KEY_W2, JSON.stringify(save2));
    } catch (e) { /* ignore */ }
  }

  function starsBadge2(n) {
    var s = "";
    for (var i = 0; i < 3; i++) s += (i < n) ? "★" : "☆";
    return s;
  }

  /* ---------------------------------------------------------------
     Coquille partagée : on ne masque le Monde 1 que si l'on entre
     réellement dans le Monde 2, et on le restaure en sortant.
     --------------------------------------------------------------- */
  function applyShell(inW2) {
    if (!inW2 && !shellTouched) return;
    shellTouched = true;
    show("screen-map", !inW2);
    show("screen-mission", !inW2);
    show("w1-actions", !inW2);
    show("w1-brand", !inW2);
    show("w2-actions", inW2);
    show("w2-brand", inW2);
  }

  function showW2Screen(which) {
    if (which !== "mission") document.body.classList.remove("w2-scene-opening");
    var map = el("screen-w2-map"), mission = el("screen-w2-mission");
    if (map) {
      map.classList.toggle("visible", which === "map");
      map.classList.toggle("hidden", which !== "map");
    }
    if (mission) {
      mission.classList.toggle("visible", which === "mission");
      mission.classList.toggle("hidden", which !== "mission");
    }
    refreshDevToolbar();
  }

  /* ---------------------------------------------------------------
     Routage : #/w2 (carte) et #/w2/pN ou #/w2/w2pN (mission)
     --------------------------------------------------------------- */
  function isW2Hash() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    return /^w2(\/|$)/.test(h);
  }

  function route2() {
    if (!save2) return;    // un hashchange peut précéder DOMContentLoaded
    if (!isW2Hash()) {
      missionAbandonTrace();
      if (shellTouched) { stopRun2(); closeModal2(); applyShell(false); showW2Screen(null); }
      return;
    }
    stopRun2();
    closeModal2();
    applyShell(true);
    var h = (location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/");
    var stageId = null;
    if (parts.length >= 2 && parts[1]) {
      if (/^w2p[1-8]$/.test(parts[1])) stageId = parts[1];
      else if (/^p[1-8]$/.test(parts[1])) stageId = W2_ORDER[parseInt(parts[1].slice(1), 10) - 1];
    }
    if (stageId) {
      var n = W2_ORDER.indexOf(stageId) + 1;
      if (n > unlockedCount2()) stageId = null;
    }
    refreshLang2();
    if (cur && cur.stageId && (!stageId || stageId !== cur.stageId)) missionAbandonTrace();
    if (stageId) { showW2Screen("mission"); startMission2(stageId); }
    else { showW2Screen("map"); renderMap2(); }
  }

  function setLang2(l) {
    save2.lang = l;
    persistSave2();
    refreshLang2();
    route2();
  }
  function refreshLang2() {
    var fr = lang() === "fr";
    var a = el("w2-lang-fr"), b = el("w2-lang-en");
    if (a) a.classList.toggle("active", fr);
    if (b) b.classList.toggle("active", !fr);
    var back = el("w2-back-btn");
    if (back) back.textContent = tr("← Carte", "← Map");
  }

  /* ---------------------------------------------------------------
     Carte du Monde 2
     --------------------------------------------------------------- */
  function renderMap2() {
    var holder = el("w2-missions");
    if (!holder) return;
    holder.textContent = "";
    W2_ORDER.forEach(function (id, i) {
      var idx = i + 1;
      var st = W2_STAGES[id];
      var mc = missionContent(id);
      var name = mc ? mc.i18n[lang()].name : id;
      var locked = idx > unlockedCount2();
      var stars = save2.stars[id] || 0;
      var card = mk("button", "mission-card" + (locked ? " locked" : "") + (idx === unlockedCount2() && !demoMode() ? " next" : "") + (stars ? " done" : ""));
      card.type = "button";
      card.setAttribute("aria-label", (locked ? tr("Verrouillé. ", "Locked. ") : "") + name + ". " +
        tr("Étoiles : ", "Stars: ") + stars + " / 3.");
      if (!locked) card.addEventListener("click", function () { location.hash = "#/w2/" + id; });
      card.appendChild(mk("div", "mc-num", tr("Étape ", "Step ") + idx));
      card.appendChild(mk("div", "mc-role", ROLE_LABEL_W2[st.role] ? ROLE_LABEL_W2[st.role][lang()] : st.role));
      var nm = mk("div", "mc-name", (st.object.icon || "") + " " + name);
      if (mc && mc.competency) nm.setAttribute("title", mc.competency);
      card.appendChild(nm);
      card.appendChild(mk("div", "mc-stars", starsBadge2(stars)));
      if (locked) card.appendChild(mk("div", "mc-lock", "🔒"));
      holder.appendChild(card);
    });
    var title = el("w2-map-title");
    if (title) title.textContent = tr("Monde 2 — L'Atelier des états", "World 2 — The State Workshop");
    var sub = el("w2-map-sub");
    if (sub) {
      var done = W2_ORDER.filter(function (id) { return save2.stars[id]; }).length;
      sub.textContent = done + " / 8 " + tr("missions réussies", "missions completed");
    }
    var banner = el("w2-banner-text");
    if (banner) {
      banner.textContent = tr(
        "Lumo range chaque valeur dans une mémoire nommée. Assemble les lignes de l'atelier : chaque variable garde sa dernière valeur, et chaque outil montre l'état obtenu.",
        "Lumo stores every value in a named memory. Assemble the workshop lines: each variable keeps its latest value, and each tool shows the resulting state."
      );
    }
    var back1 = el("w2-to-w1");
    if (back1) back1.textContent = tr("← Retour au Monde 1", "← Back to World 1");
    showProgressNoticeOnce();
  }

  /* ---------------------------------------------------------------
     Mission : instructions, objectif, indices, gabarits, panneau d'états
     --------------------------------------------------------------- */
  var STATE_LABEL = {
    reaction_mode:      { fr: "la réaction observée (set_reaction)", en: "the observed reaction (set_reaction)" },
    engine_state:       { fr: "l'état livré (transition)", en: "the delivered state (transition)" },
    transition_target:  { fr: "la destination (transition)", en: "the destination (transition)" },
    feedback_text:      { fr: "le texte du retour (set_feedback)", en: "the feedback text (set_feedback)" },
    feedback_shape:     { fr: "la forme du retour (set_feedback)", en: "the feedback shape (set_feedback)" },
    inclusive_feedback: { fr: "un retour complet : texte ET forme non vides", en: "complete feedback: non-empty text AND shape" },
    feedback_clear:     { fr: "un retour lisible", en: "readable feedback" },
    say_text:           { fr: "le texte annoncé (say)", en: "the spoken text (say)" }
  };

  function objectiveLines2(mission) {
    var rules = victoryRules(mission.playable.victory_condition);
    var out = [];
    rules.forEach(function (rule) {
      if (rule.type === "state_equals") {
        var lbl = STATE_LABEL[rule.property];
        var name = lbl ? lbl[lang()] : rule.property;
        if (rule.property === "inclusive_feedback" && rule.value === true) {
          out.push(tr("Obtenir " + name + ".", "Get " + name + "."));
        } else {
          out.push(tr("Faire valoir " + name + " : " + pyRepr(rule.value) + ".",
                      "Make " + name + " equal " + pyRepr(rule.value) + "."));
        }
      } else if (rule.requires_variable_use) {
        out.push(tr("Déclarer au moins une variable et la réutiliser vraiment (pas de valeurs codées en dur).",
                    "Declare at least one variable and really reuse it (no hard-coded values)."));
      } else if (rule.type === "no_extra_command") {
        out.push(tr("Ne pas dépasser " + rule.max_commands + " commandes.",
                    "Use at most " + rule.max_commands + " commands."));
      }
    });
    return out;
  }

  function startMission2(stageId) {
    var st = W2_STAGES[stageId];
    var mc = missionContent(stageId);
    if (cur && cur.sceneFrame) cancelAnimationFrame(cur.sceneFrame);
    if (cur && cur.introTimer) clearTimeout(cur.introTimer);
    if (cur && cur.revealTimer) clearTimeout(cur.revealTimer);
    cur = {
      stageId: stageId, stage: st, mission: mc,
      lines: [], errorsThis: 0, hintsThis: 0, failedRuns: 0,
      prediction: "", timer: null, introTimer: null, revealTimer: null, lastResult: null,
      sceneReader: missionHasScene(mc) ? new SceneContract(mc.playable) : null,
      sceneSnapshot: null, sceneEvent: null, sceneEventAt: 0,
      sceneMessage: "", sceneExpression: "neutral", selectedLine: -1,
      sceneFrame: null, sceneWon: false, helpPlaying: false,
      startedAt: null, missionWonAt: null,
      gestureRecord: (save2 && save2.records && save2.records[stageId]) || 0
    };
    var L = lang();

    var name = el("w2-mission-name");
    if (name) name.textContent = (st.object.icon || "") + " " + (mc ? mc.i18n[L].name : stageId);
    var role = el("w2-mission-role");
    if (role) {
      role.textContent = tr("Étape ", "Step ") + (W2_ORDER.indexOf(stageId) + 1) + " · " +
        (ROLE_LABEL_W2[st.role] ? ROLE_LABEL_W2[st.role][L] : st.role) + " · " + st.object[L];
    }
    var screen = el("screen-w2-mission");
    document.body.classList.toggle("w2-scene-opening", missionHasScene(mc));
    if (screen) {
      screen.setAttribute("data-stage", stageId);
      screen.classList.toggle("scene-mode", missionHasScene(mc));
      screen.classList.toggle("scene-intro", missionHasScene(mc));
      screen.removeAttribute("data-scene-state");
    }

    var hook = el("w2-inst-hook");
    if (hook && mc) hook.textContent = mc.i18n[L].hook;
    var inst = el("w2-inst-instructions");
    if (inst && mc) inst.textContent = mc.i18n[L].instructions;

    /* Objectif dérivé du contrat de victoire */
    var goal = el("w2-inst-goal");
    if (goal && mc) {
      goal.textContent = "";
      goal.appendChild(mk("div", "block-title", tr("🎯 Objectif", "🎯 Goal")));
      objectiveLines2(mc).forEach(function (line) { goal.appendChild(mk("div", "goal-li", line)); });
    }

    /* Indices dévoilés un à un (chaque indice coûte une étoile) */
    var hints = el("w2-inst-hints");
    if (hints && mc) {
      hints.textContent = "";
      hints.appendChild(mk("div", "block-title", tr("💡 Indices (en cas de blocage)", "💡 Hints (if you're stuck)")));
      var tips = mc.i18n[L].hints || [];
      if (tips.length) {
        var reveal = mk("button", "btn ghost small", tr("Afficher un indice", "Show a hint"));
        reveal.type = "button";
        var shown = 0;
        reveal.addEventListener("click", function () {
          if (shown < tips.length) {
            cur.hintsThis++;
            hints.appendChild(mk("div", "hint-li", "→ " + tips[shown]));
            shown++;
            if (shown >= tips.length) reveal.remove();
          }
        });
        hints.appendChild(reveal);
      } else {
        hints.appendChild(mk("div", "muted", tr("Pas d'indice pour cette étape.", "No hints for this step.")));
      }
    }

    missionStartTrace(stageId);
    buildTemplates(st, mc);
    buildPrediction(st, mc);
    renderLines();
    bindRunButtons();
    renderStatePanel({ states: {}, vars: {}, markers: [], events: [] });
    setRunState("", "");
    if (missionHasScene(mc)) startSceneOpening();
  }

  /* ---------------------------------------------------------------
     Gabarits de lignes : affectation, propriété, objet, primitives
     --------------------------------------------------------------- */
  function chipRow(values, apply) {
    var row = mk("div", "w2-chips");
    values.forEach(function (v) {
      var chip = mk("button", "w2-chip", v);
      chip.type = "button";
      chip.setAttribute("aria-label", tr("Insérer ", "Insert ") + v);
      chip.addEventListener("click", function () { apply(v); });
      row.appendChild(chip);
    });
    return row;
  }

  function field(placeholder, value, width) {
    var f = mk("input", "w2-field");
    f.type = "text";
    f.setAttribute("placeholder", placeholder);
    f.setAttribute("aria-label", placeholder);
    if (value !== undefined) f.value = value;
    if (width) f.style.width = width;
    return f;
  }

  function templateRow(titleText) {
    var box = mk("div", "w2-tpl");
    box.appendChild(mk("div", "w2-tpl-title", titleText));
    var line = mk("div", "w2-tpl-line");
    box.appendChild(line);
    return { box: box, line: line };
  }

  function buildTemplates(st, mc) {
    if (missionHasScene(mc)) { buildSceneTemplates(mc); return; }
    var host = el("w2-panel-templates");
    if (!host) return;
    host.textContent = "";
    host.appendChild(mk("div", "block-title", tr("🧩 Gabarits de lignes", "🧩 Line templates")));

    var names = st.names.length ? st.names : [];
    var values = st.values || [];

    /* -- 1. affectation de variable : nom = valeur -- */
    var a = templateRow(tr("Affectation — une variable garde sa dernière valeur",
                           "Assignment — a variable keeps its latest value"));
    var aName = field(tr("nom", "name"), names[0] || "", "9em");
    var aVal = field(tr("valeur", "value"), "", "13em");
    a.line.appendChild(aName);
    a.line.appendChild(mk("span", "w2-op", "="));
    a.line.appendChild(aVal);
    a.line.appendChild(addButton(function () {
      pushLine(aName.value.trim() + " = " + aVal.value.trim(), [aVal]);
    }));
    if (names.length) a.box.appendChild(chipRow(names, function (v) { aName.value = v; }));
    if (values.length) a.box.appendChild(chipRow(values, function (v) { aVal.value = v; }));
    host.appendChild(a.box);

    /* -- 2. affectation de propriété : objet["clé"] = valeur -- */
    var objs = st.objects || [];
    var p = templateRow(tr("Propriété d'objet — modifier un casier de la fiche",
                           "Object property — update one compartment of the card"));
    var pName = field(tr("objet", "object"), objs.length ? objs[0].name : (names[0] || ""), "7em");
    var pKey = field(tr("clé", "key"), objs.length && objs[0].keys.length ? objs[0].keys[0] : "", "8em");
    var pVal = field(tr("valeur", "value"), "", "11em");
    p.line.appendChild(pName);
    p.line.appendChild(mk("span", "w2-op", "[\""));
    p.line.appendChild(pKey);
    p.line.appendChild(mk("span", "w2-op", "\"] ="));
    p.line.appendChild(pVal);
    p.line.appendChild(addButton(function () {
      pushLine(pName.value.trim() + "[\"" + pKey.value.trim() + "\"] = " + pVal.value.trim(), [pVal]);
    }));
    var keyChips = [];
    objs.forEach(function (o) { o.keys.forEach(function (k) { if (keyChips.indexOf(k) < 0) keyChips.push(k); }); });
    if (keyChips.length) p.box.appendChild(chipRow(keyChips, function (v) { pKey.value = v; }));
    if (values.length) p.box.appendChild(chipRow(values, function (v) { pVal.value = v; }));
    host.appendChild(p.box);

    /* -- 3. littéral objet : nom = { "clé": valeur, ... } -- */
    var o1 = templateRow(tr("Objet littéral — créer une fiche complète",
                            "Object literal — create a complete card"));
    var oName = field(tr("objet", "object"), objs.length ? objs[0].name : "lumo", "7em");
    var oBody = field("\"clé\": valeur, \"clé\": valeur",
      objs.length ? objs[0].keys.map(function (k) { return "\"" + k + "\": "; }).join(", ") : "", "20em");
    o1.line.appendChild(oName);
    o1.line.appendChild(mk("span", "w2-op", "= {"));
    o1.line.appendChild(oBody);
    o1.line.appendChild(mk("span", "w2-op", "}"));
    o1.line.appendChild(addButton(function () {
      pushLine(oName.value.trim() + " = {" + oBody.value.trim() + "}", [oBody]);
    }));
    var dictChips = values.filter(function (v) { return v.charAt(0) === "{"; });
    if (dictChips.length) {
      o1.box.appendChild(chipRow(dictChips, function (v) {
        oBody.value = v.replace(/^\{/, "").replace(/\}$/, "").trim();
      }));
    }
    host.appendChild(o1.box);

    /* -- 4. primitives déclarées par le contrat de la mission -- */
    var prims = (mc && mc.playable && mc.playable.primitives) || [];
    var pr = templateRow(tr("Outils de l'atelier — appels de primitives",
                            "Workshop tools — primitive calls"));
    var focused = null;      // dernier champ d'argument touché : cible des pastilles
    prims.forEach(function (sig) {
      var pname = primitiveName(sig);
      var argNames = sig.replace(/^[^(]*\(/, "").replace(/\)\s*$/, "").split(",")
        .map(function (s) { return s.trim(); }).filter(function (s) { return s !== ""; });
      var wrap = mk("div", "w2-prim");
      wrap.appendChild(mk("span", "w2-prim-name", pname + "("));
      var fields = [];
      argNames.forEach(function (an, i) {
        if (i > 0) wrap.appendChild(mk("span", "w2-op", ","));
        var f = field(an, "", "10em");
        fields.push(f);
        wrap.appendChild(f);
      });
      wrap.appendChild(mk("span", "w2-prim-name", ")"));
      wrap.appendChild(addButton(function () {
        pushLine(pname + "(" + fields.map(function (f) { return f.value.trim(); }).join(", ") + ")", fields);
      }));
      pr.line.appendChild(wrap);
      if (!focused && fields.length) focused = fields[0];
      fields.forEach(function (f) {
        f.addEventListener("focus", function () { focused = f; });
      });
    });
    if (values.length && focused) {
      pr.box.appendChild(chipRow(values, function (v) {
        if (focused) { focused.value = v; focused.focus(); }
      }));
    }
    host.appendChild(pr.box);
  }

  function buildSceneTemplates(mc) {
    var host = el("w2-panel-templates");
    if (!host) return;
    host.textContent = "";
    host.appendChild(mk("div", "block-title", tr("Tes gestes dans l'atelier", "Your workshop actions")));
    var row = mk("div", "scene-templates");
    var reader = cur.sceneReader;
    var assignment = Object.keys(reader.assignmentNames)[0];
    var call = Object.keys(reader.callNames)[0];
    var crystals = (reader.byKind.crystal || []).slice().sort(function (a, b) { return a.value - b.value; });

    var loadTool = mk("div", "scene-tool");
    loadTool.appendChild(mk("div", "scene-tool-title", tr("Choisis un cristal", "Choose a crystal")));
    var crystalRow = mk("div", "scene-crystals");
    crystals.forEach(function (prop) {
      var b = mk("button", "scene-crystal", String(prop.value));
      b.type = "button";
      b.draggable = true;
      b.setAttribute("aria-label", tr("Charger le cristal ", "Load crystal ") + prop.value);
      b.addEventListener("dragstart", function (e) { if (e.dataTransfer) e.dataTransfer.setData("text/plain", String(prop.value)); });
      b.addEventListener("click", function () {
        var line = assignment + " = " + pyRepr(prop.value);
        pushLine(line, []);
        previewSceneLine(line);
      });
      crystalRow.appendChild(b);
    });
    loadTool.appendChild(crystalRow);
    row.appendChild(loadTool);

    var presentTool = mk("div", "scene-tool");
    presentTool.appendChild(mk("div", "scene-tool-title", tr("Présente la lanterne", "Present the lantern")));
    var present = mk("button", "scene-present", tr("Présenter à l'empreinte", "Present to the imprint"));
    present.type = "button";
    present.addEventListener("click", function () {
      var signature = reader.callNames[call] || call + "()";
      var line = signature.replace(/<[^>]+>/g, assignment);
      pushLine(line, []);
      previewSceneLine(line);
    });
    presentTool.appendChild(present);
    row.appendChild(presentTool);
    host.appendChild(row);
  }

  function addButton(fn) {
    var b = mk("button", "btn small primary", tr("+ Ajouter", "+ Add"));
    b.type = "button";
    b.addEventListener("click", fn);
    return b;
  }

  function pushLine(text, clearFields) {
    if (running2) return;
    var code = String(text).trim();
    if (!code || /(^=)|(=\s*$)|\(\s*,|,\s*\)/.test(code)) {
      toast2(tr("Remplis tous les champs du gabarit avant d'ajouter la ligne.",
                "Fill in every template field before adding the line."), "err");
      return;
    }
    try {
      var stmt = parseLine(code);
      if (stmt.kind === "blank") throw new ParseError("ligne_vide");
    } catch (e) {
      toast2(tr("Cette ligne n'est pas lisible par l'atelier : ", "The workshop cannot read this line: ") + e.message, "err");
      return;
    }
    cur.lines.push(code);
    (clearFields || []).forEach(function (f) { f.value = ""; });
    var predictPanel = el("w2-panel-predict");
    if (predictPanel && missionHasScene(cur.mission)) predictPanel.classList.remove("awaiting-program");
    lineAddedTrace(cur.stageId);
    renderLines();
    setRunState("", "");
  }

  function renderLines(activeIdx, errorIdx) {
    var host = el("w2-cmd-list");
    if (!host) return;
    var countEl = el("w2-cmd-count");
    if (countEl && !el("w2-gestures")) {
      var gs = mk("span", "w2-gestures hidden", "");
      gs.id = "w2-gestures";
      countEl.parentNode.insertBefore(gs, countEl.nextSibling);
    }
    host.textContent = "";
    if (!cur.lines.length) {
      host.appendChild(mk("div", "empty-cmd",
        tr("Aucune ligne pour l'instant. Utilise les gabarits ci-dessus.",
           "No lines yet. Use the templates above.")));
    }
    cur.lines.forEach(function (code, i) {
      var item = mk("div", "cmd-item w2-line" +
        (i === activeIdx ? " current" : "") + (i === errorIdx ? " err" : "") +
        (cur.selectedLine === i ? " selected" : ""));
      item.appendChild(mk("span", "w2-line-num", String(i + 1)));
      var codeSpan = mk("button", "cmd-code", code);
      codeSpan.type = "button";
      codeSpan.style.border = "0";
      codeSpan.style.background = "transparent";
      codeSpan.style.textAlign = "left";
      codeSpan.style.cursor = "pointer";
      codeSpan.setAttribute("aria-label", tr("Sélectionner la ligne ", "Select line ") + (i + 1));
      codeSpan.addEventListener("click", function () { cur.selectedLine = i; renderLines(); });
      item.appendChild(codeSpan);
      if (!running2) {
        item.appendChild(miniBtn("↑", tr("Monter la ligne", "Move line up"), function () {
          if (i > 0) { var t = cur.lines[i - 1]; cur.lines[i - 1] = cur.lines[i]; cur.lines[i] = t; renderLines(); }
        }));
        item.appendChild(miniBtn("↓", tr("Descendre la ligne", "Move line down"), function () {
          if (i < cur.lines.length - 1) { var t = cur.lines[i + 1]; cur.lines[i + 1] = cur.lines[i]; cur.lines[i] = t; renderLines(); }
        }));
        item.appendChild(miniBtn("✖", tr("Supprimer la ligne", "Delete line"), function () {
          cur.lines.splice(i, 1); renderLines();
        }));
      }
      host.appendChild(item);
    });
    var count = el("w2-cmd-count");
    if (count) count.textContent = cur.lines.length + " " + tr("ligne(s)", "line(s)");
    updateGestures();
  }

  function miniBtn(label, aria, fn) {
    var b = mk("button", "mini", label);
    b.type = "button";
    b.setAttribute("aria-label", aria);
    b.addEventListener("click", fn);
    return b;
  }

  /* ---------------------------------------------------------------
     Prédiction (P1 / P8)
     --------------------------------------------------------------- */
  function buildPrediction(st, mc) {
    var host = el("w2-panel-predict");
    if (!host) return;
    host.textContent = "";
    host.classList.remove("awaiting-program");
    var contract = mc && mc.playable && mc.playable.prediction;
    if (!contract && !st.prediction) { host.classList.add("hidden"); return; }
    host.classList.remove("hidden");

    if (contract && missionHasScene(mc)) {
      host.classList.add("awaiting-program");
      var row = mk("div", "scene-prediction");
      var copy = mk("div", "predict-copy");
      copy.appendChild(mk("strong", "", tr("Le pari de Lumo", "Lumo's bet")));
      copy.appendChild(mk("span", "", contract.prompt[lang()]));
      row.appendChild(copy);
      var choices = mk("div", "scene-crystals");
      var slot = mk("div", "scene-predict-slot", tr("glisse ici", "drop here"));
      cur.predictChoices = [];
      function choose(value) {
        if (running2) return;
        cur.prediction = pyRepr(value);
        traceEvent("prediction_made", {
          stage: cur.stageId, choice: value === null ? "pass" : value, pass: value === null
        });
        slot.textContent = value === null ? tr("rien", "nothing") : String(value);
        slot.classList.add("chosen");
        cur.predictStatus.textContent = tr("Pari posé. Lance ton programme !", "Bet placed. Run your program!");
        cur.predictStatus.className = "w2-predict-status ok";
      }
      (contract.options || []).forEach(function (value) {
        if (value === null) return;
        var b = mk("button", "scene-crystal", String(value));
        b.type = "button";
        b.draggable = true;
        b.setAttribute("aria-label", tr("Parier sur le cristal ", "Bet on crystal ") + value);
        b.addEventListener("dragstart", function (e) { if (e.dataTransfer) e.dataTransfer.setData("text/plain", pyRepr(value)); });
        b.addEventListener("click", function () { choose(value); });
        choices.appendChild(b);
        cur.predictChoices.push(b);
      });
      if ((contract.options || []).some(function (v) { return v === null; })) {
        var none = mk("button", "scene-none", tr("Rien", "Nothing"));
        none.type = "button";
        none.addEventListener("click", function () { choose(null); });
        choices.appendChild(none);
        cur.predictChoices.push(none);
      }
      slot.addEventListener("dragover", function (e) { e.preventDefault(); });
      slot.addEventListener("drop", function (e) {
        e.preventDefault();
        var raw = e.dataTransfer ? e.dataTransfer.getData("text/plain") : "";
        var parsed = parsePrediction(raw);
        if (parsed.ok) choose(parsed.value);
      });
      row.appendChild(choices);
      row.appendChild(slot);
      var status = mk("span", "w2-predict-status", "");
      row.appendChild(status);
      host.appendChild(row);
      cur.predictSlot = slot;
      cur.predictStatus = status;
      cur.predictField = {
        get value() { return cur.prediction; },
        disabled: false
      };
      return;
    }

    host.appendChild(mk("div", "block-title", tr("🔮 Ta prédiction (avant d'exécuter)", "🔮 Your prediction (before running)")));
    host.appendChild(mk("div", "muted", st.prediction.label[lang()]));
    var oldRow = mk("div", "w2-tpl-line");
    var f = field(st.prediction.placeholder, "", "12em");
    f.addEventListener("input", function () { cur.prediction = f.value; });
    oldRow.appendChild(f);
    var oldStatus = mk("span", "w2-predict-status", "");
    oldRow.appendChild(oldStatus);
    host.appendChild(oldRow);
    cur.predictField = f;
    cur.predictStatus = oldStatus;
  }

  /* ---------------------------------------------------------------
     Exécution pas à pas
     --------------------------------------------------------------- */
  function bindRunButtons() {
    var run = el("w2-run-btn"), stop = el("w2-stop-btn"), clear = el("w2-clear-btn");
    if (run) { run.onclick = startRun2; run.textContent = tr("⤓ Exécuter", "⤓ Run"); }
    if (stop) { stop.onclick = stopRun2; stop.textContent = tr("⏹ Arrêter", "⏹ Stop"); }
    if (clear) {
      clear.onclick = function () {
        if (running2) return;
        cur.lines = [];
        cur.selectedLine = -1;
        cur.sceneWon = false;
        cur.sceneEvent = null;
        cur.sceneMessage = "";
        var predictPanel = el("w2-panel-predict");
        if (predictPanel && missionHasScene(cur.mission)) predictPanel.classList.add("awaiting-program");
        renderLines();
        renderStatePanel({ states: cur.sceneReader ? cur.sceneReader.initialStates() : {}, vars: {}, markers: [], events: [] });
        updateSceneCaption(false);
        setRunState("", "");
      };
      clear.textContent = tr("✖ Vider", "✖ Clear");
    }
  }

  function setRunState(text, cls) {
    var n = el("w2-run-state");
    if (!n) return;
    n.textContent = text;
    n.className = "run-state" + (cls ? " " + cls : "");
  }

  function errorMessage(code) {
    if (code.indexOf("syntax_error:") === 0) {
      return tr("Ligne illisible par l'atelier (" + code.split(":")[1] + ").",
                "The workshop cannot read this line (" + code.split(":")[1] + ").");
    }
    if (code.indexOf("execution_error:NameError") === 0) {
      var nm = (code.match(/name '([^']+)'/) || [])[1] || "?";
      return tr("« " + nm + " » n'existe pas encore : donne-lui une valeur avant de l'utiliser.",
                "\"" + nm + "\" does not exist yet: give it a value before using it.");
    }
    if (code.indexOf("execution_error:KeyError") === 0) {
      return tr("Cette fiche n'a pas cette propriété.", "This card has no such property.");
    }
    if (code.indexOf("execution_error:TypeError") === 0) {
      return tr("Le nombre d'arguments ou le type ne convient pas à cet outil.",
                "Wrong argument count or type for this tool.");
    }
    if (code.indexOf("execution_error:IndexError") === 0) {
      return tr("Cette position n'existe pas dans la liste.", "That position does not exist in the list.");
    }
    if (code.indexOf("grid_out_of_range:") === 0) {
      return tr("Repère hors de la table : la colonne et la ligne vont de 1 à " + GRID_SIZE + ".",
                "Marker outside the table: column and row run from 1 to " + GRID_SIZE + ".");
    }
    if (code.indexOf("undeclared_primitive:") === 0) {
      return tr("L'outil « " + code.split(":")[1] + " » n'existe pas dans cette mission.",
                "The tool \"" + code.split(":")[1] + "\" does not exist in this mission.");
    }
    return code;
  }

  function startRun2() {
    if (running2 || !cur) return;
    if (!cur.lines.length) {
      toast2(tr("Ajoute d'abord des lignes à ton programme.", "Add some lines to your program first."), "err");
      return;
    }
    if (cur.stage.prediction && cur.predictField && !String(cur.predictField.value).trim()) {
      if (missionHasScene(cur.mission)) {
        cur.sceneMessage = tr("Pose d'abord ton pari sur la fente.", "Place your bet on the slot first.");
        cur.sceneExpression = "curious";
        updateSceneCaption(true);
      } else {
        toast2(tr("Écris ta prédiction avant d'exécuter (elle vaut la 3e étoile).",
                  "Write your prediction before running (it is worth the third star)."), "err");
      }
      return;
    }
    /* Figer la prédiction avant la première ligne : l'enfant ne peut pas la
       corriger pendant l'animation après avoir vu les états intermédiaires. */
    var predictionAtStart = cur.predictField ? cur.predictField.value : undefined;
    if (cur.predictField) cur.predictField.disabled = true;
    (cur.predictChoices || []).forEach(function (b) { b.disabled = true; });
    var result = testW2Stage(cur.stageId, cur.lines, {
      prediction: predictionAtStart,
      hints: cur.hintsThis
    });
    cur.lastResult = result;
    if (missionHasScene(cur.mission)) {
      cur.sceneWon = false;
      cur.sceneMessage = "";
      cur.sceneExpression = "curious";
      renderStatePanel({ states: cur.sceneReader.initialStates(), vars: {}, markers: [], events: [] });
      var resultBox = el("w2-scene-result");
      if (resultBox) resultBox.classList.remove("show");
    }
    running2 = true;
    show("w2-run-btn", false);
    show("w2-stop-btn", true);
    renderLines(-1, -1);
    setRunState(tr("Exécution…", "Running…"), "");

    runStartTrace(cur.stageId, (cur.lines || []).length);
    var i = 0;
    var trace = result.trace;
    function stepOnce() {
      if (!running2) return;
      if (i >= trace.length) { finishRun(result); return; }
      var snap = trace[i];
      renderLines(i, snap.error ? i : -1);
      renderStatePanel(snap);
      if (snap.error) {
        setRunState(tr("Ligne ", "Line ") + (i + 1) + " — " + errorMessage(snap.error), "err");
      }
      i++;
      cur.timer = setTimeout(stepOnce, STEP_MS_W2);
    }
    cur.timer = setTimeout(stepOnce, 60);
  }

  function stopRun2() {
    if (cur && cur.timer) { clearTimeout(cur.timer); cur.timer = null; }
    if (!running2) return;
    running2 = false;
    if (cur && cur.predictField) cur.predictField.disabled = false;
    (cur && cur.predictChoices || []).forEach(function (b) { b.disabled = false; });
    show("w2-run-btn", true);
    show("w2-stop-btn", false);
    traceEvent("run_stopped", { stage: cur.stageId, run: runCounter });
    renderLines();
    setRunState(tr("Exécution interrompue.", "Run stopped."), "");
  }

  function finishRun(result) {
    running2 = false;
    if (cur && cur.predictField) cur.predictField.disabled = false;
    (cur && cur.predictChoices || []).forEach(function (b) { b.disabled = false; });
    show("w2-run-btn", true);
    show("w2-stop-btn", false);
    var errIdx = result.errorIdx;
    renderLines(-1, errIdx);
    renderStatePanel({ states: result.states, vars: result.vars, markers: result.markers });

    /* Prédiction : verdict affiché après l'exécution seulement. */
    if (cur.stage.prediction && cur.predictStatus) {
      var pr = result.prediction;
      if (missionHasScene(cur.mission)) {
        if (pr.correct) {
          cur.predictStatus.textContent = cur.mission.playable.prediction.reward.success_message[lang()];
          cur.predictStatus.className = "w2-predict-status ok";
        } else {
          cur.predictStatus.textContent = tr("Bien tenté — regarde le cristal resté dans la fente.",
                                             "Good try — look at the crystal left in the slot.");
          cur.predictStatus.className = "w2-predict-status warn";
        }
      } else if (!pr.provided) {
        cur.predictStatus.textContent = tr("prédiction absente → 2 étoiles maximum",
                                           "no prediction → 2 stars maximum");
        cur.predictStatus.className = "w2-predict-status warn";
      } else if (pr.correct) {
        cur.predictStatus.textContent = tr("prédiction juste ✔ (" + pyRepr(pr.actual) + ")",
                                           "prediction correct ✔ (" + pyRepr(pr.actual) + ")");
        cur.predictStatus.className = "w2-predict-status ok";
      } else {
        cur.predictStatus.textContent = tr("prédiction " + pyRepr(pr.value) + " ≠ état final " + pyRepr(pr.actual) + " → 2 étoiles maximum",
                                           "prediction " + pyRepr(pr.value) + " ≠ final state " + pyRepr(pr.actual) + " → 2 stars maximum");
        cur.predictStatus.className = "w2-predict-status warn";
      }
    }

    /* R2 — événements du monde du run (les 5 types du contrat ; les refus
       littéraux gardent leur message de monde dédié, sans événement). */
    if (missionHasScene(cur.mission)) {
      var W_EVENTS = { crystal_inserted: 1, previous_crystal_ejected: 1, door_opens: 1,
                       door_already_open: 1, empty_slot_puff: 1 };
      (result.events || []).forEach(function (ev) {
        if (W_EVENTS[ev.type]) {
          traceEvent("world_event", {
            stage: cur.stageId, run: runCounter,
            type: ev.type, door: ev.doorId || null, value: ev.value !== undefined ? ev.value : null
          });
        }
      });
    }
    if (!result.won) runFailedTrace(cur.stageId, result.hardErrors > 0 ? "error" : "world");
    if (result.hardErrors > 0) {
      cur.errorsThis += 1;
      var first = null;
      for (var i = 0; i < result.errorDetails.length; i++) {
        if (result.errorDetails[i].code.indexOf("victory_failed:") !== 0) { first = result.errorDetails[i]; break; }
      }
      setRunState((first && first.index >= 0 ? tr("Ligne ", "Line ") + (first.index + 1) + " — " : "") +
        (first ? errorMessage(first.code) : tr("Erreur", "Error")), "err");
      return;
    }
    if (!result.won) {
      cur.errorsThis += 1;
      if (missionHasScene(cur.mission)) {
        cur.failedRuns += 1;
        showSceneFailure(result);
        if (cur.failedRuns >= ((cur.mission.playable.help || {}).after_failed_runs || 2)) showSceneHelp();
        setRunState(tr("Regarde ce qui est resté dans l'atelier.", "Look at what remained in the workshop."), "");
      } else {
        setRunState(failureMessage(result), "err");
      }
      return;
    }
    setRunState(tr("Réussi !", "Success!"), "ok");
    recordWin(result);
  }

  function failureMessage(result) {
    var failed = result.victoryChecks.filter(function (c) { return !c.passed; });
    if (!failed.length) return tr("Ce n'est pas encore l'état attendu.", "Not the expected state yet.");
    var c = failed[0];
    if (c.property === "requires_variable_use") {
      return tr("Il manque une variable déclarée puis réellement réutilisée.",
                "A declared and actually reused variable is missing.");
    }
    var lbl = STATE_LABEL[c.property];
    var name = lbl ? lbl[lang()] : c.property;
    return tr("Attendu pour " + name + " : " + pyRepr(c.expected) + " — obtenu : " + pyRepr(c.actual) + ".",
              "Expected for " + name + ": " + pyRepr(c.expected) + " — got: " + pyRepr(c.actual) + ".");
  }

  function recordWin(result) {
    var contractStars = computeContractStars(cur.mission, cur.lines, result, result.prediction);
    var stars = contractStars === null ? computeW2Stars({
      won: true,
      errors: cur.errorsThis,
      hints: cur.hintsThis,
      predictionRequired: result.prediction.required,
      predictionCorrect: result.prediction.correct
    }) : contractStars;
    var prev = save2.stars[cur.stageId] || 0;
    if (stars > prev) save2.stars[cur.stageId] = stars;
    var n = W2_ORDER.indexOf(cur.stageId) + 1;
    if (n + 1 > save2.unlocked && n < 8) save2.unlocked = n + 1;
    if (n === 8 && save2.unlocked < 8) save2.unlocked = 8;
    if (missionHasScene(cur.mission)) {
      var lantern = (cur.sceneReader.byKind.lantern_slot || [])[0];
      if (lantern) save2.objects[lantern.id] = true;
    }
    /* R2/R15 — victoire tracée (étoiles + élégance), badge collection (A3),
       record de gestes (A6, visible avant validation la fois suivante). */
    if (result.badge && result.badge.label) {
      if (!save2.badges) save2.badges = {};
      save2.badges[cur.stageId] = { label: clone(result.badge.label), at: new Date().toISOString() };
    }
    var finalGestures = (cur.lines || []).length;
    if (!save2.records) save2.records = {};
    if (!save2.records[cur.stageId] || finalGestures < save2.records[cur.stageId]) {
      save2.records[cur.stageId] = finalGestures;
    }
    cur.gestureRecord = save2.records[cur.stageId];
    missionWonTrace(cur.stageId, stars, !!(result.elegance), finalGestures);
    persistSave2();
    if (missionHasScene(cur.mission)) celebrateScene(save2.stars[cur.stageId], result);
    else showWin2(save2.stars[cur.stageId], result);
  }

  /* ---------------------------------------------------------------
     Panneaux d'atelier
     --------------------------------------------------------------- */
  function kv(host, label, value, cls) {
    var row = mk("div", "w2-kv" + (cls ? " " + cls : ""));
    row.appendChild(mk("span", "w2-kv-k", label));
    row.appendChild(mk("span", "w2-kv-v", value));
    host.appendChild(row);
    return row;
  }

  function renderStatePanel(snap) {
    var host = el("w2-panel-state");
    if (!host || !cur) return;
    var st = cur.stage, S = snap.states || {}, V = snap.vars || {};
    if (missionHasScene(cur.mission)) {
      renderContractScene(host, snap);
      return;
    }
    host.textContent = "";
    host.appendChild(mk("div", "block-title", (st.object.icon || "") + " " + st.object[lang()]));

    if (st.panel === "dial") renderDial(host, S);
    else if (st.panel === "drawers") renderDrawers(host, st, S, V);
    else if (st.panel === "press") renderPress(host, S);
    else if (st.panel === "waterwheel") renderWaterwheel(host, S, V);
    else if (st.panel === "sign") renderSign(host, S, V);
    else if (st.panel === "lumo") renderLumo(host, st, S, V);
    else if (st.panel === "grid") renderGrid(host, S, snap.markers || []);
    else if (st.panel === "chamber") { renderLumo(host, st, S, V); renderGrid(host, S, snap.markers || []); }

    /* Mémoire nommée : toujours visible, c'est le sujet du monde. */
    var names = Object.keys(V);
    var mem = mk("div", "w2-memory");
    mem.appendChild(mk("div", "w2-sub", tr("Mémoire nommée", "Named memory")));
    if (!names.length) mem.appendChild(mk("div", "muted", tr("aucune variable pour l'instant", "no variable yet")));
    names.forEach(function (nm) {
      kv(mem, nm, pyRepr(V[nm]) + "  ·  " + pyType(V[nm]), "mono");
    });
    host.appendChild(mem);

    var obs = mk("div", "w2-memory");
    obs.appendChild(mk("div", "w2-sub", tr("États observables", "Observable states")));
    kv(obs, "reaction_mode", pyRepr(S.reaction_mode), "mono");
    kv(obs, "engine_state", pyRepr(S.engine_state), "mono");
    if (S.feedback_text !== undefined || S.feedback_shape !== undefined) {
      kv(obs, "feedback_text", pyRepr(S.feedback_text), "mono");
      kv(obs, "feedback_shape", pyRepr(S.feedback_shape), "mono");
      kv(obs, "inclusive_feedback", pyRepr(!!S.inclusive_feedback), "mono");
    }
    host.appendChild(obs);
  }

  /* =====================================================================
     SCÈNE CANVAS GÉNÉRIQUE — le dessin parcourt actors/props/renders du
     contrat. Les positions sont distribuées par kind, jamais par id de P1.
     ===================================================================== */
  function renderContractScene(host, snap) {
    installSceneStyles();
    var shell = el("w2-scene-shell");
    if (!shell) {
      host.textContent = "";
      shell = mk("div", "w2-scene-shell");
      shell.id = "w2-scene-shell";
      var canvas = mk("canvas", "w2-scene-canvas");
      canvas.id = "w2-scene-canvas";
      canvas.width = 960; canvas.height = 540;
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", tr(
        "Atelier de Lumo : trois portes de laiton, une lanterne à une fente et trois cristaux.",
        "Lumo's workshop: three brass doors, a one-slot lantern and three crystals."));
      shell.appendChild(canvas);
      var actions = mk("div", "w2-scene-actions");
      actions.id = "w2-scene-actions";
      shell.appendChild(actions);
      var caption = mk("div", "w2-scene-caption", "");
      caption.id = "w2-scene-caption";
      caption.setAttribute("aria-live", "polite");
      shell.appendChild(caption);
      var result = mk("div", "w2-scene-result");
      result.id = "w2-scene-result";
      shell.appendChild(result);
      host.appendChild(shell);
      cur.sceneCanvas = canvas;
      cur.sceneCaption = caption;
      cur.sceneStartedAt = performance.now();
      var screen = el("screen-w2-mission");
      if (screen) screen.setAttribute("data-scene-state", "ready");
      startSceneLoop();
    }
    cur.sceneSnapshot = {
      states: clone(snap.states || cur.sceneReader.initialStates()),
      vars: clone(snap.vars || {}), events: clone(snap.events || [])
    };
    if (snap.events && snap.events.length) {
      var expressions = {
        crystal_inserted: "curious", previous_crystal_ejected: "surprise",
        door_opens: "joy", door_already_open: "encouragement", empty_slot_puff: "ouch"
      };
      cur.sceneEvent = snap.events[0];
      cur.sceneEventAt = performance.now();
      cur.sceneExpression = expressions[cur.sceneEvent.type] || "neutral";
      if (snap.events.length > 1) {
        (function (laterEvent, sceneOwner) {
          setTimeout(function () {
            if (cur !== sceneOwner) return;
            cur.sceneEvent = laterEvent; cur.sceneEventAt = performance.now();
            cur.sceneExpression = expressions[laterEvent.type] || "neutral";
          }, 220);
        })(snap.events[snap.events.length - 1], cur);
      }
    }
    if (cur.sceneCaption) updateSceneCaption(!!cur.sceneMessage);
  }

  function startSceneLoop() {
    function frame(now) {
      if (!cur || !cur.sceneCanvas || !missionHasScene(cur.mission)) return;
      drawContractScene(cur.sceneCanvas.getContext("2d"), now);
      cur.sceneFrame = requestAnimationFrame(frame);
    }
    cur.sceneFrame = requestAnimationFrame(frame);
  }

  function roundRect(ctx, x, y, w, h, r) {
    var rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y); ctx.lineTo(x + w - rr, y); ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
    ctx.lineTo(x + w, y + h - rr); ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    ctx.lineTo(x + rr, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
    ctx.lineTo(x, y + rr); ctx.quadraticCurveTo(x, y, x + rr, y); ctx.closePath();
  }

  function drawCrystal(ctx, x, y, value, scale, alpha) {
    ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale); ctx.globalAlpha = alpha;
    ctx.shadowColor = "rgba(79,208,224,.65)"; ctx.shadowBlur = 18;
    var g = ctx.createLinearGradient(-18, -24, 18, 24);
    g.addColorStop(0, "#d7fdff"); g.addColorStop(.45, "#4fd0e0"); g.addColorStop(1, "#12626e");
    ctx.fillStyle = g; ctx.strokeStyle = "#9af2f7"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, -25); ctx.lineTo(20, -8); ctx.lineTo(14, 24); ctx.lineTo(-14, 24); ctx.lineTo(-20, -8); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0; ctx.fillStyle = "#102f34"; ctx.font = "800 20px Trebuchet MS"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(value), 0, 2);
    ctx.restore();
  }

  function drawDoor(ctx, prop, index, S, now) {
    var x = 145 + index * 215, y = 112, w = 128, h = 224;
    var rendered = cur.sceneReader.appearanceFor(prop.id + "_open", S[prop.id + "_open"]);
    var open = rendered ? rendered.appearance === "door_open" : !!S[prop.id + "_open"];
    var event = cur.sceneEvent || {}, age = now - (cur.sceneEventAt || 0);
    var active = event.doorId === prop.id && age < 900;
    var pulse = active ? 1 + Math.sin(Math.min(age, 700) / 700 * Math.PI) * .055 : 1;
    ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.scale(pulse, pulse); ctx.translate(-w / 2, -h / 2);
    if (open) {
      var light = ctx.createRadialGradient(w / 2, h * .6, 5, w / 2, h * .6, 170);
      light.addColorStop(0, "rgba(255,224,140,.9)"); light.addColorStop(1, "rgba(245,184,61,0)");
      ctx.fillStyle = light; ctx.fillRect(-70, -50, w + 140, h + 160);
      ctx.fillStyle = "#f4cf73"; roundRect(ctx, 15, 8, w - 30, h - 16, 14); ctx.fill();
    }
    ctx.shadowColor = "rgba(0,0,0,.6)"; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8;
    var brass = ctx.createLinearGradient(0, 0, w, h);
    brass.addColorStop(0, open ? "#8d6722" : "#d89b2a"); brass.addColorStop(.45, open ? "#5d441d" : "#f5b83d"); brass.addColorStop(1, "#73501c");
    ctx.fillStyle = brass; ctx.strokeStyle = "#f3d27f"; ctx.lineWidth = 3;
    if (open) { ctx.save(); ctx.translate(-36, 10); ctx.scale(.42, .92); }
    roundRect(ctx, 0, 0, w, h, 14); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    for (var i = 0; i < 4; i++) { ctx.fillStyle = "rgba(55,35,9,.5)"; ctx.fillRect(18, 32 + i * 42, w - 36, 4); }
    ctx.fillStyle = open ? "#f9df9d" : "#173a40"; ctx.strokeStyle = open ? "#5f4519" : "#67d9e4"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(w / 2, h * .55, 31, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    if (!open) {
      ctx.strokeStyle = "rgba(159,238,245,.65)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(w/2-35,h*.55-34); ctx.lineTo(w/2+32,h*.55+29); ctx.moveTo(w/2+28,h*.55-31); ctx.lineTo(w/2-30,h*.55+34); ctx.stroke();
    }
    ctx.fillStyle = open ? "#38250c" : "#d9fbff"; ctx.font = "800 30px Trebuchet MS"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(prop.value), w / 2, h * .55 + 1);
    if (open) ctx.restore();
    ctx.restore();
  }

  function drawLantern(ctx, x, y, S, now) {
    var slot = S.lantern_slot;
    var slotRender = cur.sceneReader.appearanceFor("lantern_slot", slot);
    var charged = slotRender ? slotRender.appearance === "slot_charged" : slot !== null && slot !== undefined;
    ctx.save(); ctx.translate(x, y);
    var eventAge = now - (cur.sceneEventAt || 0);
    var spring = cur.sceneEvent && cur.sceneEvent.type === "crystal_inserted" && eventAge < 250 ? 1 + Math.sin(eventAge / 250 * Math.PI) * .1 : 1;
    ctx.scale(spring, spring);
    var halo = ctx.createRadialGradient(0, 20, 5, 0, 20, charged ? 105 : 55);
    halo.addColorStop(0, charged ? "rgba(79,208,224,.45)" : "rgba(245,184,61,.18)"); halo.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = halo; ctx.fillRect(-120, -100, 240, 240);
    ctx.strokeStyle = "#f5b83d"; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -33, 30, Math.PI, 0); ctx.stroke();
    var g = ctx.createLinearGradient(-50, -20, 50, 90); g.addColorStop(0, "#f6c861"); g.addColorStop(.5, "#9a681f"); g.addColorStop(1, "#5f4118");
    ctx.fillStyle = g; ctx.strokeStyle = "#f8d98d"; ctx.lineWidth = 3; roundRect(ctx, -54, -25, 108, 120, 18); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#10191b"; roundRect(ctx, -28, -10, 56, 72, 12); ctx.fill();
    ctx.strokeStyle = charged ? "#8beef5" : "#536267"; ctx.lineWidth = 3; roundRect(ctx, -25, -7, 50, 66, 10); ctx.stroke();
    if (charged) drawCrystal(ctx, 0, 26, slot, .72, 1);
    ctx.restore();
  }

  function drawLumo(ctx, now) {
    var bob = Math.sin(now / 900) * 7, x = 835, y = 224 + bob;
    var halo = ctx.createRadialGradient(x, y, 8, x, y, 115);
    halo.addColorStop(0, "rgba(255,222,126,.72)"); halo.addColorStop(1, "rgba(245,184,61,0)"); ctx.fillStyle = halo; ctx.fillRect(x - 125, y - 125, 250, 250);
    ctx.save(); ctx.translate(x, y); ctx.shadowColor = "rgba(245,184,61,.7)"; ctx.shadowBlur = 22;
    ctx.fillStyle = "#f5b83d"; ctx.strokeStyle = "#ffe4a2"; ctx.lineWidth = 3; roundRect(ctx, -40, -48, 80, 94, 28); ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0;
    var expr = cur.sceneExpression || "neutral";
    ctx.strokeStyle = "#38260d"; ctx.fillStyle = "#38260d"; ctx.lineWidth = 4; ctx.lineCap = "round";
    if (expr === "joy") { ctx.beginPath(); ctx.arc(-14,-9,7,0,Math.PI); ctx.arc(14,-9,7,0,Math.PI); ctx.stroke(); ctx.beginPath(); ctx.arc(0,9,15,0,Math.PI); ctx.stroke(); }
    else if (expr === "surprise") { ctx.beginPath(); ctx.arc(-14,-8,4,0,Math.PI*2); ctx.arc(14,-8,4,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(0,15,7,0,Math.PI*2); ctx.stroke(); }
    else if (expr === "ouch") { ctx.beginPath(); ctx.moveTo(-22,-13);ctx.lineTo(-8,-6);ctx.moveTo(22,-13);ctx.lineTo(8,-6);ctx.stroke();ctx.beginPath();ctx.arc(0,18,11,Math.PI,Math.PI*2);ctx.stroke(); }
    else if (expr === "curious") { ctx.beginPath(); ctx.arc(-14,-8,4,0,Math.PI*2);ctx.arc(14,-5,6,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(2,14,10,.2,Math.PI-.2);ctx.stroke(); }
    else if (expr === "encouragement") { ctx.beginPath();ctx.arc(-14,-8,4,0,Math.PI*2);ctx.arc(14,-8,4,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(0,8,13,0,Math.PI);ctx.stroke(); }
    else { ctx.beginPath();ctx.arc(-14,-8,4,0,Math.PI*2);ctx.arc(14,-8,4,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(-8,16);ctx.quadraticCurveTo(0,20,8,16);ctx.stroke(); }
    ctx.fillStyle = "#8c5e1c"; ctx.beginPath(); ctx.moveTo(-23,44);ctx.lineTo(-10,64);ctx.lineTo(0,45);ctx.lineTo(10,64);ctx.lineTo(23,44);ctx.fill();
    ctx.restore();
  }

  function drawShelf(ctx) {
    var x = 52, y = 470, w = 856, gap = 8, cell = (w - gap * 7) / 8;
    var owned = save2.objects && Object.keys(save2.objects).length;
    if (owned || cur.sceneWon) { ctx.fillStyle="#f5cf78";ctx.font="700 12px Trebuchet MS";ctx.textAlign="left";ctx.fillText(tr("MES OBJETS","MY OBJECTS"),x,y-15); }
    ctx.fillStyle = "rgba(30,21,16,.86)"; ctx.strokeStyle = "#6d4c41"; ctx.lineWidth = 3; roundRect(ctx, x - 10, y - 10, w + 20, 67, 10); ctx.fill(); ctx.stroke();
    for (var i = 0; i < 8; i++) {
      var cx = x + i * (cell + gap); ctx.strokeStyle = i === 0 && owned ? "#f5b83d" : "#544943"; ctx.lineWidth = 2; roundRect(ctx, cx, y, cell, 42, 8); ctx.stroke();
      if (i === 0 && owned) {
        ctx.strokeStyle="#f5b83d";ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx+cell/2,y+12,10,Math.PI,0);ctx.stroke();
        var lg=ctx.createLinearGradient(cx+cell/2-14,y+8,cx+cell/2+14,y+35);lg.addColorStop(0,"#f4c45a");lg.addColorStop(1,"#835818");ctx.fillStyle=lg;roundRect(ctx,cx+cell/2-16,y+10,32,27,5);ctx.fill();
        ctx.fillStyle="#4fd0e0";roundRect(ctx,cx+cell/2-6,y+15,12,15,3);ctx.fill();
      } else { ctx.fillStyle = "rgba(130,140,145,.12)"; roundRect(ctx,cx+18,y+9,cell-36,24,8);ctx.fill(); }
    }
  }

  function drawContractScene(ctx, now) {
    var W = 960, H = 540, S = cur.sceneSnapshot ? cur.sceneSnapshot.states : cur.sceneReader.initialStates();
    ctx.clearRect(0, 0, W, H); ctx.save();
    var intro = Math.min(1, Math.max(0, (now - (cur.sceneStartedAt || now)) / 2000));
    var ease = 1 - Math.pow(1 - intro, 3); ctx.translate(W/2,H/2);ctx.scale(1.08-.08*ease,1.08-.08*ease);ctx.translate(-W/2,-H/2);
    var wall = ctx.createLinearGradient(0,0,0,H); wall.addColorStop(0,"#151a1d");wall.addColorStop(.7,"#2e241e");wall.addColorStop(1,"#171413");ctx.fillStyle=wall;ctx.fillRect(0,0,W,H);
    var cold = ctx.createLinearGradient(45,45,175,270);cold.addColorStop(0,"#72c6db");cold.addColorStop(1,"#16313d");ctx.fillStyle=cold;roundRect(ctx,48,48,122,165,8);ctx.fill();ctx.strokeStyle="#65717a";ctx.lineWidth=7;ctx.stroke();ctx.beginPath();ctx.moveTo(109,48);ctx.lineTo(109,213);ctx.moveTo(48,132);ctx.lineTo(170,132);ctx.stroke();
    ctx.strokeStyle="#726152";ctx.lineWidth=4;for(var t=0;t<5;t++){ctx.beginPath();ctx.moveTo(55+t*42,280+(t%2)*12);ctx.lineTo(78+t*42,260+(t%2)*8);ctx.stroke();ctx.beginPath();ctx.arc(84+t*42,253+(t%2)*8,8,0,Math.PI*2);ctx.stroke();}
    (cur.sceneReader.byKind.sealed_door || []).forEach(function(p,i){drawDoor(ctx,p,i,S,now);});
    if (cur.sceneReader.grid) {
      var grid = cur.sceneReader.grid, gx = 235, gy = 82, gw = 430, gh = 258;
      var cols = grid.x_max-grid.x_min+1, rows = grid.y_max-grid.y_min+1, cw = gw/cols, ch = gh/rows;
      ctx.fillStyle="rgba(16,33,39,.9)";ctx.fillRect(gx,gy,gw,gh);ctx.strokeStyle="#77d9e5";ctx.lineWidth=2;
      for(var xx=0;xx<=cols;xx++){ctx.beginPath();ctx.moveTo(gx+xx*cw,gy);ctx.lineTo(gx+xx*cw,gy+gh);ctx.stroke();}
      for(var yy=0;yy<=rows;yy++){ctx.beginPath();ctx.moveTo(gx,gy+yy*ch);ctx.lineTo(gx+gw,gy+yy*ch);ctx.stroke();}
      ctx.fillStyle="#d7fdff";ctx.font="700 14px Trebuchet MS";ctx.textAlign="center";
      for(var xc=0;xc<cols;xc++)ctx.fillText(String(grid.x_min+xc),gx+(xc+.5)*cw,gy-10);
      ctx.textAlign="right";for(var yr=0;yr<rows;yr++)ctx.fillText(String(grid.y_min+yr),gx-9,gy+(yr+.57)*ch);
      if(S.aimed_x!==null&&S.aimed_x!==undefined&&S.aimed_y!==null&&S.aimed_y!==undefined){
        var ax=gx+(S.aimed_x-grid.x_min)*cw,ay=gy+(S.aimed_y-grid.y_min)*ch;
        /* Only a proven x/y flow gets the solid success light. Other attempts
           remain visibly provisional, so the world never celebrates before
           the provenance rule passes. */
        if(S.aim_confirmed){ctx.fillStyle="rgba(245,184,61,.55)";ctx.fillRect(ax+3,ay+3,cw-6,ch-6);ctx.strokeStyle="#ffe4a2";ctx.lineWidth=4;ctx.setLineDash([]);}
        else{ctx.fillStyle="rgba(145,151,158,.12)";ctx.fillRect(ax+3,ay+3,cw-6,ch-6);ctx.strokeStyle="#9aa5b1";ctx.lineWidth=3;ctx.setLineDash([9,7]);}
        ctx.strokeRect(ax+4,ay+4,cw-8,ch-8);ctx.setLineDash([]);
        if(S.aim_source_x){ctx.strokeStyle="#77d9e5";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(116,385);ctx.lineTo(ax+cw/2,ay+ch/2);ctx.stroke();ctx.fillStyle="#d7fdff";ctx.fillText("x ← "+S.aim_source_x,190,375);}
        if(S.aim_source_y){ctx.strokeStyle="#f5b83d";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(116,410);ctx.lineTo(ax+cw/2,ay+ch/2);ctx.stroke();ctx.fillStyle="#ffe4a2";ctx.fillText("y ← "+S.aim_source_y,190,405);}
      }
    }
    ctx.fillStyle="#3b2a1f";ctx.shadowColor="rgba(0,0,0,.55)";ctx.shadowBlur=18;ctx.shadowOffsetY=8;roundRect(ctx,90,348,780,116,16);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="#6d4c41";ctx.fillRect(105,360,750,14);
    drawLantern(ctx,470,350,S,now);
    var crystals=(cur.sceneReader.byKind.crystal||[]), event=cur.sceneEvent||{}, age=now-(cur.sceneEventAt||0), duration=650;
    crystals.forEach(function(p,i){if(deepEqual(p.value,S.lantern_slot))return;var bx=650+i*68,by=408;drawCrystal(ctx,bx,by,p.value,.72,1);});
    if(event.type==="crystal_inserted"&&age<duration){var p=Math.min(1,age/duration),ex=650+(Number(event.value)-1)*68,ey=408,ix=470,iy=376;drawCrystal(ctx,ex+(ix-ex)*p,ey+(iy-ey)*p,event.value,.72+Math.sin(p*Math.PI)*.15,1-p*.35);}
    if(event.type==="previous_crystal_ejected"&&age<duration){var q=Math.min(1,age/duration),tx=650+(Number(event.value)-1)*68,ty=408;drawCrystal(ctx,470+(tx-470)*q,376+(ty-376)*q-55*Math.sin(q*Math.PI),event.value,.72,1);}
    if(event.type==="empty_slot_puff"&&age<800){ctx.fillStyle="rgba(220,228,225,"+(1-age/800)+")";for(var c=0;c<4;c++){ctx.beginPath();ctx.arc(535+c*16,370-c*8,10+c*2,0,Math.PI*2);ctx.fill();}}
    if (cur.sceneReader.actors.length) drawLumo(ctx,now); drawShelf(ctx);
    if(cur.sceneWon){var wa=Math.min(1,(now-cur.sceneWonAt)/2200),glow=ctx.createRadialGradient(480,270,20,480,270,520);glow.addColorStop(0,"rgba(255,222,138,"+(.34*wa)+")");glow.addColorStop(1,"rgba(245,184,61,0)");ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);for(var s=0;s<7;s++){var sx=260+s*73,sy=95+(s%3)*42;ctx.fillStyle="rgba(255,223,145,"+(wa*.8)+")";ctx.beginPath();ctx.arc(sx,sy,2+(s%2)*2,0,Math.PI*2);ctx.fill();}}
    ctx.restore();
  }

  function updateSceneCaption(force) {
    if (!cur || !cur.sceneCaption) return;
    cur.sceneCaption.textContent = cur.sceneMessage || "";
    cur.sceneCaption.classList.toggle("show", !!force && !!cur.sceneMessage);
  }

  function startSceneOpening() {
    cur.sceneMessage = ""; cur.sceneExpression = "neutral"; updateSceneCaption(false);
    cur.introTimer = setTimeout(function () {
      if (!cur || !missionHasScene(cur.mission)) return;
      document.body.classList.remove("w2-scene-opening");
      var hook = cur.mission.i18n[lang()].hook || "";
      var quoted = hook.match(/[\"“]([^\"”]+)[\"”]/);
      cur.sceneMessage = quoted ? quoted[1] : hook;
      cur.sceneExpression = "curious"; updateSceneCaption(true);
    }, 3000);
    cur.revealTimer = setTimeout(function () {
      if (!cur || !missionHasScene(cur.mission)) return;
      var screen = el("screen-w2-mission");
      if (screen) screen.classList.remove("scene-intro");
      if (demoMode() && !cur.lines.length) {
        cur.lines = cur.mission.playable.canonical_solution.slice();
        cur.prediction = pyRepr(cur.stage.prediction.value);
        var predictPanel = el("w2-panel-predict");
        if (predictPanel) predictPanel.classList.remove("awaiting-program");
        if (cur.predictSlot) { cur.predictSlot.textContent=String(cur.stage.prediction.value);cur.predictSlot.classList.add("chosen"); }
        renderLines(); setTimeout(startRun2, 250);
      }
    }, 8000);
  }

  function previewSceneLine(line) {
    if (!cur || !missionHasScene(cur.mission) || running2) return;
    var result = runProgram(cur.mission, cur.lines, {});
    var snap = result.trace.length ? result.trace[result.trace.length-1] : {states:cur.sceneReader.initialStates(),vars:{},events:[]};
    renderStatePanel(snap);
    cur.sceneMessage = ""; updateSceneCaption(false);
  }

  function normalizeProgram(lines) { return (lines || []).map(function(x){return String(x).trim();}).join("\n"); }
  function shortWorldText(text) {
    var words=String(text||"").replace(/;/g,".").split(/\s+/).filter(Boolean);
    return words.slice(0,12).join(" ")+(words.length>12?"…":"");
  }
  function showSceneFailure(result) {
    var refusalEvt = null;
    (result.events || []).forEach(function (ev) {
      if (!refusalEvt && ev.type === "world_refusal") refusalEvt = ev;
    });
    (result.events || []).forEach(function (ev) {
      if (!refusalEvt && (ev.type === "name_not_found" || ev.type === "name_value_not_string")) refusalEvt = ev;
    });
    if (refusalEvt) {
      cur.sceneMessage = shortWorldText((refusalEvt.message && refusalEvt.message[lang()]) ||
        tr("La porte ne réagit qu'à la lanterne.", "The door only reacts to the lantern."));
      cur.sceneExpression = "curious";
      updateSceneCaption(true);
      return;
    }
    var fixtures=cur.mission.playable.misconception_fixtures||[], match=null, current=normalizeProgram(cur.lines);
    for(var i=0;i<fixtures.length;i++)if(normalizeProgram(fixtures[i].program)===current){match=fixtures[i];break;}
    var source=match&&match.world_signal&&match.world_signal[lang()];
    if(!source){
      var count=result.states.doors_open||0;
      source=count?tr(count+" porte(s) ouverte(s). Les autres sceaux attendent.",count+" door(s) open. The other seals are waiting."):
        tr("Les sceaux n'ont pas encore bougé.","The seals have not moved yet.");
    }
    cur.sceneMessage=shortWorldText(source);cur.sceneExpression=result.events.some(function(e){return e.type==="empty_slot_puff";})?"ouch":"encouragement";updateSceneCaption(true);
  }

  function showSceneHelp() {
    var actions=el("w2-scene-actions");if(!actions||el("w2-scene-help"))return;
    var b=mk("button","w2-scene-help",tr("Voir le geste de Lumo","Watch Lumo's move"));b.id="w2-scene-help";b.type="button";b.addEventListener("click",playSceneHelp);actions.appendChild(b);
  }
  function playSceneHelp() {
    if(running2||cur.helpPlaying)return;var help=cur.mission.playable.help;if(!help)return;
    cur.helpPlaying=true;var b=el("w2-scene-help");if(b)b.disabled=true;
    traceEvent("help_used", { stage: cur.stageId, run: runCounter });
    var result=runProgram(cur.mission,help.program,{}),i=0;
    renderStatePanel({states:cur.sceneReader.initialStates(),vars:{},events:[]});
    cur.sceneMessage=tr("Regarde seulement cette porte.","Watch just this door.");cur.sceneExpression="curious";updateSceneCaption(true);
    function next(){if(i>=result.trace.length){cur.helpPlaying=false;if(b)b.disabled=false;cur.sceneMessage=tr("À toi pour les autres.","Your turn for the others.");cur.sceneExpression="encouragement";updateSceneCaption(true);return;}renderStatePanel(result.trace[i++]);setTimeout(next,520);}
    setTimeout(next,400);
  }

  function celebrateScene(stars,result) {
    cur.sceneWon=true;cur.sceneWonAt=performance.now();cur.sceneExpression="joy";
    var success=result.prediction.correct&&cur.mission.playable.prediction.reward.success_message;
    cur.sceneMessage=success?success[lang()]:cur.mission.i18n[lang()].celebration;updateSceneCaption(true);
    var screen=el("screen-w2-mission");if(screen)screen.setAttribute("data-scene-state","won");
    setTimeout(function(){
      if(!cur||!cur.sceneWon)return;var box=el("w2-scene-result");if(!box)return;box.textContent="";
      var L=lang(), mc=cur.mission;
      var copy=mk("div");copy.appendChild(mk("h3","",mc.i18n[L].celebration));
      copy.appendChild(mk("p","",tr("Ta lanterne rejoint Mes objets · ","Your lantern joins My objects · ")+(W2_ORDER.indexOf(cur.stageId)+1)+" / 8."));
      /* A3 — badge Devin affiché séparément des étoiles (collection). */
      if (result.badge && result.badge.label) {
        var chip=mk("div","w2-badge-chip","🎖 "+(result.badge.label[L]||""));
        if (result.badge.message && result.badge.message[L]) chip.setAttribute("title",result.badge.message[L]);
        copy.appendChild(chip);
      }
      /* A6 — compteur de gestes rendu visible avant validation. */
      var gestures=(cur.lines||[]).length;
      if (gestures>0) copy.appendChild(mk("p","w2-gestures",tr("Tu as réussi en "+gestures+" geste(s).","You made it in "+gestures+" move(s).")));
      /* A4/A2 — zone parent discrète en bas de l'écran de fin. */
      if (mc.i18n[L].parent_line) {
        var parent=mk("div","w2-parent-zone");
        parent.appendChild(mk("span","w2-parent-tag",tr("Pour l'adulte","For the adult")));
        parent.appendChild(mk("span","",mc.i18n[L].parent_line));
        copy.appendChild(parent);
      }
      box.appendChild(copy);box.appendChild(mk("div","scene-stars",starsBadge2(stars)));
      var next=mk("button","btn big primary",tr("Entrer dans l'arrière-boutique →","Enter the back room →"));next.type="button";next.addEventListener("click",function(){location.hash="#/w2/p2";});box.appendChild(next);box.classList.add("show");
    },2400);
  }

  function renderDial(host, S) {
    var box = mk("div", "w2-dial");
    var v = S.reaction_mode;
    box.appendChild(mk("div", "w2-dial-face", v === undefined ? "—" : pyRepr(v)));
    box.appendChild(mk("div", "w2-sub", tr("charge affichée par le cadran", "charge shown on the dial")));
    var trace = mk("div", "w2-dial-trace",
      tr("trace déposée : ", "stored trace: ") + pyRepr(S.engine_state));
    box.appendChild(trace);
    host.appendChild(box);
  }

  function renderDrawers(host, st, S, V) {
    var box = mk("div", "w2-drawers");
    (st.drawers || []).forEach(function (d) {
      var cell = mk("div", "w2-drawer");
      cell.appendChild(mk("div", "w2-drawer-icon", d.icon));
      cell.appendChild(mk("div", "w2-sub", d[lang()]));
      var has = Object.prototype.hasOwnProperty.call(V, d.name);
      cell.appendChild(mk("div", "w2-drawer-val mono", has ? pyRepr(V[d.name]) : "—"));
      cell.appendChild(mk("div", "w2-drawer-type", has ? pyType(V[d.name]) : tr("vide", "empty")));
      box.appendChild(cell);
    });
    host.appendChild(box);
    host.appendChild(mk("div", "w2-sub mono",
      tr("tri validé : ", "sort validated: ") + pyRepr(S.engine_state)));
  }

  function renderPress(host, S) {
    var box = mk("div", "w2-press");
    box.appendChild(mk("div", "w2-press-stamp",
      S.feedback_text === undefined ? "—" : String(S.feedback_text)));
    box.appendChild(mk("div", "w2-sub",
      tr("taille pressée : ", "pressed size: ") + pyRepr(S.feedback_shape)));
    box.appendChild(mk("div", "w2-sub",
      tr("retour complet (texte + forme) : ", "complete feedback (text + shape): ") +
      (S.inclusive_feedback ? tr("oui ✔", "yes ✔") : tr("pas encore", "not yet"))));
    host.appendChild(box);
  }

  function gauge(host, label, value, max) {
    var row = mk("div", "w2-gauge");
    row.appendChild(mk("span", "w2-gauge-label", label));
    var bar = mk("div", "w2-gauge-bar");
    var num = (typeof value === "number") ? value : 0;
    var fill = mk("div", "w2-gauge-fill");
    fill.style.width = Math.max(0, Math.min(100, (num / max) * 100)) + "%";
    bar.appendChild(fill);
    row.appendChild(bar);
    row.appendChild(mk("span", "w2-gauge-val mono", pyRepr(value)));
    host.appendChild(row);
  }

  function renderWaterwheel(host, S, V) {
    var box = mk("div", "w2-wheel");
    gauge(box, tr("taille (size)", "size"), (V.size !== undefined ? V.size : S.feedback_text), 4);
    gauge(box, tr("vitesse (speed)", "speed"), (V.speed !== undefined ? V.speed : S.feedback_shape), 4);
    host.appendChild(box);
    var dial = mk("div", "w2-dial small");
    dial.appendChild(mk("div", "w2-dial-face", S.reaction_mode === undefined ? "—" : pyRepr(S.reaction_mode)));
    dial.appendChild(mk("div", "w2-sub", tr("taille confirmée au cadran", "size confirmed on the dial")));
    dial.appendChild(mk("div", "w2-dial-trace", tr("vitesse livrée : ", "delivered speed: ") + pyRepr(S.engine_state)));
    host.appendChild(dial);
  }

  function renderSign(host, S, V) {
    var box = mk("div", "w2-sign");
    var frag = S.reaction_mode;
    var joined = Array.isArray(frag) ? frag.map(function (x) { return String(x); }).join("") : null;
    box.appendChild(mk("div", "w2-sign-face",
      (typeof S.engine_state === "string") ? S.engine_state : (joined !== null ? joined : "—")));
    host.appendChild(box);
    var fr = mk("div", "w2-memory");
    fr.appendChild(mk("div", "w2-sub", tr("fragments conservés (dans l'ordre)", "stored fragments (in order)")));
    if (Array.isArray(frag)) {
      frag.forEach(function (f, i) { kv(fr, "#" + (i + 1), pyRepr(f), "mono"); });
    } else {
      fr.appendChild(mk("div", "muted", tr("aucun fragment déposé", "no fragment stored")));
    }
    host.appendChild(fr);
  }

  function renderLumo(host, st, S, V) {
    var box = mk("div", "w2-card");
    box.appendChild(mk("div", "w2-card-title", tr("Fiche Lumo", "Lumo card")));
    var obj = V.lumo;
    var keys = st.lumoKeys || ["name", "charge", "mode"];
    if (isDict(obj)) {
      var seen = {};
      keys.forEach(function (k) {
        seen[k] = true;
        kv(box, k, Object.prototype.hasOwnProperty.call(obj, k) ? pyRepr(obj[k]) : "—", "mono");
      });
      Object.keys(obj).forEach(function (k) { if (!seen[k]) kv(box, k, pyRepr(obj[k]), "mono"); });
    } else {
      box.appendChild(mk("div", "muted", tr("la fiche lumo n'est pas encore créée", "the lumo card does not exist yet")));
    }
    host.appendChild(box);
  }

  function renderGrid(host, S, markers) {
    var box = mk("div", "w2-grid-wrap");
    box.appendChild(mk("div", "w2-sub", tr("Table quadrillée (colonne, ligne)", "Gridded table (column, row)")));
    var grid = mk("div", "w2-grid");
    var last = markers.length ? markers[markers.length - 1] : null;
    for (var row = 1; row <= GRID_SIZE; row++) {
      for (var col = 1; col <= GRID_SIZE; col++) {
        var cell = mk("div", "w2-cell");
        cell.setAttribute("aria-label", tr("colonne ", "column ") + col + ", " + tr("ligne ", "row ") + row);
        var hit = markers.filter(function (m) { return m[0] === col && m[1] === row; });
        if (hit.length) {
          var isLast = last && last[0] === col && last[1] === row;
          cell.classList.add("marked");
          if (isLast) cell.classList.add("last");
          cell.textContent = isLast ? "◉" : "●";
        } else {
          cell.textContent = col + "," + row;
          cell.classList.add("empty");
        }
        grid.appendChild(cell);
      }
    }
    box.appendChild(grid);
    box.appendChild(mk("div", "w2-sub mono",
      tr("position finale : ", "final position: ") + pyRepr(S.engine_state)));
    host.appendChild(box);
  }

  /* ---------------------------------------------------------------
     Modale de victoire (élément propre au Monde 2)
     --------------------------------------------------------------- */
  function closeModal2() {
    var m = el("w2-modal");
    if (m) m.classList.add("hidden");
  }

  function showWin2(stars, result) {
    var card = el("w2-modal-card");
    if (!card) return;
    var mc = cur.mission, L = lang();
    card.textContent = "";
    card.appendChild(mk("h3", "", tr("Mission réussie !", "Mission complete!")));
    card.appendChild(mk("div", "win-stars", starsBadge2(stars)));
    if (mc) {
      card.appendChild(mk("p", "modal-text", mc.i18n[L].victory));
      card.appendChild(mk("p", "modal-sub", mc.i18n[L].celebration));
      if (result && result.badge && result.badge.label) {
        card.appendChild(mk("p", "modal-sub", "🎖 " + (result.badge.label[L] || "")));
      }
      if (mc.i18n[L].parent_line) {
        var pzone = mk("div", "w2-parent-zone");
        pzone.appendChild(mk("span", "w2-parent-tag", tr("Pour l'adulte", "For the adult")));
        pzone.appendChild(mk("span", "", mc.i18n[L].parent_line));
        card.appendChild(pzone);
      }
    }
    if (result.prediction.required && !result.prediction.correct) {
      card.appendChild(mk("p", "modal-sub",
        tr("Sans prédiction juste, cette mission plafonne à 2 étoiles : réessaie en annonçant l'état final avant d'exécuter.",
           "Without a correct prediction this mission caps at 2 stars: try again and announce the final state before running.")));
    }
    var isLast = cur.stageId === "w2p8";
    var next = mk("button", "btn big primary", isLast
      ? tr("Voir l'artefact 🌟", "See the artefact 🌟")
      : tr("Mission suivante →", "Next mission →"));
    next.type = "button";
    if (isLast) next.addEventListener("click", showWorldEnd2);
    else {
      var n = W2_ORDER.indexOf(cur.stageId) + 1;
      next.addEventListener("click", function () { location.hash = "#/w2/" + W2_ORDER[n]; });
    }
    var back = mk("button", "btn big", tr("Retour à la carte", "Back to map"));
    back.type = "button";
    back.addEventListener("click", function () { location.hash = "#/w2"; });
    card.appendChild(next);
    card.appendChild(back);
    var m = el("w2-modal");
    if (m) m.classList.remove("hidden");
  }

  function showWorldEnd2() {
    var card = el("w2-modal-card");
    if (!card) return;
    var mc = missionContent("w2p8"), L = lang();
    card.textContent = "";
    card.appendChild(mk("h3", "", tr("🌟 Artefact de l'Atelier des états 🌟", "🌟 Artefact of the State Workshop 🌟")));
    card.appendChild(mk("div", "artefact", "🧭"));
    if (mc) card.appendChild(mk("p", "modal-text", mc.i18n[L].celebration));
    var back = mk("button", "btn big primary", tr("Retour à la carte", "Back to map"));
    back.type = "button";
    back.addEventListener("click", function () { location.hash = "#/w2"; });
    card.appendChild(back);
    var m = el("w2-modal");
    if (m) m.classList.remove("hidden");
  }

  /* -- Toast propre au Monde 2 -- */
  var toastTimer2 = null;
  function toast2(msg, cls) {
    var t = el("w2-toast");
    if (!t) return;
    t.textContent = msg;
    t.className = "toast" + (cls ? " " + cls : "");
    if (toastTimer2) clearTimeout(toastTimer2);
    toastTimer2 = setTimeout(function () { t.classList.add("hidden"); }, 2800);
  }

  /* ---------------------------------------------------------------
     Démarrage — après create.js (même page), sans double initialisation.
     --------------------------------------------------------------- */
  function init2() {
    save2 = loadSave2();
    installW2Toolbar();
    var a = el("w2-lang-fr"), b = el("w2-lang-en");
    if (a) a.addEventListener("click", function () { setLang2("fr"); });
    if (b) b.addEventListener("click", function () { setLang2("en"); });
    var back = el("w2-back-btn");
    if (back) back.addEventListener("click", function () { location.hash = "#/w2"; });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal2(); });
    route2();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init2);
  else init2();
  window.addEventListener("hashchange", function () { route2(); });
})();
