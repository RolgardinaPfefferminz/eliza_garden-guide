eliZa🫜 — your uncanny tourguide
=================================

Was das hier ist
-----------------
Eine schlichte Webseite, kein App-Zwang, kein Server nötig. Sie läuft,
indem man index.html im Browser öffnet oder irgendwo mit HTTPS hostet.

WICHTIG, bevor du hochlädst: Öffne index.html einfach per Doppelklick
auf deinem Rechner und schau, ob alles funktioniert — DAS kostet dich
nichts und du siehst sofort, ob etwas nicht stimmt, ganz ohne Commit,
ohne Warten auf GitHub Pages.

Ordnerstruktur
--------------
eliZabeet/
├── index.html            ← die Seite selbst. Fast nie anfassen.
├── style.css              ← Aussehen (Farben, Schrift, Abstände)
├── script.js               ← die Technik dahinter. Nur anfassen, wenn
│                              sich das VERHALTEN ändern soll.
├── content/
│   ├── stations.js         ← DEINE STATIONEN. Das bearbeitest du am
│   │                          häufigsten.
│   └── config.js           ← globale Schalter: Kartenbild, Logo,
│                              eliZas allgemeine Sätze
├── assets/
│   ├── map/                 ← die eine große Kartengrafik
│   ├── vine/                 ← eigene Rankengrafiken (optional)
│   ├── images/               ← Fotos pro Station, Bauwagen-Zeichnung,
│   │                            Milpa-Infografik, eliZa-Logo
│   └── audio/                 ← Tonaufnahmen pro Station
└── README.txt

Diese Fassung ist absichtlich fehlertolerant gebaut: fehlt irgendwo
ein Bild, ein Text oder ein Link, wird die betreffende Zeile einfach
nicht angezeigt — der Rest der Seite läuft trotzdem normal weiter.

Eine Station bearbeiten
------------------------
content/stations.js öffnen (Stift-Symbol in GitHub), den Text
zwischen den Anführungszeichen ändern, z.B.:
    prompt:"Berühre die Blätter. Riech daran."

Ein Bild zu einer Station hinzufügen
-------------------------------------
1. Bild in assets/images/ hochladen
2. In stations.js bei der Station ergänzen:
       image:"assets/images/dateiname.jpg"

Einen Link zu einer Station hinzufügen
-----------------------------------------
    note:{ label:"Titel", content:"Kurztext",
           link:"https://...", linkLabel:"Eigener Linktext →" }
"linkLabel" ist optional — fehlt es, erscheint einfach "Mehr erfahren →".

Eine Station auf der Karte verschieben
-----------------------------------------
Jede Station hat pos:{x:.., y:..} — Prozentwerte, 0 = links/oben,
100 = rechts/unten. Zahlen anpassen, bis der Punkt an der richtigen
Stelle auf deiner Kartengrafik sitzt.

eliZas Sätze
-------------
Bewusst chaotisch zweisprachig (Deutsch/Englisch gemischt) — das ist
ihr Charakter, kein Fehler. Die "prompt"-Texte (die eigentlichen
Aufgaben) bleiben davon getrennt: klar und einsprachig.

Das Quiz (nur bei der Seed-Bomb-Station)
-------------------------------------------
Liegt im Feld "quiz" der jeweiligen Station. "outro" darin erscheint
erst NACH der Auswertung — dort steht z.B. die Seed-Bomb-Anleitung.

Was ist eliZa?
---------------
Keine echte KI — nur vorgeschriebene Sätze. Benannt nach Joseph
Weizenbaums ELIZA (1966), dem ersten Chatbot-Programm, das Menschen
zum Reden brachte, obwohl es sie nie wirklich "verstand".

Veröffentlichen / Hosten
--------------------------
GitHub-Repo hochladen, unter Settings → Pages "Deploy from a branch"
/ "main" / "/ (root)" einstellen, fertig ist die öffentliche URL.
