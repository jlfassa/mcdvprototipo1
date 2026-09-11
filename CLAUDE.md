# MCDV & Asociados — sitio del estudio jurídico

Landing page real en producción (HTML/CSS/JS puro, sin frameworks, sin build).
Archivos: `index.html`, `areas/*.html` (5 páginas de detalle por área), `style-mcdv.css`,
`script.js`, `img/`.

**Para contexto de fondo** (qué es real vs. placeholder, decisiones de marca/paleta,
convenciones heredadas del sitio hermano `Drpablocrespo/`): leer `contexto-proyecto-mcdv.md`.
Ese archivo no se actualiza solo — puede estar desactualizado en detalles puntuales
respecto al estado actual del HTML/CSS; ante la duda, confiar en el código y en
`git log` por sobre ese documento.

**NO usar el flujo de mockups de la extensión Super Design** (`.superdesign/design_iterations/`,
`generateTheme`, etc.) — este es el sitio real, se edita directamente sobre
`index.html`/`style-mcdv.css`/`script.js`/`areas/*.html`.

## Cómo trabajar en este proyecto

- **Sin frameworks.** Preferir CSS por sobre JS cuando el efecto se pueda lograr en CSS puro
  (ver ejemplo: `.team-expand-*`/`.areas-card-*` — hover/foco revelan contenido sin una
  línea de JS).
- **Ir de a poco.** Confirmar antes de cambios grandes/estructurales (navbar, paleta,
  rehacer una sección entera); los cambios chicos y obvios (contraste, alt text,
  meta tags) se aplican directo. Separar commits por tipo de cambio.
- **Nunca inventar contenido real**: teléfono, dirección, bios/credenciales del equipo,
  precios, estadísticas o testimonios deben quedar marcados como placeholder o lorem
  ipsum hasta que el usuario pase el dato real. Copy editorial (frases de misión/tono)
  sí se puede escribir, no es un hecho verificable.
- **Nada de contenido escondido solo detrás de hover**: todo efecto hover-reveal necesita
  también `:focus-within`/`:focus-visible` (teclado), y en dispositivos táctiles/sin
  soporte de hover el contenido debe ya estar visible por defecto, o degradar a un
  link/tap que funcione solo. Patrón gate estándar del proyecto:
  `@media (hover: hover) and (pointer: fine)`.
- **Verificar con Playwright antes de cada commit no trivial**: levantar
  `python -m http.server 8743` desde la raíz del proyecto, chequear consola limpia +
  geometría/screenshots en desktop (1440×900, 1366×768) y mobile táctil
  (390×844, `hasTouch:true, isMobile:true`), matar el server al terminar. Encontró bugs
  reales más de una vez (no solo problemas del script de test) — no saltear esto por
  "es solo CSS".
- **Cache-busting**: `style-mcdv.css`/`script.js` se cargan con `?v=YYYYMMDDx` en las
  6 páginas HTML (index + 5 de `areas/`). Bumpear la letra en todas cada vez que se
  toque alguno de esos dos archivos, antes de testear.
- **Commits**: mensajes en español explicando el *por qué* (no solo el qué), separados
  por tipo de cambio, terminan con `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.

## Sistema de diseño (referencia rápida)

- Paleta: grafito + bronce — `--graphite-950/900/850/800`, `--bronze` `#ad7d4c` /
  `--bronze-light` `#c89a68` / `--bronze-dark` `#8a6138`, `--paper` `#f7f6f4`.
  Tokens al inicio de `style-mcdv.css`.
- Tipografía: `--font-display` Forum (serif, títulos), `--font-body` DM Sans (texto) —
  mismas fuentes que `Drpablocrespo/` para mantener familia visual entre ambos sitios.
  `Cormorant Garamond` es una prueba puntual solo en `.hero-message`, no extendida al
  resto todavía.
- Root font-size 10px — los `rem` del CSS son ×10 de su valor visual (`1.6rem` = 16px).
- GSAP 3.13 + ScrollTrigger (CDN, `defer`) para animaciones de scroll; todo efecto
  necesita fallback probado para sin-JS, `prefers-reduced-motion`, y mobile
  (`window.matchMedia("(min-width: 900px)")` es el umbral estándar del proyecto para
  gatear efectos de scroll-jacking).
- Bugs de GSAP ya pisados en este proyecto, no repetir: (1) GSAP escribe x/y/xPercent/
  yPercent en la propiedad CSS `translate`, que se COMPONE con un `transform` puesto por
  stylesheet en vez de reemplazarlo — nunca poner `transform` en CSS sobre un elemento
  controlado por GSAP; (2) `.to()` captura el estado "from" en el momento de crear el
  tween, no al ejecutarse — para medir en el momento de arrancar, usar `.fromTo()` con
  valores por función; (3) `fromTo()` renderiza el estado "from" inmediatamente al
  crearse salvo `immediateRender: false`.
- Patrón de tarjeta con reveal en hover/foco (usado en Equipo y Áreas de práctica):
  alto FIJO siempre (nunca crece la tarjeta), el detalle vive dentro de ese mismo alto
  vía `max-height`/`opacity`, gateado en `@media (hover: hover) and (pointer: fine)`;
  fuera de ese media, todo el contenido queda visible siempre (grilla simple). No volver
  a la variante "la tarjeta crece y reserva espacio vacío arriba" — se probó y se sacó
  a pedido explícito por dejar un hueco molesto en reposo.

## Skills ya instalados en este proyecto (`.claude/skills/`)

`ui-ux-pro-max` (referencia principal para auditorías/decisiones de UI), `design`,
`design-system`, `ui-styling`, `brand`, `banner-design`, `slides`. Usarlos cuando
aplique en vez de improvisar — ya están disponibles, no hace falta pedir instalar nada
nuevo salvo que el usuario lo pida explícitamente.
