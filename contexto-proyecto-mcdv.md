# Contexto — Sitio MCDV & Asociados (estudio jurídico)

## Qué es
Landing page (HTML/CSS/JS puro, sin frameworks) para el estudio **MCDV &
Asociados**, la marca "madre" de la que el Dr. Pablo Luis Crespo (proyecto
hermano en `../Drpablocrespo/`) es uno de los asociados — su sitio individual
ya usa el logo y el nombre "MCDV & Asociados" en el header
([index.html:168](../Drpablocrespo/index.html#L168)).

Archivos: `index.html`, `style-mcdv.css`, `script.js`, `img/`.
`reference/` guarda la captura de Instagram que trajo el usuario, solo como
referencia de contenido — no se sirve desde el sitio.

## Convenciones del proyecto (heredadas de Drpablocrespo, respetar)
- Sin frameworks. Preferir CSS por sobre JS cuando se pueda.
- No agregar código innecesario ni reestructurar sin que se pida.
- Al modificar un archivo, entregarlo siempre completo (no fragmentos).
- GSAP + ScrollTrigger vía CDN para animaciones; fallback sin GSAP con
  `IntersectionObserver` y la clase `.js-reveal`, corre **solo si GSAP no
  está disponible**.
- Mismas tipografías que el sitio de Pablo (Forum + DM Sans) para mantener
  familia visual entre ambos sitios.

## Paleta elegida: Grafito y Bronce
A pedido del usuario, entre 3 opciones (Negro y Dorado / Azul Noche y
Dorado / Grafito y Bronce), se eligió **Grafito y Bronce**: grises grafito
neutros (`--graphite-950/900/850/800`) + acento bronce
(`--bronze` `#ad7d4c`) + base papel cálido (`--paper` `#f7f6f4`). Variables
en `style-mcdv.css:1`.

No se pudieron leer colores reales de `instagram.com/mcdv.asociados`
(Instagram bloquea el contenido real a fetchers sin sesión). La única
referencia de marca 100% confiable son los logos ya existentes en
`Drpablocrespo/img/logo-mcdv.png` (negro) y `logo-mcdv-light.png`
(crema `#eee8da`), copiados a `img/` de este proyecto.

## Imágenes
Todas con licencia Unsplash (uso comercial libre, sin atribución
requerida), descargadas para este proyecto:
- `hero_1.jpg`, `hero_2.jpg` (estatua de la Justicia, bronce sobre gris —
  encaja literal con la paleta), `hero_3.jpg` (columnas clásicas B/N) —
  carrusel del hero.
- `parallax_1.jpg` (escalinata/columnas cálidas) y `parallax_2.jpg`
  (edificio de oficinas de noche) — fondos de sección.
- Se reutilizan estas mismas 5 fotos como thumbnails de las 5
  `area-card` (Familia/Sucesiones/Laboral/Amparos de Salud/Civil) — es un
  placeholder editorial razonable hasta contar con fotos propias del
  estudio o de sus oficinas.
- `pablo.jpeg`: foto real de Pablo Crespo, reutilizada de su propio sitio
  para su tarjeta en "Equipo".
- El resto del equipo usa un placeholder de iniciales (círculo grafito +
  iniciales en bronce) en vez de fotos de stock haciéndose pasar por fotos
  reales de personas reales — se reemplaza por foto real cuando la tengan.
- `favicon-16/32`, `apple-touch-icon.png`: generados con Pillow a partir de
  `logo-mcdv-light.png` sobre fondo grafito (no existían para esta marca).

## Contenido — qué es real y qué es relleno
- **Real**: nombre del estudio, las 5 áreas de práctica y sus listas de
  sub-servicios (Alimentos, Divorcios, ART, Obras Sociales, etc.) — todo
  sacado tal cual del posteo de Instagram de `@dradiazcarrizobelen` que
  compartió el usuario. Los 6 nombres del equipo, en el orden dado:
  Maria Belen Diaz Carrizo, Fiorella Albertoli, Danilo Sepulveda,
  Victoria Garcia Vilches, Manuel Alfredo Magri (apellido confirmado por
  el usuario tras el primer borrador), Pablo Luis Crespo.
- **Relleno (a pedido explícito)**: todos los párrafos descriptivos largos
  ("Nosotros", bios del equipo, statement) son **Lorem ipsum** — reemplazar
  antes de publicar.
- **Placeholders sin confirmar, marcados en el código con comentarios**:
  - Número de WhatsApp (`script.js`, `WA_NUMBER`): `5492804000000` —
    inventado con el característico de Chubut (280) a modo de ejemplo, NO
    es un número real.
  - Dirección/ciudad en el footer: "Chubv, Argentina (dirección a
    confirmar)".
  - Dominio en `index.html` (canonical, Open Graph, JSON-LD):
    `mcdvasociados.com.ar`, provisorio.
  - Apellido de Manuel: falta, dejado como "Manuel" solo.

## Sobre Trelew/Rawson/Puerto Madryn (Chubut)
Al intentar traer datos reales del Instagram vía fetch, la herramienta
devolvió un bio que menciona Trelew, Rawson y Puerto Madryn (Chubut), y
una lista de abogados que incluía a un "Dr. Magri" — en el momento se
trató como posible alucinación del fetcher porque no coincidía con la
lista de nombres que había dado el usuario. El usuario después confirmó
que el sexto integrante del equipo es justamente **Manuel Alfredo
Magri**, lo que corrobora que ese fetch sí trajo datos reales del bio.
Eso sube bastante la confianza en que Trelew/Rawson/Puerto Madryn también
son ciudades reales del estudio — pero como igual no se pudo verificar
visualmente (Instagram no entrega imágenes/HTML real a un fetch sin
sesión), se mantiene el criterio conservador: no se hardcodeó ninguna
dirección específica en el sitio, solo "Chubut, Argentina" en el footer,
a confirmar con la clienta antes de publicar.

## Rediseño (segunda versión) — ya no comparte layout con Drpablocrespo
La primera versión reusaba casi 1:1 la estructura de `Drpablocrespo/` (hero
carrusel oscuro con Ken Burns, grid de tarjetas, acordeón, panel de
contacto con blur) solo repintada en grafito/bronce — el usuario la marcó
como "idéntica a la de Pablo" y pidió investigar sitios innovadores y
rehacerla de fondo.

Investigación: [Awwwards — Law](https://www.awwwards.com/websites/law/),
[Stilley Law](https://jaredstilley.com) (gold/oscuro, hero billboard) y
tendencias 2026 (tipografía enorme, marquees/tickers, cursor custom,
listas interactivas en vez de grids). El usuario después sumó
[bouhan.com](https://www.bouhan.com/) como referencia adicional —un
estudio institucional tradicional (navy, serif, retratos circulares de
abogados, grid de áreas)—, de ahí se tomó puntualmente el **retrato
circular del equipo** y un **link de contacto rápido en el header**
(su teléfono anclado arriba a la derecha), sin adoptar su estética
conservadora completa (eso hubiera chocado con el pedido de "abrupto e
innovador").

Cambios estructurales de la v2 (nada de esto existía en la v1 ni en el
sitio de Pablo):
- Hero **split-screen claro** (no carrusel oscuro) + imagen con filtro
  duotono grafito/bronce.
- **Marquee/ticker** infinito (CSS puro, `@keyframes marquee`) con las
  áreas de práctica, reutilizado también en el menú, el statement y el
  footer.
- **Áreas de práctica como lista interactiva** (`.areas-list`), no
  tarjetas: hover actualiza un panel fijo con número gigante en contorno
  bronce; click expande el detalle (fusiona lo que antes eran dos
  secciones separadas —Áreas + Servicios— en una sola).
- **Cursor personalizado** (`.cursor-dot`, solo en dispositivos con mouse
  fino, respeta `prefers-reduced-motion` y se autoelimina si no aplica).
- **Equipo**: scroll horizontal con barra de progreso, retratos
  **circulares** (criterio de bouhan.com) en vez del grid uniforme
  cuadrado de la v1.
- **Statement** tipográfico gigante sin foto de fondo, con marquee propio
  arriba.
- **Contacto** como mega-link a WhatsApp (no botón chico) + formulario
  sin caja/blur, estilo más plano.
- **Menú** a pantalla completa que sube desde abajo (antes: panel angosto
  desde la derecha, muy calcado del de Pablo), con índice numerado y su
  propio marquee.
- Bug encontrado y corregido en el camino: el header flotante sin fondo
  volvía el texto invisible al pasar sobre secciones oscuras (mismo color
  de texto que el fondo) — se resolvió con una cápsula flotante siempre
  oscura (`rgba(23,24,26,.9)` + blur) en vez de intentar invertir color
  por sección.

Mapeo de imágenes (cada una con un solo rol, ya no se repiten como en la
v1): `hero_3.jpg` → columna del hero · `hero_2.jpg` (estatua de la
Justicia) → acento en Nosotros · `parallax_1.jpg` → fondo del Statement ·
`parallax_2.jpg` → fondo de Contacto · `hero_1.jpg` → textura de fondo del
footer. Se descartó usar fotos de stock como preview de las 5 áreas —
en su lugar, el panel fijo muestra solo número + nombre (sin depender de
imágenes genéricas que no son del estudio real).

## Tercera ronda — hero oscuro (bouhan.com), equipo scroll lateral, sin cursor
Referencia nueva del usuario: captura de la página "Our Firm" de
[bouhan.com](https://www.bouhan.com/) (navy/negro, líneas finas, franjas
verticales doradas, fotos de equipo). Cambios aplicados:

- **Hero**: pasó de claro a **oscuro** (`--graphite-950` ahora con subtono
  azul, `#0e1016`, no gris neutro) "a tono con el escudo de MCDV" a
  pedido del usuario. Se agregó una barra vertical bronce junto al
  eyebrow (detalle tomado de bouhan.com) y un zoom lento continuo
  (`@keyframes heroSlowZoom`) para que la foto fija no se sienta
  estática — queda comentado en el HTML el punto exacto para reemplazar
  la `<img>` por `<video autoplay muted loop playsinline>` el día que el
  estudio tenga grabación propia.
- **Líneas finas entre secciones**: clase utilitaria `.hairline-top`
  (`border-top: 1px solid rgba(0,0,0,.55)`) aplicada a Nosotros, Áreas,
  Statement, Equipo, Contacto y Footer.
- **Cursor personalizado eliminado por completo** (HTML, CSS y JS) — el
  usuario lo encontró "horrible", en particular el círculo con la
  etiqueta "WhatsApp" sobre "Escribinos".
- **Marquee del menú eliminado** — quedaba redundante con el de debajo
  del hero.
- **Navbar mejorada**: ícono de WhatsApp inline en "Escribinos", estado
  `.header.scrolled` (la cápsula se compacta y oscurece un poco al
  scrollear), hover con fondo bronce en el link rápido.
- **Nosotros**: el lorem ipsum se reemplazó por el **texto real** del
  posteo de bienvenida de Instagram (@dradiazcarrizobelen) — solo la
  intro, tal como pidió el usuario ("la intro nomas, lo demás eran los
  servicios"). Único cambio de copy: "trabajó" → "trabajamos" (typo
  evidente del posteo original). El Statement (que antes reusaba una
  frase de ese mismo posteo) pasó a lorem ipsum genérico para no
  duplicar contenido.
- **Equipo**: volvió a ser **scroll lateral** (el usuario cambió de
  opinión respecto a la ronda anterior, que pedía que se vieran todos
  sin scroll) pero con un formato nuevo: cada integrante ocupa una
  "slide" ancha con **foto a la izquierda / descripción a la derecha**,
  título "Descripción" + lorem ipsum, pensada para que no sea muy larga
  ("para que asombre el diseño"). Los 5 integrantes sin foto muestran
  el texto literal **"Foto de perfil"** (no iniciales) hasta que el
  estudio mande las fotos reales; Pablo conserva su foto real. Las demás
  secciones (Áreas, Statement, Contacto, Footer) siguen con scroll
  vertical normal.

## Cuarta ronda — scroll-jacking real en Equipo, limpieza de Nosotros
El scroll lateral del Equipo **no funcionaba** con la rueda del mouse: un
`overflow-x:auto` común no traduce scroll vertical en horizontal en
Chrome (sí en Firefox, mezcla inconsistente entre navegadores) — por eso
"no aparecían los abogados" al bajar con la rueda, solo se veía la
primera tarjeta y la página seguía de largo. Se implementó el efecto
real con GSAP ScrollTrigger: la sección `#equipo` se **fija (pin)**
mientras dura el recorrido y ese scroll vertical se traduce 1:a:1 en
`scrollLeft` sobre `[data-team-scroll]` (`script.js`, función
`setupTeamPin`). Verificado con scroll simulado por Playwright:
`scrollLeft` avanza de 0 a 100% de forma gradual y proporcional, y al
completarse libera el pin y continúa el scroll normal hacia Contacto —
la distancia total del pin (~2600px, calculada dinámicamente desde
`scrollWidth - clientWidth`) equivale a unos 16-17 "clics" de rueda,
corto como se pidió. Solo corre en pantallas ≥1000px con mouse (en
mobile/touch queda el swipe nativo, sin scroll-jacking).

Otros cambios de esta ronda:
- Se sacaron los números "01/02/04/05" de todos los encabezados de
  sección (Nosotros, Áreas, Equipo, Contacto) — quedan solo como
  etiqueta de texto. Se mantienen los números 01-05 de cada fila dentro
  de la lista de Áreas (esos no se cuestionaron, cumplen una función de
  índice de lista real).
- Nosotros: se sumaron 2 párrafos de relleno (lorem ipsum) después del
  texto real de Instagram, para dar más cuerpo a la sección.
- Se eliminó el bloque de estadísticas ("05 Áreas de práctica / 06
  Profesionales / 2 Modalidades de atención") que el usuario no
  entendía por qué estaba ahí.
- La imagen del costado de Nosotros cambió de `hero_2.jpg` (estatua de
  la Justicia) a `parallax_1.jpg` (escalinata/columnas, sin usar hasta
  ahora) y pasó a ocupar toda la altura de la columna de texto (antes
  quedaba más chica, con una foto + lista separada abajo). Ajuste
  técnico: como la altura de esa columna depende del texto de al lado
  (no es fija), el `<img>` se posicionó `absolute` dentro de la figure
  en vez de `height:100%` normal, porque ese último necesita una altura
  definida de antemano que en este layout no existe hasta que el grid
  termina de calcular la fila — confirmado con las bounding boxes reales
  del DOM (columna de texto y foto miden exactamente lo mismo).

## Quinta ronda — sin marquee, Equipo vuelve a lista+panel, Áreas a grid de íconos
- **Marquee eliminado de todo el sitio** ("ese texto que pasa de un lado
  a otro como cartel de colectivo"): se sacaron los 3 usos (debajo del
  hero, arriba del Statement, y el wordmark del footer). El footer ahora
  muestra "MCDV & Asociados" estático (`.footer-band`), sin movimiento.
- **Equipo, tercer rediseño**: primero fue scroll lateral con pin (ronda
  4), el usuario pidió cambiarlo a tarjetas lado a lado que se expanden
  al hover (sin pin, sin scroll horizontal), y en el mismo mensaje pidió
  además reutilizar el mecanismo de **lista + panel cuadrado fijo** que
  tenía Áreas de práctica (hover cambia la foto del panel; click expande
  la descripción de esa persona) pero aplicado a Equipo en vez de Áreas.
  Quedó así: lista de nombres a la izquierda, panel cuadrado a la derecha
  que muestra la foto real (Pablo) o "Foto de perfil" (el resto) de quien
  esté activo — `script.js`, `setTeamPanel`.
- **Áreas de práctica, nuevo diseño**: el usuario mandó una captura de
  referencia (formato genérico de agencia SEO/legal: título centrado +
  línea corta debajo + grid de ícono + texto en 3 columnas) y pidió
  replicar ese estilo, "lindo y compacto". Se armaron 5 íconos SVG
  simples a mano (casa=Familia, documento=Sucesiones, maletín=Laboral,
  escudo con cruz=Amparos de Salud, balanza=Civil) en `.areas-compact-grid`
  (`repeat(auto-fit, minmax(280px,1fr))`, se acomoda solo en 1-3
  columnas según ancho). Cada ítem: ícono + nombre del área + sus
  sub-ítems reales unidos con "·" (ya no hay expandir/colapsar ni panel
  lateral en esta sección — esa interacción se movió a Equipo).
- Bug propio corregido en el camino: al reescribir el bloque de Áreas se
  borró por accidente `.areas-head` (la clase base de 2 columnas que
  Equipo y Contacto seguían usando) — se restauró. De paso se corrigió
  un problema de contraste real que ya existía: el párrafo de Equipo
  usaba `--gray-light` (pensado para fondo oscuro) sobre el fondo claro
  de esa sección — ahora usa `--gray`.
- El usuario compartió un post de Reddit con recomendaciones genéricas
  de diseño/SEO para sitios de estudios jurídicos (una página por área
  de práctica con contenido extenso tipo "primary case types, statute of
  limitations...", reviews, CTA y formulario above the fold, nada de
  blog) pidiendo tomarlo "con pinzas, como guía muy lejana" — **no se
  implementó nada de esto todavía**, queda anotado para cuando se defina
  si el sitio pasa a ser multi-página (hoy es one-page).

## Sexta ronda — tarjetas de Áreas + 5 páginas propias, navbar y footer
- **Áreas de práctica vuelve a ser tarjetas** (tercer formato para esta
  sección): chicas, una al lado de la otra en una fila (`.areas-card-row`),
  que se expanden con `flex-grow` al pasar el mouse (mismo truco de
  flexbox que Equipo) revelando el detalle + link "Ver más". Toda la
  tarjeta es un `<a>` a la página propia de esa área.
- **Se crearon 5 páginas nuevas**, una por área, en `areas/`:
  `derecho-de-familia.html`, `sucesiones.html`, `derecho-laboral.html`,
  `amparos-de-salud.html`, `derecho-civil.html`. Cada una reusa
  header/menú/footer del sitio (rutas relativas `../`), tiene un hero con
  una de las imágenes de stock existentes (duotono) + ícono + título, y
  el detalle de cada sub-ítem con una descripción **inventada pero
  razonable** (no lorem ipsum) — a pedido explícito: "inventa algo no tan
  exagerado pero respecto al área". Esto conecta con el post de Reddit de
  la ronda anterior (una página por servicio) sin llegar a la profundidad
  "cubrir todo el tema" que sugería — se mantuvo moderado.
- Bug real encontrado y corregido: el hero de esas páginas
  (`.area-page-hero-content`) no tenía `position:absolute`, así que el
  texto cayó DEBAJO de la imagen en el flujo normal en vez de
  superponerse — confirmado con bounding boxes reales antes de asumir
  la causa.
- **Navbar rediseñada**: el usuario la calificó de "pedorra" (píldora
  flotante redondeada) y recordó que el escudo de MCDV es negro sobre
  fondo claro. Pasó a ser una barra clara de ancho completo, sin bordes
  redondeados, con el logo negro real (`logo-mcdv.png`, no el crema),
  borde inferior bronce de 2px, y un separador vertical fino entre
  "Escribinos" y "Menú" en vez de fondos tipo botón.
- **Footer**: se agregó un ícono de Instagram (SVG simple) junto al
  `@mcdv.asociados` en la barra inferior — el usuario prefirió el ícono
  a solo texto.
- **Telón entre Hero y Nosotros** (sección nueva `.team-banner`, sin
  `id`): una imagen ancha (formato tipo portada de Facebook) que se
  oscurece progresivamente con el scroll (GSAP ScrollTrigger `scrub`,
  sin pin) hasta mostrar el título "Nosotros" centrado. Placeholder: usa
  `hero_2.jpg` (la estatua de la Justicia, no una foto real del equipo)
  porque todavía no hay foto grupal — el usuario aceptó explícitamente
  que no importa que después no se use esa misma imagen, las fotos
  individuales van en Equipo. Cuidado tomado: el estado inicial (cortina
  clara, texto invisible) lo fija GSAP en tiempo de ejecución, nunca CSS
  a ciegas — si GSAP no carga, queda una cortina semi-oscura fija y el
  título siempre visible, en vez de texto oculto para siempre.

## Séptima ronda — "Nosotros" pasa a ser "El Estudio"
El usuario la vio "fuera de lugar" y con espacio vacío. Cambios:
- Sección renombrada **"El Estudio"** en todos lados: `id="nosotros"` →
  `id="el-estudio"` (y el link del menú en `index.html` + las 5 páginas
  de `areas/`), el título del telón (`.team-banner-text`) y un `<h2>`
  nuevo con línea bronce debajo, agregado dentro de la columna de texto.
- Se sacó el label "Nosotros" que vivía en una columna angosta a la
  izquierda (`.manifesto-index`) — el usuario dijo que "se veía mal" ahí.
  El grid pasó de 3 columnas (índice/texto/foto) a **2 columnas**
  (texto/foto), lo que también resolvió el espacio vacío que quedaba.
- Se sacó "¡Bienvenidos!" (ya no hace falta como apertura, ahora abre
  directo con el h2 "El Estudio").
- La foto del costado (`parallax_1.jpg`) se reemplazó por un
  **placeholder explícito** ("Imagen del estudio", mismo lenguaje visual
  que "Foto de perfil" del equipo) — el usuario pidió pensar en otra
  imagen pero no tenía una en mente, así que se dejó marcado en vez de
  forzar otra foto de stock que tampoco representa al estudio real.

## Octava ronda — Hero rehecho: foto frontal de edificio + fusión del escudo con el navbar
Pedido: reemplazar el hero split-screen por una foto grande de un
edificio institucional visto bien de frente (estilo Facultad de Derecho
UBA / "mausoleo romano"), con todo el contenido centrado arriba, el
escudo de MCDV grande en el medio, y algún efecto que lo conecte con el
navbar al hacer scroll.

- **Imagen nueva**: `img/hero_facade.jpg` — un courthouse (Denver Post
  Office and Federal Courthouse) fotografiado de frente y centrado, con
  la escalinata y nieve, licencia Unsplash. Se probaron ~9 candidatas
  antes de esta; las demás estaban tomadas en ángulo o eran interiores,
  no frontales como se pidió.
- **Hero reestructurado**: pasó de grid 2 columnas a foto de fondo a
  pantalla completa (`.hero-media` con `position:absolute;inset:0`) +
  overlay oscuro + todo el contenido centrado (`.hero-content`,
  `text-align:center`), con clases `--center` agregadas a los elementos
  que antes estaban pensados para alinear a la izquierda.
- **Fusión escudo↔navbar** (`script.js`): se mide con
  `getBoundingClientRect()` la posición real del escudo grande del hero
  y la del logo chico del header (nunca valores fijos a ojo), y atado al
  scroll (`ScrollTrigger` con `scrub`, sin pin) el escudo grande viaja
  en x/y/escala hasta calzar exactamente sobre el logo del navbar
  mientras uno se apaga y el otro se enciende en crossfade — verificado
  con opacidades reales leídas del DOM en 5 pasos de scroll (0→1
  perfectamente gradual en ambos). El logo del navbar arranca en
  `opacity:0` **solo si GSAP corre** (`gsap.set` en runtime, nunca CSS a
  ciegas) — sin JS/reduced-motion, el logo del header queda visible
  normal y el escudo grande también, sin animación pero sin nada roto.
- Recalcula posiciones en resize (por si cambia el layout del header en
  algún breakpoint).

## Novena ronda — se arregla la fusión escudo↔navbar (bug de z-index)
El usuario probó el efecto de la ronda anterior y encontró 3 problemas
reales, todos corregidos:

1. **El navbar aparecía de entrada** — ahora arranca en `opacity:0`
   (junto con el logo chico) y el navbar *completo* (barra + texto +
   Escribinos + Menú) se enciende recién con el mismo scroll que hace
   aterrizar el escudo, no antes.
2. **"El logo se pierde atrás del navbar" al viajar hacia la
   izquierda** — bug real de stacking: el escudo vivía dentro de
   `<main>`, que en su conjunto queda por debajo del `<header>`
   (`position:fixed; z-index:1000`) sin importar qué z-index tuviera el
   escudo puertas adentro de `.hero-content` — un z-index más alto
   *dentro* de un stacking context más bajo nunca gana. Se resolvió
   sacando el escudo de `<main>` (ahora vive como hermano del
   `<header>` en el HTML) y con `z-index:1001`, por encima de la barra.
   Confirmado con `getComputedStyle().zIndex` real, no a ojo.
3. **El escudo debe ser negro** — antes usaba el archivo crema. Ahora
   usa `logo-mcdv.png` (negro, el mismo que el navbar) para que el
   "viaje" sea un solo logo consistente y no dos colores distintos al
   cruzarse. Para que se lea sobre la foto oscura del hero se le agregó
   un resplandor claro (`drop-shadow` blanco en vez de negro).

De paso, el mecanismo de posicionamiento se simplificó: en vez de
animar por delta de transform (x/y/scale), ahora el escudo real es
`position:fixed` con `top/left/width` interpolados directamente entre
la posición del spacer (arranque) y la del logo del navbar (llegada) —
menos matemática, más directo. Por defecto (sin JS o con reduced-motion)
el escudo es `position:absolute`, no `fixed` — si quedara `fixed` sin el
script que lo anima, quedaría pegado en pantalla para siempre; así,
scrollea con la página como cualquier elemento normal y el navbar queda
simplemente visible desde el arranque. Verificado leyendo opacidades y
`position` reales del DOM en 6 pasos de scroll (0→1 gradual en ambos) y
en un contexto con `prefers-reduced-motion: reduce` simulado.

## Décima ronda — un solo logo (sin crossfade) + Equipo compacto y reordenado
**Fusión escudo↔navbar, simplificada**: el usuario pidió sacar el
crossfade entre dos logos — quería que fuera el MISMO escudo del hero
el que se desplaza y encaja en el navbar, no dos imágenes que se
funden. Se sacó el `<img>` propio del header-brand (queda un
`<span class="header-brand-logo-slot">` invisible que solo reserva el
lugar) y el escudo del hero nunca cambia de opacidad — solo viaja
(top/left/width interpolados) y se queda quieto ahí una vez que llega.
Fallback si la animación no corre (sin JS, o `prefers-reduced-motion`):
se inserta un `<img>` estático en ese slot (por CSS vía `<noscript>`
para el caso sin JS; por `script.js` en el bloque `else` para el caso
con JS pero sin animación) — si no, el navbar quedaría sin escudo en
esos casos.

**Equipo**: se movió a inmediatamente después de Áreas de práctica
(antes iba después del Statement); el Statement pasó a vivir entre
Equipo y Contacto. El usuario dijo que la idea (lista + panel cuadrado)
"está tremenda" pero había quedado muy grande — se compactó bastante:
panel de tamaño fijo 190×190px (antes ocupaba una columna flexible que
podía superar los 400px), tipografía de nombres más chica, menos
padding en cada fila, y padding vertical de la sección reducido
(80px en vez de los 130px que usa `.section` en el resto del sitio).
Se confirmó (y quedó comentado en el código) que hacer click en una
fila **nunca** cierra las demás — no hay lógica de acordeón exclusivo,
cada fila es independiente; probado abriendo 3 a la vez.

## Undécima ronda — se saca la fusión escudo↔navbar; Equipo pasa a carrusel
El usuario reportó que "sigue sin cargar" (el navbar invisible hasta
scrollear se leía como un bug, no como el efecto buscado) y pidió
directamente sacar todo el mecanismo y volver a algo simple y sólido:

- **Navbar**: vuelve a ser siempre visible desde la carga, con su
  `<img>` de logo negro normal adentro de `.header-brand` — nada de
  `opacity:0` inicial, nada de JS decidiendo cuándo mostrarlo.
- **Hero**: el escudo (ahora el crema, no el negro) es una imagen
  suelta más dentro de `.hero-content`, con el mismo `data-reveal`
  fade-in que el resto — sin `position:fixed/absolute`, sin medir
  rects en tiempo real, sin animación de scroll. Se sacaron por
  completo `.hero-crest-spacer`, `.header-brand-logo-slot` y los ~90
  líneas de JS del efecto (incluido su fallback dedicado), y el CSS
  `<noscript>` que lo acompañaba.
- El usuario compartió una captura de **Setia Law** (setialaw.com,
  guardada en `ejemplo2.png`) como referencia de "simple y elegante":
  fondo oscuro minimal, botones píldora, y sobre todo **flechas
  circulares de borde fino** para navegación — ese lenguaje se usó
  directo para el carrusel nuevo de Equipo.
- **Equipo — nuevo formato: carrusel "selección de personaje"**. El
  usuario lo pidió explícito: tarjeta activa grande y nítida en el
  medio, la siguiente/anterior se ve atrás, chica y semi-transparente
  (como un character-select de videojuego), flechas circulares para
  navegar, y la descripción aparece al pasar el mouse por la tarjeta
  activa. Implementado sin ninguna librería de carrusel: cada
  `.team-slide` tiene un atributo `data-offset` (distancia al índice
  activo, calculada en círculo para que dé la vuelta corta) y el CSS
  puro decide posición/escala/opacidad según ese atributo — clickear
  una tarjeta vecina también la selecciona. Cuidado tomado a propósito:
  esa animación NO se tocó con GSAP (`.area-card` sí, `.team-slide` no)
  porque el posicionamiento ya usa `transform` por CSS vía
  `data-offset`, y un `fromTo` de GSAP encima pisaría esos valores.
  Responsive: en ≤760px las tarjetas y la separación entre ellas se
  achican para que los vecinos sigan "asomando" sin que el contenedor
  angosto los tape del todo.

## Duodécima ronda — Equipo, cuarto formato: grid simple sin efectos
El carrusel "selección de personaje" de la ronda anterior quedó
"chica y fea" según el usuario, que pidió algo "totalmente distinto" y
volvió a mandar la referencia de Setia Law, esta vez con la URL real
(setialaw.com). Se investigó puntualmente su página de equipo
(setialaw.com/team, no solo el home) vía fetch: ahí no hay carrusel ni
grid con hover — es una **lista vertical simple**, una persona por
bloque, foto grande + nombre + cargo + bio + "View Profile", sin
efectos.

Se tomó esa filosofía (simple, sin gimmicks) pero adaptada a grid en
vez de lista vertical (una lista de a uno haría la sección
enorme, y "muy grande" fue justamente la queja de dos rondas atrás):
**grid de 3 columnas, fotos grandes (aspect-ratio 4:5), nombre + rol +
descripción siempre visibles, sin hover que revele nada, sin JS
propio**. Esto simplificó bastante el código: se borraron ~90 líneas
de JS del carrusel (cálculo de `data-offset`, flechas, click en
vecinos) sin reemplazo — el grid nuevo no necesita nada de JS, cada
`.team-card` ya tenía `data-reveal` y el bloque genérico de reveals se
encarga solo. También se sacó `canHover`, que había quedado sin uso.
Responsive: 3 columnas → 2 (tablet, ≤1100px) → 1 (mobile, ≤760px).

## Decimotercera ronda — teaser de Áreas con texto solapado (ref. lexpolitica.com)
Nueva sección (`.areas-stack`, sin `id`, entre "El Estudio" y "Áreas de
práctica") que muestra los 5 nombres de área de a uno, superponiéndose
con el scroll — el siguiente empieza a aparecer antes de que el
anterior termine de desvanecerse, así que por un instante se ven dos
textos cruzados, uno encima del otro (efecto pedido explícitamente,
inspirado en la sección "Featured Practice Areas" de lexpolitica.com).

Implementación: timeline de GSAP con offsets negativos entre pasos
(`"step{i}-=0.5"`) atada a un `scrub` normal (sin `pin:true`) sobre una
sección alta (320vh) con `position: sticky` adentro — mismo patrón ya
probado en el telón de "El Estudio", nada de mecanismos nuevos.
Confirmado con opacidades reales leídas del DOM que en el momento de
transición dos ítems están simultáneamente visibles (ej. 0.72 y 0.78 al
mismo tiempo), no solo asumido a ojo.

Fallback (sin JS, o `prefers-reduced-motion`): por defecto el CSS
muestra una lista vertical simple con las 5 líneas, todas visibles,
`position: static` — la clase `is-scrubbed` (que activa el layout
apilado/sticky/alto) la agrega JS solo cuando el efecto realmente va a
correr, nunca por CSS a ciegas. Verificado que con reduced-motion
simulado la clase no se aplica y la lista queda legible.

## Decimocuarta ronda — corrección: el pin es la sección de Áreas, no un teaser aparte
La clienta corrigió el enfoque de la ronda anterior: el efecto de texto
solapado (lexpolitica.com) no debía ser un teaser previo separado, sino
la sección **"Áreas de práctica" misma**, con las 5 tarjetas reales
(ícono + nombre + sub-ítems reales + link "Ver más") — y con un **pin
de página de verdad** (la página no baja mientras se suceden las
tarjetas), no un simple scrub. El pin se libera recién después de la
última tarjeta ("Derecho Civil"), momento en que el scroll normal
continúa hacia "Equipo".

Se eliminó por completo `.areas-stack` (HTML, CSS y JS) y se unificó
todo en una sola sección `#areas` (`.areas-pin`, `data-areas-pin`) con
5 `.areas-pin-card` (mismo contenido/sub-ítems reales que ya existían
en la vieja `.areas-card-row`, más los links a `areas/*.html`).

Implementación del pin: `gsap.timeline({ scrollTrigger: { trigger:
areasPin, start: "top top", end: "+=" + totalDistance, scrub: 0.6,
pin: true, anticipatePin: 1 } })`, con `totalDistance = 500px ×
(cantidad de tarjetas − 1)`. Cada tarjeta hace fade+desplazamiento con
la siguiente en el mismo timeline (sin solapamiento simultáneo esta
vez — una desaparece, la otra aparece).

Verificado con Playwright (no solo a ojo):
- `getBoundingClientRect().top` de `.areas-pin` se mantiene fijo en
  `~0` mientras las 5 tarjetas van cambiando de opacidad en secuencia
  (`0.87→0→0`, luego `0→0.94→0`, etc.), confirmando que la página
  realmente NO se mueve durante el ciclo. (`window.scrollY` sí avanza
  durante el pin — es el comportamiento normal de ScrollTrigger, que
  usa un espacio "virtual" para manejar el progreso del scrub; lo que
  importa, y se confirmó, es que el contenido visual queda fijo.)
- Apenas la última tarjeta llega a opacidad ~1, `rectTop` empieza a
  moverse hacia arriba (el pin se liberó) y el scroll normal continúa
  hasta la sección Equipo — confirmado con capturas de pantalla.
- Gate `window.matchMedia("(min-width: 900px)").matches`: en mobile
  (390px) y con `prefers-reduced-motion: reduce` simulados, la clase
  `is-stacked` NO se aplica y las 5 tarjetas quedan con `opacity: 1`
  simultáneamente (fallback seguro: lista simple apilada, sin pin) —
  mismo patrón "CSS por defecto seguro / JS agrega la clase que activa
  el efecto" usado en el resto del sitio.
- Sin errores de consola ni requests fallidos en ningún escenario
  (desktop con pin, mobile, reduced-motion).

De paso se limpió CSS/JS que había quedado huérfano de rondas
anteriores: `.areas-card-row`/`.area-card` (y sus variantes
responsive), `.team-toggle` (de una versión aún más vieja del listado
de equipo) y el loop de reveal de GSAP que apuntaba a `.area-card`
(clase que ya no existe en ningún HTML).

## Decimoquinta ronda — foto de fondo por área + eliminación del telón "El Estudio"
Dos pedidos de la clienta en la misma corrección:

**1. La foto de fondo de "Áreas de práctica" ahora cambia junto con el
texto.** Se mantiene el pin real (nada cambia ahí), pero además de las
5 `.areas-pin-card` ahora hay 5 `.areas-pin-bg-item` (una por área,
`background-image` a pantalla completa) dentro de un `.areas-pin-media`
absoluto que cubre toda la sección, más un `.areas-pin-scrim` (degradé
oscuro) encima para que el texto siga siendo legible. Las tarjetas
perdieron la caja sólida de fondo grafito (`.is-stacked .areas-pin-card`
ahora es `background: none; border: none;`) y quedan como texto suelto
sobre la foto, más prolijo y menos repetitivo visualmente.

Las fotos NO son nuevas: son las mismas 5 que ya se usaban en el hero
de cada página de detalle (`areas/*.html`), reutilizadas tal cual para
que el salto al hacer clic en "Ver más" se sienta continuo:
1. Derecho de Familia → `img/hero_1.jpg`
2. Sucesiones → `img/parallax_1.jpg`
3. Derecho Laboral → `img/parallax_2.jpg`
4. Amparos de Salud → `img/hero_2.jpg`
5. Derecho Civil → `img/hero_3.jpg`

El crossfade de fondo corre en el mismo timeline de GSAP que ya movía
las tarjetas (mismo label por paso, `c${index}`), así que foto y texto
cambian exactamente en simultáneo. Igual que las tarjetas, `.areas-pin-media`
arranca en `opacity: 0` por CSS (fallback seguro sin fotos, fondo
grafito liso) y solo se muestra (`.is-stacked .areas-pin-media { opacity: 1 }`)
cuando JS agrega la clase — mismo patrón de siempre. Verificado con
Playwright que las opacidades de fondo y de tarjeta coinciden en cada
paso del scroll (ej. `bg=0.00,0.60,0.40,0.00,0.00` y
`card=0.00,0.60,0.40,0.00,0.00` al mismo tiempo) y que en mobile/reduced-motion
`.areas-pin-media` queda en `opacity: 0` (sin fotos, sin pin).

**2. Se eliminó el telón "El Estudio" (`.team-banner`) que estaba
justo debajo del hero.** Era la banda ancha con foto + cortina oscura
+ título "El Estudio" apareciendo con scroll (`data-team-banner-curtain`/
`data-team-banner-text`) — la clienta lo calificó de "parallax pedorro".
Se borró la sección completa del HTML, su bloque de CSS (`.team-banner`,
`.team-banner-media`, `.team-banner-curtain`, `.team-banner-text`) y su
timeline de GSAP en `script.js`. La sección real de "El Estudio"
(`#el-estudio`, con el texto real de Instagram + lorem ipsum + la foto
placeholder) queda intacta y ahora es la primera sección después del
hero directamente, sin nada en el medio. Confirmado con Playwright:
`document.querySelectorAll('.team-banner').length === 0` y captura de
pantalla del scroll hero → El Estudio sin ningún salto raro.

## Decimosexta ronda — de crossfade a "solapa" opaca (sin transparencia)
La clienta vio la ronda anterior (foto de fondo + texto en fade) y
marcó dos problemas: el fade dejaba los textos de dos áreas cruzados
y superpuestos durante la transición, y pidió explícitamente que en
vez de transparencias cada área sea una "solapa" que **sube y tapa
por completo** a la anterior. Se rehizo el mecanismo desde cero:

- Se unificó `.areas-pin-card` + `.areas-pin-bg-item` (que antes eran
  capas separadas: una para el texto, otra para la foto) en un solo
  elemento `.areas-pin-panel` por área, con su propia foto de fondo
  (mismo criterio de antes: la misma imagen que usa la página de
  detalle de esa área, ahora vía `data-bg` en vez de `style` inline,
  para que JS sea quien decida cuándo pedirla) y un degradé opaco
  propio (`::before`) para que el texto se lea bien sobre la foto.
- La animación pasó de `opacity` a **`yPercent` puro** (sin transición
  de transparencia en ningún momento): cada panel arranca en
  `yPercent: 100` (oculto, debajo del recuadro) y sube a `yPercent: 0`
  tapando al anterior. Como son `position: absolute` dentro del mismo
  recuadro y respetan el orden del DOM, el que sube siempre queda
  arriba visualmente sin necesitar z-index manual por índice.
- El encabezado ("Áreas de práctica" + bajada) quedó fuera del stack,
  fijo arriba de las solapas todo el tiempo (`.areas-pin.is-stacked
  .areas-pin-inner` en columna: encabezado de alto fijo + stack
  `flex: 1` debajo, ocupando el resto del alto de la sección).

**Dos bugs reales de GSAP encontrados y corregidos en el camino** (no
a simple vista — hubo que instrumentar con Playwright leyendo
`getComputedStyle`, `gsap.getProperty` y `element.style.cssText` para
encontrarlos):
1. *Ancho colapsado a 60px*: `.areas-pin-stack` heredaba
   `margin-inline: auto` de la regla base (pensada para centrar la
   lista angosta del fallback simple). Al ser también un ítem flex
   dentro de `.areas-pin-inner` (columna), un margen `auto` hace que
   el ítem NO se estire (`align-items: stretch` se desactiva si hay
   algún margen automático), así que se achicaba a su ancho de
   contenido — y como sus hijos son todos `position: absolute`, ese
   "contenido" terminaba siendo casi nada. Fix: `margin-inline: 0` en
   el override de `.is-stacked .areas-pin-stack`.
2. *Las solapas no se movían nunca*: el CSS ponía `transform:
   translateY(100%)` como estado inicial. GSAP 3.13 escribe los
   valores de `yPercent` en la propiedad CSS moderna `translate`
   (separada de `transform`), que **se compone/suma** con el
   `transform` ya presente en vez de reemplazarlo — entonces
   `gsap.set(panel, { yPercent: 0 })` terminaba dejando el elemento
   igual de "abajo" que antes (el `translateY(100%)` del stylesheet
   seguía activo, sin que GSAP lo supiera ni lo tocara). Fix: sacar
   ese `transform` del CSS por completo y dejar que JS sea el único
   dueño de la posición, inicializando explícitamente TODOS los
   paneles con `gsap.set(panels, { yPercent: 100 })` antes de mover el
   primero a `0` — así GSAP administra el valor desde el arranque y
   las animaciones subsiguientes (`.to(panel, { yPercent: 0 })`)
   funcionan como corresponde.

Verificado con Playwright: durante todo el ciclo de scroll, la
opacidad de las 5 `.areas-pin-panel` es siempre `1` (nunca hay un
valor intermedio, cero transparencia real), y el `top` de cada panel
en pantalla confirma que van subiendo y tapando en secuencia (ej. al
llegar a Sucesiones: `[850, 850, 1349, 1404, 1404]` — Familia y
Sucesiones ya en el mismo lugar tapando, el resto todavía esperando
abajo). Mobile y `prefers-reduced-motion` siguen sin activar
`is-stacked` (fallback seguro intacto). Sin errores de consola ni
requests fallidos.

## Decimoséptima ronda — la primera solapa también "entra", no aparece de golpe
La clienta notó que al bajar desde "El Estudio", la sección de Áreas
aparecía de golpe con Derecho de Familia ya puesto ahí — un salto feo,
sin el efecto de "pasar de página" que sí tienen las transiciones
entre áreas. Pedido: que al llegar a la sección, la primera solapa
(foto + texto) entre con el mismo efecto de abajo hacia arriba.

Antes, `areasPinPanels[0]` se dejaba fijo en `yPercent: 0` desde el
arranque (visible ni bien se activaba el pin) y el timeline solo
animaba las transiciones 2→3→4→5. Ahora las 5 arrancan igual, en
`yPercent: 100` (ocultas abajo), y el timeline tiene un paso más: la
entrada de la primera es simplemente el primer paso de la misma
secuencia (`pinTl.to(panel, { yPercent: 0 }, ...)` para las 5, sin
tratar a la primera como caso aparte). `totalDistance` pasó de
`stepDistance × (cantidad − 1)` a `stepDistance × cantidad` (2500px
en vez de 2000px) para darle su propio tramo de scroll a esa entrada.

Efecto real: como `.areas-pin` ya mide `100svh` apenas JS agrega
`is-stacked` (no recién cuando se llega scrolleando), al acercarse a
la sección se ve primero un panel vacío (fondo grafito, solo el
encabezado "Áreas de práctica" arriba) y, apenas el pin engancha y se
sigue scrolleando, la foto+texto de Derecho de Familia sube desde
abajo y tapa ese vacío — mismo mecanismo, mismo "look", que las
transiciones entre áreas. Confirmado con capturas de pantalla
scrolleando gradualmente desde antes de la sección: el vacío previo,
el momento en que la solapa está a mitad de subida (se ve el corte
horizontal de la imagen entrando) y el resultado final ya asentado.
Sin errores de consola ni requests fallidos; mobile y reduced-motion
siguen sin activar `is-stacked` (fallback intacto).

## Decimoctava ronda — sacar la "caja" y hacerlo full-bleed de verdad
La clienta marcó tres cosas de la ronda anterior: (1) seguía sintiéndose
como tarjetas ("tienen que ser textos con sus iconos"), (2) el
ícono/texto quedaba muy abajo dentro de la pantalla, y (3) todavía
quedaba margen lateral en las fotos — pidió que el título y bajada de
"Áreas de práctica" se desvanezcan al scrollear para que cada área
ocupe TODO el espacio, sin márgenes.

Causa real de (2) y (3): `.areas-pin-stack` seguía viviendo adentro de
`.areas-pin-inner` con clase `.container` (max-width 1280 + gutter de
24px por lado) — de ahí el margen lateral en las fotos. Y como el
encabezado ocupaba su propio alto arriba (layout en columna, stack con
`flex: 1` debajo), el "área usable" para centrar el texto era solo el
resto de la pantalla, no la pantalla completa — por eso el ícono/texto
se veía corrido hacia abajo en vez de centrado de verdad.

Se separaron encabezado y stack en dos elementos independientes:
- `.areas-pin-head` (con `data-areas-pin-head`): el título+bajada,
  ahora flotando arriba de todo (position:absolute, z-index encima del
  stack) en vez de compartir layout en columna con él.
- `.areas-pin-stack`: pasó a ser `position:absolute; inset:0;` sobre
  `.areas-pin` directamente (ya no adentro de `.container`) — así la
  foto de cada solapa llega de punta a punta, sin márgenes, y el
  ícono/texto queda centrado en la pantalla COMPLETA, no en un resto.
  El fallback simple (sin JS) sigue usando `.container` en el HTML
  para mantenerse angosto y legible ahí — la clase se anula
  explícitamente (`width:100%; max-width:none; margin:0;`) solo dentro
  de `.is-stacked`.

El encabezado ahora se desvanece (`opacity` + leve `y`) exactamente en
el mismo paso ("c0") en que entra la primera solapa, en el mismo
timeline de GSAP — no es un efecto aparte, así que si el usuario
scrollea hacia atrás dentro del pin, reaparece solo (por el scrub).

Verificado con Playwright: el `getBoundingClientRect()` de la primera
solapa da `x:0, width:1440` en un viewport de 1440px (foto de punta a
punta, sin margen), la opacidad del encabezado pasa de `1` a `0.5` a
`0` a medida que se scrollea el primer paso, y el resto del ciclo
(opacidad de las solapas siempre en 1, mobile/reduced-motion sin
`is-stacked`) sigue intacto. Sin errores de consola ni requests
fallidos.

Quedó pendiente (mencionado por la clienta pero no como corrección
puntual, más como observación): el corte al liberar el pin y entrar a
"Equipo" (fondo blanco) sigue siendo abrupto — es el comportamiento
esperado de cómo se libera un pin de scroll (el scroll normal
simplemente continúa); lo mismo pasaba en la versión anterior. Si se
quiere suavizar (por ejemplo con un fundido de salida), es un pedido
aparte a confirmar — no se tocó para no reintroducir transparencias
donde no se pidieron.

## Decimonovena ronda — sacar el "vacío" de la entrada + tipografía/ícono más grandes
La clienta reportó que la sección de Áreas quedaba "vacía" un buen
tramo de scroll: el paso de entrada de la primera solapa (agregado en
la ronda 17) dejaba una pausa incómoda con solo el título flotando y
todo lo demás en negro, antes de que apareciera la primera foto. Se
revirtió ESE paso puntual: la primera solapa (Derecho de Familia)
ahora arranca ya puesta (`yPercent: 0`) apenas engancha el pin — se ve
completa al instante, sin pausa vacía. El resto (transiciones 2→3→4→5
"tapando" a la anterior) sigue exactamente igual. El encabezado
también volvió a quedar SIEMPRE visible (ya no se desvanece) — evita
depender de timing y es más simple.

De paso, a pedido de la clienta ("cambiar la fuente, los iconos, el
tamaño"), se agrandó la tipografía/ícono SOLO en modo pin (no en el
fallback simple, que se mantiene compacto): el ícono pasó de un trazo
suelto de 40px a una insignia circular de ~72px (borde bronce), el
número subió a 1.8rem con más tracking, y el título de cada área pasó
de `clamp(2.2rem,3vw,3rem)` a `clamp(3.4rem,5.5vw,6rem)` — con toda
esa foto de fondo a pantalla completa, el texto chico quedaba
perdido. Se ajustó el padding-top del panel (`clamp(180px,24vh,240px)`)
para que el contenido centrado no se pise con el encabezado fijo de
arriba. Verificado con Playwright: sin pausa vacía, sin superposición
visual, sin errores de consola, mobile/reduced-motion sin cambios.

## Vigésima ronda — Hero "portal": paneles que se abren revelando la foto
A pedido explícito de la clienta (con un brief técnico detallado tipo
"Superdesign"), se reconstruyó el Hero como un efecto de scroll: dos
paneles sólidos arrancan CERRADOS tapando la foto de fondo, y al
scrollear se abren hacia los bordes (más allá de su propio ancho, para
despejar el cuadro del todo), mientras el nombre ("MCDV" / "Asociados",
partido en dos) crece, aprieta su tracking y viaja hacia esos mismos
bordes. En simultáneo: la foto se asienta de un ligero sobre-escalado
a su tamaño normal, un wash bronce/grafito (`mix-blend-mode: overlay`)
sube de 0 a una opacidad baja, y dos puntos con glow viajan desde el
centro hacia esquinas opuestas apagándose. Metadata editorial en las 4
esquinas (Estudio Jurídico / Chubut, Argentina / MCDV & Asociados /
Scroll ↓) aparece de a poco. Todo atado a la posición de scroll (nunca
a un timer) — al scrollear hacia arriba el portal se vuelve a cerrar,
verificado.

**Arquitectura**: `.hero-portal` (100svh por defecto) contiene
`.hero-portal-stage` con, de atrás para adelante: la foto
(`.hero-portal-media`, reusa `img/hero_facade.jpg`), el wash duotono
(`.hero-portal-duotone`), una viñeta radial fija (`.hero-portal-vignette`,
no anima), los 2 paneles (`.hero-portal-panel--left/--right`), los 2
puntos de la costura (dentro de `.hero-portal-seam`), el wordmark
partido (`.hero-portal-wordmark` > 2 `.hero-portal-word`), la metadata
de esquina (`.hero-portal-meta` × 4) y por último, encima de todo, el
`.hero-content` real de siempre (escudo, `<h1>`, texto, botones) que
aparece al final de la secuencia con el mismo fade-in que ya tenía.
Solo cuando JS agrega `is-portal-active` la sección crece a `250vh` y
el stage pasa a `position: sticky` — mismo patrón sticky+scrub (sin
`pin:true`) que el viejo telón entre Hero y Nosotros, más simple/
robusto para un efecto que es puro scrub. GSAP: un solo
`gsap.timeline({scrollTrigger:{trigger:'.hero-portal', start:'top top',
end:'bottom bottom', scrub:0.6}})`, con todos los pasos puestos como
fracciones de tiempo (0 a ~1) vía posiciones absolutas de la timeline.

**Dos bugs de GSAP encontrados y corregidos en el camino** (mismo tipo
de problema que ya había aparecido con las solapas de Áreas, pero acá
con matices nuevos):
1. Los paneles tenían `transform: translateX(±100%)` puesto por CSS
   como posición "seguro/afuera de pantalla" del fallback. Como GSAP
   escribe `xPercent` en la propiedad CSS moderna `translate` (que se
   SUMA a un `transform` de stylesheet en vez de reemplazarlo), el
   panel quedaba trabado sin poder "cerrarse" nunca, sin importar qué
   valor de `xPercent` se le pidiera. Fix definitivo (mejor que la
   solución de "adoptar el valor primero" usada en Áreas): sacar el
   `transform` del CSS por completo y usar `display: none` como
   estado seguro por defecto — sin ningún transform previo compitiendo,
   JS controla `xPercent` con total libertad apenas lo hace visible.
2. Un intento inicial de usar `fromTo()` en vez de `.to()` para
   "blindar" el punto de partida no alcanzó — el síntoma (paneles
   arrancando abiertos en vez de cerrados) seguía igual, confirmando
   que la causa real era la composición `transform`/`translate` del
   punto 1, no el orden de captura del valor inicial. Quedó como
   lección: ante paneles/solapas con transform, VERIFICAR PRIMERO que
   no haya un `transform` de CSS conflictivo antes de sospechar de
   timing o de la sintaxis de la animación.

**Verificado con Playwright**: `getComputedStyle().transform` de
ambos paneles en `matrix(1,0,0,1,0,0)` (cerrados) apenas carga la
página, sin scrollear; captura de pantalla de la secuencia completa
(cerrado → abriendo con wordmark partiéndose → paneles totalmente
retirados → contenido real apareciendo → sección siguiente); mobile y
`prefers-reduced-motion` sin `is-portal-active`, con `display:none` en
los paneles y el contenido real visible de entrada (sin la secuencia);
reversibilidad confirmada (scroll hacia abajo y de nuevo hacia arriba
vuelve a cerrar el portal); sin errores de consola ni requests
fallidos en ningún escenario. De paso se corrigió que la metadata de
esquina quedaba SIEMPRE visible (incluso sin el efecto activo),
solapándose con el título del hero clásico en mobile — ahora arranca
en `opacity: 0` por CSS y solo la muestra el timeline cuando el efecto
corre de verdad.

## Pendiente / a confirmar con la clienta
- Rol/cargo de cada integrante del equipo (todos quedaron como "Abogado/a"
  genérico).
- Número de WhatsApp real del estudio.
- Dirección(es) física(s) reales (¿Trelew, Rawson, Puerto Madryn?).
- Dominio real a registrar/usar.
- Fotos reales del equipo (para reemplazar los placeholders de iniciales)
  y fotos propias de oficina/estudio (para reemplazar el stock de
  Unsplash en hero y area-cards).
- Reemplazar todos los párrafos Lorem ipsum por texto real.
- Confirmar si el link "Ver perfil completo" de Pablo debe apuntar a
  `https://drpablocrespo.com/` (el canonical que declara su propio sitio)
  o a otro dominio, dado que su `contexto-proyecto-crespo.md` deja
  pendiente confirmar si el dominio real es `pablocrespoabogado.com.ar`.
