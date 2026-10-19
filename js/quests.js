// Quest harian & mingguan dengan rotating pool dan streak
const DAILY_POOL = [
  { id: 'talk3', t: 'Ngobrol dengan 3 teman', n: 3, k: 20, kind: 'talk' },
  { id: 'catch2', t: 'Tangkap 2 ikan', n: 2, k: 20, kind: 'fish' },
  { id: 'water5', t: 'Siram 5 tanaman', n: 5, k: 15, kind: 'water' },
  { id: 'journal1', t: 'Tulis 1 jurnal', n: 1, k: 15, kind: 'journal' },
  { id: 'mood1', t: 'Check-in mood', n: 1, k: 10, kind: 'mood' },
  { id: 'sit2', t: 'Duduk di bangku 2×', n: 2, k: 10, kind: 'sit' },
];
const WEEKLY_POOL = [
  { id: 'help10', t: 'Beri 10 tanggapan suportif', n: 10, k: 80, kind: 'help' },
  { id: 'earn200', t: 'Kumpulkan 200 koin', n: 200, k: 60, kind: 'coins' },
  { id: 'cook3', t: 'Masak 3 hidangan', n: 3, k: 50, kind: 'cook' },
  { id: 'photo3', t: 'Ambil 3 foto', n: 3, k: 40, kind: 'photo' },
];
let dailyQuests = [];
let weeklyQuests = [];
let questProgress = {};
let questDay = '';
let questWeek = '';
let streak = 0;
let lastStreakDay = '';

function initQuests() {
  const today = new Date().toLocaleDateString('sv');
  const weekStart = getWeekStart();
  try {
    const saved = JSON.parse(localStorage.getItem('teduh2_quests') || '{}');
    questProgress = saved.p || {};
    streak = saved.s || 0;
    lastStreakDay = saved.lsd || '';
    dailyQuests = saved.dq || [];
    weeklyQuests = saved.wq || [];
  } catch (e) {}
  if (questDay !== today) {
    questDay = today;
    questProgress = {};
    dailyQuests = pickQuests(DAILY_POOL, 3);
    weeklyQuests = pickQuests(WEEKLY_POOL, 2);
    saveQuests();
  }
  if (questWeek !== weekStart) {
    questWeek = weekStart;
    weeklyQuests = pickQuests(WEEKLY_POOL, 2);
    saveQuests();
  }
}

function getWeekStart() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d.toLocaleDateString('sv');
}

function pickQuests(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function saveQuests() {
  try {
    localStorage.setItem(
      'teduh2_quests',
      JSON.stringify({
        p: questProgress,
        s: streak,
        lsd: lastStreakDay,
        dq: dailyQuests,
        wq: weeklyQuests,
      }),
    );
  } catch (e) {}
}

function questProg(kind, amount) {
  const today = new Date().toLocaleDateString('sv');
  [...dailyQuests, ...weeklyQuests].forEach((q) => {
    if (q.kind !== kind) return;
    if (questProgress[q.id] >= q.n) return;
    questProgress[q.id] = Math.min((questProgress[q.id] || 0) + (amount || 1), q.n);
    if (questProgress[q.id] === q.n) {
      S.tokens += q.k;
      S.coins += 5;
      toast('Quest selesai: ' + q.t + '! +' + q.k + ' token');
      checkStreak();
    }
  });
  saveQuests();
  save();
}

function checkStreak() {
  const today = new Date().toLocaleDateString('sv');
  const allDone = dailyQuests.every((q) => (questProgress[q.id] || 0) >= q.n);
  if (allDone && lastStreakDay !== today) {
    const yesterday = new Date(Date.now() - 864e5).toLocaleDateString('sv');
    if (lastStreakDay === yesterday) streak++;
    else if (lastStreakDay !== today) streak = 1;
    lastStreakDay = today;
    toast('🔥 Streak ' + streak + ' hari!');
  }
}

function renderQuests() {
  let h = '<div class="card"><b>📋 Quest Harian</b> <span class="mut">Reset tiap hari</span>';
  dailyQuests.forEach((q) => {
    const v = Math.min(questProgress[q.id] || 0, q.n);
    h += `<div class="row" style="margin-top:6px"><span>${v >= q.n ? '✅ ' : ''}${q.t}</span><span class="mut">+${q.k}🎟</span></div>`;
    h += `<div class="bar"><i style="width:${(v / q.n) * 100}%"></i></div>`;
  });
  h += `<div class="mut" style="margin-top:4px">🔥 Streak: ${streak} hari</div></div>`;
  h += '<div class="card"><b>📋 Quest Mingguan</b> <span class="mut">Reset tiap minggu</span>';
  weeklyQuests.forEach((q) => {
    const v = Math.min(questProgress[q.id] || 0, q.n);
    h += `<div class="row" style="margin-top:6px"><span>${v >= q.n ? '✅ ' : ''}${q.t}</span><span class="mut">+${q.k}🎟</span></div>`;
    h += `<div class="bar"><i style="width:${(v / q.n) * 100}%"></i></div>`;
  });
  h += '</div>';
  return h;
}
