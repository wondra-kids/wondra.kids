/* WONDRA — curriculum Module 1 : les bases de Python en 8 niveaux.
   Contenu original (le notre). Structure inspiree des campagnes CodeCombat. */

const WORLD = {
  id: "world-1",
  title: "Les Collines de Boucle",
  subtitle: "Se deplacer, repeter, decider",
  levels: [

  {
    id: "L1",
    title: "Premiers pas",
    concept: "Appels de fonctions",
    stars: "xxxxx",
    brief: `Ton heros doit atteindre <b>la gemme</b>.<br>
Donne-lui des ordres, une ligne = une action :<br>
<code>hero.moveRight()</code> — un pas a droite<br>
<code>hero.moveDown()</code> — un pas en bas<br>
<code>hero.moveUp()</code> — un pas en haut<br>
<code>hero.moveLeft()</code> — un pas a gauche`,
    start: { hero: [1, 1], gem: [4, 1], walls: [], size: [6, 3] },
    starterCode: "# Ecris 3 lignes pour aller chercher la gemme\n",
    hints: [
      "Il faut aller 3 fois a droite.",
      "hero.moveRight() trois fois, une par ligne"
    ],
    goalText: "Ramasser la gemme"
  },

  {
    id: "L2",
    title: "Le detour",
    concept: "Sequences d'ordres",
    brief: `Les murs bloquent la ligne droite.<br>
Enchaine plusieurs ordres pour <b>contourner</b> les obstacles.`,
    start: { hero: [1, 1], gem: [4, 3], walls: [[2,1],[2,2],[3,3]] },
    starterCode: "# Contourne les murs jusqu'a la gemme\n",
    hints: [
      "Descends d'abord, puis va a droite.",
      "Ex : moveDown, moveRight, moveRight, moveRight, moveDown"
    ],
    goalText: "Ramasser la gemme"
  },

  {
    id: "L3",
    title: "La boucle qui aide",
    concept: "Boucle for",
    brief: `Repete 3 fois a droite sans ecrire 3 lignes :<br>
<code>for i in range(3):</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>hero.moveRight()</code><br>
Attention : la ligne repetee doit etre <b>indente</b> (4 espaces).`,
    start: { hero: [1, 1], gem: [4, 1], walls: [] },
    starterCode: "# Utilise une boucle for pour avancer 3 fois\n",
    hints: [
      "for i in range(3): suivi d'une ligne indentee",
      "L'indentation, c'est 4 espaces avant hero.moveRight()"
    ],
    goalText: "Ramasser la gemme avec une boucle"
  },

  {
    id: "L4",
    title: "La boucle qui ramasse",
    concept: "Boucle + collecte",
    brief: `3 gemmes, alignees. Une seule boucle suffit :<br>
<code>for i in range(3):</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>hero.moveRight()</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>hero.pickup()</code>`,
    start: { hero: [1, 1], gems: [[2,1],[3,1],[4,1]], walls: [] },
    starterCode: "# Une boucle, deux actions indentees\n",
    hints: [
      "Les DEUX lignes doivent etre indentees dans la boucle",
      "moveRight puis pickup, tous les deux indentes"
    ],
    goalText: "Ramasser les 3 gemmes"
  },

  {
    id: "L5",
    title: "Le petit cerveau",
    concept: "Une règle — l'IA",
    kind: "ia",
    brief: `Un robot qui suit une règle, c'est déjà de l'intelligence artificielle !<br>
Donne TA règle au héros :<br>
<code>if hero.seeWall():</code> → il monte d'une case<br>
<code>else:</code> → il avance à droite<br>
Dans la suite du parcours, tu entraîneras ton propre robot.`,
    start: { hero: [1, 1], gem: [4, 0], walls: [[2, 1]], sensorWall: true },
    starterCode: "# Donne ta règle au héros :\nfor i in range(4):\n    if hero.seeWall():\n        hero.moveUp()\n    else:\n        hero.moveRight()\n",
    hints: [
      "Le mur est juste devant ta case de départ : que doit faire le héros ?",
      "if hero.seeWall(): → monte. else: → avance à droite",
      "4 répétitions suffisent : range(4)"
    ],
    goalText: "Ramasser la gemme avec ta règle"
  },

  {
    id: "L6",
    title: "La fourche",
    concept: "Condition if/else",
    brief: `Le chemin change selon ce que voit le heros :<br>
<code>if hero.seeWall():</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>hero.moveUp()</code><br>
<code>else:</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>hero.moveRight()</code>`,
    start: { hero: [1, 1], gem: [4, 1], walls: [[2,1],[2,3],[2,4]], sensorWall: true },
    starterCode: "# Si mur devant : monte. Sinon : avance a droite.\n",
    hints: [
      "Le heros teste hero.seeWall() a chaque etape",
      "if / else, les deux blocs indentes"
    ],
    goalText: "Ramasser la gemme en evitant le mur"
  },

  {
    id: "L7",
    title: "La garde",
    concept: "Variables",
    brief: `Compte tes gemmes dans une <b>variable</b> :<br>
<code>gems = 0</code><br>
<code>gems = gems + 1</code><br>
Ramasse-en 3 puis atteins la porte. Elle exige <code>gems == 3</code>.`,
    start: { hero: [1, 1], gems: [[2,1],[3,1],[4,1]], gate: [5, 1], walls: [] },
    starterCode: "gems = 0\n# ramasse 3 gemmes, puis entre dans la porte\n",
    hints: [
      "Incremente la variable a chaque pickup",
      "La porte s'ouvre si gems vaut 3"
    ],
    goalText: "3 gemmes puis la porte"
  },

  {
    id: "L8",
    title: "Le labyrinthe",
    concept: "Fonctions",
    brief: `Definis une fois, reutilise partout :<br>
<code>def step():</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>hero.moveRight()</code><br>
&nbsp;&nbsp;&nbsp;&nbsp;<code>hero.pickup()</code><br>
puis appelle <code>step()</code> quand tu veux.`,
    start: { hero: [1, 1], gems: [[2,1],[3,2],[4,3]], walls: [] },
    starterCode: "def step():\n    hero.moveRight()\n    hero.moveDown()\n\n# appelle step() trois fois\n",
    hints: [
      "Definis step() en haut, appelle-le ensuite",
      "Les gemmes forment une diagonale : step() = moveRight puis moveDown"
    ],
    goalText: "Ramasser les gemmes avec ta fonction"
  },

  {
    id: "L9",
    title: "Le boss : le Gardien",
    concept: "Tout ensemble",
    brief: `Le Gardien pose 3 enigmes dans le niveau.<br>
Tu devras combiner : <b>boucles, conditions, variable</b>.<br>
Lis les messages du jeu, ils indiquent quoi faire.`,
    start: { hero: [1, 1], gems: [[2,1],[3,1],[5,2]], gate: [6, 1],
             walls: [[4,1],[4,2],[4,3]], boss: true, sensorWall: true },
    starterCode: "# Boss : boucles + if + variable\n",
    hints: [
      "Explore le chemin du haut pour la 3e gemme",
      "hero.seeWall() te dit quand tourner",
      "La porte veut exactement 3 gemmes"
    ],
    goalText: "Vaincre le Gardien"
  }
]};

/* ---------- les 8 mondes du parcours (bande de la carte + bloc accueil) ---------- */
const WORLDS = [
  { title: "Les Collines de Boucle", what: "Donner un ordre, enchaîner, répéter", active: true },
  { title: "Les Dunes", what: "Nommer, ranger, garder" },
  { title: "La Forêt", what: "Décider, les chemins qui bifurquent" },
  { title: "Les Cascades", what: "Répéter en grand" },
  { title: "Les Pics", what: "Fabriquer ses propres outils" },
  { title: "La Cité", what: "Organiser, structurer" },
  { title: "Les Glaces", what: "Réagir à ce qui arrive" },
  { title: "Le Volcan", what: "Créer son propre jeu" }
];