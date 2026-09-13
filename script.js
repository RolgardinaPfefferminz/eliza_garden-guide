/* =============================================================
   ENGINE — muss normalerweise NICHT angefasst werden.
   Inhalte kommen aus content/stations.js und content/config.js.

   Grundprinzip dieser Fassung: JEDE Funktion prüft erst, ob das,
   was sie braucht, überhaupt da ist (Element im HTML, Feld in den
   Daten) — und tut im Zweifel einfach nichts, statt abzustürzen.
   Ein fehlendes Bild oder ein vergessener Text soll nie wieder
   die ganze Seite lahmlegen.
   ============================================================= */

function $(id){ return document.getElementById(id); }

const REAL_STATIONS = STATIONS.filter(s => !s.isStart);
const START_STATION = STATIONS.find(s => s.isStart);

let routeOrder = [];
try{
  routeOrder = JSON.parse(localStorage.getItem("elizabeet_route") || "null") || [];
}catch(e){
  routeOrder = [];
}
if(!routeOrder.length){
  routeOrder = START_STATION ? [START_STATION.id] : [];
}

function saveRoute(){
  try{ localStorage.setItem("elizabeet_route", JSON.stringify(routeOrder)); }
  catch(e){ /* localStorage kann in seltenen Fällen blockiert sein — dann läuft die Seite trotzdem weiter */ }
}

function stationById(id){
  return STATIONS.find(s => s.id === id);
}


/* ---------- Karte ---------- */

function renderMap(){
  const canvas = $("map-canvas");
  const stage = $("map-stage");
  if(!canvas || !stage) return;

  stage.querySelectorAll(".station-pin").forEach(p => p.remove());

  if(CONFIG.mapBackground){
    canvas.classList.add("has-image");
    stage.style.backgroundImage = `url("${CONFIG.mapBackground}")`;
  } else {
    canvas.classList.remove("has-image");
    stage.style.backgroundImage = "";

    if(!canvas.querySelector(".map-pending")){
      const pending = document.createElement("div");
      pending.className = "map-pending";
      pending.innerHTML = `
        <div class="stamp">Map<br>pending</div>
        <div class="hint">
          Place the supplied hand-drawn garden map at
          <code>assets/map/garden-map.png</code>
          and set the path in <code>content/config.js</code>.
        </div>
      `;
      canvas.appendChild(pending);
    }
  }

  STATIONS.forEach(st => {
    if(!st.pos) return; // Station ohne Position wird einfach übersprungen

    const pin = document.createElement("div");
    const visited = routeOrder.includes(st.id);

    pin.className =
      "station-pin" +
      (st.isStart ? " start" : "") +
      (visited ? " visited" : "") +
      (!visited && !st.isStart ? " pulsing" : "");

    pin.style.left = st.pos.x + "%";
    pin.style.top = st.pos.y + "%";

    if(st.isStart){ pin.innerHTML = "📍"; }

    pin.onclick = () => openPanel(st.id);
    stage.appendChild(pin);
  });

  drawRouteLine(stage);
  updateMapStatus();
}


function drawRouteLine(stage){
  const svg = $("map-svg");
  const line = $("route-line");
  if(!svg || !line || !stage) return;

  const rect = stage.getBoundingClientRect();
  if(!rect.width || !rect.height) return;

  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);

  const d = routeOrder
    .map(id => stationById(id))
    .filter(st => st && st.pos)
    .map((st, i) => {
      const x = (st.pos.x / 100) * rect.width;
      const y = (st.pos.y / 100) * rect.height;
      return (i === 0 ? "M" : "L") + x + "," + y;
    })
    .join(" ");

  line.setAttribute("d", d);
}


function updateMapStatus(){
  const el = $("map-status");
  if(!el) return;

  const total = REAL_STATIONS.length;
  const done = routeOrder.filter(id => id !== START_STATION?.id).length;

  el.textContent = done === 0 ? "Tap a pin to begin" : `${done} / ${total} explored`;
}


/* ---------- Hero-Zähler ---------- */

function renderHero(){
  const total = REAL_STATIONS.length;
  const done = routeOrder.filter(id => id !== START_STATION?.id).length;

  const countEl = $("hero-count");
  const totalEl = $("hero-total");
  if(countEl) countEl.textContent = String(done).padStart(2, "0");
  if(totalEl) totalEl.textContent = String(total).padStart(2, "0");
}


/* ---------- Your Route ---------- */

function renderRoutePanel(){
  const tag = $("route-tag");
  const body = $("route-body");
  if(!tag || !body) return;

  const visitedReal = routeOrder.filter(id => id !== START_STATION?.id);

  if(visitedReal.length === 0){
    tag.textContent = "Not yet started";
    body.innerHTML = `
      <div class="route-choose">
        <span class="plus">+</span>
        <span>Choose a station<br>from the map.</span>
      </div>
    `;
  } else {
    tag.textContent = "In progress";
    const steps = visitedReal
      .map(id => {
        const st = stationById(id);
        return `<span class="step">${st ? st.name : id}</span>`;
      })
      .join(" → ");
    body.innerHTML = `<div class="route-thread">${steps}</div>`;
  }
}


/* ---------- eliZa Field Notes ---------- */

function renderFieldNote(){
  const el = $("field-note-text");
  if(!el) return;

  const notes = (CONFIG && CONFIG.fieldNotes) || [];
  el.textContent = notes.length ? notes[Math.floor(Math.random() * notes.length)] : "";
}


/* ---------- Footer-Logo ---------- */

function renderFooterLogo(){
  const link = $("footer-logo");
  const img = $("footer-logo-img");
  if(!link || !img) return;

  if(CONFIG && CONFIG.logo){
    img.src = CONFIG.logo;
    link.href = CONFIG.logoLink || "#";
    link.style.display = "flex";
  } else {
    link.style.display = "none";
  }
}


/* =============================================================
   QUIZ — nur aktiv, wenn eine Station ein "quiz"-Feld hat.
   ============================================================= */

function addQuizStyles(){
  // Styles liegen inzwischen in style.css — diese Funktion bleibt als
  // leerer Platzhalter, falls andere Code-Teile sie noch aufrufen.
}

function renderQuiz(st){
  const noteBox = $("panel-note");
  let quizBox = $("panel-quiz");

  if(!st || !st.quiz){
    if(quizBox) quizBox.style.display = "none";
    return;
  }

  if(!quizBox){
    quizBox = document.createElement("div");
    quizBox.id = "panel-quiz";
    if(noteBox && noteBox.parentNode){
      noteBox.parentNode.insertBefore(quizBox, noteBox.nextSibling);
    } else if($("panel")){
      $("panel").appendChild(quizBox);
    } else {
      return; // kein Ort, wo das Quiz hin könnte — lieber nichts tun als abstürzen
    }
  }

  quizBox.innerHTML = "";
  quizBox.style.display = "block";

  const quizTitle = document.createElement("h3");
  quizTitle.textContent = st.quiz.title || "Quiz";
  quizBox.appendChild(quizTitle);

  const form = document.createElement("div");
  form.id = "quiz-form";

  (st.quiz.questions || []).forEach((q, index) => {
    const questionBox = document.createElement("div");
    questionBox.className = "quiz-question";

    const questionTitle = document.createElement("p");
    questionTitle.className = "quiz-question-title";
    questionTitle.textContent = `${index + 1}. ${q.question || ""}`;
    questionBox.appendChild(questionTitle);

    if(q.type === "text"){
      const input = document.createElement("textarea");
      input.className = "quiz-text-input";
      input.id = `quiz-q-${index}`;
      input.placeholder = "Your answer…";
      questionBox.appendChild(input);

    } else if(q.type === "multi"){
      (q.options || []).forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        label.innerHTML = `<input type="checkbox" name="quiz-${index}" value="${optionIndex}"> ${option}`;
        questionBox.appendChild(label);
      });

    } else {
      (q.options || []).forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "quiz-option";
        label.innerHTML = `<input type="radio" name="quiz-${index}" value="${optionIndex}"> ${option}`;
        questionBox.appendChild(label);
      });
    }

    form.appendChild(questionBox);
  });

  const submitButton = document.createElement("button");
  submitButton.className = "quiz-submit";
  submitButton.textContent = "Check my answers";
  submitButton.onclick = () => checkQuiz(st);
  form.appendChild(submitButton);

  quizBox.appendChild(form);
}


function checkQuiz(st){
  if(!st || !st.quiz) return;
  const questions = st.quiz.questions || [];
  const quizBox = $("panel-quiz");
  if(!quizBox) return;

  let score = 0;

  questions.forEach((q, index) => {
    if(q.type === "text") return;

    if(q.type === "multi"){
      const selected = [...document.querySelectorAll(`input[name="quiz-${index}"]:checked`)]
        .map(input => Number(input.value)).sort((a,b) => a-b);
      const correct = (Array.isArray(q.answers) ? q.answers : []).slice().sort((a,b) => a-b);
      if(selected.length === correct.length && selected.every((v,i) => v === correct[i])) score++;
      return;
    }

    const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);
    if(selected && Number(selected.value) === Number(q.answer)) score++;
  });

  let result = quizBox.querySelector(".quiz-result");
  if(!result){
    result = document.createElement("div");
    result.className = "quiz-result";
    quizBox.appendChild(result);
  }

  const knowledgeQuestions = questions.filter(q => q.type !== "text").length;
  const textQuestions = questions.filter(q => q.type === "text").length;

  result.innerHTML =
    `You got ${score} / ${knowledgeQuestions} knowledge questions right.` +
    (textQuestions ? `<br><br>Your own answer counts as part of the journey.` : "");

  const submitButton = quizBox.querySelector(".quiz-submit");
  if(submitButton){
    submitButton.textContent = "Quiz checked";
    submitButton.disabled = true;
  }

  // Outro (z.B. die Seed-Bomb-Anleitung) erscheint erst NACH der Auswertung
  if(st.quiz.outro && !quizBox.querySelector(".quiz-outro")){
    const outro = document.createElement("div");
    outro.className = "quiz-outro";
    outro.textContent = st.quiz.outro;
    quizBox.appendChild(outro);
  }
}


/* ---------- Stations-Panel ---------- */

function openPanel(id){
  const st = stationById(id);
  if(!st) return;

  const iconEl = $("panel-icon");
  const titleEl = $("panel-title");
  const promptEl = $("panel-prompt");
  if(iconEl) iconEl.textContent = st.icon || "";
  if(titleEl) titleEl.textContent = st.name || "";
  if(promptEl){
    promptEl.textContent = st.prompt || "";
    promptEl.style.display = st.prompt ? "block" : "none";
  }

  const img = $("panel-image");
  if(img){
    if(st.image){ img.src = st.image; img.style.display = "block"; }
    else { img.style.display = "none"; }
  }

  const audio = $("panel-audio");
  if(audio){
    if(st.audio){ audio.src = st.audio; audio.style.display = "block"; }
    else { audio.style.display = "none"; }
  }

  const elizaBox = $("panel-eliza");
  if(elizaBox){
    const line = Array.isArray(st.eliza)
      ? st.eliza[Math.floor(Math.random() * st.eliza.length)]
      : st.eliza;
    elizaBox.textContent = line ? "🫜 eliZa: " + line : "";
    elizaBox.style.display = line ? "block" : "none";
  }

  const noteBox = $("panel-note");
  if(noteBox){
    if(st.note){
      noteBox.innerHTML =
        `<strong>${st.note.label || ""}</strong><br>${st.note.content || ""}` +
        (st.note.link ? `<br><a href="${st.note.link}" target="_blank" rel="noopener">${st.note.linkLabel || "Mehr erfahren →"}</a>` : "");
      noteBox.style.display = "block";
    } else {
      noteBox.style.display = "none";
    }
  }

  renderQuiz(st);

  const visited = routeOrder.includes(id);
  const btn = $("mark-visited-btn");
  if(btn){
    btn.textContent = visited ? "Mark as not visited" : "Mark as discovered";
    btn.onclick = () => {
      if(routeOrder.includes(id)){
        routeOrder = routeOrder.filter(x => x !== id);
      } else {
        routeOrder.push(id);
      }
      saveRoute();
      renderAll();
      openPanel(id);
    };
  }

  const overlay = $("overlay");
  if(overlay) overlay.classList.add("open");
}

function closePanel(){
  const overlay = $("overlay");
  if(overlay) overlay.classList.remove("open");
}

if($("close-panel-btn")) $("close-panel-btn").addEventListener("click", closePanel);
if($("overlay")) $("overlay").addEventListener("click", (e) => {
  if(e.target.id === "overlay") closePanel();
});
if($("reset-btn")) $("reset-btn").addEventListener("click", () => {
  routeOrder = START_STATION ? [START_STATION.id] : [];
  saveRoute();
  renderAll();
});


/* ---------- Alles zusammen neu zeichnen ---------- */

function renderAll(){
  renderMap();
  renderHero();
  renderRoutePanel();
}

saveRoute();
renderAll();
renderFieldNote();
renderFooterLogo();

/* ---------- Karte auf Startpunkt ausrichten ---------- */
if(START_STATION && $("map-canvas")){
  requestAnimationFrame(() => {
    const mapCanvas = $("map-canvas");
    if(!mapCanvas) return;
    mapCanvas.scrollLeft =
      (START_STATION.pos.x / 100) * mapCanvas.scrollWidth - mapCanvas.clientWidth / 2;
  });
}
