// Top up, notice peduli, tab, toko, kupon konsultasi, demo
const win = () => S.log.filter((x) => Date.now() - x[0] < 30 * DAY),
  cnt = () => win().length,
  PK = [
    [100, 15000],
    [550, 75000],
    [1200, 150000],
  ];
function topup(i) {
  const [co, rp] = PK[i],
    sum = win().reduce((a, x) => a + x[1], 0);
  if (S.lim && sum + rp > S.lim) {
    toast('Ini melewati batas top up bulanan yang kamu atur.');
    return;
  }
  S.coins += co;
  S.log = win();
  S.log.push([Date.now(), rp]);
  save();
  ui();
  check(co);
}
function check(co) {
  const n = cnt(),
    sum = win().reduce((a, x) => a + x[1], 0),
    h = new Date().getHours();
  if (Date.now() - S.noticed > 30 * DAY && (n >= 5 || sum >= 5e5 || (h < 5 && n >= 3))) notice();
  else if (n == 3) toast('Pengingat: ini top up ke-3 bulan ini. Tetap santai ya 🌿');
  else toast('+' + co + ' koin (simulasi)');
}
function notice() {
  modal(
    `<h3>💜 Kami peduli padamu</h3><p>Bulan ini kamu cukup sering top up (${cnt()}×). Tidak ada yang salah, dan kami tidak akan memblokir apa pun. Kami hanya ingin memastikan kamu baik-baik saja.</p><p>Mau dibantu profesional? Kamu mendapat potongan sesi konsultasi.</p><div class="ch"><button class="g" onclick="S.noticed=Date.now();S.disc=1;save();closeM();setT('k')">Ya, saya mau dibantu</button><button onclick="S.noticed=Date.now();save();closeM()">Tidak, lanjut main</button></div>`,
  );
}
function setT(t) {
  tab = t;
  document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('on', b.dataset.t == t));
  ui();
}
document.querySelectorAll('.tabs button').forEach((b) => (b.onclick = () => setT(b.dataset.t)));
function buy(kind, i) {
  const key = kind + i,
    cost = kind == 'c' ? CC[i] : HC[i];
  if (!S.own.includes(key)) {
    if (S.coins < cost) {
      toast('Koin kurang. Kerjakan misi atau top up.');
      return;
    }
    S.coins -= cost;
    S.own.push(key);
  }
  if (kind == 'c') S.col = i;
  else S.hat = i;
  save();
  ui();
}
const rd = () => S.red.filter((x) => Date.now() - x < 30 * DAY).length;
function redeem(t) {
  const cost = t == 'chat' ? 300 : 600;
  if (rd() >= 2) {
    toast('Batas 2 kupon per bulan tercapai.');
    return;
  }
  if (S.tokens < cost) {
    toast('Token belum cukup.');
    return;
  }
  S.tokens -= cost;
  S.cp[t]++;
  S.red = S.red.filter((x) => Date.now() - x < 30 * DAY);
  S.red.push(Date.now());
  save();
  ui();
  toast('Kupon ' + t + ' didapat 🎟');
}
function book(t) {
  if (!S.cp[t]) return;
  S.cp[t]--;
  save();
  ui();
  modal(
    `<h3>✅ Konsultasi ${t == 'chat' ? 'chat' : 'video call'} dipesan</h3><p>Jadwal akan dikonfirmasi oleh psikolog/konselor berizin mitra kami (simulasi). Data konsultasi disimpan terpisah dari data game.</p><div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}
function book2(t) {
  S.disc = 0;
  save();
  ui();
  modal(
    `<h3>✅ Sesi ${t} dipesan dengan potongan 50%</h3><p>Pembayaran dan jadwal dikonfirmasi mitra (simulasi).</p><div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}
function demo5() {
  S.log = win();
  for (let i = 0; i < 5; i++) S.log.push([Date.now() - i * 1e3, 15000]);
  S.noticed = 0;
  save();
  ui();
  notice();
}
