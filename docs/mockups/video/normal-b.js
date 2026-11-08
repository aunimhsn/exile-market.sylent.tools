// Normal B, « Visite guidée »: the window in a calm 3D space, over the grid and the white shards of the
// page, each screen turning to the next. Same world as the first screen of the site.
import * as THREE from "three";
import { compose, stage, fonts, still, TEXT, RED, WIDTH, HEIGHT, span, smooth, inOut, pulse, mix, random, outCubic } from "./lib.js";

await fonts();
const root = stage();
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(WIDTH, HEIGHT);
root.append(renderer.domElement);
root.insertAdjacentHTML("beforeend", `
  <style>
    .cap { position:absolute; left:46px; top:290px; width:480px; text-shadow:0 2px 16px #000; }
    .cap b { display:block; font:800 50px/1.05 Manrope; letter-spacing:-.045em; }
    .cap i { display:block; margin-top:4px; font:italic 500 32px 'Cormorant Garamond'; color:#d6d6d6; }
    .black { position:absolute; inset:0; background:#000; }
  </style>
  <div class="cap" id="c0"><b style="color:${RED}">${TEXT.price}</b><i>${TEXT.marketNote}</i></div>
  <div class="cap" id="c1"><b>${TEXT.offers}</b><i>${TEXT.offersNote}</i></div>
  <div class="cap" id="c2"><b>${TEXT.filters}</b><i>${TEXT.filtersNote}</i></div>
  <div class="cap" id="c3"><b>${TEXT.settings}</b><i>${TEXT.settingsNote}</i></div>
  <div class="black" id="black"></div>`);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);
scene.fog = new THREE.Fog(0x0a0a0a, 14, 46);
const camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 0.1, 200);

const texture = image => {
  const map = new THREE.Texture(image);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = renderer.capabilities.getMaxAnisotropy();
  map.needsUpdate = true;
  return map;
};
const images = await Promise.all(["s-unique", "s-list", "s-filters2", "s-settings"].map(still));
const maps = images.map(texture);
// 840 × 1440 pixels: one unit of the scene is 100 pixels.
const panel = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 14.4), new THREE.MeshBasicMaterial({ map: maps[0] }));
const backing = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 14.5), new THREE.MeshBasicMaterial({ color: 0x2a2a2a }));
backing.position.z = -0.02;
const group = new THREE.Group();
group.add(panel, backing);
scene.add(group);

const grid = new THREE.GridHelper(200, 100, 0x3a3a3a, 0x242424);
grid.position.y = -7.6;
scene.add(grid);

const rand = random(7);
const SHARDS = 150;
const shards = new THREE.InstancedMesh(new THREE.OctahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.5, flatShading: true }), SHARDS);
const seeds = Array.from({ length: SHARDS }, () => ({
  p: new THREE.Vector3((rand() * 2 - 1) * 26, (rand() * 2 - 1) * 12, -6 - rand() * 24),
  s: 0.05 + rand() ** 3 * 0.42,
  r: new THREE.Vector3(rand(), rand(), rand()),
  o: rand() * 6.28,
}));
scene.add(shards, new THREE.AmbientLight(0xffffff, 0.9));
const light = new THREE.DirectionalLight(0xffffff, 2.2);
light.position.set(4, 8, 10);
scene.add(light);
const dummy = new THREE.Object3D();

// Where the camera looks on the window, in pixels from its top: price, list, filters, settings.
const STOPS = [
  { from: 0, to: 3.6, y: 500, wide: 8.6 },
  { from: 3.6, to: 7.2, y: 890, wide: 8.6 },
  { from: 7.2, to: 10.8, y: 560, wide: 8.6 },
  { from: 10.8, to: 14.2, y: 360, wide: 8.6 },
];
const DURATION = 14.2;
async function frame(t) {
  let index = STOPS.findIndex(stop => t < stop.to);
  if (index < 0) index = STOPS.length - 1;
  const stop = STOPS[index];
  const local = t - stop.from;
  const length = stop.to - stop.from;
  // Half a turn between two screens: the texture changes when the window is edge-on.
  const turnIn = index === 0 ? 1 : inOut(span(local, 0, 0.55));
  const turnOut = index === STOPS.length - 1 ? 0 : inOut(span(local, length - 0.55, length));
  panel.material.map = maps[index];
  group.rotation.y = (1 - turnIn) * -Math.PI / 2 + turnOut * Math.PI / 2 + Math.sin(t * 0.55) * 0.05;
  group.rotation.x = Math.sin(t * 0.4) * 0.012;
  const windowY = (stop.y - 720) / 100;
  group.position.set(3.2, windowY, 0);
  const distance = 16.6 - (local / length) * 1.2 + (1 - turnIn + turnOut) * 4;
  camera.position.set(Math.sin(t * 0.5) * 0.4, Math.cos(t * 0.4) * 0.15, distance);
  camera.lookAt(0, 0, 0);
  seeds.forEach((seed, i) => {
    dummy.position.copy(seed.p);
    dummy.position.y += Math.sin(t * 0.3 + seed.o) * 0.6;
    dummy.rotation.set(seed.r.x * t * 1.2 + seed.o, seed.r.y * t * 1.2, seed.r.z * t);
    dummy.scale.setScalar(seed.s);
    dummy.updateMatrix();
    shards.setMatrixAt(i, dummy.matrix);
  });
  shards.instanceMatrix.needsUpdate = true;
  renderer.render(scene, camera);
  STOPS.forEach((item, i) => {
    const caption = root.querySelector(`#c${i}`);
    const opacity = pulse(t, item.from + 0.55, item.to - 0.45, 0.25);
    caption.style.opacity = opacity;
    caption.style.transform = `translateY(${(1 - outCubic(opacity)) * 16}px)`;
  });
  root.querySelector("#black").style.opacity = Math.max(1 - span(t, 0, 0.35), span(t, DURATION - 0.5, DURATION - 0.05));
}
compose(DURATION, frame);
