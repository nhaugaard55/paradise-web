# The Paradise · Sitio Django

Sitio multipágina inspirado en la estructura de https://www.traccionasangre.com.ar con secciones dedicadas para hostería, restaurante y actividades.

## Requisitos

- Python 3.13
- pip

## Puesta en marcha

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt  # (si ya tenés dependencias instaladas, este paso puede omitirse)
python manage.py migrate
python manage.py loaddata core/fixtures/demo_data.json
python manage.py createsuperuser
python manage.py runserver
```

Luego ingresá a `http://127.0.0.1:8000/`.

## Estructura

- `core` · páginas generales (home, nosotros, contacto) + SiteSettings y formulario de contacto.
- `menu` · secciones e items de la carta con flags dietarios y descarga de PDF.
- `hotel` · habitaciones (listado + detalle cada slug).
- `activities` · actividades con categorías (trekking/mtb/especiales), listado por tabs y fichas detalle estilo Tracción a Sangre.

Los estilos viven en `static/css/site.css`. Las plantillas se organizan por app en `templates/<app>/`.

## Datos demo

El fixture `core/fixtures/demo_data.json` incluye:

- SiteSettings con links reales (mail, WhatsApp, Instagram y Maps).
- 2 secciones de menú con 6 platos.
- 4 habitaciones demo.
- 9 actividades (3 por categoría) con fotos placeholder de Unsplash.

Podés editar o ampliar la data desde el admin (`/admin/`) usando el superusuario que creaste.

## Guía rápida de estilo y assets

- **Textura y ornamentos**:  
  - Reemplazá `static/imagenes/Texturas/paper-texture.jpg` por la textura final (JPG 2000px).  
  - Los ornamentos del hero fueron removidos (sin ballena/lobos). Otros SVG/PNGs bajo `static/imagenes/Ornaments/` pueden actualizarse cuando se usen en secciones específicas.
- **Collages**:  
  - Las fotos históricas y gastronómicas usan el estilo definido en `static/css/site.css` (bordes suaves + sombra). Solo necesitás colocar las imágenes dentro de las estructuras de collage en `templates/core/about.html` y `templates/menu/menu.html`; no se requieren marcos adicionales.
- **Cambiar a paleta B**: editá los custom properties del bloque `:root` en `static/css/site.css` (`--brand-*`, `--neutral-*`) y ajustá `--font-heading`/`--font-body` si deseás otras familias.
- **Cache-buster**: el `<link>` al CSS usa `?v=dev-1`. Incrementá ese sufijo cuando cambies estilos para forzar la recarga.
- **Verificar fuentes en DevTools**: Network → tildar *Disable cache* → recargar. Confirmá que `site.css?v=dev-1` y las solicitudes a `fonts.googleapis.com`/`fonts.gstatic.com` se descargan con status 200. En *Elements > Computed* inspeccioná un `<h1>` y verificá que `font-family` muestre `Averia Serif Libre`.

### Ornamentos – tamaños por breakpoint
| Ornamento | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (≤767px) |
|-----------|-------------------|---------------------|-----------------|
| Hero overlay | Sin ornamento; overlay oscuro más marcado para legibilidad | | |
| Watercolor divider | `width: min(100%,1200px)`, `height:110px` | igual que desktop | `height:70px` |

Para reemplazar los archivos:
- Ajustá `static/imagenes/Ornaments/watercolor-divider*.{svg,png}` por los nuevos separadores. Ajusta rutas en `site.css` si modificás los nombres.
