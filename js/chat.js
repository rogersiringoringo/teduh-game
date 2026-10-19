// Filter kata, kirim pesan, mute, daftar teman online
const badw = (t) => t.replace(/anjing|bangsat|goblok|tolol|bodoh|kontol|memek|babi/gi, '***'),
  CRISIS = /bunuh diri|mau mati|ingin mati|pengin mati|akhiri hidup|menyakiti diri/i;
async function send(t) {
  t = String(t || '')
    .trim()
    .slice(0, 80);
  if (!t) return;
  if (CRISIS.test(t)) {
    const i = $('#ci');
    if (i) i.value = '';
    sos();
    return;
  }
  if (Date.now() - lastS < 1500) return;
  const i = $('#ci');
  if (i) i.value = '';
  lastS = Date.now();
  t = badw(t);
  bub.me = { t, u: Date.now() + 5000 };
  msgs.push({ n: S.name, t });
  if (msgs.length > 50) msgs = msgs.slice(-50);
  updChat();
  if (room)
    try {
      await room.emit('chat', { n: S.name, t });
    } catch (e) {}
}
function mute(id) {
  muted.has(id) ? muted.delete(id) : muted.add(id);
  updChat();
}

// Sapaan singkat ke pemain lain (tahap 1: belum ada percakapan detail).
function talkPeer(p) {
  const r = p.presence || {},
    n = String(r.n || 'Teman').slice(0, 14);
  modal(
    '<h3>💬 ' +
      esc(n) +
      '</h3>' +
      '<div class="card" style="margin:8px 0">' +
      '<div style="font-size:30px">👋</div>' +
      '<p style="margin:6px 0"><b>' +
      esc(n) +
      '</b> melambaikan tangan. "Hai! Kamu juga pengen nyanyi?"</p></div>' +
      '<p class="mut">Belum ada kolom balas pesan di prototype ini. Sapaan singkat ini sengaja dibuat ringan, sebagai pembuka.</p>' +
      '<div class="mut" style="font-size:12px;margin-top:6px">💜 Nggak apa-apa cuma bilang "halo". Langkah kecil juga buat.</div>' +
      '<div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>',
  );
}
function updChat() {
  const o = peers.filter((p) => !p.isMe);
  $('#on').textContent = room ? '🟢 ' + (o.length + 1) + ' online' : '⚪ Solo';
  const pl = $('#pl'),
    cl = $('#cl');
  if (!pl || !cl) return;
  pl.innerHTML =
    o
      .map(
        (p) =>
          `<span class="pill" style="margin:2px;display:inline-block">${esc(String((p.presence || {}).n || 'Teman').slice(0, 14))} <a href="#" onclick="mute(${JSON.stringify(p.peer)});return false">${muted.has(p.peer) ? '🔊' : '🔇'}</a></span>`,
      )
      .join('') ||
    '<span class="mut">' +
      (room
        ? 'Belum ada teman lain online. Bagikan halaman ini ke temanmu (akses Contributor).'
        : 'Mode solo: multiplayer aktif untuk anggota yang dibagi akses ke halaman ini.') +
      '</span>';
  cl.innerHTML = msgs
    .slice(-20)
    .map((l) => `<div><b>${esc(l.n)}</b>: ${esc(l.t)}</div>`)
    .join('');
  cl.scrollTop = 1e9;
}
