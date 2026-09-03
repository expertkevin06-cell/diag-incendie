// ============================================================
// BASE DE DONNÉES - DIAG INCENDIE BY KEVIN (v2.0 - photos réelles)
// ============================================================

const PHOTOS = {
    arc_beads: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/2faaccfdd-5e9b-45d7-bf60-3d90893a4d5f5440.png", caption: "Perles de fusion (arc beads) sur conducteurs cuivre : (a) court-circuit franc, (b) court-circuit par arc", credit: "Fire Technology / Springer" },
    arc_sparks: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/5faaccfdd-5e9b-45d7-bf60-3d90893a4d5f9267.png", caption: "Arc électrique : vaporisation du métal et projections d'étincelles", credit: "PushLeads" },
    wire_fire: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/2faaccfdd-5e9b-45d7-bf60-3d90893a4d5f9704.png", caption: "Départ de feu sur conducteurs : isolation carbonisée, fumées", credit: "Mister Sparky" },
    melted_plugs: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/3faaccfdd-5e9b-45d7-bf60-3d90893a4d5f5257.png", caption: "Fiches et câbles fondus par surcharge prolongée", credit: "Alamy" },
    strip_fire: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/5faaccfdd-5e9b-45d7-bf60-3d90893a4d5f6573.png", caption: "Multiprise en feu : surcharge et échauffement de contact", credit: "123RF" },
    overload_room: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/0faaccfdd-5e9b-45d7-bf60-3d90893a4d5f3724.png", caption: "Dégâts après incendie de prise surchargée (origine électrique)", credit: "BBC" },
    terminal_glow: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/2faaccfdd-5e9b-45d7-bf60-3d90893a4d5f4706.png", caption: "Mauvais contact : borne chauffant à incandescence, métal fondu", credit: "EC&M" },
    outlet_burnt: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/0faaccfdd-5e9b-45d7-bf60-3d90893a4d5f8003.png", caption: "Prise et fiche brûlées : échauffement de contact localisé", credit: "Getty Images" },
    socket_scorched: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/4faaccfdd-5e9b-45d7-bf60-3d90893a4d5f4455.png", caption: "Traces de chauffe et suies rayonnantes autour d'une prise", credit: "The Times" },
    panel_burnt: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/0faaccfdd-5e9b-45d7-bf60-3d90893a4d5f5841.png", caption: "Tableau électrique calciné : conducteurs fondus et oxydés", credit: "ACT Electric" },
    v_pattern: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/0faaccfdd-5e9b-45d7-bf60-3d90893a4d5f1351.png", caption: "V-pattern : la trace en V désigne le point d'origine du feu", credit: "Arson Lab" },
    corridor_fire: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/4faaccfdd-5e9b-45d7-bf60-3d90893a4d5f2980.png", caption: "Local sinistré : suies, lignes de chauffe et propagation", credit: "LV18" },
    bedroom_fire: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/3faaccfdd-5e9b-45d7-bf60-3d90893a4d5f1012.png", caption: "Pièce après incendie : lecture des traces et profondeurs de carbonisation", credit: "East Coast Building Inspections" },
    oil_puddle: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/5faaccfdd-5e9b-45d7-bf60-3d90893a4d5f6493.png", caption: "Écoulement d'huile : carburant potentiel au contact d'un organe chaud", credit: "AutoNation" },
    exhaust_smoke: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/0faaccfdd-5e9b-45d7-bf60-3d90893a4d5f6976.png", caption: "Échappement (organe chaud 400-800°C) : point d'auto-inflammation des huiles", credit: "BJAK" },
    engine_burnt: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/4faaccfdd-5e9b-45d7-bf60-3d90893a4d5f6784.png", caption: "Compartiment moteur détruit : aluminium fondu, acier bleui", credit: "Alamy" },
    engine_melted_wires: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/2faaccfdd-5e9b-45d7-bf60-3d90893a4d5f1151.png", caption: "Câblage moteur fondu, cuivre oxydé (vert-de-gris) après incendie", credit: "AboutLawsuits" },
    car_fire_road: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/0faaccfdd-5e9b-45d7-bf60-3d90893a4d5f6394.png", caption: "Incendie de véhicule thermique en cours (compartiment moteur)", credit: "Blaze Stack" },
    chemical_sparks: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/3faaccfdd-5e9b-45d7-bf60-3d90893a4d5f3341.png", caption: "Réaction chimique exothermique : projections incandescentes", credit: "Science made alive" },
    chemical_flame: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/2faaccfdd-5e9b-45d7-bf60-3d90893a4d5f9987.png", caption: "Combustion spontanée par réaction chimique sur plateau métallique", credit: "Alamy" },
    fire_triangle: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/1faaccfdd-5e9b-45d7-bf60-3d90893a4d5f9422.png", caption: "Triangle du feu : combustible + oxygène + énergie d'activation", credit: "Slideshare" },
    battery_runaway: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/0faaccfdd-5e9b-45d7-bf60-3d90893a4d5f4899.png", caption: "Emballement thermique Li-ion en chambre d'essai : jet de feu et fumées", credit: "PMC / NIH" },
    battery_burnt: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/3faaccfdd-5e9b-45d7-bf60-3d90893a4d5f5347.png", caption: "Module batterie Li-ion après thermal runaway : cellules éventrées", credit: "cm batteries" },
    plane_battery_fire: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/3faaccfdd-5e9b-45d7-bf60-3d90893a4d5f1051.png", caption: "Incendie de batterie Li-ion à bord d'un aéronef (fuselage percé)", credit: "Flair" },
    ev_charging_fire: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/1faaccfdd-5e9b-45d7-bf60-3d90893a4d5f2484.png", caption: "Véhicule électrique : départ de feu batterie pendant la charge", credit: "News.com.au" },
    ev_wrecks: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/8faaccfdd-5e9b-45d7-bf60-3d90893a4d5f7393.png", caption: "Véhicules électriques après incendie : structures blanchies, batterie consumée", credit: "Bloomberg" },
    ev_port_fire: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/2faaccfdd-5e9b-45d7-bf60-3d90893a4d5f7541.png", caption: "Départ de feu sur connecteur de charge haute tension", credit: "QBE" },
    steel_samples: { url: "https://image.qwenlm.ai/public_source/cf785bab-295b-41b7-b135-c32bc2c7d2ed/2faaccfdd-5e9b-45d7-bf60-3d90893a4d5f5202.png", caption: "Échantillons d'acier : cassures, déformations et aspects après chauffe", credit: "Woodworkers Institute" }
};

const FIRE_DATABASE = {
    metals: [
        { name: "Aluminium", meltingPointC: 660, meltingPointF: 1220, appearance: "Fusion brillante argentée, déformation facile (culasses, câbles)" },
        { name: "Cuivre", meltingPointC: 1084, meltingPointF: 1983, appearance: "Perles de fusion rougeâtres à noires, vert-de-gris si oxydé" },
        { name: "Acier", meltingPointC: 1425, meltingPointF: 2600, appearance: "Bleuissement, déformation progressive, cassant après chauffe rapide" },
        { name: "Plomb", meltingPointC: 327, meltingPointF: 621, appearance: "Fusion basse température, coulures gris mat" },
        { name: "Zinc", meltingPointC: 420, meltingPointF: 787, appearance: "Fusion précoce, aspect gris brillant (galvanisation)" },
        { name: "Laiton", meltingPointC: 930, meltingPointF: 1706, appearance: "Fusion dorée (connecteurs, bornes)" },
        { name: "Étain", meltingPointC: 232, meltingPointF: 450, appearance: "Fusion très précoce, blanc argenté (soudures)" },
        { name: "Nickel", meltingPointC: 1455, meltingPointF: 2651, appearance: "Très résistant, gris argenté (résistances, alliages)" }
    ],

    wireAnalysis: {
        shortCircuit: {
            title: "Court-circuit (perles d'arc)",
            temperature: "> 2000°C localement",
            characteristics: ["Perles sphériques à bords nets", "Aspect brillant", "Cavités internes", "Projections de métal sur plusieurs cm"],
            identification: "Perle sphérique brillante = arc électrique. La distinguer de la fusion thermique (allongée, mate).",
            photos: ["arc_beads", "arc_sparks"]
        },
        thermalMelting: {
            title: "Fusion thermique",
            temperature: "Selon métal (660°C cuivre non, 1084°C)",
            characteristics: ["Fusion progressive et étirée", "Bords arrondis", "Aspect mat", "Oxydation importante"],
            identification: "Métal étiré, oxydé, mat = exposition au feu, pas à l'arc. Le cuivre fondu par le feu est rare (1084°C).",
            photos: ["engine_melted_wires", "wire_fire"]
        },
        overload: {
            title: "Surcharge électrique",
            temperature: "200-400°C progressif",
            characteristics: ["Isolation carbonisée uniformément", "Cuivre recuit : SOUPLE", "Décoloration progressive sur toute la longueur"],
            identification: "Conducteur recuit très souple + isolation carbonisée uniforme = surcharge prolongée.",
            photos: ["melted_plugs", "strip_fire"]
        },
        arcing: {
            title: "Arc électrique / mauvais contact",
            temperature: "> 3000°C",
            characteristics: ["Vaporisation du métal", "Cratères et projections", "Dépôts de carbone", "Borne fondue localement"],
            identification: "Cratère + projections + carbone = arc. Vérifier le serrage des connexions.",
            photos: ["terminal_glow", "panel_burnt"]
        }
    },

    metalIdentification: {
        heatColors: {
            title: "Couleurs de chauffe sur acier",
            temps: [
                { temp: "200-300°C", color: "Jaune paille", hex: "#f4e4bc", description: "Début d'oxydation" },
                { temp: "300-400°C", color: "Brun", hex: "#8b4513", description: "Oxydation modérée" },
                { temp: "400-500°C", color: "Violet", hex: "#8b00ff", description: "Oxydation importante" },
                { temp: "500-600°C", color: "Bleu", hex: "#0000ff", description: "Recuit complet" },
                { temp: "600-700°C", color: "Bleu foncé", hex: "#00008b", description: "Perte de résistance" },
                { temp: "700-800°C", color: "Gris foncé", hex: "#4a4a4a", description: "Déformation possible" },
                { temp: "> 800°C", color: "Noir", hex: "#000000", description: "Oxydation totale, calamine" }
            ],
            identification: "Ces couleurs sont permanentes après refroidissement : elles indiquent la température maximale atteinte.",
            photos: ["steel_samples"]
        },
        deterioration: {
            title: "Détérioration des métaux",
            types: [
                { type: "Oxydation", appearance: "Rouille, calamine, dépôt noir/rouge, vert-de-gris (cuivre)", cause: "Air chaud", temperature: "> 200°C" },
                { type: "Fusion", appearance: "Coulures, perles, déformation", cause: "Point de fusion dépassé", temperature: "Voir tableau" },
                { type: "Recuit", appearance: "Métal mou, ductile, souple", cause: "Chauffe prolongée", temperature: "400-700°C (acier)" },
                { type: "Fragilisation", appearance: "Cassures nettes, cristallisation", cause: "Chauffe + refroidissement rapide", temperature: "> 700°C" }
            ],
            photos: ["steel_samples", "engine_melted_wires"]
        }
    },

    fireCauses: [
        {
            id: "sc001", category: "electrical", title: "Court-circuit franc", type: "Court-circuit",
            description: "Contact direct entre conducteurs de polarités différentes créant un arc.",
            causes: ["Isolation détériorée", "Humidité", "Rongeurs", "Vieillissement", "Mauvais branchement"],
            identification: { wires: "Perles sphériques brillantes à bords nets, cavités internes", metal: "Projections de cuivre fondu sur plusieurs cm", surroundings: "Point de départ localisé, marques d'arc" },
            temperature: "> 2000°C au point d'arc",
            photos: ["arc_beads", "arc_sparks", "wire_fire"]
        },
        {
            id: "sc002", category: "electrical", title: "Surcharge électrique", type: "Surcharge",
            description: "Échauffement progressif par courant supérieur au calibre du conducteur.",
            causes: ["Trop d'appareils sur une prise", "Section de câble inadaptée", "Protection absente ou défaillante"],
            identification: { wires: "Isolation carbonisée uniformément, cuivre recuit souple", metal: "Oxydation et décoloration progressives", surroundings: "Échauffement sur toute la longueur du circuit" },
            temperature: "200-400°C progressif",
            photos: ["melted_plugs", "strip_fire", "overload_room"]
        },
        {
            id: "ov001", category: "electrical", title: "Surchauffe par mauvais contact", type: "Surchauffe",
            description: "Résistance de contact excessive : borne desserrée ou oxydée qui chauffe.",
            causes: ["Connexion desserrée", "Oxydation des contacts", "Vibrations", "Mauvais serrage"],
            identification: { wires: "Isolation fondue localement autour de la connexion", metal: "Borne fondue, couleur de chauffe, oxydation au point de contact", surroundings: "Départ localisé au niveau d'une connexion" },
            temperature: "300-800°C localement",
            photos: ["terminal_glow", "outlet_burnt", "socket_scorched", "panel_burnt"]
        },
        {
            id: "th001", category: "building", title: "Départ thermique sur corps chaud", type: "Thermique",
            description: "Inflammation d'un matériau au contact d'une surface chaude (radiant, halogène, conduit).",
            causes: ["Ampoule proche de tissu", "Conduit de fumée non isolé", "Chauffage d'appoint contre un mur", "Moteur surchauffé"],
            identification: { wires: "Câblage intact sauf à proximité", metal: "Couleur de chauffe localisée sur l'organe chaud", surroundings: "V-pattern au point de contact, carbonisation en cône" },
            temperature: "150-600°C selon la source",
            photos: ["v_pattern", "corridor_fire", "bedroom_fire"]
        },
        {
            id: "th002", category: "vehicle-thermal", title: "Huile sur organe chaud (échappement)", type: "Thermique véhicule",
            description: "Écoulement d'huile ou de carburant s'auto-inflammant sur un échappement ou turbo.",
            causes: ["Fuite joint de moteur", "Durite d'huile fissurée", "Reniflard qui fuit", "Sous-couple mal remonté"],
            identification: { wires: "Faisceau intact côté habitacle, fondu côté fuite", metal: "Échappement bleui, résidus d'huile carbonisée (vernis brun)", surroundings: "Point de départ sous le véhicule, au niveau de la fuite" },
            temperature: "Échappement 400-800°C, auto-inflammation huile ~ 250-350°C",
            photos: ["oil_puddle", "exhaust_smoke", "engine_burnt"]
        },
        {
            id: "ch001", category: "equipment", title: "Réaction chimique exothermique", type: "Chimique",
            description: "Emballement thermique par réaction de produits incompatibles ou auto-combustion.",
            causes: ["Mélange de produits incompatibles", "Chiffons imbibés d'huile de lin", "Stockage inapproprié", "Peroxydes, comburants"],
            identification: { wires: "Câblage généralement intact", metal: "Corrosion chimique, dépôts colorés, récipients déformés", surroundings: "Résidus chimiques, odeurs caractéristiques, départ en volume" },
            temperature: "Variable, peut dépasser 500°C",
            photos: ["chemical_sparks", "chemical_flame", "fire_triangle"]
        },
        {
            id: "bat001", category: "vehicle-electric", title: "Emballement thermique batterie Li-ion", type: "Batterie",
            description: "Thermal runaway : réaction en chaîne des cellules avec jet de feu et fumées toxiques.",
            causes: ["Surcharge", "Court-circuit interne", "Choc mécanique", "Défaut de fabrication", "Surchauffe"],
            identification: { wires: "Câbles HT fondus (gros calibre orange)", metal: "Aluminium du pack fondu (660°C), cellules éventrées", surroundings: "Odeur d'électrolyte, dépôts blancs, fumées denses" },
            temperature: "600-1000°C, réactions auto-entretenues",
            photos: ["battery_runaway", "battery_burnt", "plane_battery_fire"]
        },
        {
            id: "vt001", category: "vehicle-thermal", title: "Incendie moteur thermique", type: "Véhicule thermique",
            description: "Départ de feu au compartiment moteur : carburant, huile ou défaut électrique.",
            causes: ["Fuite de carburant", "Huile sur échappement", "Faisceau électrique usé", "Surchauffe moteur"],
            identification: { wires: "Faisceau fondu avec perles si origine électrique", metal: "Culasse aluminium fondue, acier bleui, plastiques coulants", surroundings: "Point d'origine : fuite ou faisceau, V-pattern sous capot" },
            temperature: "400-900°C",
            photos: ["car_fire_road", "engine_burnt", "engine_melted_wires"]
        },
        {
            id: "ve001", category: "vehicle-electric", title: "Incendie véhicule électrique", type: "Véhicule électrique",
            description: "Incendie lié au système haute tension ou à la batterie de traction.",
            causes: ["Défaut batterie", "Court-circuit HT", "Problème de charge", "Choc avec dommage du pack"],
            identification: { wires: "Câbles orange HT sectionnés ou fondus", metal: "Pack ouvert, aluminium fondu, structure blanchie", surroundings: "Départ sous le plancher, jets de feu latéraux" },
            temperature: "> 800°C, reignition possible plusieurs jours",
            photos: ["ev_charging_fire", "ev_wrecks", "ev_port_fire"]
        }
    ],

    diagnosticGuide: {
        steps: [
            { step: 1, title: "Sécurisation du site", action: "Couper les énergies, ventiler, EPI" },
            { step: 2, title: "Observation générale", action: "Relever les traces de propagation et suies" },
            { step: 3, title: "Point d'origine", action: "Rechercher le V-pattern, les carbonisations les plus profondes" },
            { step: 4, title: "Analyse des métaux", action: "Couleurs de chauffe, fusion, déformation (cf. tableau)" },
            { step: 5, title: "Analyse électrique", action: "Perles de fusion, isolation, recuit (cf. analyse fils)" },
            { step: 6, title: "Prélèvements", action: "Échantillons pour laboratoire (métallographie)" },
            { step: 7, title: "Documentation", action: "Photos légendées, croquis, rapport" }
        ],
        wireChecklist: ["Perles de fusion présentes ?", "Forme : sphérique (arc) ou allongée (thermique) ?", "Aspect : brillant (arc) ou mat (thermique) ?", "Isolation : carbonisée, fondue, absente ?", "Conducteur : souple (recuit/surcharge) ou cassant ?", "Projections de métal ?", "Oxydation / vert-de-gris ?"],
        metalChecklist: ["Couleurs de chauffe visibles ?", "Déformation ?", "Fusion partielle/totale (cf. tableau) ?", "Oxydation/corrosion ?", "Cassures/fragilisation ?"]
    }
};
