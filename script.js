"use strict";

const hasGsap = typeof window.gsap !== "undefined";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.documentElement.classList.add("js-ready");

const header = document.querySelector("[data-header]");

const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const menuLinks = document.querySelectorAll("[data-menu-link]");

/* =========================================================
   REVEAL POR SCROLL
   [data-reveal] arranca oculto por CSS. Si GSAP está
   disponible, ScrollTrigger se encarga más abajo; si no,
   este fallback con IntersectionObserver hace el mismo
   trabajo para no depender de la red/CDN.
========================================================= */

const revealTargets = document.querySelectorAll("[data-reveal]");

if (!hasGsap) {
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("is-visible"));
  }
}


/* =========================================================
   PRELOADER — contador 0 a 100
========================================================= */

const preloader = document.querySelector("[data-preloader]");
const preloaderCount = document.querySelector("[data-preloader-count]");

if (preloader && preloaderCount) {
  let count = 0;
  const duration = reducedMotion.matches ? 200 : 1400;
  const stepTime = duration / 100;

  const counter = setInterval(() => {
    count += 1;
    preloaderCount.textContent = count;

    if (count >= 100) {
      clearInterval(counter);
    }
  }, stepTime);

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloaderCount.textContent = "100";
      preloader.classList.add("loaded");
    }, duration + 150);
  });
}


/* =========================================================
   HEADER AL HACER SCROLL — la barra ya es clara con logo negro desde
   el arranque; al scrollear más allá del hero solo se compacta un
   poco y suma sombra/borde inferior (clase "scrolled"). El punto de
   cambio se calcula según el alto real del hero, no un número fijo,
   porque ese alto cambia según si el efecto de portal está activo
   (250vh) o no (100vh).
========================================================= */

function updateHeader() {
  if (!header) return;

  const hero = document.querySelector("[data-hero-portal]");
  const threshold = hero ? hero.offsetHeight - 80 : 40;

  header.classList.toggle("scrolled", window.scrollY > threshold);
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", updateHeader);
updateHeader();


/* =========================================================
   MENU — pantalla completa
========================================================= */

let menuOpen = false;

function openMenu() {
  if (!menu || menuOpen) return;

  menuOpen = true;
  menu.classList.add("active");
  document.body.classList.add("menu-open");

  menuToggle?.setAttribute("aria-expanded", "true");
  menuToggle?.setAttribute("aria-label", "Cerrar menú");
}

function closeMenu() {
  if (!menu || !menuOpen) return;

  menuOpen = false;
  menu.classList.remove("active");
  document.body.classList.remove("menu-open");

  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menú");
}

menuToggle?.addEventListener("click", () => {
  menuOpen ? closeMenu() : openMenu();
});

menuClose?.addEventListener("click", closeMenu);

menuLinks.forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      event.preventDefault();
      const targetElement = document.querySelector(targetId);

      closeMenu();

      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350);
      }
    } else {
      closeMenu();
    }
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuOpen) closeMenu();
});


/* Áreas de práctica es ahora un grid compacto ícono + texto,
   sin interacción propia (ver style-mcdv.css) — el reveal al
   hacer scroll lo maneja el bloque genérico de [data-reveal]
   de más abajo. */


/* Equipo es un grid simple (.team-card) — cada tarjeta ya tiene
   data-reveal, así que el bloque genérico de reveals de más abajo
   se encarga sola. No necesita JS propio. */


/* =========================================================
   GSAP + SCROLLTRIGGER
========================================================= */

if (hasGsap && typeof ScrollTrigger !== "undefined" && !reducedMotion.matches) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero "portal": dos paneles arrancan cerrados tapando la foto de
  // fondo; al scrollear se abren hacia los bordes revelándola,
  // mientras "MCDV" / "&" / "Asociados" (apiladas al centro) crecen,
  // aprietan su tracking y MCDV/Asociados se separan hacia los
  // costados del centro, mientras el "&" se desvanece en el lugar.
  // Sticky + scrub (sin pin de GSAP) sobre una sección de 250vh. Solo
  // en desktop ancho: en mobile este scroll-jacking largo se siente
  // pesado, así que ahí se usa el fallback seguro (paneles y wordmark
  // quedan ocultos por sus valores por defecto en el CSS).
  //
  // El "segundo acto" (escudo, eyebrow, h1, bajada, botones) ya NO
  // vive adentro de este portal — es la sección .hero-message, aparte,
  // en el flujo normal de la página (ver index.html). Se revela sola
  // con el bloque genérico de [data-reveal] de más abajo, como
  // cualquier otra sección del sitio — no necesita nada especial acá.
  const heroPortal = document.querySelector("[data-hero-portal]");
  const heroPortalImage = document.querySelector("[data-hero-portal-image] img");
  const heroPortalDuotone = document.querySelector("[data-hero-portal-duotone]");
  const heroPortalPanelLeft = document.querySelector('[data-hero-portal-panel="left"]');
  const heroPortalPanelRight = document.querySelector('[data-hero-portal-panel="right"]');
  const heroPortalWordLeft = document.querySelector('[data-hero-portal-word="left"]');
  const heroPortalWordRight = document.querySelector('[data-hero-portal-word="right"]');
  const heroPortalWordAmp = document.querySelector('[data-hero-portal-word="amp"]');
  const heroPortalMeta = document.querySelectorAll("[data-hero-portal-meta]");

  const heroPortalReady =
    heroPortal &&
    heroPortalImage &&
    heroPortalPanelLeft &&
    heroPortalPanelRight &&
    heroPortalWordLeft &&
    heroPortalWordRight &&
    heroPortalWordAmp &&
    header &&
    window.matchMedia("(min-width: 900px)").matches;

  if (heroPortalReady) {
    heroPortal.classList.add("is-portal-active");

    // Los paneles arrancan con display:none por CSS (ver comentario
    // ahí sobre por qué: un transform puesto por stylesheet
    // "competiría" con el xPercent de GSAP en vez de ser reemplazado
    // por él). Acá recién los hacemos visibles, ya en su posición
    // "cerrada" — a partir de ahí el timeline los abre con normalidad.
    gsap.set([heroPortalPanelLeft, heroPortalPanelRight], { display: "block", xPercent: 0 });

    // El header (escudo + botón Menú) arranca oculto — recién aparece
    // junto con las puertas abriéndose (ver heroPortalTl más abajo).
    // Fallback seguro sin este efecto: el header queda visible normal
    // desde la carga, por CSS, sin depender de JS.
    gsap.set(header, { opacity: 0 });

    const heroPortalTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroPortal,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6
      }
    });

    heroPortalTl
      // Las puertas: arrancan cerradas (xPercent 0, tapando el centro)
      // y se abren hacia los bordes, más allá de su propio ancho, para
      // despejar el cuadro por completo.
      .to(heroPortalPanelLeft, { xPercent: -100, duration: 0.45, ease: "none" }, 0)
      .to(heroPortalPanelRight, { xPercent: 100, duration: 0.45, ease: "none" }, 0)
      // El nombre: crece, aprieta el tracking y se separa con las
      // puertas — MCDV hacia el centro-izquierda, Asociados hacia el
      // centro-derecha (no hasta el borde: quedan más cerca del medio
      // para asentarse ahí) mientras el "&" del medio se desvanece.
      .fromTo(
        [heroPortalWordLeft, heroPortalWordRight],
        { opacity: 1, fontSize: "2.2rem", letterSpacing: "0.4em" },
        { fontSize: "5rem", letterSpacing: "0.04em", duration: 0.45, ease: "none" },
        0
      )
      .fromTo(heroPortalWordLeft, { x: 0 }, { x: "-14vw", duration: 0.45, ease: "none" }, 0)
      .fromTo(heroPortalWordRight, { x: 0 }, { x: "14vw", duration: 0.45, ease: "none" }, 0)
      .fromTo(heroPortalWordAmp, { opacity: 1 }, { opacity: 0, duration: 0.45, ease: "none" }, 0)
      // El header (botón Menú), oculto hasta acá, aparece junto con
      // las puertas abriéndose.
      .fromTo(header, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "none" }, 0)
      // La foto: arranca sobre-escalada y se asienta; el wash de color
      // aparece encima.
      .fromTo(heroPortalImage, { scale: 1.15 }, { scale: 1, duration: 0.55, ease: "none" }, 0)
      .fromTo(heroPortalDuotone, { opacity: 0 }, { opacity: 0.4, duration: 0.45, ease: "none" }, 0.05)
      // La metadata de esquina aparece de a poco.
      .fromTo(heroPortalMeta, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 0.1)
      // El wordmark y la metadata se apagan al final del recorrido —
      // lo que sigue después (.hero-message) es una sección aparte,
      // con su propio reveal genérico al entrar en pantalla.
      .to([heroPortalWordLeft, heroPortalWordRight], { opacity: 0, duration: 0.15, ease: "none" }, 0.55)
      .to(heroPortalMeta, { opacity: 0, duration: 0.15, ease: "none" }, 0.55);
  }

  // Áreas de práctica: la sección queda FIJA en pantalla (pin real,
  // la página no baja) mientras cada área es una "solapa" (tarjeta +
  // descripción, ya no foto a pantalla completa — se sacó a pedido
  // explícito) que sube desde abajo y tapa por completo a la
  // anterior dentro de un cuadro chico y centrado — sin opacity,
  // nunca se ven ni se cruzan dos a la vez. La primera (Derecho de
  // Familia) ya se ve completa apenas engancha el pin. Recién al
  // terminar la última (Derecho Civil) se libera el pin y el scroll
  // normal continúa. Solo en desktop/tablet ancho: en pantallas
  // angostas el pin de scroll se siente raro con teclados táctiles,
  // así que ahí se usa el fallback seguro (lista simple sobre fondo
  // grafito liso, ver valores por defecto en el CSS).
  const areasPin = document.querySelector("[data-areas-pin]");
  const areasPinPanels = document.querySelectorAll(".areas-pin-panel");

  if (areasPin && areasPinPanels.length && window.matchMedia("(min-width: 900px)").matches) {
    areasPin.classList.add("is-stacked");

    // Todas arrancan ocultas debajo (yPercent 100) salvo la primera,
    // que arranca ya puesta (yPercent 0) — se ve completa desde el
    // instante en que engancha el pin. Importante inicializarlas por
    // JS y no por CSS: GSAP 3.13 escribe yPercent en la propiedad CSS
    // moderna "translate", que se compone con un "transform" puesto
    // por stylesheet en vez de reemplazarlo — si el estado inicial
    // viniera del CSS, GSAP nunca se entera y las solapas quedan
    // trabadas sin animar.
    gsap.set(areasPinPanels, { yPercent: 100 });
    gsap.set(areasPinPanels[0], { yPercent: 0 });

    // Un paso de scroll por cada transición entre áreas (4 pasos
    // para 5 áreas: la primera ya está puesta, no cuenta paso propio).
    const stepDistance = 500; // px de scroll por paso
    const totalDistance = stepDistance * (areasPinPanels.length - 1);

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: areasPin,
        start: "top top",
        end: "+=" + totalDistance,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1
      }
    });

    areasPinPanels.forEach((panel, index) => {
      if (index === 0) return;
      pinTl.to(panel, { yPercent: 0, ease: "none", duration: 1 }, `c${index}`);
    });
  }

  gsap.utils.toArray("[data-reveal]:not(#home [data-reveal])").forEach(element => {
    gsap.fromTo(
      element,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
} else {
  // Sin GSAP (o reduced motion): el copy del hero queda visible
  // directamente vía la clase is-visible del fallback de arriba.
  document.querySelectorAll("#home [data-reveal]").forEach(el => el.classList.add("is-visible"));
}


/* =========================================================
   WHATSAPP

   NÚMERO PROVISORIO — reemplazar por el número real del
   estudio antes de publicar el sitio.
========================================================= */

const WA_NUMBER = "5492804000000";
const defaultMessage = "Hola, quisiera hacer una consulta con MCDV & Asociados.";

function waLink(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

["waContact", "waFloat"].forEach(id => {
  const element = document.getElementById(id);
  if (element) element.href = waLink(defaultMessage);
});


/* =========================================================
   FORMULARIO
========================================================= */

const contactForm = document.getElementById("contactForm");
const formConfirm = document.getElementById("formConfirm");

// Muestra/oculta el <span class="field-error"> asociado a un campo
// (vinculado por aria-describedby) — antes solo se pintaba el borde
// en rojo, sin decir qué estaba mal ni ser anunciado por lectores de
// pantalla (role="alert" en el span lo anuncia apenas se le pone texto).
function setFieldError(input, message) {
  if (!input) return;
  const errorId = input.getAttribute("aria-describedby");
  const errorEl = errorId && document.getElementById(errorId);

  input.classList.toggle("is-invalid", Boolean(message));

  if (errorEl) {
    errorEl.textContent = message || "";
    errorEl.classList.toggle("show", Boolean(message));
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const mensajeInput = document.getElementById("mensaje");

    const nombre = nombreInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "No brindó teléfono";
    const mensaje = mensajeInput?.value.trim() || "";

    let firstInvalid = null;

    [
      [nombreInput, nombre, "Contanos tu nombre para poder responderte."],
      [mensajeInput, mensaje, "Contanos brevemente tu situación."]
    ].forEach(([input, value, message]) => {
      if (!input) return;
      const invalid = !value;
      setFieldError(input, invalid ? message : "");
      if (invalid && !firstInvalid) firstInvalid = input;
    });

    if (emailInput) {
      const emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setFieldError(emailInput, emailOk ? "" : "Revisá el formato del email (ej: nombre@dominio.com).");
      if (!emailOk && !firstInvalid) firstInvalid = emailInput;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const text =
      "Hola, soy " + nombre +
      ". Mi email es " + (email || "no brindó email") +
      ". Teléfono: " + telefono +
      ". Consulta: " + mensaje;

    formConfirm?.classList.add("show");
    window.open(waLink(text), "_blank", "noopener");
    contactForm.reset();
  });

  contactForm.querySelectorAll("input, textarea").forEach(field => {
    field.addEventListener("input", () => setFieldError(field, ""));
  });
}


/* =========================================================
   REDUCED MOTION
========================================================= */

if (reducedMotion.matches) {
  if (hasGsap) gsap.globalTimeline.pause(0);
  document.documentElement.style.scrollBehavior = "auto";
}
