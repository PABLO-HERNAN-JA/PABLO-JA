// ── Hamburger menu ──────────────────────────────────────
const hamburgerIcon = document.getElementById("hamburger-icon");
const menuLinks     = document.getElementById("menu-links");

hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("open");
  menuLinks.classList.toggle("open");
});

function closeMenu() {
  hamburgerIcon.classList.remove("open");
  menuLinks.classList.remove("open");
}

// ── Active nav link on scroll ─────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a, .menu-links a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + entry.target.id) {
          link.classList.add("active");
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

// ── Smart navbar: se oculta al bajar, aparece al subir ────
const desktopNav   = document.getElementById("desktop-nav");
const hamburgerNav = document.getElementById("hamburger-nav");
const navBars      = [desktopNav, hamburgerNav];

let lastScrollY   = window.scrollY;
let ticking       = false;
const HIDE_AFTER  = 80; // px antes de empezar a ocultar

function updateNavOnScroll() {
  const currentY = window.scrollY;

  navBars.forEach(bar => {
    if (!bar) return;

    // Fondo más sólido una vez que hay scroll
    bar.classList.toggle("nav-scrolled", currentY > 10);

    if (currentY <= HIDE_AFTER) {
      // Siempre visible cerca del tope de la página
      bar.classList.remove("nav-hidden");
    } else if (currentY > lastScrollY) {
      // Bajando → ocultar
      bar.classList.add("nav-hidden");
      // Si el menú hamburguesa estaba abierto, cerrarlo al ocultar la barra
      closeMenu();
    } else {
      // Subiendo → mostrar
      bar.classList.remove("nav-hidden");
    }
  });

  lastScrollY = currentY;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateNavOnScroll);
    ticking = true;
  }
});

// ── Scroll-reveal ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  ".project-card, .cert-card, .skills-card, .about-card, .contact-item"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity    = "1";
      el.target.style.transform  = "translateY(0)";
      revealObserver.unobserve(el.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity   = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity .5s ease, transform .5s ease";
  revealObserver.observe(el);
});
