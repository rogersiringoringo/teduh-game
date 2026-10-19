// Mode fotografi: screenshot dengan filter dan frame
let photoMode = false;
let photoFilter = 'none';
let photoFrame = 'none';

const PHOTO_FILTERS = [
  { id: 'none', name: 'Normal', css: '' },
  { id: 'warm', name: 'Hangat', css: 'sepia(0.3) saturate(1.3)' },
  { id: 'cool', name: 'Dingin', css: 'saturate(0.8) hue-rotate(15deg)' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(0.6) contrast(0.9) brightness(1.1)' },
  { id: 'dream', name: 'Mimpi', css: 'saturate(1.4) brightness(1.1) blur(0.5px)' },
];
const PHOTO_FRAMES = [
  { id: 'none', name: 'Tanpa bingkai', css: '' },
  { id: 'white', name: 'Bingkai Putih', css: 'border: 8px solid #fff' },
  { id: 'black', name: 'Bingkai Hitam', css: 'border: 8px solid #222' },
  { id: 'polaroid', name: 'Polaroid', css: 'border: 10px solid #fff; border-bottom: 30px solid #fff' },
];

function togglePhotoMode() {
  photoMode = !photoMode;
  const cv = document.getElementById('cv');
  if (photoMode) {
    cv.style.filter = PHOTO_FILTERS.find((f) => f.id === photoFilter).css;
    cv.style.border = PHOTO_FRAMES.find((f) => f.id === photoFrame).css;
    showPhotoUI();
    toast('📸 Mode foto aktif! Tekan F untuk capture.');
  } else {
    cv.style.filter = '';
    cv.style.border = '';
    const el = document.getElementById('photoUI');
    if (el) el.remove();
    toast('Mode foto dimatikan.');
  }
}

function showPhotoUI() {
  let el = document.getElementById('photoUI');
  if (!el) {
    el = document.createElement('div');
    el.id = 'photoUI';
    el.style.cssText =
      'position:fixed;top:60px;right:16px;z-index:20;display:flex;flex-direction:column;gap:6px;';
    document.body.appendChild(el);
  }
  el.innerHTML = `
    <div class="card" style="background:var(--card);border:1px solid var(--ln);border-radius:12px;padding:10px;min-width:160px">
      <b>📸 Mode Foto</b>
      <div class="mut" style="margin:4px 0">Filter:</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${PHOTO_FILTERS.map((f) => `<button onclick="setPhotoFilter('${f.id}')" style="padding:4px 8px;font-size:12px;${photoFilter === f.id ? 'background:var(--pri);color:#fff' : ''}">${f.name}</button>`).join('')}
      </div>
      <div class="mut" style="margin:6px 0 4px">Bingkai:</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${PHOTO_FRAMES.map((f) => `<button onclick="setPhotoFrame('${f.id}')" style="padding:4px 8px;font-size:12px;${photoFrame === f.id ? 'background:var(--pri);color:#fff' : ''}">${f.name}</button>`).join('')}
      </div>
      <div class="row" style="margin-top:8px">
        <button class="p" onclick="capturePhoto()" style="flex:1">📷 Foto</button>
        <button onclick="togglePhotoMode()">✖</button>
      </div>
    </div>`;
}

function setPhotoFilter(id) {
  photoFilter = id;
  const cv = document.getElementById('cv');
  cv.style.filter = PHOTO_FILTERS.find((f) => f.id === id).css;
  showPhotoUI();
}

function setPhotoFrame(id) {
  photoFrame = id;
  const cv = document.getElementById('cv');
  cv.style.border = PHOTO_FRAMES.find((f) => f.id === id).css;
  showPhotoUI();
}

function capturePhoto() {
  const cv = document.getElementById('cv');
  const link = document.createElement('a');
  link.download = 'teduh-' + Date.now() + '.png';
  link.href = cv.toDataURL('image/png');
  link.click();
  const bonus = eventBonus('photo');
  const coins = Math.round(20 * bonus);
  S.coins += coins;
  save();
  questProg('photo', 1);
  toast('📸 Foto tersimpan! +' + coins + '🪙');
}
