// Event komunitas: Festival musiman, Pasar Malam, Lomba Memancing
// Event berbasis waktu real dengan durasi tertentu
const COMMUNITY_EVENTS = [
  {
    id: 'spring_fest',
    name: 'Festival Musim Semi',
    icon: '🌸',
    desc: 'Bunga bermekaran! Diskon 50% dekorasi rumah.',
    duration: 24 * 60 * 60 * 1000,
    rewards: { coins: 100, tokens: 30 },
  },
  {
    id: 'night_market',
    name: 'Pasar Malam',
    icon: '🏮',
    desc: 'Kedai makanan buka! Harga masakan +50%.',
    duration: 12 * 60 * 60 * 1000,
    rewards: { coins: 80, tokens: 20 },
  },
  {
    id: 'fish_comp',
    name: 'Lomba Memancing',
    icon: '🎣',
    desc: 'Tangkap ikan terbanyak! Hadiah 200 koin.',
    duration: 60 * 60 * 1000,
    rewards: { coins: 200, tokens: 50 },
  },
  {
    id: 'harvest',
    name: 'Festival Panen',
    icon: '🌾',
    desc: 'Panen raya! Siram tanaman = 2x friendship.',
    duration: 18 * 60 * 60 * 1000,
    rewards: { coins: 60, tokens: 25 },
  },
  {
    id: 'art_show',
    name: 'Pameran Seni',
    icon: '🎨',
    desc: 'Jual beli lukisan! Koin dari foto +20.',
    duration: 10 * 60 * 60 * 1000,
    rewards: { coins: 50, tokens: 15 },
  },
];
let activeEvent = null;
let eventEndTime = 0;

function initEvents() {
  try {
    const saved = JSON.parse(localStorage.getItem('teduh2_event') || '{}');
    if (saved.id && Date.now() < saved.end) {
      activeEvent = COMMUNITY_EVENTS.find((e) => e.id === saved.id);
      eventEndTime = saved.end;
    } else {
      scheduleNextEvent();
    }
  } catch (e) {
    scheduleNextEvent();
  }
  setInterval(checkEvent, 60000);
}

function scheduleNextEvent() {
  const next = COMMUNITY_EVENTS[Math.floor(Math.random() * COMMUNITY_EVENTS.length)];
  activeEvent = next;
  eventEndTime = Date.now() + next.duration;
  try {
    localStorage.setItem('teduh2_event', JSON.stringify({ id: next.id, end: eventEndTime }));
  } catch (e) {}
  toast(next.icon + ' Event: ' + next.name + ' dimulai!');
}

function checkEvent() {
  if (Date.now() > eventEndTime) {
    if (activeEvent) {
      S.coins += activeEvent.rewards.coins;
      S.tokens += activeEvent.rewards.tokens;
      save();
      ui();
      toast(
        activeEvent.icon +
          ' Event selesai! +' +
          activeEvent.rewards.coins +
          '🪙 +' +
          activeEvent.rewards.tokens +
          '🎟',
      );
    }
    scheduleNextEvent();
  }
}

function getActiveEvent() {
  return activeEvent && Date.now() < eventEndTime ? activeEvent : null;
}

function eventTimeLeft() {
  if (!getActiveEvent()) return '';
  const ms = eventEndTime - Date.now();
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h + 'j ' + m + 'm';
}

function showEventInfo() {
  const ev = getActiveEvent();
  if (!ev) {
    toast('Tidak ada event aktif saat ini.');
    return;
  }
  modal(
    `<h3>${ev.icon} ${ev.name}</h3>` +
      `<p>${ev.desc}</p>` +
      `<div class="mut">Sisa waktu: ${eventTimeLeft()}</div>` +
      `<div class="mut">Hadiah: ${ev.rewards.coins}🪙 ${ev.rewards.tokens}🎟</div>` +
      `<div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}

function eventBonus(type) {
  const ev = getActiveEvent();
  if (!ev) return 1;
  if (ev.id === 'night_market' && type === 'cook') return 1.5;
  if (ev.id === 'art_show' && type === 'photo') return 1.2;
  if (ev.id === 'spring_fest' && type === 'decor') return 0.5;
  if (ev.id === 'harvest' && type === 'water') return 2;
  return 1;
}
