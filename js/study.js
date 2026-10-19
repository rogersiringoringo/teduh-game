// Ruang Belajar: buku pelajaran di dalam rumah (materi + latihan soal).
// Berbeda dari Perpustakaan (js/library.js) yang berisi Cerita Rakyat & Novel.
// Dipakai dari js/interior.js (kursi baca di ruangan 'belajar').
// Sesuai DESIGN.md: aksi di dalam rumah tidak memberi token.

const LESSONS = [
  {
    id: 'pecahan',
    t: 'Pecahan & Perbandingan',
    mapel: 'Matematika',
    ic: '➗',
    ringkas: [
      'Pecahan menunjukkan bagian dari keseluruhan. Bagiannya disebut pembilang, keseluruhan disebut penyebut. Tiga per empat ditulis 3/4.',
      'Penyebut sama: cukup jumlahkan pembilangnya. 1/8 + 2/8 = 3/8.',
      'Penyebut berbeda: samakan dulu. 1/2 = 2/4, jadi 1/2 + 1/4 = 3/4.',
      'Perbandingan banding dipakai saat penyebut sama. Bandingkan pembilangnya saja.',
      'Perbandingan bilangan dipakai saat penyebut berbeda. Samakan dulu ke penyebut yang sama.',
    ],
    rumus: [
      'Banding: 3/8 lebih besar dari 2/8, karena 3 lebih besar dari 2.',
      'Bilangan: 1/2 vs 1/4. Samakan menjadi 2/4 vs 1/4, jadi 1/2 lebih besar.',
    ],
    contoh: [
      { q: '1/4 + 2/4', a: '3/4' },
      { q: '1/2 dibanding 1/3', a: '1/2 lebih besar, karena 3/6 vs 2/6' },
      { q: '2 : 5', a: '40 persen' },
    ],
    kuis: [
      {
        q: '1/2 + 1/4 sama dengan berapa?',
        o: ['3/4', '2/6', '1/6', '2/8'],
        a: 0,
        why: 'Penyebutnya disamakan lebih dulu. 1/2 = 2/4, jadi 2/4 + 1/4 = 3/4.',
      },
      {
        q: 'Mana yang lebih besar, 3/8 atau 2/5?',
        o: ['3/8', '2/5', 'Sama besar', 'Tidak bisa dibandingkan'],
        a: 1,
        why: 'Samakan ke penyebut 40. 3/8 = 15/40 dan 2/5 = 16/40. Jadi 2/5 lebih besar.',
      },
      {
        q: 'Sebuah toko menjual 3 dus buku hari Senin dan 4 dus hari Selasa. Hari mana yang lebih laku?',
        o: ['Senin', 'Selasa', 'Sama saja', 'Tidak bisa diketahui'],
        a: 1,
        why: 'Totalnya 7 dus. Selasa menyumbang 4 dus, lebih dari setengah.',
      },
      {
        q: 'Perbandingan 2 : 5 sama dengan berapa persen?',
        o: ['20 persen', '40 persen', '50 persen', '25 persen'],
        a: 1,
        why: '2 dari 5 bagian sama dengan 2/5. Dikali 100 persen menjadi 40 persen.',
      },
    ],
  },
  {
    id: 'tanda',
    t: 'Tanda Baca & Kata Baku',
    mapel: 'Bahasa Indonesia',
    ic: '📝',
    ringkas: [
      'Kalimat yang baik dimulai dengan huruf kapital dan diakhiri tanda baca yang tepat.',
      'Tanda baca dasar ada empat. Titik untuk kalimat biasa, tanda tanya untuk kalimat tanya, tanda seru untuk kalimat seruan, koma untuk memisahkan bagian.',
      'Kata baku ditulis sesuai kaidah. Contoh: apotek, empat, aktivitas, teknologi.',
      'Memakai kata baku bukan berarti memakai kata yang rumit. Yang penting kalimatnya tetap terbaca.',
    ],
    rumus: [
      'Awal kalimat: huruf kapital.',
      'Kalimat tanya: tanda tanya di akhir.',
      'Kalimat seruan: tanda seru di akhir.',
      'Kalimat biasa: titik di akhir.',
    ],
    contoh: [
      { q: 'Besok kita belajar.', a: 'Kalimat biasa, diakhiri titik.' },
      { q: 'Ke mana kamu pergi?', a: 'Kalimat tanya, diakhiri tanda tanya.' },
      { q: 'Dia berlari sangat cepat!', a: 'Kalimat seruan, diakhiri tanda seru.' },
    ],
    kuis: [
      {
        q: 'Mana yang huruf kapital dan tanda bacanya sudah benar?',
        o: [
          'Andi membeli buku di toko.',
          'andi membeli buku di toko.',
          'Andi membeli buku di toko',
          'andi Membeli buku di toko.',
        ],
        a: 0,
        why: 'Awal kalimat memakai huruf kapital, dan kalimat biasa diakhiri titik.',
      },
      {
        q: 'Mana ejaan baku dari kata praktik?',
        o: ['praktik', 'praktek', 'prakteek', 'praktikk'],
        a: 0,
        why: 'Bentuk lampiran ditulis -tik, jadi praktik.',
      },
      {
        q: 'Kalimat yang menunjukkan maksud seruan memakai tanda baca apa?',
        o: ['Tanda seru', 'Tanda tanya', 'Titik', 'Koma'],
        a: 0,
        why: 'Tanda seru dipakai untuk kalimat seruan, seperti saat seseorang bersorak kegirangan.',
      },
      {
        q: 'Mana penulisan kalimat yang benar?',
        o: ['Saya ke sekolah.', 'saya ke sekolah.', 'Saya ke sekolah?', 'Saya, ke sekolah.'],
        a: 0,
        why: 'Awal kalimat memakai huruf kapital dan diakhiri titik.',
      },
    ],
  },
  {
    id: 'airsiklus',
    t: 'Siklus Air',
    mapel: 'IPAS',
    ic: '💧',
    ringkas: [
      'Air tidak pernah hilang dari dunia. Ia berulang kali berpindah bentuk melalui siklus air.',
      'Panas matahari menguapkan air, lalu uapnya naik ke udara. Namanya penguapan.',
      'Di tempat yang lebih dingin, uap berubah menjadi titik air lalu menjadi awan. Namanya pengembunan.',
      'Butiran air yang sudah berat jatuh ke tanah sebagai hujan. Air yang meresap ke bawah tanah disebut air tanah.',
    ],
    rumus: [
      'Penguapan: air cair berubah menjadi uap.',
      'Pengembunan: uap berubah kembali menjadi air cair.',
      'Presipitasi: butiran air jatuh sebagai hujan.',
      'Penyerapan: air masuk ke dalam tanah.',
    ],
    contoh: [
      { q: 'Air di panci menghangus', a: 'Penguapan' },
      { q: 'Tutup botol di kulkas basah', a: 'Pengembunan' },
      { q: 'Hujan deras di sore hari', a: 'Presipitasi' },
    ],
    kuis: [
      {
        q: 'Air berubah menjadi uap karena panas matahari disebut apa?',
        o: ['Penguapan', 'Pengembunan', 'Presipitasi', 'Penyerapan'],
        a: 0,
        why: 'Panas matahari menguapkan air. Namanya penguapan.',
      },
      {
        q: 'Titik air pada tutup botol di dalam kulkas berasal dari proses apa?',
        o: ['Pengembunan', 'Penguapan', 'Presipitasi', 'Penyerapan'],
        a: 0,
        why: 'Uap air udara mendingin, lalu mengembun di permukaan yang dingin.',
      },
      {
        q: 'Hujan terjadi karena apa?',
        o: [
          'Butiran air dalam awan sudah cukup berat untuk ditopang',
          'Matahari terlalu panas',
          'Tanah tidak menyerap air',
          'Angin berhenti bertiup',
        ],
        a: 0,
        why: 'Butiran air yang sudah berat tidak lagi bisa ditopang oleh awan.',
      },
      {
        q: 'Air yang meresap ke dalam tanah disebut apa?',
        o: ['Air tanah', 'Air permukaan', 'Uap air', 'Air beku'],
        a: 0,
        why: 'Air yang masuk ke bawah tanah disebut air tanah.',
      },
    ],
  },
  {
    id: 'gizi',
    t: 'Gizi & Makanan Sehat',
    mapel: 'PJOK',
    ic: '🥗',
    ringkas: [
      'Makanan sehat mengandung empat zat: karbohidrat, protein, lemak, serta vitamin dan mineral.',
      'Karbohidrat memberi tenaga. Sumbernya beras, roti, ubi, dan jagung.',
      'Protein membentuk dan memperbaiki jaringan tubuh. Sumbernya telur, ikan, daging, kacang, dan tahu.',
      'Buah dan sayur adalah sumber utama vitamin dan mineral. Umumnya dianjurkan empat sampai lima porsi sehari.',
      'Gula berlebihan dan makanan cepat saji sebaiknya dibatasi, bukan dilarang.',
    ],
    rumus: [
      'Tenaga: karbohidrat.',
      'Bentuk dan perbaikan tubuh: protein.',
      'Perlindungan tubuh: vitamin dan mineral.',
      'Cadangan energi: lemak.',
    ],
    contoh: [
      { q: 'Nasi', a: 'Karbohidrat' },
      { q: 'Telur', a: 'Protein' },
      { q: 'Bayam', a: 'Vitamin dan mineral' },
      { q: 'Air putih', a: 'Minuman utama sepanjang hari' },
    ],
    kuis: [
      {
        q: 'Zat yang membantu pembentukan jaringan tubuh disebut apa?',
        o: ['Protein', 'Karbohidrat', 'Lemak', 'Gula'],
        a: 0,
        why: 'Protein adalah bahan dasar jaringan tubuh.',
      },
      {
        q: 'Makanan yang mengandung karbohidrat adalah?',
        o: ['Nasi', 'Telur', 'Bayam', 'Air putih'],
        a: 0,
        why: 'Nasi, roti, ubi, dan jagung mengandung karbohidrat.',
      },
      {
        q: 'Sumber utama vitamin dan mineral adalah?',
        o: ['Buah dan sayur', 'Nasi', 'Daging', 'Telur'],
        a: 0,
        why: 'Buah dan sayur kaya akan vitamin dan mineral.',
      },
      {
        q: 'Menurut anjuran gizi, jumlah porsi buah dan sayur umumnya?',
        o: [
          'Empat sampai lima porsi sehari',
          'Satu porsi sepekan',
          'Tidak perlu makan buah',
          'Sepuluh porsi sehari',
        ],
        a: 0,
        why: 'Umum dianjurkan empat sampai lima porsi buah dan sayur sehari.',
      },
    ],
  },
  {
    id: 'adab',
    t: 'Adab & Rukun Islam',
    mapel: 'Agama',
    ic: '🕌',
    ringkas: [
      'Rukun Islam ada lima: syahadat, sholat, puasa, zakat, dan haji.',
      'Syahadat adalah rukun paling dasar. Rukun yang lain berdiri di atasnya.',
      'Adab kepada orang tua disebut birrul walidain. Hormat tidak berhenti saat umur sudah dua angka.',
      'Zakat adalah kewajiban berbagi kepada orang yang membutuhkan. Nilainya tidak boleh ditahan.',
    ],
    rumus: [
      'Syahadat: dasar seluruh rukun.',
      'Sholat: lima waktu sehari.',
      'Puasa: menahan makan dan minum dari fajar sampai magrib.',
      'Zakat: berbagi. Haji: perjalanan ke Baitullah bagi yang mampu.',
    ],
    contoh: [
      { q: 'Memberi sebagian harta kepada orang miskin', a: 'Zakat' },
      { q: 'Pergi ke Baitullah pada musim haji', a: 'Haji' },
      { q: 'Menghormati ayah dan ibu', a: 'Birrul walidain' },
    ],
    kuis: [
      {
        q: 'Berapa jumlah rukun Islam?',
        o: ['Tiga', 'Lima', 'Tujuh', 'Sembilan'],
        a: 1,
        why: 'Ada lima: syahadat, sholat, puasa, zakat, dan haji.',
      },
      {
        q: 'Rukun Islam yang berkaitan dengan dana sosial adalah?',
        o: ['Zakat', 'Puasa', 'Sholat', 'Haji'],
        a: 0,
        why: 'Zakat adalah kewajiban berbagi kepada orang yang membutuhkan.',
      },
      {
        q: 'Sikap menghormati orang tua disebut?',
        o: ['Birrul walidain', 'Taat', 'Sabar', 'Ikhlas'],
        a: 0,
        why: 'Birrul walidain berarti berbakti kepada orang tua.',
      },
      {
        q: 'Puasa dalam Islam dilakukan sejak waktu apa?',
        o: ['Fajar sampai magrib', 'Magrib sampai subuh', 'Tengah malam saja', 'Setelah salat magrib'],
        a: 0,
        why: 'Puasa menahan makan dan minum dari fajar sampai magrib.',
      },
    ],
  },
  {
    id: 'komputasi',
    t: 'Berpikir Komputasional',
    mapel: 'Informatika',
    ic: '💻',
    ringkas: [
      'Berpikir komputasional berarti memecah masalah besar menjadi langkah-langkah kecil.',
      'Setiap langkah harus jelas dan bisa dikerjakan berulang kali. Kalau tidak jelas, itu belum algoritma.',
      'Variabel adalah tempat sementara untuk menyimpan nilai. Nilainya boleh berubah.',
      'Kondisi memungkinkan program memilih jalan. Contoh: jika nilai di atas tujuh puluh, hasilnya lulus.',
    ],
    rumus: [
      'Algoritma: langkah berurutan yang jelas.',
      'Variabel: tempat menyimpan nilai.',
      'Kondisi: memilih jalan berdasarkan aturan.',
      'Perulangan: mengerjakan hal yang sama beberapa kali.',
    ],
    contoh: [
      { q: 'Cuci piring, lalu lap, lalu simpan', a: 'Algoritma sederhana' },
      { q: 'Umur dipakai sebagai patokan besaran pembayaran', a: 'Penggunaan variabel' },
      { q: 'Nilai di atas tujuh puluh berarti lulus', a: 'Kondisi' },
    ],
    kuis: [
      {
        q: 'Apa arti memecah masalah besar menjadi langkah-langkah kecil?',
        o: ['Berpikir komputasional', 'Berpikir analog', 'Berhenti berpikir', 'Menebak jawaban'],
        a: 0,
        why: 'Berpikir komputasional memecah masalah menjadi langkah yang jelas dan berurutan.',
      },
      {
        q: 'Variabel dalam program berfungsi sebagai apa?',
        o: ['Penyimpan nilai', 'Label tampilan', 'Penghitung waktu', 'Pemutar suara'],
        a: 0,
        why: 'Variabel menyimpan nilai yang boleh berubah saat program berjalan.',
      },
      {
        q: 'Pernyataan "jika nilai di atas tujuh puluh, maka lulus" termasuk apa?',
        o: ['Kondisi', 'Variabel', 'Perulangan', 'Komentar'],
        a: 0,
        why: 'Kondisi memilih jalan/program berdasarkan suatu aturan.',
      },
      {
        q: 'Perulangan dipakai untuk apa?',
        o: ['Mengulang pekerjaan berkali-kali', 'Menyimpan teks', 'Menyimpan warna', 'Mengubah nama file'],
        a: 0,
        why: 'Perulangan mengerjakan hal yang sama beberapa kali.',
      },
    ],
  },
];

// ---- State ----
function stRec(id) {
  S.st[id] = S.st[id] || { r: 0, q: [] };
  if (!Array.isArray(S.st[id].q)) S.st[id].q = [];
  return S.st[id];
}
const stGot = (ls) => {
  const q = (S.st[ls.id] && S.st[ls.id].q) || [];
  return q.filter((v) => v === 1).length;
};
function stModal(h) {
  modal(h);
  $('#mo').classList.add('rd');
  $('#md').scrollTop = 0;
}

// ---- Daftar buku di meja belajar ----
function openStudy() {
  let h =
    '<h3>📚 Ruang Belajar</h3>' +
    '<p class="mut">Buku pelajaran di rumahmu. Isinya materi sekolah, bukan cerita. ' +
    'Belajar di sini tidak memakai token.</p>';
  for (const ls of LESSONS) {
    const got = stGot(ls);
    const pct = Math.min(100, Math.round((got / ls.kuis.length) * 100));
    h += `<div class="card"><div class="row"><b>${ls.ic} ${esc(ls.t)}</b><span class="mut">${esc(ls.mapel)}</span></div>`;
    h += `<div class="bar"><i style="width:${pct}%"></i></div>`;
    h += `<div class="row" style="margin-top:8px"><span class="mut">${got}/${ls.kuis.length} soal benar</span>`;
    h += `<button class="p" onclick="studyRead('${ls.id}')">Materi</button>`;
    h += `<button onclick="studyQuiz('${ls.id}',0)">Latihan</button></div></div>`;
  }
  h += '<div class="ch"><button onclick="closeM()">Tutup</button></div>';
  stModal(h);
}

// ---- Materi ----
function studyRead(id) {
  const ls = LESSONS.find((x) => x.id == id);
  if (!ls) return openStudy();
  stRec(id).r = 1;
  save();
  let h = `<h3>${ls.ic} ${esc(ls.t)}</h3>`;
  h += `<div class="mut">${esc(ls.mapel)}</div><h4 class="rdh">Materi</h4>`;
  for (const p of ls.ringkas) h += `<p class="rd">${esc(p)}</p>`;
  if (ls.rumus && ls.rumus.length) {
    h += '<h4 class="rdh">Rumus singkat</h4>';
    for (const r of ls.rumus) h += `<p class="rd">• ${esc(r)}</p>`;
  }
  if (ls.contoh && ls.contoh.length) {
    h += '<h4 class="rdh">Contoh</h4>';
    for (const c of ls.contoh) h += `<p class="rd">${esc(c.q)} — ${esc(c.a)}</p>`;
  }
  h += `<div class="ch"><button onclick="studyQuiz('${id}',0)">Mulai latihan soal</button>`;
  h +=
    '<button class="p" onclick="openStudy()">← Daftar buku</button>' +
    '<button onclick="closeM()">Tutup</button></div>';
  stModal(h);
}

// ---- Latihan soal ----
function studyQuiz(id, i) {
  const ls = LESSONS.find((x) => x.id == id);
  if (!ls) return openStudy();
  if (i >= ls.kuis.length) return studyResult(id);
  const k = ls.kuis[i];
  let h = `<h3>${ls.ic} ${esc(ls.t)}</h3>`;
  h += `<div class="mut">Soal ${i + 1} dari ${ls.kuis.length} · ${esc(ls.mapel)}</div>`;
  h += `<div class="bar"><i style="width:${Math.round((i / ls.kuis.length) * 100)}%"></i></div>`;
  h += `<h4 class="rdh">${esc(k.q)}</h4><div class="ch">`;
  for (let j = 0; j < k.o.length; j++)
    h += `<button class="opt" onclick="studyAnswer('${id}',${i},${j})">${esc(k.o[j])}</button>`;
  h += '</div><div class="ch"><button class="p" onclick="openStudy()">Keluar dari latihan</button></div>';
  stModal(h);
}
function studyAnswer(id, i, pickIdx) {
  const ls = LESSONS.find((x) => x.id == id);
  if (!ls || !ls.kuis[i]) return openStudy();
  const k = ls.kuis[i],
    ok = pickIdx === k.a;
  stRec(id).q[i] = ok ? 1 : 0;
  save();
  let h = `<h3>${ls.ic} ${esc(ls.t)}</h3>`;
  h += `<div class="mut">Soal ${i + 1} dari ${ls.kuis.length}</div><p class="rd">${esc(k.q)}</p>`;
  h += `<p class="rd"><b>Jawaban kamu: ${esc(k.o[pickIdx])}</b></p>`;
  h += `<p class="rd${ok ? '' : ' end'}">${ok ? 'Benar.' : 'Belum tepat.'}</p>`;
  h += `<p class="rd">${esc(k.why)}</p><div class="ch">`;
  h += `<button class="p" onclick="studyQuiz('${id}',${i + 1})">Soal berikutnya</button>`;
  h += '<button onclick="openStudy()">← Daftar buku</button></div>';
  stModal(h);
}

// ---- Hasil ----
function studyResult(id) {
  const ls = LESSONS.find((x) => x.id == id);
  if (!ls) return openStudy();
  const tot = ls.kuis.length,
    got = stGot(ls),
    pct = Math.round((got / tot) * 100);
  const msg =
    pct === 100
      ? 'Semua benar. Materi ini sudah kukuh.'
      : pct >= 75
        ? 'Bagus. Tinggal satu dua soal lagi.'
        : pct >= 50
          ? 'Setengah jalan. Baca materinya sekali lagi, lalu coba lagi.'
          : 'Belum banyak yang nempel. Tidak apa-apa, ulang-ulang memang perlu.';
  let h = `<h3>${ls.ic} ${esc(ls.t)}</h3>`;
  h += `<div class="mut">${esc(ls.mapel)}</div>`;
  h += `<h4 class="rdh">Hasil: ${got}/${tot} benar (${pct}%)</h4>`;
  h += `<p class="rd">${esc(msg)}</p><div class="ch">`;
  h += `<button class="p" onclick="studyQuiz('${id}',0)">Ulangi latihan</button>`;
  h += `<button onclick="studyRead('${id}')">Baca materi lagi</button>`;
  h += '<button onclick="openStudy()">← Daftar buku</button></div>';
  stModal(h);
}
