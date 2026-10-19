// Audio: ambience sintetis + musik. Semua disintesis Web Audio — nol aset, nol copyright.
// Ambience posisional (danau/lapangan/kafe) yang reaktif cuaca & waktu,
// musik dari file lokal pilihan pemain, dan musik synth kecil (music box).
//
// Perhatikan urutan <script> di index.html: file ini harus dimuat sebelum places.js
// supaya ACT bisa memakai openStage() tanpa masalah TDZ.

const AU_KEY = 'teduh2_audio';
// Nada pentatonik (C mayor) untuk music box — aman, tidak ada intervalyang "salah".
const AU_SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
const AU_DEF = { vol: 0.3, amb: 0.7, mus: 0.45, mute: 0 };

let AC = null,
  auMaster = null,
  auAmb = null,
  auMus = null,
  auReady = false,
  auBlock = false,
  auDuck = 0,
  auP = Object.assign({}, AU_DEF),
  auL = {},
  auLvl = { bird: 0, crick: 0, drop: 0 },
  auNB = {},
  auNext = { bird: 0, crick: 0, drop: 0, note: 0 },
  auTrack = null,
  auTrackURL = '',
  auTrackName = '',
  auLast = 0;

// ---------------------------------------------------------------- init & prefs

function initAudio() {
  try {
    const s = JSON.parse(localStorage.getItem(AU_KEY) || '{}');
    if (s && typeof s === 'object') auP = Object.assign({}, AU_DEF, s);
  } catch (e) {}
  auP.vol = Math.max(0, Math.min(1, +auP.vol || 0));
  auP.amb = Math.max(0, Math.min(1, +auP.amb || 0));
  auP.mus = Math.max(0, Math.min(1, +auP.mus || 0));
  auP.mute = auP.mute ? 1 : 0;

  // Autoplay policy: audio hanya boleh mulai setelah ada interaksi pengguna.
  const un = () => {
    removeEventListener('pointerdown', un);
    removeEventListener('keydown', un);
    removeEventListener('touchstart', un);
    removeEventListener('wheel', un);
    auUnlock();
  };
  addEventListener('pointerdown', un);
  addEventListener('keydown', un);
  addEventListener('touchstart', un);
  addEventListener('wheel', un);
  auBtn();
}

function auSave() {
  try {
    localStorage.setItem(AU_KEY, JSON.stringify(auP));
  } catch (e) {}
}

function auCtx() {
  if (AC) return AC;
  const A = window.AudioContext || window.webkitAudioContext;
  if (!A) return null;
  AC = new A();
  auMaster = AC.createGain();
  auMaster.gain.value = 0;
  auMaster.connect(AC.destination);
  auAmb = AC.createGain();
  auAmb.gain.value = auP.amb;
  auAmb.connect(auMaster);
  auMus = AC.createGain();
  auMus.gain.value = auP.mus;
  auMus.connect(auMaster);
  return AC;
}

function auUnlock() {
  if (auReady) return;
  if (auP.mute || auP.vol <= 0) return; // tetap diam kalau memang dimatikan
  if (!auCtx()) return;
  if (AC.state === 'suspended' && AC.resume) AC.resume();
  auReady = true;
  auBuild();
  auApply();
  auBtn();
  if (auTrack) auPlay();
}

// ---------------------------------------------------------------- noise source

// 'low' = brown noise (angin/ombak, lembut), 'hi' = white noise (hujan, brighter)
function auBuf(kind) {
  if (auNB[kind]) return auNB[kind];
  const n = Math.floor(AC.sampleRate * 2),
    b = AC.createBuffer(1, n, AC.sampleRate),
    d = b.getChannelData(0);
  if (kind === 'hi') {
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  } else {
    let last = 0;
    for (let i = 0; i < n; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = last * 3.2;
    }
  }
  auNB[kind] = b;
  return b;
}

// ---------------------------------------------------------------- zona & layer

function auZones() {
  let cafe = { x: 125, y: 135 };
  try {
    const c = B.filter((b) => b[7] === 'cafe')[0];
    if (c) cafe = { x: c[0] + c[2] / 2, y: c[1] + c[3] / 2 };
  } catch (e) {}
  return {
    chat: cafe,
    water: { x: LK.x, y: LK.y + LK.ry * 0.4 },
    birds: { x: FIELD[0] + FIELD[2] / 2, y: FIELD[1] + FIELD[3] / 2 },
  };
}

// out = gain posisional (dikendalikan updateAudio), mod = gain untuk LFO
function auLayer(name, x, y, r, base) {
  const out = AC.createGain(),
    mod = AC.createGain();
  out.gain.value = 0;
  mod.gain.value = 1;
  mod.connect(out);
  out.connect(auAmb);
  auL[name] = { out, mod, x, y, r, base };
  return auL[name];
}

function auBuild() {
  if (!AC || auL.wind) return;
  const z = auZones();

  // Angin — selalu ada, dasar suasana
  {
    const L = auLayer('wind', 0, 0, 0, 0.5);
    const s = AC.createBufferSource();
    s.buffer = auBuf('low');
    s.loop = true;
    const f = AC.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 420;
    f.Q.value = 0.7;
    s.connect(f);
    f.connect(L.mod);
    const lfo = AC.createOscillator(),
      lg = AC.createGain();
    lfo.frequency.value = 0.07;
    lg.gain.value = 190;
    lfo.connect(lg);
    lg.connect(f.frequency);
    s.start();
    lfo.start();
  }

  // Air danau — bandpass + LFO gain (ombak)
  {
    const L = auLayer('water', z.water.x, z.water.y, 210, 0.95);
    const s = AC.createBufferSource();
    s.buffer = auBuf('low');
    s.loop = true;
    const f = AC.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 640;
    f.Q.value = 1.2;
    s.connect(f);
    f.connect(L.mod);
    const lfo = AC.createOscillator(),
      lg = AC.createGain();
    lfo.frequency.value = 0.23;
    lg.gain.value = 0.45;
    lfo.connect(lg);
    lg.connect(L.mod.gain);
    s.start();
    lfo.start();
  }

  // Ngobrol di kafe — noise burst ter-filter, sangat halus
  {
    const L = auLayer('chat', z.chat.x, z.chat.y, 165, 0.7);
    const s = AC.createBufferSource();
    s.buffer = auBuf('hi');
    s.loop = true;
    const f = AC.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 760;
    f.Q.value = 2.6;
    s.connect(f);
    f.connect(L.mod);
    const lfo = AC.createOscillator(),
      lg = AC.createGain();
    lfo.frequency.value = 0.4;
    lg.gain.value = 0.3;
    lfo.connect(lg);
    lg.connect(L.mod.gain);
    s.start();
    lfo.start();
  }

  // Burung & jangkrik — hanya blip, jadi cukup node gain kosong
  auLayer('birds', z.birds.x, z.birds.y, 300, 0);
  auLayer('crick', 0, 0, 0, 0);
  // Hujan — white noise highpass, kontinu
  {
    const L = auLayer('rain', 0, 0, 0, 0);
    const s = AC.createBufferSource();
    s.buffer = auBuf('hi');
    s.loop = true;
    const f = AC.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 1300;
    const g = AC.createGain();
    g.gain.value = 0.5;
    s.connect(f);
    f.connect(g);
    g.connect(L.mod);
    s.start();
  }
}

// ---------------------------------------------------------------- suara satu kali

function auPip(freq, at, dur, vol, type, dest) {
  if (!AC) return;
  const o = AC.createOscillator(),
    g = AC.createGain();
  o.type = type || 'sine';
  o.frequency.setValueAtTime(freq, at);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), at + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g);
  g.connect(dest);
  o.start(at);
  o.stop(at + dur + 0.04);
}

function auChirp() {
  const t = AC.currentTime + 0.02,
    f = 2200 + Math.random() * 2500,
    n = 2 + ((Math.random() * 2) | 0);
  for (let i = 0; i < n; i++) {
    const a = t + i * (0.075 + Math.random() * 0.06);
    auPip(f * (0.9 + Math.random() * 0.3), a, 0.055, 0.5, 'sine', auL.birds.out);
    auPip(f * (1.25 + Math.random() * 0.4), a + 0.03, 0.04, 0.22, 'sine', auL.birds.out);
  }
}

function auCrick() {
  const t = AC.currentTime + 0.02;
  for (let i = 0; i < 4 + ((Math.random() * 3) | 0); i++) {
    auPip(4200 + Math.random() * 500, t + i * 0.055, 0.02, 0.16, 'square', auL.crick.out);
  }
}

function auDrop() {
  const t = AC.currentTime + 0.01;
  auPip(1400 + Math.random() * 2600, t, 0.02, 0.06, 'sine', auL.rain.out);
}

function auNote(f, t, dur, vol) {
  auPip(f, t, dur, vol, 'triangle', auMus);
  auPip(f / 2, t, dur * 1.2, vol * 0.4, 'sine', auMus);
}

// Music box: satu not tiap ~1.1s, sesekali nada harmoni. Jarang & lembut.
function auSched(now) {
  if (!AC || AC.state !== 'running') return;
  const t = AC.currentTime;
  if (auNext.note < t) auNext.note = t + 0.3;

  while (auNext.note < t + 0.5) {
    const i = (Math.random() * AU_SCALE.length) | 0,
      v = 0.16 + Math.random() * 0.1;
    auNote(AU_SCALE[i], auNext.note, 1.1, v);
    if (Math.random() < 0.3) auNote(AU_SCALE[(i + 2) % AU_SCALE.length], auNext.note + 0.28, 1.0, v * 0.7);
    auNext.note += 1.1 + Math.random() * 0.7;
  }

  if (now > auNext.bird) {
    auNext.bird = now + 2600 + Math.random() * 5200;
    if (auLvl.bird > 0.02) auChirp();
  }
  if (now > auNext.crick) {
    auNext.crick = now + 1400 + Math.random() * 2600;
    if (auLvl.crick > 0.02) auCrick();
  }
  if (now > auNext.drop) {
    auNext.drop = now + 90 + Math.random() * 320;
    if (auLvl.drop > 0.02) auDrop();
  }
}

// ---------------------------------------------------------------- loop update

function updateAudio() {
  if (!auReady || !AC) return;
  const now = Date.now();
  if (now - auLast < 66) return; // ~15Hz cukup untuk audio
  auLast = now;
  try {
    if (AC.state !== 'running') return;
    const w = typeof getWeather === 'function' ? getWeather().id : 'clear',
      night = typeof isNight === 'function' ? isNight() : false;
    auL.wind.base = 0.5;
    auL.rain.base = w === 'rain' || w === 'storm' ? 0.75 : 0;
    auL.birds.base = night ? 0 : 0.85;
    auL.crick.base = night ? 0.5 : 0;
    const lvl = {};
    for (const k in auL) {
      const L = auL[k];
      let g = 1;
      if (L.r > 0) {
        const d = Math.hypot(P.x - L.x, P.y - L.y);
        g = Math.max(0, 1 - d / L.r);
        g = g * g;
      }
      g *= L.base;
      lvl[k] = g;
      L.out.gain.setTargetAtTime(g, AC.currentTime, 0.6);
    }
    auLvl = lvl;
    auSched(now);
  } catch (e) {
    auReady = false;
  }
}

// ---------------------------------------------------------------- mixing

function auTarget() {
  if (auBlock || auP.mute) return 0;
  return auP.vol * (auDuck > Date.now() ? 0.4 : 1);
}

function auApply() {
  if (!AC) return;
  const t = AC.currentTime;
  auMaster.gain.setTargetAtTime(auTarget(), t, 0.3);
  auAmb.gain.setTargetAtTime(auP.amb, t, 0.2);
  auMus.gain.setTargetAtTime(auP.mus, t, 0.2);
}

// Dipakai parental control: hentikan suara total.
function pauseAllAudio() {
  auBlock = true;
  auApply();
  if (auTrack) auTrack.pause();
}

function resumeAudio() {
  if (!auBlock) return;
  auBlock = false;
  auApply();
  auPlay();
}

// Turunkan sementara, naikkan sendiri setelah beberapa detik.
function duckAudio(ms) {
  if (!auP.vol) return;
  auDuck = Date.now() + (ms || 30000);
  auApply();
}

function auBtn() {
  const b = document.getElementById('au');
  if (!b) return;
  const on = !auP.mute && auP.vol > 0;
  b.textContent = on ? '🔊' : '🔇';
  b.title = on ? 'Suara aktif — klik untuk senyap' : 'Suara mati — klik untuk nyalakan';
}

// ---------------------------------------------------------------- musik file user

function auPick(f) {
  if (!f) return;
  if (auTrackURL) URL.revokeObjectURL(auTrackURL);
  auTrackURL = URL.createObjectURL(f);
  auTrackName = f.name.slice(0, 48);
  auTrack = new Audio(auTrackURL);
  auTrack.loop = true;
  auTrack.volume = 1;
  auPlay();
  toast('🎵 Memutar ' + auTrackName);
  auPanel();
}

function auPlay() {
  if (!auTrack || auBlock) return;
  const p = auTrack.play();
  if (p && p.catch) p.catch(() => {});
}

function auClear() {
  if (auTrack) {
    auTrack.pause();
    auTrack = null;
  }
  if (auTrackURL) {
    URL.revokeObjectURL(auTrackURL);
    auTrackURL = '';
  }
  auTrackName = '';
  auPanel();
}

// ---------------------------------------------------------------- UI

function auSet(k, v) {
  if (k === 'vol') auP.vol = v / 100;
  if (k === 'amb') auP.amb = v / 100;
  if (k === 'mus') auP.mus = v / 100;
  if (auP.vol > 0) auP.mute = 0;
  auSave();
  auApply();
  auBtn();
  if (!auReady && auP.vol > 0 && !auP.mute) auUnlock();
}

function auToggleMute() {
  auP.mute = auP.mute ? 0 : 1;
  auSave();
  auApply();
  auBtn();
  if (!auP.mute && !auReady) auUnlock();
  toast(auP.mute ? '🔇 Suara dimatikan' : '🔊 Suara dinyalakan');
}

function auPanel() {
  const row = (id, label, val, note) =>
    '<div class="mut" style="margin:8px 0 2px">' +
    label +
    ' <span class="mut" style="opacity:.7">(' +
    Math.round(val * 100) +
    '%)</span></div>' +
    '<input type="range" min="0" max="100" value="' +
    Math.round(val * 100) +
    '" style="width:100%" oninput="auSet(\'' +
    id +
    '\',this.value)">' +
    (note ? '<div class="mut" style="font-size:12px">' + note + '</div>' : '');

  modal(
    '<h3>🎵 Suara</h3>' +
      '<div class="mut">Semua suara dibuat langsung di browser — tanpa unduhan, tetap jalan offline.</div>' +
      row('vol', '🔊 Volume utama', auP.vol, 'Bikin senyap kalau lagi Bearingdon di tempat lain.') +
      row('amb', '🍃 Suasana (angin, air, burung)', auP.amb) +
      row('mus', '🎶 Musik', auP.mus, 'Musik lembut (music box) atau file favoritmu sendiri.') +
      '<div class="ch"><button class="' +
      (auP.mute ? 'p' : 'g') +
      '" onclick="auToggleMute();auPanel()">' +
      (auP.mute ? '🔊 Nyalakan suara' : '🔇 Matikan suara') +
      '</button></div>' +
      '<div class="card" style="margin:10px 0 0"><b>Lagu sendiri</b>' +
      '<div class="mut">Pilih file audio dari perangkatmu. File-nya tidak pernah dikirim ke server.</div>' +
      (auTrackName ? '<div class="mut" style="margin:6px 0">🎵 ' + esc(auTrackName) + '</div>' : '') +
      '<div class="row" style="justify-content:flex-start;gap:6px;margin-top:6px">' +
      '<button onclick="document.getElementById(\'auf\').click()">📁 Pilih file</button>' +
      (auTrackName ? '<button onclick="auClear()">Hapus</button>' : '') +
      '</div><input type="file" id="auf" accept="audio/*" style="display:none" onchange="auPick(this.files[0])"></div>',
  );
}
