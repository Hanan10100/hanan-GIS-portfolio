/* =========================================================
   globe.js
   Builds the rotating 3D Earth that sits fixed behind the
   whole page. main.js tells this file which "scene" to move
   to as the visitor scrolls (see window.GeoGlobe.goToScene).
   ========================================================= */

import * as THREE from "three";

const canvas = document.getElementById("globe-canvas");
const loadingEl = document.getElementById("globe-loading");

/* ---------- Basic scene setup ---------- */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 4);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* ---------- Lighting ---------- */
const sun = new THREE.DirectionalLight(0xfff2df, 2.2);
sun.position.set(5, 2, 5);
scene.add(sun);
scene.add(new THREE.AmbientLight(0x304a3a, 1.1));

/* ---------- Starfield (simple points, very cheap) ---------- */
function makeStars() {
  const count = 800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 30 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0xdfe6dc, size: 0.05 });
  return new THREE.Points(geo, mat);
}
scene.add(makeStars());

/* ---------- Earth group (everything that rotates together) ---------- */
const earthGroup = new THREE.Group();
scene.add(earthGroup);

/*
  Earth texture.
  We load it from /assets/textures/earth-day.jpg on your own site.
  See README.md for where to download a free one (a couple of minutes).
  Until you add that file, a plain green-blue sphere is shown instead,
  so the site still works.
*/
const loader = new THREE.TextureLoader();
const FALLBACK_COLOR = 0x2f5233;

const earthGeometry = new THREE.SphereGeometry(1.3, 64, 64);
const earthMaterial = new THREE.MeshStandardMaterial({
  color: FALLBACK_COLOR,
  roughness: 0.85,
  metalness: 0.05,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earth);

loader.load(
  "assets/textures/earth-day.jpg",
  (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    earthMaterial.map = texture;
    earthMaterial.color.set(0xffffff);
    earthMaterial.needsUpdate = true;
    loadingEl.classList.add("hidden");
  },
  undefined,
  () => {
    // Texture missing — that's fine, fallback color sphere stays.
    loadingEl.classList.add("hidden");
  }
);

/* Thin atmosphere glow */
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.36, 64, 64),
  new THREE.MeshBasicMaterial({
    color: 0x9fd8c9,
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide,
  })
);
earthGroup.add(atmosphere);

/* Faint contour/graticule ring, a nod to cartographic line-work */
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.55, 0.002, 8, 128),
  new THREE.MeshBasicMaterial({ color: 0xc08a3e, transparent: true, opacity: 0.4 })
);
ring.rotation.x = Math.PI / 2.1;
scene.add(ring);

/* ---------- Lat/long → rotation helper ----------
   Rough, decorative — not survey-grade. Rotates the globe so the
   requested region faces the camera. */
function focusRotation(lat, lon) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  const x = -Math.sin(phi) * Math.cos(theta);
  const z = Math.sin(phi) * Math.sin(theta);
  const yaw = Math.atan2(x, z);
  return { y: -yaw, x: THREE.MathUtils.degToRad(lat) * 0.35 };
}

/* ---------- Named "scenes" the page can request ---------- */
const SCENES = {
  space:         { camZ: 4.2, rot: { y: 0, x: 0 } },
  pakistan:      { camZ: 3.1, rot: focusRotation(30, 70) },
  "lahore-wide": { camZ: 2.4, rot: focusRotation(31.5, 74.3) },
  "lahore-close":{ camZ: 1.85, rot: focusRotation(31.5, 74.3) },
  islamabad:     { camZ: 2.0, rot: focusRotation(33.7, 73.1) },
};

let target = { camZ: 4.2, rotY: 0, rotX: 0 };
let current = { camZ: 4.2, rotY: 0, rotX: 0 };

function goToScene(name) {
  const s = SCENES[name] || SCENES.space;
  target = { camZ: s.camZ, rotY: s.rot.y, rotX: s.rot.x };
}

/* Exposed so main.js (a regular, non-module script) can call it */
window.GeoGlobe = { goToScene };

/* ---------- Render loop ---------- */
function animate() {
  requestAnimationFrame(animate);

  // Smoothly ease toward whatever scene was last requested
  current.camZ += (target.camZ - current.camZ) * 0.04;
  current.rotY += (target.rotY - current.rotY) * 0.04;
  current.rotX += (target.rotX - current.rotX) * 0.04;

  camera.position.z = current.camZ;
  earthGroup.rotation.y = current.rotY + performance.now() * 0.00006; // slow idle spin
  earthGroup.rotation.x = current.rotX;
  ring.rotation.z += 0.0007;

  renderer.render(scene, camera);
}
animate();

/* ---------- Resize ---------- */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
