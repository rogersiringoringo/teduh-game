// Deteksi objek terdekat yang bisa diajak interaksi
function nearest() {
  if (IN) return nearestHome();
  let b = null,
    bd = 34;
  const d = (x, y) => Math.hypot(x - P.x, y - P.y);
  NPC.forEach((n, i) => {
    const q = d(n.x, n.y);
    if (q < bd) {
      bd = q;
      b = { k: 'n' + i, l: '💬 Ngobrol dengan ' + n.n, c: 'p', f: () => talk(i) };
    }
  });
  PL.forEach((p, i) => {
    const q = d(p[0], p[1]);
    if (!S.pl[i] && q < bd) {
      bd = q;
      b = { k: 'p' + i, l: '💧 Siram tanaman', c: 'g', f: () => water(i) };
    }
  });
  B.forEach((e, i) => {
    const a = ACT[e[7]];
    if (!a) return;
    const q = d(e[0] + e[2] / 2, e[1] + e[3] + 10);
    if (q < 44 && q < bd + 8) {
      bd = q;
      b = { k: 'b' + i, l: a[0], c: 'p', f: a[1] };
    }
  });
  BEN.forEach((e, i) => {
    const q = d(e[0], e[1] + 12);
    if (q < 42 && q < bd + 8) {
      bd = q;
      b = { k: 's' + i, l: '🪑 Duduk', c: 'g', f: () => sit(i) };
    }
  });
  // Panggung musik — dekati alat untuk memainkannya
  STG.forEach((s, i) => {
    const q = d(s.x, s.y);
    if (q < 36 && q < bd + 6) {
      bd = q;
      b = { k: 'g' + i, l: '🎵 Main ' + s.n, c: 'p', f: () => stagePlay(i) };
    }
  });
  // Pemain lain di dekat — tombol sapaan (icebreaker sosial)
  peers.forEach((p) => {
    if (p.isMe || muted.has(p.peer)) return;
    const r = p.presence || {},
      px = +r.x,
      py = +r.y;
    if (!isFinite(px) || !isFinite(py)) return;
    const q = d(px, py);
    if (q < 44 && q < bd + 6) {
      bd = q;
      b = {
        k: 'pr' + p.peer,
        l: '💬 Sapa ' + String(r.n || 'Teman').slice(0, 14),
        c: 'g',
        f: () => talkPeer(p),
      };
    }
  });
  if (!b && nearLake()) b = { k: 'lake', l: '🎣 Memancing', c: 'g', f: startFish };
  return b;
}
