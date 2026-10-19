// Menggambar karakter, topi, rambut, pratinjau penampilan
function txt(s, x, y, f) {
  c.font = (f || 24) + 'px serif';
  c.fillText(s, x, y);
}
function label(t, x, y) {
  c.font = 'bold 10px sans-serif';
  c.fillStyle = '#1b2a3a';
  c.fillText(t, x, y);
}
function bubble(t, x, y) {
  t = t.slice(0, 28);
  c.font = '11px sans-serif';
  const w = c.measureText(t).width + 12;
  c.fillStyle = '#fff';
  c.fillRect(x - w / 2, y - 9, w, 18);
  c.fillStyle = '#222';
  c.fillText(t, x, y);
}
const SK = ['#f6d5b8', '#e8b88f', '#c68a5e', '#8d5a3b'],
  HR = ['#1c1410', '#4a2c1a', '#a0522d', '#d9b36a', '#7b3fa0'];
function rr(x, y, w, h, r, f) {
  c.fillStyle = f;
  c.beginPath();
  if (c.roundRect) c.roundRect(x, y, w, h, r);
  else c.rect(x, y, w, h);
  c.fill();
}
function dot(x, y, r, f) {
  c.fillStyle = f;
  c.beginPath();
  c.arc(x, y, r, 0, 7);
  c.fill();
}
function hatD(i, x, y) {
  if (i == 1) {
    rr(x - 8, y - 8, 16, 2.5, 1, '#222');
    rr(x - 5, y - 16, 10, 9, 1.5, '#222');
    rr(x - 5, y - 10, 10, 2, 0, '#c0392b');
  }
  if (i == 2) {
    c.fillStyle = '#f4c430';
    c.beginPath();
    c.moveTo(x - 6, y - 6);
    c.lineTo(x - 6, y - 13);
    c.lineTo(x - 3, y - 9);
    c.lineTo(x, y - 14);
    c.lineTo(x + 3, y - 9);
    c.lineTo(x + 6, y - 13);
    c.lineTo(x + 6, y - 6);
    c.closePath();
    c.fill();
  }
  if (i == 3) {
    [
      [0, -3],
      [3, 0],
      [0, 3],
      [-3, 0],
    ].forEach((o) => dot(x + 5 + o[0], y - 5 + o[1], 2.2, '#ff8fab'));
    dot(x + 5, y - 5, 1.6, '#ffd166');
  }
  if (i == 4) {
    c.fillStyle = '#3a86ff';
    c.beginPath();
    c.arc(x, y - 2, 7.4, Math.PI, 0);
    c.fill();
    rr(x - 8.5, y - 3, 17, 2, 1, '#2763c4');
  }
}
function person(x, y, o) {
  const fy = y + 13,
    sw = o.mv ? Math.sin(o.ph) * 3 : 0,
    bob = o.mv ? Math.abs(Math.sin(o.ph)) : 0,
    d = o.sit ? 4 : 0,
    hy = fy - 27 + d - bob,
    sk = SK[o.sk] || SK[0],
    hc = HR[o.hc] || HR[0],
    hs = o.hs | 0,
    ex = (o.fx || 1) * 1.4,
    sh = o.sh || '#6c5ce7';
  c.fillStyle = 'rgba(0,0,0,.22)';
  c.beginPath();
  c.ellipse(x, fy, 8, 3, 0, 0, 7);
  c.fill();
  if (hs == 1) rr(x - 7.4, hy - 4, 14.8, 17, 5, hc);
  rr(x - 5 + sw * 0.4, fy - 9 + d, 4, 8 - d, 1.5, '#3b4466');
  rr(x + 1 - sw * 0.4, fy - 9 + d, 4, 8 - d, 1.5, '#3b4466');
  rr(x - 5.6 + sw * 0.4, fy - 2, 5, 2.4, 1.2, '#222');
  rr(x + 0.6 - sw * 0.4, fy - 2, 5, 2.4, 1.2, '#222');
  rr(x - 6.5, fy - 21 + d - bob, 13, 13, 4, sh);
  rr(x + 1, fy - 21 + d - bob, 5.5, 13, 3, 'rgba(0,0,0,.12)');
  rr(x - 9.8 - sw * 0.3, fy - 20 + d - bob, 3.6, 10, 1.8, sh);
  rr(x + 6.2 + sw * 0.3, fy - 20 + d - bob, 3.6, 10, 1.8, sh);
  dot(x - 8 - sw * 0.3, fy - 9.5 + d - bob, 1.9, sk);
  dot(x + 8 + sw * 0.3, fy - 9.5 + d - bob, 1.9, sk);
  rr(x - 2, hy + 4, 4, 5, 1, sk);
  dot(x - 6.3, hy + 1, 1.4, sk);
  dot(x + 6.3, hy + 1, 1.4, sk);
  dot(x, hy, 6.5, sk);
  dot(x - 2.4 + ex, hy + 0.6, 0.9, '#2b2b2b');
  dot(x + 2.4 + ex, hy + 0.6, 0.9, '#2b2b2b');
  dot(x - 3.8 + ex, hy + 2.8, 1.3, 'rgba(255,100,100,.3)');
  dot(x + 3.8 + ex, hy + 2.8, 1.3, 'rgba(255,100,100,.3)');
  c.strokeStyle = '#8a3b3b';
  c.lineWidth = 0.8;
  c.beginPath();
  c.arc(x + ex, hy + 2, 1.9, 0.25 * Math.PI, 0.75 * Math.PI);
  c.stroke();
  c.fillStyle = hc;
  c.beginPath();
  c.arc(x, hy - 0.5, 6.9, Math.PI, 0);
  c.fill();
  rr(x - 6.9, hy - 3.5, 13.8, 3.4, 1.7, hc);
  if (hs == 1) {
    rr(x - 7.2, hy - 2, 2.6, 12, 1.3, hc);
    rr(x + 4.6, hy - 2, 2.6, 12, 1.3, hc);
  }
  if (hs == 2) dot(x, hy - 8, 3.2, hc);
  if (hs == 3)
    for (let i = 0; i < 7; i++) {
      const a = Math.PI + (i * Math.PI) / 6;
      dot(x + Math.cos(a) * 6.4, hy - 0.5 + Math.sin(a) * 6.4, 3.1, hc);
    }
  hatD(o.hat | 0, x, hy);
}
function who(x, y, o, name, b) {
  person(x, y, o);
  label(name, x, y + 22);
  if (b && b.u > Date.now()) bubble(b.t, x, y - 42);
}
function APP() {
  const sw = (a, v, k) =>
    a
      .map(
        (x, i) =>
          `<button onclick="S.${k}=${i};save();ui()" style="border-left:14px solid ${x};${v == i ? 'outline:2px solid var(--pri)' : ''}">&nbsp;</button>`,
      )
      .join('');
  return (
    '<div class="card"><div class="row"><div><b>Penampilan</b><div class="mut">Gratis</div></div><canvas id="pv" width="160" height="160" style="width:80px;height:80px;border-radius:12px"></canvas></div><div class="mut" style="margin-top:6px">Kulit</div><div class="row" style="justify-content:flex-start">' +
    sw(SK, S.sk, 'sk') +
    '</div><div class="mut" style="margin-top:6px">Gaya rambut</div><div class="row" style="justify-content:flex-start;flex-wrap:wrap">' +
    ['Pendek', 'Panjang', 'Cepol', 'Keriting']
      .map(
        (x, i) =>
          `<button onclick="S.hs=${i};save();ui()" style="${S.hs == i ? 'outline:2px solid var(--pri)' : ''}">${x}</button>`,
      )
      .join('') +
    '</div><div class="mut" style="margin-top:6px">Warna rambut</div><div class="row" style="justify-content:flex-start">' +
    sw(HR, S.hc, 'hc') +
    '</div></div>'
  );
}
function preview() {
  const e = $('#pv');
  if (!e) return;
  const x = e.getContext('2d'),
    o = c;
  try {
    x.setTransform(3, 0, 0, 3, 0, 0);
    x.fillStyle = '#bfe3b4';
    x.fillRect(0, 0, 60, 60);
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    c = x;
    person(27, 33, { sh: COL[S.col], sk: S.sk, hs: S.hs, hc: S.hc, hat: S.hat, ph: 0, fx: 1, mv: 0 });
  } finally {
    c = o;
  }
}
