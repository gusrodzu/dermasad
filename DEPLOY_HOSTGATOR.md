# Dermassad — despliegue de prueba con HostGator cPanel

## Repositorio
https://github.com/gusrodzu/dermasad

El proyecto contiene HTML, CSS, JavaScript, fotos web optimizadas y enlaces WhatsApp diferenciados por sede. Las fotografías RAW deben mantenerse en Google Drive, no en el alojamiento web.

## Ruta de despliegue de pruebas
El archivo `.cpanel.yml` publica en:
`$HOME/public_html/dermasad-preview/`

Esta ruta es temporal. Antes del primer despliegue, comprobar en el administrador de archivos que **no contiene otro sitio**. No desplegar en `public_html` raíz sin confirmar la ruta del dominio definitivo. No hay dominio propio todavía; que los archivos se publiquen en una carpeta no garantiza una URL accesible.

## Sincronización y despliegue manual
1. GitHub: subir las actualizaciones aprobadas a `main`.
2. HostGator: cPanel > Git Version Control > Administrar > Pull or Deploy.
3. Pulsar **Update from Remote**.
4. Comprobar que `.cpanel.yml` está presente y que no existen cambios sin confirmar en el checkout.
5. Pulsar **Deploy HEAD Commit** solamente cuando la ruta de prueba esté comprobada.
6. Consultar el registro del despliegue, si cPanel lo ofrece.

Actualizar GitHub no despliega automáticamente en cPanel con esta configuración.

## Comprobaciones antes de publicar
- Página de inicio y rutas `#/monterrey` y `#/playa-del-carmen`.
- Selector de sede persistente.
- WhatsApp correcto para Monterrey y Playa del Carmen.
- Galerías fotográficas por sede, sin mezclarlas ni aplicar máscaras.
- Navegación y contraste de textos en dispositivos móviles.
- Verificación pendiente de cédulas, precios y agenda antes de producción.

## Producción futura
Cuando se disponga del dominio:
1. Identificar su document root en cPanel > Domains.
2. Respaldar el contenido de esa carpeta.
3. Ajustar `DEPLOYPATH` en `.cpanel.yml` a la ruta aprobada.
4. Sincronizar y desplegar manualmente tras verificar el destino.

**Nota de seguridad:** La carpeta de pruebas no queda protegida con contraseña por este archivo. Si se necesita un entorno privado, configurar protección de directorio o un acceso restringido desde cPanel.
