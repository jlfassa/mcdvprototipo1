# Contexto para IA de Hostinger — Sitio MCDV & Asociados

Pegá este texto completo al principio de tu conversación con la IA de Hostinger, antes de pedirle la auditoría. El objetivo es que entienda qué es este proyecto, qué ya está decidido/construido y por qué, para que su auditoría sea útil y no repita o contradiga cosas ya resueltas a propósito.

---

## Qué es este sitio

Landing page de **MCDV & Asociados**, un estudio jurídico (Chubut, Argentina). Áreas de práctica: Derecho de Familia, Sucesiones, Derecho Laboral, Amparos de Salud, Derecho Civil.

Es un sitio **hecho a mano, sin frameworks**: HTML, CSS y JavaScript puro. No usa React/Vue/Next ni ningún build system — los archivos que ves son literalmente los que se sirven. Se despliega en Hostinger.

## Stack y estructura de archivos

```
index.html                  → home (one-page, con anclas por sección)
areas/
  derecho-de-familia.html
  sucesiones.html
  derecho-laboral.html
  amparos-de-salud.html
  derecho-civil.html        → 5 páginas de detalle, una por área
style-mcdv.css              → único CSS del sitio, ~2000 líneas
script.js                   → único JS del sitio, GSAP + vanilla
img/                        → fotos (jpg + webp), logos, favicons
```

- **GSAP 3.13 + ScrollTrigger** (vía CDN, `defer`) maneja todas las animaciones de scroll. Hay fallback seguro sin JS/con `prefers-reduced-motion`/en mobile angosto: el contenido siempre queda visible y utilizable aunque GSAP no corra.
- Imágenes en JPG + WebP (con `<picture>`/`image-set()` para servir WebP con fallback automático).
- Sin analytics, sin backend, sin formulario con servidor: el "formulario de contacto" arma un mensaje y abre WhatsApp Web/app (`wa.me`) con el texto precargado.

## Sistema de diseño

- **Paleta "Grafito y Bronce"**: grises grafito con subtono azulado (`--graphite-950: #0e1016` como negro real de marca) + acento bronce (`--bronze: #ad7d4c`) + base papel cálido (`--paper: #f7f6f4`).
- **Tipografías**: `DM Sans` (cuerpo) + `Forum` (títulos/serif), las mismas que usa el sitio hermano de uno de los socios (drpablocrespo.com) para mantener familia visual. Hay una prueba puntual de `Cormorant Garamond` en el h1 del hero (sección `.hero-message`) — todavía no se decidió si se extiende al resto del sitio.
- Iconos: SVG inline hechos a mano (no hay librería de iconos).
- El escudo/logo (`img/logo-mcdv.png` negro, `img/logo-mcdv-light.png` crema) es el único asset de marca real confirmado.

## Estado actual del home (`index.html`), sección por sección

1. **Hero "portal"** (`#home`): efecto de scroll — dos paneles cierran la foto de fondo (`img/hero_facade.jpg`, un courthouse), al scrollear se abren revelando la foto mientras el wordmark "MCDV / & / Asociados" (apilado, centrado) crece y se separa. Es puramente decorativo/de marca, sin logo de navbar ni CTA todavía en este bloque.
2. **`.hero-message`** (sección aparte, justo debajo, ya NO superpuesta al portal): fondo blanco, escudo negro, eyebrow "Estudio Jurídico", h1 "Orientación jurídica con cercanía real.", bajada con las 5 áreas reales + un botón "Solicitar consulta".
3. **`#el-estudio`**: banner ancho tipo portada de Facebook (imagen **placeholder**, a reemplazar por foto real del estudio) con "El Estudio" superpuesto, y debajo texto real (tomado de un posteo de Instagram de la clienta) + 2 párrafos de **Lorem ipsum** (relleno, pendiente de reemplazo).
4. **`#areas`** (Áreas de práctica): sección con scroll-pin real — 5 tarjetas (número + ícono + nombre + descripción real de sub-servicios) que se van sucediendo sin que la página baje; cada una linkea a su página de detalle en `areas/`.
5. **`#equipo`**: grid de 3 columnas, 6 integrantes. Nombres y roles son reales; las bios son **Lorem ipsum**; solo 1 de los 6 tiene foto real (el resto dice "Foto de perfil" como placeholder).
6. **Statement**: bloque tipográfico grande, texto **Lorem ipsum**.
7. **`#contact`**: mega-link a WhatsApp + formulario (nombre/email/teléfono/mensaje) que arma el mensaje y abre `wa.me`.
8. **Footer**: dirección "Chubut, Argentina (dirección a confirmar)", Instagram real (`@mcdv.asociados`), crédito de desarrollo.

## Contenido: qué es real y qué es placeholder (importante para la auditoría)

**Real y confirmado:** nombre del estudio, las 5 áreas y sus sub-servicios, los 6 nombres del equipo, el texto de "El Estudio" (2 primeros párrafos), Instagram, escudo/logo.

**Placeholder a propósito, NO son errores a "corregir" sino pendientes ya trackeados:**
- `WA_NUMBER` en `script.js`: `5492804000000` — número inventado, falta el real.
- Dirección física: sin confirmar (solo dice "Chubut, Argentina").
- Dominio en canonical/OG/JSON-LD: `mcdvasociados.com.ar`, provisorio.
- Imagen de `#el-estudio`: gradiente liso, falta foto real del estudio/oficina.
- 5 de 6 fotos de equipo: placeholder de texto, faltan fotos reales.
- Varios párrafos largos (El Estudio párrafos 3-4, bios de equipo, Statement): Lorem ipsum, a reemplazar por copy real más adelante.
- Rol de cada integrante: todos "Abogado/a" genérico, sin cargo específico confirmado.

## Convenciones que hay que respetar si se proponen cambios

- Nada de frameworks ni de reescribir esto en React/etc. — sigue siendo HTML/CSS/JS puro.
- Preferir CSS por sobre JS cuando se pueda.
- Todo cambio de accesibilidad/performance/SEO es bienvenido, pero **sin tocar la paleta de colores, la estructura general de secciones, ni las animaciones de scroll ya afinadas** sin marcarlo explícitamente como una sugerencia grande a confirmar aparte (hay mucho ida y vuelta ya invertido en el timing exacto de esas animaciones).
- Ya se hizo una ronda completa de auditoría de accesibilidad/performance sobre este sitio (contraste WCAG AA, alt text, skip links, touch targets, WebP, meta tags, heading hierarchy) — si tu auditoría vuelve a encontrar algo en esas categorías, priorizalo igual (puede haber quedado algo nuevo tras los últimos cambios de diseño), pero no asumas que nunca se auditó.

## Qué necesito de vos (IA de Hostinger)

Hacé tu auditoría del sitio (performance, SEO, hosting, lo que tu proceso normal cubra) **con este contexto en mente** — priorizando hallazgos nuevos por sobre repetir lo que ya está documentado arriba como pendiente conocido.

Al terminar, **generame un prompt claro, específico y accionable** (no un resumen genérico) que yo le pueda pasar directamente a Claude Code — que ya tiene todo el historial de decisiones de este proyecto — para que ejecute los cambios que recomendás. Ese prompt debería:
- Listar los hallazgos priorizados (crítico → bajo impacto).
- Ser concreto sobre QUÉ cambiar (no solo "mejorar el SEO", sino qué tag/atributo/archivo específico).
- Aclarar si algo requiere un asset nuevo (foto, ícono, etc.) que yo tenga que conseguir primero.
