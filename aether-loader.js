/**
 * aether-loader.js — charge le bundle Aether (CommonJS webpack) dans le
 * navigateur en simulant un environnement Node minimal, puis expose
 * window.Aether. L'UMD du bundle branche sur module.exports s'il existe :
 * on le fournit, on recupere module.exports, on le remonte en global.
 *
 * Fait ici et pas dans un <script> inline parce qu'il faut intercepter
 * l'evaluation du bundle, pas le resultat.
 */
(function () {
  // ordre important : esper d'abord (aether l'utilise s'il est global)
  function load(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("chargement impossible : " + src)); };
      document.head.appendChild(s);
    });
  }

  window.kodawariEngineReady = (async function () {
    // 0. shims d'environnement Node (le bundle Aether y fait reference)
    window.process = window.process || { env: {}, browser: true, nextTick: f => setTimeout(f, 0) };
    await load("engine/engine/lodash.min.js");
    window.__LODASH__ = window._;
    // 1. esper + plugins (UMD web : attache window.esper)
    await load("engine/engine/esper/esper-modern.min.js");
    await load("engine/engine/esper/esper-plugin-tokens.min.js");
    await load("engine/engine/esper/esper-plugin-lang-python-modern.min.js");

    // 2. ace (l'editeur de code) — charge apres le DOM, avant game.js
    await load("engine/engine/ace/src-min/ace.js");

    // 3. aether (bundle CJS) — on lui donne un faux module.exports
    var mod = { exports: {} };
    var prevModule = window.module, prevExports = window.exports;
    window.module = mod;
    window.exports = mod.exports;
    try {
      await load("engine/engine/aether-browser.js");
    } finally {
      delete window.module;
      delete window.exports;
      void prevModule; void prevExports;
    }
    var A = (typeof mod.exports === "function" && mod.exports) ||
            (mod.exports && mod.exports.Aether) ||
            window.Aether;   // le bundle attache aussi directement window.Aether
    if (typeof A !== "function") {
      throw new Error("Aether introuvable dans le bundle (type: " + typeof A + ")");
    }
    window.Aether = A;
    return A;
  })();
})();