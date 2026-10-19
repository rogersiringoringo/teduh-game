// Render panel (Misi/Toko/Konsul/Obrolan/Bantuan)
function ui() {
  $('#co').textContent = '🪙 ' + S.coins;
  $('#tk').textContent = '🎟 ' + S.tokens;
  const p = $('#pn');
  let h = '';
  if (tab == 'm')
    h =
      MIS.map((m) => {
        const v = Math.min(S.m[m.id] || 0, m.n);
        return `<div class="card"><div class="row"><b>${S.d[m.id] ? '✅ ' : ''}${m.t}</b><span class="mut">+${m.k} token</span></div><div class="bar"><i style="width:${(v / m.n) * 100}%"></i></div></div>`;
      }).join('') +
      '<div class="mut">Misi di-reset tiap hari. Maks. 55 token/hari.</div>' +
      renderQuests() +
      renderFriendshipUI() +
      KOL();
  if (tab == 's') {
    h =
      '<div class="card"><b>Top up koin</b> <span class="mut">(simulasi) · bulan ini: ' +
      cnt() +
      '×</span><div class="row" style="margin-top:8px;flex-wrap:wrap;justify-content:flex-start">' +
      PK.map(
        (k, i) =>
          `<button class="p" onclick="topup(${i})">${k[0]} koin · Rp${k[1].toLocaleString('id')}</button>`,
      ).join('') +
      '</div><div class="row" style="margin-top:8px"><span class="mut">Batas top up bulanan ' +
      (S.minor ? '(dikunci, usia &lt;18)' : '(atur sendiri)') +
      '</span><select ' +
      (S.minor ? 'disabled ' : '') +
      'onchange="S.lim=+this.value;save()">' +
      [
        [0, 'Tanpa batas'],
        [75000, 'Rp75.000'],
        [150000, 'Rp150.000'],
        [300000, 'Rp300.000'],
      ]
        .map((o) => `<option value="${o[0]}" ${S.lim == o[0] ? 'selected' : ''}>${o[1]}</option>`)
        .join('') +
      '</select></div></div>';
    h +=
      APP() +
      '<div class="card"><b>Warna baju</b><div class="row" style="margin-top:6px;justify-content:flex-start;flex-wrap:wrap">' +
      COL.map(
        (x, i) =>
          `<button onclick="buy('c',${i})" style="border-left:14px solid ${x};${S.col == i ? 'outline:2px solid var(--pri)' : ''}">${S.own.includes('c' + i) ? 'Pakai' : CC[i] + ' 🪙'}</button>`,
      ).join('') +
      '</div></div><div class="card"><b>Topi</b><div class="row" style="margin-top:6px;justify-content:flex-start;flex-wrap:wrap">' +
      HAT.map(
        (x, i) =>
          `<button onclick="buy('h',${i})" style="${S.hat == i ? 'outline:2px solid var(--pri)' : ''}">${x || 'Polos'} ${S.own.includes('h' + i) ? '' : HC[i] + ' 🪙'}</button>`,
      ).join('') +
      '</div></div>';
  }
  if (tab == 'k')
    h =
      `<div class="card"><b>Tukar token → kupon</b><div class="mut">Token tidak bisa dibeli dengan uang. Batas 2 kupon/bulan (terpakai ${rd()}).</div><div class="row" style="margin-top:8px"><button onclick="redeem('chat')">Chat 15 mnt · 300 🎟</button><button onclick="redeem('video')">Video 30 mnt · 600 🎟</button></div></div><div class="card"><b>Kupon kamu</b><div class="row" style="margin-top:8px"><span>💬 Chat × ${S.cp.chat}</span><button class="g" ${S.cp.chat ? '' : 'disabled'} onclick="book('chat')">Pakai</button></div><div class="row" style="margin-top:6px"><span>📹 Video × ${S.cp.video}</span><button class="g" ${S.cp.video ? '' : 'disabled'} onclick="book('video')">Pakai</button></div></div>` +
      (S.disc
        ? `<div class="card"><b>Potongan 50% aktif</b><div class="mut">Dari notice peduli. Pesan sesi tanpa kupon:</div><div class="row" style="margin-top:8px"><button class="g" onclick="book2('chat')">Chat (diskon)</button><button class="g" onclick="book2('video')">Video (diskon)</button></div></div>`
        : '');
  if (tab == 'c')
    h = `<div class="card"><b>Teman online</b><div id="pl" style="margin-top:4px"></div></div><div class="card"><div id="cl" style="height:110px;overflow:auto;font-size:13px"></div><div class="row" style="margin-top:6px"><input id="ci" maxlength="80" style="flex:1" placeholder="Tulis pesan hangat..." onkeydown="if(event.key==='Enter')send(this.value)"><button class="p" onclick="send($('#ci').value)">Kirim</button></div><div class="row" style="margin-top:6px;flex-wrap:wrap;justify-content:flex-start">${['Semangat ya! 💪', 'Aku dengerin kok 💜', 'Mau ngobrol?'].map((t) => `<button onclick="send('${t}')">${t}</button>`).join('')}</div></div><div class="card row"><span class="mut">Namamu</span><input value="${esc(S.name)}" maxlength="14" onchange="setName(this.value)"></div><div class="mut">Pesan difilter, bisa di-mute per orang, dan kata kunci krisis memunculkan kartu bantuan.</div>`;
  if (tab == 'b')
    h =
      '<div class="card"><b>Akun</b><div class="mut">' +
      esc(S.name) +
      ' · ' +
      (S.minor ? 'di bawah 18 tahun (batas top up Rp75.000)' : '18 tahun ke atas') +
      '</div><div class="mut">Akun tersimpan di perangkat ini (prototipe, belum ada login lintas perangkat).</div></div>' +
      (S.minor
        ? '<div class="card"><b>🛡️ Parental Controls</b><div class="mut">Pengaturan untuk orang tua/wali</div><div class="row" style="margin-top:8px"><button onclick="openParentalSettings()">Pengaturan</button><div class="mut">Waktu main hari ini: ' +
          getParentalSettings().todayPlayTime +
          ' menit</div></div></div>'
        : '') +
      '<div class="card"><b>Mode demo</b><div class="mut">Untuk mencoba alur tanpa menunggu berhari-hari.</div><div class="row" style="margin-top:8px;flex-wrap:wrap;justify-content:flex-start"><button onclick="S.tokens+=300;save();ui()">+300 token</button><button onclick="demo5()">Simulasi 5× top up</button><button onclick="resetAsk()">Hapus akun &amp; mulai ulang</button></div></div><div class="card"><b>Tentang Teduh</b><div class="mut">Bukan pengganti layanan medis. Notice peduli tidak pernah memblokir kamu. Konsultasi oleh profesional berizin.</div></div>';
  p.innerHTML = h;
  if (tab == 's' && regStep !== 2) preview();
  if (regStep === 2) renderChar();
  updChat();
}
