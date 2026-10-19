// Multiplayer.
// Dua mode (dipilih otomatis oleh connect()):
//  1. Runtime artifact Claude: window.claude.use('room')
//  2. WebSocket: lokal `npm start` (ws://localhost:8787), produksi wss:// domain sendiri
// Jika keduanya tidak tersedia, game berjalan solo.
//
// Antarmuka "room" yang dipakai game (kedua mode mengimplementasikannya):
//   room.presence(obj)        -> kirim posisi/penampilan sendiri
//   room.emit('chat', {n,t})  -> kirim pesan
//   room.onPeers(({peers})=>) -> peers: [{peer,isMe,presence}]
//   room.on('chat', m=>)      -> m: {peer,isMe,data}
// Default: dev lokal pakai port 8787, produksi memakai wss:// di domain yang sama
// supaya host yang menyaji game sekaligus WebSocket relay tetap bisa saling terhubung.
const WS_URL =
  new URLSearchParams(location.search).get('ws') ||
  (['localhost', '127.0.0.1'].includes(location.hostname)
    ? 'ws://' + location.hostname + ':8787'
    : location.protocol === 'https:'
      ? 'wss://' + location.host
      : '');

function wsRoom(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    let id = '',
      onP = null,
      onC = () => {};
    const peersBuffer = [];
    const send = (t, d) => ws.send(JSON.stringify({ t, d }));
    const r = {
      onPeers: (f) => {
        onP = f;
        while (peersBuffer.length) onP(peersBuffer.shift());
      },
      on: (t, f) => {
        if (t === 'chat') onC = f;
      },
      emit: async (t, d) => send(t, d),
      presence: async (o) => send('presence', o),
    };
    ws.onopen = () => resolve(r);
    ws.onerror = () => reject(new Error('ws'));
    ws.onclose = () => {
      if (room === r) {
        room = null;
        peers = [];
        updChat();
      }
    };
    ws.onmessage = (e) => {
      let m;
      try {
        m = JSON.parse(e.data);
      } catch (x) {
        return;
      }
      if (m.t === 'hello') id = m.id;
      else if (m.t === 'peers') {
        const msg = {
          peers: m.peers.map((p) => ({ peer: p.peer, isMe: p.peer === id, presence: p.presence })),
        };
        if (onP) onP(msg);
        else peersBuffer.push(msg);
      } else if (m.t === 'chat') onC({ peer: m.peer, isMe: false, data: m.d });
    };
  });
}

async function connect() {
  try {
    let r = null;
    if (window.claude && claude.use) r = await claude.use('room');
    else if (WS_URL) r = await wsRoom(WS_URL);
    if (!r) return;
    room = r;
    r.onPeers((ch) => {
      peers = ch.peers;
      updChat();
    });
    r.on('chat', (m) => {
      if (m.isMe || muted.has(m.peer)) return;
      const d = m.data || {},
        t = badw(String(d.t || '').slice(0, 80)),
        n = String(d.n || 'Teman').slice(0, 14);
      if (!t) return;
      bub[m.peer] = { t, u: Date.now() + 5000 };
      msgs.push({ n, t });
      updChat();
    });
    updChat();
  } catch (e) {
    room = null;
  }
}
