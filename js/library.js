// Perpustakaan Teduh: koleksi Cerita Rakyat & Novel, reader bercabang dengan progres tersimpan.
// Dipakai dari js/places.js (ACT.lib) dan js/moodcheck.js. Hanya dibuka dari bangunan Perpustakaan.
// Rak ini BUKAN buku pelajaran Ruang Belajar di dalam rumah (lihat js/study.js).
const LIB_GENRES = ['Cerita Rakyat', 'Novel'];
const STORIES = [
  {
    id: 'malin',
    t: 'Malin Kundang',
    a: 'Rangelog',
    g: 'Anak yang pulang dari laut',
    gn: 'Cerita Rakyat',
    ic: '📦',
    d: 'Pemuda yang kembali, dan ibunya yang belum siap mengakuinya.',
    n: [
      {
        h: 'Bab 1 — Perahu dari kejauhan',
        p: [
          'Nelayan itu sudah melihat perahu itu sejak pagi. Baru ketika perahu turun ke pasir, ia mengakuinya ada. Catnya sudah pudar. Orang-orang desa datang satu per satu, seperti sudah menunggu lama.',
          'Pemuda itu turun lebih dulu. Ia membungkuk pada siapa saja yang menyapa, lalu langsung mencari wajah yang paling tua di antara mereka.',
        ],
        o: [
          { x: 'Tanya, siapa pemuda itu', to: 1 },
          { x: 'Duduk dekat ibunya tanpa bertanya', to: 2 },
        ],
      },
      {
        h: 'Bab 2 — Nama yang diucapkan duluan',
        p: [
          'Namanya Malin Kundang. Ia mengatakannya sebelum pertanyaannya selesai, dan cukup keras sampai orang-orang menoleh.',
          'Ibunya, Inem, tidak bergerak. Sendok di tangannya berhenti mengaduk. Sepuluh tahun ia menghidupi lima anak tanpa menyebut nama yang satu ini.',
        ],
        o: [
          { x: 'Bilangnya terang, "Ibu, aku anak Ibu"', to: 3 },
          { x: 'Minta ibunya datang lebih dekat dulu', to: 4 },
        ],
      },
      {
        h: 'Bab 3 — Jarak yang tidak bertambah pendek',
        p: [
          'Malin melihat ibunya dari jauh, dan ibunya melihat dia. Jarak di antara keduanya tidak bertambah pendek.',
          'Orang-orang mulai berbisik bahwa ibu yang tidak mengakui anak adalah ibu yang mengutuk. Kalau Inem mengingkar, laut akan mengambilnya kembali. Kalau ia mengakui, tidak ada yang tahu apa yang terjadi.',
        ],
        o: [
          { x: 'Tunggu ibunya yang menyapa', to: 5 },
          { x: 'Tanya langsung, "Apakah Ibu akui aku?"', to: 4 },
        ],
      },
      {
        h: 'Akhir — Diakui',
        e: 'Inem akhirnya bergerak. Ia membuka tangannya, dan Malin jatuh ke pelukannya sambil menangis tanpa suara. Orang-orang bersorak, karena hal yang sudah lama ditunggu-tunggu itu terjadi. Laut tidak mengambil apa pun hari itu.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Pengingkaran',
        e: 'Inem menggeleng pelan. Ia menyangka semua orang di pantai itu sedang menghinanya, lalu meminta mereka pergi. Malin naik ke perahu tanpa menoleh. Sejak hari itu orang bilang laut yang mengambilnya.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Yang menjawab',
        e: 'Perahu itu belum jauh ketika Inem memanggilnya. Namanya saja, tapi kali ini ia menjawab, lalu turun lagi ke pasir. Ia memilih menetap, dengan tahu bahwa setiap ombak besar akan tetap menariknya ke laut.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
    ],
  },
  {
    id: 'timun',
    t: 'Timun Emas',
    a: 'Tembang',
    g: 'Rejeki yang tak pernah cukup',
    gn: 'Cerita Rakyat',
    ic: '🌱',
    d: 'Dua orang dan sebiji timun yang tidak mau berhenti berbuah.',
    n: [
      {
        h: 'Bab 1 — Biji di belakang rumah',
        p: [
          'Lama bekerja di sawah orang lain, ia hanya punya satu anak laki-laki. Suatu sore, si anak menemukan sebuah biji sebesar kepalan tangan di belakang rumah.',
          'Biji itu tidak ada di tempat lain. Ia membawanya masuk lalu bertanya. Ibunya tidak tahu, tapi tetap menanamnya.',
        ],
        o: [
          { x: 'Tunggu, lihat apa yang tumbuh', to: 1 },
          { x: 'Bawa bijinya ke pasar, jual saja', to: 2 },
        ],
      },
      {
        h: 'Bab 2 — Panen yang tidak masuk akal',
        p: [
          'Yang tumbuh bukan timun biasa. Buahnya besar. Ketika dibelah, di dalamnya ada biji-bijinya yang berkilau seperti emas.',
          'Satu buah saja, ketika dijual, sudah cukup untuk menutup kebutuhan setahun. Lalu ibunya menanam lagi, agar panennya tidak habis.',
        ],
        o: [
          { x: 'Jual semua hasil panen sekaligus', to: 3 },
          { x: 'Simpan sebagian, pakai sendiri', to: 4 },
        ],
      },
      {
        h: 'Bab 3 — Timun di ujung rak',
        p: [
          'Panen kedua datang lebih besar dari yang pertama. Kabarnya sampai ke kota tanpa sengaja, dan ada yang mengintip dari balik pagar.',
          'Malam itu ibunya mengunci timun terakhir di lemari kayu, dan berkata supaya tidak ada yang melihat.',
        ],
        o: [
          { x: 'Tetap simpan, jangan jual lagi', to: 5 },
          { x: 'Buka lemari, jual yang terakhir', to: 4 },
        ],
      },
      {
        h: 'Akhir — Secukupnya',
        e: 'Ibu dan anak itu berhenti menanam setelah dua kali panen. Simpanannya cukup untuk beberapa tahun, dan tidak cukup untuk membuat siapa pun rakus. Mereka tetap tinggal di rumah yang sama. Hanya atapnya tidak bocor lagi.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Timun yang layu',
        e: 'Tanaman itu berhenti berbuah pada musim ketiga. Bijinya keropos, dan tidak ada yang mau membeli tanaman layu itu. Yang tersisa cuma satu biji biasa. Si anak menanamnya lagi sambil berharap, tapi panen berikutnya tidak pernah datang.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Yang terakhir dijual',
        e: 'Timun terakhir itu laku dalam sehari. Uangnya banyak, dan habis dalam dua bulan. Sang ibu menyesal bukan karena harganya murah, tapi karena ia mengira satu buah sudah cukup untuk setahun.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
    ],
  },
  {
    id: 'keong',
    t: 'Keong Emas',
    a: 'Ngesot',
    g: 'Keserakahan yang berawal dari hujan',
    gn: 'Cerita Rakyat',
    ic: '🐚',
    d: 'Keong kecil di tepi sungai, dan hujan yang turun ke halaman rumah.',
    n: [
      {
        h: 'Bab 1 — Tepi sungai',
        p: [
          'Hujan turun sejak sore dan tidak berhenti. Seorang janda sedang mencari kayu di tepi sungai. Langkahnya licin, dan ia hampir jatuh dua kali.',
          'Di bawah batu ada seekor keong kecil yang warnanya seperti kuningan. Jarang ada yang melihatnya, dan keong itu tahu itu.',
        ],
        o: [
          { x: 'Angkat keong itu, simpan di wadah', to: 1 },
          { x: 'Biarkan saja, nanti hujan reda', to: 2 },
        ],
      },
      {
        h: 'Bab 2 — Keong di dalam stoples',
        p: [
          'Malamnya, ketika ia meletakkan keong itu di stoples, hujan reda. Pagi harinya, ada tumpukan emas di halaman rumah.',
          'Tumpukan itu datang lagi setiap kali keong itu bernyanyi. Setelah tiga kali, ia sudah hafal aturannya.',
        ],
        o: [
          { x: 'Terima semua yang datang, simpan semua', to: 3 },
          { x: 'Pakai seperlunya, jangan berlebihan', to: 4 },
        ],
      },
      {
        h: 'Bab 3 — Keajaiban yang kelabu',
        p: [
          'Suatu sore ada kabar dari istana. Raja ingin melihat keong itu.',
          'Janda itu tidak bisa menolak. Ia membawa keong itu ke istana, dan tidak pernah memikirkannya sampai iam...',
        ],
        o: [
          { x: 'Biarkan istana yang punya keong', to: 5 },
          { x: 'Tutup stoplesnya rapat-rapat', to: 4 },
        ],
      },
      {
        h: 'Akhir — Milik istana',
        e: 'Keong itu dibawa masuk ke istana, dan tidak keluar lagi. Hujan tidak turun setelah itu. Elang itu di dalam istana tetap elang, dan yang kehilangan hujan adalah halaman rumah.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Stoplesnya kosong',
        e: 'Keong itu keluar sendiri di malam hari, dan tidak pernah kembali. Tumpukan emas habis, dan hujan juga tidak turun selama tiga bulan. Janda itu masih hidup, tapi tidak pernah lagi memasang stoples di jendela.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Yang tetap tinggal',
        e: 'Janda itu menolak semua yang berlebihan dari istana. Ia membawa pulang satu hal sederhana: hak untuk tetap tinggal di rumah yang sama, dan hak tidur nyenyak tanpa menghitung emas.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
    ],
  },
  {
    id: 'kuda',
    t: 'Kuda Lumping',
    a: 'Malingati',
    g: 'Rezeki yang berutang',
    gn: 'Cerita Rakyat',
    ic: '🐴',
    d: 'Kuda tanpa nama di belakang rumah, dan tagihan yang belum tertulis.',
    n: [
      {
        h: 'Bab 1 — Kuda yang merumput',
        p: [
          'Seorang janda sudah lima tahun tinggal sendirian di tepi sawah. Suatu pagi ia menemukan seekor kuda yang merumput di belakang rumah.',
          'Kuda itu tidak punya nama, dan tidak pernah mau pergi.',
        ],
        o: [
          { x: 'Bawa masuk, beri makan', to: 1 },
          { x: 'Biarkan di luar, seperti biasa', to: 2 },
        ],
      },
      {
        h: 'Bab 2 — Papan yang penuh',
        p: [
          'Malam pertama, kuda itu bernyanyi panjang. Pagi harinya, di depan pintu ada papan bertabur emas, bertumpuk tinggi.',
          'Janda itu menyimpannya di tempat tersembunyi, tapi tetap tidak pernah berhenti menunggu malam berikutnya.',
        ],
        o: [
          { x: 'Simpan semua, jangan pernah dipakai', to: 3 },
          { x: 'Pakai sedikit untuk kebutuhan', to: 4 },
        ],
      },
      {
        h: 'Bab 3 — Yang menagih',
        p: [
          'Janda itu sudah bertambah tua. Suatu malam kuda itu menyentuhnya, dan ia merasa seluruh tenaganya hilang.',
          'Salah satu anak di desa itu mendengar nyanyian itu, dan tidak bisa tidur lagi.',
        ],
        o: [
          { x: 'Biarkan anak itu datang mencari', to: 4 },
          { x: 'Tutup pintu, jangan buka untuk siapa pun', to: 5 },
        ],
      },
      {
        h: 'Akhir — Tidak pernah dipakai',
        e: 'Papan itu tidak pernah keluar dari tempat tersembunyi. Janda itu menolak semua tawaran. Ia hidup sampai akhir, dan tidak pernah menyesal.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Yang ditagih',
        e: 'Kuda itu menagih dengan kepalanya sendiri. Anak itu terbawa ke rimba, dan janda itu tidak pernah melihatnya lagi.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Pintu yang ditutup',
        e: 'Janda itu menutup pintunya setiap malam, apa pun yang terjadi di luar. Anak itu berhenti datang, dan tidak pernah tahu alasan ibunya menutup pintu.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
    ],
  },
  {
    id: 'ujung',
    t: 'Rumah di Ujung Jalan',
    a: 'Putri',
    g: 'Kamar tiga kali tiga',
    gn: 'Novel',
    ic: '🏚️',
    d: 'Sebuah kamar sewa, satu jendela, dan surat yang datang di bulan kelima.',
    n: [
      {
        h: 'Bab 1 — Sewa bulanan',
        p: [
          'Putri menyewa kamar ukuran tiga kali tiga di ujung Jalan Melati. Lima belas ribu sebulan, dan uang itu harus dibagi tiga.',
          'Kamar itu punya satu jendela yang menghadap gang. Setiap malam lampu tetangga di seberang menyala sekitar pukul sembilan, dan tidak pernah padam.',
        ],
        o: [
          { x: 'Buka jendela, menyapa tetangga', to: 1 },
          { x: 'Tutup tirai, biar bisa tidur', to: 2 },
        ],
      },
      {
        h: 'Bab 2 — Bu Tini',
        p: [
          'Bu Tini, pemilik rumah itu, selalu muncul tepat ketika biaya bulanan sudah lewat tiga hari. Ia selalu punya alasan baru, dan tidak pernah lupa menagih ulang.',
          'Putri selalu membayar. Tapi ada satu bulan ia tidak punya apa-apa sama sekali.',
        ],
        o: [
          { x: 'Bayar saja, jangan banyak bicara', to: 3 },
          { x: 'Minta waktu, dan jelaskan keadaan', to: 4 },
        ],
      },
      {
        h: 'Bab 3 — Surat dari rumah',
        p: [
          'Pada bulan kelima, ada surat datang. Namanya masih sama seperti yang tertera di akta lahir, dan alamatnya masih yang lama.',
          'Putri membacanya dua kali, lalu melipat dan menyimpannya di dalam buku.',
        ],
        o: [
          { x: 'Tulis surat balasan', to: 3 },
          { x: 'Biarkan, belum ada yang bisa dijelaskan', to: 4 },
          { x: 'Buka pintu, mau kembali ke sana', to: 5 },
        ],
      },
      {
        h: 'Akhir — Yang dibalas',
        e: 'Putri menulis surat selama dua halaman, dan tidak menghapus satu kalimat pun. Jawabannya datang bulan berikutnya, dan hanya satu baris: ia tetap di sana sampai selesai.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Yang tidak dibalas',
        e: 'Surat itu masuk ke laci, lalu hilang bersama laci ketika ia pindah. Putri tidak mencari tahu, karena ada hal lain yang lebih penting: uang bulanan, pekerjaan, dan tidur cukup.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Yang kembali',
        e: 'Putri menutup pintu kamarnya dan turun ke bawah, ke bagian toko yang biasanya kosong. Ia menginap dulu dua malam, lalu menyewa kamar ukuran tiga kali tiga di ujung Jalan Melati.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
    ],
  },
  {
    id: 'halte',
    t: 'Sepuluh Menit di Halte',
    a: 'Damar',
    g: 'Kereta terakhir',
    gn: 'Novel',
    ic: '⏱️',
    d: 'Kereta pukul sembilan malam, dan sepuluh menit yang terasa tidak jalan.',
    n: [
      {
        h: 'Bab 1 — Kereta terakhir',
        p: [
          'Kereta terakhir dari arah itu datang dua kali sehari. Yang kedua berangkat pukul sembilan malam. Mereka yang biasanya sudah hafal jadwalnya tanpa perlu melihat papan.',
          'Damar sudah berdiri di Halte Empat sejak pukul setengah sembilan. Jadwal di tangannya sudah hafal, tapi tetap ia lihat setiap beberapa menit.',
        ],
        o: [
          { x: 'Bicara dengan perempuan di sampingan itu', to: 1 },
          { x: 'Diam, benar-benar diam saja', to: 2 },
        ],
      },
      {
        h: 'Bab 2 — Sepuluh menit',
        p: [
          'Perempuan itu punya satu kantong plastik besar. Isinya berwarna-warni, dan sesekali terdengar beradu pelan di dalamnya.',
          'Damar menebak boneka, lalu membetulkan dirinya sendiri dua kali. Sepuluh menit berlalu tanpa terasa.',
        ],
        o: [
          { x: 'Tawarkan membantu membawa tasnya', to: 3 },
          { x: 'Tetap diam di tempat sendiri', to: 4 },
        ],
      },
      {
        h: 'Bab 3 — Ponsel yang berbunyi',
        p: [
          'Keretanya datang, dan naik dengan tenang.',
          'Ponsel Damar berbunyi dua kali. Di layar hanya ada satu kata dari seseorang yang namanya sudah tidak ia ingat: "masuk".',
        ],
        o: [
          { x: 'Angkat, dan kembali ke halte', to: 5 },
          { x: 'Balas satu kalimat, lalu naik', to: 3 },
        ],
      },
      {
        h: 'Akhir — Satu kalimat',
        e: 'Yang ia tulis hanya satu baris: "Aku baik-baik saja. Besok kita bicara." Jawabannya hanya satu kata, dan itu sudah cukup.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Yang duduk dekat',
        e: 'Perempuan itu duduk di gerbong paling belakang, dengan kantong plastik di atas pangkuan. Damar duduk tiga baris di depannya, dan keduanya tidak bicara. Sepuluh menit itu tetap berjalan, dan keduanya tetap di dekat orang yang sama.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
      {
        h: 'Akhir — Yang kembali ke halte',
        e: 'Damar turun lagi di Halte Empat, dan berdiri di tempat yang sama. Kereta berikutnya datang empat puluh menit kemudian. Ponselnya tidak berbunyi lagi, dan ia memberitahu dirinya sendiri bahwa itu bagus.',
        o: [{ x: 'Kembali ke rak', to: -1 }],
      },
    ],
  },
];

// ---- State ----
const libFin = (st) => st.n.reduce((a, n) => a + (n.e ? 1 : 0), 0);
function libRec(id) {
  S.br[id] = S.br[id] || { p: 0, f: 0, e: [], s: 0 };
  if (!Array.isArray(S.br[id].e)) S.br[id].e = [];
  return S.br[id];
}
function libModal(h) {
  modal(h);
  $('#mo').classList.add('rd');
  $('#md').scrollTop = 0;
}
function libBar(st) {
  const b = S.br[st.id] || {};
  const pct = Math.min(100, Math.round(((b.f | 0) / Math.max(1, st.n.length - 1)) * 100));
  return `<div class="bar"><i style="width:${pct}%"></i></div>`;
}

// ---- Rak: daftar cerita, dikelompokkan per genre ----
function openLib() {
  let h =
    '<h3>📚 Perpustakaan Teduh</h3>' +
    '<p class="mut">Koleksi Cerita Rakyat &amp; Novel. Halaman yang kamu baca otomatis tersimpan.</p>';
  for (const gn of LIB_GENRES) {
    const list = STORIES.filter((s) => s.gn === gn);
    if (!list.length) continue;
    h += `<h4 class="rdh">${esc(gn)}</h4>`;
    for (const st of list) {
      const b = S.br[st.id] || {};
      const got = (b.e || []).length;
      const pct = Math.min(100, Math.round(((b.f | 0) / Math.max(1, st.n.length - 1)) * 100));
      h += `<div class="card"><div class="row"><b>${st.ic} ${esc(st.t)}</b><span class="mut">${esc(st.g)}</span></div>`;
      h += `<div class="mut" style="margin:4px 0 2px">${esc(st.d)}</div>`;
      h += libBar(st);
      h += `<div class="row" style="margin-top:8px"><span class="mut">${esc(st.a)} · ${got}/${libFin(st)} akhir · ${pct}%</span>`;
      h += `<button class="p" onclick="pick('${st.id}')">${b.s ? 'Lanjut' : 'Baca'}</button></div></div>`;
    }
  }
  h +=
    '<div class="ch"><button onclick="quote()">📝 Catatan di rak</button><button onclick="closeM()">Tutup</button></div>';
  libModal(h);
}

// ---- Reader ----
function pick(id, to) {
  if (to == null) return libOpen(id);
  if (to < 0) return openLib();
  libOpen(id, to);
}
function libOpen(id, idx) {
  const st = STORIES.find((s) => s.id == id);
  if (!st) return openLib();
  const b = libRec(id);
  if (idx == null) idx = Math.min(b.p | 0, st.n.length - 1);
  b.p = idx;
  b.s = 1;
  if (idx > (b.f | 0)) b.f = idx;
  save();
  const nd = st.n[idx],
    fin = !!nd.e;
  let h = `<h3>${st.ic} ${esc(st.t)}</h3>`;
  h += `<div class="mut">${esc(st.gn)} · ${esc(st.a)} · ${esc(st.g)} · ${(b.e || []).length}/${libFin(st)} akhir ditemukan</div>`;
  h += libBar(st);
  if (fin) {
    h += `<h4 class="rdh">✦ ${esc(nd.h)}</h4><p class="rd end">${esc(nd.e)}</p>`;
  } else {
    h += `<h4 class="rdh">${esc(nd.h)}</h4>`;
    for (const p of nd.p) h += `<p class="rd">${esc(p)}</p>`;
  }
  h += '<div class="ch">';
  for (const o of nd.o) h += `<button class="opt" onclick="pick('${st.id}',${o.to})">${esc(o.x)}</button>`;
  h +=
    '</div><div class="ch"><button class="p" onclick="openLib()">← Kembali ke rak</button>' +
    (b.e.length >= libFin(st) ? `<button onclick="pick('${st.id}',0)">↺ Baca dari awal</button>` : '') +
    '<button onclick="closeM()">Tutup</button></div>';
  libModal(h);
  if (fin) libEnd(b, idx);
}
function libEnd(b, idx) {
  prog('read');
  if (!b.e.includes(idx)) {
    b.e.push(idx);
    S.coins += 5;
    save();
    toast('Akhir baru ditemukan! +5 koin');
  }
}
