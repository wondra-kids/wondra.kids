/* WONDRA — Missions CREATE Monde 1 « Le Quai des signaux ».
   FICHIER GÉNÉRÉ — ne pas éditer à la main.
   Source canonique : curriculum/pedagogy_v3/phase4/content/create/create_w1_p*.json
   Régénérer : python3 curriculum/pedagogy_v3/phase4/scripts/build_create_bundle.py
   Format : window.CREATE_MISSIONS = { "create_w1_pN": {mission}, ... }; */
window.CREATE_MISSIONS = {
 "create_w1_p1": {
  "id": "CREATE.W1.P1",
  "route": "create",
  "world": 1,
  "position": 1,
  "phase": 1,
  "competency": "CT.PRECISE_INSTRUCTIONS",
  "age_band": "7-14",
  "role": "introduction",
  "i18n": {
   "fr": {
    "name": "Première commande",
    "hook": "Au Quai des signaux, la tortue Galet attend une commande pour s'éveiller. Trouve le bon mot, et elle s'élancera vers la pastille dorée !",
    "instructions": "Bienvenue au Quai des signaux, futur gardien ou future gardienne ! Galet est une tortue-lanterne toute neuve. Elle ne bouge que si on lui donne une commande précise. Regarde les trois boutons sous l'écran. Chacun cache une action. Clique sur AVANCE et observe : Galet fait un pas vers l'avant. Continue jusqu'à la pastille dorée. Tu réussis quand Galet pose sa patte sur la pastille.",
    "hints": [
     "Lis chaque bouton à voix haute, puis clique pour voir ce que fait Galet.",
     "Le gros bouton vert cache un mot qui fait avancer Galet.",
     "Le mot magique est AVANCE : clique-le, puis clique encore jusqu'à la pastille."
    ],
    "victory": "Galet pose sa patte sur la pastille dorée. Ta toute première commande a fonctionné !",
    "celebration": "La coquille de Galet s'illumine d'une lueur dorée et Luciole applaudit depuis la lanterne. Une étoile de gardien brille dans ton carnet !"
   },
   "en": {
    "name": "First Command",
    "hook": "At Signal Quay, the turtle Galet is waiting for a command to wake up. Find the right word, and she will zoom to the golden spot!",
    "instructions": "Welcome to Signal Quay, young keeper! Galet is a brand-new lantern turtle. She only moves when she gets a precise command. Look at the three buttons under the screen. Each one hides an action. Click FORWARD and watch: Galet takes one step forward. Keep going until the golden spot. You win when Galet's paw touches the spot.",
    "hints": [
     "Read each button out loud, then click to see what Galet does.",
     "The big green button hides the word that makes Galet go forward.",
     "The magic word is FORWARD: click it, then click again until the spot."
    ],
    "victory": "Galet's paw touches the golden spot. Your very first command worked!",
    "celebration": "Galet's shell glows with a golden light and Luciole claps from the lantern. A keeper's star shines in your logbook!"
   }
  },
  "engagement": {
   "first_action_seconds": 30,
   "duration_min": [
    6,
    10
   ],
   "mechanics": [
    "command_discovery",
    "tap_button",
    "trial_and_error",
    "immediate_visual_feedback"
   ],
   "celebration_type": "character_glow_and_star",
   "feedback_delay_seconds": 1
  },
  "accessibility": {
   "no_color_only": true,
   "reading_load": "low",
   "audio_independent": true,
   "motor_load": "low"
  },
  "source": {
   "family": "BENCC-GROUP-MATERIAL",
   "item_id": "dungeons-of-kithgard",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 74 (Python Intro module 1 pos 0, dungeon index 0) + fiche p. 6826-6878",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Registre rights_registry.json — statut BASELINE_NO_ITEM_LEVEL_GRANTS_RECORDED (03/09) ; pas de grant item ; fondement pédagogique (commande = action, exécution pas à pas, premier contact syntaxe sans frappe) repris en texte 100 % WONDRA-original. Acte intragroupe BENCC→WONDRA en attente (WDR-052/053). | Décision Yassine 04/09 (WDR-055) : BENCC et WONDRA non constituées en entités juridiques distinctes — fondement BENCC-GROUP-MATERIAL = même ayant droit ; acte intragroupe sans objet à ce jour (réversible si incorporation)."
  },
  "maturity": "INTEGRATION_READY"
 },
 "create_w1_p2": {
  "id": "CREATE.W1.P2",
  "route": "create",
  "world": 1,
  "position": 2,
  "phase": 1,
  "competency": "CT.SEQUENCING",
  "age_band": "7-14",
  "role": "worked_example",
  "i18n": {
   "fr": {
    "name": "Trois pas vers le cristal",
    "hook": "Un cristal brille au bout du quai. Galet veut le ramasser, mais elle ne sait pas encore quel chemin suivre. À toi d'écrire la suite des pas !",
    "instructions": "Galet est posée au départ, le nez vers la mer. Elle n'avance que si on le lui dit, et elle ne tourne que si on le lui dit. Ta mission : écrire une liste de commandes qui la mène jusqu'au cristal. Regarde d'abord le chemin : il faut avancer tout droit, puis tourner vers le quai, puis avancer encore. Glisse les commandes AVANCE et TOURNE dans la liste, dans le bon ordre, puis lance. Galet exécute ta liste pas à pas. Quand elle touche le cristal, c'est gagné !",
    "hints": [
     "Regarde le bout du chemin : par où Galet doit-elle partir, et où doit-elle arriver ?",
     "Galet commence le nez vers la mer : pour rejoindre le quai, elle doit d'abord changer de direction.",
     "La bonne liste commence par AVANCE, continue par TOURNE, et se termine par AVANCE."
    ],
    "victory": "Le cristal s'allume dans la coquille de Galet. Ta suite de commandes était dans le bon ordre !",
    "celebration": "Le cristal chante doucement et Luciole écrit ton premier enchaînement dans la carte des commandes. Trois pas, trois commandes, zéro hésitation !"
   },
   "en": {
    "name": "Three Steps to the Crystal",
    "hook": "A crystal shines at the end of the quay. Galet wants to pick it up, but she does not know the way yet. You write the steps!",
    "instructions": "Galet stands at the start, nose facing the sea. She only moves when told, and she only turns when told. Your mission: write a list of commands that leads her to the crystal. First look at the path: go straight, then turn toward the quay, then go straight again. Drag the FORWARD and TURN commands into the list, in the right order, then run. Galet follows your list step by step. When she touches the crystal, you win!",
    "hints": [
     "Look at the end of the path: where does Galet start, and where must she arrive?",
     "Galet starts facing the sea: to reach the quay she must first change direction.",
     "The right list starts with FORWARD, continues with TURN, and ends with FORWARD."
    ],
    "victory": "The crystal lights up inside Galet's shell. Your command list was in the right order!",
    "celebration": "The crystal hums softly and Luciole writes your first chain into the command map. Three steps, three commands, zero hesitation!"
   }
  },
  "engagement": {
   "first_action_seconds": 30,
   "duration_min": [
    7,
    12
   ],
   "mechanics": [
    "sequence_planning",
    "drag_and_drop_blocks",
    "run_button",
    "step_by_step_observation"
   ],
   "celebration_type": "crystal_chime",
   "feedback_delay_seconds": 1
  },
  "accessibility": {
   "no_color_only": true,
   "reading_load": "low",
   "audio_independent": true,
   "motor_load": "medium"
  },
  "source": {
   "family": "BENCC-GROUP-MATERIAL",
   "item_id": "course-winding-trail",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 2 (Course de la forêt, avancer pas à pas, virage, index 121-210) + Exercice 93 Haunted Kithmaze (ordre des pas, index 8333)",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Registre rights_registry.json — BASELINE_NO_ITEM_LEVEL_GRANTS_RECORDED (03/09) ; fondement : progression pas-à-pas et virage, commande exacte ; texte, chemin, personnages et consignes 100 % WONDRA-originaux. Acte intragroupe en attente (WDR-052/053). | Décision Yassine 04/09 (WDR-055) : BENCC et WONDRA non constituées en entités juridiques distinctes — fondement BENCC-GROUP-MATERIAL = même ayant droit ; acte intragroupe sans objet à ce jour (réversible si incorporation)."
  },
  "maturity": "INTEGRATION_READY"
 },
 "create_w1_p3": {
  "id": "CREATE.W1.P3",
  "route": "create",
  "world": 1,
  "position": 3,
  "phase": 1,
  "competency": "PROG.SYNTAX_LITERACY",
  "age_band": "7-14",
  "role": "guided_practice",
  "i18n": {
   "fr": {
    "name": "Le mot exact",
    "hook": "Zut ! Un lutin farceur a mélangé les lettres des commandes de Galet. Sans le mot exact, Galet ne comprend rien. Répare ses commandes !",
    "instructions": "Galet ne comprend que les mots exacts de sa carte de commandes. Si un mot est mal écrit, elle ne bouge pas d'une patte. Sur ton écran, deux commandes sont cassées : elles contiennent des lettres en trop ou en moins. Compare-les avec la carte affichée à gauche, corrige-les en cliquant sur les lettres, puis construis une liste pour ramasser les deux cristaux et allumer la petite lanterne au bout du quai. Chaque fois qu'une commande est correcte, Galet la répète en hochant la tête.",
    "hints": [
     "La carte de gauche montre les commandes que Galet connaît. Compare lettre par lettre.",
     "Une commande cassée contient une lettre en trop ; l'autre a une lettre manquante.",
     "Quand les deux mots sont réparés, enchaîne AVANCE, RAMASSE, puis la commande ALLUME au bon moment."
    ],
    "victory": "Les deux commandes sont réparées, les cristaux ramassés et la lanterne brille. Galet salue son gardien !",
    "celebration": "La lanterne du quai s'embrase et Luciole colle deux nouveaux mots exacts sur la carte des commandes. Tu sais maintenant pourquoi chaque lettre compte !"
   },
   "en": {
    "name": "The Exact Word",
    "hook": "Oh no! A prankster imp mixed up the letters of Galet's commands. Without the exact word, Galet understands nothing. Repair her commands!",
    "instructions": "Galet only understands the exact words on her command card. If a word is misspelled, she does not move a paw. On your screen, two commands are broken: they have extra letters or missing letters. Compare them with the card shown on the left, fix them by clicking the letters, then build a list to pick up the two crystals and light the little lantern at the end of the quay. Each time a command is correct, Galet repeats it with a nod.",
    "hints": [
     "The card on the left shows the commands Galet knows. Compare letter by letter.",
     "One broken command has an extra letter; the other is missing a letter.",
     "Once both words are fixed, chain FORWARD, PICK UP, then the LIGHT command at the right moment."
    ],
    "victory": "Both commands are repaired, the crystals are picked up, and the lantern shines. Galet salutes her keeper!",
    "celebration": "The quay lantern blazes and Luciole sticks two new exact words onto the command map. Now you know why every letter counts!"
   }
  },
  "engagement": {
   "first_action_seconds": 25,
   "duration_min": [
    8,
    13
   ],
   "mechanics": [
    "letter_repair",
    "command_card_comparison",
    "sequence_assembly",
    "instant_validation"
   ],
   "celebration_type": "lantern_flare",
   "feedback_delay_seconds": 1
  },
  "accessibility": {
   "no_color_only": true,
   "reading_load": "medium",
   "audio_independent": true,
   "motor_load": "medium"
  },
  "source": {
   "family": "BENCC-GROUP-MATERIAL",
   "item_id": "true-names",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 84 (Python Intro module 2 pos 4, dungeon index 10) + Exercice 79 Careful Steps (exactitude des pas, index 7218)",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Registre rights_registry.json — BASELINE_NO_ITEM_LEVEL_GRANTS_RECORDED (03/09) ; fondement : nom exact d'une action, lettre par lettre, erreur silencieuse si mot inconnu ; surface (lutin, carte de commandes, lanterne) entièrement WONDRA. Acte intragroupe en attente (WDR-052/053). | Décision Yassine 04/09 (WDR-055) : BENCC et WONDRA non constituées en entités juridiques distinctes — fondement BENCC-GROUP-MATERIAL = même ayant droit ; acte intragroupe sans objet à ce jour (réversible si incorporation)."
  },
  "maturity": "INTEGRATION_READY"
 },
 "create_w1_p4": {
  "id": "CREATE.W1.P4",
  "route": "create",
  "world": 1,
  "position": 4,
  "phase": 1,
  "competency": "CT.PRECISE_INSTRUCTIONS",
  "age_band": "7-14",
  "role": "guided_practice",
  "i18n": {
   "fr": {
    "name": "L'allumeur de lanterne",
    "hook": "Le grand festival des signaux commence au coucher du soleil ! Deux lanternes attendent encore d'être allumées. Galet compte sur tes commandes.",
    "instructions": "Le quai doit scintiller avant la nuit. Galet démarre devant la cabane de Luciole. Écris une liste de commandes pour la mener jusqu'aux deux lanternes et les allumer. Chaque lanterne a sa petite plateforme : Galet doit monter dessus, puis utiliser la commande ALLUME. Attention à l'ordre ! Si une commande ne convient pas, Galet reste immobile et tu peux corriger ta liste. Les mots exacts sont affichés dans la carte des commandes, au-dessus de la zone de liste.",
    "hints": [
     "Découpe le trajet en morceaux : une lanterne, puis l'autre. Galet n'en fait qu'un à la fois.",
     "Pour allumer, Galet doit d'abord être sur la plateforme de la lanterne : c'est la commande ALLUME qui fait le reste.",
     "Utilise la carte des commandes : chaque mot y est écrit exactement. Reproduis-les sans rien changer."
    ],
    "victory": "Les deux lanternes du quai brillent dans la nuit. Le festival peut commencer grâce à ta liste de commandes !",
    "celebration": "Tout le quai s'illumine : bleu, or et vert. Luciole grave ton nom de gardien sur la carte des commandes, sous la mention « Ordre parfait »."
   },
   "en": {
    "name": "The Lantern Lighter",
    "hook": "The great Festival of Signals starts at sunset! Two lanterns are still waiting to be lit. Galet counts on your commands.",
    "instructions": "The quay must sparkle before nightfall. Galet starts in front of Luciole's hut. Write a list of commands to lead her to the two lanterns and light them. Each lantern has its own little platform: Galet must step onto it, then use the LIGHT command. Order matters! If a command does not fit, Galet stays still and you can fix your list. The exact words are shown on the command card, above the list area.",
    "hints": [
     "Cut the journey into pieces: one lantern, then the other. Galet does only one at a time.",
     "To light a lantern, Galet must first stand on its platform: the LIGHT command does the rest.",
     "Use the command card: each word is written there exactly. Copy the words without changing anything."
    ],
    "victory": "Both quay lanterns shine in the night. The festival can begin, thanks to your command list!",
    "celebration": "The whole quay lights up: blue, gold and green. Luciole carves your keeper name onto the command map, under the words \"Perfect order\"."
   }
  },
  "engagement": {
   "first_action_seconds": 25,
   "duration_min": [
    8,
    14
   ],
   "mechanics": [
    "free_sequence_authoring",
    "goal_layering",
    "error_feedback_and_fix",
    "platform_puzzle"
   ],
   "celebration_type": "quay_light_show",
   "feedback_delay_seconds": 1
  },
  "accessibility": {
   "no_color_only": true,
   "reading_load": "medium",
   "audio_independent": true,
   "motor_load": "medium"
  },
  "source": {
   "family": "BENCC-GROUP-MATERIAL",
   "item_id": "careful-steps",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 79 (Python Intro module 2 pos 0, dungeon index 8) + Exercice 110 Kithgard Gates (outil précis, index 9691)",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Registre rights_registry.json — BASELINE_NO_ITEM_LEVEL_GRANTS_RECORDED (03/09) ; fondement : précision de chaque étape, objectif composé, correction après erreur sans pénalité ; univers festival/lanternes, consignes et progression 100 % WONDRA. Acte intragroupe en attente (WDR-052/053). | Décision Yassine 04/09 (WDR-055) : BENCC et WONDRA non constituées en entités juridiques distinctes — fondement BENCC-GROUP-MATERIAL = même ayant droit ; acte intragroupe sans objet à ce jour (réversible si incorporation)."
  },
  "maturity": "INTEGRATION_READY"
 },
 "create_w1_p5": {
  "id": "CREATE.W1.P5",
  "route": "create",
  "world": 1,
  "position": 5,
  "phase": 1,
  "competency": "PROG.SYNTAX_LITERACY",
  "age_band": "7-14",
  "role": "independent_practice",
  "i18n": {
   "fr": {
    "name": "Le jardin des cristaux",
    "hook": "Le jardin secret du phare est rempli de cristaux, mais le chemin change à chaque visite. Personne ne peut t'aider : seulement toi et ta carte de commandes.",
    "instructions": "Galet entre dans le jardin secret. Ramasse les trois cristaux qui brillent, sans aide et sans exemple. Tu choisis toi-même les commandes et leur ordre. Un cristal est ramassé quand Galet passe dessus avec la commande RAMASSE. Si Galet reste bloquée contre un buisson, relis ta liste et corrige-la : chaque mot doit être exact et chaque étape doit servir. Quand les trois cristaux sont dans sa coquille, la sortie s'ouvre. Variante bonus : termine en moins de huit commandes pour gagner l'étoile du jardin.",
    "hints": [
     "Commence par observer : où Galet doit-elle aller en premier ? Écris seulement ce premier morceau.",
     "Tu peux tester ta liste à tout moment. Une commande inutile n'est pas une faute, mais elle allonge le chemin.",
     "Si un mot ne fonctionne pas, vérifie sa forme sur la carte des commandes : une seule lettre peut tout changer."
    ],
    "victory": "Trois cristaux brillent dans la coquille de Galet et la grille du jardin s'ouvre en grand. Mission accomplie en solo !",
    "celebration": "Une pluie d'étoiles tombe sur le jardin et l'étoile bonus apparaît dans ton carnet. Luciole te salue depuis la fenêtre du phare : « Le gardien se débrouille seul, maintenant ! »"
   },
   "en": {
    "name": "The Crystal Garden",
    "hook": "The lighthouse secret garden is full of crystals, but the path changes on every visit. Nobody can help you: just you and your command card.",
    "instructions": "Galet steps into the secret garden. Pick up the three shining crystals, with no help and no example. You choose the commands and their order yourself. A crystal is collected when Galet steps on it with the PICK UP command. If Galet gets stuck against a bush, reread your list and fix it: every word must be exact and every step must be useful. When the three crystals are in her shell, the exit opens. Bonus variant: finish in fewer than eight commands to earn the garden star.",
    "hints": [
     "Start by looking: where must Galet go first? Write only that first piece.",
     "You can test your list at any time. A useless command is not a mistake, but it makes the path longer.",
     "If a word does not work, check its shape on the command card: a single letter can change everything."
    ],
    "victory": "Three crystals shine inside Galet's shell and the garden gate swings wide open. Mission complete, all on your own!",
    "celebration": "A shower of stars falls over the garden and the bonus star appears in your logbook. Luciole waves from the lighthouse window: \"The keeper can manage alone now!\""
   }
  },
  "engagement": {
   "first_action_seconds": 20,
   "duration_min": [
    8,
    15
   ],
   "mechanics": [
    "open_sequence_authoring",
    "multi_crystal_objective",
    "self_correction_loop",
    "optional_star_challenge"
   ],
   "celebration_type": "star_shower",
   "feedback_delay_seconds": 1
  },
  "accessibility": {
   "no_color_only": true,
   "reading_load": "medium",
   "audio_independent": true,
   "motor_load": "medium"
  },
  "source": {
   "family": "BENCC-GROUP-MATERIAL",
   "item_id": "the-second-kithmaze",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 96 (Python Intro module 3 pos 0, dungeon index 20) : écriture autonome d'une suite de pas vers plusieurs objectifs",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Registre rights_registry.json — BASELINE_NO_ITEM_LEVEL_GRANTS_RECORDED (03/09) ; fondement : pratique indépendante d'une suite de commandes exactes vers plusieurs cibles ; jardin secret, tortue-lanterne, consignes et bonus 100 % WONDRA. Acte intragroupe en attente (WDR-052/053). | Décision Yassine 04/09 (WDR-055) : BENCC et WONDRA non constituées en entités juridiques distinctes — fondement BENCC-GROUP-MATERIAL = même ayant droit ; acte intragroupe sans objet à ce jour (réversible si incorporation)."
  },
  "maturity": "INTEGRATION_READY"
 },
 "create_w1_p6": {
  "id": "CREATE.W1.P6",
  "route": "create",
  "world": 1,
  "position": 6,
  "phase": 1,
  "competency": "CT.SEQUENCING",
  "age_band": "7-14",
  "role": "retrieval",
  "i18n": {
   "fr": {
    "name": "La carte des commandes",
    "hook": "Trois machines du quai se sont endormies : la charrette, le moulin et la grue. Chacune attend sa commande préférée. Réveille-les dans le bon ordre !",
    "instructions": "Ce matin, c'est toi la cheffe ou le chef du quai. Trois machines attendent devant toi, chacune avec sa fiche : la charrette veut rouler, le moulin veut tourner, la grue veut soulever. En dessous, trois cartes-commandes sont mélangées : AVANCE, TOURNE, RAMASSE. Glisse chaque carte sur la machine qui lui correspond, puis lance la journée : les machines s'éveillent l'une après l'autre. Ensuite, Luciole te pose une question : quel est le secret pour qu'une commande fonctionne ? Choisis la bonne réponse parmi les trois proposées.",
    "hints": [
     "Lis la fiche de chaque machine : elle décrit l'action avec tes mots, pas avec des mots compliqués.",
     "Si une machine ne se réveille pas, c'est que la carte posée dessus n'est pas la bonne. Essaie une autre carte.",
     "Pour la question de Luciole, souviens-toi du lutin farceur : que s'est-il passé quand les mots étaient mal écrits ?"
    ],
    "victory": "La charrette roule, le moulin tourne, la grue soulève, et ta réponse fait sourire Luciole. La carte des commandes est complète !",
    "celebration": "Les trois machines saluent en chœur et Luciole ajoute une ancre dorée sur ta carte de gardien : tu te souviens de tout, du premier pas au dernier mot !"
   },
   "en": {
    "name": "The Command Map",
    "hook": "Three quay machines have fallen asleep: the cart, the windmill and the crane. Each one waits for its favourite command. Wake them up in the right order!",
    "instructions": "This morning, you are the boss of the quay. Three machines wait in front of you, each with its card: the cart wants to roll, the windmill wants to turn, the crane wants to lift. Below, three command cards are mixed up: FORWARD, TURN, PICK UP. Drag each card onto the machine it matches, then start the day: the machines wake up one after another. Then Luciole asks you a question: what is the secret for a command to work? Choose the right answer among the three offered.",
    "hints": [
     "Read each machine's card: it describes the action in simple words.",
     "If a machine does not wake up, the card on it is wrong. Try another card.",
     "For Luciole's question, remember the prankster imp: what happened when the words were misspelled?"
    ],
    "victory": "The cart rolls, the windmill turns, the crane lifts, and your answer makes Luciole smile. The command map is complete!",
    "celebration": "The three machines cheer together and Luciole adds a golden anchor to your keeper card: you remember everything, from the first step to the last word!"
   }
  },
  "engagement": {
   "first_action_seconds": 30,
   "duration_min": [
    7,
    11
   ],
   "mechanics": [
    "sorting_and_matching",
    "instant_wake_feedback",
    "vocabulary_recall_question",
    "cumulative_review"
   ],
   "celebration_type": "machine_cheer",
   "feedback_delay_seconds": 1
  },
  "accessibility": {
   "no_color_only": true,
   "reading_load": "low",
   "audio_independent": true,
   "motor_load": "medium"
  },
  "source": {
   "family": "BENCC-GROUP-MATERIAL",
   "item_id": "known-enemy",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 103 (Python Intro module 4 pos 5, dungeon index 29) : vocabulaire précis relié à un comportement observable + Exercice 92 Fire Dancing (rappel de mots exacts)",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Registre rights_registry.json — BASELINE_NO_ITEM_LEVEL_GRANTS_RECORDED (03/09) ; fondement : rappel du vocabulaire de commande et de son effet ; situation (charrette, moulin, grue, question de Luciole) 100 % WONDRA-originale. Acte intragroupe en attente (WDR-052/053). | Décision Yassine 04/09 (WDR-055) : BENCC et WONDRA non constituées en entités juridiques distinctes — fondement BENCC-GROUP-MATERIAL = même ayant droit ; acte intragroupe sans objet à ce jour (réversible si incorporation)."
  },
  "maturity": "INTEGRATION_READY"
 },
 "create_w1_p7": {
  "id": "CREATE.W1.P7",
  "route": "create",
  "world": 1,
  "position": 7,
  "phase": 1,
  "competency": "CT.SEQUENCING",
  "age_band": "7-14",
  "role": "transfer",
  "i18n": {
   "fr": {
    "name": "La barque du canal",
    "hook": "La barque de livraison attend au canal, chargée de cristaux pour le phare. Elle ne connaît que deux commandes, et elle n'écoute que toi. Sauras-tu la mener à bon port ?",
    "instructions": "Fini la tortue : aujourd'hui, tu guides une barque sur le canal. Elle ne sait que deux commandes : AVANCE (elle glisse tout droit sur une case) et TOURNE (elle pivote sur place vers la gauche ou la droite). Ta mission : la faire partir du ponton, longer la bouée rouge sans la toucher, et l'arrêter pile devant la rampe du phare. Si elle dépasse la rampe, elle touche la berge : recommence en comptant mieux tes AVANCE. La cloche sonne quand la barque est amarrée.",
    "hints": [
     "Compte les cases d'eau entre le ponton et la bouée, puis entre la bouée et la rampe : chaque AVANCE fait glisser la barque d'une case.",
     "Pour passer la bouée sans la toucher, la barque doit tourner avant d'arriver à sa hauteur.",
     "Une barque trop loin de la rampe ou trop près de la berge, c'est juste une liste à corriger : ajuste le nombre de AVANCE."
    ],
    "victory": "La cloche du phare sonne : la barque est amarrée pile à la rampe, sans avoir touché la bouée. Livraison réussie !",
    "celebration": "Luciole décharge les cristaux en chantant et accroche une clochette d'argent à la barque. Même sans tortue, tes commandes ont trouvé le chemin !"
   },
   "en": {
    "name": "The Canal Boat",
    "hook": "The delivery boat waits in the canal, loaded with crystals for the lighthouse. It knows only two commands, and it listens only to you. Can you bring it safely home?",
    "instructions": "No turtle this time: today you guide a boat on the canal. It only knows two commands: FORWARD (it glides straight ahead one square) and TURN (it spins in place, left or right). Your mission: leave the jetty, pass the red buoy without touching it, and stop exactly in front of the lighthouse ramp. If it goes too far, it bumps the bank: try again and count your FORWARD commands better. The bell rings when the boat is moored.",
    "hints": [
     "Count the water squares between the jetty and the buoy, then between the buoy and the ramp: each FORWARD glides the boat one square.",
     "To pass the buoy without touching it, the boat must turn before it reaches it.",
     "A boat too far from the ramp or too close to the bank is just a list to fix: adjust the number of FORWARD commands."
    ],
    "victory": "The lighthouse bell rings: the boat is moored exactly at the ramp, without touching the buoy. Delivery complete!",
    "celebration": "Luciole unloads the crystals while singing and hangs a silver bell on the boat. Even without a turtle, your commands found the way!"
   }
  },
  "engagement": {
   "first_action_seconds": 30,
   "duration_min": [
    8,
    13
   ],
   "mechanics": [
    "new_surface_transfer",
    "step_counting",
    "precision_stop",
    "retry_without_penalty"
   ],
   "celebration_type": "harbor_bell",
   "feedback_delay_seconds": 1
  },
  "accessibility": {
   "no_color_only": true,
   "reading_load": "medium",
   "audio_independent": true,
   "motor_load": "medium"
  },
  "source": {
   "family": "BENCC-GROUP-MATERIAL",
   "item_id": "haunted-kithmaze",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 93 (Python Intro module 3 pos 4, dungeon index 19) : compter les pas et s'arrêter au bon endroit + Exercice 79 Careful Steps",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Registre rights_registry.json — BASELINE_NO_ITEM_LEVEL_GRANTS_RECORDED (03/09) ; fondement : transfert du comptage de pas et de l'arrêt précis sur une nouvelle surface (canal et barque vs chemin et tortue) ; scénario, consignes, cloche 100 % WONDRA-originaux. Acte intragroupe en attente (WDR-052/053). | Décision Yassine 04/09 (WDR-055) : BENCC et WONDRA non constituées en entités juridiques distinctes — fondement BENCC-GROUP-MATERIAL = même ayant droit ; acte intragroupe sans objet à ce jour (réversible si incorporation)."
  },
  "maturity": "INTEGRATION_READY"
 },
 "create_w1_p8": {
  "id": "CREATE.W1.P8",
  "route": "create",
  "world": 1,
  "position": 8,
  "phase": 1,
  "competency": "CT.PRECISE_INSTRUCTIONS",
  "age_band": "7-14",
  "role": "checkpoint",
  "i18n": {
   "fr": {
    "name": "Le grand feu du quai",
    "hook": "La nuit la plus brumeuse de l'année arrive. Le grand phare du Quai des signaux doit briller, et seule ta carte de commandes peut l'allumer. C'est ton examen de gardien !",
    "instructions": "Dernière épreuve du Quai des signaux. Le grand phare est éteint. Pour l'allumer, Galet doit parcourir le parcours de cérémonie : ramasser les deux cristaux de la jetée, tourner au mât, grimper sur la plateforme du phare et utiliser ALLUME. Construis la liste complète des commandes, lance-la, puis explique à Luciole ce que tu as fait : pourquoi chaque commande est à sa place. Si le grand feu ne s'allume pas, compare ta liste avec le parcours et corrige. Tu réussis quand la lanterne du phare éclaire toute la baie.",
    "hints": [
     "Parcours d'abord le chemin des yeux, sans écrire : cristaux, mât, plateforme, phare. Ta liste doit suivre cet ordre.",
     "Chaque commande a un mot exact : AVANCE, TOURNE, RAMASSE, ALLUME. Vérifie ta liste lettre par lettre.",
     "Pour expliquer à Luciole, dis-lui ce qui se passerait si une commande était en trop, en moins ou mal placée."
    ],
    "victory": "Le grand feu balaie la baie : chaque bateau voit sa route. Galet salue, Luciole pleure de joie : tu es gardien du Quai des signaux !",
    "celebration": "Toutes les lanternes du quai répondent au grand feu, une par une, comme une salve d'honneur. Ta carte de commandes est complète et le phare ne s'éteindra plus jamais sans toi."
   },
   "en": {
    "name": "The Great Quay Light",
    "hook": "The foggiest night of the year is coming. The great lighthouse of Signal Quay must shine, and only your command map can light it. This is your keeper exam!",
    "instructions": "Final challenge of Signal Quay. The great lighthouse is dark. To light it, Galet must follow the ceremony path: pick up the two crystals on the jetty, turn at the mast, climb onto the lighthouse platform and use LIGHT. Build the complete list of commands, run it, then explain to Luciole what you did: why each command is in its place. If the great light does not turn on, compare your list with the path and fix it. You succeed when the lighthouse lantern lights up the whole bay.",
    "hints": [
     "First trace the path with your eyes, without writing: crystals, mast, platform, lighthouse. Your list must follow that order.",
     "Every command has an exact word: FORWARD, TURN, PICK UP, LIGHT. Check your list letter by letter.",
     "To explain to Luciole, tell her what would happen if a command was extra, missing or misplaced."
    ],
    "victory": "The great light sweeps across the bay: every boat can see its way. Galet salutes, Luciole cries with joy: you are the keeper of Signal Quay!",
    "celebration": "All the quay lanterns answer the great light, one by one, like a salute of honour. Your command map is complete, and the lighthouse will never go dark without you again."
   }
  },
  "engagement": {
   "first_action_seconds": 45,
   "duration_min": [
    10,
    15
   ],
   "mechanics": [
    "cumulative_checkpoint",
    "full_sequence_authoring",
    "explanation_check",
    "criterion_feedback"
   ],
   "celebration_type": "bay_light_beacon",
   "feedback_delay_seconds": 2
  },
  "accessibility": {
   "no_color_only": true,
   "reading_load": "medium",
   "audio_independent": true,
   "motor_load": "medium"
  },
  "source": {
   "family": "BENCC-GROUP-MATERIAL",
   "item_id": "forgetful-gemsmith",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 82 (Python Intro module 2 pos 3, dungeon index 9) : cérémonie, objets à ramasser puis action finale précise + jalons W1 gate skills (architecture.json P1_CREATE-W1)",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Registre rights_registry.json — BASELINE_NO_ITEM_LEVEL_GRANTS_RECORDED (03/09) ; fondement : synthèse des 4 compétences du monde (CT.PRECISE_INSTRUCTIONS, CT.SEQUENCING, PROG.SYNTAX_LITERACY, DIG.PRIVACY_SAFETY — sans exposition, données fictives) sur un parcours cérémoniel original ; texte et univers 100 % WONDRA. Acte intragroupe en attente (WDR-052/053). | Décision Yassine 04/09 (WDR-055) : BENCC et WONDRA non constituées en entités juridiques distinctes — fondement BENCC-GROUP-MATERIAL = même ayant droit ; acte intragroupe sans objet à ce jour (réversible si incorporation)."
  },
  "maturity": "INTEGRATION_READY"
 }
};
