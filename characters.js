/* WONDRA — personnages jouables : sprites pixel-art dessines en canvas,
   2 frames d'animation (marche), choix sauvegarde en local.
   6 personnages : chat, chien, tigre, robot, dragon, licorne. */

const CHARACTERS = {
  chat:    { name: "Chat",    body: "#f5a623", belly: "#ffe0a3", eye: "#1a1a1a", ears: "pointues",  queue: true },
  chien:   { name: "Chien",   body: "#8d6e63", belly: "#d7ccc8", eye: "#1a1a1a", ears: "tombeantes", queue: true },
  tigre:   { name: "Tigre",   body: "#e8862d", belly: "#ffe8c2", eye: "#1a1a1a", ears: "pointues",  rayures: true, queue: true },
  robot:   { name: "Robot",   body: "#90a4ae", belly: "#cfd8dc", eye: "#2196f3", antenne: true },
  dragon:  { name: "Dragon",  body: "#43a047", belly: "#c5e1a5", eye: "#1a1a1a", ears: "cornes",    ailes: true, queue: true },
  licorne: { name: "Licorne", body: "#eceff1", belly: "#f8bbd0", eye: "#1a1a1a", corne: true, criniere: "#e91e63", queue: true }
};

function pickCharacter(c, x, y, t, frame) {
  /* dessine le personnage c au centre (x,y) ; t = temps global (anim idle),
     frame = 0|1 (cycle de marche) */
  const s = 1 + Math.sin(t / 300 + x) * 0.03;          // respiration
  const bob = frame === 1 ? -3 : 0;                     // rebond de marche
  cx.save();
  cx.translate(x, y + bob);
  cx.scale(s, s);

  // ombre
  cx.fillStyle = "rgba(0,0,0,.25)";
  cx.beginPath(); cx.ellipse(0, 20, 16, 5, 0, 0, Math.PI * 2); cx.fill();

  // queue (derriere)
  if (c.queue) {
    const wag = Math.sin(t / 150) * 6;
    cx.strokeStyle = c.body; cx.lineWidth = 5; cx.lineCap = "round";
    cx.beginPath(); cx.moveTo(-14, 4);
    cx.quadraticCurveTo(-24, -4 + wag, -20, -14 + wag); cx.stroke();
  }
  // ailes (dragon)
  if (c.ailes) {
    const flap = Math.sin(t / 120) * 8;
    cx.fillStyle = c.belly;
    cx.beginPath(); cx.moveTo(-6, -2); cx.lineTo(-20, -14 - flap); cx.lineTo(-4, -8); cx.fill();
  }
  // corps
  cx.fillStyle = c.body;
  roundRect(-14, -8, 28, 26, 9); cx.fill();

  // ventre
  cx.fillStyle = c.belly;
  roundRect(-9, 2, 18, 13, 6); cx.fill();

  // rayures (tigre)
  if (c.rayures) {
    cx.strokeStyle = "#5d3a12"; cx.lineWidth = 2.5;
    [-6, 0, 6].forEach(dx => { cx.beginPath(); cx.moveTo(dx, -6); cx.lineTo(dx, 4); cx.stroke(); });
  }

  // tete
  cx.fillStyle = c.body;
  cx.beginPath(); cx.arc(0, -16, 13, 0, Math.PI * 2); cx.fill();

  // oreilles / cornes / antenne / corne
  if (c.ears === "pointues") {
    cx.beginPath(); cx.moveTo(-12, -22); cx.lineTo(-8, -34); cx.lineTo(-3, -24); cx.fill();
    cx.beginPath(); cx.moveTo(12, -22);  cx.lineTo(8, -34);  cx.lineTo(3, -24);  cx.fill();
  } else if (c.ears === "tombeantes") {
    cx.beginPath(); cx.ellipse(-12, -12, 5, 9, .5, 0, Math.PI*2); cx.fill();
    cx.beginPath(); cx.ellipse(12, -12, 5, 9, -.5, 0, Math.PI*2); cx.fill();
  } else if (c.ears === "cornes") {
    cx.fillStyle = "#fff3e0";
    cx.beginPath(); cx.moveTo(-10, -24); cx.lineTo(-14, -34); cx.lineTo(-5, -26); cx.fill();
    cx.beginPath(); cx.moveTo(10, -24);  cx.lineTo(14, -34);  cx.lineTo(5, -26);  cx.fill();
  }
  if (c.antenne) {
    cx.strokeStyle = c.body; cx.lineWidth = 3;
    cx.beginPath(); cx.moveTo(0, -29); cx.lineTo(0, -38); cx.stroke();
    cx.fillStyle = "#ff5252"; cx.beginPath(); cx.arc(0, -39, 3, 0, Math.PI*2); cx.fill();
  }
  if (c.corne) {
    cx.fillStyle = "#ffd54f";
    cx.beginPath(); cx.moveTo(0, -28); cx.lineTo(-4, -40); cx.lineTo(4, -40); cx.fill();
  }
  if (c.criniere) {
    cx.fillStyle = c.criniere;
    [-9, 0, 9].forEach(dx => { cx.beginPath(); cx.arc(dx, -26, 5, 0, Math.PI*2); cx.fill(); });
  }

  // yeux (clignent)
  const blink = (t % 3400) < 120;
  cx.fillStyle = c.eye;
  if (blink) {
    cx.fillRect(-8, -18, 5, 1.5); cx.fillRect(3, -18, 5, 1.5);
  } else {
    cx.beginPath(); cx.arc(-6, -17, 2.6, 0, Math.PI*2); cx.fill();
    cx.beginPath(); cx.arc(6, -17, 2.6, 0, Math.PI*2); cx.fill();
    cx.fillStyle = "#fff";
    cx.beginPath(); cx.arc(-5, -18, .9, 0, Math.PI*2); cx.fill();
    cx.beginPath(); cx.arc(7, -18, .9, 0, Math.PI*2); cx.fill();
  }

  // jambes (cycle de marche)
  cx.fillStyle = c.body;
  const step = frame === 0 ? 3 : -3;
  cx.fillRect(-10, 16, 6, 8 + step);
  cx.fillRect(4, 16, 6, 8 - step);

  cx.restore();
}