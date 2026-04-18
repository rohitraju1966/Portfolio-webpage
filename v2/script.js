// ===== Rohit Raju — Portfolio v2 =====

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (persists)
const root = document.documentElement;
const stored = localStorage.getItem("theme");
if (stored) root.setAttribute("data-theme", stored);

document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Nav scroll state
const nav = document.querySelector(".nav");
const onScroll = () => {
  if (window.scrollY > 8) nav.classList.add("is-scrolled");
  else nav.classList.remove("is-scrolled");
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const menuBtn = document.querySelector(".nav__menu");
menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".nav__links a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("is-open"))
);

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Cursor-follow halo (subtle)
const halo = document.querySelector(".halo");
if (halo && window.matchMedia("(pointer: fine)").matches) {
  let raf = 0;
  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener("mousemove", (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 40;
    ty = (e.clientY / window.innerHeight - 0.5) * 40;
    if (!raf) raf = requestAnimationFrame(tick);
  });
  function tick() {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    halo.style.transform = `translateX(calc(-50% + ${cx}px)) translateY(${cy}px)`;
    if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  }
}
