// The burst of white and red shards behind the first screen. They leave the center when the page
// is shown and at each click on a download button, then drift slowly. It stops once out of sight,
// and stays still when the visitor asked to reduce motion or when the machine can't follow.
// The named imports keep out of the bundle the parts of Three.js that aren't used.
import {
  AmbientLight,
  Color,
  DirectionalLight,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  OctahedronGeometry,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

const SHARDS = 420;
const SHARDS_ON_A_PHONE = 110;
const PHONE_WIDTH = 720;
const RED_EVERY = 5;
const WHITE = 0xffffff;

// The age given to a still image: every shard has long reached its place.
const AGE_WHEN_STILL = 99;

// Under this number of images per second over this many seconds, the burst becomes a still image.
const SLOWEST_RATE = 24;
const MEASURE_SECONDS = 3;
const MEASURE_FIRST_DELAY = 1500;
const MEASURE_AGAIN_DELAY = 500;

export function startBurst(canvas: HTMLCanvasElement, zone: HTMLElement): void {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    // The context was refused after all: the page stays whole without the burst.
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Read once and then followed by its event: read at every image, Chromium no longer sends it.
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reducedMotion = motionQuery.matches;
  let tooSlow = false;
  let inSight = true;
  const isStill = () => tooSlow || reducedMotion;

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 400);
  camera.position.z = 62;

  scene.add(new AmbientLight(WHITE, 1.1));
  const key = new DirectionalLight(WHITE, 2.4);
  key.position.set(20, 30, 40);
  scene.add(key);
  const heart = new PointLight(WHITE, 900, 90);
  scene.add(heart);

  const count = window.innerWidth <= PHONE_WIDTH ? SHARDS_ON_A_PHONE : SHARDS;
  const mesh = new InstancedMesh(
    new OctahedronGeometry(1, 0),
    new MeshStandardMaterial({
      metalness: 0.1,
      roughness: 0.5,
      flatShading: true,
      color: WHITE,
    }),
    count,
  );
  const shards = Array.from({ length: count }, () => ({
    direction: new Vector3().randomDirection(),
    distance: 16 + Math.random() * Math.random() * 62,
    size: 0.16 + Math.random() ** 3 * 1.3,
    spin: new Vector3(
      Math.random(),
      Math.random(),
      Math.random(),
    ).multiplyScalar(2.2),
    delay: Math.random() * 0.2,
  }));

  const blood = new Color(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent-deep")
      .trim(),
  );
  const white = new Color(WHITE);
  shards.forEach((_, index) => {
    mesh.setColorAt(index, index % RED_EVERY === 0 ? blood : white);
  });
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  scene.add(mesh);

  const placed = new Object3D();
  // Set by the first image: a tab opened in the background draws nothing until it is shown.
  let startedAt: number | undefined;
  let frame = 0;
  let measure = { from: 0, images: 0 };
  let mouse = { x: 0, y: 0 };

  // Never sooner than the first delay, while it runs.
  const measureAgain = () => {
    measure = {
      from: Math.max(measure.from, performance.now() + MEASURE_AGAIN_DELAY),
      images: 0,
    };
  };

  const showState = () => {
    canvas.dataset.state = isStill() ? "still" : inSight ? "running" : "paused";
  };

  const requestDraw = () => {
    if (!frame) frame = requestAnimationFrame(draw);
  };

  /** Whether the images of the last seconds came too slowly; a new measure starts after each. */
  const fellBehind = (now: number) => {
    if (now < measure.from) return false;
    measure.images += 1;
    const elapsed = now - measure.from;
    if (elapsed < MEASURE_SECONDS * 1000) return false;
    const rate = measure.images / MEASURE_SECONDS;
    measure = { from: now, images: 0 };
    return rate < SLOWEST_RATE;
  };

  function draw(now: number) {
    frame = 0;
    if (startedAt === undefined) {
      startedAt = now;
      measure = { from: now + MEASURE_FIRST_DELAY, images: 0 };
    }
    const still = isStill();
    const seconds = now / 1000;
    const age = still ? AGE_WHEN_STILL : (now - startedAt) / 1000;
    const turning = still ? 0 : seconds;

    shards.forEach((shard, index) => {
      const out = 1 - Math.exp(-3.4 * Math.max(0, age - shard.delay));
      const breath = still ? 0 : Math.sin(now / 2400 + index) * 0.9;
      placed.position
        .copy(shard.direction)
        .multiplyScalar(shard.distance * out + breath);
      placed.rotation.set(
        shard.spin.x * (turning + index),
        shard.spin.y * (turning + index),
        shard.spin.z * index,
      );
      placed.scale.setScalar(shard.size);
      placed.updateMatrix();
      mesh.setMatrixAt(index, placed.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.rotation.y = still ? 0.3 : now / 16000;
    mesh.rotation.x = 0.1;
    heart.intensity = 420 + 2400 * Math.exp(-2.4 * age);

    if (!still) {
      camera.position.x += (mouse.x * 7 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.05;
    }
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);

    if (still || !inSight) return;
    if (fellBehind(now)) {
      tooSlow = true;
      showState();
    }
    requestDraw();
  }

  // From the top of the page to the bottom of the first screen. A new size empties the canvas, and
  // the observer runs after the images of the frame: only a real change sets it, and the same
  // image is drawn again at once.
  let shownWidth = 0;
  let shownHeight = 0;
  const fit = () => {
    const width = document.documentElement.clientWidth;
    const height = Math.ceil(
      zone.getBoundingClientRect().bottom + window.scrollY,
    );
    if (width === shownWidth && height === shownHeight) return;
    const hasAnImage = startedAt !== undefined;
    shownWidth = width;
    shownHeight = height;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (hasAnImage) {
      renderer.render(scene, camera);
      // The images of a resize cost more than the others: they don't count.
      measureAgain();
    }
  };
  fit();
  new ResizeObserver(fit).observe(zone);

  // Hiding the tab or leaving the first screen starts the measure again: those images don't count.
  document.addEventListener("visibilitychange", measureAgain);
  new IntersectionObserver((entries) => {
    const isInSight = entries.at(-1)?.isIntersecting ?? false;
    // The first report only confirms the start: it must not shorten the first delay.
    if (isInSight === inSight) return;
    inSight = isInSight;
    showState();
    measureAgain();
    if (inSight && !isStill()) requestDraw();
  }).observe(canvas);

  motionQuery.addEventListener("change", (event) => {
    reducedMotion = event.matches;
    showState();
    measureAgain();
    requestDraw();
  });

  // The camera follows a mouse; a finger or a pen puts it back in the middle.
  const follow = (event: PointerEvent) => {
    mouse =
      event.pointerType === "mouse"
        ? {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: (event.clientY / window.innerHeight) * 2 - 1,
          }
        : { x: 0, y: 0 };
  };
  document.addEventListener("pointermove", follow);
  document.addEventListener("pointerdown", follow);
  document.documentElement.addEventListener("mouseleave", () => {
    mouse = { x: 0, y: 0 };
  });

  document.addEventListener("click", (event) => {
    if (
      !isStill() &&
      event.target instanceof Element &&
      event.target.closest(".download-buttons a")
    ) {
      startedAt = performance.now();
    }
  });

  showState();
  requestDraw();
}
