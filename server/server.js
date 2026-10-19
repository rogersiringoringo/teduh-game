// Server untuk Teduh: menyajikan file statis + relay multiplayer (presence + chat).
// Jalankan: npm start   (PORT otomatis dari host, default 8787)
const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');
const WW = 1280,
  WH = 880;
const PORT = process.env.PORT || 8787;
const ROOT = path.join(__dirname, '..');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

// Server HTTP statis. Selain game, wajib punya /health supaya host bisa mengecek nyawa service.
// Hanya isi web yang boleh keluar: server, dependency, dan lockfile disembunyikan.
const DENY = /^\/(server|node_modules)(\/|$)|^\/(\.|package(-lock)?\.json$)/i;
const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }
  if (DENY.test(pathname)) {
    res.writeHead(404);
    return res.end('404');
  }
  const want = path.normalize(path.join(ROOT, decodeURIComponent(pathname)));
  if (!want.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end();
  }
  // Jalur tak dikenal jatuh ke index.html; nama berkas tetap terkirim sebagai isi 404.
  const file = pathname === '/' || want === ROOT ? path.join(ROOT, 'index.html') : want;
  fs.readFile(file, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404');
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(buf);
  });
});

const wss = new WebSocketServer({ server });
const clients = new Map();
let seq = 0,
  dirty = false;

const int = (v, max) => Math.max(0, Math.min(max, v | 0));
const clean = (d) => ({
  x: Math.max(0, Math.min(WW, +d.x || 0)),
  y: Math.max(0, Math.min(WH, +d.y || 0)),
  c: int(d.c, 4),
  h: int(d.h, 4),
  s: int(d.s, 3),
  a: int(d.a, 3),
  b: int(d.b, 4),
  f: d.f ? 1 : 0,
  t: int(d.t, 20),
  n: String(d.n || 'Teman')
    .replace(/[<>]/g, '')
    .slice(0, 14),
});
const peersList = () => [...clients.values()].map((c) => ({ peer: c.id, presence: c.presence }));
const broadcast = (m, except) => {
  const s = JSON.stringify(m);
  for (const c of clients.values()) if (c.ws !== except && c.ws.readyState === 1) c.ws.send(s);
};

wss.on('connection', (ws) => {
  const c = { id: 'p' + ++seq, ws, presence: {}, last: 0 };
  clients.set(c.id, c);
  ws.send(JSON.stringify({ t: 'hello', id: c.id }));
  ws.send(JSON.stringify({ t: 'peers', peers: peersList() }));
  dirty = true;
  ws.on('message', (raw) => {
    let m;
    try {
      m = JSON.parse(raw);
    } catch (e) {
      return;
    }
    if (m.t === 'presence' && m.d && typeof m.d === 'object') {
      c.presence = clean(m.d);
      dirty = true;
    } else if (m.t === 'chat' && m.d && Date.now() - c.last > 800) {
      c.last = Date.now();
      broadcast(
        {
          t: 'chat',
          peer: c.id,
          d: { n: String(m.d.n || '').slice(0, 14), t: String(m.d.t || '').slice(0, 80) },
        },
        ws,
      );
    }
  });
  ws.on('close', () => {
    clients.delete(c.id);
    dirty = true;
  });
});
setInterval(() => {
  if (dirty) {
    dirty = false;
    broadcast({ t: 'peers', peers: peersList() });
  }
}, 100);
server.listen(PORT, () =>
  console.log('Teduh berjalan di http://localhost:' + PORT + ' (ws://localhost:' + PORT + ')'),
);
