/* =============================================================
   EINSTELLUNGEN — für Dinge, die nicht zu einer einzelnen Station
   gehören, sondern die ganze Seite betreffen.
   ============================================================= */

const CONFIG = {
  // Pfad zu deiner handgezeichneten Gartenkarte.
  mapBackground: "assets/map/garden-map.png",

  // Eigene Grafik für die aufblühende Blüte am Ende der Tour
  // (aktuell ungenutzt, für später vorbereitet).
  finalBloomImage: "",

  // eliZas eigenes Logo, verlinkt im Footer auf die Elisabeet-Projektseite.
  logo: "assets/images/logo.png",
  logoLink: "https://himmelbeet.de/projekt/elisabeet",

  // Allgemeine eliZa-Sätze — einer wird zufällig ausgewählt, wenn die
  // Seite lädt. Bewusst im gleichen chaotisch-zweisprachigen Ton wie
  // ihre Stations-Sätze.
  fieldNotes: [
    "Take your time. The garden is not a checklist. Look closer when you feel curious.",
    "I only know what you show me. The rest belongs to the garden.",
    "There is no correct order here. Let the line get strange.",
    "On Mitmachtag, humans do things together I can only describe, never join. I find this mildly tragic. For me, not them.",
    "Ich kann Kompost beschreiben. Riechen kann ich ihn nicht. Draw your own conclusions, wer von uns beiden lebendiger ist."
  ]
};
