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


/* =========================================================
   HERO — CARRUSEL DE VIDEO
   Independiente del efecto de scroll-jack de más abajo (ese sigue
   siendo solo de escritorio ancho): ya no hay foto fija de fondo, así
   que este carrusel es el único fondo del hero y tiene que correr en
   cualquier tamaño de pantalla, no solo ahí. El primer <video> ya
   tiene src + autoplay/muted/loop/playsinline puestos directo en el
   HTML (arranca incluso sin este script); acá solo se encarga de
   cargar diferido los otros 2 clips, ir turnándolos, y respetar
   reduced-motion.
========================================================= */

const heroPortal = document.querySelector("[data-hero-portal]");
const heroPortalVideos = document.querySelectorAll("[data-hero-portal-video]");

// Los clips originales duran 8-10s reales — más de lo que le sirve a
// un fondo de hero. En vez de recortar los .mp4 (no hay forma de
// hacerlo acá, no hay ffmpeg), cada clip se corta solo a este tope
// mientras reproduce, sea cual sea su duración real.
const HERO_VIDEO_MAX_SECONDS = 6;

function initHeroVideoCarousel() {
  if (!heroPortalVideos.length) return;

  // El primer video ya viene reproduciéndose por su atributo autoplay
  // nativo antes de que este script llegue a correr. Con
  // reduced-motion lo frenamos acá apenas se puede y no arrancamos
  // nada más del carrusel — ni siquiera se llega a pedir el .src de
  // los otros dos clips, así que no hay descarga de más para alguien
  // que pidió menos movimiento.
  if (reducedMotion.matches) {
    heroPortalVideos[0].pause();
    return;
  }

  let current = 0;

  function playAt(index, restart) {
    heroPortalVideos.forEach((video, i) => {
      video.classList.toggle("is-active", i === index);
      if (i !== index && !video.paused) video.pause();
    });

    const video = heroPortalVideos[index];
    // El carrusel repite en loop (advance() vuelve a 0 después del
    // último) — sin este reset, la segunda vuelta de un clip
    // arrancaría desde donde había quedado pausado la vez anterior
    // (justo en HERO_VIDEO_MAX_SECONDS), y el primer "timeupdate"
    // dispararía advance() casi al instante.
    if (restart) video.currentTime = 0;
    video.play().catch(() => {});
  }

  function advance() {
    current = (current + 1) % heroPortalVideos.length;
    playAt(current, true);
  }

  heroPortalVideos.forEach((video, i) => {
    const source = video.dataset.src;
    if (source) video.src = source;

    // Dos formas de pasar al siguiente clip, lo que llegue primero:
    // el clip termina solo (por si algún día es más corto que el
    // tope), o llega a HERO_VIDEO_MAX_SECONDS de reproducción real
    // (timeupdate, no un timer — así no cuenta tiempo mientras está
    // pausado/fuera de pantalla). El primer video tiene loop nativo
    // como red de seguridad sin JS, pero loop nunca dispara "ended" —
    // por eso el corte real depende de timeupdate, no de esperar a
    // que termine.
    video.addEventListener("ended", () => {
      if (i === current) advance();
    });

    video.addEventListener("timeupdate", () => {
      if (i === current && video.currentTime >= HERO_VIDEO_MAX_SECONDS) advance();
    });
  });

  // El primero ya está reproduciendo por el autoplay nativo — no lo
  // reiniciamos para no generar un salto visible apenas carga la
  // página; solo lo arrancamos "a mano" si todavía no arrancó (el
  // navegador bloqueó el autoplay pese a estar muted, algo que pasa
  // en algunos contextos).
  if (heroPortalVideos[0].paused) {
    playAt(0, true);
  } else {
    heroPortalVideos[0].classList.add("is-active");
  }

  // Cortesía de rendimiento: si el usuario sigue bajando y el hero
  // sale de pantalla, pausa el video activo en vez de dejarlo
  // corriendo invisible; lo retoma solo si vuelve a subir.
  if ("IntersectionObserver" in window && heroPortal) {
    const heroVisibilityObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const active = heroPortalVideos[current];
          if (!active) return;
          if (entry.isIntersecting) {
            active.play().catch(() => {});
          } else {
            active.pause();
          }
        });
      },
      { threshold: 0 }
    );
    heroVisibilityObserver.observe(heroPortal);
  }
}

initHeroVideoCarousel();


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

  // Hero "portal": dos paneles arrancan cerrados tapando el carrusel
  // de video de fondo (ver initHeroVideoCarousel más arriba — corre
  // aparte, no depende de este bloque); al scrollear se abren hacia
  // los bordes revelándolo, mientras "MCDV" / "&" / "Asociados"
  // (apiladas al centro) crecen, aprietan su tracking y MCDV/Asociados
  // se separan hacia los costados del centro, mientras el "&" se
  // desvanece en el lugar. Sticky + scrub (sin pin de GSAP) sobre una
  // sección de 280vh. Solo en desktop ancho: en mobile este
  // scroll-jacking largo se siente pesado, así que ahí se usa el
  // fallback seguro (paneles y wordmark quedan ocultos por sus
  // valores por defecto en el CSS) — el video de fondo, en cambio,
  // sigue andando igual, gracias a initHeroVideoCarousel.
  //
  // El "segundo acto" (eyebrow, h1, bajada, CTA — .hero-portal-message
  // en index.html) vive ADENTRO de este mismo portal, superpuesto al
  // video en el mismo lugar donde el nombre se acaba de desvanecer.
  // Antes era una sección .hero-message aparte que recién arrancaba
  // su propio reveal al entrar en pantalla, después de un tramo de
  // pin "muerto" sin nada pasando — se sentía como hero vacío seguido
  // de una sección desconectada. Ahora es continuación del mismo
  // scrub: por defecto (CSS) .hero-portal-message ya está visible
  // (fallback seguro sin este efecto), así que acá solo hace falta
  // ocultarla al arrancar y volver a mostrarla cuando el nombre ya
  // se apagó.
  const heroPortalVideoWrap = document.querySelector("[data-hero-portal-video-carousel]");
  const heroPortalDuotone = document.querySelector("[data-hero-portal-duotone]");
  const heroPortalPanelLeft = document.querySelector('[data-hero-portal-panel="left"]');
  const heroPortalPanelRight = document.querySelector('[data-hero-portal-panel="right"]');
  const heroPortalWordLeft = document.querySelector('[data-hero-portal-word="left"]');
  const heroPortalWordRight = document.querySelector('[data-hero-portal-word="right"]');
  const heroPortalWordAmp = document.querySelector('[data-hero-portal-word="amp"]');
  const heroPortalMeta = document.querySelectorAll("[data-hero-portal-meta]");
  const heroPortalMessage = document.querySelector("[data-hero-portal-message]");

  const heroPortalReady =
    heroPortal &&
    heroPortalVideoWrap &&
    heroPortalPanelLeft &&
    heroPortalPanelRight &&
    heroPortalWordLeft &&
    heroPortalWordRight &&
    heroPortalWordAmp &&
    heroPortalMessage &&
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

    // .hero-portal-message es visible por defecto (fallback seguro) —
    // solo la ocultamos acá porque el efecto SÍ va a correr; el
    // timeline la trae de vuelta más abajo, después de que el nombre
    // termine de desvanecerse.
    gsap.set(heroPortalMessage, { opacity: 0, y: 18 });

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
      // El video: arranca sobre-escalado y se asienta (mismo efecto
      // que antes tenía la foto, ahora sobre el wrapper del carrusel
      // — cualquiera sea el clip activo en ese momento); el wash de
      // color aparece encima.
      .fromTo(heroPortalVideoWrap, { scale: 1.15 }, { scale: 1, duration: 0.55, ease: "none" }, 0)
      .fromTo(heroPortalDuotone, { opacity: 0 }, { opacity: 0.4, duration: 0.45, ease: "none" }, 0.05)
      // El aviso de "Scroll" ya está visible por defecto (CSS, mismo
      // criterio que .hero-portal-message) — acá no hace falta un
      // fromTo trayéndolo de opacity:0, con eso ya alcanzaría para
      // que arranque invisible en reposo (fromTo siempre renderiza el
      // estado "from" al crearse). Solo se apaga junto con el
      // wordmark, un poco más abajo.
      // El wordmark y el aviso de "Scroll" se apagan...
      .to([heroPortalWordLeft, heroPortalWordRight], { opacity: 0, duration: 0.15, ease: "none" }, 0.55)
      .to(heroPortalMeta, { opacity: 0, duration: 0.15, ease: "none" }, 0.55)
      // ...y en el mismo lugar que dejan libre, sobre el video ya
      // asentado, entra el mensaje real (eyebrow + h1 + bajada + CTA)
      // — el tramo que antes quedaba "muerto" (nombre ya invisible,
      // nada más pasando hasta que despinchaba la sección) ahora tiene
      // contenido. Un solo fromTo para todo el bloque, no uno por
      // elemento — mismo criterio que ya se usaba en la vieja
      // .hero-message-inner (aparece como un solo bloque, no en
      // cascada).
      .fromTo(
        heroPortalMessage,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.22, ease: "none" },
        0.7
      )
      // Hold final: sin esto, el mensaje terminaría de aparecer justo
      // cuando el pin se suelta (el final del timeline coincide con
      // el 100% del recorrido de scroll) — no daría tiempo a leerlo
      // todavía "quieto". Este tween vacío solo estira la duración
      // del timeline, sin animar nada — el resto del scroll dentro de
      // los 280vh lo pasa con el mensaje ya asentado antes de soltar
      // el pin y seguir a "El Estudio".
      .to({}, { duration: 0.28 });
  }

  // Áreas de práctica (acordeón, <details>/<summary> nativo) y
  // Equipo (directorio maestro-detalle, <input type="radio"> + :has()):
  // resueltos 100% en HTML/CSS, sin una línea de JS (ver
  // .areas-accordion-*/.team-directory-* en style-mcdv.css).

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
