// Rumah pemain: space pribadi + dekorasi
// Bisa dikasih teman lihat saat online, dekorasi = ekspresi diri
const HOUSE_DECOR = [
  { id: 'plant', icon: '🪴', name: 'Tanaman', cost: 20 },
  { id: 'lamp', icon: '💡', name: 'Lampu', cost: 30 },
  { id: 'rug', icon: '🟫', name: 'Karpet', cost: 25 },
  { id: 'painting', icon: '🖼️', name: 'Lukisan', cost: 40 },
  { id: 'books', icon: '📚', name: 'Buku', cost: 15 },
  { id: 'candle', icon: '🕯️', name: 'Lilin', cost: 10 },
  { id: 'fish', icon: '🐠', name: 'Akarium', cost: 50 },
  { id: 'flower', icon: '💐', name: 'Vas Bunga', cost: 35 },
];
let houseDecorations = [];

function initHouse() {
  try {
    houseDecorations = JSON.parse(localStorage.getItem('teduh2_house') || '[]');
  } catch (e) {
    houseDecorations = [];
  }
}

function saveHouse() {
  try {
    localStorage.setItem('teduh2_house', JSON.stringify(houseDecorations));
  } catch (e) {}
}

function openHouse() {
  const decorButtons = HOUSE_DECOR.map((d) => {
    const owned = houseDecorations.includes(d.id);
    return `<button onclick="buyDecor('${d.id}')" ${owned ? 'disabled' : ''}>${d.icon} ${d.name} ${owned ? '✓' : d.cost + '🪙'}</button>`;
  }).join('');
  const placedItems =
    houseDecorations
      .map((id) => {
        const d = HOUSE_DECOR.find((x) => x.id === id);
        return d ? `<span class="pill" style="margin:2px">${d.icon} ${d.name}</span>` : '';
      })
      .join('') || '<span class="mut">Belum ada dekorasi</span>';
  modal(
    `<h3>🏠 Rumahmu</h3>` +
      `<p class="mut">Dekorasi ruangmu. Teman online bisa melihatnya!</p>` +
      `<div class="card" style="margin:8px 0"><b>Dekorasi yang dimiliki:</b><div style="margin-top:4px">${placedItems}</div></div>` +
      `<div class="mut" style="margin-bottom:4px">Tambah dekorasi:</div>` +
      `<div style="display:flex;flex-wrap:wrap;gap:6px">${decorButtons}</div>` +
      `<div class="ch"><button class="p" onclick="closeM()">Tutup</button></div>`,
  );
}

function buyDecor(id) {
  const decor = HOUSE_DECOR.find((d) => d.id === id);
  if (!decor || houseDecorations.includes(id)) return;
  let cost = decor.cost;
  const discount = eventBonus('decor');
  if (discount < 1) cost = Math.round(cost * discount);
  if (S.coins < cost) {
    toast('Koin kurang.');
    return;
  }
  S.coins -= cost;
  houseDecorations.push(id);
  saveHouse();
  renderInterior(); // dekorasi baru langsung muncul di dalam ruangan
  save();
  ui();
  toast(decor.icon + ' ' + decor.name + ' ditambahkan ke rumah!' + (discount < 1 ? ' (diskon 50%)' : ''));
  openHouse();
}

function drawHouse() {
  const house = B.find((b) => b[7] === 'home');
  if (!house || houseDecorations.length === 0) return;
  const hx = house[0] + house[2] / 2;
  const hy = house[1] + house[3] / 2;
  houseDecorations.forEach((id, i) => {
    const decor = HOUSE_DECOR.find((d) => d.id === id);
    if (!decor) return;
    const ox = (i - (houseDecorations.length - 1) / 2) * 18;
    c.font = '14px serif';
    txt(decor.icon, hx + ox, hy + 10);
  });
}

function houseDescription() {
  if (houseDecorations.length === 0) return 'Rumah kosong';
  return (
    'Rumah dengan ' +
    houseDecorations
      .map((id) => {
        const d = HOUSE_DECOR.find((x) => x.id === id);
        return d ? d.icon : '';
      })
      .join(' ')
  );
}
