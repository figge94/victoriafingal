// ===== Footer-år =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Element =====
const btn = document.getElementById("navToggle");
const nav = document.getElementById("huvudnav");
const header = document.querySelector("header");

// ===== Helpers =====
const isDesktop = () => !window.matchMedia("(max-width: 767px)").matches;

// Samlad hantering av meny-tillstånd (a11y + UI)
function setMenuState(isOpen) {
  nav.classList.toggle("hidden", !isOpen);
  btn?.setAttribute("aria-expanded", String(isOpen));
  header.classList.toggle("is-open", isOpen);
  nav.toggleAttribute("inert", !isOpen); // gör otillgänglig när stängd
  nav.setAttribute("aria-hidden", String(!isOpen));
  document.documentElement.classList.toggle(
    "overflow-hidden",
    isOpen && !isDesktop()
  ); // lås scroll på mobil
}

// ===== Init =====
setMenuState(isDesktop()); // desktop: öppen, mobil: stängd

// ===== Toggle-knapp =====
btn?.addEventListener("click", () => {
  const willOpen = nav.classList.contains("hidden"); // om hidden nu -> ska öppnas
  setMenuState(willOpen);
});

// ===== Stäng på länkklick (bara mobil) =====
document.querySelectorAll('#huvudnav a[href^="#"]').forEach((a) => {
  a.addEventListener("click", () => {
    if (!isDesktop()) setMenuState(false);
  });
});

// ===== Stäng på Escape =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && btn?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
  }
});

// ===== Klick utanför header stänger (bara mobil) =====
document.addEventListener("click", (e) => {
  if (isDesktop()) return;
  const open = btn?.getAttribute("aria-expanded") === "true";
  if (open && header && !header.contains(e.target)) setMenuState(false);
});

// ===== Resize: växla tillstånd enligt breakpoint =====
window.addEventListener("resize", () => {
  setMenuState(isDesktop());
});

// ===== Active-länk via IntersectionObserver =====
const links = [...document.querySelectorAll('#huvudnav a[href^="#"]')];
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = "#" + entry.target.id;
      const link = links.find((a) => a.getAttribute("href") === id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach((l) => l.removeAttribute("aria-current"));
        link.setAttribute("aria-current", "page");
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
);

sections.forEach((s) => io.observe(s));

// ===== Projekt-accordion =====
window.toggleCard = function (button) {
  const article = button.closest(".project-card");
  const content = article.querySelector(".accordion-content");
  const icon = button.querySelector("svg");
  const expanded = button.getAttribute("aria-expanded") === "true";

  // Stäng alla andra
  document.querySelectorAll("#projekt .project-card").forEach((a) => {
    if (a !== article) {
      const b = a.querySelector(".accordion-button");
      const c = a.querySelector(".accordion-content");
      const i = a.querySelector(".accordion-button svg");
      b?.setAttribute("aria-expanded", "false");
      c?.classList.add("hidden");
      i?.classList.remove("rotate-180");
    }
  });

  // Växla aktuell
  button.setAttribute("aria-expanded", String(!expanded));
  content.classList.toggle("hidden");
  icon?.classList.toggle("rotate-180");
};

const openAbout = document.getElementById("openAbout");
const closeAbout = document.getElementById("closeAbout");
const aboutModal = document.getElementById("aboutModal");

openAbout?.addEventListener("click", () => {
  aboutModal.classList.remove("hidden", "opacity-0");
  aboutModal.classList.add("flex");
  document.body.classList.add("overflow-hidden"); // lås scroll
});

closeAbout?.addEventListener("click", () => {
  aboutModal.classList.add("hidden");
  aboutModal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
});

// stäng på ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && aboutModal.classList.contains("flex")) {
    closeAbout.click();
  }
});

// stäng om man klickar utanför modalen
aboutModal?.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    closeAbout.click();
  }
});
