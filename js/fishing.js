// Sistem memancing + koleksi ikan
const FISH = [
  ['🐟', 'Ikan Mas', 3, 50, 0.4],
  ['🐠', 'Ikan Nila', 4, 40, 0.4],
  ['🦐', 'Udang', 5, 25, 0.34],
  ['🐡', 'Ikan Buntal', 8, 15, 0.28],
  ['👟', 'Sepatu bekas', 0, 12, 0.5],
  ['🎏', 'Koi', 15, 8, 0.2],
  ['🐢', 'Kura-kura', 20, 5, 0.18],
];
function roll() {
  const n = isNight(),
    rain = isRaining();
  let w = FISH.map((f) => {
    let weight = f[3];
    if (n && f[2] >= 15) weight *= 2;
    if (rain && f[2] >= 8) weight *= 1.8;
    return weight;
  });
  let r = Math.random() * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < FISH.length; i++) {
    r -= w[i];
    if (r <= 0) return FISH[i];
  }
  return FISH[0];
}
const inLake = (x, y) =>
  !(x > BR[0] && x < BR[0] + BR[2] && y > BR[1] && y < BR[1] + BR[3]) &&
  ((x - LK.x) / LK.rx) ** 2 + ((y - LK.y) / LK.ry) ** 2 < 0.9;
const nearLake = () => ((P.x - LK.x) / (LK.rx + 24)) ** 2 + ((P.y - LK.y) / (LK.ry + 24)) ** 2 < 1;
function startFish() {
  const d = Math.hypot(LK.x - P.x, LK.y - P.y) || 1,
    u = [
      [((LK.x - P.x) / d) * 30, ((LK.y - P.y) / d) * 30],
      [P.fx * 26, 0],
      [-P.fx * 26, 0],
      [(LK.x - P.x) * 0.5, (LK.y - P.y) * 0.5],
    ],
    o = u.find((v) => inLake(P.x + v[0], P.y + v[1]));
  if (!o) {
    F = { on: 0, st: '', k: '' };
    ak = '\0';
    toast('Dekati tepi danau dulu.');
    return;
  }
  F = {
    on: 1,
    st: 'wait',
    k: '',
    bx: P.x + o[0],
    by: P.y + o[1],
    fx: o[0] < 0 ? -1 : 1,
    tb: Date.now() + 2000 + Math.random() * 4500,
  };
  P.fx = F.fx;
  P.tx = null;
}
function endFish() {
  F = { on: 0, st: '', k: '' };
  ak = '\0';
}
function reelStart() {
  if (F.st !== 'bite') return;
  F.st = 'reel';
  F.zw = F.fi[4];
  F.zl = 0.1 + Math.random() * (0.8 - F.zw);
  F.sp = F.fi[2] >= 15 ? 170 : 260;
}
function strike() {
  if (F.st !== 'reel') return;
  const q = (F.pos || 0) * 0.94 + 0.03;
  if (q >= F.zl && q <= F.zl + F.zw) catchFish(F.fi);
  else {
    F.st = 'lost';
    F.msg = 'Ikannya lepas! Coba lagi 🙂';
  }
}
function catchFish(f) {
  const g = Math.max(0, Math.min(f[2], 30 - S.fc));
  S.fc += g;
  S.coins += g;
  S.fish[f[1]] = (S.fish[f[1]] || 0) + 1;
  save();
  ui();
  questProg('fish', 1);
  questProg('coins', g);
  F.st = 'res';
  F.got = 1;
  F.msg = `Dapat ${f[0]} ${f[1]}! +${g} koin${g < f[2] ? ' (batas harian tercapai)' : ''}`;
}
function fishAct() {
  const t = F.st;
  if (t === 'bite') reelStart();
  else if (t === 'reel') strike();
  else if (t === 'lost' || t === 'res') startFish();
}
function fishUI() {
  const now = Date.now(),
    e = $('#act');
  if (F.st === 'wait' && now >= F.tb) {
    F.st = 'bite';
    F.tr = now + 1300;
    F.fi = roll();
  }
  if (F.st === 'bite' && now > F.tr) {
    F.st = 'lost';
    F.msg = 'Ikannya kabur, kurang cepat! 😅';
  }
  if (F.k !== F.st) {
    F.k = F.st;
    e.innerHTML = '';
    const mk = (t, cl, f) => {
        const b = document.createElement('button');
        b.className = cl;
        b.textContent = t;
        b.onclick = f;
        e.append(b);
      },
      sp = (t) => {
        const x = document.createElement('span');
        x.className = 'mut';
        x.textContent = t;
        x.style.flex = '1';
        e.append(x);
      };
    if (F.st === 'wait') {
      sp('🎣 Menunggu ikan menyambar...');
      mk('Angkat kail', '', endFish);
    } else if (F.st === 'bite') mk('❗ TARIK SEKARANG!' + KE, 'w', reelStart);
    else if (F.st === 'reel') {
      F.t0 = now;
      const tr = document.createElement('div');
      tr.style.cssText =
        'position:relative;flex:1;height:22px;background:var(--ln);border-radius:11px;overflow:hidden';
      const z = document.createElement('i');
      z.style.cssText =
        'position:absolute;top:0;bottom:0;left:' +
        F.zl * 100 +
        '%;width:' +
        F.zw * 100 +
        '%;background:var(--ok);opacity:.7';
      const m = document.createElement('i');
      m.id = 'fm';
      m.style.cssText = 'position:absolute;top:0;bottom:0;width:6px;background:var(--pri)';
      tr.append(z, m);
      e.append(tr);
      mk('Tarik!' + KE, 'p', strike);
    } else {
      sp(F.msg);
      mk('Lempar lagi', 'g', startFish);
      mk('Selesai', '', endFish);
    }
  }
  if (F.st === 'reel') {
    const m = $('#fm');
    F.pos = (1 + Math.sin((now - F.t0) / F.sp)) / 2;
    if (m) m.style.left = F.pos * 94 + '%';
  }
}
function drawFish(now) {
  const bx = F.bx,
    by = F.by,
    dy = F.st === 'bite' ? Math.sin(now / 60) * 2.5 : Math.sin(now / 400),
    hx = P.x + F.fx * 8,
    hy = P.y + 2,
    tx = P.x + F.fx * 19,
    ty = P.y - 16,
    r = ((now / 30) % 14) + 3;
  c.strokeStyle = '#6b4a2b';
  c.lineWidth = 1.6;
  c.beginPath();
  c.moveTo(hx, hy);
  c.lineTo(tx, ty);
  c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.85)';
  c.lineWidth = 0.6;
  c.beginPath();
  c.moveTo(tx, ty);
  c.quadraticCurveTo((tx + bx) / 2, Math.min(ty, by) - 6, bx, by + dy);
  c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.7)';
  c.lineWidth = 0.8;
  c.beginPath();
  c.ellipse(bx, by + dy + 2, r, r * 0.45, 0, 0, 7);
  c.stroke();
  dot(bx, by + dy, 2.6, '#e63946');
  dot(bx, by + dy - 1.2, 1.3, '#fff');
  if (F.st === 'bite') txt('❗', bx, by - 14, 16);
  if (F.got && F.st === 'res') txt(F.fi[0], bx, by - 14, 18);
}
function KOL() {
  return (
    '<div class="card"><b>Koleksi ikan</b> <span class="mut">· koin memancing hari ini: ' +
    S.fc +
    '/30</span><div style="margin-top:6px">' +
    FISH.map(
      (f) =>
        `<span class="pill" style="margin:2px;display:inline-block;opacity:${S.fish[f[1]] ? 1 : 0.4}">${f[0]} ${f[1]}${S.fish[f[1]] ? ' ×' + S.fish[f[1]] : ''}</span>`,
    ).join('') +
    '</div><div class="mut" style="margin-top:4px">Memancing hanya untuk bersantai: tidak menghasilkan token konsultasi.</div></div>'
  );
}
