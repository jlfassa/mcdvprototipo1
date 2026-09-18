# MCDV — Estado actual

Leer esto primero, no `contexto-proyecto-mcdv.md` entero. Este archivo es corto
a propósito — pensado para no re-derivar el estado del proyecto desde
`git log`/lectura de HTML completo en cada sesión. Se actualiza a mano al
cierre de cada sesión con cambios reales.

**Deadline: domingo 2026-09-20.** Presupuesto de uso ajustado — ir directo a
los cambios pedidos, evitar exploración amplia cuando un grep puntual alcanza.

## Checklist para poder publicar

- [x] Bio real de Pablo — **aplicada en `index.html`** (2026-09-18)
      (pedido 2026-09-18). Fuentes reales: LinkedIn
      (linkedin.com/in/pablo-crespo-b880b2131) + CV propio (PDF que pasó el
      usuario, "Curriculum Hombre Simple y Sobrio Gris Azúl (3).pdf" —
      ese PDF tiene 3 currículums distintos concatenados, usar SOLO el
      primer bloque "PABLO LUIS CRESPO", el de la página 3 es de otra
      persona). Datos confirmados por ambas fuentes + dato directo del
      usuario: era **CBB Abogados** (socio fundador, jul 2022), rebrandeado
      como MCDV & Asociados; Abogado (UBA), matrícula federal y provincial;
      ejercicio privado desde 2022 (familia/sucesiones/civil/penal);
      Defensor Penal Público en Chubut (Trelew); asesor legislativo en la
      Legislatura de Chubut y el Concejo Deliberante de Gaiman. Pedido:
      bio sutil, sin nombrar "CBB Abogados" explícito, que igual comunique
      quién es. Borrador propuesto (en `team-detail-bio` de Pablo,
      `index.html`, reemplaza el lorem ipsum):
      > "Abogado egresado de la Universidad de Buenos Aires, matriculado a
      > nivel federal y provincial. Ejerce en forma privada desde 2022 en
      > familia, sucesiones, derecho civil y derecho penal, con un
      > recorrido previo en la Defensoría Penal Pública de Chubut y como
      > asesor legislativo en la Legislatura provincial — una mirada que
      > combina la práctica privada con la experiencia del otro lado del
      > sistema judicial."
      El rótulo `team-role` queda "Abogado" (no se sube a "Socio Fundador"
      para mantener el perfil bajo pedido).
- [x] Bio real de Belén — **aplicada en `index.html`** (2026-09-18). Fuente:
      PDF de su perfil de LinkedIn que pasó el usuario (el fetch directo a
      LinkedIn devolvió 999/bloqueo, no sirvió). Datos: abogada (Universidad
      Nacional de Tucumán, ene. 2018), asesora legal en la Secretaría de
      Trabajo, Directora del PAMI desde abril 2022, base en Rawson (Chubut)
      — corrobora la nota de `contexto-proyecto-mcdv.md` sobre
      Trelew/Rawson/Puerto Madryn.
- [ ] Fotos/bios de Fiorella Albertoli, Danilo Sepulveda, Victoria Garcia
      Vilches, Manuel Alfredo Magri — sacados temporalmente del HTML a
      pedido explícito, vuelven cuando confirmen datos/foto (mecanismo de
      radios + `:has()` en `#equipo` ya soporta agregarlos sin tocar nada
      más).
- [ ] Número de WhatsApp real (`script.js`, `WA_NUMBER` — hoy
      `5492804000000`, inventado).
- [x] Dirección física real — **aplicada** (2026-09-18): 3 sedes en el
      footer (CABA Av. Corrientes 1464 Of. 302, Trelew Pasaje Lamadrid
      1191, Rawson Rivadavia 885), dato directo del usuario.
- [ ] Dominio real (hoy `mcdvasociados.com.ar` provisorio en
      canonical/OG/JSON-LD).
- [ ] Foto real de `#el-estudio` (hoy placeholder).
- [ ] Statement y demás párrafos en lorem ipsum.

## Resuelto en la sesión del 2026-09-18

- Foto de Belén (`img/belen.jpeg`) recortaba la frente con
  `object-position` centrado por defecto (imagen más angosta que el
  recuadro 4:5) → clase `.team-photo-belen` con `object-position: center
  15%` en `style-mcdv.css`.
- Se creó este archivo + se reorganizó el puntero en `CLAUDE.md`.
- Sección Equipo renombrada **"Quiénes Somos"** (antes "El Equipo") en
  h2, nav desktop, menú mobile — las 6 páginas.
- Bios reales de Pablo y Belén aplicadas (ver checklist arriba).
- **Statement** ("Cada caso es una persona...") ahora tiene foto de
  fondo con parallax CSS puro (`background-attachment: fixed`, gateado a
  ≥900px + `prefers-reduced-motion: no-preference`) — reutiliza
  `img/hero_facade.jpg` (lapicera sobre cartas escritas a mano), que
  antes solo se usaba como imagen de Open Graph. Clases nuevas:
  `.statement-media` / `.statement-scrim` en `style-mcdv.css`.
- **Contraste del hero**: el vignette radial (`.hero-portal-vignette`)
  dejaba el centro completamente transparente — justo donde cae el
  texto — insuficiente para baja visión pese al text-shadow ya puesto.
  Ahora oscurece también el centro (0.38 en vez de 0 en el stop 0%) +
  `brightness` del video bajó de 0.92 a 0.78.
- **Video del hero reemplazado**: `video/hero-1.mp4` (antes: persona
  firmando un contrato) → ahora pasillo de biblioteca, sin personas
  (pexels.com/video/video-inside-a-library-854417), a pedido explícito
  ("algo más general"). Bajado en 2560×1440 vía yt-dlp/curl directo al
  CDN (la página de Pexels bloquea scraping con Cloudflare, pero el CDN
  de video no), recomprimido a 1280×720 h264 sin audio con ffmpeg.
  `img/hero_video_poster.jpg` regenerado del primer frame del clip
  nuevo.
- Cache-busting bumpeado a `v=20260918b` (dos rondas: `a` foto Belén,
  `b` statement/hero) en las 6 páginas.
- Verificado con Playwright (desktop 1440×900, mobile 390×844,
  `prefers-reduced-motion: reduce`): sin errores de consola, sin
  requests fallidos, capturas confirman contraste y video nuevos.

### Segunda vuelta del 2026-09-18
- Footer: 3 direcciones reales (ver checklist), ícono de Instagram
  18px→24px con colores fijos del sitio (aro gris `--gray-light`, aro
  interior + punto bronce), todo el bloque centrado (antes
  `justify-content: space-between`). Se sacó el `<a>` de Instagram
  redundante debajo de "Envianos tu consulta" en Contacto (y su CSS
  huérfana, `.contact-instagram`).
- Bio de Pablo: el link ahora dice "Sitio Web" (antes "Ver perfil
  completo").
- Áreas de práctica (acordeón, home): la descripción de cada ítem
  arrancaba pegada arriba y desalineada del título (mismo padding que
  el summary, sin contar la columna del número romano). Ahora
  `.areas-accordion-body` tiene `padding-left` calculado para alinear
  con el título + `margin-top` fijo — las 5 quedan parejas.
- Cache-busting → `v=20260918c`.
- Pendiente explícito del usuario, para después: el wordmark de texto
  "MCDV & Asociados" en la intro del hero (`.hero-portal-wordmark`) va
  a reemplazarse por el logo real — todavía no arrancado, a definir en
  la próxima vuelta.

### Tercera vuelta del 2026-09-18 — contraste de texto en fondos claros
- 7 párrafos de cuerpo en secciones de fondo claro usaban `--gray`
  (gris, solo pasaba el mínimo AA) en vez de `--charcoal` (casi negro,
  ya era el color de texto por defecto de `<body>`). Afectaba: El
  Estudio (`.manifesto-body p`), Quiénes Somos (`.team-head-centered
  p`, `.team-detail-bio` — bios de Pablo/Belén), FAQ
  (`.faq-head-centered p`, `.faq-item p`), páginas de área
  (`.area-page-intro p`, `.area-detail-list p`). Los 7 pasan a
  `--charcoal` + `font-weight: 500`. `--gray`/`--gray-light` quedan
  igual donde sí correspondían (fondo oscuro: header, menú, Áreas,
  Statement, Contacto, Footer) — no eran un bug ahí, no se tocaron.
  Verificado con `getComputedStyle` real (no solo la captura, que con
  la tipografía fina puede engañar al ojo): `rgb(43,44,47)` en los 7.
- Botón "Volver" de las páginas de área (`.area-page-back`): a veces
  se perdía contra la foto del hero porque el degradé de `.photo-duo`
  es diagonal y arranca más claro justo donde cae el botón
  (arriba-izquierda). Mismo fix que ya se usa en el hero: color
  `--paper` + text-shadow en capas, se lee sobre cualquier foto.
- Cache-busting → `v=20260918d`.

### Cuarta vuelta del 2026-09-18 — logo real (hero + navbar + footer)
- Hero: el escudo YA NO se parte en dos mitades (se probó, se veía
  "roto/feo" — revertido a pedido). Ahora es un único `<img>`
  (`.hero-portal-logo`, `img/logo-mcdv-light.png`) que se queda entero
  mientras las puertas se abren, crece un poco (scale 0.86→1.08), y se
  desvanece antes de que entre el texto real del hero — mismo timing
  que antes.
- Logo agregado en el **navbar** (antes no había ninguno, solo texto):
  `.header-brand` a la izquierda, `logo-mcdv-light.png` (38px→32px al
  scrollear), en las 6 páginas.
- Logo agregado en el **footer** (banda ancha, arriba del wordmark de
  texto), en las 6 páginas. Bug encontrado y corregido: `.photo-duo
  img`/`.footer-band img` (pensadas para la FOTO de fondo) también le
  pegaban al logo nuevo por ser descendiente — position:absolute,
  opacity:.5, grayscale. Fix: selector más específico
  `.footer-band-overlay img.footer-band-logo` reseteando todo eso.
- Cache-busting → `v=20260918h`.
- Sesión con presupuesto de tokens semanales casi agotado (usuario
  avisó ~5%) — próxima sesión: ir directo, sin exploración de más, y
  confirmar con el usuario qué falta antes de seguir explorando otros
  lugares para el logo (footer + navbar ya están).

## Mapa rápido

- `index.html` — home one-page. Equipo (`#equipo`) hoy solo tiene a Pablo
  (`data-panel="1"`) y Belén (`data-panel="2"`).
- `areas/*.html` — 5 páginas de detalle, una por área.
- `style-mcdv.css` — único CSS. Tokens de paleta al inicio.
- `script.js` — único JS. `WA_NUMBER` cerca del top.

## Para entender el "por qué" de una decisión pasada

`contexto-proyecto-mcdv.md` tiene el log completo ronda por ronda (~850
líneas — qué se probó, qué se descartó, bugs de GSAP ya pisados). Abrirlo
solo cuando haga falta arqueología puntual de una decisión de diseño, no
como lectura de rutina.
