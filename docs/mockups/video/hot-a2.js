// The Deck, reworked (owner, 2026-11-08): the video tells the headline in order. One item: a card with
// a real unique, slow enough to read its modifiers. One shortcut: Ctrl + D in 3D, in front of it. Its
// price: the card turns over, and its back is the real window of the application. Then the fan of cards
// and the name, unchanged. A card sober like the application: no frame and no image of the game.
import * as THREE from "three";
import { compose, stage, fonts, still, lang, TEXT, RED, EMBLEM, WIDTH, HEIGHT, span, clamp, inOut, outBack, outExpo, outCubic, inCubic, smooth, pulse, mix, random } from "./lib.js";

// The item is the one captured in the application for the price (s-headhunter.png).
const ITEM = {
  en: { name: "Headhunter", base: "Heavy Belt", mods: ["+52 to maximum Life", "+31 to Strength", "+33 to Dexterity", "When you kill a Rare monster, you gain its Modifiers for 60 seconds"] },
  fr: { name: "Chasseur de têtes", base: "Ceinture lourde", mods: ["+52 de Vie maximale", "+31 de Force", "+33 de Dextérité", "Lorsque vous Tuez un Monstre Rare, vous gagnez ses Modificateurs pendant 60 secondes"] },
}[lang];

// The times of the three acts, then of the fan and of the name.
const KEYS = 3.4;
const PRICE = KEYS + 1.65;
const FAN = 6.7;
const NAME = 9.3;
const DURATION = NAME + 1.6;
// The slow life of a word after it has landed: its growth, per second, and its descent, in pixels per second.
const WORD_GROWTH = 0.03;
const WORD_SINK = 6;

// The three words appear one at a time: they need no final period, unlike the sentence of the headline.
const word = text => text.replace(/\.$/, "");

await fonts();
const root = stage();
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(WIDTH, HEIGHT);
root.append(renderer.domElement);
root.insertAdjacentHTML("beforeend", `
  <style>
    .shade { position:absolute; left:0; top:0; width:100%; height:300px; background:linear-gradient(#000e 62%,#0000); }
    .word { position:absolute; left:0; width:100%; top:44px; text-align:center; font:800 136px/1 Manrope; letter-spacing:-.05em; text-transform:uppercase; white-space:nowrap; text-shadow:0 6px 44px #000,0 0 18px #000; }
    .end { position:absolute; inset:0; display:grid; place-content:center; justify-items:center; gap:14px; }
    .end svg { width:92px; height:92px; }
    .end b { font:800 92px/1 Manrope; letter-spacing:-.05em; text-transform:uppercase; }
    .end span { font:italic 500 38px 'Cormorant Garamond'; color:#d8d8d8; }
    .black { position:absolute; inset:0; background:#000; }
  </style>
  <div class="shade" id="shade"></div>
  <div class="word" id="w0">${word(TEXT.item)}</div>
  <div class="word" id="w1">${word(TEXT.key)}</div>
  <div class="word" id="w2" style="color:${RED}">${word(TEXT.price)}</div>
  <div class="black" id="veil"></div>
  <div class="end" id="end">${EMBLEM}<b>${TEXT.name}</b><span>${TEXT.tagline}</span></div>
  <div class="black" id="black"></div>`);
const $ = id => root.querySelector(`#${id}`);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.Fog(0x050505, 20, 62);
const camera = new THREE.PerspectiveCamera(32, WIDTH / HEIGHT, 0.1, 300);
const names = ["s-headhunter", "s-list", "s-filters", "s-empty", "s-tooltip", "s-settings", "s-currency", "s-filters2", "s-league", "s-unique2", "s-rare"];
const images = await Promise.all(names.map(still));
const texture = image => {
  const map = new THREE.Texture(image);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = renderer.capabilities.getMaxAnisotropy();
  map.needsUpdate = true;
  return map;
};
const rimMaterial = new THREE.MeshBasicMaterial({ color: 0xa80f18 });
const cardGeometry = new THREE.PlaneGeometry(8.4, 14.4);
const rimGeometry = new THREE.PlaneGeometry(8.56, 14.56);
const cards = images.map(image => {
  const group = new THREE.Group();
  const map = texture(image);
  const face = new THREE.Mesh(cardGeometry, new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide }));
  const rim = new THREE.Mesh(rimGeometry, rimMaterial);
  rim.position.z = -0.03;
  const mirror = new THREE.Mesh(cardGeometry, new THREE.MeshBasicMaterial({ map, transparent: true, opacity: 0.11, side: THREE.DoubleSide }));
  mirror.scale.y = -1;
  mirror.position.y = -14.5;
  group.add(face, rim, mirror);
  scene.add(group);
  return group;
});
const floor = new THREE.GridHelper(240, 120, 0x571014, 0x2a0c0e);
floor.position.y = -7.3;
scene.add(floor);

// The face of the item, drawn on a canvas at the size of a window of the application (840 × 1440): its
// lines appear one after the other, so that the eye reads them in order.
const ITEM_SCALE = 2;
const itemCanvas = document.createElement("canvas");
itemCanvas.width = 840 * ITEM_SCALE;
itemCanvas.height = 1440 * ITEM_SCALE;
const itemContext = itemCanvas.getContext("2d");
const wrap = (text, width) => text.split(" ").reduce((lines, word) => {
  const candidate = `${lines[lines.length - 1]} ${word}`.trim();
  if (itemContext.measureText(candidate).width <= width) lines[lines.length - 1] = candidate;
  else lines.push(word);
  return lines;
}, [""]);
const ITEM_LEFT = 56;
const ITEM_WIDTH = 728;
function drawItem(t) {
  const c = itemContext;
  c.setTransform(ITEM_SCALE, 0, 0, ITEM_SCALE, 0, 0);
  c.globalAlpha = 1;
  c.fillStyle = "#151a21";
  c.fillRect(0, 0, 840, 1440);
  c.textBaseline = "alphabetic";
  const show = at => { c.globalAlpha = span(t, at, at + 0.22); };
  show(0.55);
  c.fillStyle = "#c8702f";
  c.font = "800 68px Manrope";
  c.fillText(ITEM.name, ITEM_LEFT, 214);
  show(0.68);
  c.fillStyle = "#9aa3ae";
  c.font = "600 38px Manrope";
  c.fillText(ITEM.base, ITEM_LEFT, 268);
  c.fillStyle = "#2c3440";
  c.fillRect(ITEM_LEFT, 300, ITEM_WIDTH, 2);
  c.fillStyle = "#e8edf3";
  c.font = "600 40px Manrope";
  let y = 366;
  ITEM.mods.forEach((mod, index) => {
    show(0.85 + index * 0.24);
    for (const line of wrap(mod, ITEM_WIDTH)) {
      c.fillText(line, ITEM_LEFT, y);
      y += 52;
    }
    y += 14;
  });
  c.globalAlpha = 1;
}
drawItem(99);
const itemMap = new THREE.CanvasTexture(itemCanvas);
itemMap.colorSpace = THREE.SRGBColorSpace;
itemMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
const hero = new THREE.Group();
const heroFront = new THREE.Mesh(cardGeometry, new THREE.MeshBasicMaterial({ map: itemMap }));
heroFront.position.z = 0.03;
const heroBack = new THREE.Mesh(cardGeometry, new THREE.MeshBasicMaterial({ map: texture(images[0]) }));
heroBack.position.z = -0.03;
heroBack.rotation.y = Math.PI;
const heroRim = new THREE.Mesh(rimGeometry, new THREE.MeshBasicMaterial({ color: 0xa80f18, side: THREE.DoubleSide }));
hero.add(heroFront, heroBack, heroRim);
scene.add(hero);

// The keys, with their letter drawn on a canvas.
const keyFace = text => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const c = canvas.getContext("2d");
  c.fillStyle = "#f4f4f4";
  c.fillRect(0, 0, 512, 512);
  c.fillStyle = "#0a0a0a";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.font = text.length > 1 ? "800 170px Manrope" : "800 280px Manrope";
  c.fillText(text, 256, 268);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  return map;
};
const keyMaterial = new THREE.MeshStandardMaterial({ color: 0xb8b8b8, metalness: 0.2, roughness: 0.5 });
const makeKey = text => new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 1.4), [keyMaterial, keyMaterial, keyMaterial, keyMaterial, new THREE.MeshBasicMaterial({ map: keyFace(text) }), keyMaterial]);
const keyCtrl = makeKey("Ctrl");
const keyD = makeKey("D");
scene.add(keyCtrl, keyD, new THREE.AmbientLight(0xffffff, 0.8));
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5, 8, 12);
scene.add(sun);
const ring = new THREE.Mesh(new THREE.RingGeometry(0.96, 1, 96), new THREE.MeshBasicMaterial({ color: 0xe5383b, transparent: true, side: THREE.DoubleSide, fog: false }));
scene.add(ring);

const rand = random(11);
const offsets = cards.map(() => rand() * 0.6 - 0.3);
const COUNT = cards.length;
let drawnReveal = null;

// Where the camera stands and looks, in each of the two moments in front of the hero card.
// The keys stand low enough to stay clear of the word above them.
const KEY_HEIGHT = -1;
// The item is framed so that its name stays clear of the fade under the word, as on the price.
const ITEM_HEIGHT = 7.2 - 3.12;
// The price is framed so that the name of the item stays readable under the word.
const PRICE_HEIGHT = 7.2 - 2.36;
async function frame(t) {
  // The face of the item is drawn again only while its lines appear.
  const reveal = clamp(t, 0.5, 1.9);
  if (reveal !== drawnReveal) {
    drawItem(reveal < 1.9 ? reveal : 99);
    itemMap.needsUpdate = true;
    drawnReveal = reveal;
  }

  // The hero card lands, stays dim behind the keys, and turns over on the press.
  const inFan = t >= FAN;
  hero.visible = !inFan;
  const land = outExpo(span(t, 0.05, 0.6));
  const flip = inOut(span(t, KEYS + 1.05, KEYS + 1.65));
  hero.position.z = mix(-26, 0, land);
  hero.rotation.y = mix(-1, 0, land) + flip * Math.PI;
  const dim = 1 - 0.75 * smooth(span(t, KEYS, KEYS + 0.3)) * (1 - span(t, KEYS + 1.05, KEYS + 1.5));
  heroFront.material.color.setScalar(dim);
  heroBack.material.color.setScalar(dim);
  heroRim.material.color.setRGB((0xa8 / 255) * dim, (0x0f / 255) * dim, (0x18 / 255) * dim);

  // The fan of cards, opened by a hard cut after the price.
  const opened = outBack(span(t, FAN, FAN + 0.7));
  const closing = inOut(span(t, NAME - 0.8, NAME + 0.1));
  const speed = 0.2 + inCubic(span(t, FAN + 0.4, NAME - 0.8)) * 4.2 + Math.max(0, t - FAN) * 0.3;
  cards.forEach((card, index) => {
    const angle = (index / COUNT) * Math.PI * 2 + speed;
    const radius = 25 * opened * (1 - closing);
    card.position.set(Math.sin(angle) * radius, offsets[index] * (1 - closing), Math.cos(angle) * radius - 6);
    card.rotation.y = angle * (1 - closing);
    card.scale.setScalar(Math.max(0.001, span(t, FAN, FAN + 0.2)) * (1 - closing * 0.5));
    card.visible = inFan && t < NAME + 0.2;
  });

  // The keys fall, sink at the press, then leave: the timing of the first version.
  const pressCtrl = pulse(t, KEYS + 0.45, KEYS + 2, 0.08);
  const pressD = pulse(t, KEYS + 0.86, KEYS + 1.2, 0.06);
  const keysAway = inCubic(span(t, KEYS + 1, KEYS + 1.55));
  const enter = outExpo(span(t, KEYS + 0.1, KEYS + 0.5));
  keyCtrl.position.set(-2.8, KEY_HEIGHT + (1 - enter) * 9 - keysAway * 18, 6 - pressCtrl * 0.6);
  keyD.position.set(2.8, KEY_HEIGHT + (1 - enter) * 9 - keysAway * 18, 6 - pressD * 0.6);
  keyCtrl.rotation.x = keyD.rotation.x = -0.25;
  keyCtrl.rotation.y = 0.14;
  keyD.rotation.y = -0.14;
  keyCtrl.visible = keyD.visible = t >= KEYS + 0.1 && t < KEYS + 1.6;

  // A shock wave at the press, and one when the fan opens.
  const waveAge = inFan ? span(t, FAN, FAN + 0.95) : span(t, KEYS + 0.95, KEYS + 1.6);
  ring.visible = waveAge > 0 && waveAge < 1;
  ring.scale.setScalar(0.2 + outCubic(waveAge) * 34);
  ring.position.set(0, 0, inFan ? 11 : 3);
  ring.material.opacity = 1 - waveAge;

  if (inFan) {
    const near = closing;
    const away = mix(26, 44, outCubic(span(t, FAN, NAME - 0.8)));
    camera.position.set(Math.sin(t * 0.7) * 4 * (1 - near), mix(2.4, 0.5, near) + Math.sin(t) * 0.4, mix(away, 48, near));
    camera.lookAt(0, mix(0, 0.5, near), 0);
  } else {
    // In front of the item, back for the keys, then close on the price.
    const jolt = (1 - span(t, 0.55, 0.85)) * span(t, 0.5, 0.55) * Math.sin(t * 70) * 0.06;
    const toKeys = outExpo(span(t, KEYS, KEYS + 0.35));
    const toPrice = inOut(span(t, KEYS + 1.05, KEYS + 1.65));
    const close = Math.max(0, t - PRICE);
    const x = mix(mix(jolt, Math.sin((t - KEYS) * 0.7) * 1.2, toKeys), Math.sin(close * 9) * 0.03, toPrice);
    const y = mix(mix(ITEM_HEIGHT, 2.4 + Math.sin(t) * 0.4, toKeys), PRICE_HEIGHT, toPrice);
    const z = mix(mix(13.8 - Math.min(t, KEYS) * 0.12, 24, toKeys), 13.4 - close * 0.3, toPrice);
    camera.position.set(x, y, z);
    camera.lookAt(mix(0, 0, toPrice), mix(mix(ITEM_HEIGHT, 0, toKeys), PRICE_HEIGHT, toPrice), mix(mix(0, 6, toKeys), 0, toPrice));
  }
  renderer.render(scene, camera);

  const slam = (element, from, to) => {
    const age = span(t, from, from + 0.22);
    const opacity = t >= from && t < to ? 1 : 0;
    element.style.opacity = opacity;
    // Once it has landed, the word keeps growing slowly and sinks a little, at the same pace for the three.
    const settled = Math.max(0, t - from - 0.22);
    element.style.transform = `translateY(${settled * WORD_SINK}px) scale(${mix(1.5, 1, outExpo(age)) * (1 + settled * WORD_GROWTH)})`;
  };
  $("shade").style.opacity = t < FAN ? 1 : 0;
  // A short fade over a card, the word standing out of it; a longer one over the keys.
  const onCard = t < KEYS || t >= PRICE - 0.05;
  $("shade").style.height = onCard ? "218px" : "300px";
  $("shade").style.background = `linear-gradient(#000e ${onCard ? 88 : 62}%,#0000)`;
  slam($("w0"), 0.7, KEYS);
  slam($("w1"), KEYS + 0.05, KEYS + 1.35);
  slam($("w2"), PRICE - 0.05, FAN);
  $("end").style.opacity = span(t, NAME, NAME + 0.35) * (1 - span(t, NAME + 1.15, NAME + 1.55));
  $("veil").style.opacity = span(t, NAME - 0.1, NAME + 0.2) * 0.9;
  $("black").style.opacity = Math.max(1 - span(t, 0, 0.18), span(t, NAME + 1.15, NAME + 1.55));
}
compose(DURATION, frame);
