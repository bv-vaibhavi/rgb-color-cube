// ══════════════════════════════════════════════
//  LOADER
// ══════════════════════════════════════════════
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ══════════════════════════════════════════════
//  CUSTOM CURSOR
// ══════════════════════════════════════════════
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ══════════════════════════════════════════════
//  NAVBAR SCROLL EFFECT
// ══════════════════════════════════════════════
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ══════════════════════════════════════════════
//  PARTICLE BACKGROUND CANVAS
// ══════════════════════════════════════════════
const pc = document.getElementById('particleCanvas');
const px = pc.getContext('2d');
let pw, ph, particles = [];

function resizePC() {
  pw = pc.width  = window.innerWidth;
  ph = pc.height = window.innerHeight;
}
resizePC();
window.addEventListener('resize', resizePC);

function Particle() {
  this.x = Math.random() * pw;
  this.y = Math.random() * ph;
  this.r = Math.random() * 1.5 + 0.3;
  this.vx = (Math.random() - 0.5) * 0.3;
  this.vy = (Math.random() - 0.5) * 0.3;
  this.alpha = Math.random() * 0.5 + 0.1;
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawParticles() {
  px.clearRect(0, 0, pw, ph);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = pw;
    if (p.x > pw) p.x = 0;
    if (p.y < 0) p.y = ph;
    if (p.y > ph) p.y = 0;
    px.beginPath();
    px.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    px.fillStyle = `rgba(22,219,101,${p.alpha})`;
    px.fill();
  });
  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        px.beginPath();
        px.moveTo(particles[i].x, particles[i].y);
        px.lineTo(particles[j].x, particles[j].y);
        px.strokeStyle = `rgba(22,219,101,${0.06 * (1 - dist / 100)})`;
        px.lineWidth = 0.5;
        px.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ══════════════════════════════════════════════
//  CREDIT SECTION CANVAS (ring animation)
// ══════════════════════════════════════════════
const cc = document.getElementById('creditCanvas');
const cx = cc.getContext('2d');
function resizeCC() {
  cc.width  = cc.parentElement.offsetWidth;
  cc.height = cc.parentElement.offsetHeight;
}
resizeCC();
window.addEventListener('resize', resizeCC);

let angle = 0;
function drawCredit() {
  cx.clearRect(0, 0, cc.width, cc.height);
  const cx2 = cc.width / 2, cy2 = cc.height / 2;
  const rings = [
    { r: 180, speed: 0.003, dots: 12, size: 2 },
    { r: 240, speed: -0.002, dots: 18, size: 1.5 },
    { r: 300, speed: 0.0015, dots: 24, size: 1 },
  ];
  rings.forEach((ring, ri) => {
    for (let i = 0; i < ring.dots; i++) {
      const a = angle * ring.speed * 200 + (i / ring.dots) * Math.PI * 2;
      const x = cx2 + Math.cos(a) * ring.r;
      const y = cy2 + Math.sin(a) * ring.r;
      const alpha = (Math.sin(a * 3 + angle * 0.01) + 1) / 2 * 0.4;
      cx.beginPath();
      cx.arc(x, y, ring.size, 0, Math.PI * 2);
      cx.fillStyle = `rgba(22,219,101,${alpha})`;
      cx.fill();
    }
  });
  angle++;
  requestAnimationFrame(drawCredit);
}
drawCredit();

// ══════════════════════════════════════════════
//  SCROLL REVEAL
// ══════════════════════════════════════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ══════════════════════════════════════════════
//  THREE.JS — RGB CUBE
// ══════════════════════════════════════════════
const canvas   = document.getElementById('threeCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setClearColor(0x061810, 1);
renderer.shadowMap.enabled = true;

const scene  = new THREE.Scene();
scene.fog    = new THREE.FogExp2(0x061810, 0.15);

const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
camera.position.set(2.2, 1.8, 2.2);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance   = 1.5;
controls.maxDistance   = 7;

// ── Build color cloud ──
const cubeGroup = new THREE.Group();
scene.add(cubeGroup);

const sGeo  = new THREE.SphereGeometry(0.022, 7, 7);
const step  = 0.14;
const meshes = [];

for (let r = 0; r <= 1; r += step) {
  for (let g = 0; g <= 1; g += step) {
    for (let b = 0; b <= 1; b += step) {
      const mat  = new THREE.MeshPhongMaterial({
        color: new THREE.Color(r, g, b),
        shininess: 60,
        specular: new THREE.Color(0.2, 0.2, 0.2),
      });
      const mesh = new THREE.Mesh(sGeo, mat);
      mesh.position.set(r - 0.5, g - 0.5, b - 0.5);
      mesh.userData = { basePos: mesh.position.clone(), r, g, b };
      cubeGroup.add(mesh);
      meshes.push(mesh);
    }
  }
}

// ── Wireframe ──
let wireframeObj;
function buildWireframe() {
  if (wireframeObj) cubeGroup.remove(wireframeObj);
  wireframeObj = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
    new THREE.LineBasicMaterial({ color: 0x16db65, transparent: true, opacity: 0.5 })
  );
  cubeGroup.add(wireframeObj);
}
buildWireframe();
let showWire = true;

// ── Axes ──
const axes = new THREE.AxesHelper(0.75);
axes.visible = false;
cubeGroup.add(axes);

// ── Grid ──
const grid = new THREE.GridHelper(3, 12, 0x04471c, 0x04471c);
grid.position.y = -0.8;
grid.material.opacity = 0.3;
grid.material.transparent = true;
scene.add(grid);

// ── Lights ──
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0x16db65, 1.2);
dirLight.position.set(3, 4, 3);
dirLight.castShadow = true;
scene.add(dirLight);
const pointLight1 = new THREE.PointLight(0x058c42, 1.5, 5);
pointLight1.position.set(-2, 2, -2);
scene.add(pointLight1);
const pointLight2 = new THREE.PointLight(0x04471c, 1, 4);
pointLight2.position.set(2, -2, 2);
scene.add(pointLight2);

// ── State ──
let autoRotate  = true;
let exploded    = false;
let explodeProgress = 0;

// ── Controls ──
document.getElementById('btnRotate').addEventListener('click', function() {
  autoRotate = !autoRotate;
  this.classList.toggle('active', autoRotate);
});
document.getElementById('btnWire').addEventListener('click', function() {
  showWire = !showWire;
  wireframeObj.visible = showWire;
  this.classList.toggle('active', showWire);
});
document.getElementById('btnAxes').addEventListener('click', function() {
  axes.visible = !axes.visible;
  this.classList.toggle('active', axes.visible);
});
document.getElementById('btnExplode').addEventListener('click', function() {
  exploded = !exploded;
  this.classList.toggle('active', exploded);
});
document.getElementById('btnReset').addEventListener('click', () => {
  cubeGroup.rotation.set(0.3, 0.3, 0);
  camera.position.set(2.2, 1.8, 2.2);
  controls.reset();
  exploded = false;
  document.getElementById('btnExplode').classList.remove('active');
});

// ── Readout ──
const readoutBox = document.getElementById('readoutBox');
const readoutHex = document.getElementById('readoutHex');
const rFill = document.getElementById('rFill');
const gFill = document.getElementById('gFill');
const bFill = document.getElementById('bFill');
const rVal  = document.getElementById('rVal');
const gVal  = document.getElementById('gVal');
const bVal  = document.getElementById('bVal');

function toHex(v) { return Math.round(v * 255).toString(16).padStart(2, '0'); }

function updateReadout(r, g, b) {
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  const ri  = Math.round(r * 255);
  const gi  = Math.round(g * 255);
  const bi  = Math.round(b * 255);
  readoutBox.style.background = hex;
  readoutHex.textContent = hex.toUpperCase();
  rFill.style.width = (ri / 255 * 100) + '%';
  gFill.style.width = (gi / 255 * 100) + '%';
  bFill.style.width = (bi / 255 * 100) + '%';
  rVal.textContent = ri;
  gVal.textContent = gi;
  bVal.textContent = bi;
}

// ── Resize ──
window.addEventListener('resize', () => {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
});

// ── Animate ──
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  if (autoRotate) {
    cubeGroup.rotation.y += 0.22 * delta;
    cubeGroup.rotation.x += 0.07 * delta;
  }

  // Explode / collapse
  const targetExplode = exploded ? 1 : 0;
  explodeProgress += (targetExplode - explodeProgress) * 0.05;
  meshes.forEach(m => {
    const bp = m.userData.basePos;
    m.position.set(
      bp.x + bp.x * explodeProgress * 1.2,
      bp.y + bp.y * explodeProgress * 1.2,
      bp.z + bp.z * explodeProgress * 1.2
    );
  });

  // Animate point lights
  pointLight1.position.x = Math.sin(elapsed * 0.5) * 2.5;
  pointLight1.position.z = Math.cos(elapsed * 0.5) * 2.5;

  // Update readout from rotation
  const r2 = Math.abs(Math.sin(cubeGroup.rotation.y));
  const g2 = Math.abs(Math.sin(cubeGroup.rotation.x + 1));
  const b2 = Math.abs(Math.cos(cubeGroup.rotation.y + cubeGroup.rotation.x));
  updateReadout(r2, g2, b2);

  controls.update();
  renderer.render(scene, camera);
}
animate();

// ══════════════════════════════════════════════
//  VERTEX CARDS
// ══════════════════════════════════════════════
const vertices = [
  { name: 'Black',   r:0,   g:0,   b:0,   hex: '#000000' },
  { name: 'Red',     r:255, g:0,   b:0,   hex: '#ff0000' },
  { name: 'Green',   r:0,   g:255, b:0,   hex: '#00ff00' },
  { name: 'Blue',    r:0,   g:0,   b:255, hex: '#0000ff' },
  { name: 'Yellow',  r:255, g:255, b:0,   hex: '#ffff00' },
  { name: 'Cyan',    r:0,   g:255, b:255, hex: '#00ffff' },
  { name: 'Magenta', r:255, g:0,   b:255, hex: '#ff00ff' },
  { name: 'White',   r:255, g:255, b:255, hex: '#ffffff' },
];
const vGrid = document.getElementById('vertexGrid');
vertices.forEach((v, i) => {
  const card = document.createElement('div');
  card.className = 'vertex-card reveal';
  card.style.setProperty('--delay', (i * 0.07) + 's');
  const textColor = (v.r + v.g + v.b < 200) ? v.hex : v.hex;
  card.innerHTML = `
    <div class="vertex-swatch" style="background:${v.hex}"></div>
    <div class="vertex-name" style="color:${v.r+v.g+v.b<100?'#16db65':v.hex}">${v.name}</div>
    <div class="vertex-code">RGB(${v.r}, ${v.g}, ${v.b})</div>
    <div class="vertex-code">${v.hex.toUpperCase()}</div>
  `;
  vGrid.appendChild(card);
  revealObs.observe(card);
});
// ══════════════════════════════════════════════
//  THEORY CARD MODAL
// ══════════════════════════════════════════════
const cardData = [
  {
    icon: '🔴',
    title: 'Red Axis · X',
    body: `The Red channel runs along the X-axis from 0 to 255.

A value of 0 means no red light. A value of 255 means maximum red intensity.

Pure red = RGB(255, 0, 0) — sitting at the far right of the X-axis in 3D space.

Red is one of three primary colors of light. When combined with green it produces yellow, and with blue it produces magenta.`
  },
  {
    icon: '🟢',
    title: 'Green Axis · Y',
    body: `The Green channel runs along the Y-axis from 0 to 255.

Green is the most sensitive channel to the human eye — it dominates the luminance calculation in displays.

Pure green = RGB(0, 255, 0) — at the top of the Y-axis.

The human eye has more green-sensitive cone cells than any other color, which is why night-vision devices use green phosphors.`
  },
  {
    icon: '🔵',
    title: 'Blue Axis · Z',
    body: `The Blue channel runs along the Z-axis from 0 to 255.

Blue carries the shortest visible wavelength (~450 nm) among the three primaries.

Pure blue = RGB(0, 0, 255) — at the front of the Z-axis.

Combining blue + red gives Magenta. Combining blue + green gives Cyan. All three at 255 = pure White.`
  },
  {
    icon: '⬛',
    title: 'Origin · Black',
    body: `The origin point (0, 0, 0) represents absolute black.

At this vertex, no light is emitted on any channel — the screen displays nothing.

In additive color models like RGB, black is the absence of all light. This is the opposite of subtractive models (like CMYK) where black is the presence of all pigments.`
  },
  {
    icon: '⬜',
    title: 'Diagonal · White',
    body: `The opposite corner (255, 255, 255) is pure white.

White is achieved when all three light channels are at maximum intensity simultaneously.

The main diagonal of the RGB cube — from (0,0,0) to (255,255,255) — is called the grey axis. Every point on it has equal R, G, and B values, producing shades of grey.`
  },
  {
    icon: '🔄',
    title: '3D Rotation',
    body: `Rotation is a core 3D transformation in Computer Graphics.

The cube you see rotates about its Y-axis continuously using a 4×4 homogeneous rotation matrix applied every frame via Three.js / WebGL.

Rotation reveals all 6 colored faces of the cube — showing how Red, Green, Blue, Cyan, Magenta, and Yellow are distributed across 3D color space.

θ increments each frame → smooth continuous rotation.`
  }
];

const overlay    = document.getElementById('modalOverlay');
const modalIcon  = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalBody  = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.theory-card').forEach((card, i) => {
  card.addEventListener('click', () => {
    const data = cardData[i];
    if (!data) return;
    modalIcon.textContent  = data.icon;
    modalTitle.textContent = data.title;
    modalBody.textContent  = data.body;
    overlay.classList.add('open');
  });
});

modalClose.addEventListener('click', () => overlay.classList.remove('open'));
overlay.addEventListener('click', e => {
  if (e.target === overlay) overlay.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') overlay.classList.remove('open');
});

// ══════════════════════════════════════════════
//  EXPLODE SOUND — Pearls / Crystal falling
// ══════════════════════════════════════════════
function playExplodeSound() {
  const ctx  = new (window.AudioContext || window.webkitAudioContext)();
  const count = 18;

  for (let i = 0; i < count; i++) {
    const delay  = i * 0.055 + Math.random() * 0.04;
    const freq   = 1400 - i * 55 + Math.random() * 120;
    const dur    = 0.18 + Math.random() * 0.12;

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const filt = ctx.createBiquadFilter();

    osc.type            = 'sine';
    osc.frequency.value = freq;

    filt.type            = 'bandpass';
    filt.frequency.value = freq;
    filt.Q.value         = 8;

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);

    osc.connect(filt);
    filt.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + dur + 0.05);
  }

  // deep thud on the burst
  const thud  = ctx.createOscillator();
  const tGain = ctx.createGain();
  thud.type            = 'sine';
  thud.frequency.setValueAtTime(180, ctx.currentTime);
  thud.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.25);
  tGain.gain.setValueAtTime(0.3, ctx.currentTime);
  tGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  thud.connect(tGain);
  tGain.connect(ctx.destination);
  thud.start(ctx.currentTime);
  thud.stop(ctx.currentTime + 0.35);
}

function playCollapseSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const count = 12;
  for (let i = 0; i < count; i++) {
    const delay = i * 0.04;
    const freq  = 400 + i * 60 + Math.random() * 80;
    const osc   = ctx.createOscillator();
    const gain  = ctx.createGain();
    osc.type            = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.2);
  }
}

// hook into the existing explode button
document.getElementById('btnExplode').addEventListener('click', () => {
  // exploded is toggled BEFORE this listener fires in the original code
  // so we check the active class
  const isNowExploded = document.getElementById('btnExplode').classList.contains('active');
  if (isNowExploded) {
    playExplodeSound();
  } else {
    playCollapseSound();
  }
});