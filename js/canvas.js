// Canvas, zoom/resize responsif, input pointer & keyboard
let c;
const cv = $('#cv'),
  cvw = $('#cvw');
c = cv.getContext('2d');
function fit() {
  const w = cvw.clientWidth,
    h = cvw.clientHeight;
  if (!w || !h) return;
  DPR = Math.min(window.devicePixelRatio || 1, 2.5);
  ZM = Math.min(2.6, Math.max(1.3, Math.sqrt(w * h) / 360, w / WW, h / WH));
  VW = w / ZM;
  VH = h / ZM;
  cv.width = Math.round(w * DPR);
  cv.height = Math.round(h * DPR);
  c.setTransform(DPR * ZM, 0, 0, DPR * ZM, 0, 0);
  c.textAlign = 'center';
  c.textBaseline = 'middle';
}
fit();
addEventListener('resize', fit);
addEventListener('orientationchange', () => setTimeout(fit, 150));
if (window.ResizeObserver) new ResizeObserver(fit).observe(cvw);
setTimeout(fit, 50);
setTimeout(fit, 250);
setTimeout(fit, 1000);
$('#hint').textContent =
  (TOUCH ? 'Ketuk atau seret di peta untuk bergerak.' : 'Gerak: panah/WASD atau klik peta · E: interaksi.') +
  ' Top up & konsultasi adalah simulasi.';
const P = { x: 360, y: 240, tx: null, ty: null, ph: 0, fx: 1, mv: 0, sit: null },
  cam = { x: 0, y: 0 },
  pp = {};
let pd = 0;
const aim = (e) => {
  const r = cv.getBoundingClientRect();
  P.tx = cam.x + ((e.clientX - r.left) * VW) / r.width;
  P.ty = cam.y + ((e.clientY - r.top) * VH) / r.height;
};
cv.addEventListener('pointerdown', (e) => {
  pd = 1;
  try {
    cv.setPointerCapture(e.pointerId);
  } catch (x) {}
  aim(e);
});
cv.addEventListener('pointermove', (e) => {
  if (pd) aim(e);
});
['pointerup', 'pointercancel'].forEach((t) =>
  cv.addEventListener(t, () => {
    pd = 0;
  }),
);
addEventListener('keydown', (e) => {
  if (typing() || modalOpen()) return;
  const k = e.key.toLowerCase();
  if (k.startsWith('arrow') || k === ' ') e.preventDefault();
  if (k === 'e') {
    F.on ? fishAct() : near && near.f();
    return;
  }
  if (k === 'f' && photoMode) {
    capturePhoto();
    return;
  }
  if (k === 'p') {
    togglePhotoMode();
    return;
  }
  if (k === 'r') {
    resetRestTimer();
    toast('⏰ Timer istirahat direset');
    return;
  }
  K[k] = 1;
});
addEventListener('keyup', (e) => {
  K[e.key.toLowerCase()] = 0;
});
addEventListener('blur', () => {
  for (const k in K) K[k] = 0;
});
