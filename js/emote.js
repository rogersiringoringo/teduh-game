// Sistem emote: ekspresi non-verbal untuk interaksi sosial
// Bisa dipakai sendiri atau di dekat pemain/NPC lain
const EMOTES = [
  { id: 'wave', icon: '👋', name: 'Lambaian', anim: 'wave' },
  { id: 'dance', icon: '💃', name: 'Menari', anim: 'dance' },
  { id: 'laugh', icon: '😂', name: 'Tertawa', anim: 'laugh' },
  { id: 'cry', icon: '😢', name: 'Menangis', anim: 'cry' },
  { id: 'love', icon: '❤️', name: 'Cinta', anim: 'love' },
  { id: 'think', icon: '🤔', name: 'Berpikir', anim: 'think' },
  { id: 'sleep', icon: '😴', name: 'Tidur', anim: 'sleep' },
  { id: 'cheer', icon: '🎉', name: 'Sorakan', anim: 'cheer' },
  { id: 'bow', icon: '🙇', name: 'Hormat', anim: 'bow' },
  { id: 'clap', icon: '👏', name: 'Tepuk tangan', anim: 'clap' },
];
let currentEmote = null;
let emoteTimer = 0;

function showEmoteMenu() {
  const buttons = EMOTES.map(
    (e) => `<button onclick="doEmote('${e.id}')" style="font-size:24px;padding:8px">${e.icon}</button>`,
  ).join('');
  modal(
    `<h3>😊 Emote</h3><p class="mut">Ekspresikan dirimu!</p>` +
      `<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">${buttons}</div>` +
      `<div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}

function doEmote(id) {
  const emote = EMOTES.find((e) => e.id === id);
  if (!emote) return;
  currentEmote = emote;
  emoteTimer = Date.now() + 3000;
  bub.me = { t: emote.icon + ' ' + emote.name, u: Date.now() + 3000 };
  closeM();
  toast(emote.icon + ' ' + emote.name + '!');
}

function drawEmote(now) {
  if (!currentEmote || now > emoteTimer) {
    currentEmote = null;
    return;
  }
  const el = (now % 1000) / 1000;
  const bounce = Math.sin(el * Math.PI * 2) * 3;
  c.font = '18px serif';
  c.globalAlpha = 0.7 + Math.sin(el * Math.PI * 4) * 0.3;
  txt(currentEmote.icon, P.x + P.fx * 16, P.y - 34 + bounce);
  c.globalAlpha = 1;
}

function clearEmote() {
  currentEmote = null;
  emoteTimer = 0;
}
