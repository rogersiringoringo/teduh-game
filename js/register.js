// Registrasi, verifikasi usia, buat karakter, hapus akun
let regStep = 0,
  RD = {};
const regOpen = () => $('#rg').style.display == 'flex',
  NAMEOK = (v) => /^[\p{L}\p{N} _.-]{2,14}$/u.test(v) && badw(v) === v;
const age = (d) => {
  const b = new Date(d),
    n = new Date();
  if (isNaN(b)) return -1;
  let a = n.getFullYear() - b.getFullYear();
  const m = n.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < b.getDate())) a--;
  return a;
};
function setName(v) {
  v = v.replace(/[<>]/g, '').trim().slice(0, 14);
  if (!NAMEOK(v)) {
    toast('Nama tidak valid.');
    ui();
    return;
  }
  S.name = v;
  save();
}
function showReg() {
  setT('m');
  regStep = 1;
  RD = {};
  $('#rg').style.display = 'flex';
  reg1();
}
function reg1() {
  regStep = 1;
  $('#rc').innerHTML =
    `<h2>🌿 Selamat datang di Teduh</h2><p class="mut">Ruang santai untuk melepas penat dan ngobrol. Buat akunmu dulu ya.</p>
<label for="rn">Nama panggilan</label><input type="text" id="rn" maxlength="14" autocomplete="off" value="${esc(RD.n || '')}" placeholder="2–14 karakter">
<label for="rb">Tanggal lahir</label><input type="date" id="rb" max="${today()}" value="${esc(RD.bd || '')}" onchange="regAge()"><div class="mut">Hanya untuk menentukan kelompok usia. Tanggal lahir tidak disimpan.</div>
<label class="ck"><input type="checkbox" id="c1"><span>Saya setuju dengan Syarat &amp; Ketentuan dan Kebijakan Privasi Teduh. <a href="#" onclick="priv();return false">Baca ringkasan</a></span></label>
<label class="ck"><input type="checkbox" id="c2"><span>Saya paham data mood dan konsultasi adalah data pribadi sensitif dan disimpan terpisah dari data game.</span></label>
<label class="ck" id="c3w" style="display:none"><input type="checkbox" id="c3"><span>Orang tua/wali saya mengizinkan saya bermain Teduh.</span></label>
<div id="re" style="color:var(--warn);margin:8px 0;min-height:20px"></div><button class="p" style="width:100%" onclick="regNext()">Lanjut</button>
<p class="mut">Teduh bukan pengganti layanan medis. <a href="#" onclick="sos();return false">Butuh bantuan sekarang?</a></p>`;
  regAge();
}
function regAge() {
  const v = $('#rb').value,
    a = v ? age(v) : -1;
  $('#c3w').style.display = a >= 13 && a < 18 ? 'flex' : 'none';
}
function priv() {
  modal(
    `<h3>Ringkasan privasi</h3><div class="mut">• Data yang disimpan: nama panggilan, kelompok usia, progres game, serta mood dan jurnal (di perangkatmu).<br>• Tanggal lahir tidak disimpan.<br>• Data mood dan konsultasi dipisah dari data game, tidak dipakai untuk iklan.<br>• Kamu bisa menghapus akun lokal kapan saja di tab Bantuan.<br>• Pengguna 13–17 tahun butuh izin orang tua dan punya batas top up Rp75.000/bulan.<br>• Ini prototipe: dokumen resmi sesuai UU PDP wajib dilengkapi sebelum rilis.</div><div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}
function regNext() {
  const n = $('#rn').value.replace(/[<>]/g, '').trim(),
    v = $('#rb').value,
    er = (t) => {
      $('#re').textContent = t;
    };
  RD = { n, bd: v };
  if (!NAMEOK(n)) return er('Nama 2–14 karakter (huruf, angka, spasi) dan harus sopan.');
  if (!v) return er('Isi tanggal lahir.');
  const a = age(v);
  if (!(a >= 0 && a <= 110)) return er('Tanggal lahir tidak valid.');
  if (a < 13) {
    RD = {};
    $('#rc').innerHTML =
      `<h2>Maaf ya 💜</h2><p>Teduh untuk usia 13 tahun ke atas.</p><p class="mut">Jika kamu sedang butuh bantuan, bicaralah dengan orang dewasa tepercaya atau hubungi Layanan Sejiwa 119 ext. 8.</p><button onclick="reg1()">Kembali</button>`;
    return;
  }
  if (!$('#c1').checked || !$('#c2').checked) return er('Centang persetujuan untuk melanjutkan.');
  if (a < 18 && !$('#c3').checked) return er('Butuh izin orang tua/wali untuk pengguna di bawah 18 tahun.');
  RD.minor = a < 18;
  regStep = 2;
  renderChar();
}
function renderChar() {
  $('#rc').innerHTML =
    '<h2>Buat karakter</h2><p class="mut">Halo, ' +
    esc(RD.n) +
    '! Pilih penampilanmu (bisa diubah nanti).</p>' +
    APP() +
    '<div class="row"><button onclick="reg1()">Kembali</button><button class="g" onclick="regDone()">Mulai bermain</button></div>';
  preview();
}
function regDone() {
  S.name = RD.n;
  S.reg = 1;
  S.minor = RD.minor ? 1 : 0;
  S.cons = Date.now();
  if (S.minor) S.lim = 75000;
  regStep = 0;
  RD = {};
  save();
  $('#rg').style.display = 'none';
  ui();
  toast('Selamat datang, ' + S.name + '! 🌿');
  if (!room) connect();
}
function resetAsk() {
  modal(
    '<h3>Hapus akun?</h3><p>Semua progres, koin, dan jurnal di perangkat ini akan dihapus.</p><div class="ch"><button class="w" onclick="closeM();resetAll()">Ya, hapus</button><button onclick="closeM()">Batal</button></div>',
  );
}
function resetAll() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {}
  load();
  showReg();
}
