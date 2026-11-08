// What the six compositions share: the assets, the texts, the time, the fonts and the page frame.
// A composition is a function of the time only, so that a frame comes out the same at any speed.
export const params = new URLSearchParams(location.search);
export const lang = params.get("lang") === "en" ? "en" : "fr";
export const isRender = params.has("render");
export const ASSETS = `../../../outputs/2026-11-06-video/assets/${lang}`;
export const WIDTH = 1280;
export const HEIGHT = 720;
export const BLOOD = "#a80f18";
export const RED = "#e5383b";
export const EMBLEM = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"12 12 76 76\" fill=\"#ffffff\"> <defs> <path id=\"blade\" d=\"M50 13 L54.6 21 L50 31 L45.4 21 Z\"/> <path id=\"small-blade\" d=\"M50 14 L53 22 L50 28 L47 22 Z\"/> </defs> <circle cx=\"50\" cy=\"50\" r=\"28\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"5\"/> <circle cx=\"50\" cy=\"50\" r=\"21.5\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"1.5\" opacity=\".55\"/> <use href=\"#blade\"/> <use href=\"#blade\" transform=\"rotate(90 50 50)\"/> <use href=\"#blade\" transform=\"rotate(180 50 50)\"/> <use href=\"#blade\" transform=\"rotate(270 50 50)\"/> <use href=\"#small-blade\" transform=\"rotate(45 50 50)\"/> <use href=\"#small-blade\" transform=\"rotate(135 50 50)\"/> <use href=\"#small-blade\" transform=\"rotate(225 50 50)\"/> <use href=\"#small-blade\" transform=\"rotate(315 50 50)\"/> <path d=\"M50 39 L58 50 L50 61 L42 50 Z\"/> </svg>";

export const TEXT = {
  fr: { item: "Un objet.", key: "Un raccourci.", price: "Son prix.", offers: "Les offres.", offersNote: "Une recherche par clic.", filters: "Les filtres.", filtersNote: "Vous affinez, vous relancez.", settings: "Les réglages.", settingsNote: "Français ou anglais, et votre raccourci.", marketNote: "Le prix du marché, sans quitter le jeu.", name: "Exile Market", tagline: "Pour Path of Exile 2" },
  en: { item: "One item.", key: "One shortcut.", price: "Its price.", offers: "The offers.", offersNote: "One search per click.", filters: "The filters.", filtersNote: "Refine, then search again.", settings: "The settings.", settingsNote: "English or French, and your shortcut.", marketNote: "The market price, without leaving the game.", name: "Exile Market", tagline: "For Path of Exile 2" },
}[lang];

export const clamp = (value, low = 0, high = 1) => Math.min(high, Math.max(low, value));
export const mix = (a, b, t) => a + (b - a) * t;
export const span = (t, from, to) => clamp((t - from) / (to - from));
export const smooth = t => t * t * (3 - 2 * t);
export const outCubic = t => 1 - (1 - t) ** 3;
export const outExpo = t => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));
export const inCubic = t => t * t * t;
export const inOut = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
export const outBack = t => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;
// A window in time: fades in over `fade`, out over `fade`.
export const pulse = (t, from, to, fade = 0.15) => Math.min(span(t, from, from + fade), 1 - span(t, to - fade, to));

// A small generator with a seed: the same shards at each frame and on each machine.
export function random(seed = 1) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let z = state;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

export const loadImage = url => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error(`Can't load ${url}`));
  image.src = url;
});
export const still = name => loadImage(`${ASSETS}/${name}.png`);

// A recording as a sequence of images at 30 images per second, kept in memory once read. The number of
// images of each one is in frames.json, written when they are extracted.
const counts = await fetch(`${ASSETS}/frames.json`).then(answer => answer.json());
export class Recording {
  constructor(name) {
    this.name = name;
    this.frames = counts[name];
    this.cache = new Map();
  }
  async at(seconds) {
    const number = clamp(Math.round(seconds * 30) + 1, 1, this.frames);
    if (!this.cache.has(number)) {
      this.cache.set(number, await loadImage(`${ASSETS}/frames/${this.name}/${String(number).padStart(4, "0")}.jpg`));
      if (this.cache.size > 12) this.cache.delete(this.cache.keys().next().value);
    }
    return this.cache.get(number);
  }
}

export function fonts() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=JetBrains+Mono:wght@600&family=Manrope:wght@600;800&display=block";
  document.head.append(link);
  return new Promise(resolve => { link.onload = resolve; }).then(() => Promise.all([
    document.fonts.load("800 80px Manrope", "Un objet éÉ"),
    document.fonts.load("600 40px Manrope", "Un objet éÉ"),
    document.fonts.load("italic 500 40px 'Cormorant Garamond'", "Un objet é"),
    document.fonts.load("600 30px 'JetBrains Mono'", "Ctrl + D"),
  ]));
}

// Gives the page its frame and the renderer its entry point; opened in a browser, it plays in a loop.
export function compose(duration, seek) {
  document.documentElement.style.cssText = "margin:0;background:#000;overflow:hidden";
  document.body.style.cssText = "margin:0;background:#000;overflow:hidden";
  window.compose = { duration, seek, ready: true };
  if (!isRender) {
    const at = params.get("t");
    if (at !== null) { seek(Number(at)); return; }
    const started = performance.now();
    let busy = false;
    const loop = async now => {
      if (!busy) {
        busy = true;
        await seek(((now - started) / 1000) % duration);
        busy = false;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// The stage: a frame of 1280 × 720 where the texts are placed, scaled to the window when watched live.
export function stage() {
  const element = document.createElement("div");
  element.style.cssText = `position:absolute;left:0;top:0;width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;background:#0a0a0a;color:#fff;font-family:Manrope,sans-serif;transform-origin:0 0`;
  const fit = () => { element.style.transform = `scale(${Math.min(innerWidth / WIDTH, innerHeight / HEIGHT)})`; };
  fit();
  addEventListener("resize", fit);
  document.body.append(element);
  return element;
}
