// Perpustakaan, aksi bangunan (ACT), duduk/berdiri, bar aksi
const QT = [
  'Tidak apa-apa istirahat sebentar. Dunia akan menunggu.',
  'Perasaan yang diceritakan terasa lebih ringan dipikul.',
  'Hari yang berat tidak menghapus kebaikan yang sudah kamu lakukan.',
  'Meminta bantuan adalah tanda keberanian, bukan kelemahan.',
  'Langkah kecil hari ini tetap sebuah langkah.',
  'Kamu tidak harus kuat sendirian.',
];
function quote() {
  modal(
    `<h3>📚 Perpustakaan Teduh</h3><p>Sebuah catatan terselip di rak:</p><p style="font-style:italic">“${QT[(Math.random() * QT.length) | 0]}”</p><div class="ch"><button class="p" onclick="closeM()">Tutup</button><button onclick="quote()">Baca catatan lain</button></div>`,
  );
}
function go(t) {
  setT(t);
  toast('Dibuka: ' + { s: 'Toko', k: 'Konsultasi', c: 'Obrolan' }[t]);
}
const ACT = {
  cafe: ['☕ Tulis jurnal perasaan', () => journal()],
  home: ['🏠 Masuk ke rumah', () => enterHome()],
  clinic: ['🏥 Konsultasi profesional', () => go('k')],
  hall: ['🏛 Obrolan komunitas', () => go('c')],
  shop: ['🏪 Buka toko', () => go('s')],
  lib: ['📚 Buka perpustakaan', () => openLib()],
  cook: ['🍳 Masak di dapur', () => openCooking()],
};
const STAND = { k: 'stand', l: '🧍 Berdiri' + (TOUCH ? '' : ' (E / gerak)'), c: '', f: () => stand() },
  taken = (i) => peers.some((p) => !p.isMe && ((p.presence || {}).t | 0) === i + 1);
function sit(i) {
  if (taken(i)) {
    toast('Tempat duduk ini sedang dipakai.');
    return;
  }
  if (F.on) endFish();
  const e = BEN[i];
  P.sit = i;
  P.x = e[0];
  P.y = e[1];
  P.tx = null;
  P.fx = 1;
  P.mv = 0;
  questProg('sit', 1);
}
function stand() {
  if (P.sit == null) return;
  const e = BEN[P.sit];
  P.sit = null;
  P.x = e[0];
  P.y = e[1] + 22;
}
function actUp() {
  const k = near ? near.k : '';
  if (k === ak) return;
  ak = k;
  const e = $('#act');
  e.innerHTML = '';
  if (!near) {
    e.innerHTML =
      '<span class="mut">Dekati teman, tanaman, kafe, bangku, atau tepi danau' +
      (TOUCH ? '.' : ' (tombol E).') +
      '</span>';
    return;
  }
  const b = document.createElement('button');
  b.className = near.c;
  b.textContent = near.l;
  b.onclick = () => near && near.f();
  e.append(b);
}
