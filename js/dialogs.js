// Siram tanaman, ngobrol NPC, jurnal, mood, tombol darurat
function water(i) {
  if (S.pl[i]) return;
  S.pl[i] = 1;
  prog('water');
  questProg('water', 1);
  const bonus = eventBonus('water');
  if (bonus > 1) toast('🌾 Festival Panen: friendship +2x!');
}
function talk(i) {
  const n = NPC[i];
  const fp = getFriendship(i);
  const title = getFriendTitle(i);
  modal(
    `<h3>${n.e} ${n.n} ${title.icon}</h3><p>"${n.q}"</p><div class="mut">Bagaimana kamu menanggapi?</div><div class="ch">${n.r.map((t, j) => `<button onclick="reply(${i},${j})">${t}</button>`).join('')}</div>`,
  );
}
function reply(i, j) {
  const n = NPC[i],
    ok = j == 0;
  modal(
    `<h3>${n.e} ${n.n}</h3><p>${ok ? '"Makasih ya, rasanya lega sudah didengar. 💜"' : '"Hmm... oke deh."'}</p><div class="mut">${ok ? 'Tanggapan suportif! Komunikasi yang hangat membantu meredakan beban.' : 'Coba tanggapan yang lebih empatik lain kali.'}</div><div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
  prog('talk');
  if (ok) prog('help');
  addFriendship(i, ok ? 5 : 2);
  questProg('talk', 1);
  if (ok) questProg('help', 1);
}
function journal() {
  const l = (S.jr[0] || {}).t;
  modal(
    `<h3>☕ Jurnal perasaan</h3><p class="mut">Tulis apa pun. Tersimpan hanya di perangkatmu.</p><textarea id="jt" rows="4" style="width:100%" maxlength="500" placeholder="Hari ini aku merasa..."></textarea>${l ? `<p class="mut">Terakhir: ${esc(l.slice(0, 80))}</p>` : ''}<div class="ch"><button class="p" onclick="const t=$('#jt').value.trim();if(t){S.jr.unshift({d:today(),t});S.jr=S.jr.slice(0,5);save();questProg('journal',1);toast('Jurnal tersimpan')}closeM()">Simpan</button><button onclick="closeM()">Batal</button></div>`,
  );
}
$('#mb').onclick = () =>
  modal(
    `<h3>Check-in mood</h3><p>Apa yang kamu rasakan hari ini?</p><div class="ch" style="flex-direction:row;justify-content:space-around;font-size:30px">${['😞', '😕', '😐', '🙂', '😄'].map((e, i) => `<button onclick="mood(${i})">${e}</button>`).join('')}</div>`,
  );
function mood(i) {
  modal(
    `<h3>Terima kasih sudah berbagi</h3><p>${i < 2 ? 'Hari yang berat ya. Kamu tidak sendirian. Ngobrol dengan teman di dunia, atau konsultasi dengan profesional bila perlu.' : 'Senang mendengarnya. Jaga ritme istirahatmu ya.'}</p><div class="ch"><button class="p" onclick="closeM()">Tutup</button>${i < 2 ? '<button class="g" onclick="closeM();setT(\'k\')">Lihat konsultasi</button>' : ''}</div>`,
  );
  prog('mood');
  questProg('mood', 1);
  if (i < 2) {
    setTimeout(() => showMoodCheck(), 30000);
  }
}
function sos() {
  modal(
    `<h3>🆘 Bantuan segera</h3><p>Jika kamu ingin menyakiti diri atau dalam bahaya, hubungi bantuan sekarang. Ini gratis dan tanpa kupon.</p><p><b>Layanan Sejiwa (Kemenkes): 119 ext. 8</b><br>Atau datang ke IGD rumah sakit terdekat, dan hubungi orang tepercaya di sekitarmu.</p><div class="mut">Nomor placeholder: verifikasi sebelum rilis.</div><div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}
