// Parental controls: batas waktu untuk akun <18, laporan aktivitas
// Hanya untuk akun minor (di bawah 18 tahun)
const PARENTAL_KEY = 'teduh2_parental';
let parentalSettings = {
  enabled: false,
  dailyLimit: 60, // menit
  reportEmail: '',
  todayPlayTime: 0,
  lastReset: '',
};

function initParental() {
  if (!S.minor) return;
  try {
    const saved = JSON.parse(localStorage.getItem(PARENTAL_KEY) || '{}');
    parentalSettings = Object.assign(parentalSettings, saved);
  } catch (e) {}
  const today = new Date().toLocaleDateString('sv');
  if (parentalSettings.lastReset !== today) {
    parentalSettings.todayPlayTime = 0;
    parentalSettings.lastReset = today;
    saveParental();
  }
  if (parentalSettings.enabled) {
    setInterval(checkPlayTime, 60000);
    showParentalNotice();
  }
}

function saveParental() {
  try {
    localStorage.setItem(PARENTAL_KEY, JSON.stringify(parentalSettings));
  } catch (e) {}
}

function checkPlayTime() {
  if (!parentalSettings.enabled) return;
  parentalSettings.todayPlayTime++;
  saveParental();
  const remaining = parentalSettings.dailyLimit - parentalSettings.todayPlayTime;
  if (remaining === 30) toast('⏰ Sisa waktu main: 30 menit');
  if (remaining === 10) toast('⏰ Sisa waktu main: 10 menit');
  if (remaining <= 0) {
    showTimeUpModal();
  }
}

function showTimeUpModal() {
  pauseAllAudio();
  modal(
    `<h3>⏰ Waktu Main Habis</h3>` +
      `<p>Batas harian ${parentalSettings.dailyLimit} menit sudah tercapai.</p>` +
      `<p class="mut">Terima kasih sudah bermain dengan sehat! Sampai besok! 🌿</p>` +
      `<div class="ch"><button class="p" onclick="closeM()">OK</button></div>`,
  );
}

function showParentalNotice() {
  const remaining = parentalSettings.dailyLimit - parentalSettings.todayPlayTime;
  toast(`⏰ Mode parental aktif. Sisa waktu: ${remaining} menit`);
}

function openParentalSettings() {
  if (!S.minor) {
    toast('Parental controls hanya untuk akun di bawah 18 tahun.');
    return;
  }
  modal(
    `<h3>🛡️ Parental Controls</h3>` +
      `<div class="mut">Pengaturan untuk orang tua/wali</div>` +
      `<div class="row" style="margin-top:10px">` +
      `<span>Aktifkan batas waktu</span>` +
      `<input type="checkbox" id="pcEnabled" ${parentalSettings.enabled ? 'checked' : ''} onchange="toggleParental(this.checked)">` +
      `</div>` +
      `<div class="row" style="margin-top:8px">` +
      `<span>Batas harian (menit)</span>` +
      `<select id="pcLimit" onchange="setTimeLimit(this.value)">` +
      [30, 45, 60, 90, 120]
        .map(
          (v) =>
            `<option value="${v}" ${parentalSettings.dailyLimit === v ? 'selected' : ''}>${v} menit</option>`,
        )
        .join('') +
      `</select>` +
      `</div>` +
      `<div class="row" style="margin-top:8px">` +
      `<span>Email laporan</span>` +
      `<input type="email" id="pcEmail" value="${parentalSettings.reportEmail}" placeholder="email@orangtua.com" onchange="setReportEmail(this.value)">` +
      `</div>` +
      `<div class="mut" style="margin-top:8px">Waktu main hari ini: ${parentalSettings.todayPlayTime} menit</div>` +
      `<div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}

function toggleParental(enabled) {
  parentalSettings.enabled = enabled;
  saveParental();
  if (enabled) {
    toast('🛡️ Parental controls diaktifkan');
    showParentalNotice();
  } else {
    toast('🛡️ Parental controls dinonaktifkan');
    resumeAudio();
  }
}

function setTimeLimit(minutes) {
  parentalSettings.dailyLimit = parseInt(minutes, 10);
  saveParental();
  toast(`⏰ Batas harian diubah ke ${minutes} menit`);
}

function setReportEmail(email) {
  parentalSettings.reportEmail = email;
  saveParental();
  toast('📧 Email laporan disimpan');
}

function getParentalSettings() {
  return parentalSettings;
}
