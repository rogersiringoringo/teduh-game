// Sistem waktu in-game: Pagi, Siang, Sore, Malam
// Setiap fase 10 menit, siklus penuh 40 menit
const TIME_PHASES = [
  { name: 'Pagi', icon: '🌅', start: 0, end: 10, color: '#fff3cd' },
  { name: 'Siang', icon: '☀️', start: 10, end: 20, color: '#d4edda' },
  { name: 'Sore', icon: '🌇', start: 20, end: 30, color: '#ffe0b2' },
  { name: 'Malam', icon: '🌙', start: 30, end: 40, color: '#d1ecf1' },
];
const TIME_CYCLE = 40 * 60 * 1000; // 40 menit dalam ms
const PHASE_LEN = 10 * 60 * 1000; // 10 menit per fase
let timeOffset = 0;
let lastPhaseIdx = -1;

function initTime() {
  try {
    const saved = localStorage.getItem('teduh2_time');
    if (saved) timeOffset = parseInt(saved, 10) || 0;
  } catch (e) {}
  updateTimeUI();
  setInterval(() => {
    timeOffset = (timeOffset + 1000) % TIME_CYCLE;
    try {
      localStorage.setItem('teduh2_time', String(timeOffset));
    } catch (e) {}
    updateTimeUI();
  }, 1000);
}

function getTimeMin() {
  return (timeOffset % TIME_CYCLE) / 60000;
}

function getCurrentPhase() {
  const t = getTimeMin();
  for (let i = 0; i < TIME_PHASES.length; i++) {
    if (t >= TIME_PHASES[i].start && t < TIME_PHASES[i].end) return i;
  }
  return 0;
}

function isNight() {
  return getCurrentPhase() === 3; // Malam
}

function getDayNightAlpha() {
  const phase = getCurrentPhase();
  if (phase === 3) return 0.28; // Malam gelap
  if (phase === 2) return 0.1; // Sore redup
  if (phase === 0 && getTimeMin() < 2) return 0.05; // Pagi butuh waktu terang
  return 0; // Siang terang
}

function updateTimeUI() {
  const el = $('#time');
  if (!el) return;
  const phaseIdx = getCurrentPhase();
  const phase = TIME_PHASES[phaseIdx];
  const t = getTimeMin();
  const progress = ((t - phase.start) / 10) * 100;
  el.innerHTML =
    `<span style="display:inline-flex;align-items:center;gap:4px">` +
    `${phase.icon} ${phase.name}` +
    `<span style="display:inline-block;width:30px;height:4px;background:rgba(0,0,0,.15);border-radius:2px;overflow:hidden">` +
    `<i style="display:block;height:100%;width:${progress}%;background:var(--pri);transition:width .5s"></i>` +
    `</span></span>`;
  el.style.background = phase.color;
  // Toast saat ganti fase
  if (lastPhaseIdx !== -1 && lastPhaseIdx !== phaseIdx) {
    toast(`${phase.icon} Sekarang ${phase.name}!`);
  }
  lastPhaseIdx = phaseIdx;
}
