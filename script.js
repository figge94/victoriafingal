// År i footer (din befintliga)
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll (din befintliga)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
    // Stäng mobilmeny efter klick
    if (window.innerWidth <= 720) closeNav();
  });
});

const headerEl = document.querySelector("header");
const toggleBtn = document.querySelector(".nav-toggle");

function openNav() {
  headerEl.classList.add("nav-open");
  toggleBtn.setAttribute("aria-expanded", "true");
  toggleBtn.setAttribute("aria-label", "Stäng meny");
}
function closeNav() {
  headerEl.classList.remove("nav-open");
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-label", "Öppna meny");
}

toggleBtn.addEventListener("click", () => {
  headerEl.classList.contains("nav-open") ? closeNav() : openNav();
});

// Stäng på Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

// Nollställ vid resize till desktop
addEventListener("resize", () => {
  if (window.innerWidth > 720) closeNav();
});
