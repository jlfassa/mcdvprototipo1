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
  // mientras "MCDV" / "Asociados" (partido en dos) crece, aprieta su
  // tracking y viaja hacia esos mismos bordes. Sticky + scrub (sin
  // pin de GSAP) sobre una sección de 250vh. Solo en desktop ancho:
  // en mobile este scroll-jacking largo se siente pesado, así que ahí
  // se usa el fallback seguro (hero normal de un viewport, foto +
  // contenido visibles de entrada, ver valores por defecto en el CSS).
  const heroPortal = document.querySelector("[data-hero-portal]");
  const heroPortalImage = document.querySelector("[data-hero-portal-image] img");
  const heroPortalDuotone = document.querySelector("[data-hero-portal-duotone]");
  const heroPortalPanelLeft = document.querySelector('[data-hero-portal-panel="left"]');
  const heroPortalPanelRight = document.querySelector('[data-hero-portal-panel="right"]');
  const heroPortalWordLeft = document.querySelector('[data-hero-portal-word="left"]');
  const heroPortalWordRight = document.querySelector('[data-hero-portal-word="right"]');
  const heroPortalWordAmp = document.querySelector('[data-hero-portal-word="amp"]');
  const heroPortalMeta = document.querySelectorAll("[data-hero-portal-meta]");
  const heroPortalCrest = document.querySelector("[data-hero-portal-crest]");
  const heroPortalContentReveal = document.querySelectorAll("#home [data-reveal]");

  // Escudo real del hero (el que queda centrado arriba del h1 una vez
  // que el portal terminó de abrirse) y las dos piezas del acople al
  // navbar: el escudo "viajero" (fixed, position interpolada por JS) y
  // el escudo estático que vive siempre en el header.
  const heroCrest = document.querySelector(".hero-crest");
  const headerDockCrest = document.querySelector("[data-header-dock-crest]");
  const headerStaticLogo = document.querySelector("[data-header-static-logo]");

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
    gsap.set(heroPortalContentReveal, { opacity: 0, y: 40 });

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
      // El nombre: crece, aprieta el tracking y viaja con las puertas
      // (MCDV a la izquierda, Asociados a la derecha — mismo x que
      // antes, ahora arrancando apiladas en vez de lado a lado).
      .fromTo(
        [heroPortalWordLeft, heroPortalWordRight],
        { opacity: 1, fontSize: "2.2rem", letterSpacing: "0.4em" },
        { fontSize: "5rem", letterSpacing: "0.04em", duration: 0.45, ease: "none" },
        0
      )
      .fromTo(heroPortalWordLeft, { x: 0 }, { x: "-32vw", duration: 0.45, ease: "none" }, 0)
      .fromTo(heroPortalWordRight, { x: 0 }, { x: "32vw", duration: 0.45, ease: "none" }, 0)
      // El "&" del medio no viaja a ningún lado: se queda en el
      // centro y se desvanece en el mismo tramo.
      .fromTo(heroPortalWordAmp, { opacity: 1 }, { opacity: 0, duration: 0.45, ease: "none" }, 0)
      // El header (escudo + Menú), oculto hasta acá, aparece junto
      // con las puertas abriéndose.
      .fromTo(header, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "none" }, 0)
      // La foto: arranca sobre-escalada y se asienta; el wash de color
      // aparece encima.
      .fromTo(heroPortalImage, { scale: 1.15 }, { scale: 1, duration: 0.55, ease: "none" }, 0)
      .fromTo(heroPortalDuotone, { opacity: 0 }, { opacity: 0.4, duration: 0.45, ease: "none" }, 0.05)
      // La metadata de esquina aparece de a poco.
      .fromTo(heroPortalMeta, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 0.1)
      // El escudo aparece centrado en el cuadro, ya con las puertas
      // abriéndose.
      .fromTo(heroPortalCrest, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 0.2)
      // El nombre, la metadata y el escudo se retiran para dejar paso
      // al contenido real (que trae su propio escudo), que entra con
      // el mismo fade-in de siempre.
      .to([heroPortalWordLeft, heroPortalWordRight], { opacity: 0, duration: 0.15, ease: "none" }, 0.55)
      .to(heroPortalMeta, { opacity: 0, duration: 0.15, ease: "none" }, 0.55)
      .to(heroPortalCrest, { opacity: 0, duration: 0.15, ease: "none" }, 0.55)
      .to(
        heroPortalContentReveal,
        { opacity: 1, y: 0, duration: 0.35, ease: "none", stagger: 0.03 },
        0.62
      );

    // ACOPLE DEL ESCUDO AL NAVBAR — el mismo escudo que queda centrado
    // arriba del h1 (heroCrest, ya visible y asentado en su posición
    // final desde el paso anterior) "sube" y se acopla al navbar
    // mientras se termina de salir del hero, quedando ahí fijo el
    // resto de la página.
    //
    // Lecciones de intentos anteriores con este mismo efecto (documentadas
    // en contexto-proyecto-mcdv.md, rondas 8-11), aplicadas acá:
    //   1. El navbar NUNCA arranca oculto/invisible — headerStaticLogo es
    //      visible por defecto (CSS) desde la carga; solo se apaga un
    //      instante mientras el escudo viajero pasa exactamente por
    //      encima suyo (ver onUpdate más abajo), nunca durante todo el
    //      scroll del hero como pasaba antes.
    //   2. headerDockCrest vive fuera de <main> (hermano de <header> en
    //      el HTML) con z-index 1001, por encima de la barra — adentro
    //      de .hero-portal-stage (que tiene isolation:isolate) ningún
    //      z-index lo hubiera salvado de quedar atrapado detrás.
    //   3. Se usa el MISMO escudo crema en las tres piezas (el del hero,
    //      el viajero y el del navbar) — nada de cruzar dos colores.
    //   4. Posición interpolada en top/left/width reales (getBoundingClientRect),
    //      nunca por transform/xPercent/yPercent — evita el bug ya
    //      encontrado de que GSAP escribe eso en la propiedad "translate",
    //      que se compone con un transform de stylesheet en vez de
    //      reemplazarlo.
    //
    // Corre en un ScrollTrigger aparte (no en heroPortalTl de arriba)
    // para no tocar ni reajustar el timing ya afinado del portal: arranca
    // recién cuando el pin del hero está a punto de soltarse (bottom 85%)
    // y termina cuando el hero termina de salir de pantalla (bottom top)
    // — una franja de scroll corta y propia para esta transición.
    if (heroCrest && headerDockCrest && headerStaticLogo) {
      // Sin esto, el CSS general de [data-reveal] (.js-ready [data-reveal]
      // { transition: opacity .9s ... }) compite con el opacity que le va
      // a ir poniendo GSAP acá abajo, cuadro a cuadro — mismo tipo de
      // conflicto transform/translate ya documentado, pero con
      // transition/opacity. Se apaga esa transición puntual para este
      // elemento, GSAP queda como único dueño de su opacity de acá en
      // más.
      gsap.set(heroCrest, { transition: "none" });

      const dockTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroPortal,
          // "bottom 110%" cae mientras heroCrest todavía está fijo por
          // el sticky del stage (el pin recién suelta en "bottom
          // 100%") y ya asentado (su propio reveal termina antes, en
          // torno a "bottom 117%") — margen a ambos lados a propósito,
          // calculado a partir del timeline de heroPortalTl de arriba,
          // no a ojo.
          start: "bottom 110%",
          end: "bottom 65%",
          scrub: 0.6,
          onUpdate: self => {
            const arrived = self.progress >= 0.98;
            headerDockCrest.style.opacity = arrived ? 0 : 1;
            headerStaticLogo.style.opacity = arrived ? 1 : 0;

            // El escudo real se apaga rápido apenas arranca este
            // tramo (si quedara visible, se separaría del viajero en
            // cuanto suelte el pin — ver comentario más abajo).
            // Imperativo, no un .to() de GSAP aparte: un segundo tween
            // independiente compitiendo por el mismo opacity que ya
            // controla heroPortalTl (el del reveal) quedaba con un
            // valor "pegado" a mitad de camino (0.22 en vez de 0) al
            // scrollear rápido de punta a punta — confirmado con
            // Playwright forzando un scroll instantáneo del final al
            // inicio de la página.
            heroCrest.style.opacity = Math.max(0, 1 - self.progress / 0.25);
          },
          onLeaveBack: () => {
            headerDockCrest.style.display = "none";
            headerStaticLogo.style.opacity = 1;
            // Se limpia el inline style en vez de forzar opacity:1 —
            // así heroPortalTl (el tween del reveal original) queda
            // como único dueño de esta propiedad de nuevo.
            heroCrest.style.opacity = "";
          }
        }
      });

      dockTl
        // fromTo (no to) a propósito, con TODOS los valores de
        // posición como función: GSAP recién las evalúa cuando el
        // tween arranca a renderizar de verdad (primer frame dentro
        // del rango del ScrollTrigger), no al crear el tween — que es
        // lo que hace falta acá (medir heroCrest recién cuando el
        // usuario llega a este tramo del scroll, no en el load de la
        // página, cuando headerDockCrest todavía mide 0 por estar en
        // display:none). Dos bugs reales encontrados y corregidos acá,
        // confirmados con Playwright antes de este comentario:
        //   1. Un primer intento con gsap.to() + gsap.set() en
        //      onToggle no andaba: el tween ya había capturado como
        //      "from" el tamaño 0 que tenía headerDockCrest al cargar
        //      la página, y lo volvía a pisar en cada frame de scroll
        //      (el viajero llegaba a medir 4×4px en vez de ~90px).
        //   2. Sin immediateRender:false, fromTo() renderiza su
        //      estado "from" apenas se crea el tween (scrollY 0) en
        //      vez de esperar a que el scroll entre de verdad en el
        //      rango del ScrollTrigger — el escudo viajero aparecía ya
        //      visible arriba del hero desde el principio.
        .fromTo(
          headerDockCrest,
          {
            display: "block",
            top: () => heroCrest.getBoundingClientRect().top,
            left: () => heroCrest.getBoundingClientRect().left,
            width: () => heroCrest.getBoundingClientRect().width,
            height: () => heroCrest.getBoundingClientRect().height
          },
          {
            top: () => headerStaticLogo.getBoundingClientRect().top,
            left: () => headerStaticLogo.getBoundingClientRect().left,
            width: () => headerStaticLogo.getBoundingClientRect().width,
            height: () => headerStaticLogo.getBoundingClientRect().height,
            ease: "none",
            duration: 1,
            immediateRender: false
          },
          0
        );
    }
  } else {
    // Sin el efecto de portal (mobile, o sin GSAP/reduced-motion ya
    // filtrado más arriba): el copy del hero entra apenas carga la
    // página, como un hero normal.
    gsap.fromTo(
      heroPortalContentReveal,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.3 }
    );
  }

  // Áreas de práctica: la sección queda FIJA en pantalla (pin real,
  // la página no baja) mientras cada área es una "solapa" opaca a
  // pantalla completa (foto propia + degradé, sin caja) que sube
  // desde abajo y tapa por completo a la anterior — sin opacity,
  // nunca se ven ni se cruzan dos textos a la vez. La primera
  // (Derecho de Familia) ya se ve completa apenas engancha el pin —
  // nada de arrancar "vacío" esperando a que suba la primera solapa,
  // eso quedaba raro. El título queda fijo arriba todo el recorrido.
  // Recién al terminar la última (Derecho Civil) se libera el pin y
  // el scroll normal continúa. Solo en desktop/tablet ancho: en
  // pantallas angostas el pin de scroll se siente raro con teclados
  // táctiles, así que ahí se usa el fallback seguro (lista simple
  // sobre fondo grafito liso, sin fotos, ver valores por defecto en
  // el CSS).
  const areasPin = document.querySelector("[data-areas-pin]");
  const areasPinPanels = document.querySelectorAll(".areas-pin-panel");

  if (areasPin && areasPinPanels.length && window.matchMedia("(min-width: 900px)").matches) {
    areasPin.classList.add("is-stacked");

    // La foto la pone JS (vía data-bg), no el HTML/CSS: así el modo
    // simple (fallback) nunca llega a pedir estas imágenes de más.
    // image-set() pide la versión WebP (bastante más liviana) con la
    // misma foto en JPG como respaldo si el navegador no soporta WebP.
    areasPinPanels.forEach(panel => {
      const bg = panel.getAttribute("data-bg");
      if (!bg) return;
      const webp = bg.replace(/\.jpe?g$/i, ".webp");
      panel.style.backgroundImage =
        `image-set(url('${webp}') type('image/webp'), url('${bg}') type('image/jpeg'))`;
    });

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
