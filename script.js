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

sections.forEach((s) => io.observe(s));
