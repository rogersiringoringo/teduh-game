// Konstanta, state (localStorage), toast/modal, daftar misi
const $ = (s) => document.querySelector(s),
  KEY = 'teduh2',
  DAY = 864e5,
  WW = 1280,
  WH = 1280,
  BS = 2,
  TOUCH = window.matchMedia ? matchMedia('(pointer:coarse)').matches : false,
  KE = TOUCH ? '' : ' (E)';
let VW = 360,
  VH = 270,
  ZM = 1,
  DPR = 1;
let F = { on: 0, st: '', k: '' },
  S,
  tab = 'm',
  room = null,
  IN = null,
  peers = [],
  muted = new Set(),
  bub = {},
  msgs = [],
  lastS = 0,
  near = null,
  bt = null,
  ak = '\0',
  sentP = '',
  lastP = 0;
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m],
  );
const today = () => new Date().toLocaleDateString('sv');
function load() {
  S = null;
  try {
    S = JSON.parse(localStorage.getItem(KEY));
  } catch (e) {}
  const DEF = {
    coins: 50,
    tokens: 0,
    log: [],
    lim: 0,
    own: ['c0', 'h0'],
    col: 0,
    hat: 0,
    cp: { chat: 0, video: 0 },
    red: [],
    noticed: 0,
    disc: 0,
    day: '',
    m: {},
    d: {},
    pl: [],
    name: 'Teman' + ((100 + Math.random() * 900) | 0),
    jr: [],
    br: {},
    st: {},
  };
  if (!S || typeof S !== 'object') S = {};
  S = Object.assign({}, DEF, S);
  if (S.minor) S.lim = S.lim && S.lim <= 75000 ? S.lim : 75000;
  if (S.disc && Date.now() - S.noticed > 30 * DAY) S.disc = 0;
  if (S.day !== today()) {
    S.day = today();
    S.m = {};
    S.d = {};
    S.pl = [];
    S.fc = 0;
  }
  S.fish = S.fish || {};
  S.br = S.br && typeof S.br == 'object' ? S.br : {};
  S.st = S.st && typeof S.st == 'object' ? S.st : {};
  S.fc = S.fc | 0;
  S.sk = S.sk | 0;
  S.hs = S.hs | 0;
  S.hc = S.hc | 0;
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
  } catch (e) {}
}
function toast(t) {
  const e = $('#toast');
  e.textContent = t;
  e.style.display = 'block';
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (e.style.display = 'none'), 2800);
}
const K = {},
  typing = () =>
    /INPUT|SELECT|TEXTAREA/.test((document.activeElement && document.activeElement.tagName) || ''),
  modalOpen = () => $('#mo').style.display == 'flex' || regOpen();
function modal(h) {
  $('#md').innerHTML = h;
  $('#mo').style.display = 'flex';
  $('#mo').className = '';
  for (const k in K) K[k] = 0;
}
function closeM() {
  clearInterval(bt);
  $('#mo').style.display = 'none';
  $('#mo').className = '';
}
const MIS = [
  { id: 'mood', t: 'Check-in mood', n: 1, k: 10 },
  { id: 'talk', t: 'Ngobrol dengan 2 teman', n: 2, k: 15 },
  { id: 'water', t: 'Siram 3 tanaman', n: 3, k: 10 },
  { id: 'help', t: 'Beri 2 tanggapan suportif', n: 2, k: 20 },
  { id: 'read', t: 'Baca 1 cerita di perpustakaan', n: 1, k: 10 },
];
function prog(id) {
  const m = MIS.find((x) => x.id == id);
  S.m[id] = (S.m[id] || 0) + 1;
  if (S.m[id] >= m.n && !S.d[id]) {
    S.d[id] = 1;
    S.tokens += m.k;
    S.coins += 5;
    toast('Misi selesai! +' + m.k + ' token, +5 koin');
  }
  save();
  ui();
}
const COL = ['#f4a261', '#6c5ce7', '#2a9d8f', '#e76f51', '#e9c46a'],
  CC = [0, 40, 40, 60, 60],
  HAT = ['', '🎩', '👑', '🌸', '🧢'],
  HC = [0, 60, 120, 50, 50];
