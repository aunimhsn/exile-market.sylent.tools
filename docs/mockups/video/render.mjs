// Renders a composition of docs/mockups/video/ to a video, frame by frame: the page gives
// window.compose = { duration, seek(t) }, so that the result never depends on the speed of the machine.
//   node docs/mockups/video/render.mjs <composition> <lang> [--fps 30] [--size 1280x720] [--max-mb 3] [--from s --to s]
// The mock-up server must run on the port of the project (docs/technical-choices.md).
import { spawn } from "node:child_process";
import { statSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const { chromium } = createRequire(`${root}/package.json`)("playwright");
const [composition, lang, ...rest] = process.argv.slice(2);
const option = (name, fallback) => {
  const at = rest.indexOf(`--${name}`);
  return at < 0 ? fallback : rest[at + 1];
};
const fps = Number(option("fps", 30));
const [width, height] = option("size", "1280x720").split("x").map(Number);
const maxMb = Number(option("max-mb", 3));
const out = `${root}/outputs/2026-11-06-video/renders`;
mkdirSync(out, { recursive: true });
const master = `${out}/${composition}-${lang}.master.mkv`;
const final = `${out}/${composition}-${lang}.mp4`;
const poster = `${out}/${composition}-${lang}.jpg`;

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--disable-gpu-vsync", "--hide-scrollbars"] });
const page = await browser.newPage({ viewport: { width, height } });
page.on("pageerror", error => console.error("PAGE ERROR", error.message));
page.on("console", message => { if (message.type() === "error") console.error("CONSOLE", message.text()); });
await page.goto(`http://127.0.0.1:8770/docs/mockups/video/${composition}.html?lang=${lang}&render=1`, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.compose?.ready === true, null, { timeout: 120000 });
const duration = await page.evaluate(() => window.compose.duration);
const from = Number(option("from", 0));
const to = Math.min(Number(option("to", duration)), duration);
const frames = Math.round((to - from) * fps);
const ffmpeg = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "png", "-i", "-", "-c:v", "libx264", "-preset", "veryfast", "-crf", "10", "-pix_fmt", "yuv420p", master], { stdio: ["pipe", "inherit", "inherit"] });
const started = Date.now();
for (let frame = 0; frame < frames; frame += 1) {
  const t = from + frame / fps;
  await page.evaluate(time => window.compose.seek(time), t);
  const image = await page.screenshot({ type: "png" });
  if (!ffmpeg.stdin.write(image)) await new Promise(done => ffmpeg.stdin.once("drain", done));
  if (frame === Math.round(frames * 0.55)) await page.screenshot({ path: poster, type: "jpeg", quality: 85 });
  if (frame % 60 === 0) console.log(`${composition}-${lang} ${frame}/${frames} ${Math.round((Date.now() - started) / 1000)} s`);
}
ffmpeg.stdin.end();
await new Promise(done => ffmpeg.on("close", done));
await browser.close();

// Two passes at the bit rate that fits the ceiling.
const seconds = to - from;
const bitrate = Math.floor((maxMb * 8 * 1000 * 0.93) / seconds);
const pass = (number, target) => new Promise((done, fail) => {
  spawn("ffmpeg", ["-y", "-loglevel", "error", "-i", master, "-an", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p", "-b:v", `${bitrate}k`, "-maxrate", `${Math.round(bitrate * 2)}k`, "-bufsize", `${Math.round(bitrate * 3)}k`, "-pass", String(number), "-passlogfile", `${master}.pass`, "-movflags", "+faststart", ...(number === 1 ? ["-f", "null"] : []), target], { stdio: "inherit" })
    .on("close", code => code === 0 ? done() : fail(new Error(`ffmpeg pass ${number}: ${code}`)));
});
await pass(1, "/dev/null");
await pass(2, final);
// The same video in WebM (VP9), for the browsers without H.264: two passes too, since the particles
// make one pass overshoot the ceiling four times.
const webm = (number, target) => new Promise((done, fail) => {
  spawn("ffmpeg", ["-y", "-loglevel", "error", "-i", master, "-an", "-c:v", "libvpx-vp9", "-b:v", `${Math.floor(bitrate * 0.95)}k`, "-deadline", "good", "-cpu-used", "2", "-row-mt", "1", "-pix_fmt", "yuv420p", "-pass", String(number), "-passlogfile", `${master}.vp9`, ...(number === 1 ? ["-f", "null"] : []), target], { stdio: "inherit" })
    .on("close", code => code === 0 ? done() : fail(new Error(`ffmpeg webm pass ${number}: ${code}`)));
});
await webm(1, "/dev/null");
await webm(2, final.replace(".mp4", ".webm"));
rmSync(`${master}.vp9-0.log`, { force: true });
rmSync(`${master}.pass-0.log`, { force: true });
rmSync(`${master}.pass-0.log.mbtree`, { force: true });
console.log(`DONE ${final} ${seconds.toFixed(1)} s ${(statSync(final).size / 1e6).toFixed(2)} MB in ${Math.round((Date.now() - started) / 1000)} s`);
