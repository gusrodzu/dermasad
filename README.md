# Dermassad · Revisión SEO y conversión (prototipo)

## Vista local

Abre `index.html` con Live Server o con un servidor estático. La navegación usa rutas `#/...` y no necesita configurar rewrites.

## Cambios aplicados

- H1 del inicio: «Dermatólogo en Monterrey y Playa del Carmen»; frase anterior en bajada.
- Etiqueta de motivo: «Psoriasis y dermatitis».
- CTA principal para elegir sede y secundario para explorar motivos; sin CTA de agenda adicional en la barra. El selector persistente de sede continúa.
- Dos rutas por sede: valoración dermatológica y solicitud informativa de procedimiento. El botón de cada tratamiento preselecciona el motivo en el formulario orientativo.
- Precios numéricos de referencia del wireframe, señalados como **orientativos, sujetos a confirmación**. No equivalen a una tarifa pública aprobada.
- Título y descripción SEO específicos de inicio/ciudades.
- Se redujeron notas técnicas visibles en páginas públicas.
- Estilos blancos y logotipo blanco en footer se mantienen.

## Lista de bloqueo antes de publicar (obligatoria)

1. **Cédula profesional y cédula de especialidad**: solicitar documentos, confirmar números y registrarlos en `SETTINGS.license` y `SETTINGS.specialtyLicense`. No se inventaron números.
2. **Tarifas**: validar precio, alcance, vigencia y sede de cada procedimiento y valoración; actualizar `treatments`, `consultationFrom` y `SETTINGS.priceValidated`. Confirmar si se publican rangos o precios «desde».
3. **Agenda y solicitudes**: el formulario es solo interactivo local, no guarda ni transmite datos ni reserva. Integrar un canal de contacto oficial y/o proveedor de agenda antes de prometer autoservicio; comprobar flujos de ambos tipos de cita.
4. **Privacidad**: sustituir íntegramente la página de aviso ilustrativa por aviso legal aprobado y conectar consentimiento real antes de capturar nombres, teléfonos u otra información.
5. **Datos sede Playa del Carmen**: domicilio, teléfono, horarios, días de atención, fotografía y enlace de mapas. Verificar domicilio, horario y teléfono de Monterrey.
6. **Trayectoria profesional**: comprobar acreditaciones, certificaciones y estudios; no publicar afirmaciones no verificadas.
7. **Limpieza final de contenido**: buscar las cadenas `pendiente`, `wireframe`, `demo`, `demostrativo`, `validar`, `por confirmar`, `sitio en preparación`, `integración pendiente`, además de comprobar visualmente todo el sitio. Algunas expresiones técnicas siguen siendo adecuadas en README, pero no deben figurar en páginas públicas.
8. **Publicación**: comprobar avisos sanitarios aplicables, SEO y metadatos, imágenes autorizadas, analítica, formularios seguros, accesibilidad y visualización móvil.

**Estado:** prototipo; no publicar ni activar captación de pacientes sin completar esta lista.

## Selector de sede (barra superior)
El selector muestra «Seleccionar sede» y dirige inmediatamente a `#/monterrey` o `#/playa-del-carmen` al elegir una opción. En cada nueva página vuelve a mostrar la instrucción para permitir cambiar de sede.
\n## Selector de sede persistente\nLa selección se guarda en `localStorage` con la clave `dermassad:selected-sede`. Al navegar a otra sección o recargar, el selector conserva la última sede elegida. Si se abre directamente una página de sede, esa ruta tiene prioridad y actualiza la selección. Una primera visita sin selección muestra «Seleccionar sede». Si el navegador bloquea el almacenamiento, la navegación sigue funcionando.\n

## Integración fotográfica (noviembre 2026)

Se integraron en esta base cinco fotografías optimizadas WebP de la versión de integración anterior, sin borrar los recursos existentes:
- `assets/retrato-doctor.webp` para perfil del especialista y la sección de sede correspondiente.
- `assets/foto-sala-espera.webp`, `assets/foto-consultorio.webp`, `assets/foto-recepcion.webp`, `assets/foto-interior.webp` en la galería de Inicio.

El hero de Inicio conserva `assets/doctor-home.png` y Playa del Carmen también usa la fotografía previamente aprobada. Las fotos genéricas de espacios **no están atribuidas a una sede concreta**; revisar su ubicación real antes de etiquetarlas como Monterrey o Playa del Carmen. Se preservaron los ARW del ZIP entregado y los logotipos, incluido el logo blanco del footer.


## Curaduría fotográfica (noviembre 2026)
Se integraron seis fotografías WebP optimizadas procedentes de JPEG previamente editados: ALB07577, ALB07585, ALB07623, ALB07581, ALB07593 y ALB07578. Se reorganizó la galería de Inicio con títulos descriptivos neutros; la ubicación exacta de cada foto no se atribuye a Monterrey o Playa del Carmen hasta verificarla. La sección del especialista en Inicio usa retrato-doctor.webp. El hero principal mantiene doctor-home.png y no fue modificado. Las demás imágenes y rutas de sede permanecen intactas.


## Procedencia de la galería
Las seis imágenes de la sección «Espacios para tu atención» pertenecen a **Dermassad Playa del Carmen, Quintana Roo**, según confirmación del cliente. Se identifican por sede en texto, textos alternativos y enlace de navegación. No deben etiquetarse como instalaciones de Monterrey.
\n\n## Galería exclusiva Playa del Carmen (2026-11-09)\nLas fotografías de `galeria-*.webp` fueron confirmadas por el usuario como instalaciones de Playa del Carmen. Se añadieron seis fotos a la ruta `#/playa-del-carmen` (sección `#instalaciones`) y una vista en la tarjeta de sede de la página principal. El hero del doctor, la sede Monterrey, los enlaces y el selector persistente no se modificaron.\n

## Galería Monterrey / San Pedro Garza García
Se incorporaron seis fotografías de la primera biblioteca fotográfica identificada por el usuario como **San Pedro, Monterrey**: recepción ALB07623, sala de espera ALB07576, acceso interior ALB07578, consultorio ALB07581, sala de atención ALB07585 y sala de procedimientos ALB07597. Se exportaron a WebP y se muestran únicamente en la galería de Monterrey. La tarjeta Monterrey de Inicio usa la sala de espera; las imágenes y la galería de Playa del Carmen permanecen sin cambios. Sin máscaras; originales preservados.


## Fuente de fotos por sede (corrección)
- **Monterrey / San Pedro:** carpeta Google Drive `1BzJ49WYPp-E84_ff4-I24p_Qpuz5HKuF`. Galería `monterrey-*` reconstruida con IMG_7478, IMG_7481, IMG_7493, IMG_7554, IMG_7540, IMG_7542, en ese orden.
- **Playa del Carmen:** conservar `galeria-*` de la biblioteca previamente clasificada como Playa del Carmen.
- No reutilizar imágenes de la galería Playa como instalaciones de Monterrey.
- Archivo `sucursal-monterrey.jpg` se mantiene sin cambios por estar alineado con la nueva carpeta de Monterrey; validar dirección exacta con la clínica antes de publicar.


## Consolidación visual y funcional (noviembre de 2026)
Esta versión conserva los avances anteriores a la selección fotográfica: selector de sede persistente, navegación automática, rutas de valoración y procedimiento, tabla de precios orientativos, seis motivos de consulta, SEO para ciudades, logo blanco en el footer y galerías separadas por sede.

Corregido: estilos de texto originalmente diseñados para fondo azul que habían quedado ilegibles sobre fondo blanco en la sección del especialista; enlaces internos de la página de sede que no desplazaban a agenda/rutas/tratamientos. Se conservaron las fotografías y la asociación confirmada: Monterrey/San Pedro (carpeta Drive 1BzJ49WYPp-E84_ff4-I24p_Qpuz5HKuF) y Playa del Carmen (1GemUQ0rv_0tH6e2_77EcbbFkuk0OZrzg).

Pendiente antes de publicación: verificar cédulas profesionales, tarifas y canales efectivos de agenda; el formulario actualmente no envía datos. Esta actualización es de código local y no modifica el sitio en hosting.


## WhatsApp por sede (restaurado)
- Monterrey / San Pedro: +52 1 81 8254 9000 (`5218182549000`).
- Playa del Carmen: +52 984 462 2404 (`529844622404`).
- Cada página de sede muestra su botón flotante y sus CTA de contacto. En la página de inicio el flotante sigue la sede guardada en `localStorage`; sin selección previa muestra dos opciones en lugar de enviar a una sede arbitraria.
- Los botones abren WhatsApp con un mensaje preescrito, **sin enviar datos ni confirmar citas**.
