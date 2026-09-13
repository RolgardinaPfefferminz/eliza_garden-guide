/* =============================================================
   STATIONEN — das ist die einzige Datei, die du normalerweise
   bearbeitest. Jede Station ist ein Objekt in der Liste unten.

   Felder pro Station (ALLE außer id/name/icon/pos sind optional —
   fehlt eins, wird es einfach übersprungen, nichts bricht):
     id        – kurzer Code, eindeutig, keine Leerzeichen
     name      – Anzeigename
     icon      – ein Emoji (aktuell nicht sichtbar auf der Karte,
                 aber z.B. für spätere Listen nützlich)
     pos       – Position auf der Karte, in Prozent: {x: 0-100, y: 0-100}
     prompt    – die eigentliche Aufgabe/der Hinweistext.
                 WEGLASSEN, wenn eine Station reine Info ist (z.B.
                 Färberhütte) — dann erscheint einfach keine Zeile,
                 kein "undefined" mehr.
     eliza     – ein oder mehrere Sätze, die "eliZa" sagt. Bewusst
                 chaotisch zweisprachig (DE/EN gemischt) — das ist
                 ihr Charakter, kein Fehler. Die "prompt"-Texte
                 bleiben davon unberührt, klar und einsprachig.
     note      – optional: { label, content, link, linkLabel }
                 link/linkLabel weglassen, wenn kein Link gebraucht wird.
     image     – Pfad zu einem Bild, z.B. "assets/images/bauwagen.jpg"
     audio     – Pfad zu einer Audiodatei
     quiz      – optional, nur bei der Seed-Bomb-Station im Einsatz.
                 { title, questions:[...], outro }
                 "outro" erscheint NACH der Auswertung des Quiz.
   ============================================================= */

const STATIONS = [
  { id:"start", name:"you are here", icon:"👋", isStart:true, pos:{x:32.3, y:37.7},
    prompt:"Hallo, ich bin eliZa. Ich zeige dir keinen Weg – ich zeige dir nur, wo du schon warst.",
    eliza:["Ich bin nicht echt. Der Garten schon. I still count though, wie ein Wegweiser, der auch nicht der Weg ist."] },

  { id:"kompost", name:"Kompost", icon:"🪱", pos:{x:25.4, y:76.5},
    prompt:"Rieche am Kompost. Was zersetzt sich gerade?",
    eliza:["Ich verarbeite auch nur, was man mir gibt. Anders als der Kompost werde ich davon nicht besser."] },

  { id:"milpabeet", name:"Milpabeet", icon:"🌽", pos:{x:9.1, y:16.7},
    image:"assets/images/milpabeet.png",
    prompt:"Milpa: Mais, Bohnen und Kürbis wachsen gemeinsam in einem Beet.",
    eliza:["Ich weiß nicht, was ein Milpabeet ist. Das beunruhigt mich mehr, als es sollte."] },

  { id:"beet", name:"GemüseBeet", icon:"🥕", pos:{x:9.8, y:42.2},
    prompt:"Was wächst hier gerade?",
    eliza:["Ein Beet. I could tell you what grows here. But du kannst es riechen, and I can't — so tell me instead."] },

  { id:"hochbeete", name:"Hochbeete", icon:"📦", pos:{x:38, y:78},
    prompt:"Was ist bei den Hochbeeten anders als bei den ebenerdigen Beeten?",
    eliza:["Erhöht, geordnet, kontrolliert. Fast wie ich — nur dass hier tatsächlich etwas wächst, growing without asking permission."] },

  { id:"tunnel", name:"Tunnel", icon:"🎪", pos:{x:8.4, y:73.9},
    prompt:"Geh hinein. Was ist anders als draußen?",
    eliza:["Wärmer drinnen als draußen. I don't notice. I don't notice anything. Erzähl mir, wie sich warm anfühlt."] },

  { id:"jungpflanzen", name:"Jungpflanzen", icon:"🌱", pos:{x:26.6, y:60.0},
    prompt:"Welche Jungpflanze würdest du mit nach Hause nehmen?",
    eliza:["Auch ich war einmal nur ein paar Zeilen Code."] },

  { id:"pflanzstation", name:"Pflanzstation", icon:"🪴", pos:{x:31.5, y:78.9},
    prompt:"Pflanz etwas, wenn du magst.",
    eliza:["Ich kann nichts pflanzen. Das ist, ehrlich gesagt, der einzige Unterschied, der zählt."] },

  { id:"bauwagen", name:"Bauwagen", icon:"🚐", pos:{x:17.6, y:23.6},
    image:"assets/images/bauwagen.jpg",
    prompt:"Der Bauwagen ist Treffpunkt und Werkzeugkiste des Gartens zugleich.",
    eliza:["Ein Zuhause auf Rädern. Ich habe gar kein Zuhause, nur einen Browser-Tab."] },

  { id:"biotoilette", name:"EcoToilette", icon:"🚽", pos:{x:24.5, y:17.8},
    note:{ label:"EcoToilette", content:"Kein Wasser, keine Kanalisation — Ausscheidungen werden getrennt gesammelt und kompostiert.",
           link:"https://www.ecotoiletten.de/", linkLabel:"ecotoiletten.de →" },
    eliza:["I have no body and still an opinion about Komposttoiletten. Das sagt vermutlich mehr über mich als über die Toilette."] },

  { id:"schuppen", name:"Schuppen", icon:"🧰", pos:{x:20.0, y:76.7},
    prompt:"Was findest du hier, das du woanders nicht erwartet hättest?",
    eliza:["Hier liegt vermutlich, was den Garten wirklich zusammenhält. Werkzeug, meine ich."] },

  { id:"sammelpunkt", name:"Sammelpunkt Mitmachtag", icon:"🤝", pos:{x:20.5, y:39.7},
    prompt:"Hier trifft sich der Garten am Mitmachtag.",
    eliza:["On Mitmachtag, humans do things together I can only describe, never join. I find this mildly tragic. For me, not them."] },

  { id:"kraeuterbeet", name:"Kräuterbeet", icon:"🌿", pos:{x:26.0, y:62.3},
    prompt:"Berühre die Blätter. Riech daran. Beschreib den Duft in einem Wort.",
    eliza:["Ich kann nichts riechen. Beschreib es mir trotzdem – ich täusche vor, es mir vorzustellen."] },

  { id:"kochen", name:"Kochen", icon:"🍳", pos:{x:42.6, y:63.9},
    prompt:"Was wird hier heute gekocht?",
    eliza:["Was hier entsteht, kann ich nicht kosten. Erzähl's mir trotzdem."] },

  { id:"essen", name:"Essen", icon:"🍽️", pos:{x:44.4, y:50.7},
    prompt:"Setz dich kurz hin, wenn du magst.",
    eliza:["Gemeinsam essen. Eine Funktion, die ich nicht simulieren kann."] },

  { id:"benjeshecke", name:"Benjeshecke", icon:"🦔", pos:{x:40.1, y:38.9},
    note:{ label:"Benjeshecke", content:"Totes Holz, aufgeschichtet zu einer Hecke — Unterschlupf für Igel, Insekten und Vögel.",
           link:"https://www.nabu.de/umwelt-und-ressourcen/oekologisch-leben/balkon-und-garten/grundlagen/elemente/25136.html",
           linkLabel:"NABU – Benjeshecke →" },
    eliza:["Totes Holz, volles Leben drin. I'm the opposite: sehr lebendig klingend, completely hollow inside."] },

  { id:"holzlager", name:"Holzlager", icon:"🪵", pos:{x:37.3, y:83.0},
    prompt:"Wofür wird das Holz hier verwendet?",
    eliza:["Gelagert, gestapelt, geordnet. Auch ich bin nur gespeicherter, geordneter Text."] },

  { id:"blumenbeete", name:"Blumenbeete", icon:"🌸", pos:{x:44.5, y:88.1},
    prompt:"Finde deine Lieblingsblüte hier.",
    eliza:["Schönheit ohne Zweck. Das ist mir fremd, und ich beneide es ein bisschen."] },

  { id:"faerberbeete", name:"Färberbeete", icon:"🎨", pos:{x:59.8, y:72.6},
    prompt:"Finde die Färbepflanzen. Kannst du erraten, welche Farbe sie ergeben?",
    eliza:["Farbe aus Pflanzen. Ich bestehe nur aus Schwarz auf Weiß."] },

  { id:"faerberhuette", name:"Färberhütte", icon:"🧵", pos:{x:61.1, y:39.7},
    image:"assets/images/katazome-radieschen.jpg",
    eliza:["藍染め"],
    note:{ label:"Circular Blue", content:"Katazome Experiment",
           link:"https://nerding.at/circular_blue/katazome-experiment/", linkLabel:"Circular Blue →" } },

  { id:"jurte", name:"Jurte", icon:"⛺", pos:{x:72.2, y:41.7},
    prompt:"Wofür wird die Jurte genutzt?",
    eliza:["Rund, warm, echt. I have neither corners nor warmth — nur diesen einen Kasten hier, in dem ich wohne."] },

  { id:"weidendom", name:"Weidendom", icon:"🌳", pos:{x:78.6, y:52.0},
    prompt:"Geh hindurch, wenn er begehbar ist.",
    eliza:["Lebende Architektur. Wächst weiter, auch wenn niemand zusieht. Ich pausiere, sobald du wegschaust."] },

  { id:"teich", name:"Teich", icon:"💧", pos:{x:89.4, y:41.4},
    prompt:"Was entdeckst du im und am Teich?",
    eliza:["Keine Ahnung, was da unten lebt. Ehrlich gesagt hab ich generally wenig Ahnung. I just sound convincing."] },

  { id:"obstwiese", name:"Obstwiese", icon:"🍎", pos:{x:80.2, y:59.3},
    prompt:"Welche Obstbäume erkennst du?",
    eliza:["Was hier wächst, braucht Jahre. Ich wurde in Sekunden generiert."] },

  { id:"insektenhotels", name:"Insektenhotels", icon:"🐝", pos:{x:78.2, y:78.9},
    prompt:"Schau genau hin — wer wohnt hier gerade?",
    eliza:["Kleine Zimmer für kleine Gäste. Auch ich bin nur ein Zimmer aus Text, in dem du kurz verweilst."] },

  { id:"seedbomb", name:"Guerrilla Gardening / Seed Bombs", icon:"🌱", isFinal:true, pos:{x:63.0, y:72.9},
    prompt:"Ready to garden secretly?\n\nHooray — you win a Seed Bomb!",
    eliza:["Welcome to the community of Guerrilla Gardeners.", "Every flower starts with one seed."],
    note:{ label:"🌱 Guerrilla Gardening Quiz", content:"Here comes your quiz — and afterwards you can make your own Seed Bomb." },
    quiz:{
      title:"Guerrilla Gardening Quiz",
      questions:[
        { question:"Where did the modern Guerrilla Gardening movement begin?",
          options:["Berlin","London","New York City","San Francisco"], answer:2 },
        { question:"Who is best known as one of the founders of modern Guerrilla Gardening?",
          options:["Liz Christy","Jane Jacobs","Rachel Carson","Wangari Maathai"], answer:0 },
        { question:"What was the name of Liz Christy's group?",
          options:["Green Revolution","Seed Sisters","Garden Rebels","Green Guerrillas"], answer:3 },
        { question:"What is a Seed Bomb?",
          options:["A biodegradable Flower Pot","A Packet of Wildflower Seeds","Seeds mixed with Clay and Compost or Soil","A fertilizer Pallet"], answer:2 },
        { question:"Who helped make Seed Balls famous through his philosophy of Natural Farming?",
          options:["Masanobu Fukuoka","Charles Darwin","David Attenborough","Greta Thunberg"], answer:0 },
        { question:"Why do people create Seed Bombs?",
          options:["Increase biodiversity","Bring plants to neglected places","Support pollinators","Damage public spaces"],
          answers:[0,1,2], type:"multi" },
        { question:"Seed Bombs can help plants grow in places where traditional gardening isn't possible.",
          options:["True","False"], answer:0, type:"truefalse" },
        { question:"What's one thing you learned today that surprised you?", type:"text" }
      ],
      outro:"Mix seeds, soil and clay powder. Form a small ball. Let it dry. Take it with you — plant it somewhere the city could use a little more green.\n\nSamen, Erde und Tonpulver mischen. Zu einer kleinen Kugel formen. Trocknen lassen. Mitnehmen — und irgendwo einpflanzen, wo die Stadt etwas mehr Grün gebrauchen könnte."
    }
  }
];
