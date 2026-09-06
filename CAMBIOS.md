# Rediseño del portafolio

## Cambios
- Portada editorial, servicios, perfil y tarjetas renovados; diseño responsive negro, hueso y rojo.
- AeroShards original del archivo proporcionado, con vgpu, carga diferida, pausa y alternativa sin WebGPU o con movimiento reducido.
- AuraCRM y SendGlide añadidos al inicio del catálogo, con rutas propias, enlaces públicos y vistas conceptuales identificadas.
- Navegación móvil con estado accesible, cierre con Escape y enlace para saltar al contenido.
- Formulario con copia comprobada y mensajes que no afirman haber enviado una solicitud.

## Archivos
- src/app/page.tsx, globals.css, layout.tsx
- src/data/projects.ts
- src/components/AeroShards.jsx, AeroShards.css, shard-background.tsx
- src/components/project-visual.tsx, site-header.tsx, page-transition.tsx, motion-provider.tsx, contact-form.tsx
- package.json, package-lock.json, tsconfig.json

## Verificación
- npm run build: correcto, 24 páginas generadas.
- TypeScript: correcto.
- Navegador: AeroShards data-ready=true; sin errores reportados.
- 390 px: portada y ficha SendGlide sin desbordamiento horizontal.
- Menú móvil: abre y cierra con Escape.
- Filtro Plataformas: AuraCRM, SendGlide, Noctra, VexoraSites y Wayakin Extended.
- Fichas nuevas: títulos y enlaces externos correctos.
- npm run lint: pendiente; el proyecto no tiene ESLint configurado y solicita configuración interactiva.

## Prueba manual
1. Abrir http://localhost:3001 y probar Pausar fondo / Reanudar fondo.
2. Ir a Explorar proyectos, abrir ambas fichas y visitar sus sitios.
3. Abrir Proyectos y alternar categorías.
4. Probar menú y navegación por teclado en móvil y escritorio.
5. En Contacto, completar campos obligatorios y copiar la solicitud. Si el navegador deniega el portapapeles, debe aparecer un mensaje de error.
6. Activar movimiento reducido en el sistema y comprobar el fondo estático.

## Pendientes
- Las imágenes nuevas son composiciones conceptuales, no capturas reales de las aplicaciones.
- Sin correo de contacto configurado, el formulario copia el brief; no envía correos automáticamente.
- Código subido a GitHub; no se realizó despliegue del sitio.

## Ajustes de contacto y publicación
- FUREI enlaza a https://somosfureimx.org/.
- Eliminado el bloque de email «Propuestas y briefs / Email profesional / Configurable».

## Composiciones y movimiento — septiembre 2026
- Los 12 proyectos tienen composiciones conceptuales propias; se reutilizan en portada, catálogo y ficha.
- Noctra y VexoraSites añadidos con enlaces, descripción, ficha y sitemap. La portada destaca 6 proyectos.
- Nuevo componente animated-heading.tsx: entrada escalonada por palabras conservando headings semánticos.
- Nuevos estados hover en tarjetas, botones y navegación; filtros con aria-pressed y transiciones de posición.
- MotionConfig y Lenis respetan la preferencia de movimiento reducido, también si cambia durante la sesión.
- Sin dependencias nuevas.

### Archivos de esta actualización
- src/data/projects.ts, src/app/page.tsx, src/app/globals.css
- src/components/project-visual.tsx, animated-heading.tsx, reveal.tsx
- src/components/projects-grid.tsx, motion-provider.tsx, page-transition.tsx
- src/components/section-heading.tsx, page-hero.tsx, final-cta.tsx

### Pruebas adicionales
- Catálogo: 12 tarjetas y 12 composiciones; sin errores de navegador.
- Nuevas fichas: títulos y destinos externos verificados.
- Filtro Plataformas: 5 proyectos y estado accesible correcto.
- Movimiento reducido: título visible, palabras estáticas y sin canvas WebGPU.
- Escritorio 1440 px y móvil 375 / 320 px: revisión de composición y desbordamientos.
- Prueba manual: pasar el cursor por Noctra, Academia y NFC; revisar el ecualizador, progreso y resaltado del lector.
