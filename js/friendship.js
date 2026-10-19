// Sistem persahabatan dengan NPC
// Naik lewat ngobrol, memberi hadiah (bunga), dan memberi makanan
const FRIEND_LEVELS = [
  { min: 0, name: 'Kenalan', icon: '👋' },
  { min: 20, name: 'Teman', icon: '🤝' },
  { min: 50, name: 'Sahabat', icon: '💜' },
  { min: 80, name: 'Sahabat Dekat', icon: '💖' },
  { min: 120, name: 'Keluarga', icon: '🏡' },
];
let friendship = {};

function initFriendship() {
  try {
    friendship = JSON.parse(localStorage.getItem('teduh2_friendship') || '{}');
  } catch (e) {
    friendship = {};
  }
}

function saveFriendship() {
  try {
    localStorage.setItem('teduh2_friendship', JSON.stringify(friendship));
  } catch (e) {}
}

function getFriendship(npcIdx) {
  return friendship[npcIdx] || 0;
}

function getFriendLevel(npcIdx) {
  const fp = getFriendship(npcIdx);
  let lvl = 0;
  for (let i = 0; i < FRIEND_LEVELS.length; i++) {
    if (fp >= FRIEND_LEVELS[i].min) lvl = i;
  }
  return lvl;
}

function getFriendTitle(npcIdx) {
  return FRIEND_LEVELS[getFriendLevel(npcIdx)];
}

function addFriendship(npcIdx, amount) {
  const before = getFriendLevel(npcIdx);
  friendship[npcIdx] = Math.min(200, getFriendship(npcIdx) + amount);
  const after = getFriendLevel(npcIdx);
  saveFriendship();
  if (after > before) {
    const n = NPC[npcIdx];
    const title = FRIEND_LEVELS[after];
    toast('💜 ' + n.n + ' sekarang ' + title.name + ' ' + title.icon + '!');
    S.tokens += 15;
    save();
  }
  return friendship[npcIdx];
}

function renderFriendshipUI() {
  let h = '<div class="card"><b>💜 Persahabatan</b> <span class="mut">Naik lewat interaksi</span>';
  NPC.forEach((n, i) => {
    const fp = getFriendship(i);
    const title = getFriendTitle(i);
    const nextLvl = FRIEND_LEVELS[getFriendLevel(i) + 1];
    const pct = nextLvl ? ((fp - title.min) / (nextLvl.min - title.min)) * 100 : 100;
    h += `<div class="row" style="margin-top:6px"><span>${n.e} ${n.n} ${title.icon}</span><span class="mut">${title.name} (${fp})</span></div>`;
    h += `<div class="bar"><i style="width:${pct}%"></i></div>`;
  });
  h += '</div>';
  return h;
}
