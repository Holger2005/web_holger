# Portafolio de Holger Ordoñez

Sitio estático en español sobre desarrollo de software, automatización y proyectos académicos. La portada, el catálogo y las fichas se generan como HTML. JavaScript añade búsqueda por texto, filtros y una calculadora. El catálogo y los enlaces siguen disponibles sin JavaScript.

## Ejecutar en desarrollo

Utiliza Node.js 22 o superior. Desde esta carpeta, ejecuta `npm run dev` y visita `http://localhost:4173`. El servidor reconstruye al arrancar. Tras una edición puedes ejecutar `npm run build` en otra terminal y recargar el navegador. El proyecto usa los módulos incluidos en Node.js.

## Arquitectura

| Carpeta | Responsabilidad |
| --- | --- |
| `content/` | Inventario editorial y fichas de casos en JSON. |
| `src/domain/` | Reglas de validación, coincidencia de búsqueda y cálculo de comisión. |
| `src/application/` | Ordenación del catálogo y asociación de proyectos con sus fichas. |
| `src/infrastructure/` | Lectura de los archivos de contenido. |
| `src/presentation/` | Plantillas HTML e interacciones del navegador. |
| `public/assets/` | Estilos, imágenes WebP y demostración MP4. |
| `scripts/` | Composición de las capas, construcción y servidor local. |
| `tests/` | Pruebas de reglas de negocio, búsqueda y contenido generado. |

El dominio no tiene dependencias de Node.js ni del navegador. El generador conecta los datos con la aplicación y las plantillas. Los visitantes no necesitan autenticarse en GitHub para consultar el catálogo.

## Actualizar el contenido

1. Agrega el proyecto a `content/projects.json` con un identificador único, título, resumen y categoría. Añade la URL si existe un repositorio público.
2. Para una ficha detallada, agrega una entrada con el mismo identificador en `content/cases.json` y su imagen con texto alternativo. Los tres primeros casos aparecen en la portada.
3. Guarda fotos e ilustraciones en `public/assets/`. Añade los videos de demostración con controles y un equivalente textual. Los enlaces de Drive conservan los permisos de sus propietarios.
4. Ejecuta `npm test` y `npm run build`. Revisa la página de la ficha y el catálogo. El catálogo es una selección editable de los repositorios públicos con contenido en el momento de su preparación.

## Desplegar en Vercel

Importa el código del portafolio desde GitHub. Selecciona como raíz la carpeta que contiene este README y `vercel.json`. La configuración usa el preset Other, ejecuta las pruebas y genera los archivos en `dist`. No se necesitan variables de entorno para mostrar el sitio.

## Procedencia

Los enlaces del catálogo apuntan a los repositorios públicos de Holger2005. El caso de vinculación universitaria y la experiencia profesional proceden del CV de Holger. Las imágenes de los casos son ilustraciones explicativas. La calculadora y su video reproducen la regla de `comisiones/ventas.js`. Los dos videos de Drive están enlazados en `juegoSerpiente/videos.txt` y `ejercicios_for/videos.txt`.
