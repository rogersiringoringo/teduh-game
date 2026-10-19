# Teduh 🌿

Game sosial santai (gaya cozy, mirip Heartopia) untuk melepas penat dan ngobrol, dengan **pencegahan kecanduan** dan **jalur ke bantuan profesional**. Ini prototipe yang berjalan di browser tanpa build tool.

## Menjalankan di VS Code

1. Buka folder ini di VS Code (`File > Open Folder`). Pasang ekstensi yang disarankan (muncul otomatis): **Live Server**, **Prettier**.
2. Klik kanan `index.html` > **Open with Live Server** (atau klik *Go Live* di status bar). Game terbuka di `http://localhost:5500`.
   - Alternatif tanpa ekstensi: `npm run dev` lalu buka `http://localhost:5173`.
3. Debug: tekan **F5** dan pilih *Buka game di Chrome (Live Server)*.

> Buka lewat `http://localhost`, bukan klik dua kali file (`file://`), supaya multiplayer lokal bisa tersambung.

## Multiplayer lokal

```bash
npm install
npm start        # server WebSocket di ws://localhost:8787
```

Buka game di dua tab/browser, daftar dengan nama berbeda, lalu keduanya saling melihat dan bisa chat. Tanpa server, game otomatis berjalan solo. URL server bisa diganti dengan `?ws=ws://alamat:port`.

Server (`server/server.js`) hanya relay sederhana: tanpa akun, tanpa penyimpanan. Untuk produksi perlu autentikasi, moderasi, dan batas laju yang lebih ketat.

## Suara 🎵

Ada tombol 🔊 di bar atas untuk mengatur suara. Semua suara **disintesis langsung di browser** pakai Web Audio — tidak ada satu pun file audio di repo, jadi tetap jalan offline dan bebas hak cipta.

- **Suasana (ambience)**: angin, air danau, ngobrol di kafe, burung, jangkrik, dan suara hujan. Layer posisional — makin dekat dengan danau/lapangan/kafe, makin kentara. Ikut berubah mengikuti cuaca (`weather.js`) dan waktu (`time.js`): jangkrik muncul malam, hujan berbunyi saat hujan.
- **Musik**: music box pentatonik yang lembut, atau file audio favorit sendiri dari perangkatmu (file **tidak pernah** dikirim ke server).
- Preferensi disimpan di `localStorage` key `teduh2_audio` (terpisah dari progres game, sama seperti `teduh2_time`).

Catatan teknis:

- Karena aturan autoplay browser, suara baru mulai setelah klik/key pertama. Ini normal.
- Musik **dihentikan** otomatis saat parental control kena batas harian, dan **diturunkan** sebentar saat pengingat istirahat (`rest.js`).
- **Bukan** sumber hadiah harian: tidak ada streak, quest, atau token dari mendengar musik. Music box murni suasana.
- Kalau suaranya tidak keluar, cek dulu tombol 🔊 (bisa sedang dimatikan dari sesi sebelumnya), lalu pastikan volume browser tidak 0.

## Panggung musik 🎸

Ada 4 alat (gitar, ukulele, piano, drum) di depan **Kafe Cerita**. Dekati salah satu lalu tekan E untuk memutar gubahan pendek — notnya keluar sebagai bunyi dan partitur yang naik.

Panggung ini sengaja dibuat **santai**: gubahan berlangsung ~4 detik lalu berhenti sendiri. Tidak ada skor, streak, atau token dari musik — murni untuk memberi alasan berhenti dan menyapa orang lain.

Fitur ini sekaligus jadi **icebreaker sosial**: kalau ada pemain lain yang berdiri di panggung, di atas alat itu muncul tanda 👋, dan kalau kamu cukup dekat, bar aksi menampilkan **"💬 Sapa {nama}"**. Saat ini sapaan itu masih berupa sapaan singkat pembuka (belum ada kolom balas pesan — itu tahap berikutnya).

Cara customize: posisi & warna alat di `STG` (`js/world.js`), urutan nada gubahan di `STG_MEL` (`js/stage.js`).

## Struktur

```
index.html          markup + urutan pemuatan script
css/style.css       tampilan & layout responsif
js/
  core.js           konstanta, state (localStorage), toast/modal, misi
  world.js          NPC, peta, tabrakan, render latar (canvas offscreen)
  canvas.js         canvas, zoom otomatis, input
  character.js      gambar karakter, rambut, topi, pratinjau
  interact.js       objek interaktif terdekat
  fishing.js        memancing & koleksi ikan
  music.js         ambience sintetis (Web Audio) + musik pilihan pemain
  stage.js         panggung musik di kafe (main alat, ajakan sapa)
  places.js         aksi bangunan, duduk/berdiri, bar aksi
  loop.js           game loop
  dialogs.js        NPC, jurnal, mood, tombol darurat
  economy.js        top up, notice peduli, toko, kupon
  chat.js           pesan, filter, mute
  ui.js             render panel
  register.js       registrasi & verifikasi usia
  net.js            multiplayer (runtime artifact / WebSocket)
  main.js           inisialisasi
server/server.js    relay multiplayer lokal
docs/DESIGN.md      ringkasan konsep, ekonomi, anti-kecanduan
```

**Penting:** semua file adalah script klasik yang berbagi satu scope global, jadi **urutan `<script>` di `index.html` harus dipertahankan**. Kode yang berjalan saat dimuat tidak boleh memanggil fungsi dari file yang dimuat setelahnya (pakai arrow function pembungkus, seperti `ACT` di `places.js`). Kalau mau migrasi ke ES Modules/Vite, mulai dari sini.

## Mengubah isi game

| Ingin mengubah | Lokasi |
|---|---|
| Misi & hadiah token | `MIS` di `js/core.js` |
| Harga paket top up, batas kupon, harga token | `PK`, `redeem()` di `js/economy.js` |
| Pemicu notice peduli (5×, Rp500.000, malam hari) | `check()` di `js/economy.js` |
| Batas top up pengguna di bawah 18 | angka `75000` di `js/core.js` (`load`) dan `js/register.js` |
| Bangunan baru | tambah di array `B` (`js/world.js`) + aksi di `ACT` (`js/places.js`) + jalan di `PATHS` |
| Bangku, tanaman, NPC | `BEN`, `PL`, `NPC` di `js/world.js` |
| Jenis ikan & peluang | `FISH` di `js/fishing.js` |
| Item kosmetik | `COL`/`HAT` dan harganya di `js/core.js` |

Setelah menambah bangunan, pastikan pintunya terjangkau jalan. Cek cepat di console browser: `B.map(b=>[b[6],!blocked(b[0]+b[2]/2,b[1]+b[3]+10)])`.

## Yang masih simulasi / belum ada

- Akun hanya lokal di perangkat (belum ada login, email, verifikasi). Usia hanya pengakuan sendiri.
- Top up, kupon, dan booking konsultasi hanya simulasi: belum ada pembayaran maupun integrasi platform telekonsultasi.
- Nomor layanan krisis (119 ext. 8) harus diverifikasi sebelum rilis.
- Teks persetujuan hanyalah ringkasan; perlu dokumen hukum resmi sesuai UU PDP.
- Data mood/jurnal saat ini hanya di perangkat; jika dipindah ke server, pisahkan dari data game dan enkripsi.

## Langkah berikutnya yang disarankan

1. Backend akun (email/telepon + verifikasi), penyimpanan data sensitif terpisah.
2. Pembayaran sungguhan + log top up di server (pemicu notice tidak boleh bergantung pada klien).
3. Integrasi mitra telekonsultasi dan penjadwalan.
4. Moderasi chat (laporan, blokir, moderator) dan deteksi krisis di server.
5. Migrasi ke Godot/Unity atau Vite + ES Modules; aset sprite dari ilustrator.
