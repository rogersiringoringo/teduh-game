// Data NPC, peta (bangunan, jalan, danau, bangku), tabrakan, render latar
const NPC = [
  {
    n: 'Sari',
    e: '🧑‍🎤',
    sh: '#e76f51',
    sk: 1,
    hs: 1,
    hc: 0,
    ph: 0,
    fx: 1,
    x: 200,
    y: 349,
    vx: 0.4,
    vy: 0,
    q: 'Aku capek banget sama deadline minggu ini...',
    r: ['Aku di sini, mau cerita lebih lanjut?', 'Semua orang juga capek kok.', 'Udah, main aja, lupain.'],
  },
  {
    n: 'Bima',
    e: '🧑‍🌾',
    sh: '#2a9d8f',
    sk: 2,
    hs: 0,
    hc: 0,
    ph: 0,
    fx: 1,
    x: 430,
    y: 381,
    vx: -0.3,
    vy: 0,
    q: 'Rasanya nggak ada yang ngerti aku di kantor.',
    r: [
      'Wajar kamu merasa begitu. Mau cerita lebih banyak?',
      'Mungkin kamu terlalu sensitif.',
      'Ganti kerjaan aja.',
    ],
  },
  {
    n: 'Dewi',
    e: '👩‍🎨',
    sh: '#9b8cff',
    sk: 0,
    hs: 2,
    hc: 1,
    ph: 0,
    fx: 1,
    x: 150,
    y: 495,
    vx: 0,
    vy: 0.3,
    q: 'Hari ini aku cuma pengin ditemani ngobrol.',
    r: ['Pas banget, aku juga. Yuk duduk di sini.', 'Coba olahraga deh.', 'Aku sibuk, nanti ya.'],
  },
  {
    n: 'Rudi',
    e: '🧑‍💼',
    sh: '#3a86ff',
    sk: 3,
    hs: 0,
    hc: 1,
    ph: 0,
    fx: 1,
    x: 640,
    y: 436,
    vx: 0.3,
    vy: 0,
    q: 'Akhir-akhir ini aku susah tidur karena kepikiran terus.',
    r: [
      'Aku ngerti rasanya. Mau cerita apa yang kamu pikirkan?',
      'Minum kopi aja biar melek.',
      'Itu cuma perasaanmu.',
    ],
  },
  {
    n: 'Mala',
    e: '👩‍🏫',
    sh: '#f4a261',
    sk: 2,
    hs: 3,
    hc: 4,
    ph: 0,
    fx: 1,
    x: 900,
    y: 749,
    vx: -0.3,
    vy: 0,
    q: 'Aku merasa sendirian meski banyak orang di sekitar.',
    r: [
      'Terima kasih sudah jujur. Aku di sini bersamamu.',
      'Banyak kok yang lebih sepi.',
      'Coba posting di medsos.',
    ],
  },
];
const PL = [
    [60, 465],
    [120, 538],
    [190, 480],
    [250, 582],
    [310, 509],
    [400, 596],
    [520, 1076],
    [580, 1149],
    [640, 1076],
    [700, 1164],
    [460, 1178],
    [760, 1207],
  ],
  BEN = [
    [450, 284],
    [80, 276],
    [250, 436],
    [620, 298],
    [590, 509],
    [690, 509],
    [900, 269],
    [420, 1076],
    [800, 1105],
    [1160, 1149],
  ],
  LK = { x: 560, y: 189, rx: 105, ry: 80 },
  BR = [540, 93, 40, 192],
  FT = { x: 640, y: 582, r: 18 },
  FIELD = [900, 1062, 240, 175],
  // Panggung musik 4 alat di depan Kafe Cerita (lihat stage.js untuk logikanya)
  STG = [
    { id: 'guitar', n: 'Gitar', icon: '🎸', x: 190, y: 248, c: '#e76f51' },
    { id: 'ukulele', n: 'Ukulele', icon: '🎵', x: 252, y: 248, c: '#f4a261' },
    { id: 'piano', n: 'Piano', icon: '🎹', x: 190, y: 302, c: '#6c5ce7' },
    { id: 'drum', n: 'Drum', icon: '🥁', x: 252, y: 302, c: '#2a9d8f' },
  ],
  TR = [];
const WALL = ['#f2e3c6', '#e7f0d8', '#f7dede', '#dfe9f7', '#f4ecd0'],
  ROOF = ['#d85a30', '#6c5ce7', '#2a9d8f', '#c0392b', '#3a86ff'];
const B = [
  [60, 73, 130, 124, '#f2e3c6', '#d85a30', '☕ Kafe Cerita', 'cafe'],
  [250, 58, 90, 109, '#efe6f7', '#6c5ce7', '🏠 Rumahmu', 'home'],
  [780, 73, 140, 131, '#e6f4f1', '#1d9e75', '🏥 Klinik Teduh', 'clinic'],
  [980, 65, 150, 138, '#fdf0d5', '#e76f51', '🏛 Balai Warga', 'hall'],
  [780, 604, 130, 124, '#fff3c4', '#f4a261', '🏪 Toko Koin', 'shop'],
  [480, 800, 150, 131, '#efe3d0', '#7b3fa0', '📚 Perpustakaan', 'lib'],
  [250, 750, 100, 90, '#fff3c4', '#d85a30', '🍳 Dapur Teduh', 'cook'],
];
[
  [960, 611, 80, 116],
  [1080, 611, 90, 116],
  [60, 626, 90, 102],
  [180, 626, 100, 102],
  [60, 814, 90, 116],
  [200, 829, 80, 102],
  [1000, 807, 90, 124],
  [1120, 814, 90, 116],
].forEach((r, i) => B.push([...r, WALL[i % 5], ROOF[(i + 2) % 5], '', '']));
const PATHS = [
  [0, 327, WW, 44],
  [0, 727, WW, 44],
  [0, 960, WW, 44],
  [345, 371, 30, 909],
  [625, 371, 30, 109],
  [560, 480, 160, 204],
  [625, 684, 30, 44],
  [115, 196, 22, 138],
  [285, 167, 22, 167],
  [839, 204, 22, 124],
  [1044, 204, 22, 124],
  [546, 285, 28, 44],
  [546, 58, 28, 38],
];
B.forEach((b) => {
  if (b[1] + b[3] === 931) PATHS.push([b[0] + b[2] / 2 - 11, 931, 22, 20]);
});
const ZN = PATHS.concat([FIELD, BR]);
function rnd(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function blocked(x, y) {
  if (x < 8 || y < 17 || x > WW - 8 || y > WH - 8) return true;
  for (const b of B) if (x > b[0] && x < b[0] + b[2] && y > b[1] && y < b[1] + b[3]) return true;
  for (const e of BEN) if (x > e[0] - 16 && x < e[0] + 16 && y > e[1] - 8 && y < e[1] + 14) return true;
  if (Math.hypot(x - FT.x, y - FT.y) < FT.r) return true;
  if (
    !(x > BR[0] && x < BR[0] + BR[2] && y > BR[1] && y < BR[1] + BR[3]) &&
    ((x - LK.x) / LK.rx) ** 2 + ((y - LK.y) / LK.ry) ** 2 < 1
  )
    return true;
  return TR.some((t) => Math.hypot(t[0] - x, t[1] - y) < 9);
}
const pad = (x, y, p) =>
  [
    [0, 0],
    [p, 0],
    [-p, 0],
    [0, p],
    [0, -p],
  ].some((o) => blocked(x + o[0], y + o[1]));
const onPath = (x, y) =>
  ZN.some((r) => x > r[0] - 8 && x < r[0] + r[2] + 8 && y > r[1] - 8 && y < r[1] + r[3] + 8);
const bg = document.createElement('canvas');
bg.width = WW * BS;
bg.height = WH * BS;
(function () {
  const R = rnd(7),
    g = bg.getContext('2d');
  g.scale(BS, BS);
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  for (let i = 0; i < 380; i++) {
    const x = R() * WW,
      y = R() * WH;
    if (
      !pad(x, y, 14) &&
      !onPath(x, y) &&
      Math.hypot(x - 360, y - 349) > 50 &&
      !PL.some((p) => Math.hypot(p[0] - x, p[1] - y) < 24) &&
      BEN.every((e) => Math.hypot(e[0] - x, e[1] - y) > 34) &&
      STG.every((s) => Math.hypot(s.x - x, s.y - y) > 34)
    )
      TR.push([x, y, R() < 0.5 ? '🌳' : '🌲']);
  }
  g.fillStyle = '#bfe3b4';
  g.fillRect(0, 0, WW, WH);
  g.fillStyle = '#aed7a1';
  for (let i = 0; i < 1500; i++) g.fillRect(R() * WW, R() * WH, 3 + R() * 4, 2);
  g.fillStyle = '#e8d9b5';
  PATHS.forEach((r) => g.fillRect(...r));
  g.fillStyle = '#d8ccb8';
  g.fillRect(560, 480, 160, 204);
  g.strokeStyle = '#c4b79f';
  g.lineWidth = 1.5;
  g.strokeRect(562, 482, 156, 200);
  {
    const dt = (x, y, r, f) => {
      g.fillStyle = f;
      g.beginPath();
      g.arc(x, y, r, 0, 7);
      g.fill();
    };
    dt(FT.x, FT.y + 2, FT.r + 3, 'rgba(0,0,0,.15)');
    dt(FT.x, FT.y, FT.r + 3, '#e4ebf0');
    dt(FT.x, FT.y, FT.r, '#8ecae6');
    dt(FT.x, FT.y, 9, '#bfe6f5');
    [
      [0, -3],
      [3, 2],
      [-3, 2],
    ].forEach((o) => dt(FT.x + o[0], FT.y + o[1], 1.7, '#fff'));
  }
  {
    const [fx, fy, fw, fh] = FIELD;
    for (let i = 0; i < 8; i++) {
      g.fillStyle = i % 2 ? '#8fcf7f' : '#9bd88a';
      g.fillRect(fx + (i * fw) / 8, fy, fw / 8, fh);
    }
    g.strokeStyle = '#fff';
    g.lineWidth = 1.5;
    g.strokeRect(fx + 6, fy + 6, fw - 12, fh - 12);
    g.beginPath();
    g.moveTo(fx + fw / 2, fy + 6);
    g.lineTo(fx + fw / 2, fy + fh - 6);
    g.stroke();
    g.beginPath();
    g.arc(fx + fw / 2, fy + fh / 2, 16, 0, 7);
    g.stroke();
    g.strokeRect(fx + 6, fy + fh / 2 - 18, 22, 36);
    g.strokeRect(fx + fw - 28, fy + fh / 2 - 18, 22, 36);
  }
  g.fillStyle = '#a47551';
  PL.forEach((p) => {
    g.beginPath();
    g.ellipse(p[0], p[1] + 8, 15, 7, 0, 0, 7);
    g.fill();
  });
  // Panggung kayu untuk tiap alat musik (not-nya digambar saat dimainkan)
  STG.forEach((s) => {
    g.fillStyle = 'rgba(0,0,0,.16)';
    g.beginPath();
    g.ellipse(s.x, s.y + 10, 18, 8, 0, 0, 7);
    g.fill();
    g.fillStyle = '#d9b382';
    g.beginPath();
    g.ellipse(s.x, s.y + 6, 16, 7, 0, 0, 7);
    g.fill();
    g.strokeStyle = '#a8845c';
    g.lineWidth = 1.2;
    g.beginPath();
    g.ellipse(s.x, s.y + 6, 16, 7, 0, 0, 7);
    g.stroke();
  });
  // papan kecil: "PANGGUNG"
  {
    g.fillStyle = '#8a6b4a';
    g.fillRect(200, 204, 80, 13);
    g.fillStyle = '#f3e6d2';
    g.font = 'bold 8px sans-serif';
    g.fillText('PANGGUNG', 240, 211);
  }
  g.fillStyle = '#8ecae6';
  g.beginPath();
  g.ellipse(LK.x, LK.y, LK.rx, LK.ry, 0, 0, 7);
  g.fill();
  g.strokeStyle = '#c7e9f7';
  g.lineWidth = 3;
  g.stroke();
  {
    const [bx, by, bw, bh] = BR,
      dt = (x, y, r, f) => {
        g.fillStyle = f;
        g.beginPath();
        g.arc(x, y, r, 0, 7);
        g.fill();
      };
    g.fillStyle = 'rgba(0,50,90,.2)';
    g.fillRect(bx + 3, by + 4, bw, bh);
    for (let y = by + 6; y < by + bh; y += 22) {
      g.fillStyle = '#5b3f27';
      g.fillRect(bx - 2, y, 3, 7);
      g.fillRect(bx + bw - 1, y, 3, 7);
    }
    for (let y = by, i = 0; y < by + bh; y += 6, i++) {
      g.fillStyle = i % 2 ? '#b78a5c' : '#a97b50';
      g.fillRect(bx, y, bw, Math.min(6, by + bh - y));
      g.fillStyle = 'rgba(60,35,15,.35)';
      g.fillRect(bx, y, bw, 0.7);
    }
    g.fillStyle = '#6f4e31';
    g.fillRect(bx, by, 3, bh);
    g.fillRect(bx + bw - 3, by, 3, bh);
    g.fillStyle = '#d9b48a';
    g.fillRect(bx + 3, by, 1.2, bh);
    g.fillRect(bx + bw - 4.2, by, 1.2, bh);
    for (let y = by + 2; y <= by + bh; y += 18) {
      dt(bx + 1.5, y, 2.4, '#4a3320');
      dt(bx + bw - 1.5, y, 2.4, '#4a3320');
    }
    g.fillStyle = '#7d5a3a';
    g.fillRect(bx - 2, by - 2, bw + 4, 3);
    g.fillRect(bx - 2, by + bh - 1, bw + 4, 3);
  }
  B.forEach((b) => {
    const [x, y, w, h, wl, rf, lb] = b;
    g.fillStyle = 'rgba(0,0,0,.15)';
    g.fillRect(x + 3, y + h - 2, w, 6);
    g.fillStyle = wl;
    g.fillRect(x, y, w, h);
    g.fillStyle = rf;
    g.fillRect(x - 5, y - 8, w + 10, 24);
    g.fillStyle = 'rgba(0,0,0,.12)';
    g.fillRect(x - 5, y + 12, w + 10, 4);
    g.fillStyle = '#bfe3f2';
    g.strokeStyle = '#7a5230';
    g.lineWidth = 0.8;
    [x + 10, x + w - 24].forEach((wx) => {
      g.fillRect(wx, y + 26, 14, 12);
      g.strokeRect(wx, y + 26, 14, 12);
    });
    g.fillStyle = '#7a5230';
    g.fillRect(x + w / 2 - 8, y + h - 22, 16, 22);
    g.fillStyle = '#e9c46a';
    g.beginPath();
    g.arc(x + w / 2 + 4, y + h - 11, 1.2, 0, 7);
    g.fill();
    if (lb) {
      g.fillStyle = '#fff';
      g.font = (w >= 120 ? 'bold 11px' : 'bold 10px') + ' sans-serif';
      g.fillText(lb, x + w / 2, y + 4);
    }
  });
  BEN.forEach(([x, y]) => {
    const Q = (a, b, w, h, f) => {
      g.fillStyle = f;
      g.fillRect(a, b, w, h);
    };
    g.fillStyle = 'rgba(0,0,0,.18)';
    g.beginPath();
    g.ellipse(x, y + 17, 17, 4, 0, 0, 7);
    g.fill();
    Q(x - 13, y + 11, 3, 6, '#5b3f27');
    Q(x + 10, y + 11, 3, 6, '#5b3f27');
    Q(x - 15, y - 5, 30, 9, '#9a6a40');
    Q(x - 15, y - 1, 30, 0.8, '#6f4e31');
    Q(x - 15, y + 2, 30, 0.8, '#6f4e31');
    Q(x - 15, y - 6, 3, 16, '#6f4e31');
    Q(x + 12, y - 6, 3, 16, '#6f4e31');
    Q(x - 15, y + 5, 30, 6, '#b07c4d');
    Q(x - 15, y + 5, 30, 1.2, '#d3a373');
    Q(x - 15, y + 10, 30, 1, '#7a5230');
  });
  g.font = '12px serif';
  for (let i = 0; i < 130; i++) {
    const x = R() * WW,
      y = R() * WH,
      f = R() < 0.5 ? '🌼' : '🌸';
    if (!blocked(x, y) && !onPath(x, y) && BEN.every((e) => Math.hypot(e[0] - x, e[1] - y) > 26))
      g.fillText(f, x, y);
  }
  g.font = '28px serif';
  TR.slice()
    .sort((a, b) => a[1] - b[1])
    .forEach((t) => g.fillText(t[2], t[0], t[1] - 6));
})();
