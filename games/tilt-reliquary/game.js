(() => {
  'use strict';

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const startPanel = document.getElementById('startPanel');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const soundBtn = document.getElementById('soundBtn');
  const sealsEl = document.getElementById('seals');
  const chargeEl = document.getElementById('charge');
  const timeEl = document.getElementById('time');
  const bestEl = document.getElementById('best');
  const inputModeEl = document.getElementById('inputMode');
  const messageEl = document.getElementById('message');

  const W = 720;
  const TAU = Math.PI * 2;
  const storageKey = 'tilt-reliquary-best-ms';
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const hypot = Math.hypot;
  const fmt = ms => {
    if (!Number.isFinite(ms)) return '--:--';
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };

  const rings = [86, 150, 215, 281];
  const gates = [
    [0.10, 0.24], [0.58, 0.71],
    [0.31, 0.43], [0.80, 0.91],
    [0.03, 0.15], [0.50, 0.62],
    [0.23, 0.36], [0.68, 0.78]
  ];
  const spokes = [
    {a:0.00, from:88, to:292, gap:[142,198]},
    {a:0.25, from:88, to:292, gap:[218,260]},
    {a:0.50, from:88, to:292, gap:[118,166]},
    {a:0.75, from:88, to:292, gap:[204,248]},
    {a:0.125, from:154, to:292, gap:[232,270]},
    {a:0.625, from:154, to:292, gap:[104,138]}
  ];
  const sealStarts = [
    [360,118], [536,200], [578,416], [424,575], [198,536], [119,318], [274,234]
  ];
  const bellStarts = [
    [463,146], [604,304], [509,520], [258,585], [129,410], [194,165]
  ];

  let audio = null;
  let soundOn = false;
  let running = false;
  let won = false;
  let last = performance.now();
  let startedAt = 0;
  let drift = 0;
  let pointer = null;
  let keys = new Set();
  let motion = {x:0, y:0, seen:false, baseBeta:null, baseGamma:null};
  let player, seals, bells;

  function resetWorld() {
    player = {x:360, y:650, vx:0, vy:0, r:12, charge:100, seals:0};
    seals = sealStarts.map(([x,y], i) => ({x, y, r:12, got:false, phase:i * .9}));
    bells = bellStarts.map(([x,y], i) => ({x, y, r:18, phase:i * 1.7, cooldown:0}));
    drift = 0;
    won = false;
    startedAt = performance.now();
    message('collect seven seals; center opens last');
  }

  function setupBest() {
    bestEl.textContent = fmt(Number(localStorage.getItem(storageKey)) || Infinity);
  }

  function message(text) {
    messageEl.textContent = text;
  }

  function ensureAudio() {
    if (audio) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audio = new Ctx();
  }

  function beep(freq, dur = 0.06, type = 'sine', gain = 0.035) {
    if (!soundOn || !audio) return;
    const osc = audio.createOscillator();
    const vol = audio.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    vol.gain.setValueAtTime(gain, audio.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur);
    osc.connect(vol).connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + dur);
  }

  function start() {
    ensureAudio();
    if (audio && audio.state === 'suspended') audio.resume();
    requestMotionPermission();
    resetWorld();
    running = true;
    startPanel.classList.add('hidden');
    inputModeEl.textContent = motion.seen ? 'tilt' : 'mouse / keys';
  }

  async function requestMotionPermission() {
    try {
      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result !== 'granted') message('motion denied; mouse, drag, WASD, or arrows still work');
      }
    } catch (_) {
      message('motion unavailable here; mouse, drag, WASD, or arrows still work');
    }
  }

  window.addEventListener('deviceorientation', ev => {
    if (ev.beta == null || ev.gamma == null) return;
    if (motion.baseBeta == null) {
      motion.baseBeta = ev.beta;
      motion.baseGamma = ev.gamma;
    }
    motion.seen = true;
    motion.x = clamp((ev.gamma - motion.baseGamma) / 18, -1, 1);
    motion.y = clamp((ev.beta - motion.baseBeta) / 18, -1, 1);
    inputModeEl.textContent = 'tilt';
  });

  canvas.addEventListener('pointerdown', ev => { pointer = pointerVector(ev); canvas.setPointerCapture(ev.pointerId); });
  canvas.addEventListener('pointermove', ev => { if (ev.buttons) pointer = pointerVector(ev); });
  canvas.addEventListener('pointerup', () => { pointer = null; });
  canvas.addEventListener('pointercancel', () => { pointer = null; });
  window.addEventListener('keydown', ev => { keys.add(ev.key.toLowerCase()); if (['arrowup','arrowdown','arrowleft','arrowright',' '].includes(ev.key.toLowerCase())) ev.preventDefault(); });
  window.addEventListener('keyup', ev => keys.delete(ev.key.toLowerCase()));

  function pointerVector(ev) {
    const rect = canvas.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * W;
    const y = ((ev.clientY - rect.top) / rect.height) * W;
    inputModeEl.textContent = 'mouse wand';
    return {x: clamp((x - player.x) / 130, -1, 1), y: clamp((y - player.y) / 130, -1, 1)};
  }

  function inputVector() {
    let x = motion.x, y = motion.y;
    if (pointer) { x += pointer.x * 1.4; y += pointer.y * 1.4; }
    if (keys.has('arrowleft') || keys.has('a')) x -= 1;
    if (keys.has('arrowright') || keys.has('d')) x += 1;
    if (keys.has('arrowup') || keys.has('w')) y -= 1;
    if (keys.has('arrowdown') || keys.has('s')) y += 1;
    const mag = Math.max(1, hypot(x,y));
    return {x:x/mag, y:y/mag};
  }

  function wallPush(x, y) {
    const cx = W/2, cy = W/2;
    const dx = x - cx, dy = y - cy;
    const dist = hypot(dx, dy) || 1;
    const ang = (Math.atan2(dy, dx) + TAU) % TAU;
    let px = 0, py = 0;

    for (let i=0; i<rings.length; i++) {
      const r = rings[i];
      const gap = gates[i * 2 + ((Math.floor(performance.now()/4200) + i) % 2)];
      const open = inArc(ang, gap[0] * TAU + drift, gap[1] * TAU + drift);
      const delta = dist - r;
      if (!open && Math.abs(delta) < player.r + 5) {
        const force = (player.r + 5 - Math.abs(delta)) * Math.sign(delta || 1) * 0.055;
        px += (dx / dist) * force;
        py += (dy / dist) * force;
      }
    }

    for (const s of spokes) {
      const a = s.a * TAU + drift * .6;
      const nx = Math.cos(a), ny = Math.sin(a);
      const along = dx * nx + dy * ny;
      const side = dx * -ny + dy * nx;
      if (along > s.from && along < s.to && !(along > s.gap[0] && along < s.gap[1]) && Math.abs(side) < player.r + 4) {
        const force = (player.r + 4 - Math.abs(side)) * Math.sign(side || 1) * 0.07;
        px += -ny * force;
        py += nx * force;
      }
    }
    return {x:px, y:py};
  }

  function inArc(a, start, end) {
    a = (a + TAU) % TAU; start = (start + TAU) % TAU; end = (end + TAU) % TAU;
    return start < end ? a >= start && a <= end : a >= start || a <= end;
  }

  function step(dt) {
    if (!running || won) return;
    drift += dt * 0.08;
    const v = inputVector();
    const push = wallPush(player.x, player.y);
    player.vx += (v.x * 380 + push.x * 900) * dt;
    player.vy += (v.y * 380 + push.y * 900) * dt;
    player.vx *= Math.pow(0.12, dt);
    player.vy *= Math.pow(0.12, dt);
    player.x += player.vx * dt;
    player.y += player.vy * dt;

    const edge = player.r + 8;
    if (player.x < edge || player.x > W-edge) { player.x = clamp(player.x, edge, W-edge); player.vx *= -0.35; }
    if (player.y < edge || player.y > W-edge) { player.y = clamp(player.y, edge, W-edge); player.vy *= -0.35; }

    for (const seal of seals) {
      if (!seal.got && hypot(player.x - seal.x, player.y - seal.y) < player.r + seal.r + 4) {
        seal.got = true;
        player.seals++;
        player.charge = Math.min(100, player.charge + 8);
        beep(360 + player.seals * 70, .08, 'triangle');
        message(player.seals === 7 ? 'all seals awake; enter the aperture' : `seal ${player.seals}/7 awake`);
      }
    }

    const speed = hypot(player.vx, player.vy);
    for (const bell of bells) {
      bell.cooldown = Math.max(0, bell.cooldown - dt);
      const pulse = bell.r + 10 + Math.sin(performance.now()/260 + bell.phase) * 8 + player.seals * 1.6;
      if (hypot(player.x - bell.x, player.y - bell.y) < player.r + pulse && bell.cooldown <= 0) {
        const damage = speed > 80 ? 13 : 5;
        player.charge -= damage;
        bell.cooldown = 0.7;
        beep(90, .14, 'sawtooth', .05);
        message(speed > 80 ? 'red bell heard you sprinting' : 'red bell tasted your charge');
      }
    }

    if (player.charge <= 0) {
      player.charge = 0;
      running = false;
      startPanel.classList.remove('hidden');
      startPanel.querySelector('h2').textContent = 'The witness went dark.';
      startBtn.textContent = 'try another calibration';
      message('run failed; the reliquary keeps the fingerprints');
      beep(55, .4, 'sawtooth', .06);
    }

    if (player.seals >= 7 && hypot(player.x - W/2, player.y - W/2) < 42) {
      won = true;
      running = false;
      const elapsed = performance.now() - startedAt;
      const best = Number(localStorage.getItem(storageKey)) || Infinity;
      if (elapsed < best) localStorage.setItem(storageKey, String(Math.floor(elapsed)));
      setupBest();
      message(`aperture opened in ${fmt(elapsed)}; best is ${bestEl.textContent}`);
      startPanel.classList.remove('hidden');
      startPanel.querySelector('h2').textContent = 'The aperture accepts the witness.';
      startBtn.textContent = 'open it again';
      beep(660, .08, 'triangle'); setTimeout(() => beep(990, .12, 'triangle'), 90);
    }
  }

  function draw() {
    ctx.clearRect(0,0,W,W);
    ctx.fillStyle = '#05070b';
    ctx.fillRect(0,0,W,W);
    ctx.save();
    ctx.translate(W/2, W/2);
    drawGrid();
    drawMaze();
    drawAperture();
    ctx.restore();
    drawSeals();
    drawBells();
    drawPlayer();
    drawNoise();
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(102,230,255,.07)'; ctx.lineWidth = 1;
    for (let i=-360;i<=360;i+=36) { ctx.beginPath(); ctx.moveTo(i,-360); ctx.lineTo(i,360); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-360,i); ctx.lineTo(360,i); ctx.stroke(); }
  }
  function drawMaze() {
    ctx.lineCap = 'round'; ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(128,255,184,.72)'; ctx.shadowColor = 'rgba(128,255,184,.4)'; ctx.shadowBlur = 10;
    for (let i=0;i<rings.length;i++) {
      const r = rings[i];
      const gap = gates[i * 2 + ((Math.floor(performance.now()/4200) + i) % 2)];
      arcExcept(r, gap[0]*TAU + drift, gap[1]*TAU + drift);
    }
    for (const s of spokes) {
      const a = s.a*TAU + drift*.6; const nx = Math.cos(a), ny = Math.sin(a);
      lineSeg(nx, ny, s.from, s.gap[0]); lineSeg(nx, ny, s.gap[1], s.to);
    }
    ctx.shadowBlur = 0;
  }
  function arcExcept(r, a1, a2) { ctx.beginPath(); ctx.arc(0,0,r,a2,a1+TAU); ctx.stroke(); }
  function lineSeg(nx, ny, from, to) { ctx.beginPath(); ctx.moveTo(nx*from, ny*from); ctx.lineTo(nx*to, ny*to); ctx.stroke(); }
  function drawAperture() {
    const open = player.seals >= 7;
    ctx.beginPath(); ctx.arc(0,0,43,0,TAU);
    ctx.fillStyle = open ? 'rgba(241,207,117,.25)' : 'rgba(255,77,100,.12)'; ctx.fill();
    ctx.strokeStyle = open ? 'rgba(241,207,117,.9)' : 'rgba(255,77,100,.35)'; ctx.lineWidth = 3; ctx.stroke();
  }
  function drawSeals() {
    for (const s of seals) {
      if (s.got) continue;
      const pulse = 1 + Math.sin(performance.now()/300 + s.phase) * .18;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r*pulse,0,TAU); ctx.fillStyle = 'rgba(102,230,255,.9)'; ctx.fill();
      ctx.strokeStyle = 'rgba(243,240,223,.8)'; ctx.lineWidth = 2; ctx.stroke();
    }
  }
  function drawBells() {
    for (const b of bells) {
      const pulse = b.r + 10 + Math.sin(performance.now()/260 + b.phase) * 8 + player.seals * 1.6;
      ctx.beginPath(); ctx.arc(b.x,b.y,pulse,0,TAU); ctx.strokeStyle = b.cooldown > 0 ? 'rgba(255,77,100,.85)' : 'rgba(255,77,100,.28)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,TAU); ctx.fillStyle = '#2a0b12'; ctx.fill(); ctx.strokeStyle = 'rgba(255,77,100,.9)'; ctx.stroke();
    }
  }
  function drawPlayer() {
    ctx.beginPath(); ctx.arc(player.x,player.y,player.r,0,TAU); ctx.fillStyle = '#f3f0df'; ctx.fill();
    ctx.strokeStyle = player.charge < 25 ? '#ff4d64' : '#f1cf75'; ctx.lineWidth = 4; ctx.stroke();
  }
  function drawNoise() {
    ctx.fillStyle = 'rgba(255,255,255,.05)';
    for (let i=0;i<18;i++) ctx.fillRect(Math.random()*W, Math.random()*W, Math.random()*2+1, 1);
  }

  function updateHud() {
    sealsEl.textContent = `${player.seals} / 7`;
    chargeEl.textContent = `${Math.ceil(player.charge)}`;
    timeEl.textContent = running ? fmt(performance.now() - startedAt) : timeEl.textContent;
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    step(dt);
    draw();
    updateHud();
    requestAnimationFrame(loop);
  }

  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', () => { resetWorld(); running = true; startPanel.classList.add('hidden'); });
  soundBtn.addEventListener('click', () => {
    ensureAudio();
    if (audio && audio.state === 'suspended') audio.resume();
    soundOn = !soundOn;
    soundBtn.textContent = soundOn ? 'sound on' : 'sound off';
    beep(440, .06, 'square');
  });

  setupBest();
  resetWorld();
  running = false;
  requestAnimationFrame(loop);
})();
