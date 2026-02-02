# CSS Cache Bust & Verificación

Para que los cambios de estilo se reflejen inmediatamente:

1. **Cache-buster en `base.html`**  
   El enlace al CSS incluye `?v=dev-{{ now|date:'U' }}`. Cada carga agrega un timestamp, forzando al navegador a descargar la versión nueva.

2. **Carga al final del `<head>`**  
   `site.css` se vincula después de cualquier otro `<link>`, asegurando que sus reglas tengan prioridad.

3. **Fuente Google Fonts**  
   Verificá que el `<link>` en `Templates/base.html` apunta a:  
   `https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@400;700&family=Cabin:wght@400;500;600&display=swap`.  
   Los nombres usados en CSS son exactamente `font-family: 'Averia Serif Libre', ...` y `font-family: 'Cabin', ...`.

## Pasos para comprobar en DevTools

1. Abrí DevTools → pestaña **Network**.  
2. Tildá **Disable cache** (cuadro disponible dentro de Network).  
3. Recargá la página.  
4. Asegurate de ver `site.css?v=dev-...` con status **200**.  
5. Filtrá por **Font** y comprobá que se descargan las fuentes desde `fonts.googleapis.com` y `fonts.gstatic.com`.  
6. En la pestaña **Elements**, seleccioná un `<h1>` y revisá en *Computed* que `font-family` muestre `Averia Serif Libre`.

Con esto te asegurás de que no queden estilos viejos en caché y de que las fuentes nuevas realmente se apliquen.  
