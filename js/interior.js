// Interior rumah pemain: 6 ruangan, dinding + pintu, tabrakan, render, interaksi.
// Dipakai dari js/places.js (ACT.home). Semua koordinat file ini lokal ke interior.
const IW = 1180,
  IH = 720,
  // Pita dinding belakang tiap ruangan (di atasnya lantai)
  WALLH = 84,
  // Denah: 3 kolom x 2 baris. KOLX/ROWY adalah sudut kiri atas tiap ruangan.
  KOLX = [44, 412, 780],
  ROWY = [44, 382],
  RW = 354,
  RH = 324;
const HROOMS = [
  { id: 'tamu', n: 'Ruang Tamu', ic: '🛋️', x: KOLX[0], y: ROWY[0], fl: '#c9a678', wl: '#ece3f5' },
  { id: 'dapur', n: 'Dapur', ic: '🍳', x: KOLX[1], y: ROWY[0], fl: '#d6cbb4', wl: '#e8f0e4' },
  { id: 'mandi', n: 'Kamar Mandi', ic: '🚿', x: KOLX[2], y: ROWY[0], fl: '#cfe3ea', wl: '#dfeef5' },
  { id: 'belajar', n: 'Ruang Belajar', ic: '📚', x: KOLX[0], y: ROWY[1], fl: '#c9a678', wl: '#e6e0f2' },
  { id: 'tidur', n: 'Kamar Tidur', ic: '🛏️', x: KOLX[1], y: ROWY[1], fl: '#c2a079', wl: '#f0e2ea' },
  { id: 'pribadi', n: 'Ruang Pribadi', ic: '🪴', x: KOLX[2], y: ROWY[1], fl: '#cbb9d6', wl: '#e3e8f0' },
];
// Dinding luar (solid penuh) + dinding dalam yang sudah dipecah jadi segmen
// sehingga celah = pintu antar ruangan. Bentuk [x, y, w, h].
const HWALL = [
  [30, 30, 1118, 14],
  [30, 30, 14, 690],
  [1134, 30, 14, 690],
  [30, 706, 1118, 14],
  // V1 (x 397) celah baris-1: y 210..266 · celah baris-2: y 550..606
  [397, 44, 15, 166],
  [397, 266, 15, 102],
  [397, 382, 15, 168],
  [397, 606, 15, 100],
  // V2 (x 766) celah sama seperti V1
  [766, 44, 15, 166],
  [766, 266, 15, 102],
  [766, 382, 15, 168],
  [766, 606, 15, 100],
  // H1 (y 367) celah kolom-1: x 180..236 · kolom-3: x 860..916 · kolom-2 tanpa celah
  [44, 367, 136, 15],
  [236, 367, 162, 15],
  [412, 367, 354, 15],
  [780, 367, 80, 15],
  [916, 367, 218, 15],
];
// Perabot: b = kotak penghalang, r = ruangan, d = gaya gambar,
// x/y = titik interaksi (0 kalau perabot itu tidak punya aksi)
const HFURN = [
  {
    r: 'tamu',
    d: 'kabinet',
    b: [296, 140, 74, 64],
    x: 333,
    y: 234,
    l: '🎁 Lemari dekorasi',
    c: 'g',
    f: () => openHouse(),
  },
  { r: 'tamu', d: 'sofa', b: [66, 150, 150, 80], x: 0, y: 0 },
  {
    r: 'dapur',
    d: 'kompor',
    b: [436, 140, 116, 84],
    x: 494,
    y: 254,
    l: '🍳 Masak hidangan',
    c: 'p',
    f: () => openCooking(),
  },
  {
    r: 'dapur',
    d: 'dispenser',
    b: [436, 260, 56, 62],
    x: 464,
    y: 350,
    l: '💧 Minum air',
    c: 'g',
    f: drinkWater,
  },
  { r: 'dapur', d: 'meja', b: [620, 160, 126, 90], x: 0, y: 0 },
  {
    r: 'mandi',
    d: 'wastafel',
    b: [804, 140, 96, 62],
    x: 852,
    y: 232,
    l: '🪞 Cuci muka',
    c: 'g',
    f: washFace,
  },
  { r: 'mandi', d: 'toilet', b: [804, 250, 60, 66], x: 0, y: 0 },
  {
    r: 'mandi',
    d: 'bak',
    b: [990, 148, 132, 114],
    x: 1056,
    y: 292,
    l: '🛁 Rendam air hangat',
    c: 'p',
    f: takeBath,
  },
  {
    r: 'belajar',
    d: 'meja tulis',
    b: [66, 500, 146, 84],
    x: 139,
    y: 614,
    l: '📓 Tulis jurnal',
    c: 'p',
    f: () => journal(),
  },
  {
    r: 'belajar',
    d: 'kursi baca',
    b: [256, 510, 88, 78],
    x: 300,
    y: 618,
    l: '📚 Belajar',
    c: 'g',
    f: () => openStudy(),
  },
  {
    r: 'tidur',
    d: 'kasur',
    b: [436, 510, 148, 104],
    x: 510,
    y: 644,
    l: '🛏️ Tidur sampai pagi',
    c: 'p',
    f: sleep,
  },
  { r: 'tidur', d: 'lemari', b: [676, 400, 76, 64], x: 0, y: 0 },
  {
    r: 'pribadi',
    d: 'kursi',
    b: [806, 520, 94, 82],
    x: 853,
    y: 632,
    l: '💭 Tulis tanpa disimpan',
    c: 'p',
    f: vent,
  },
  {
    r: 'pribadi',
    d: 'matras',
    b: [1000, 560, 100, 76],
    x: 1050,
    y: 666,
    l: '🫁 Tarik napas 4-7-8',
    c: 'g',
    f: () => doMoodActivity('breathe'),
  },
];
// Pintu keluar: titik interaksi di dalam Ruang Tamu (dinding bawah tetap solid)
const HEXIT = { x: 208, y: 330 };
// Slot gambar tiap dekorasi, sudah dibagi per ruangan
const HSLOT = {
  candle: [683, 178],
  flower: [940, 330],
  books: [330, 412],
  rug: [210, 650],
  painting: [500, 414],
  lamp: [610, 414],
  fish: [1075, 414],
  plant: [210, 200],
};
const bgIn = document.createElement('canvas');
bgIn.width = IW * BS;
bgIn.height = IH * BS;

function inRect(x, y, r) {
  return x > r[0] && x < r[0] + r[2] && y > r[1] && y < r[1] + r[3];
}
function hasDecor(id) {
  return houseDecorations.includes(id);
}
function roomAt(x, y) {
  for (const r of HROOMS) if (x >= r.x && x < r.x + RW && y >= r.y && y < r.y + RH) return r;
  return null;
}
function blockedHome(x, y) {
  // Pengaman mutlak: pemain tidak boleh keluar dari denah, apa pun bentuk dindingnya
  if (x <= 44 || y <= 44 || x >= 1134 || y >= 706) return true;
  for (const w of HWALL) if (inRect(x, y, w)) return true;
  for (const f of HFURN) if (inRect(x, y, f.b)) return true;
  return false;
}
function nearestHome() {
  const cur = roomAt(P.x, P.y);
  if (!cur) return null;
  const d = (x, y) => Math.hypot(x - P.x, y - P.y);
  let b = null,
    bd = 46;
  for (const f of HFURN) {
    if (f.r !== cur.id || !f.l) continue;
    const q = d(f.x, f.y);
    if (q < bd) {
      bd = q;
      b = { k: 'h' + cur.id + f.x, l: f.l, c: f.c, f: f.f };
    }
  }
  if (cur.id == 'tamu') {
    const q = d(HEXIT.x, HEXIT.y);
    if (q < bd) b = { k: 'hdoor', l: '🚪 Keluar ke luar', c: 'p', f: exitHome };
  }
  return b;
}

// ---- Latar ----
function renderInterior() {
  const g = bgIn.getContext('2d');
  g.setTransform(BS, 0, 0, BS, 0, 0);
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillStyle = '#241c2e';
  g.fillRect(0, 0, IW, IH);

  const Q = (x, y, w, h, f) => {
    g.fillStyle = f;
    g.fillRect(x, y, w, h);
  };

  // Lantai + pita dinding tiap ruangan
  for (const r of HROOMS) {
    Q(r.x, r.y, RW, WALLH, r.wl);
    Q(r.x, r.y + WALLH - 6, RW, 6, 'rgba(0,0,0,.07)');
    Q(r.x, r.y + WALLH, RW, RH - WALLH, r.fl);
    g.strokeStyle = 'rgba(90,60,35,.16)';
    g.lineWidth = 1;
    for (let y = r.y + WALLH + 16; y < r.y + RH; y += 18) {
      g.beginPath();
      g.moveTo(r.x, y);
      g.lineTo(r.x + RW, y);
      g.stroke();
    }
    g.textAlign = 'left';
    g.font = 'bold 11px sans-serif';
    g.fillStyle = 'rgba(40,30,60,.5)';
    g.fillText(r.n.toUpperCase(), r.x + 10, r.y + 16);
    g.textAlign = 'center';
  }

  // Pintu keluar digambar di dinding bawah Ruang Tamu
  Q(176, 690, 64, 30, '#6b4a2f');
  Q(182, 694, 52, 22, '#8a5f3c');
  Q(182, 700, 52, 3, '#a9754a');

  // Dinding (setelah lantai, supaya tepinya rapi)
  for (const w of HWALL) {
    Q(w[0], w[1], w[2], w[3], '#e3d7ef');
    Q(w[0], w[1], w[2], 3, 'rgba(0,0,0,.1)');
  }

  // Perabot
  for (const f of HFURN) {
    const b = f.b;
    if (f.d == 'kasur') {
      Q(b[0], b[1], b[2], b[3], '#8a5f3c');
      Q(b[0] + 4, b[1] + 4, b[2] - 8, b[3] - 8, '#f1e7d6');
      Q(b[0] + 8, b[1] + 8, b[2] - 16, 20, '#ffffff');
      Q(b[0] + 4, b[1] + b[3] / 2, b[2] - 8, 2, '#d8c7ae');
    } else if (f.d == 'kompor') {
      Q(b[0], b[1], b[2], b[3], '#9aa3ad');
      Q(b[0], b[1], b[2], 7, '#c3ccd5');
      g.font = '22px serif';
      g.fillText('🍳', b[0] + b[2] / 2, b[1] + b[3] / 2 - 4);
    } else if (f.d == 'dispenser') {
      Q(b[0], b[1], b[2], b[3], '#bcd6e4');
      Q(b[0] + 4, b[1] + 4, b[2] - 8, 14, '#e8f4fa');
    } else if (f.d == 'wastafel') {
      Q(b[0], b[1], b[2], b[3], '#c3ccd5');
      Q(b[0] + 6, b[1] + 4, b[2] - 12, b[3] - 10, '#eaf6fb');
    } else if (f.d == 'bak') {
      Q(b[0], b[1], b[2], b[3], '#dfe7ee');
      Q(b[0] + 5, b[1] + 5, b[2] - 10, b[3] - 10, '#8ecae6');
      Q(b[0] + 9, b[1] + 9, b[2] - 18, b[3] - 22, '#bfe6f5');
    } else if (f.d == 'meja tulis') {
      Q(b[0], b[1], b[2], b[3], '#a9754a');
      Q(b[0], b[1], b[2], 7, '#c08a5c');
      Q(b[0] + 14, b[1] + 12, 44, 32, '#fdf6e8');
      Q(b[0] + 16, b[1] + 16, 40, 1.4, '#c9b79a');
      Q(b[0] + 16, b[1] + 22, 40, 1.4, '#c9b79a');
    } else if (f.d == 'kursi baca') {
      Q(b[0], b[1], b[2], b[3], '#7d5a3a');
      Q(b[0] + 6, b[1] + 4, b[2] - 12, b[3] - 8, '#9a6a40');
      g.font = '18px serif';
      g.fillText('📖', b[0] + b[2] / 2, b[1] + b[3] / 2 - 4);
    } else if (f.d == 'kursi') {
      Q(b[0], b[1], b[2], b[3], '#9a7f9e');
      Q(b[0] + 5, b[1] + 5, b[2] - 10, b[3] - 10, '#c0a8c4');
    } else if (f.d == 'matras') {
      Q(b[0], b[1], b[2], b[3], '#b6a6cc');
      Q(b[0] + 5, b[1] + 5, b[2] - 10, b[3] - 10, '#d6c9e8');
    } else if (f.d == 'kabinet' || f.d == 'lemari') {
      Q(b[0], b[1], b[2], b[3], '#b98a5d');
      Q(b[0] + 4, b[1] + 4, b[2] - 8, b[3] - 8, '#d9b183');
      Q(b[0] + b[2] / 2 - 1.5, b[1] + 14, 3, 12, '#8a5f3c');
      Q(b[0] + b[2] / 2 - 1.5, b[1] + 32, 3, 12, '#8a5f3c');
    } else {
      // perabot tanpa aksi: sofa, meja makan, toilet, lemari
      Q(b[0], b[1], b[2], b[3], 'rgba(80,55,35,.55)');
      Q(b[0] + 4, b[1] + 4, b[2] - 8, b[3] - 8, 'rgba(255,255,255,.12)');
    }
  }

  // Dekorasi yang sudah dibeli
  for (const id in HSLOT) {
    if (!hasDecor(id)) continue;
    const s = HSLOT[id];
    if (id == 'rug') {
      g.fillStyle = 'rgba(140,90,60,.55)';
      g.beginPath();
      g.ellipse(s[0], s[1], 96, 44, 0, 0, 7);
      g.fill();
      g.strokeStyle = 'rgba(90,55,35,.5)';
      g.lineWidth = 3;
      g.stroke();
      continue;
    }
    if (id == 'books') {
      Q(s[0] - 44, s[1] - 6, 88, 54, '#8a5f3c');
      ['#c0392b', '#2a9d8f', '#3a86ff', '#e9c46a', '#6c5ce7', '#e76f51'].forEach((c, i) =>
        Q(s[0] - 40 + i * 13, s[1] + 4, 10, 40, c),
      );
      continue;
    }
    if (id == 'fish') {
      Q(s[0] - 36, s[1] - 26, 72, 54, '#5d7f9c');
      Q(s[0] - 32, s[1] - 22, 64, 46, '#8ecae6');
      Q(s[0] - 26, s[1] - 18, 52, 4, 'rgba(255,255,255,.35)');
      g.font = '22px serif';
      g.fillText('🐠', s[0], s[1] - 2);
      continue;
    }
    g.font = (id == 'painting' ? 34 : 26) + 'px serif';
    g.fillText(HOUSE_DECOR.find((d) => d.id == id).icon, s[0], s[1]);
  }
  g.textAlign = 'center';
}

// Cahaya lampu di kamar tidur saat Sore/Malam
function drawHomeGlow() {
  if (!hasDecor('lamp')) return;
  if (getCurrentPhase() === 0 || getCurrentPhase() === 1) return;
  const s = HSLOT.lamp;
  const g = c.createRadialGradient(s[0], s[1], 2, s[0], s[1], 100);
  g.addColorStop(0, 'rgba(255,214,120,.34)');
  g.addColorStop(1, 'rgba(255,214,120,0)');
  c.fillStyle = g;
  c.beginPath();
  c.arc(s[0], s[1], 100, 0, 7);
  c.fill();
}

// Pill nama ruangan di atas bar aksi (hanya ditulis ulang saat ruang berpindah)
let hrm = '\0';
function homeHud() {
  const e = $('#rm');
  if (!e) return;
  // P hanya berada di koordinat interior selama IN aktif
  const r = IN ? roomAt(P.x, P.y) : null,
    k = r ? r.id : '';
  if (k === hrm) return;
  hrm = k;
  e.className = r ? 'on' : '';
  e.textContent = r ? r.ic + ' ' + r.n : '';
}

// ---- Masuk / keluar / tidur ----
function enterHome() {
  if (IN) return;
  if (F.on) endFish();
  P.sit = null;
  P.tx = null;
  P.ty = null;
  IN = 'home';
  P.x = HEXIT.x;
  P.y = HEXIT.y;
  P.mv = 0;
  sentP = '';
  closeM();
  toast('🏠 Kamu masuk ke rumahmu');
}
function exitHome() {
  if (!IN) return;
  const h = B.find((b) => b[7] === 'home');
  IN = null;
  if (h) {
    P.x = h[0] + h[2] / 2;
    P.y = h[1] + h[3] + 20;
  }
  P.tx = null;
  P.ty = null;
  P.sit = null;
  sentP = '';
  toast('🌤️ Kamu keluar ke halaman');
}
function sleep() {
  const night = getCurrentPhase() >= 2;
  if (night) {
    timeOffset = 60 * 1000; // 1 menit dari siklus 40 menit = Pagi
    try {
      localStorage.setItem('teduh2_time', String(timeOffset));
    } catch (e) {}
    updateTimeUI();
  }
  resetRestTimer();
  duckAudio(20000);
  modal(
    `<h3>${night ? '🌅 Selamat pagi' : '😌 Boleh juga'}</h3>` +
      `<p>${
        night
          ? 'Kamu tidur pulas. Waktunya berganti ke pagi, dan timer istirahat ikut disetel ulang.'
          : 'Kamu rebahan sebentar. Lumayan lega, dan timer istirahat ikut disetel ulang.'
      }</p>` +
      `<p class="mut">Kalau masih terasa kepikiran, tidak apa-apa. Besok masih ada.</p>` +
      `<div class="ch"><button class="p" onclick="closeM()">Bangun pelan-pelan</button></div>`,
  );
}

// ---- Aksi ringan di dalam rumah (tanpa token, sesuai aturan DESIGN.md) ----
function drinkWater() {
  duckAudio(1200);
  toast('💧 Air putih, dingin. Sedap.');
}
function washFace() {
  duckAudio(1500);
  modal(
    '<h3>🪞 Cuci muka</h3>' +
      '<p class="mut">Air dingin, satu kali bilas. Tidak ada yang perlu ditahan di sini.</p>' +
      '<div class="ch"><button class="p" onclick="closeM()">Selesai</button></div>',
  );
}
function takeBath() {
  duckAudio(2500);
  modal(
    '<h3>🛁 Rendam air hangat</h3>' +
      '<p class="mut">Airnya hangat dan tidak buru-buru. Tidak perlu ke mana-mana selama beberapa menit.</p>' +
      '<div class="ch"><button class="p" onclick="closeM()">Keluar dari bak</button></div>',
  );
}
function vent() {
  modal(
    '<h3>💭 Ruang pribadi</h3>' +
      '<p class="mut">Tulis apa saja di sini. Tidak disimpan, tidak dikirim ke siapa pun, dan tidak dibaca siapa pun. Setelah keluar, hilang.</p>' +
      '<textarea id="vt" rows="5" style="width:100%" maxlength="1000" placeholder="yang mau kamu keluarkan..."></textarea>' +
      '<div class="ch"><button class="p" onclick="ventDone()">Sudah mengatakannya</button><button onclick="closeM()">Batal</button></div>',
  );
}
function ventDone() {
  closeM();
  toast('Sudah mengatakannya. Lebih ringan.');
}

// Dipanggil setelah initHouse() supaya dekorasinya sudah termuat
function initHome() {
  renderInterior();
}
