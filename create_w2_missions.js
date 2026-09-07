/* WONDRA — Missions CREATE Monde 2 « L'Atelier des états ».
   FICHIER GÉNÉRÉ — ne pas éditer à la main.
   Source canonique : curriculum/pedagogy_v3/phase4/content/create/create_w2_p*.json
   Régénérer : python3 curriculum/pedagogy_v3/phase4/scripts/build_create_bundle.py --world 2
   Format : window.CREATE_MISSIONS_W2 = { "create_w2_pN": {mission}, ... }; */
window.CREATE_MISSIONS_W2 = {
 "create_w2_p1": {
  "id": "CREATE.W2.P1",
  "route": "create",
  "world": 2,
  "position": 1,
  "phase": 1,
  "competency": "CT.PREDICT_TRACE",
  "age_band": "10-14",
  "role": "introduction",
  "i18n": {
   "fr": {
    "name": "Les trois portes scellées",
    "hook": "L'arrière-boutique est scellée. Ouvre les trois portes.",
    "instructions": "Choisis un cristal et glisse-le dans la lanterne. Présente la lanterne à une porte, puis ouvre les trois portes.",
    "hints": [
     "La fente ne garde qu'un seul cristal.",
     "Chaque porte attend le cristal qui porte son chiffre.",
     "Présente la lanterne à la porte 1, puis à la 2, puis à la 3."
    ],
    "victory": "Les trois portes sont ouvertes !",
    "celebration": "L'ancien cristal saute dehors : la fente ne garde qu'un cristal à la fois. C'est ça, une variable : elle ne garde qu'une valeur.",
    "parent_line": "Ce qu'il vient d'apprendre : une variable ne garde qu'une valeur à la fois — il a écrit son premier vrai programme."
   },
   "en": {
    "name": "The Three Sealed Doors",
    "hook": "The back room is sealed. Open the three doors.",
    "instructions": "Choose a crystal and place it in the lantern. Present the lantern to a door, then open all three doors.",
    "hints": [
     "The slot holds only one crystal.",
     "Each door waits for the crystal bearing its number.",
     "Present the lantern to door 1, then 2, then 3."
    ],
    "victory": "All three doors are open!",
    "celebration": "The old crystal jumps out: the slot holds only one crystal at a time. That's a variable: it holds only one value.",
    "parent_line": "What they just learned: a variable holds only one value at a time — they wrote their first real program."
   }
  },
  "engagement": {
   "first_action_seconds": 12,
   "duration_min": [
    3,
    6
   ],
   "mechanics": [
    "drag_crystal",
    "instant_world_response",
    "free_order_world_goal",
    "lumo_prediction_bet",
    "played_demo_after_two_failures",
    "free_experimentation"
   ],
   "celebration_type": "three_doors_light_and_lantern_reward",
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
   "item_id": "variables",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 1865 « Variables » (lignes 94940–94991) : variable comme mémoire nommée et progression concrète",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Droits confirmés : registre rights_registry.json — fondement BENCC (groupe Yassine), statut OWNED (décision Yassine 04/09, WDR-055) ; dossier BENCC/CodeCombat réglé par les avocats (WDR-056 04/09, WDR-052 abrogée). reuse_mode original_authoring — texte, consignes et univers 100 % WONDRA ; fondement documenté dans catalogue_ref."
  },
  "maturity": "EXPERT_REVIEWED",
  "playable": {
   "primitives": [
    "charge = <n>",
    "open_door(charge)"
   ],
   "scene": {
    "actors": [
     {
      "id": "lumo",
      "kind": "world_guide",
      "role": "opens_one_door_in_played_demo",
      "reacts_to": [
       "crystal_inserted",
       "previous_crystal_ejected",
       "door_opens",
       "door_already_open",
       "empty_slot_puff"
      ]
     }
    ],
    "props": [
     {
      "id": "lantern_one_slot",
      "kind": "lantern_slot",
      "capacity": 1,
      "visible_replacement": true
     },
     {
      "id": "crystal_reserve",
      "kind": "crystal_bin"
     },
     {
      "id": "crystal_1",
      "kind": "crystal",
      "value": 1
     },
     {
      "id": "crystal_2",
      "kind": "crystal",
      "value": 2
     },
     {
      "id": "crystal_3",
      "kind": "crystal",
      "value": 3
     },
     {
      "id": "door_1",
      "kind": "sealed_door",
      "value": 1
     },
     {
      "id": "door_2",
      "kind": "sealed_door",
      "value": 2
     },
     {
      "id": "door_3",
      "kind": "sealed_door",
      "value": 3
     }
    ],
    "renders": [
     {
      "state": "lantern_slot",
      "targets": [
       "lantern_one_slot"
      ],
      "visual_states": [
       {
        "when": {
         "op": "empty"
        },
        "appearance": "slot_empty"
       },
       {
        "when": {
         "op": "nonempty"
        },
        "appearance": "slot_charged",
        "motion": "crystal_insert_spring",
        "sound": "crystal_cling"
       }
      ]
     },
     {
      "state": "doors_open",
      "targets": [
       "door_1",
       "door_2",
       "door_3"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": 0
        },
        "appearance": "doors_sealed"
       },
       {
        "when": {
         "op": "gte",
         "value": 1
        },
        "appearance": "doors_partly_open",
        "motion": "warm_light_spill"
       },
       {
        "when": {
         "op": "eq",
         "value": 3
        },
        "appearance": "doors_all_open",
        "motion": "seal_break_and_open",
        "sound": "world_two_victory_three_notes"
       }
      ]
     },
     {
      "state": "door_1_open",
      "targets": [
       "door_1"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "door_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "door_open"
       }
      ]
     },
     {
      "state": "door_2_open",
      "targets": [
       "door_2"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "door_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "door_open"
       }
      ]
     },
     {
      "state": "door_3_open",
      "targets": [
       "door_3"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "door_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "door_open"
       }
      ]
     }
    ],
    "emits": {
     "charge = <n>": [
      "crystal_inserted",
      "previous_crystal_ejected"
     ],
     "open_door(charge)": [
      "door_opens",
      "door_already_open",
      "empty_slot_puff"
     ]
    }
   },
   "world_refusal": {
    "primitive": "open_door",
    "rejects": "literal_argument",
    "accepts": "variable_read",
    "message": {
     "fr": "La porte ne réagit qu'à la lanterne.",
     "en": "The door only reacts to the lantern."
    },
    "effect": "no_world_state_change"
   },
   "victory_condition": {
    "type": "state_equals",
    "property": "doors_open",
    "value": 3
   },
   "canonical_solution": [
    "charge = 1",
    "open_door(charge)",
    "charge = 2",
    "open_door(charge)",
    "charge = 3",
    "open_door(charge)"
   ],
   "misconception_fixtures": [
    {
     "id": "charges_without_presenting",
     "program": [
      "charge = 1",
      "charge = 2",
      "charge = 3"
     ],
     "misconception": {
      "fr": "Les cristaux s'empilent dans la lanterne et ouvrent les portes tout seuls.",
      "en": "The crystals pile up in the lantern and open the doors by themselves."
     },
     "expected_failure": "no_door_opened_without_presenting",
     "diagnostic_feedback": {
      "fr": "La lanterne brille, mais les trois portes restent scellées.",
      "en": "The lantern glows, but all three doors stay sealed."
     },
     "world_signal": {
      "fr": "Chaque nouveau cristal éjecte le précédent; aucune porte ne bouge.",
      "en": "Each new crystal ejects the previous one; no door moves."
     }
    },
    {
     "id": "replacement_before_presenting",
     "program": [
      "charge = 1",
      "charge = 2",
      "charge = 3",
      "open_door(charge)"
     ],
     "misconception": {
      "fr": "La lanterne garde les anciens cristaux même après les avoir éjectés.",
      "en": "The lantern keeps earlier crystals even after ejecting them."
     },
     "expected_failure": "only_last_crystal_door_opens",
     "diagnostic_feedback": {
      "fr": "Seule la porte du dernier cristal s'ouvre; les deux autres restent givrées.",
      "en": "Only the last crystal's door opens; the other two stay frosted."
     },
     "world_signal": {
      "fr": "Les deux premiers cristaux retombent dans le bac avec un cling visible.",
      "en": "The first two crystals fall back into the bin with a visible cling."
     }
    },
    {
     "id": "present_empty_slot",
     "program": [
      "open_door(charge)"
     ],
     "misconception": {
      "fr": "Une lanterne vide peut choisir une porte toute seule.",
      "en": "An empty lantern can choose a door by itself."
     },
     "expected_failure": "empty_slot_opens_nothing",
     "diagnostic_feedback": {
      "fr": "Lumo souffle dans la fente vide; aucune porte ne s'ouvre.",
      "en": "Lumo blows into the empty slot; no door opens."
     },
     "world_signal": {
      "fr": "La fente reste visiblement vide; un petit pfff sort et les trois sceaux restent intacts.",
      "en": "The slot stays visibly empty; a small puff appears and all three seals stay intact."
     }
    }
   ],
   "prediction": {
    "kind": "final_slot_value",
    "input": "drag_crystal",
    "options": [
     1,
     2,
     3,
     null
    ],
    "comparison_state": "lantern_slot",
    "prompt": {
     "fr": "D'après toi, quel cristal sera dans la fente à la fin ?",
     "en": "Which crystal do you think will be in the slot at the end?"
    },
    "optional": true,
    "pass_label": {
     "fr": "Je ne sais pas",
     "en": "I don't know"
    },
    "reward": {
     "kind": "badge",
     "badge": {
      "fr": "Devin",
      "en": "Seer"
     },
     "affects_stars": false,
     "success_message": {
      "fr": "Tu le savais !",
      "en": "You knew it!"
     }
    }
   },
   "help": {
    "after_failed_runs": 2,
    "kind": "played_demo",
    "program": [
     "charge = 1",
     "open_door(charge)"
    ],
    "opens_at_most": 1,
    "affects_stars": false,
    "silent": true
   },
   "star_policy": {
    "victory_stars": 2,
    "three_stars": [
     "victory",
     "elegance"
    ],
    "elegance_rule": "no_unnecessary_action_in_final_program",
    "free_attempts_affect_stars": false,
    "help_affects_stars": false,
    "prediction_affects_stars": false
   },
   "age_7_9_variant": {
    "input_mode": "blocks",
    "instructions": {
     "fr": "Choisis une carte CRISTAL et pose-la dans la lanterne. Ajoute une carte PRÉSENTE pour la montrer à une porte, puis ouvre les trois portes.",
     "en": "Choose a CRYSTAL card and place it in the lantern. Add a PRESENT card to show it to a door, then open all three doors."
    },
    "canonical_solution": [
     "CARD_CRYSTAL_1",
     "CARD_PRESENT",
     "CARD_CRYSTAL_2",
     "CARD_PRESENT",
     "CARD_CRYSTAL_3",
     "CARD_PRESENT"
    ],
    "notes": "Les cartes localisées pilotent la lanterne; même scène, même victoire et ordre libre.",
    "card_mapping": [
     {
      "card_label": "crystal_1",
      "value": "charge = 1",
      "mode": "blocks"
     },
     {
      "card_label": "crystal_2",
      "value": "charge = 2",
      "mode": "blocks"
     },
     {
      "card_label": "crystal_3",
      "value": "charge = 3",
      "mode": "blocks"
     },
     {
      "card_label": "present_lantern",
      "value": "open_door(charge)",
      "mode": "blocks"
     }
    ]
   }
  }
 },
 "create_w2_p2": {
  "id": "CREATE.W2.P2",
  "route": "create",
  "world": 2,
  "position": 2,
  "phase": 1,
  "competency": "PROG.DATA_TYPES",
  "age_band": "10-14",
  "role": "worked_example",
  "i18n": {
   "fr": {
    "name": "La salle des trois tiroirs",
    "hook": "L'arrière-boutique cache un meuble à trois tiroirs. Ouvre-les tous !",
    "instructions": "Derrière les trois portes de l'atelier, Lumo te fait découvrir sa salle des tiroirs. Chaque tiroir n'accepte qu'une sorte de valeur : les nombres, les mots et les réponses oui/non. Prends un trésor du bac, glisse-le dans la fente de la lanterne, puis présente la lanterne aux tiroirs. Regarde lequel s'ouvre : il a reconnu la sorte de ton trésor. À toi d'ouvrir les trois tiroirs.",
    "hints": [
     "La fente ne garde qu'un seul trésor : le trésor suivant éjecte le précédent.",
     "L'enseigne de chaque tiroir annonce ce qu'il attend : 1-2-3 pour compter, A-B-C pour les mots, OUI-NON pour les réponses.",
     "Le trésor qui porte un mot entre guillemets est un texte : il ouvre le tiroir des mots.",
     "Après deux essais, Lumo peut te montrer comment ranger un trésor, une seule fois, devant toi."
    ],
    "victory": "Les trois tiroirs sont ouverts, chacun par la bonne sorte de valeur !",
    "celebration": "Le 4 a ouvert le tiroir des nombres, le mot NORTH celui des mots, et True celui des réponses oui/non. Chaque trésor connaît sa sorte : les valeurs ne sont pas toutes pareilles, et ta lanterne sait les reconnaître. Reviens demain : la livraison apportera de nouveaux trésors à ranger.",
    "parent_line": "Ce qu'il vient d'apprendre : un texte entre guillemets, un nombre et une valeur oui/non sont des types différents — il a rangé chaque valeur dans le tiroir de sa sorte."
   },
   "en": {
    "name": "The Room of the Three Drawers",
    "hook": "The back room hides a three-drawer cabinet. Open them all!",
    "instructions": "Behind the workshop doors, Lumo shows you the drawer room. Each drawer accepts only one kind of value: numbers, words and yes/no answers. Take a treasure from the tray, slide it into the lantern slot, then present the lantern to the drawers. Watch which one opens: it recognized the kind of your treasure. Now open all three drawers.",
    "hints": [
     "The slot holds only one treasure: the next treasure ejects the previous one.",
     "Each drawer's sign tells what it waits for: 1-2-3 for counting, A-B-C for words, YES/NO for answers.",
     "The treasure carrying a word between quotation marks is text: it opens the words drawer.",
     "After two attempts, Lumo can show you how to sort one treasure, just once, in front of you."
    ],
    "victory": "All three drawers are open, each with the right kind of value!",
    "celebration": "4 opened the numbers drawer, the word NORTH opened the words drawer, and True opened the yes/no drawer. Every treasure knows its kind: values are not all the same, and your lantern can tell them apart. Come back tomorrow: the delivery will bring new treasures to sort.",
    "parent_line": "What they just learned: text between quotation marks, a number and a yes/no value are different types — they sorted each value into the drawer of its kind."
   }
  },
  "engagement": {
   "first_action_seconds": 12,
   "duration_min": [
    3,
    6
   ],
   "mechanics": [
    "drag_value_token",
    "instant_world_response",
    "free_order_world_goal",
    "typed_drawer_matching",
    "played_demo_after_two_failures",
    "free_experimentation"
   ],
   "celebration_type": "three_drawers_light_and_handle_reward",
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
   "item_id": "type-variables",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 1870 « Type Variables » (lignes 95187–95238) : distinguer une chaîne des autres valeurs stockées (4 nombre, \"NORTH\" texte, True oui/non)",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Droits confirmés : registre rights_registry.json — fondement BENCC (groupe Yassine), statut OWNED (décision Yassine 04/09, WDR-055) ; dossier BENCC/CodeCombat réglé par les avocats (WDR-056 04/09, WDR-052 abrogée). reuse_mode original_authoring — texte, consignes et univers 100 % WONDRA ; ré-authoring W2.P2 du 06/09 (WDR-069, extension valeurs typées) ; fondement documenté dans catalogue_ref."
  },
  "maturity": "EXPERT_REVIEWED",
  "playable": {
   "primitives": [
    "store = <value>",
    "deposit(store)"
   ],
   "scene": {
    "actors": [
     {
      "id": "lumo",
      "kind": "world_guide",
      "role": "plays_one_drawer_demo_in_help",
      "reacts_to": [
       "crystal_inserted",
       "previous_crystal_ejected",
       "drawer_opens",
       "drawer_already_open",
       "wrong_type_puff",
       "empty_slot_puff"
      ]
     }
    ],
    "props": [
     {
      "id": "lantern_one_slot",
      "kind": "lantern_slot",
      "capacity": 1,
      "visible_replacement": true
     },
     {
      "id": "value_reserve",
      "kind": "value_bin"
     },
     {
      "id": "token_number",
      "kind": "typed_token",
      "value": 4
     },
     {
      "id": "token_word",
      "kind": "typed_token",
      "value": "NORTH"
     },
     {
      "id": "token_bool",
      "kind": "typed_token",
      "value": true
     },
     {
      "id": "drawer_num",
      "kind": "typed_drawer",
      "accepts": "int"
     },
     {
      "id": "drawer_word",
      "kind": "typed_drawer",
      "accepts": "str"
     },
     {
      "id": "drawer_bool",
      "kind": "typed_drawer",
      "accepts": "bool"
     }
    ],
    "renders": [
     {
      "state": "lantern_slot",
      "targets": [
       "lantern_one_slot"
      ],
      "visual_states": [
       {
        "when": {
         "op": "empty"
        },
        "appearance": "slot_empty"
       },
       {
        "when": {
         "op": "nonempty"
        },
        "appearance": "slot_charged",
        "motion": "crystal_insert_spring",
        "sound": "crystal_cling"
       }
      ]
     },
     {
      "state": "drawers_open",
      "targets": [
       "drawer_num",
       "drawer_word",
       "drawer_bool"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": 0
        },
        "appearance": "drawers_sealed"
       },
       {
        "when": {
         "op": "gte",
         "value": 1
        },
        "appearance": "drawers_partly_open",
        "motion": "warm_light_spill"
       },
       {
        "when": {
         "op": "eq",
         "value": 3
        },
        "appearance": "drawers_all_open",
        "motion": "seal_break_and_open",
        "sound": "world_two_victory_three_notes"
       }
      ]
     },
     {
      "state": "drawer_num_open",
      "targets": [
       "drawer_num"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "drawer_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "drawer_open"
       }
      ]
     },
     {
      "state": "drawer_word_open",
      "targets": [
       "drawer_word"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "drawer_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "drawer_open"
       }
      ]
     },
     {
      "state": "drawer_bool_open",
      "targets": [
       "drawer_bool"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "drawer_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "drawer_open"
       }
      ]
     }
    ],
    "emits": {
     "store = <value>": [
      "crystal_inserted",
      "previous_crystal_ejected"
     ],
     "deposit(store)": [
      "drawer_opens",
      "drawer_already_open",
      "wrong_type_puff",
      "empty_slot_puff"
     ]
    }
   },
   "world_refusal": {
    "primitive": "deposit",
    "rejects": "literal_argument",
    "accepts": "variable_read",
    "message": {
     "fr": "Les tiroirs ne réagissent qu'au trésor chargé dans la fente.",
     "en": "The drawers only react to the treasure loaded in the slot."
    },
    "effect": "no_world_state_change"
   },
   "victory_condition": {
    "type": "state_equals",
    "property": "drawers_open",
    "value": 3
   },
   "canonical_solution": [
    "store = 4",
    "deposit(store)",
    "store = \"NORTH\"",
    "deposit(store)",
    "store = True",
    "deposit(store)"
   ],
   "misconception_fixtures": [
    {
     "id": "quotes-the-number",
     "program": [
      "store = \"4\"",
      "deposit(store)",
      "store = \"NORTH\"",
      "deposit(store)",
      "store = True",
      "deposit(store)"
     ],
     "misconception": {
      "fr": "Le 4 entouré de guillemets reste un nombre.",
      "en": "The 4 surrounded by quotation marks is still a number."
     },
     "expected_failure": "quoted_number_opens_word_drawer",
     "diagnostic_feedback": {
      "fr": "Avec des guillemets, 4 est devenu un texte : il ouvre le tiroir des mots, pas celui des nombres.",
      "en": "With quotation marks, 4 became text: it opens the words drawer, not the numbers drawer."
     },
     "world_signal": {
      "fr": "Le tiroir des nombres reste fermé ; c'est le tiroir des mots qui s'ouvre pour « 4 ».",
      "en": "The numbers drawer stays closed; it is the words drawer that opens for \"4\"."
     }
    },
    {
     "id": "deposits-literals-without-slot",
     "program": [
      "deposit(4)",
      "deposit(\"NORTH\")",
      "deposit(True)"
     ],
     "misconception": {
      "fr": "On peut présenter un trésor directement aux tiroirs, sans le charger dans la fente.",
      "en": "A treasure can be presented straight to the drawers without loading it into the slot."
     },
     "expected_failure": "world_refusal_literal_argument",
     "diagnostic_feedback": {
      "fr": "Les tiroirs n'ouvrent que pour la fente : charge d'abord le trésor, puis présente la lanterne.",
      "en": "The drawers only open for the slot: load the treasure first, then present the lantern."
     },
     "world_signal": {
      "fr": "Lumo secoue la tête : les tiroirs ignorent le trésor présenté à la main, aucun ne bouge.",
      "en": "Lumo shakes his head: the drawers ignore a treasure presented by hand; none of them moves."
     }
    },
    {
     "id": "loads-without-depositing",
     "program": [
      "store = 4",
      "store = \"NORTH\"",
      "store = True"
     ],
     "misconception": {
      "fr": "Charger les trois trésors dans la fente ouvre les tiroirs tout seuls.",
      "en": "Loading all three treasures into the slot opens the drawers by itself."
     },
     "expected_failure": "no_drawer_opened_without_presenting",
     "diagnostic_feedback": {
      "fr": "La fente ne garde que le dernier trésor ; présente-la aux tiroirs après chaque chargement.",
      "en": "The slot only keeps the last treasure; present it to the drawers after every load."
     },
     "world_signal": {
      "fr": "Chaque nouveau trésor éjecte le précédent avec un cling ; aucun tiroir ne bouge.",
      "en": "Each new treasure ejects the previous one with a cling; no drawer moves."
     }
    },
    {
     "id": "presents-same-value-twice",
     "program": [
      "store = 4",
      "deposit(store)",
      "deposit(store)"
     ],
     "misconception": {
      "fr": "Présenter plusieurs fois le même trésor peut ouvrir plusieurs tiroirs.",
      "en": "Presenting the same treasure several times can open several drawers."
     },
     "expected_failure": "same_value_opens_one_drawer_only",
     "diagnostic_feedback": {
      "fr": "Le tiroir des nombres est déjà ouvert ; charge un AUTRE trésor pour ouvrir les suivants.",
      "en": "The numbers drawer is already open; load a DIFFERENT treasure to open the next ones."
     },
     "world_signal": {
      "fr": "Le tiroir déjà ouvert tinte doucement ; rien de nouveau ne s'ouvre.",
      "en": "The open drawer chimes softly; nothing new opens."
     }
    }
   ],
   "help": {
    "after_failed_runs": 2,
    "kind": "played_demo",
    "program": [
     "store = 4",
     "deposit(store)"
    ],
    "opens_at_most": 1,
    "affects_stars": false,
    "silent": true
   },
   "star_policy": {
    "victory_stars": 2,
    "three_stars": [
     "victory",
     "elegance"
    ],
    "elegance_rule": "no_unnecessary_action_in_final_program",
    "free_attempts_affect_stars": false,
    "help_affects_stars": false,
    "prediction_affects_stars": false
   },
   "age_7_9_variant": {
    "input_mode": "blocks",
    "instructions": {
     "fr": "Choisis la carte d'un trésor et pose-la dans la fente de la lanterne. Ajoute une carte PRÉSENTE : le tiroir de la bonne sorte s'ouvre. Fais-le pour les trois trésors.",
     "en": "Choose the card of a treasure and place it in the lantern slot. Add a PRESENT card: the drawer of the right kind opens. Do it for all three treasures."
    },
    "canonical_solution": [
     "CARD_VALUE_4",
     "CARD_PRESENT",
     "CARD_VALUE_NORTH",
     "CARD_PRESENT",
     "CARD_VALUE_TRUE",
     "CARD_PRESENT"
    ],
    "notes": "Les cartes montrent des trésors localisés (4, NORTH, True) ; mêmes scène, victoire et ordre libre que le mode 10-14.",
    "card_mapping": [
     {
      "card_label": "value_4",
      "value": "store = 4",
      "mode": "blocks"
     },
     {
      "card_label": "value_north",
      "value": "store = \"NORTH\"",
      "mode": "blocks"
     },
     {
      "card_label": "value_true",
      "value": "store = True",
      "mode": "blocks"
     },
     {
      "card_label": "present_slot",
      "value": "deposit(store)",
      "mode": "blocks"
     }
    ]
   }
  }
 },
 "create_w2_p3": {
  "id": "CREATE.W2.P3",
  "route": "create",
  "world": 2,
  "position": 3,
  "phase": 1,
  "competency": "PROG.FUNCTION_CALLS",
  "age_band": "10-14",
  "role": "guided_practice",
  "i18n": {
   "fr": {
    "name": "La presse et la noria",
    "hook": "La presse et la noria attendent leur cristal.",
    "instructions": "Choisis un cristal et glisse-le dans la lanterne, puis présente-la à une machine. Règle la presse et la noria : quand tu auras fini, la noria doit encore tourner.",
    "hints": [
     "Chaque machine porte le numéro du cristal qui la fait marcher.",
     "La noria s'arrête dès qu'on retire son cristal de la fente.",
     "Après deux essais, Lumo peut te montrer sur une machine."
    ],
    "victory": "La presse ronronne et la noria tourne, avec son cristal dans la fente.",
    "celebration": "Chaque appel lit la lanterne au moment où il s'exécute : avec le cristal 1, la presse s'ouvre ; avec le cristal 2, la noria tourne. Changer la valeur change l'effet : c'est ça, un appel avec des valeurs.",
    "parent_line": "Ce qu'il vient d'apprendre : les valeurs passées à un appel décident de son effet — il a réglé deux machines avec deux valeurs différentes, et laissé la bonne dans la fente."
   },
   "en": {
    "name": "The Press and the Waterwheel",
    "hook": "The press and the waterwheel are waiting for their crystal.",
    "instructions": "Choose a crystal and slide it into the lantern, then present it to a machine. Set the press and the waterwheel: when you are done, the waterwheel must still be turning.",
    "hints": [
     "Each machine shows the number of the crystal that powers it.",
     "The waterwheel stops as soon as its crystal is taken out of the slot.",
     "After two tries, Lumo can show you on one machine."
    ],
    "victory": "The press hums and the waterwheel turns, with its crystal in the slot.",
    "celebration": "Each call reads the lantern when it runs: with crystal 1 the press opens, with crystal 2 the waterwheel turns. Changing the value changes the effect: that is a call with values.",
    "parent_line": "What they just learned: the values passed to a call decide its effect — they set two machines with two different values and left the right one in the slot."
   }
  },
  "engagement": {
   "first_action_seconds": 15,
   "duration_min": [
    3,
    6
   ],
   "mechanics": [
    "drag_crystal",
    "instant_world_response",
    "two_machine_goal",
    "single_argument_change",
    "keep_machine_running_goal",
    "lumo_prediction_bet",
    "played_demo_after_two_failures"
   ],
   "celebration_type": "press_ready_noria_turning_star_reward",
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
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 2 « Course: Winding Trail » (lignes 121–210) : passer des valeurs à un appel et observer leur effet (le mot/la valeur qu'on met change ce qui se passe)",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Droits confirmés : registre rights_registry.json — fondement BENCC (groupe Yassine), statut OWNED (décision Yassine 04/09, WDR-055) ; dossier BENCC/CodeCombat réglé par les avocats (WDR-056 04/09, WDR-052 abrogée). reuse_mode original_authoring — texte, consignes et univers 100 % WONDRA ; fondement documenté dans catalogue_ref."
  },
  "maturity": "EXPERT_REVIEWED",
  "playable": {
   "primitives": [
    "charge = <n>",
    "open_door(charge)"
   ],
   "scene": {
    "actors": [
     {
      "id": "lumo",
      "kind": "world_guide",
      "role": "opens_one_machine_in_played_demo",
      "reacts_to": [
       "crystal_inserted",
       "previous_crystal_ejected",
       "door_opens",
       "door_already_open",
       "empty_slot_puff"
      ]
     }
    ],
    "props": [
     {
      "id": "lantern_one_slot",
      "kind": "lantern_slot",
      "capacity": 1,
      "visible_replacement": true
     },
     {
      "id": "crystal_reserve",
      "kind": "crystal_bin"
     },
     {
      "id": "crystal_1",
      "kind": "crystal",
      "value": 1
     },
     {
      "id": "crystal_2",
      "kind": "crystal",
      "value": 2
     },
     {
      "id": "crystal_3",
      "kind": "crystal",
      "value": 3
     },
     {
      "id": "door_1",
      "kind": "sealed_door",
      "value": 1
     },
     {
      "id": "door_2",
      "kind": "sealed_door",
      "value": 2
     }
    ],
    "renders": [
     {
      "state": "lantern_slot",
      "targets": [
       "lantern_one_slot"
      ],
      "visual_states": [
       {
        "when": {
         "op": "empty"
        },
        "appearance": "slot_empty"
       },
       {
        "when": {
         "op": "nonempty"
        },
        "appearance": "slot_charged",
        "motion": "crystal_insert_spring",
        "sound": "crystal_cling"
       }
      ]
     },
     {
      "state": "doors_open",
      "targets": [
       "door_1",
       "door_2"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": 0
        },
        "appearance": "doors_sealed"
       },
       {
        "when": {
         "op": "gte",
         "value": 1
        },
        "appearance": "doors_partly_open",
        "motion": "warm_light_spill"
       },
       {
        "when": {
         "op": "eq",
         "value": 2
        },
        "appearance": "doors_all_open",
        "motion": "seal_break_and_open",
        "sound": "world_two_victory_three_notes"
       }
      ]
     },
     {
      "state": "door_1_open",
      "targets": [
       "door_1"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "door_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "door_open"
       }
      ]
     },
     {
      "state": "door_2_open",
      "targets": [
       "door_2"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "door_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "door_open"
       }
      ]
     }
    ],
    "emits": {
     "charge = <n>": [
      "crystal_inserted",
      "previous_crystal_ejected"
     ],
     "open_door(charge)": [
      "door_opens",
      "door_already_open",
      "empty_slot_puff"
     ]
    }
   },
   "world_refusal": {
    "primitive": "open_door",
    "rejects": "literal_argument",
    "accepts": "variable_read",
    "message": {
     "fr": "Les machines ne réagissent qu'à la lanterne.",
     "en": "The machines only react to the lantern."
    },
    "effect": "no_world_state_change"
   },
   "victory_condition": {
    "type": "all_of",
    "rules": [
     {
      "type": "state_equals",
      "property": "door_1_open",
      "value": true
     },
     {
      "type": "state_equals",
      "property": "door_2_open",
      "value": true
     },
     {
      "type": "state_equals",
      "property": "lantern_slot",
      "value": 2
     }
    ]
   },
   "canonical_solution": [
    "charge = 1",
    "open_door(charge)",
    "charge = 2",
    "open_door(charge)"
   ],
   "misconception_fixtures": [
    {
     "id": "noria-first-then-press",
     "program": [
      "charge = 2",
      "open_door(charge)",
      "charge = 1",
      "open_door(charge)"
     ],
     "misconception": {
      "fr": "La noria continue de tourner même quand on remplace son cristal.",
      "en": "The waterwheel keeps turning even when its crystal is replaced."
     },
     "expected_failure": "lantern_slot:expected=2:actual=1",
     "diagnostic_feedback": {
      "fr": "La noria s'est arrêtée quand le cristal 1 a remplacé le cristal 2 : remets le 2 à la fin.",
      "en": "The waterwheel stopped when crystal 1 replaced crystal 2: put 2 back at the end."
     },
     "world_signal": {
      "fr": "La roue s'arrête ; le cristal 2 retombe dans le bac avec un cling.",
      "en": "The wheel stops; crystal 2 falls back into the bin with a cling."
     }
    },
    {
     "id": "wrong-crystal-opens-nothing",
     "program": [
      "charge = 3",
      "open_door(charge)"
     ],
     "misconception": {
      "fr": "N'importe quel cristal peut régler une machine.",
      "en": "Any crystal can set a machine."
     },
     "expected_failure": "no_machine_opens_with_crystal_3",
     "diagnostic_feedback": {
      "fr": "Aucune machine de cette pièce ne porte le chiffre 3 : essaie les cristaux des plaques.",
      "en": "No machine in this room bears the number 3: try the crystals shown on the plaques."
     },
     "world_signal": {
      "fr": "Un petit pfff sort de la lanterne ; les deux machines restent éteintes.",
      "en": "A small puff comes out of the lantern; both machines stay off."
     }
    },
    {
     "id": "refuels-with-crystal-3",
     "program": [
      "charge = 1",
      "open_door(charge)",
      "charge = 2",
      "open_door(charge)",
      "charge = 3"
     ],
     "misconception": {
      "fr": "La noria tourne avec n'importe quel cristal dans la fente.",
      "en": "The waterwheel turns with any crystal in the slot."
     },
     "expected_failure": "lantern_slot:expected=2:actual=3",
     "diagnostic_feedback": {
      "fr": "La noria s'est arrêtée : le cristal 3 a remplacé le cristal 2. Remets le 2 à la fin.",
      "en": "The waterwheel stopped: crystal 3 replaced crystal 2. Put 2 back at the end."
     },
     "world_signal": {
      "fr": "La roue ralentit et s'arrête quand le cristal 3 remplace le 2.",
      "en": "The wheel slows down and stops when crystal 3 replaces 2."
     }
    },
    {
     "id": "presents-empty-slot",
     "program": [
      "open_door(charge)"
     ],
     "misconception": {
      "fr": "Une lanterne vide peut régler une machine toute seule.",
      "en": "An empty lantern can set a machine by itself."
     },
     "expected_failure": "empty_slot_opens_nothing",
     "diagnostic_feedback": {
      "fr": "Lumo souffle dans la fente vide ; aucune machine ne bouge.",
      "en": "Lumo blows into the empty slot; no machine moves."
     },
     "world_signal": {
      "fr": "La fente reste vide ; un petit pfff sort ; les machines restent éteintes.",
      "en": "The slot stays empty; a small puff appears; the machines stay off."
     }
    },
    {
     "id": "presents-hard-written-number",
     "program": [
      "charge = 1",
      "open_door(1)"
     ],
     "misconception": {
      "fr": "La machine lit le nombre écrit en dur, pas la valeur de la fente.",
      "en": "The machine reads the hard-written number, not the value in the slot."
     },
     "expected_failure": "world_refusal_literal_argument",
     "diagnostic_feedback": {
      "fr": "Les machines ne réagissent qu'à la lanterne : présente charge, pas un nombre écrit en dur.",
      "en": "The machines only react to the lantern: present charge, not a hard-written number."
     },
     "world_signal": {
      "fr": "Lumo secoue la tête ; la machine ignore le 1 écrit en dur ; rien ne bouge.",
      "en": "Lumo shakes his head; the machine ignores the hard-written 1; nothing moves."
     }
    }
   ],
   "prediction": {
    "kind": "final_slot_value",
    "input": "drag_crystal",
    "options": [
     1,
     2,
     3,
     null
    ],
    "comparison_state": "lantern_slot",
    "prompt": {
     "fr": "D'après toi, quel cristal sera dans la fente quand la noria tournera ?",
     "en": "Which crystal do you think will be in the slot while the waterwheel turns?"
    },
    "optional": true,
    "pass_label": {
     "fr": "Je ne sais pas",
     "en": "I don't know"
    },
    "reward": {
     "kind": "badge",
     "badge": {
      "fr": "Futé",
      "en": "Clever"
     },
     "affects_stars": false,
     "success_message": {
      "fr": "Tu le savais !",
      "en": "You knew it!"
     }
    }
   },
   "help": {
    "after_failed_runs": 2,
    "kind": "played_demo",
    "program": [
     "charge = 1",
     "open_door(charge)"
    ],
    "opens_at_most": 1,
    "affects_stars": false,
    "silent": true
   },
   "star_policy": {
    "victory_stars": 2,
    "three_stars": [
     "victory",
     "elegance"
    ],
    "elegance_rule": "no_unnecessary_action_in_final_program",
    "free_attempts_affect_stars": false,
    "help_affects_stars": false,
    "prediction_affects_stars": false
   },
   "age_7_9_variant": {
    "input_mode": "blocks",
    "instructions": {
     "fr": "Choisis une carte CRISTAL et pose-la dans la lanterne. Ajoute une carte PRÉSENTE pour la montrer à une machine. Règle la presse, puis la noria : à la fin, la noria doit continuer de tourner.",
     "en": "Choose a CRYSTAL card and place it in the lantern. Add a PRESENT card to show it to a machine. Set the press, then the waterwheel: at the end, the waterwheel must keep turning."
    },
    "canonical_solution": [
     "CARD_CRYSTAL_1",
     "CARD_PRESENT",
     "CARD_CRYSTAL_2",
     "CARD_PRESENT"
    ],
    "notes": "Les cartes localisées pilotent la lanterne (charge = n) et la présentation (open_door(charge)) ; même scène et même victoire que le mode 10-14. Le cristal 3 n'est pas proposé en cartes 7-9 : les deux machines suffisent, l'erreur 3 reste possible en 10-14.",
    "card_mapping": [
     {
      "card_label": "crystal_1",
      "value": "charge = 1",
      "mode": "blocks"
     },
     {
      "card_label": "crystal_2",
      "value": "charge = 2",
      "mode": "blocks"
     },
     {
      "card_label": "present_lantern",
      "value": "open_door(charge)",
      "mode": "blocks"
     }
    ]
   }
  }
 },
 "create_w2_p4": {
  "id": "CREATE.W2.P4",
  "route": "create",
  "world": 2,
  "position": 4,
  "phase": 1,
  "competency": "PROG.VARIABLES_ASSIGNMENT",
  "age_band": "10-14",
  "role": "independent_practice",
  "i18n": {
   "fr": {
    "name": "La clé du jour",
    "hook": "Deux portes ferment la terrasse. Ouvre-les quand le jour tourne.",
    "instructions": "Chaque porte scellée attend le cristal qui porte son chiffre. Range la valeur du jour dans la lanterne avec `store = ...`, puis présente-la à une porte avec `open_door(store)`. Quand le jour tourne, range la nouvelle valeur sous le même nom, puis présente encore.",
    "hints": [
     "Observe les deux portes et les cristaux du bac : chaque porte attend le sien.",
     "La lanterne ne garde qu'une valeur à la fois : la nouvelle chasse l'ancienne. Présente après chaque rangement.",
     "Le matin vaut un cristal, le soir vaut l'autre : garde le même nom `store`, change seulement la valeur, et présente après chaque changement."
    ],
    "victory": "Les deux portes de la terrasse sont ouvertes !",
    "celebration": "Le nom est resté le même, la valeur a changé : la lanterne a porté le chiffre du matin puis celui du soir, et chaque porte s'est ouverte à son heure. C'est ça, une variable : un nom qui garde une valeur et qui peut en changer. Demain, l'enseigne du toit t'attend.",
    "parent_line": "Ce qu'il vient d'apprendre : donner un nom à une valeur, puis ranger une nouvelle valeur sous le même nom — une variable garde une valeur et peut en changer."
   },
   "en": {
    "name": "The Day's Key",
    "hook": "Two doors seal the terrace. Open them when the day turns.",
    "instructions": "Each sealed door waits for the crystal bearing its number. Store the day's value in the lantern with `store = ...`, then show the lantern to a door with `open_door(store)`. When the day turns, store the new value under the same name, then show it again.",
    "hints": [
     "Look at the two doors and the crystals in the bin: each door waits for its own.",
     "The lantern holds only one value at a time: the new one pushes the old one out. Show the lantern after every store.",
     "The morning holds one crystal, the evening holds the other: keep the same name `store`, change only the value, and show the lantern after each change."
    ],
    "victory": "Both terrace doors are open!",
    "celebration": "The name stayed the same; the value changed. The lantern carried the morning number, then the evening number, and each door opened at its own hour. That's a variable: a name that holds one value and can hold a new one. Tomorrow, the rooftop sign is waiting for you.",
    "parent_line": "What they just learned: give a value a name, then store a new value under the same name — a variable holds one value and can change."
   }
  },
  "engagement": {
   "first_action_seconds": 15,
   "duration_min": [
    5,
    9
   ],
   "mechanics": [
    "drag_crystal",
    "instant_world_response",
    "same_name_new_value",
    "visible_value_change",
    "free_order_world_goal",
    "free_experimentation",
    "played_demo_after_two_failures"
   ],
   "celebration_type": "terrace_doors_open_and_terrace_lit",
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
   "item_id": "known-enemy",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 103 « Known Enemy » (lignes 9116–9235) : nommer, stocker et réutiliser une valeur dans un appel",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Droits confirmés : registre rights_registry.json — fondement BENCC (groupe Yassine), statut OWNED (décision Yassine 04/09, WDR-055) ; dossier BENCC/CodeCombat réglé par les avocats (WDR-056 04/09, WDR-052 abrogée). reuse_mode original_authoring — texte, consignes et univers 100 % WONDRA ; fondement documenté dans catalogue_ref."
  },
  "maturity": "EXPERT_REVIEWED",
  "playable": {
   "primitives": [
    "store = <value>",
    "open_door(store)"
   ],
   "scene": {
    "actors": [
     {
      "id": "lumo",
      "kind": "world_guide",
      "role": "opens_one_door_in_played_demo",
      "reacts_to": [
       "crystal_inserted",
       "previous_crystal_ejected",
       "door_opens",
       "door_already_open",
       "empty_slot_puff"
      ]
     }
    ],
    "props": [
     {
      "id": "lantern_one_slot",
      "kind": "lantern_slot",
      "capacity": 1,
      "visible_replacement": true
     },
     {
      "id": "crystal_reserve",
      "kind": "crystal_bin"
     },
     {
      "id": "crystal_1",
      "kind": "crystal",
      "value": 1
     },
     {
      "id": "crystal_3",
      "kind": "crystal",
      "value": 3
     },
     {
      "id": "terrace_door_1",
      "kind": "sealed_door",
      "value": 1
     },
     {
      "id": "terrace_door_3",
      "kind": "sealed_door",
      "value": 3
     }
    ],
    "renders": [
     {
      "state": "lantern_slot",
      "targets": [
       "lantern_one_slot"
      ],
      "visual_states": [
       {
        "when": {
         "op": "empty"
        },
        "appearance": "slot_empty"
       },
       {
        "when": {
         "op": "nonempty"
        },
        "appearance": "slot_charged",
        "motion": "crystal_insert_spring",
        "sound": "crystal_cling"
       }
      ]
     },
     {
      "state": "doors_open",
      "targets": [
       "terrace_door_1",
       "terrace_door_3"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": 0
        },
        "appearance": "doors_sealed"
       },
       {
        "when": {
         "op": "gte",
         "value": 1
        },
        "appearance": "doors_partly_open",
        "motion": "warm_light_spill"
       },
       {
        "when": {
         "op": "eq",
         "value": 2
        },
        "appearance": "doors_all_open",
        "motion": "seal_break_and_open",
        "sound": "world_two_victory_three_notes"
       }
      ]
     },
     {
      "state": "door_1_open",
      "targets": [
       "terrace_door_1"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "door_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "door_open"
       }
      ]
     },
     {
      "state": "door_3_open",
      "targets": [
       "terrace_door_3"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "door_sealed"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "door_open"
       }
      ]
     }
    ],
    "emits": {
     "store = <value>": [
      "crystal_inserted",
      "previous_crystal_ejected"
     ],
     "open_door(store)": [
      "door_opens",
      "door_already_open",
      "empty_slot_puff"
     ]
    }
   },
   "world_refusal": {
    "primitive": "open_door",
    "rejects": "literal_argument",
    "accepts": "variable_read",
    "message": {
     "fr": "La porte ne réagit qu'à la lanterne.",
     "en": "The door only reacts to the lantern."
    },
    "effect": "no_world_state_change"
   },
   "victory_condition": {
    "type": "all_of",
    "rules": [
     {
      "type": "state_equals",
      "property": "door_1_open",
      "value": true
     },
     {
      "type": "state_equals",
      "property": "door_3_open",
      "value": true
     }
    ]
   },
   "canonical_solution": [
    "store = 1",
    "open_door(store)",
    "store = 3",
    "open_door(store)"
   ],
   "misconception_fixtures": [
    {
     "id": "writes-numbers-directly",
     "program": [
      "open_door(1)",
      "open_door(3)"
     ],
     "misconception": {
      "fr": "On peut écrire les nombres directement dans l'appel, sans les ranger sous un nom.",
      "en": "You can write the numbers straight into the call, without storing them under a name."
     },
     "expected_failure": "world_refuses_literal_numbers",
     "diagnostic_feedback": {
      "fr": "Les portes ne réagissent pas aux nombres écrits directement : range d'abord la valeur sous un nom dans la lanterne.",
      "en": "The doors do not react to numbers written directly: first store the value under a name in the lantern."
     },
     "world_signal": {
      "fr": "Les deux portes restent scellées; la lanterne reste vide et Lumo secoue la tête.",
      "en": "Both doors stay sealed; the lantern stays empty and Lumo shakes his head."
     }
    },
    {
     "id": "stores-then-presents-once",
     "program": [
      "store = 1",
      "store = 3",
      "open_door(store)"
     ],
     "misconception": {
      "fr": "La lanterne se souvient des deux valeurs à la fois et les présente ensemble.",
      "en": "The lantern remembers both values at once and presents them together."
     },
     "expected_failure": "only_last_value_door_opens",
     "diagnostic_feedback": {
      "fr": "Quand tu ranges 3, le 1 saute hors de la lanterne : présente la lanterne après chaque rangement.",
      "en": "When you store 3, the 1 jumps out of the lantern: show the lantern after each store."
     },
     "world_signal": {
      "fr": "Le cristal 1 retombe dans le bac avec un cling; seule la porte du soir s'ouvre.",
      "en": "Crystal 1 falls back into the bin with a cling; only the evening door opens."
     }
    },
    {
     "id": "presents-twice-without-new-value",
     "program": [
      "store = 1",
      "open_door(store)",
      "open_door(store)"
     ],
     "misconception": {
      "fr": "Présenter deux fois la même valeur ouvre les deux portes.",
      "en": "Showing the same value twice opens both doors."
     },
     "expected_failure": "same_value_opens_one_door_only",
     "diagnostic_feedback": {
      "fr": "La porte du matin tinte : déjà ouverte. L'autre attend une autre valeur : quand le jour tourne, range la nouvelle.",
      "en": "The morning door rings softly: already open. The other one waits for another value: when the day turns, store the new one."
     },
     "world_signal": {
      "fr": "La porte du matin reste ouverte et tinte; la porte du soir reste scellée et son sceau pulse.",
      "en": "The morning door stays open and rings; the evening door stays sealed and its seal pulses."
     }
    },
    {
     "id": "presents-empty-lantern",
     "program": [
      "open_door(store)"
     ],
     "misconception": {
      "fr": "Une lanterne vide peut ouvrir une porte toute seule.",
      "en": "An empty lantern can open a door by itself."
     },
     "expected_failure": "empty_slot_opens_nothing",
     "diagnostic_feedback": {
      "fr": "Lumo souffle dans la fente vide : range d'abord le cristal du jour, puis présente.",
      "en": "Lumo blows into the empty slot: first store the day's crystal, then present."
     },
     "world_signal": {
      "fr": "La fente reste visiblement vide; un petit pfff sort et les deux sceaux restent intacts.",
      "en": "The slot stays visibly empty; a small puff appears and both seals stay intact."
     }
    }
   ],
   "help": {
    "after_failed_runs": 2,
    "kind": "played_demo",
    "program": [
     "store = 1",
     "open_door(store)"
    ],
    "opens_at_most": 1,
    "affects_stars": false,
    "silent": true
   },
   "star_policy": {
    "victory_stars": 2,
    "three_stars": [
     "victory",
     "elegance"
    ],
    "elegance_rule": "no_unnecessary_action_in_final_program",
    "free_attempts_affect_stars": false,
    "help_affects_stars": false,
    "prediction_affects_stars": false
   },
   "age_7_9_variant": {
    "input_mode": "blocks",
    "instructions": {
     "fr": "Deux portes scellées ferment la terrasse, chacune marquée de son chiffre. Pose une carte CRISTAL dans la lanterne, puis une carte PRÉSENTE pour la montrer à une porte. Quand le jour tourne, change de cristal et présente encore.",
     "en": "Two sealed doors close the terrace, each marked with its number. Place a CRYSTAL card in the lantern, then a PRESENT card to show it to a door. When the day turns, switch crystals and present again."
    },
    "canonical_solution": [
     "CARD_CRYSTAL_1",
     "CARD_PRESENT",
     "CARD_CRYSTAL_3",
     "CARD_PRESENT"
    ],
    "notes": "Les cartes localisées pilotent la lanterne; même scène, même victoire et ordre libre.",
    "card_mapping": [
     {
      "card_label": "crystal_1",
      "value": "store = 1",
      "mode": "blocks"
     },
     {
      "card_label": "crystal_3",
      "value": "store = 3",
      "mode": "blocks"
     },
     {
      "card_label": "present_lantern",
      "value": "open_door(store)",
      "mode": "blocks"
     }
    ]
   }
  }
 },
 "create_w2_p5": {
  "id": "CREATE.W2.P5",
  "route": "create",
  "world": 2,
  "position": 5,
  "phase": 1,
  "competency": "PROG.STRINGS",
  "age_band": "10-14",
  "role": "independent_practice",
  "i18n": {
   "fr": {
    "name": "Le réveil des vrais noms",
    "hook": "Ces automates n'écoutent pas les noms criés : ils lisent seulement le nom posé dans la mémoire.",
    "instructions": "Réveille les deux automates endormis avec le nom exact gravé sur chacune de leurs plaques.",
    "hints": [
     "Compare la plaque et le nom visible dans la mémoire. Chaque lettre doit être exactement la même.",
     "Les guillemets entourent le nom. Ils ne font pas partie des lettres du nom.",
     "L'automate lit seulement la mémoire. Charge un nom, appelle, puis charge l'autre nom et appelle."
    ],
    "victory": "La même mémoire a porté les deux noms exacts. Les deux automates sont réveillés : mission réussie.",
    "celebration": "ASTRA déploie ses ailes et BRUME souffle un anneau de vapeur. Tu as fait lire deux noms exacts depuis la même mémoire.",
    "parent_line": "Votre enfant apprend à garder un nom exact dans une variable puis à faire lire cette variable par un appel. La maîtrise est validée sans l'indice 3 ; après cet indice, la réussite est accompagnée."
   },
   "en": {
    "name": "The True-Name Awakening",
    "hook": "These automatons do not hear shouted names: they only read the name placed in memory.",
    "instructions": "Wake both sleeping automatons with the exact name engraved on each of their plaques.",
    "hints": [
     "Compare the plaque with the name visible in memory. Every letter must match exactly.",
     "Quotation marks go around the name. They are not letters in the name.",
     "The automaton reads only memory. Load one name and call, then load the other name and call."
    ],
    "victory": "The same memory carried both exact names. Both automatons are awake: mission complete.",
    "celebration": "ASTRA spreads its wings and BRUME blows a mist ring. You made two exact names be read from the same memory.",
    "parent_line": "Your child is learning to store an exact name in a variable, then make a call read that variable. Mastery is validated without hint 3; after that hint, the win is assisted."
   }
  },
  "engagement": {
   "first_action_seconds": 12,
   "duration_min": [
    3,
    6
   ],
   "mechanics": [
    "read_name_plaques",
    "store_quoted_text",
    "strict_name_matching",
    "literal_world_refusal",
    "positive_pending_state",
    "two_receiver_goal",
    "best_solution_command_limit_6",
    "attempts_not_counted",
    "graduated_hints",
    "assisted_mastery_distinction_required",
    "mastery_trace_required",
    "free_mode_specified_not_implemented"
   ],
   "celebration_type": "wings_and_mist_true_name_duet",
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
   "item_id": "true-names",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 84 « True Names » (lignes 7605–7684) : chaînes entre guillemets utilisées comme données et arguments",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Droits confirmés : registre rights_registry.json — fondement BENCC (groupe Yassine), statut OWNED (décision Yassine 04/09, WDR-055) ; dossier BENCC/CodeCombat réglé par les avocats (WDR-056 04/09, WDR-052 abrogée). reuse_mode original_authoring — texte, consignes et univers 100 % WONDRA ; fondement documenté dans catalogue_ref."
  },
  "maturity": "EXPERT_REVIEWED",
  "playable": {
   "primitives": [
    "store = <value>",
    "call_by_name(store)"
   ],
   "scene": {
    "actors": [
     {
      "id": "lumo",
      "kind": "world_guide",
      "role": "guards_the_true_name_workshop",
      "reacts_to": [
       "crystal_inserted",
       "previous_crystal_ejected",
       "object_activated",
       "object_already_activated",
       "name_not_found",
       "name_value_not_string"
      ]
     }
    ],
    "props": [
     {
      "id": "lantern_name_slot",
      "kind": "lantern_slot",
      "capacity": 1,
      "visible_replacement": true
     },
     {
      "id": "automaton_astra",
      "kind": "named_receiver",
      "name": "ASTRA",
      "role": "winged_automaton_with_star_shaped_name_plaque"
     },
     {
      "id": "automaton_brume",
      "kind": "named_receiver",
      "name": "BRUME",
      "role": "mist_automaton_with_spiral_shaped_name_plaque"
     }
    ],
    "renders": [
     {
      "state": "lantern_slot",
      "targets": [
       "lantern_name_slot"
      ],
      "visual_states": [
       {
        "when": {
         "op": "empty"
        },
        "appearance": "name_slot_empty"
       },
       {
        "when": {
         "op": "nonempty"
        },
        "appearance": "quoted_text_visible_in_slot",
        "motion": "letters_settle_into_slot",
        "sound": "soft_letter_chime"
       }
      ]
     },
     {
      "state": "automaton_astra_activated",
      "targets": [
       "automaton_astra"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "winged_automaton_sleeping_name_plaque_visible"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "winged_automaton_awake_name_plaque_visible",
        "motion": "wings_unfold",
        "sound": "two_note_wake_chime"
       }
      ]
     },
     {
      "state": "automaton_brume_activated",
      "targets": [
       "automaton_brume"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": false
        },
        "appearance": "mist_automaton_sleeping_name_plaque_visible"
       },
       {
        "when": {
         "op": "eq",
         "value": true
        },
        "appearance": "mist_automaton_awake_name_plaque_visible",
        "motion": "mist_ring_unfurls",
        "sound": "airy_wake_chime"
       }
      ]
     }
    ],
    "emits": {
     "store = <value>": [
      "crystal_inserted",
      "previous_crystal_ejected"
     ],
     "call_by_name(store)": [
      "object_activated",
      "object_already_activated",
      "name_not_found",
      "name_value_not_string"
     ]
    },
    "presentation_pending_fr": "ASTRA a reconnu son nom. Premier automate prêt ; il en reste un.",
    "presentation_pending_en": "ASTRA recognized its name. First automaton ready; one remains.",
    "presentation_victory_difference_fr": "L'état en cours montre un seul automate prêt, sans célébration finale. La victoire montre les deux automates réveillés et la célébration.",
    "presentation_victory_difference_en": "The pending state shows one ready automaton without the final celebration. Victory shows both automatons awake and the celebration.",
    "literal_refusal_visual_effect": "memory_shield_closes_and_direct_name_bounces",
    "assisted_rule": "hint_3_or_played_demo=>assisted_excluded_from_mastery",
    "mastery_trace_fields": [
     "attempts",
     "errors_by_type",
     "hints_consumed",
     "assisted"
    ],
    "free_mode_spec": "post_mission_sandbox_unlimited_names_reactions_no_victory_best_solution_retained"
   },
   "victory_condition": {
    "type": "all_of",
    "rules": [
     {
      "type": "state_equals",
      "property": "automaton_astra_activated",
      "value": true
     },
     {
      "type": "state_equals",
      "property": "automaton_brume_activated",
      "value": true
     },
     {
      "type": "all_of",
      "requires_variable_use": true
     },
     {
      "type": "no_extra_command",
      "max_commands": 6
     }
    ]
   },
   "canonical_solution": [
    "store = \"ASTRA\"",
    "call_by_name(store)",
    "store = \"BRUME\"",
    "call_by_name(store)"
   ],
   "misconception_fixtures": [
    {
     "id": "changes-letter-case",
     "program": [
      "store = \"astra\"",
      "call_by_name(store)",
      "store = \"BRUME\"",
      "call_by_name(store)"
     ],
     "misconception": {
      "fr": "Les mêmes lettres avec une casse différente forment le même nom.",
      "en": "The same letters with different letter case make the same name."
     },
     "expected_failure": "name_not_found",
     "diagnostic_feedback": {
      "fr": "Une lettre n'a pas la bonne taille. Recopie les majuscules de la plaque.",
      "en": "One letter has the wrong case. Copy the uppercase letters on the plaque."
     },
     "world_signal": {
      "fr": "La petite lettre clignote puis retombe. L'automate reste endormi.",
      "en": "The lowercase letter blinks and drops away. The automaton stays asleep."
     }
    },
    {
     "id": "uses-an-unknown-name",
     "program": [
      "store = \"ASTRA\"",
      "call_by_name(store)",
      "store = \"MIRAGE\"",
      "call_by_name(store)"
     ],
     "misconception": {
      "fr": "N'importe quel mot entre guillemets peut réveiller le deuxième automate.",
      "en": "Any word inside quotation marks can wake the second automaton."
     },
     "expected_failure": "name_not_found",
     "diagnostic_feedback": {
      "fr": "Aucune plaque ne porte ce nom. Lis le nom gravé sur l'autre automate.",
      "en": "No plaque has that name. Read the name engraved on the other automaton."
     },
     "world_signal": {
      "fr": "Le nom sans plaque devient du sable. Aucun nouvel automate ne se réveille.",
      "en": "The name with no matching plaque turns to sand. No new automaton wakes up."
     }
    },
    {
     "id": "uses-a-number-as-name",
     "program": [
      "store = 7",
      "call_by_name(store)",
      "store = \"BRUME\"",
      "call_by_name(store)"
     ],
     "misconception": {
      "fr": "Un nombre peut être utilisé comme un nom texte sans guillemets.",
      "en": "A number can be used as a text name without quotation marks."
     },
     "expected_failure": "name_value_not_string",
     "diagnostic_feedback": {
      "fr": "La lanterne a reçu un nombre. Pour appeler un nom, utilise un texte entre guillemets.",
      "en": "The lantern received a number. To call a name, use text inside quotation marks."
     },
     "world_signal": {
      "fr": "Le chiffre rebondit hors de la plaque ; l'automate ailé reste endormi.",
      "en": "The number bounces off the plaque; the winged automaton stays asleep."
     }
    },
    {
     "id": "adds-spaces-around-name",
     "program": [
      "store = \" ASTRA \"",
      "call_by_name(store)",
      "store = \"BRUME\"",
      "call_by_name(store)"
     ],
     "misconception": {
      "fr": "Les espaces ajoutés autour d'un nom sont ignorés.",
      "en": "Extra spaces around a name are ignored."
     },
     "expected_failure": "name_not_found",
     "diagnostic_feedback": {
      "fr": "Il y a un espace en trop avant ou après le nom. Garde seulement les lettres de la plaque.",
      "en": "There is an extra space before or after the name. Keep only the letters on the plaque."
     },
     "world_signal": {
      "fr": "Une case vide apparaît avant et après le nom. La plaque refuse ces espaces.",
      "en": "An empty cell appears before and after the name. The plaque rejects those spaces."
     }
    },
    {
     "id": "calls-literals-without-store",
     "program": [
      "call_by_name(\"ASTRA\")",
      "call_by_name(\"BRUME\")"
     ],
     "misconception": {
      "fr": "Les noms n'ont pas besoin d'être gardés comme valeurs dans `store` avant l'appel.",
      "en": "The names do not need to be kept as values in `store` before the call."
     },
     "expected_failure": "requires_variable_use_not_satisfied",
     "diagnostic_feedback": {
      "fr": "L'automate ne lit que la mémoire. Pose d'abord le nom dans la mémoire, puis appelle avec sa valeur.",
      "en": "The automaton reads only memory. Put the name in memory first, then call with its value."
     },
     "world_signal": {
      "fr": "Le bouclier de mémoire se ferme et les noms criés rebondissent. Aucun automate ne se réveille.",
      "en": "The memory shield closes and the shouted names bounce back. Neither automaton wakes up."
     }
    },
    {
     "id": "repeats-the-same-name",
     "program": [
      "store = \"ASTRA\"",
      "call_by_name(store)",
      "call_by_name(store)"
     ],
     "misconception": {
      "fr": "Appeler deux fois le même nom peut réveiller les deux automates.",
      "en": "Calling the same name twice can wake both automatons."
     },
     "expected_failure": "object_already_activated",
     "diagnostic_feedback": {
      "fr": "ASTRA est déjà prêt. Remplace le nom dans la mémoire par celui de l'autre plaque.",
      "en": "ASTRA is already ready. Replace the name in memory with the one on the other plaque."
     },
     "world_signal": {
      "fr": "ASTRA salue encore. BRUME dort toujours : il attend son propre nom.",
      "en": "ASTRA waves again. BRUME is still asleep and waiting for its own name."
     }
    }
   ],
   "help": {
    "after_failed_runs": 2,
    "kind": "played_demo",
    "program": [
     "store = \"ASTRA\"",
     "call_by_name(store)"
    ],
    "opens_at_most": 1,
    "affects_stars": false,
    "silent": true
   },
   "star_policy": {
    "victory_stars": 2,
    "three_stars": [
     "victory",
     "elegance"
    ],
    "elegance_rule": "no_unnecessary_action_in_final_program",
    "free_attempts_affect_stars": false,
    "help_affects_stars": false,
    "prediction_affects_stars": false
   },
   "age_7_9_variant": {
    "input_mode": "blocks",
    "instructions": {
     "fr": "Écris ASTRA avec les lettres. Pose-le dans la mémoire. Appuie sur APPELER. Puis fais BRUME.",
     "en": "Build ASTRA with letters. Put it in memory. Press CALL. Then build BRUME."
    },
    "canonical_solution": [
     "LETTER_A",
     "LETTER_S",
     "LETTER_T",
     "LETTER_R",
     "LETTER_A",
     "BLOCK_LOAD_BUILT_NAME",
     "BLOCK_CALL_LOADED_NAME",
     "LETTER_B",
     "LETTER_R",
     "LETTER_U",
     "LETTER_M",
     "LETTER_E",
     "BLOCK_LOAD_BUILT_NAME",
     "BLOCK_CALL_LOADED_NAME"
    ],
    "notes": "Identifiant de compétence 7–9 provisoire : W2P5.NAME_COPY_CALL, jamais PROG.STRINGS. Compétence affichée : reproduire un nom exact visible, le charger dans une mémoire visible, puis déclencher l'appel avec ce nom. Bac tranché : alphabet complet A–Z en ordre libre ; la plaque source reste visible pendant toute la construction. États : mémoire vide = contour pointillé + mot VIDE ; partielle = lettres posées + curseur ; chargée = mot complet dans la fente. Mauvaise lettre = tuile qui tremble et reste retirable ; EFFACER retire la dernière lettre, RECOMMENCER vide le mot en construction. APPELER sur mémoire vide = souffle doux + message La mémoire est vide ; aucun automate ne bouge. Après ASTRA, point de reprise sauvegardé : ASTRA prêt, construction BRUME vide, plaque BRUME visible. Indices 7–9 : 1 Regarde la première lettre de la plaque ; 2 Compare ton mot lettre par lettre ; 3 Utilise EFFACER puis pose les lettres dans le même ordre. Aucun piège de casse, d'espace ou de nom inconnu dans cette tranche.",
    "card_mapping": [
     {
      "card_label": "LETTER_A",
      "value": "A",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_B",
      "value": "B",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_C",
      "value": "C",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_D",
      "value": "D",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_E",
      "value": "E",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_F",
      "value": "F",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_G",
      "value": "G",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_H",
      "value": "H",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_I",
      "value": "I",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_J",
      "value": "J",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_K",
      "value": "K",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_L",
      "value": "L",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_M",
      "value": "M",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_N",
      "value": "N",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_O",
      "value": "O",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_P",
      "value": "P",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_Q",
      "value": "Q",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_R",
      "value": "R",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_S",
      "value": "S",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_T",
      "value": "T",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_U",
      "value": "U",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_V",
      "value": "V",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_W",
      "value": "W",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_X",
      "value": "X",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_Y",
      "value": "Y",
      "mode": "blocks"
     },
     {
      "card_label": "LETTER_Z",
      "value": "Z",
      "mode": "blocks"
     },
     {
      "card_label": "BLOCK_LOAD_BUILT_NAME",
      "value": "store = BUILT_NAME",
      "mode": "blocks"
     },
     {
      "card_label": "BLOCK_CALL_LOADED_NAME",
      "value": "call_by_name(store)",
      "mode": "blocks"
     },
     {
      "card_label": "BLOCK_ERASE_LAST",
      "value": "ERASE_LAST_LETTER",
      "mode": "blocks"
     },
     {
      "card_label": "BLOCK_RESET_WORD",
      "value": "RESET_BUILT_WORD",
      "mode": "blocks"
     }
    ]
   },
   "world_refusal": {
    "primitive": "call_by_name",
    "rejects": "literal_argument",
    "accepts": "variable_read",
    "message": {
     "fr": "Le nom rebondit : cet automate ne lit que la mémoire, pas un nom crié directement.",
     "en": "The name bounces back: this automaton reads memory, not a name shouted directly."
    },
    "effect": "no_world_state_change"
   }
  }
 },
 "create_w2_p6": {
  "id": "CREATE.W2.P6",
  "route": "create",
  "world": 2,
  "position": 6,
  "phase": 1,
  "competency": "PROG.PROPERTIES_OBJECTS",
  "age_band": "10-14",
  "role": "retrieval",
  "i18n": {
   "fr": {
    "name": "La balise enfouie",
    "hook": "Une balise dort cachée sous la dune : elle seule connaît sa case. Demande-lui où viser !",
    "instructions": "La balise est cachée. Lis sa colonne sur `balise_dune.x` et sa ligne sur `balise_dune.y`, puis fais viser le rayon avec ces valeurs. Des variables peuvent rendre ton programme plus clair.",
    "hints": [
     "La carte ne donne pas la réponse : demande les deux coordonnées à la balise.",
     "`balise_dune.x` donne la colonne ; `balise_dune.y` donne la ligne.",
     "Vérifie que les deux valeurs lues arrivent réellement dans le rayon, directement ou par des variables."
    ],
    "victory": "Les deux valeurs de la balise alimentent le rayon, qui atteint sa vraie case.",
    "celebration": "Deux fils lumineux relient la balise au rayon : x vers la colonne, y vers la ligne. La balise émerge exactement dans la case qu'elle a décrite.",
    "parent_line": "Il a lu la position d'un objet et utilisé ces deux valeurs pour viser, sans les inventer."
   },
   "en": {
    "name": "The Buried Beacon",
    "hook": "A beacon sleeps hidden under the dune: only it knows its cell. Ask it where to aim!",
    "instructions": "The beacon is hidden. Read its column from `balise_dune.x` and its row from `balise_dune.y`, then make the ray aim with those values. Variables can make your program clearer.",
    "hints": [
     "The map does not give the answer: ask the beacon for both coordinates.",
     "`balise_dune.x` gives the column; `balise_dune.y` gives the row.",
     "Check that both read values actually reach the ray, directly or through variables."
    ],
    "victory": "Both beacon values feed the ray, which reaches its true cell.",
    "celebration": "Two light trails link the beacon to the ray: x to the column, y to the row. The beacon rises from the exact cell it described.",
    "parent_line": "They read an object's position and used both values to aim, without inventing them."
   }
  },
  "engagement": {
   "first_action_seconds": 15,
   "duration_min": [
    6,
    10
   ],
   "mechanics": [
    "property_reads",
    "named_object",
    "visible_value_provenance",
    "coordinate_aiming",
    "hidden_beacon",
    "optional_value_carry_variables"
   ],
   "celebration_type": "beacon_ring",
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
   "item_id": "forest-fire-dancing",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 31 « Forest Fire Dancing » (lignes 2671–2771) : accès à une position structurée par propriétés x/y",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Droits confirmés : registre rights_registry.json — fondement BENCC (groupe Yassine), statut OWNED (décision Yassine 04/09, WDR-055) ; dossier BENCC/CodeCombat réglé par les avocats (WDR-056 04/09, WDR-052 abrogée). reuse_mode original_authoring — texte, consignes et univers 100 % WONDRA ; fondement documenté dans catalogue_ref."
  },
  "maturity": "EXPERT_REVIEWED",
  "playable": {
   "primitives": [
    "aim_at(x, y)"
   ],
   "scene": {
    "actors": [
     {
      "id": "lumo",
      "kind": "world_guide",
      "role": "asks_the_buried_beacon_where_to_aim",
      "reacts_to": [
       "cell_aimed",
       "aim_out_of_bounds"
      ]
     }
    ],
    "props": [
     {
      "id": "dunes_carte",
      "kind": "coordinate_grid",
      "role": "grid_without_the_beacon_cell"
     },
     {
      "id": "balise_dune",
      "kind": "named_object",
      "name": "balise",
      "x": 3,
      "y": 4,
      "color": "amber",
      "state": "hidden"
     },
     {
      "id": "aimer",
      "kind": "aimer",
      "role": "locks_the_ray_onto_the_beacon_cell"
     }
    ],
    "grid": {
     "x_min": 1,
     "x_max": 4,
     "y_min": 1,
     "y_max": 4,
     "x_label": "x",
     "y_label": "y",
     "show_coordinates": true
    },
    "renders": [
     {
      "state": "aimed_x",
      "targets": [
       "aimer"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": 1
        },
        "appearance": "column_one_lit"
       },
       {
        "when": {
         "op": "eq",
         "value": 2
        },
        "appearance": "column_two_lit"
       },
       {
        "when": {
         "op": "eq",
         "value": 3
        },
        "appearance": "column_three_lit"
       },
       {
        "when": {
         "op": "eq",
         "value": 4
        },
        "appearance": "column_four_lit"
       }
      ]
     },
     {
      "state": "aimed_y",
      "targets": [
       "aimer"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": 1
        },
        "appearance": "row_one_lit"
       },
       {
        "when": {
         "op": "eq",
         "value": 2
        },
        "appearance": "row_two_lit"
       },
       {
        "when": {
         "op": "eq",
         "value": 3
        },
        "appearance": "row_three_lit"
       },
       {
        "when": {
         "op": "eq",
         "value": 4
        },
        "appearance": "row_four_lit"
       }
      ]
     }
    ],
    "emits": {
     "aim_at(x, y)": [
      "cell_aimed",
      "aim_out_of_bounds"
     ]
    }
   },
   "victory_condition": {
    "type": "all_of",
    "rules": [
     {
      "type": "state_equals",
      "property": "aimed_x",
      "value": 3
     },
     {
      "type": "state_equals",
      "property": "aimed_y",
      "value": 4
     },
     {
      "type": "all_of",
      "requires_property_reads": {
       "object": "balise_dune",
       "properties": [
        "x",
        "y"
       ],
       "used_by": "aim_at"
      }
     }
    ]
   },
   "canonical_solution": [
    "target_x = balise_dune.x",
    "target_y = balise_dune.y",
    "aim_at(target_x, target_y)"
   ],
   "misconception_fixtures": [
    {
     "id": "hardcodes-the-beacon-cell",
     "program": [
      "target_x = 3",
      "target_y = 4",
      "aim_at(target_x, target_y)"
     ],
     "misconception": {
      "fr": "Les bonnes coordonnées sont écrites en dur dans le programme au lieu d'être lues sur la balise.",
      "en": "The correct coordinates are hard-coded in the program instead of being read from the beacon."
     },
     "expected_failure": "requires_property_reads_not_satisfied",
     "diagnostic_feedback": {
      "fr": "Le rayon vise juste, mais aucune valeur ne vient de la balise. Remplace ces nombres par une lecture de ses propriétés.",
      "en": "The ray aims correctly, but no value comes from the beacon. Replace these numbers by reading its properties."
     },
     "world_signal": {
      "fr": "Deux jetons gris 3 et 4 arrivent sans fil de la balise : le rayon reste fermé et aucune case n'est confirmée.",
      "en": "Two grey 3 and 4 tokens arrive with no trail from the beacon: the ray stays closed and no cell is confirmed."
     }
    },
    {
     "id": "reads-without-feeding-the-aim",
     "program": [
      "read_x = balise_dune.x",
      "read_y = balise_dune.y",
      "aim_at(3, 4)"
     ],
     "misconception": {
      "fr": "Les propriétés sont lues puis laissées de côté : la visée utilise des nombres fixes.",
      "en": "The properties are read and then set aside: the aim uses fixed numbers."
     },
     "expected_failure": "requires_property_reads_not_satisfied",
     "diagnostic_feedback": {
      "fr": "Les réponses de la balise ne servent pas à viser. Utilise les deux variables qui portent ses réponses dans `aim_at`.",
      "en": "The beacon's answers are not used to aim. Use the two variables carrying its answers inside `aim_at`."
     },
     "world_signal": {
      "fr": "Les prises x et y de la balise s'allument, mais leurs fils s'arrêtent avant le rayon : aucune case n'est confirmée.",
      "en": "The beacon's x and y sockets light up, but their trails stop before the ray: no cell is confirmed."
     }
    },
    {
     "id": "swaps-the-two-readings",
     "program": [
      "target_x = balise_dune.y",
      "target_y = balise_dune.x",
      "aim_at(target_x, target_y)"
     ],
     "misconception": {
      "fr": "La colonne et la ligne sont inversées : la balise répond, mais ses deux réponses sont échangées.",
      "en": "The column and the row are swapped: the beacon answers, but its two answers are exchanged."
     },
     "expected_failure": "aimed_cell_is_4_3_instead_of_3_4",
     "diagnostic_feedback": {
      "fr": "Le rayon vise une autre case que celle de la balise. Lis la colonne avec x et la ligne avec y, sans les échanger.",
      "en": "The ray aims at another cell than the beacon's. Read the column with x and the row with y, without swapping them."
     },
     "world_signal": {
      "fr": "Les fils x et y se croisent ; le rayon encadre une case vide en pointillés, sans réveiller la balise.",
      "en": "The x and y trails cross; the ray outlines an empty cell with dashes, without waking the beacon."
     }
    },
    {
     "id": "reads-only-the-column",
     "program": [
      "target_x = balise_dune.x",
      "target_y = 4",
      "aim_at(target_x, target_y)"
     ],
     "misconception": {
      "fr": "La ligne est devinée au lieu d'être demandée à la balise.",
      "en": "The row is guessed instead of being asked from the beacon."
     },
     "expected_failure": "requires_property_reads_not_satisfied",
     "diagnostic_feedback": {
      "fr": "La colonne vient de la balise, mais pas la ligne : lis aussi `balise_dune.y` et utilise cette réponse.",
      "en": "The column comes from the beacon, but the row does not: read `balise_dune.y` too and use that answer."
     },
     "world_signal": {
      "fr": "Le fil x atteint la colonne, mais la prise y reste sombre : le rayon incomplet ne confirme aucune case.",
      "en": "The x trail reaches the column, but the y socket stays dark: the incomplete ray confirms no cell."
     }
    },
    {
     "id": "direct-hardcoded-aim",
     "program": [
      "aim_at(3, 4)"
     ],
     "misconception": {
      "fr": "La visée reçoit deux nombres fixes, sans aucune lecture sur la balise.",
      "en": "The aim receives two fixed numbers, with no read from the beacon at all."
     },
     "expected_failure": "requires_property_reads_not_satisfied",
     "diagnostic_feedback": {
      "fr": "Avant de viser, demande à la balise sa colonne et sa ligne, puis passe ces réponses au rayon.",
      "en": "Before aiming, ask the beacon for its column and its row, then pass these answers to the ray."
     },
     "world_signal": {
      "fr": "Le rayon reçoit deux nombres sans origine ; la balise reste noire et le faisceau ne part pas.",
      "en": "The ray receives two numbers with no source; the beacon stays dark and the beam does not fire."
     }
    }
   ],
   "age_7_9_variant": {
    "input_mode": "tap",
    "instructions": {
     "fr": "La carte montre 3,4. Lis-la, touche la case 3,4, puis appuie sur VISER.",
     "en": "The map card shows 3,4. Read it, tap cell 3,4, then press AIM."
    },
    "canonical_solution": [
     "READ_VISIBLE_COORDINATE_CARD_3_4",
     "TAP_GRID_CELL_3_4",
     "BLOCK_AIM_SELECTED_CELL"
    ],
    "notes": "Compétence 7–9 affichée : « lire une coordonnée sur une carte visible et viser la bonne case ». Compétence réduite et honnête : aucune propriété d'objet ni variable n'est exigée ou simulée. L'enfant choisit réellement une case parmi la grille ; il ne range pas trois cartes préfabriquées.",
    "card_mapping": [
     {
      "card_label": "READ_VISIBLE_COORDINATE_CARD_3_4",
      "value": "visible_card:3,4",
      "mode": "tap"
     },
     {
      "card_label": "TAP_GRID_CELL_3_4",
      "value": "selected_cell:3,4",
      "mode": "tap"
     },
     {
      "card_label": "BLOCK_AIM_SELECTED_CELL",
      "value": "aim_at(3, 4)",
      "mode": "tap"
     }
    ]
   }
  }
 },
 "create_w2_p7": {
  "id": "CREATE.W2.P7",
  "route": "create",
  "world": 2,
  "position": 7,
  "phase": 1,
  "competency": "ALGO.COORDINATES_GEOMETRY",
  "age_band": "10-14",
  "role": "transfer",
  "i18n": {
   "fr": {
    "name": "Le rayon des dunes",
    "hook": "Une étoile s'est posée sur la carte des dunes. Attrape sa lumière !",
    "instructions": "Observe la grille : la balise en forme d'étoile marque une case. Repère d'abord sa colonne x, puis sa ligne y. Garde ces deux coordonnées sous les noms `x` et `y`, puis oriente le rayon avec `aim_at(x, y)`.",
    "hints": [
     "Commence par la colonne : suis l'étoile jusqu'au nombre de l'axe x.",
     "Puis lis sa ligne sur l'axe y. La colonne et la ligne forment une seule adresse.",
     "Le rayon attend deux coordonnées dans cet ordre : x pour la colonne, puis y pour la ligne."
    ],
    "victory": "Le rayon touche la balise-étoile et la case s'illumine.",
    "celebration": "La lumière file entre les dunes et réveille la balise ! Tu as visé un lieu avec ses deux coordonnées x et y. Reviens demain : une autre lumière bougera peut-être.",
    "parent_line": "Ce qu'il vient d'apprendre : une position sur une grille se repère avec deux coordonnées ordonnées, x pour la colonne puis y pour la ligne."
   },
   "en": {
    "name": "The Dunes Beam",
    "hook": "A star has landed on the dunes map. Catch its light!",
    "instructions": "Look at the grid: the star-shaped beacon marks one cell. Find its x column first, then its y row. Keep those two coordinates under the names `x` and `y`, then aim the beam with `aim_at(x, y)`.",
    "hints": [
     "Start with the column: follow the star to the number on the x axis.",
     "Then read its row on the y axis. The column and row form one address.",
     "The beam expects two coordinates in this order: x for the column, then y for the row."
    ],
    "victory": "The beam reaches the star beacon and the cell lights up.",
    "celebration": "Light races across the dunes and wakes the beacon! You aimed at a place with its two x and y coordinates. Come back tomorrow: another light may move.",
    "parent_line": "What they just learned: a position on a grid uses two ordered coordinates, x for the column and y for the row."
   }
  },
  "engagement": {
   "first_action_seconds": 12,
   "duration_min": [
    3,
    6
   ],
   "mechanics": [
    "read_xy_grid",
    "spot_star_beacon",
    "two_coordinate_aim",
    "instant_cell_light",
    "free_experimentation"
   ],
   "celebration_type": "beam_crosses_dunes_and_wakes_star_beacon",
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
   "item_id": "course-winding-trail",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 2 « Course: Winding Trail » (lignes 121–210) : coordonnées x/y comme arguments de position",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Droits confirmés : registre rights_registry.json — fondement BENCC (groupe Yassine), statut OWNED (décision Yassine 04/09, WDR-055) ; dossier BENCC/CodeCombat réglé par les avocats (WDR-056 04/09, WDR-052 abrogée). reuse_mode original_authoring — texte, consignes et univers 100 % WONDRA ; fondement documenté dans catalogue_ref."
  },
  "maturity": "EXPERT_REVIEWED",
  "playable": {
   "primitives": [
    "aim_at(x, y)"
   ],
   "scene": {
    "actors": [
     {
      "id": "lumo",
      "kind": "world_guide",
      "role": "guards_the_dunes_beam",
      "reacts_to": [
       "cell_aimed",
       "aim_out_of_bounds"
      ]
     }
    ],
    "props": [
     {
      "id": "dunes_map",
      "kind": "coordinate_grid"
     },
     {
      "id": "star_beacon",
      "kind": "coordinate_target",
      "role": "outlined_star_target",
      "x": 2,
      "y": 3,
      "state": "waiting"
     },
     {
      "id": "beam_sight",
      "kind": "aimer",
      "role": "shows_column_row_and_aimed_cell"
     }
    ],
    "grid": {
     "x_min": 1,
     "x_max": 4,
     "y_min": 1,
     "y_max": 4,
     "x_label": "x",
     "y_label": "y",
     "show_coordinates": true
    },
    "renders": [
     {
      "state": "aimed_x",
      "targets": [
       "beam_sight"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": 1
        },
        "appearance": "column_one_aimed"
       },
       {
        "when": {
         "op": "eq",
         "value": 2
        },
        "appearance": "column_two_aimed"
       },
       {
        "when": {
         "op": "eq",
         "value": 3
        },
        "appearance": "column_three_aimed"
       },
       {
        "when": {
         "op": "eq",
         "value": 4
        },
        "appearance": "column_four_aimed"
       }
      ]
     },
     {
      "state": "aimed_y",
      "targets": [
       "beam_sight"
      ],
      "visual_states": [
       {
        "when": {
         "op": "eq",
         "value": 1
        },
        "appearance": "row_one_aimed"
       },
       {
        "when": {
         "op": "eq",
         "value": 2
        },
        "appearance": "row_two_aimed"
       },
       {
        "when": {
         "op": "eq",
         "value": 3
        },
        "appearance": "row_three_aimed"
       },
       {
        "when": {
         "op": "eq",
         "value": 4
        },
        "appearance": "row_four_aimed"
       }
      ]
     }
    ],
    "emits": {
     "aim_at(x, y)": [
      "cell_aimed",
      "aim_out_of_bounds"
     ]
    }
   },
   "victory_condition": {
    "type": "all_of",
    "rules": [
     {
      "type": "state_equals",
      "property": "aimed_x",
      "value": 2
     },
     {
      "type": "state_equals",
      "property": "aimed_y",
      "value": 3
     },
     {
      "type": "all_of",
      "requires_variable_use": true
     },
     {
      "type": "no_extra_command",
      "max_commands": 1
     }
    ]
   },
   "canonical_solution": [
    "x = 2",
    "y = 3",
    "aim_at(x, y)"
   ],
   "misconception_fixtures": [
    {
     "id": "swaps-column-and-row",
     "program": [
      "x = 3",
      "y = 2",
      "aim_at(x, y)"
     ],
     "misconception": {
      "fr": "La ligne est lue comme x et la colonne comme y.",
      "en": "The row is read as x and the column as y."
     },
     "expected_failure": "aimed_cell_is_3_2_instead_of_2_3",
     "diagnostic_feedback": {
      "fr": "Le rayon vise une autre case. Lis d'abord la colonne sur x, puis la ligne sur y.",
      "en": "The beam is aiming at another cell. Read the column on x first, then the row on y."
     },
     "world_signal": {
      "fr": "La case visée s'allume, mais la balise-étoile reste sombre et pulse avec son contour.",
      "en": "The aimed cell lights up, but the star beacon stays dark and pulses with its outline."
     }
    },
    {
     "id": "stops-one-row-too-soon",
     "program": [
      "x = 2",
      "y = 2",
      "aim_at(x, y)"
     ],
     "misconception": {
      "fr": "La bonne colonne est trouvée, mais la ligne est comptée une case trop tôt.",
      "en": "The correct column is found, but the row is counted one cell too early."
     },
     "expected_failure": "aimed_y_is_2_instead_of_3",
     "diagnostic_feedback": {
      "fr": "La colonne est juste. Repars de l'axe y et suis la ligne de l'étoile jusqu'à son nombre.",
      "en": "The column is right. Start again from the y axis and follow the star's row to its number."
     },
     "world_signal": {
      "fr": "Le rayon monte dans la bonne colonne, puis s'arrête sous la balise.",
      "en": "The beam travels along the right column, then stops below the beacon."
     }
    },
    {
     "id": "uses-one-coordinate-for-both-axes",
     "program": [
      "x = 2",
      "y = x",
      "aim_at(x, y)"
     ],
     "misconception": {
      "fr": "Une même valeur est utilisée pour la colonne et la ligne.",
      "en": "The same value is used for both the column and the row."
     },
     "expected_failure": "two_axes_need_two_readings",
     "diagnostic_feedback": {
      "fr": "La balise n'est pas sur la diagonale. Lis séparément son nombre sur chaque axe.",
      "en": "The beacon is not on the diagonal. Read its number separately on each axis."
     },
     "world_signal": {
      "fr": "Le rayon s'arrête sur la diagonale ; l'étoile reste dessinée plus haut.",
      "en": "The beam stops on the diagonal; the star remains outlined higher up."
     }
    },
    {
     "id": "hardcodes-target-without-coordinate-names",
     "program": [
      "aim_at(2, 3)"
     ],
     "misconception": {
      "fr": "Les deux nombres sont placés dans l'appel sans être repérés comme colonne x et ligne y.",
      "en": "The two numbers are placed in the call without being identified as x column and y row."
     },
     "expected_failure": "requires_variable_use_not_satisfied",
     "diagnostic_feedback": {
      "fr": "Nomme d'abord la colonne `x` et la ligne `y`, puis utilise ces deux noms pour orienter le rayon.",
      "en": "Name the column `x` and the row `y` first, then use both names to aim the beam."
     },
     "world_signal": {
      "fr": "Le rayon trouve l'étoile, mais les deux bagues x et y de la lunette restent vides : la Boussole refuse de valider.",
      "en": "The beam finds the star, but the sight's x and y rings stay empty, so the Compass does not validate it."
     }
    },
    {
     "id": "aims-outside-the-map",
     "program": [
      "x = 5",
      "y = 3",
      "aim_at(x, y)"
     ],
     "misconception": {
      "fr": "La colonne choisie dépasse la dernière colonne visible de la carte.",
      "en": "The chosen column is beyond the last visible column on the map."
     },
     "expected_failure": "aim_out_of_bounds_without_state_change",
     "diagnostic_feedback": {
      "fr": "Le rayon a quitté la carte. Vérifie les nombres visibles au bord de la grille.",
      "en": "The beam left the map. Check the numbers shown along the edge of the grid."
     },
     "world_signal": {
      "fr": "Le bord de la carte vibre, le rayon rebondit et aucune case ne s'allume.",
      "en": "The map edge trembles, the beam bounces back and no cell lights up."
     }
    }
   ],
   "age_7_9_variant": {
    "input_mode": "blocks",
    "instructions": {
     "fr": "Trouve la case avec l'étoile. Glisse d'abord sa carte COLONNE x, puis sa carte LIGNE y dans la lunette, et ajoute le bloc VISER.",
     "en": "Find the cell with the star. Slide its COLUMN x card first, then its ROW y card into the sight, and add the AIM block."
    },
    "canonical_solution": [
     "CARD_X_2",
     "CARD_Y_3",
     "BLOCK_AIM_X_Y"
    ],
    "notes": "La grille conserve les chiffres et les libellés x/y. Les cartes sont distinguées par leur forme, leur pictogramme et leur texte, jamais par la seule couleur ; elles compilent vers les trois lignes du mode 10-14.",
    "card_mapping": [
     {
      "card_label": "column_x_2",
      "value": "x = 2",
      "mode": "blocks"
     },
     {
      "card_label": "row_y_3",
      "value": "y = 3",
      "mode": "blocks"
     },
     {
      "card_label": "aim_with_x_y",
      "value": "aim_at(x, y)",
      "mode": "blocks"
     }
    ]
   }
  }
 },
 "create_w2_p8": {
  "id": "CREATE.W2.P8",
  "route": "create",
  "world": 2,
  "position": 8,
  "phase": 1,
  "competency": "CT.PREDICT_TRACE",
  "age_band": "10-14",
  "role": "checkpoint",
  "i18n": {
   "fr": {
    "name": "Le contrôle de la Boussole d'état",
    "hook": "La chambre centrale s'ouvre : Lumo doit recevoir ses propriétés finales et rejoindre une coordonnée précise.",
    "instructions": "Prédis l'état final de Lumo : charge 2, mode \"NIGHT\", position [4, 2]. À partir d'un objet `lumo`, choisis comment organiser les variables `mode`, `charge`, `x` et `y`, puis utilise `set_reaction(...)` et `transition(...)` pour fournir les deux preuves. Les littéraux utiles sont \"DAY\", 1, \"NIGHT\", 2 et 4 ; aucune suite de lignes n'est imposée.",
    "hints": [
     "Deux preuves sont attendues : les propriétés finales [2, \"NIGHT\"] et les coordonnées [4, 2].",
     "Déclare au moins une variable et réutilise-la dans l'objet ou dans un appel ; mets à jour les clés \"mode\" et \"charge\" avant de contrôler la fiche.",
     "Une solution part de `lumo = {\"mode\": \"DAY\", \"charge\": 1}`, stocke \"NIGHT\", 2, 4 et 2 dans des variables, met à jour l'objet, puis appelle `set_reaction([lumo[\"charge\"], lumo[\"mode\"]])` et `transition([x, y])`."
    ],
    "victory": "La Boussole confirme [2, \"NIGHT\"] et [4, 2], et cette synthèse réutilise au moins une variable déclarée plutôt que des valeurs codées en dur.",
    "celebration": "La Boussole d'état se ferme dans ta main, avec une fin claire et chaque preuve encore consultable."
   },
   "en": {
    "name": "The State Compass Check",
    "hook": "The central chamber opens: Lumo needs its final properties and must reach one precise coordinate.",
    "instructions": "Predict Lumo's final state: charge 2, mode \"NIGHT\", position [4, 2]. Starting from a `lumo` object, choose how to organise the `mode`, `charge`, `x` and `y` variables, then use `set_reaction(...)` and `transition(...)` to provide both proofs. The useful literals are \"DAY\", 1, \"NIGHT\", 2 and 4; no line sequence is prescribed.",
    "hints": [
     "Two proofs are required: the final properties [2, \"NIGHT\"] and the coordinates [4, 2].",
     "Declare at least one variable and reuse it in the object or in a call; update the \"mode\" and \"charge\" keys before checking the card.",
     "One solution starts from `lumo = {\"mode\": \"DAY\", \"charge\": 1}`, stores \"NIGHT\", 2, 4 and 2 in variables, updates the object, then calls `set_reaction([lumo[\"charge\"], lumo[\"mode\"]])` and `transition([x, y])`."
    ],
    "victory": "The Compass confirms [2, \"NIGHT\"] and [4, 2], while the synthesis reuses at least one declared variable instead of hard-coded values.",
    "celebration": "The State Compass closes in your hand with a clear ending and every proof still available to inspect."
   }
  },
  "engagement": {
   "first_action_seconds": 35,
   "duration_min": [
    12,
    20
   ],
   "mechanics": [
    "final_state_prediction",
    "object_property_update",
    "coordinate_assignment",
    "two_channel_checkpoint"
   ],
   "celebration_type": "completed_state_compass",
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
   "item_id": "master-of-names",
   "catalogue_ref": "curriculum/WONDRA_CATALOGUE_DETAILLE.md — Exercice 104 « Master of Names » (lignes 9237–9323) : résultat d’un appel conservé dans une variable et réutilisé ; synthèse architecture P1_CREATE-W2",
   "reuse_mode": "original_authoring",
   "rights_basis": "OWNED",
   "evidence": "Droits confirmés : registre rights_registry.json — fondement BENCC (groupe Yassine), statut OWNED (décision Yassine 04/09, WDR-055) ; dossier BENCC/CodeCombat réglé par les avocats (WDR-056 04/09, WDR-052 abrogée). reuse_mode original_authoring — texte, consignes et univers 100 % WONDRA ; fondement documenté dans catalogue_ref."
  },
  "maturity": "EXPERT_REVIEWED",
  "playable": {
   "primitives": [
    "set_reaction(mode)",
    "transition(target)"
   ],
   "victory_condition": {
    "type": "all_of",
    "rules": [
     {
      "type": "state_equals",
      "property": "reaction_mode",
      "value": [
       2,
       "NIGHT"
      ]
     },
     {
      "type": "state_equals",
      "property": "engine_state",
      "value": [
       4,
       2
      ]
     },
     {
      "type": "all_of",
      "requires_variable_use": true
     }
    ]
   },
   "canonical_solution": [
    "lumo = {\"mode\": \"DAY\", \"charge\": 1}",
    "mode = \"NIGHT\"",
    "charge = 2",
    "lumo[\"mode\"] = mode",
    "lumo[\"charge\"] = charge",
    "x = 4",
    "y = 2",
    "set_reaction([lumo[\"charge\"], lumo[\"mode\"]])",
    "transition([x, y])"
   ],
   "misconception_fixtures": [
    {
     "id": "swaps-final-row",
     "program": [
      "lumo = {\"mode\": \"DAY\", \"charge\": 1}",
      "mode = \"NIGHT\"",
      "charge = 2",
      "lumo[\"mode\"] = mode",
      "lumo[\"charge\"] = charge",
      "x = 4",
      "y = 3",
      "set_reaction([lumo[\"charge\"], lumo[\"mode\"]])",
      "transition([x, y])"
     ],
     "misconception": {
      "fr": "La ligne finale vaut 3 au lieu de 2.",
      "en": "The final row is 3 instead of 2."
     },
     "expected_failure": "final_position_is_4_3_not_4_2",
     "diagnostic_feedback": {
      "fr": "Garde x à 4 et remets uniquement y à 2 avant le dernier appel.",
      "en": "Keep x at 4 and set only y back to 2 before the final call."
     }
    },
    {
     "id": "keeps-old-charge",
     "program": [
      "lumo = {\"mode\": \"DAY\", \"charge\": 1}",
      "mode = \"NIGHT\"",
      "charge = 1",
      "lumo[\"mode\"] = mode",
      "lumo[\"charge\"] = charge",
      "x = 4",
      "y = 2",
      "set_reaction([lumo[\"charge\"], lumo[\"mode\"]])",
      "transition([x, y])"
     ],
     "misconception": {
      "fr": "La charge finale reste à 1 au lieu de passer à 2.",
      "en": "The final charge stays at 1 instead of changing to 2."
     },
     "expected_failure": "final_charge_remains_1",
     "diagnostic_feedback": {
      "fr": "Remplace `charge = 1` par `charge = 2` avant de ranger la valeur dans l'objet.",
      "en": "Replace `charge = 1` with `charge = 2` before storing the value in the object."
     }
    },
    {
     "id": "hardcodes-checkpoint-state",
     "program": [
      "set_reaction([2, \"NIGHT\"])",
      "transition([4, 2])"
     ],
     "misconception": {
      "fr": "Les deux états sont corrects mais entièrement codés en dur, sans variable déclarée et réutilisée.",
      "en": "Both states are correct but entirely hard-coded, with no declared and reused variable."
     },
     "expected_failure": "requires_variable_use_not_satisfied",
     "diagnostic_feedback": {
      "fr": "Stocke au moins une valeur dans une variable et réutilise-la dans l'objet, la réaction ou la position.",
      "en": "Store at least one value in a variable and reuse it in the object, reaction or position."
     }
    }
   ],
   "age_7_9_variant": {
    "input_mode": "blocks",
    "instructions": {
     "fr": "La fiche LUMO doit finir sur CHARGE 2 et NUIT, puis atteindre COLONNE 4, LIGNE 2. Réutilise au moins une carte de variable et compose toi-même les blocs STOCKER et CONTRÔLER.",
     "en": "The LUMO card must end on CHARGE 2 and NIGHT, then reach COLUMN 4, ROW 2. Reuse at least one variable card and compose the STORE and CHECK blocks yourself."
    },
    "canonical_solution": [
     "CARD_OBJECT_LUMO_DAY_CHARGE_1",
     "CARD_MODE_NIGHT",
     "CARD_CHARGE_2",
     "BLOCK_STORE_MODE",
     "BLOCK_STORE_CHARGE",
     "CARD_X_4",
     "CARD_Y_2",
     "BLOCK_CHECK_PROPERTIES",
     "BLOCK_CHECK_POSITION"
    ],
    "notes": "Les neuf blocs sont localisés ; les clés et littéraux internes ne sont jamais à saisir par l'enfant."
   }
  }
 }
};
