// År i footer
document.getElementById("year").textContent = new Date().getFullYear();

// Nav: toggle på mobil (Tailwind: toggla 'hidden' på #huvudnav)
const btn = document.getElementById("navToggle");
const nav = document.getElementById("huvudnav");

btn?.addEventListener("click", () => {
  const nowHidden = nav.classList.toggle("hidden"); // true = nyss dold
  btn.setAttribute("aria-expanded", String(!nowHidden));
});

// Stäng menyn efter klick på en länk (bara på små skärmar)
document.querySelectorAll('#huvudnav a[href^="#"]').forEach((a) => {
  a.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      nav.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    }
  });
});

// Stäng på Escape (om öppen)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    nav.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
  }
});

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
        links.forEach((l) => l.classList.remove("text-black", "font-medium"));
        link.classList.add("text-black", "font-medium");
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
);

function toggleCard(button) {
  const article = button.closest(".project-card");
  const content = article.querySelector(".accordion-content");
  const icon = button.querySelector("svg");
  const expanded = button.getAttribute("aria-expanded") === "true";

  // Stäng andra
  document.querySelectorAll("#projekt .project-card").forEach((a) => {
    if (a !== article) {
      const b = a.querySelector(".accordion-button");
      const c = a.querySelector(".accordion-content");
      const i = a.querySelector(".accordion-button svg");
      if (b) b.setAttribute("aria-expanded", "false");
      if (c) c.classList.add("hidden");
      if (i) i.classList.remove("rotate-180");
    }
  });

  // Växla aktuellt
  button.setAttribute("aria-expanded", String(!expanded));
  content.classList.toggle("hidden");
  if (icon) icon.classList.toggle("rotate-180");
}
