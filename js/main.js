/* =========================================================
   main.js
   Handles: mobile nav menu, and telling the globe (globe.js)
   which "scene" to move to as the visitor scrolls.
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ---------- Scroll → globe scene ----------
   Every section can carry a data-scene="..." attribute in the HTML.
   When that section reaches the middle of the screen, we tell the
   globe (via the function globe.js exposed on window) to move there. */
document.querySelectorAll("[data-scene]").forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => window.GeoGlobe && window.GeoGlobe.goToScene(section.dataset.scene),
    onEnterBack: () => window.GeoGlobe && window.GeoGlobe.goToScene(section.dataset.scene),
  });
});

/* ---------- Lightbox: click any map/photo to view it full size ----------
   Any <img class="lightbox-trigger"> on the page works automatically —
   no extra setup needed when you add a new one. */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".lightbox-trigger").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ---------- Simple entrance for the hero text (one deliberate reveal) ---------- */
gsap.from(".hero__kicker, .hero__name, .hero__line, .hero .btn", {
  y: 24,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power2.out",
  delay: 0.3,
});
