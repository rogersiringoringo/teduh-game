// Reminder istirahat halus: NPC ngajak jalan-jalan, scene berubah
// Bukan popup mengganggu, tapi interaksi natural dalam game
const REST_REMINDERS = [
  { npc: 0, msg: 'Sari: "Udah lama nih di depan layar. Yuk jalan-jalan sebentar!"' },
  { npc: 1, msg: 'Bima: "Kamu udah main lama. Coba rehat, minum air dulu."' },
  { npc: 2, msg: 'Dewi: "Mata kamu butuh istirahat. Yuk lihat pemandangan."' },
  { npc: 3, msg: 'Rudi: "Jangan lupa rehat ya. Kesehatan lebih penting."' },
  { npc: 4, msg: 'Mala: "Aku juga butuh teman ngobrol sambil jalan. Yuk!"' },
];
let restTimer = 0;
let restInterval = 30 * 60 * 1000; // 30 menit
let restActive = false;

function initRest() {
  restTimer = Date.now();
  setInterval(checkRest, 60000);
}

function checkRest() {
  if (Date.now() - restTimer >= restInterval) {
    restTimer = Date.now();
    showRestReminder();
  }
}

function showRestReminder() {
  const reminder = REST_REMINDERS[Math.floor(Math.random() * REST_REMINDERS.length)];
  const npc = NPC[reminder.npc];
  if (!npc) return;
  bub[reminder.npc] = { t: reminder.msg, u: Date.now() + 8000 };
  duckAudio(45000);
  toast('💡 Waktunya istirahat sebentar!');
  if (S.minor) {
    showMinorRestModal();
  }
}

function showMinorRestModal() {
  modal(
    `<h3>💡 Pengingat Istirahat</h3>` +
      `<p>Kamu sudah main cukup lama. Yuk rehat sebentar:</p>` +
      `<div class="ch">` +
      `<button class="g" onclick="closeM();startRestWalk()">🚶 Jalan-jalan di game</button>` +
      `<button onclick="closeM();startStretch()">🤸 Peregangan ringan</button>` +
      `<button onclick="closeM()">Lanjut main</button>` +
      `</div>`,
  );
}

function startRestWalk() {
  toast('🚶 Mode jalan-jalan: gerakkan karakter untuk menjelajah!');
  P.tx = 640;
  P.ty = 400;
}

function startStretch() {
  toast('🤸 Tarik napas dalam-dalam... Hembuskan perlahan...');
  setTimeout(() => toast('🤸 Angkat bahu... turunkan...'), 2000);
  setTimeout(() => toast('🤸 Putar leher perlahan...'), 4000);
  setTimeout(() => toast('🤸 Selesai! Kamu pasti lebih segar!'), 6000);
}

function resetRestTimer() {
  restTimer = Date.now();
}
