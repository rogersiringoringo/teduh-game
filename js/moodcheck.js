// Mood check-in adaptif: game tanya kondisi & kasih aktivitas menenangkan
// Berbeda dari mood check-in biasa — ini lebih personal & adaptif
const MOOD_ACTIVITIES = {
  sad: [
    { icon: '🚶', text: 'Yuk jalan-jalan di sekitar danau', action: 'walk_lake' },
    { icon: '🎵', text: 'Dengarkan musik di kafe', action: 'music_cafe' },
    { icon: '💬', text: 'Ngobrol dengan teman', action: 'talk_npc' },
    { icon: '📝', text: 'Tulis jurnal perasaan', action: 'journal' },
  ],
  stressed: [
    { icon: '🧘', text: 'Peregangan ringan', action: 'stretch' },
    { icon: '🌳', text: 'Duduk di bangku taman', action: 'sit_bench' },
    { icon: '🎣', text: 'Memancing di danau', action: 'fish' },
    { icon: '📚', text: 'Baca di perpustakaan', action: 'read' },
  ],
  lonely: [
    { icon: '👋', text: 'Sapa teman di sekitar', action: 'greet' },
    { icon: '🏠', text: 'Dekorasi rumahmu', action: 'decorate' },
    { icon: '🍳', text: 'Masak untuk teman', action: 'cook' },
    { icon: '😊', text: 'Check-in mood', action: 'mood' },
  ],
  anxious: [
    { icon: '🫁', text: 'Tarik napas 4-7-8', action: 'breathe' },
    { icon: '🎨', text: 'Mode foto santai', action: 'photo' },
    { icon: '💧', text: 'Siram tanaman', action: 'water' },
    { icon: '📖', text: 'Baca catatan motivasi', action: 'quote' },
  ],
};
let moodCheckTimer = 0;
let moodCheckInterval = 45 * 60 * 1000; // 45 menit
let lastMood = null;

function initMoodCheck() {
  moodCheckTimer = Date.now();
  setInterval(checkMood, 60000);
}

function checkMood() {
  if (Date.now() - moodCheckTimer >= moodCheckInterval) {
    moodCheckTimer = Date.now();
    showMoodCheck();
  }
}

function showMoodCheck() {
  modal(
    `<h3>💜 Bagaimana kamu?</h3>` +
      `<p class="mut">Kamu sudah main cukup lama. Kami ingin memastikan kamu baik-baik saja.</p>` +
      `<div class="ch" style="flex-direction:row;justify-content:space-around;font-size:28px">` +
      `<button onclick="moodResponse('sad')" title="Sedih">😢</button>` +
      `<button onclick="moodResponse('stressed')" title="Stres">😰</button>` +
      `<button onclick="moodResponse('lonely')" title="Kesepian">😔</button>` +
      `<button onclick="moodResponse('anxious')" title="Cemas">😟</button>` +
      `<button onclick="moodResponse('ok')" title="Baik saja">😊</button>` +
      `</div>` +
      `<div class="ch"><button onclick="closeM()">Nanti saja</button></div>`,
  );
}

function moodResponse(mood) {
  lastMood = mood;
  if (mood === 'ok') {
    modal(
      `<h3>😊 Senang mendengarnya!</h3>` +
        `<p>Jaga kesehatanmu ya. Kami di sini kalau kamu butuh.</p>` +
        `<div class="ch"><button class="p" onclick="closeM()">Lanjut main</button></div>`,
    );
    return;
  }
  const activities = MOOD_ACTIVITIES[mood] || MOOD_ACTIVITIES.sad;
  const buttons = activities
    .map((a) => `<button onclick="doMoodActivity('${a.action}')">${a.icon} ${a.text}</button>`)
    .join('');
  modal(
    `<h3>💜 Kami peduli</h3>` +
      `<p>Kamu tidak sendirian. Coba aktivitas ini untuk merasa lebih baik:</p>` +
      `<div class="ch">${buttons}</div>` +
      `<div class="ch"><button onclick="closeM()">Nanti saja</button></div>`,
  );
}

function doMoodActivity(action) {
  closeM();
  // Semua aktivitas ini berada di dunia luar
  if (IN) exitHome();
  switch (action) {
    case 'walk_lake':
      toast('🚶 Yuk jalan ke danau!');
      P.tx = LK.x;
      P.ty = LK.y + 60;
      break;
    case 'music_cafe':
      toast('🎵 Nikmati musik di kafe!');
      const cafe = B.find((b) => b[7] === 'cafe');
      if (cafe) {
        P.tx = cafe[0] + cafe[2] / 2;
        P.ty = cafe[1] + cafe[3] + 20;
      }
      break;
    case 'talk_npc':
      toast('💬 Cari teman untuk ngobrol!');
      break;
    case 'journal':
      journal();
      break;
    case 'stretch':
      startStretch();
      break;
    case 'sit_bench':
      toast('🪑 Cari bangku untuk duduk!');
      break;
    case 'fish':
      toast('🎣 Coba memancing di danau!');
      P.tx = LK.x;
      P.ty = LK.y + 60;
      break;
    case 'read': {
      // Cerita hanya bisa dibuka dari dalam Perpustakaan, jadi arahkan karakter ke sana
      const lib = B.find((b) => b[7] === 'lib');
      toast('📚 Yuk mampir ke Perpustakaan!');
      if (lib) {
        P.tx = lib[0] + lib[2] / 2;
        P.ty = lib[1] + lib[3] + 20;
      }
      break;
    }
    case 'greet':
      toast('👋 Sapa teman di sekitar!');
      break;
    case 'decorate':
      openHouse();
      break;
    case 'cook':
      openCooking();
      break;
    case 'mood':
      $('#mb').click();
      break;
    case 'breathe':
      toast('🫁 Tarik napas 4 detik...');
      setTimeout(() => toast('🫁 Tahan 7 detik...'), 4000);
      setTimeout(() => toast('🫁 Hembuskan 8 detik...'), 11000);
      setTimeout(() => toast('🫁 Ulangi 3x. Kamu pasti lebih tenang!'), 19000);
      break;
    case 'photo':
      togglePhotoMode();
      break;
    case 'water':
      toast('💧 Siram tanaman di sekitar!');
      break;
    case 'quote':
      quote();
      break;
  }
}

function getLastMood() {
  return lastMood;
}
