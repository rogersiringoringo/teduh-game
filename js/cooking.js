// Mini-game memasak di kafe — timing-based cooking
// Hasil masakan bisa dimakan sendiri atau diberikan ke NPC (naikkan friendship)
const RECIPES = [
  { name: 'Nasi Goreng', icon: '🍳', difficulty: 1, reward: 30 },
  { name: 'Sop Ayam', icon: '🍲', difficulty: 2, reward: 45 },
  { name: 'Kue Lapis', icon: '🍰', difficulty: 3, reward: 60 },
];
let cooking = null; // { recipe, phase, timer, hits, total, result }

function openCooking() {
  const options = RECIPES.map(
    (r, i) =>
      `<button onclick="startCooking(${i})">${r.icon} ${r.name} <span class="mut">(+${r.reward}🪙)</span></button>`,
  ).join('');
  modal(
    `<h3>🍳 Dapur Teduh</h3><p class="mut">Masak hidangan untuk dirimu atau teman. Timing adalah kunci!</p><div class="ch">${options}</div><div class="ch"><button class="p" onclick="closeM()">Batal</button></div>`,
  );
}

function startCooking(recipeIdx) {
  cooking = {
    recipe: RECIPES[recipeIdx],
    phase: 0,
    hits: 0,
    total: 3 + RECIPES[recipeIdx].difficulty,
    scores: [],
    done: false,
  };
  nextCookingPhase();
}

function nextCookingPhase() {
  cooking.phase++;
  cooking.timer = { start: Date.now(), duration: 1500 + Math.random() * 1500 };
  const perfectZone = { start: 0.3 + Math.random() * 0.3, size: 0.15 + Math.random() * 0.1 };
  cooking.zone = perfectZone;
  cooking.markerPos = 0;
  renderCookingUI();
}

function renderCookingUI() {
  const c = cooking;
  const r = c.recipe;
  const progress = c.hits / c.total;
  const zoneLeft = (c.zone.start * 100).toFixed(0);
  const zoneWidth = (c.zone.size * 100).toFixed(0);
  let h = `<h3>${r.icon} Memasak ${r.name}</h3>`;
  h += `<p class="mut">Tekan tombol saat marker di area hijau! (${c.hits}/${c.total})</p>`;
  h += `<div style="position:relative;height:30px;background:var(--ln);border-radius:15px;overflow:hidden;margin:10px 0">`;
  h += `<div style="position:absolute;top:0;bottom:0;left:${zoneLeft}%;width:${zoneWidth}%;background:var(--ok);opacity:.5"></div>`;
  h += `<div id="cookMarker" style="position:absolute;top:0;bottom:0;width:6px;background:var(--pri);left:0%"></div>`;
  h += `</div>`;
  h += `<div class="ch"><button class="p" style="width:100%" onclick="cookingTap()">🔪 POTONG!</button></div>`;
  h += `<div class="ch"><button onclick="cookingGiveUp()">Berhenti</button></div>`;
  $('#md').innerHTML = h;
}

function updateCooking() {
  if (!cooking || cooking.done) return;
  const elapsed = Date.now() - cooking.timer.start;
  const pos = Math.min(1, elapsed / cooking.timer.duration);
  const marker = document.getElementById('cookMarker');
  if (marker) marker.style.left = pos * 94 + '%';
  if (pos >= 1) {
    cooking.scores.push(0);
    cookingPhaseEnd();
  }
}

function cookingTap() {
  if (!cooking || cooking.done) return;
  const elapsed = Date.now() - cooking.timer.start;
  const pos = Math.min(1, elapsed / cooking.timer.duration);
  const z = cooking.zone;
  let score = 0;
  if (pos >= z.start && pos <= z.start + z.size) {
    score = 2;
    toast('✨ Sempurna!');
  } else if (pos >= z.start - 0.1 && pos <= z.start + z.size + 0.1) {
    score = 1;
    toast('👍 Bagus!');
  } else {
    score = 0;
    toast('💨 Terlalu cepat/lambat...');
  }
  cooking.scores.push(score);
  cooking.hits++;
  cookingPhaseEnd();
}

function cookingPhaseEnd() {
  if (cooking.hits >= cooking.total) {
    cooking.done = true;
    finishCooking();
  } else {
    nextCookingPhase();
  }
}

function finishCooking() {
  const c = cooking;
  const avg = c.scores.reduce((a, b) => a + b, 0) / c.scores.length;
  const quality = avg >= 1.8 ? 'Sempurna' : avg >= 1.2 ? 'Enak' : avg >= 0.5 ? 'Cukup' : 'Gosong';
  let coins = Math.round(c.recipe.reward * (0.5 + avg / 2));
  coins = Math.round(coins * eventBonus('cook'));
  S.coins += coins;
  save();
  ui();
  questProg('cook', 1);
  const npcNames = NPC.map(
    (n, i) =>
      `<button onclick="giveFood(${i},'${c.recipe.name}','${c.recipe.icon}',${coins})">Berikan ke ${n.e} ${n.n}</button>`,
  ).join('');
  modal(
    `<h3>${c.recipe.icon} Masak selesai!</h3><p>Kualitas: <b>${quality}</b></p><p>+${coins} koin</p><div class="mut">Mau berikan ke teman? (+10 friendship)</div><div class="ch">${npcNames}</div><div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}

function giveFood(npcIdx, dishName, dishIcon, coins) {
  addFriendship(npcIdx, 10);
  const n = NPC[npcIdx];
  modal(
    `<h3>${dishIcon} ${n.n} menerima ${dishName}</h3><p>"Terima kasih banyak! Ini enak banget! 💜"</p><div class="mut">+10 friendship dengan ${n.n}</div><div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}

function cookingGiveUp() {
  cooking = null;
  closeM();
}
