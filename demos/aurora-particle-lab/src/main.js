import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import './styles.css';

const stage = document.querySelector('#webgl-stage');
const particleCount = document.querySelector('#particle-count');
const fieldMode = document.querySelector('#field-mode');
const gestureState = document.querySelector('#gesture-state');
const presetButtons = [...document.querySelectorAll('[data-preset]')];
const pulseButton = document.querySelector('#pulse-button');
const prismButton = document.querySelector('#prism-button');
const audioButton = document.querySelector('#audio-button');

const isCoarsePointer = matchMedia('(pointer: coarse)').matches;
const COUNT = isCoarsePointer ? 16000 : 28000;
const PRESETS = {
  aurora: {
    label: 'Aurora',
    mode: 0,
    palette: 0,
    bloom: 0.48,
    exposure: 0.94,
    fog: 0.028,
    tint: '#ffffff',
    ring: '#8be9ff',
    scale: 1,
    gravity: 1,
    motion: 1,
  },
  signal: {
    label: 'Signal',
    mode: 1,
    palette: 0.18,
    bloom: 0.42,
    exposure: 0.9,
    fog: 0.034,
    tint: '#b9ffef',
    ring: '#7cffd4',
    scale: 0.92,
    gravity: 0.72,
    motion: 0.82,
  },
  singularity: {
    label: 'Void',
    mode: 2,
    palette: 0.66,
    bloom: 0.64,
    exposure: 0.98,
    fog: 0.022,
    tint: '#b7b8ff',
    ring: '#7b7cff',
    scale: 0.82,
    gravity: 1.7,
    motion: 0.64,
  },
  solar: {
    label: 'Solar',
    mode: 0.36,
    palette: 0.34,
    bloom: 0.68,
    exposure: 1.02,
    fog: 0.026,
    tint: '#fff0a8',
    ring: '#ffe76a',
    scale: 1.08,
    gravity: 1.12,
    motion: 1.28,
  },
  deep: {
    label: 'Deep',
    mode: 1.42,
    palette: 0.82,
    bloom: 0.34,
    exposure: 0.84,
    fog: 0.044,
    tint: '#91c7ff',
    ring: '#6fb4ff',
    scale: 1.16,
    gravity: 0.55,
    motion: 0.54,
  },
};
const PALETTES = [
  {
    id: 'glacier',
    label: 'Glacier',
    colors: ['#9fd8ff', '#c6b8ff', '#f3ead0'],
    ring: '#a8d7ff',
    glows: ['rgba(116, 170, 218, 0.1)', 'rgba(170, 150, 225, 0.08)'],
  },
  {
    id: 'copper',
    label: 'Copper',
    colors: ['#e2a66f', '#c56f7a', '#9fc9d0'],
    ring: '#d7a76f',
    glows: ['rgba(205, 143, 90, 0.1)', 'rgba(178, 98, 112, 0.08)'],
  },
  {
    id: 'museum',
    label: 'Museum',
    colors: ['#d7d0c2', '#9db4c0', '#cab48a'],
    ring: '#c7d4d9',
    glows: ['rgba(187, 180, 166, 0.09)', 'rgba(130, 154, 166, 0.08)'],
  },
  {
    id: 'lichen',
    label: 'Lichen',
    colors: ['#9fd6b2', '#8fb9c7', '#d8c78f'],
    ring: '#9bcfac',
    glows: ['rgba(129, 181, 145, 0.09)', 'rgba(116, 158, 174, 0.08)'],
  },
  {
    id: 'nocturne',
    label: 'Nocturne',
    colors: ['#9188c7', '#c07da7', '#c7d7de'],
    ring: '#9d94d0',
    glows: ['rgba(130, 120, 190, 0.1)', 'rgba(180, 105, 154, 0.08)'],
  },
];
const pointer = new THREE.Vector2(0.5, 0.5);
const targetPointer = new THREE.Vector2(0.5, 0.5);
let pointerActive = 0;
let targetMode = 0;
let currentMode = 0;
let shockStart = -20;
let shockPower = 0;
let paletteShift = 0;
let targetPaletteShift = 0;
let audioLevel = 0;
let audioBass = 0;
let audioReady = false;
let audioContext;
let analyser;
let frequencyData;
let lastInteraction = 0;
let isPressing = false;
let pressStart = 0;
let currentPreset = PRESETS.aurora;
let paletteIndex = 0;
let currentPalette = PALETTES[paletteIndex];
let targetBloom = currentPreset.bloom;
let currentBloom = currentPreset.bloom;
let targetExposure = currentPreset.exposure;
let currentExposure = currentPreset.exposure;
let targetFog = currentPreset.fog;
let currentFog = currentPreset.fog;
let targetScale = currentPreset.scale;
let currentScale = currentPreset.scale;
let targetGravity = currentPreset.gravity;
let currentGravity = currentPreset.gravity;
let targetMotion = currentPreset.motion;
let currentMotion = currentPreset.motion;
const targetTint = new THREE.Color(currentPreset.tint);
const currentTint = new THREE.Color(currentPreset.tint);
const targetRing = new THREE.Color(currentPreset.ring);
const currentPaletteA = new THREE.Color(currentPalette.colors[0]);
const currentPaletteB = new THREE.Color(currentPalette.colors[1]);
const currentPaletteC = new THREE.Color(currentPalette.colors[2]);
const targetPaletteA = new THREE.Color(currentPalette.colors[0]);
const targetPaletteB = new THREE.Color(currentPalette.colors[1]);
const targetPaletteC = new THREE.Color(currentPalette.colors[2]);

particleCount.textContent = COUNT.toLocaleString('en-US');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x03040a, 0.028);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 90);
camera.position.set(0, 0.5, 16);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
});
renderer.setClearColor(0x03040a, 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.94;
stage.append(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.48, 0.46, 0.14);
composer.addPass(bloom);
composer.addPass(new OutputPass());

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(COUNT * 3);
const seeds = new Float32Array(COUNT * 4);
const colors = new Float32Array(COUNT * 3);

const colorA = new THREE.Color('#82f7ff');
const colorB = new THREE.Color('#ff77d9');
const colorC = new THREE.Color('#ffe76a');
const tempColor = new THREE.Color();

for (let i = 0; i < COUNT; i += 1) {
  const i3 = i * 3;
  const i4 = i * 4;
  const r = Math.sqrt(Math.random());
  const theta = Math.random() * Math.PI * 2;
  const arm = (i % 7) / 7;
  const jitter = Math.random();

  positions[i3] = Math.cos(theta) * r;
  positions[i3 + 1] = Math.sin(theta) * r;
  positions[i3 + 2] = (Math.random() - 0.5) * 2;

  seeds[i4] = r;
  seeds[i4 + 1] = theta;
  seeds[i4 + 2] = arm;
  seeds[i4 + 3] = jitter;

  tempColor.copy(colorA).lerp(colorB, Math.sin(theta * 2 + r * 4) * 0.5 + 0.5).lerp(colorC, arm * 0.25);
  colors[i3] = tempColor.r;
  colors[i3 + 1] = tempColor.g;
  colors[i3 + 2] = tempColor.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

const material = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uMode: { value: 0 },
    uPointer: { value: pointer },
    uPointerActive: { value: 0 },
    uShockOrigin: { value: new THREE.Vector2(0.5, 0.5) },
    uShockAge: { value: 40 },
    uShockPower: { value: 0 },
    uPaletteShift: { value: 0 },
    uAudioLevel: { value: 0 },
    uAudioBass: { value: 0 },
    uTint: { value: currentTint },
    uPaletteA: { value: currentPaletteA },
    uPaletteB: { value: currentPaletteB },
    uPaletteC: { value: currentPaletteC },
    uFieldScale: { value: currentScale },
    uGravityScale: { value: currentGravity },
    uMotion: { value: currentMotion },
    uIntensity: { value: 1 },
  },
  vertexShader: `
    attribute vec4 aSeed;
    attribute vec3 aColor;
    varying vec3 vColor;
    varying float vAlpha;
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uMode;
    uniform vec2 uPointer;
    uniform float uPointerActive;
    uniform vec2 uShockOrigin;
    uniform float uShockAge;
    uniform float uShockPower;
    uniform float uPaletteShift;
    uniform float uAudioLevel;
    uniform float uAudioBass;
    uniform vec3 uTint;
    uniform vec3 uPaletteA;
    uniform vec3 uPaletteB;
    uniform vec3 uPaletteC;
    uniform float uFieldScale;
    uniform float uGravityScale;
    uniform float uMotion;
    uniform float uIntensity;

    mat2 rotate2d(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
    }

    vec3 halo(vec4 seed) {
      float t = uTime * uMotion;
      float angle = seed.y + t * (0.08 + seed.z * 0.16);
      float radius = 2.2 + seed.x * 5.4 + sin(seed.y * 3.0 + t * 0.7) * 0.28;
      vec2 ring = vec2(cos(angle), sin(angle)) * radius;
      float lift = sin(seed.y * 5.0 + t * 0.9 + seed.w * 8.0) * 1.35;
      return vec3(ring.x, lift + (seed.z - 0.5) * 2.1, ring.y * 0.58);
    }

    vec3 neural(vec4 seed) {
      float time = uTime * uMotion;
      float lane = floor(seed.z * 7.0);
      float t = seed.x * 2.0 - 1.0;
      float angle = lane * 0.9 + sin(seed.y + time * 0.22) * 0.72;
      vec2 wave = vec2(t * 7.6, sin(t * 8.0 + seed.y + time * 1.35) * 1.8);
      wave *= rotate2d(angle);
      float z = cos(t * 6.5 + seed.y + time) * 2.2 + (seed.z - 0.5) * 1.6;
      return vec3(wave.x, wave.y, z);
    }

    vec3 portal(vec4 seed) {
      float t = uTime * uMotion;
      float angle = seed.y + seed.x * 8.2 + t * (0.42 + seed.z * 0.2);
      float radius = 1.0 + seed.x * seed.x * 6.7;
      float tunnel = (seed.x - 0.5) * 12.0 + sin(t * 0.8 + seed.y) * 0.8;
      vec2 spiral = vec2(cos(angle), sin(angle)) * radius;
      return vec3(spiral.x, spiral.y, tunnel);
    }

    void main() {
      vec3 p0 = halo(aSeed);
      vec3 p1 = neural(aSeed);
      vec3 p2 = portal(aSeed);
      float m01 = smoothstep(0.0, 1.0, uMode);
      float m12 = smoothstep(1.0, 2.0, uMode);
      vec3 shaped = mix(mix(p0, p1, m01), p2, m12);
      shaped *= uFieldScale;
      shaped.xy *= 1.0 + uAudioBass * (0.06 + aSeed.x * 0.1);
      shaped.z += sin(aSeed.y * 12.0 + uTime * 5.0) * uAudioLevel * 0.9;

      vec2 pointerWorld = (uPointer - 0.5) * vec2(15.0, -9.0);
      vec2 delta = shaped.xy - pointerWorld;
      float d = length(delta);
      float gravity = exp(-d * 0.55) * uPointerActive * uGravityScale;
      shaped.xy += normalize(delta + 0.001) * gravity * (1.8 + aSeed.w * 2.5);
      shaped.z += gravity * sin(uTime * 2.0 + aSeed.y * 6.0) * 1.4;

      vec2 shockWorld = (uShockOrigin - 0.5) * vec2(15.0, -9.0);
      vec2 shockDelta = shaped.xy - shockWorld;
      float shockDistance = length(shockDelta);
      float shockRadius = uShockAge * 8.8;
      float shockFade = smoothstep(2.4, 0.0, uShockAge);
      float shockRing = exp(-abs(shockDistance - shockRadius) * 1.28) * shockFade * uShockPower;
      shaped.xy += normalize(shockDelta + 0.001) * shockRing * (1.55 + aSeed.w * 2.2);
      shaped.z += sin(shockDistance * 1.8 - uTime * 8.0 + aSeed.y) * shockRing * 1.45;

      shaped.xy *= rotate2d(sin(uTime * 0.1) * 0.1);
      vec4 mvPosition = modelViewMatrix * vec4(shaped, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      float twinkle = 0.68 + 0.32 * sin(uTime * (1.8 + aSeed.w * 2.4) + aSeed.y * 9.0);
      float depthFade = smoothstep(-12.0, 8.0, shaped.z);
      gl_PointSize = (1.8 + aSeed.w * 3.2 + gravity * 4.2 + shockRing * 5.2 + uAudioLevel * 3.8) * uPixelRatio * (15.0 / -mvPosition.z);
      vec3 shifted = 0.58 + 0.42 * cos(vec3(0.0, 2.1, 4.2) + aSeed.y + uPaletteShift * 6.2831);
      vec3 gradient = mix(uPaletteA, uPaletteB, smoothstep(-1.0, 1.0, sin(aSeed.y * 2.0 + aSeed.x * 5.0 + uPaletteShift * 4.0)));
      gradient = mix(gradient, uPaletteC, smoothstep(0.38, 1.0, aSeed.z + shockRing * 0.24 + uAudioBass * 0.18));
      vec3 spectral = mix(gradient, shifted, 0.12 + uAudioBass * 0.12);
      vColor = mix(spectral, spectral * aColor * 1.18, 0.16) * uTint * (0.82 + gravity * 1.35 + shockRing * 1.65 + uAudioLevel * 0.9 + uIntensity * 0.18);
      vAlpha = (0.26 + twinkle * 0.42 + shockRing * 0.24) * depthFade;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      float core = smoothstep(0.48, 0.0, d);
      float spark = smoothstep(0.12, 0.0, d);
      gl_FragColor = vec4(vColor * (core + spark * 1.6), vAlpha * core);
    }
  `,
});

const points = new THREE.Points(geometry, material);
scene.add(points);

const haloRing = new THREE.Mesh(
  new THREE.TorusGeometry(6.8, 0.012, 8, 180),
  new THREE.MeshBasicMaterial({ color: 0x8be9ff, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending }),
);
haloRing.rotation.x = Math.PI * 0.5;
scene.add(haloRing);

const clock = new THREE.Clock();

function setPreset(presetId, shouldPushState = true) {
  const nextPreset = PRESETS[presetId] || PRESETS.aurora;
  currentPreset = nextPreset;
  targetMode = nextPreset.mode;
  targetPaletteShift = nextPreset.palette;
  targetBloom = nextPreset.bloom;
  targetExposure = nextPreset.exposure;
  targetFog = nextPreset.fog;
  targetScale = nextPreset.scale;
  targetGravity = nextPreset.gravity;
  targetMotion = nextPreset.motion;
  targetTint.set(nextPreset.tint);
  targetRing.set(nextPreset.ring);
  fieldMode.textContent = nextPreset.label;
  presetButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.preset === presetId));

  if (shouldPushState) {
    const url = new URL(window.location.href);
    url.searchParams.set('preset', presetId);
    window.history.replaceState({}, '', url);
  }

  triggerShock(targetPointer.x, targetPointer.y, 0.7);
}

function setPalette(nextIndex, shouldPulse = true) {
  paletteIndex = (nextIndex + PALETTES.length) % PALETTES.length;
  currentPalette = PALETTES[paletteIndex];
  targetPaletteA.set(currentPalette.colors[0]);
  targetPaletteB.set(currentPalette.colors[1]);
  targetPaletteC.set(currentPalette.colors[2]);
  targetRing.set(currentPalette.ring);
  document.documentElement.style.setProperty('--glow-a', currentPalette.glows[0]);
  document.documentElement.style.setProperty('--glow-b', currentPalette.glows[1]);
  prismButton.querySelector('span').textContent = currentPalette.label;
  prismButton.setAttribute('aria-label', `Shift palette: ${currentPalette.label}`);
  prismButton.title = `Palette: ${currentPalette.label}`;

  if (shouldPulse) {
    targetPaletteShift = (targetPaletteShift + 0.18) % 1;
    triggerShock(targetPointer.x, targetPointer.y, 0.62);
  }
}

function updatePointer(clientX, clientY) {
  lastInteraction = clock.getElapsedTime();
  targetPointer.set(clientX / window.innerWidth, clientY / window.innerHeight);
  pointerActive = 1;
  gestureState.textContent = 'Distort';
}

function triggerShock(x = targetPointer.x, y = targetPointer.y, power = 1) {
  lastInteraction = clock.getElapsedTime();
  shockStart = clock.getElapsedTime();
  shockPower = Math.min(power, 1.12);
  material.uniforms.uShockOrigin.value.set(x, y);
  gestureState.textContent = 'Pulse';
  pulseButton.classList.add('is-flashing');
  window.setTimeout(() => pulseButton.classList.remove('is-flashing'), 260);
}

function shiftPrism() {
  setPalette(paletteIndex + 1);
  prismButton.classList.add('is-flashing');
  window.setTimeout(() => prismButton.classList.remove('is-flashing'), 260);
}

function beginPress(clientX, clientY) {
  updatePointer(clientX, clientY);
  isPressing = true;
  pressStart = clock.getElapsedTime();
  pointerActive = 1.15;
  gestureState.textContent = 'Hold';
}

function endPress(clientX, clientY) {
  if (!isPressing) return;
  updatePointer(clientX, clientY);
  const held = Math.min(clock.getElapsedTime() - pressStart, 1.8);
  isPressing = false;
  triggerShock(clientX / window.innerWidth, clientY / window.innerHeight, 0.42 + held * 0.34);
}

async function enableAudio() {
  if (audioReady) {
    audioReady = false;
    audioButton.classList.remove('is-active');
    gestureState.textContent = 'Drift';
    return;
  }

  try {
    audioContext = audioContext || new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.82;
    source.connect(analyser);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    audioReady = true;
    audioButton.classList.add('is-active');
    triggerShock(0.5, 0.5, 0.86);
  } catch {
    gestureState.textContent = 'Audio denied';
    audioButton.classList.remove('is-active');
  }
}

function updateAudio() {
  if (!audioReady || !analyser) {
    audioLevel *= 0.92;
    audioBass *= 0.9;
    return;
  }

  analyser.getByteFrequencyData(frequencyData);
  let total = 0;
  let bass = 0;
  const bassBins = 18;
  for (let i = 0; i < frequencyData.length; i += 1) {
    const value = frequencyData[i] / 255;
    total += value;
    if (i < bassBins) bass += value;
  }
  const nextLevel = Math.min(1, total / frequencyData.length * 2.6);
  const nextBass = Math.min(1, bass / bassBins * 3.2);
  audioLevel += (nextLevel - audioLevel) * 0.18;
  audioBass += (nextBass - audioBass) * 0.2;
  gestureState.textContent = audioBass > 0.32 ? 'Audio peak' : 'Audio live';
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.position.z = width < 760 ? 19 : 16;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setSize(width, height);
  composer.setSize(width, height);
  bloom.setSize(width, height);
  material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
}

function animate() {
  const elapsed = clock.getElapsedTime();
  updateAudio();
  const idleTime = elapsed - lastInteraction;
  if (!audioReady && idleTime > 4) {
    targetPointer.set(0.5 + Math.cos(elapsed * 0.13) * 0.16, 0.5 + Math.sin(elapsed * 0.1) * 0.12);
    pointerActive = Math.max(pointerActive, 0.1);
    gestureState.textContent = 'Auto drift';
  }
  if (isPressing) {
    const charge = Math.min(elapsed - pressStart, 1.8) / 1.8;
    pointerActive = Math.max(pointerActive, 0.82 + charge * 0.28);
    gestureState.textContent = charge > 0.72 ? 'Charged' : 'Hold';
  }
  currentMode += (targetMode - currentMode) * 0.045;
  paletteShift += (targetPaletteShift - paletteShift) * 0.05;
  currentBloom += (targetBloom - currentBloom) * 0.045;
  currentExposure += (targetExposure - currentExposure) * 0.045;
  currentFog += (targetFog - currentFog) * 0.045;
  currentScale += (targetScale - currentScale) * 0.045;
  currentGravity += (targetGravity - currentGravity) * 0.045;
  currentMotion += (targetMotion - currentMotion) * 0.045;
  currentTint.lerp(targetTint, 0.045);
  currentPaletteA.lerp(targetPaletteA, 0.055);
  currentPaletteB.lerp(targetPaletteB, 0.055);
  currentPaletteC.lerp(targetPaletteC, 0.055);
  pointer.lerp(targetPointer, 0.075);
  pointerActive *= 0.965;
  const shockAge = elapsed - shockStart;
  const liveShock = Math.max(0, shockPower * (1 - shockAge / 2.2));

  material.uniforms.uTime.value = elapsed;
  material.uniforms.uMode.value = currentMode;
  material.uniforms.uPointerActive.value = pointerActive;
  material.uniforms.uShockAge.value = shockAge;
  material.uniforms.uShockPower.value = shockPower;
  material.uniforms.uPaletteShift.value = paletteShift;
  material.uniforms.uAudioLevel.value = audioLevel;
  material.uniforms.uAudioBass.value = audioBass;
  material.uniforms.uFieldScale.value = currentScale;
  material.uniforms.uGravityScale.value = currentGravity;
  material.uniforms.uMotion.value = currentMotion;
  material.uniforms.uIntensity.value = 0.68 + Math.sin(elapsed * 0.55) * 0.08 + liveShock * 0.32 + audioLevel * 0.22;
  renderer.toneMappingExposure = currentExposure;
  scene.fog.density = currentFog;

  points.rotation.y = Math.sin(elapsed * 0.12) * 0.16;
  points.rotation.x = Math.cos(elapsed * 0.1) * 0.07;
  haloRing.rotation.z = elapsed * 0.08;
  haloRing.material.opacity = 0.08 + Math.sin(elapsed * 0.8) * 0.025 + liveShock * 0.12;
  haloRing.material.color.lerp(targetRing, 0.045);
  bloom.strength = currentBloom + liveShock * 0.26 + audioBass * 0.2;
  camera.position.x += ((pointer.x - 0.5) * 1.1 - camera.position.x) * 0.025;
  camera.position.y += ((0.5 - pointer.y) * 0.75 + 0.5 - camera.position.y) * 0.025;
  camera.lookAt(0, 0, 0);

  if (!audioReady && pointerActive < 0.04 && liveShock < 0.03) {
    gestureState.textContent = 'Drift';
  }

  composer.render();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
window.addEventListener('pointermove', (event) => updatePointer(event.clientX, event.clientY));
window.addEventListener('pointerdown', (event) => {
  beginPress(event.clientX, event.clientY);
});
window.addEventListener('pointerup', (event) => {
  endPress(event.clientX, event.clientY);
});
window.addEventListener('pointercancel', (event) => {
  endPress(event.clientX, event.clientY);
});
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    triggerShock(0.5, 0.5, 0.92);
  }
  if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'].includes(event.code)) {
    const presetId = Object.keys(PRESETS)[Number(event.code.replace('Digit', '')) - 1];
    setPreset(presetId);
  }
  if (event.code === 'KeyC') {
    shiftPrism();
  }
});
presetButtons.forEach((button) => button.addEventListener('click', () => setPreset(button.dataset.preset)));
pulseButton.addEventListener('click', () => triggerShock(0.5, 0.5, 0.82));
prismButton.addEventListener('click', shiftPrism);
audioButton.addEventListener('click', enableAudio);

const initialPreset = new URLSearchParams(window.location.search).get('preset');
setPreset(PRESETS[initialPreset] ? initialPreset : 'aurora', false);
setPalette(0, false);
resize();
animate();
