// Game loop: gerak, kamera, render, presence multiplayer
function loop() {
  requestAnimationFrame(loop);
  try {
    const now = Date.now(),
      mo = modalOpen();
    let vx = 0,
      vy = 0;
    P.mv = 0;
    if (!mo) {
      if (K.arrowleft || K.a) vx--;
      if (K.arrowright || K.d) vx++;
      if (K.arrowup || K.w) vy--;
      if (K.arrowdown || K.s) vy++;
      if (vx || vy) {
        P.tx = null;
        const l = Math.hypot(vx, vy);
        vx /= l;
        vy /= l;
      } else if (P.tx != null) {
        const dx = P.tx - P.x,
          dy = P.ty - P.y,
          d = Math.hypot(dx, dy);
        if (d > 3) {
          vx = dx / d;
          vy = dy / d;
        } else P.tx = null;
      }
      if (P.sit != null && (vx || vy)) stand();
      if (vx || vy) {
        let m = 0;
        const nx = P.x + vx * 2,
          ny = P.y + vy * 2;
        if (!blocked(nx, P.y)) {
          P.x = nx;
          m = 1;
        }
        if (!blocked(P.x, ny)) {
          P.y = ny;
          m = 1;
        }
        if (!m) P.tx = null;
        else {
          P.mv = 1;
          P.ph += 0.28;
          if (Math.abs(vx) > 0.2) P.fx = vx < 0 ? -1 : 1;
        }
      }
    }
    if (F.on && (vx || vy || P.tx != null)) endFish();
    if (!IN)
      NPC.forEach((n) => {
        n.mv = Math.hypot(n.vx, n.vy) > 0.08;
        if (n.mv) {
          n.ph += 0.15;
          if (Math.abs(n.vx) > 0.05) n.fx = n.vx < 0 ? -1 : 1;
        }
        if (Math.random() < 0.004) {
          n.vx = (Math.random() - 0.5) * 0.8;
          n.vy = (Math.random() - 0.5) * 0.8;
        }
        const nx = n.x + n.vx,
          ny = n.y + n.vy;
        if (blocked(nx, n.y)) {
          n.vx *= -1;
        } else n.x = nx;
        if (blocked(n.x, ny)) {
          n.vy *= -1;
        } else n.y = ny;
      });
    // Batas kamera & sumber latar ikut scene (dunia luar atau interior rumah)
    const MW = IN ? IW : WW,
      MH = IN ? IH : WH;
    cam.x = Math.max(0, Math.min(MW - VW, P.x - VW / 2));
    cam.y = Math.max(0, Math.min(MH - VH, P.y - VH / 2));
    c.drawImage(IN ? bgIn : bg, cam.x * BS, cam.y * BS, VW * BS, VH * BS, 0, 0, VW, VH);
    c.save();
    c.translate(-cam.x, -cam.y);
    const E = [];
    // Saat di dalam rumah, objek dunia luar disembunyikan
    if (!IN) {
      PL.forEach((p, i) => E.push([p[1], () => txt(S.pl[i] ? '🌷' : '🌱', p[0], p[1])]));
      STG.forEach((s) => E.push([s.y + 6, () => txt(s.icon, s.x, s.y - 10, 22)]));
      NPC.forEach((n) =>
        E.push([
          n.y,
          () =>
            who(
              n.x,
              n.y,
              { sh: n.sh, sk: n.sk, hs: n.hs, hc: n.hc, hat: 0, ph: n.ph, fx: n.fx, mv: n.mv },
              n.n,
            ),
        ]),
      );
      peers.forEach((p) => {
        if (p.isMe || muted.has(p.peer)) return;
        const r = p.presence || {},
          tx = +r.x,
          ty = +r.y;
        if (!isFinite(tx) || !isFinite(ty)) return;
        const q = pp[p.peer] || (pp[p.peer] = { x: tx, y: ty, ph: 0, fx: 1, mv: 0 }),
          dx = tx - q.x;
        q.mv = Math.hypot(dx, ty - q.y) > 0.6 ? 1 : 0;
        if (q.mv) {
          q.ph += 0.28;
          if (Math.abs(dx) > 0.3) q.fx = dx < 0 ? -1 : 1;
        }
        q.x += dx * 0.25;
        q.y += (ty - q.y) * 0.25;
        E.push([
          q.y,
          () => {
            if (r.f) txt('🎣', q.x + q.fx * 13, q.y - 6, 14);
            who(
              q.x,
              q.y,
              {
                sh: COL[r.c | 0] || COL[0],
                sk: r.s | 0,
                hs: r.a | 0,
                hc: r.b | 0,
                hat: r.h | 0,
                ph: q.ph,
                fx: q.fx,
                mv: q.mv,
                sit: (r.t | 0) > 0,
              },
              String(r.n || 'Teman').slice(0, 14),
              bub[p.peer],
            );
          },
        ]);
      });
    }
    E.push([
      P.y,
      () =>
        who(
          P.x,
          P.y,
          {
            sh: COL[S.col],
            sk: S.sk,
            hs: S.hs,
            hc: S.hc,
            hat: S.hat,
            ph: P.ph,
            fx: P.fx,
            mv: P.mv,
            sit: P.sit != null,
          },
          S.name + ' (kamu)',
          bub.me,
        ),
    ]);
    E.sort((a, b) => a[0] - b[0]).forEach((e) => e[1]());
    if (F.on) drawFish(now);
    c.restore();
    const a = getDayNightAlpha();
    if (a) {
      c.fillStyle = 'rgba(20,20,70,' + a + ')';
      c.fillRect(0, 0, VW, VH);
    }
    if (!IN) drawWeather();
    updateAudio();
    updateCooking();
    // `c.restore()` di atas sudah membatalkan translate kamera, jadi overlay
    // yang memakai koordinat dunia perlu kamera dipasang ulang di sini.
    c.save();
    c.translate(-cam.x, -cam.y);
    drawEmote(now);
    if (!IN) {
      drawStage(now);
      drawHouse();
    } else drawHomeGlow();
    c.restore();
    if (mo && F.on) endFish();
    near = mo || F.on ? null : P.sit != null ? STAND : nearest();
    if (F.on) fishUI();
    else actUp();
    if (IN) homeHud();
    // Saat di dalam rumah, jangan_siarkan posisi ke teman
    if (room && S.reg && !IN && now - lastP > 100) {
      const o = {
          x: Math.round(P.x),
          y: Math.round(P.y),
          c: S.col,
          h: S.hat,
          f: F.on ? 1 : 0,
          t: P.sit == null ? 0 : P.sit + 1,
          n: S.name,
          s: S.sk,
          a: S.hs,
          b: S.hc,
        },
        j = JSON.stringify(o);
      if (j !== sentP) {
        sentP = j;
        lastP = now;
        room.presence(o).catch(() => {});
      }
    }
  } catch (e) {
    // Jangan ditelan diam-diam: laporkan sekali agar bug kelihatan di console.
    if (!loop.warned) {
      loop.warned = 1;
      console.error('Teduh: error di game loop —', e);
    }
  }
}
