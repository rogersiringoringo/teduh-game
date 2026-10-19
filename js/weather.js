// Sistem cuaca: Cerah, Berawan, Hujan, Badai
// Efek visual + dampak gameplay (ikan langka saat hujan, NPC masuk saat badai)
const WEATHER_STATES = [
  { id: 'clear', name: 'Cerah', icon: '☀️' },
  { id: 'cloudy', name: 'Berawan', icon: '☁️' },
  { id: 'rain', name: 'Hujan', icon: '🌧️' },
  { id: 'storm', name: 'Badai', icon: '⛈️' },
];
let weatherIdx = 0;
let weatherTimer = 0;
const WEATHER_DURATION = 5 * 60 * 1000; // 5 menit per cuaca
let rainDrops = [];
let lightningFlash = 0;

function initWeather() {
  try {
    const saved = localStorage.getItem('teduh2_weather');
    if (saved) weatherIdx = parseInt(saved, 10) || 0;
  } catch (e) {}
  updateWeatherUI();
  setInterval(() => {
    weatherTimer += 1000;
    if (weatherTimer >= WEATHER_DURATION) {
      weatherTimer = 0;
      weatherIdx = (weatherIdx + 1) % WEATHER_STATES.length;
      try {
        localStorage.setItem('teduh2_weather', String(weatherIdx));
      } catch (e) {}
      updateWeatherUI();
      const w = WEATHER_STATES[weatherIdx];
      toast(w.icon + ' Cuaca: ' + w.name);
      if (w.id === 'rain') toast('🌧️ Hujan datang... ikan langka mungkin muncul!');
      if (w.id === 'storm') toast('⛈️ Badai! NPC mencari tempat berteduh.');
    }
  }, 1000);
}

function getWeather() {
  return WEATHER_STATES[weatherIdx];
}
function isRaining() {
  return weatherIdx >= 2;
}
function isStormy() {
  return weatherIdx === 3;
}

function updateWeatherUI() {
  const el = document.getElementById('weather');
  if (!el) return;
  const w = getWeather();
  el.textContent = w.icon + ' ' + w.name;
}

function weatherIcon() {
  return getWeather().icon;
}

function initRainDrops() {
  rainDrops = [];
  for (let i = 0; i < 80; i++) {
    rainDrops.push({
      x: Math.random() * VW,
      y: Math.random() * VH,
      speed: 4 + Math.random() * 4,
      length: 8 + Math.random() * 8,
      opacity: 0.2 + Math.random() * 0.3,
    });
  }
}

function drawWeather() {
  const w = getWeather().id;
  if (w === 'cloudy') {
    c.fillStyle = 'rgba(200,200,200,0.15)';
    c.fillRect(0, 0, VW, VH);
    c.font = '24px serif';
    c.globalAlpha = 0.4;
    txt('☁️', VW * 0.2, 30);
    txt('☁️', VW * 0.6, 50);
    txt('☁️', VW * 0.8, 25);
    c.globalAlpha = 1;
  }
  if (w === 'rain' || w === 'storm') {
    c.strokeStyle = 'rgba(150,180,220,0.5)';
    c.lineWidth = 1;
    rainDrops.forEach((d) => {
      c.globalAlpha = d.opacity;
      c.beginPath();
      c.moveTo(d.x, d.y);
      c.lineTo(d.x - 1, d.y + d.length);
      c.stroke();
      d.y += d.speed;
      d.x -= 0.5;
      if (d.y > VH) {
        d.y = -10;
        d.x = Math.random() * (VW + 20);
      }
    });
    c.globalAlpha = 1;
    c.fillStyle = 'rgba(80,100,130,0.08)';
    c.fillRect(0, 0, VW, VH);
  }
  if (w === 'storm') {
    if (Math.random() < 0.005) lightningFlash = 5;
    if (lightningFlash > 0) {
      c.fillStyle = `rgba(255,255,220,${lightningFlash * 0.06})`;
      c.fillRect(0, 0, VW, VH);
      lightningFlash--;
    }
    c.strokeStyle = 'rgba(100,120,160,0.4)';
    c.lineWidth = 1.2;
    rainDrops.forEach((d) => {
      c.globalAlpha = d.opacity + 0.1;
      c.beginPath();
      c.moveTo(d.x, d.y);
      c.lineTo(d.x - 2, d.y + d.length + 4);
      c.stroke();
      d.y += d.speed * 1.4;
      d.x -= 1;
      if (d.y > VH) {
        d.y = -10;
        d.x = Math.random() * (VW + 30);
      }
    });
    c.globalAlpha = 1;
  }
  if (w === 'clear' && isNight()) {
    c.fillStyle = 'rgba(255,255,200,0.6)';
    const stars = [
      [20, 15],
      [60, 30],
      [100, 10],
      [150, 25],
      [200, 18],
      [250, 35],
      [300, 12],
      [340, 28],
    ];
    stars.forEach(([sx, sy], i) => {
      const tw = 0.3 + Math.abs(Math.sin(Date.now() / 800 + i)) * 0.7;
      c.globalAlpha = tw * 0.8;
      c.beginPath();
      c.arc(sx, sy, 1.2, 0, 7);
      c.fill();
    });
    c.globalAlpha = 1;
  }
  if (isStormy()) {
    NPC.forEach((n) => {
      n.vx *= 0.95;
      n.vy *= 0.95;
    });
  }
}
