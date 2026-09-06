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
- npm run build: correcto, 22 páginas generadas.
- TypeScript: correcto.
- Navegador: AeroShards data-ready=true; sin errores reportados.
- 390 px: portada y ficha SendGlide sin desbordamiento horizontal.
- Menú móvil: abre y cierra con Escape.
- Filtro Plataformas: AuraCRM, SendGlide y Wayakin Extended.
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
