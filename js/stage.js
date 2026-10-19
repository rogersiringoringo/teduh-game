// Panggung musik di Kafe Cerita.
// Sifatnya sengaja ringan: tidak ada skor, streak, atau token. Sekadar
// "main sebentar" supaya ada alasan untuk mendekat dan menyapa orang lain
// (icebreaker sosial — lihat docs/DESIGN.md).
//
// Data posisi alat musik (STG) ada di world.js. Audio memakai AudioContext
// milik music.js, jadi mengikuti tombol 🔊 dan slider volume yang sama.

const STG_MEL = [0, 2, 4, 2, 3, 1, 3, 0], // indeks nada pentatonik
  STG_STEP = 0.44; // detik per nada
let stg = null; // {i, t0, n, notes: []} gubahan yang sedang berjalan

function initStage() {
  stg = null;
}

// Satu nada: osc segitiga + harmonik, amplop cepat supaya terasa "dijetik".
function stgNote(f, dur, vol) {
  if (typeof AC === 'undefined' || !AC || AC.state !== 'running' || !auMus) return;
  const t = AC.currentTime + 0.01,
    o = AC.createOscillator(),
    g = AC.createGain();
  o.type = 'triangle';
  o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(auMus);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function stagePlay(i) {
  const s = STG[i];
  if (!s) return;
  if (F.on) endFish();
  if (P.sit != null) stand();
  stg = { i, t0: Date.now(), n: 0, notes: [] };
  bub.me = { t: '🎵 ' + s.n, u: Date.now() + 2600 };
  toast('🎵 Main ' + s.n + '…');
}

// Pemain lain yang berdiri di sekitar panggung — dipakai untuk tanda ajakan.
function stageFriends(s) {
  const out = [];
  peers.forEach((p) => {
    if (p.isMe || muted.has(p.peer)) return;
    const r = p.presence || {},
      x = +r.x,
      y = +r.y;
    if (!isFinite(x) || !isFinite(y)) return;
    if (Math.hypot(x - s.x, y - s.y) < 42) out.push(String(r.n || 'Teman').slice(0, 14));
  });
  return out;
}

function drawStage(now) {
  // Majukan gubahan: bunyi not baru +_partikel not yang naik.
  if (stg) {
    const s = STG[stg.i];
    if (!s) stg = null;
    else {
      const el = (now - stg.t0) / 1000,
        idx = Math.floor(el / STG_STEP);
      if (idx > stg.n && idx < STG_MEL.length) {
        stg.n = idx;
        const f = AU_SCALE[STG_MEL[idx] % AU_SCALE.length];
        stgNote(f, STG_STEP * 1.6);
        stgNote(f * 2, STG_STEP * 0.6, 0.07);
        stg.notes.push({ x: s.x + (Math.random() - 0.5) * 22, y: s.y - 12, t0: now });
      }
      if (idx >= STG_MEL.length) stg = null;
    }
  }

  STG.forEach((s, i) => {
    const on = stg && stg.i === i;
    if (on) {
      c.fillStyle = 'rgba(255,244,200,.5)';
      c.beginPath();
      c.ellipse(s.x, s.y + 6, 17, 8, 0, 0, 7);
      c.fill();
      stg.notes = stg.notes.filter((n) => now - n.t0 < 1100);
      stg.notes.forEach((n) => {
        const k = (now - n.t0) / 1100;
        c.globalAlpha = 0.9 * (1 - k);
        c.fillStyle = s.c;
        txt('♪', n.x, n.y - k * 32, 13 + k * 9);
      });
      c.globalAlpha = 1;
    }
    // Tanda ada teman di dekat — murni indikator visual, tanpa data yang dikirim.
    if (stageFriends(s).length) {
      c.globalAlpha = 0.85;
      txt('👋', s.x + 15, s.y - 24, 15);
      c.globalAlpha = 1;
    }
  });
}
