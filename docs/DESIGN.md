# Teduh: ringkasan desain

## Konsep
Dunia virtual santai untuk orang dengan tekanan sosial/stres: melepas pikiran, menyalurkan emosi lewat komunikasi, dan mengembangkan karakter. Monetisasi lewat top up koin, dengan rem kecanduan dan jalur ke profesional.

## Alur
- **Alur game:** masuk dunia, check-in mood, ngobrol, kerjakan misi, dapat token, tukar token menjadi kupon konsultasi.
- **Pencegahan kecanduan:** top up koin, dicek otomatis, notice peduli (tanpa blokir), pengguna memilih mau dibantu profesional atau lanjut main.
- **Bantuan profesional:** konsultasi lewat chat atau video call.
- **Jalur darurat:** tombol bantuan selalu terlihat dan deteksi kata krisis; tanpa kupon/biaya.

## Misi (maks. 65 token/hari)
Check-in mood 10, ngobrol 2 teman 15, siram 3 tanaman 10, 2 tanggapan suportif 20, baca 1 cerita 10 (+5 koin per misi).

## Perpustakaan
Koleksi sastra: 4 Cerita Rakyat + 2 Novel, masing-masing bercabang (6 karya × 3 akhir), hanya bisa dibuka dengan datang ke bangunan Perpustakaan.
Rak dikelompokkan per genre (Cerita Rakyat / Novel). Isi rak ini berbeda dari buku pelajaran di Ruang Belajar rumah.
Progress tersimpan permanen (bukan reset harian). Menutupi satu akhir = misi harian selesai (+10 token).
Menemukan akhir yang belum pernah dibaca = +5 koin sekali saja per akhir (total 18 slot bonus).
Catatan acak di rak (fitur awal) tetap tersedia lewat tombol di dalam perpustakaan.

## Ruang Belajar (buku pelajaran di rumah)
6 mapel (Matematika, Bahasa Indonesia, IPAS, PJOK, Agama, Informatika), masing-masing 4 soal latihan.
Tiap mapel punya materi ringkas, rumus singkat, contoh, lalu latihan soal pilihan ganda dengan pembahasan.
Progress tersimpan permanen di `S.st` dan tidak mereset harian. Tidak memberi token maupun koin.

## Rumah
Pemain bisa masuk ke dalam rumahnya (scene flag `IN`), dan hanya bisa keluar lewat pintu di dalam ruangan.
Isi tiap ruangan:

| Ruangan | Isi | Aksi |
|---|---|---|
| 🛋️ Ruang Tamu | sofa, lemari dekorasi | dekorasi · keluar |
| 🍳 Dapur | kompor, dispenser, meja makan | masak · minum air |
| 🚿 Kamar Mandi | wastafel, toilet, bak mandi | cuci muka · berendam |
| 📚 Ruang Belajar | meja tulis, kursi baca | jurnal · belajar (buku pelajaran) |
| 🛏️ Kamar Tidur | tempat tidur, lemari | tidur sampai pagi (waktu → Pagi, reset timer istirahat) |
| 🪴 Ruang Pribadi | kursi, matras | tulis tanpa disimpan · napas 4-7-8 |

Pintu antar-ruang membentuk lingkaran tertutup (6 celah) sehingga semua ruangan saling terjangkau.
Denah 1180×720, 3 kolom × 2 baris, tiap ruangan 354×324 dengan warna lantai sendiri.
8 dekorasi yang dibeli tampil di slot tetap di dalam ruangan, dibagi per ruangan. Lampu menyala glow saat Sore/Malam.
Nama ruangan tampil sebagai pill di atas bar aksi. Aksi di dalam rumah tidak memberi token (hanya misi & kupon yang memberi token).
Rumah bersifat pribadi: NPC dan pemain lain tidak ikut masuk, dan posisi tidak disiarkan selama di dalam.

## Ekonomi
- Top up: Rp15.000 = 100 koin, Rp75.000 = 550, Rp150.000 = 1.200.
- Kupon: chat 15 menit = 300 token, video 30 menit = 600 token, maks. 2 kupon/bulan.
- Token tidak bisa dibeli dengan uang.
- Memancing: koin saja, maks. 30 koin/hari, tanpa token.

## Anti-kecanduan
| Tingkat | Pemicu | Tindakan |
|---|---|---|
| Ringan | top up ke-3 / 30 hari | pengingat lembut |
| Notice peduli | top up ke-5, atau total > Rp500.000, atau 3× top up pukul 00.00-05.00 | pesan tanpa blokir + opsi profesional (potongan 50%) |
| Kontrol diri | kapan saja | batas top up bulanan atur sendiri |
| Ulang | setelah memilih respons | maks. 1× per 30 hari |

Pengguna 13-17 tahun: butuh izin orang tua, batas top up dikunci Rp75.000/bulan. Di bawah 13 tahun: tidak bisa mendaftar.

## Kepatuhan
UU PDP (data sensitif dipisah), moderasi komunitas, verifikasi usia, profesional berizin (mis. HIMPSI), disclaimer bukan layanan medis.

Dokumen lengkap (GDD, ekonomi, MVP, flowchart revisi) ada di dokumen konsep terpisah.
