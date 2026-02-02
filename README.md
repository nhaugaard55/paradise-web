# The Paradise · Static Hand-off

Este repo ahora conserva únicamente la exportación estática lista para integrar en WordPress (o cualquier hosting estático). El viejo proyecto Django quedó archivado en `archive/django/` para referencia histórica.

## Estructura clave

| Carpeta | Descripción |
| --- | --- |
| `site/` | **Fuente de verdad**. Incluye los HTML en `es/` y `en/` más los assets bajo `site/static/`. |
| `archive/django/` | Copia congelada del proyecto Django original (apps, templates, fixtures, etc.). Podés moverla a un repo aparte siguiendo los pasos de la sección "Resguardar Django". |

## Servidor local rápido

```bash
cd site
python3 -m http.server 8000
```

Abrí `http://127.0.0.1:8000/` para navegar. Si necesitás compartir con otra computadora o celular en la misma red:

```bash
IP=$(ipconfig getifaddr en0)   # o usa ifconfig/ipconfig según tu SO
python3 -m http.server 8000 --bind 0.0.0.0
```

Luego ingresá a `http://<IP>:8000/` desde el dispositivo. En iOS basta con usar Safari/Chrome y la IP de la Mac; asegurate de que el firewall permita conexiones entrantes para Python.

## Despliegue

### Render (hosting estático)
1. Importá el repo en Render.
2. Elegí **Static Site** y usá `render.yaml` (apunta a `site/` y no necesita build).
3. Cada cambio en `site/` se publica automáticamente.

### WordPress
- El HTML/CSS/JS dentro de `site/` puede copiarse sección por sección a bloques personalizados, plantillas de theme o un constructor (Elementor, Gutenberg, etc.).  
- Las rutas absolutas (`/es/...`, `/static/...`) asumen que el contenido vive en la raíz del dominio; ajustalas si el sitio final usa subdirectorios.
- Para assets, subí `site/static/` a tu biblioteca/hosting CDN y actualizá las rutas si el CDN entrega otro origen.

## Resguardar Django (opcional)

Para aislar la versión Django en otro repositorio:

```bash
cd archive/django
git init
git add .
git commit -m "Bootstrap django archive"
gh repo create django-archive --private --source=. --remote=origin
git push -u origin main
```

Luego podés eliminar `archive/django` de este repo si ya no la necesitás.

## Workflow recomendado

1. Editar HTML/CSS/JS directamente dentro de `site/`.
2. Probar con `python3 -m http.server`.
3. Validar en dispositivos reales siguiendo el apartado “Servidor local”.
4. Deploy a Render u otro hosting estático.

Para cambios mayores de diseño mantené sincronizadas las versiones en WordPress copiando el HTML final o usando el archivo como referencia visual.
