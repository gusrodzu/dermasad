# Dermassad — Sistema de diseño web (v1.0)
Actualizado: 10 de noviembre de 2026

## Objetivo de experiencia
Una web de dermatología basada en confianza, claridad y eficiencia de decisión.
El recorrido principal de cualquier paciente es: **conocer al especialista → elegir sede → explorar motivos de consulta/tratamientos → consultar por WhatsApp**.

## Fundamentos
- Estilo: clínico-editorial, luminoso, profesional y sin fotografías enmascaradas.
- Colores semánticos definidos en `design-system.css` (la marca conserva su logotipo original).
  - Primario `--ui-primary: #07569F`
  - Texto principal `--ui-heading: #102A40`
  - Texto de lectura `--ui-text: #253F52`
  - Texto secundario `--ui-muted: #506579`
  - Superficies blancas `--ui-surface: #FFFFFF`
  - Canvas `--ui-canvas: #F8FBFD`
  - Divisores `--ui-line: #DCE6EF`
- Tipografía: Manrope para títulos, DM Sans para cuerpo.
- Escala de espacios: múltiplos de 4 y 8, secciones con espaciado fluido 58–106 px.
- Superficies: cards con radio 12 px, fondos blancos y sombras ligeras.
- Fotos clínicas: rectángulos sin máscaras, filtros de color decorativos o degradados superpuestos. Respetar carpeta y procedencia por sede.

## Principios de UX
1. **Jerarquía visual**: un H1 por pantalla y un CTA prioritario por sección.
2. **Consistencia**: el mismo patrón para botones, enlaces, tarjetas, títulos y espaciados.
3. **Ley de Hick**: limitar elecciones simultáneas; agrupar tratamiento y sedes.
4. **Ley de Fitts**: controles táctiles con altura mínima de 44–48 px.
5. **Correspondencia con el mundo real**: no presentar un formulario de prueba como sistema de reserva.
6. **Visibilidad del estado**: menú abierto/cerrado, enlace de página activa y selector persistente.
7. **Accesibilidad**: foco visible, saltar al contenido, navegación por teclado, navegación reducida para movimiento preferido.
8. **Credibilidad**: la recertificación de 2024 se presenta con fuente institucional; no inventar cédulas, precios, horarios ni testimonios.

## Componentes
- `header` + selector de sede persistente + menú responsive y overlay.
- `.btn`, `.btn.outline`, `.btn.light` son variantes de CTA.
- `.location-tile` reúne foto real y descripción en superficie independiente.
- `.concern-item`, `.service-card` y `.route-card` muestran información de opciones.
- `.branch-jump-nav` y `.doctor-jump-nav` facilitan recorrer páginas largas.
- `.wa-contact-link` y `.wa-floating`: contacto contextual con número específico de cada sede.

## Reglas responsive
- Menos de 990px: menú móvil y navegación horizontal por secciones.
- Menos de 680px: grids principales en una columna, botones amplios.
- Menos de 420px: motivos de consulta en una columna.
- Las galerías fotográficas conservan la proporción rectangular sin máscaras decorativas.

## Accesibilidad, comprobaciones pendientes en navegador
- Validar contraste de los estados interactivos y todos los fondos.
- Probar con teclado (Tab, Shift+Tab, Escape), VoiceOver/TalkBack y zoom 200%.
- Verificar que los anclajes no queden debajo del encabezado fijo.
- Probar 360/390/768/1024/1440px en Chrome, Safari y Firefox.
- Validar WhatsApp en ambas sedes y los enlaces de publicaciones.
- Confirmar textos de horarios, precios y documentación profesional antes de producción.

## Arquitectura
- `styles.css`: estilos históricos del sitio.
- `design-system.css`: tokens visuales y reglas de componentes actuales, cargadas al final.
- `script.js`: rutas hash, páginas y lógica de contacto.
- `.cpanel.yml`: despliegue manual en HostGator hacia `public_html/dermasad-preview/`.

**No desplegar en producción sin aprobar el dominio definitivo y su carpeta raíz.**

## UI Bundle 03 — 13 de noviembre de 2026

- Las tarjetas de motivos de consulta en Inicio enlazan a la selección de sede.
- Cada motivo de consulta y tratamiento en la página de una sede abre el WhatsApp correcto con un mensaje específico.
- Las fotografías de instalaciones en Monterrey y Playa del Carmen admiten ampliación en un diálogo nativo con controles Anterior/Siguiente y teclado (Escape para cerrar, flechas para recorrer).
- Se corrigieron preguntas frecuentes que remitían a un formulario de citas ya retirado.
- El pie de página incluye un control para volver arriba.
- El desplazamiento hacia secciones tiene margen para los encabezados fijos en móvil y escritorio.
- Se añadieron verificaciones automatizadas en `tests/site-smoke.cjs` y `.github/workflows/site-qa.yml`, sin alterar el despliegue manual de cPanel.

### Validaciones pendientes
- QA visual real en navegadores (móvil y escritorio), incluida la ampliación fotográfica.
- Confirmar que el despliegue en cPanel está apuntando a `public_html/dermasad-preview`.
- No lanzar a producción sin verificar precios, cédulas pendientes, horarios y aviso de privacidad.
